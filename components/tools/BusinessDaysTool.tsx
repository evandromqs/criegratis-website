'use client';

import { useState } from 'react';
import { CalendarDays, Copy, Check, Sparkles, Plus, Minus, Info } from 'lucide-react';

// Easter algorithm (Meeus/Jones/Butcher)
function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

interface Holiday {
  dateStr: string; // YYYY-MM-DD
  name: string;
}

function getBrazilianHolidays(year: number): Holiday[] {
  const easter = getEaster(year);

  const addDays = (base: Date, days: number): string => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${m}-${day}`;
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return [
    { dateStr: `${year}-01-01`, name: 'Confraternização Universal' },
    { dateStr: addDays(easter, -47), name: 'Carnaval (Terça-feira)' },
    { dateStr: addDays(easter, -2), name: 'Sexta-feira Santa (Paixão de Cristo)' },
    { dateStr: `${year}-04-21`, name: 'Tiradentes' },
    { dateStr: `${year}-05-01`, name: 'Dia do Trabalhador' },
    { dateStr: addDays(easter, 60), name: 'Corpus Christi' },
    { dateStr: `${year}-09-07`, name: 'Independência do Brasil' },
    { dateStr: `${year}-10-12`, name: 'Nossa Senhora Aparecida' },
    { dateStr: `${year}-11-02`, name: 'Finados' },
    { dateStr: `${year}-11-15`, name: 'Proclamação da República' },
    { dateStr: `${year}-11-20`, name: 'Dia da Consciência Negra' },
    { dateStr: `${year}-25-12`, name: 'Natal' }
  ];
}

export default function BusinessDaysTool() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [mode, setMode] = useState<'between' | 'add'>('between');

  // Mode: between
  const [startDate, setStartDate] = useState(todayStr);
  const future15 = new Date();
  future15.setDate(future15.getDate() + 20);
  const [endDate, setEndDate] = useState(future15.toISOString().split('T')[0]);

  // Mode: add
  const [daysToAdd, setDaysToAdd] = useState('15');

  const [copied, setCopied] = useState(false);

  // Calculation for mode "between"
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const isValidBetween = !isNaN(start.getTime()) && !isNaN(end.getTime());

  let totalCalendarDays = 0;
  let businessDaysCount = 0;
  let holidaysList: { date: string; name: string }[] = [];

  if (isValidBetween && start <= end) {
    const years = new Set<number>();
    years.add(start.getFullYear());
    years.add(end.getFullYear());

    const holidayMap = new Map<string, string>();
    years.forEach(y => {
      getBrazilianHolidays(y).forEach(h => holidayMap.set(h.dateStr, h.name));
    });

    const cur = new Date(start);
    while (cur <= end) {
      totalCalendarDays++;
      const dayOfWeek = cur.getDay();
      const curStr = cur.toISOString().split('T')[0];

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        if (holidayMap.has(curStr)) {
          holidaysList.push({ date: curStr, name: holidayMap.get(curStr)! });
        } else {
          businessDaysCount++;
        }
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  // Calculation for mode "add"
  let targetDateStr = '';
  let addHolidaysEncountered: { date: string; name: string }[] = [];
  const numDaysToAdd = parseInt(daysToAdd) || 0;

  if (mode === 'add' && !isNaN(start.getTime()) && numDaysToAdd > 0) {
    let added = 0;
    const cur = new Date(start);

    // Cache holidays
    const holidayMap = new Map<string, string>();

    while (added < numDaysToAdd) {
      cur.setDate(cur.getDate() + 1);
      const y = cur.getFullYear();
      if (!holidayMap.has(`${y}-01-01`)) {
        getBrazilianHolidays(y).forEach(h => holidayMap.set(h.dateStr, h.name));
      }

      const dayOfWeek = cur.getDay();
      const curStr = cur.toISOString().split('T')[0];

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        if (holidayMap.has(curStr)) {
          addHolidaysEncountered.push({ date: curStr, name: holidayMap.get(curStr)! });
        } else {
          added++;
        }
      }
    }
    targetDateStr = cur.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  const handleCopy = async () => {
    let text = '';
    if (mode === 'between') {
      text = `Cálculo de Dias Úteis - CrieGrátis:\nDe: ${startDate} até ${endDate}\nDias Úteis: ${businessDaysCount} dias\nFeriados no período: ${holidaysList.length}\nDias corridos totais: ${totalCalendarDays}`;
    } else {
      text = `Prazo de Dias Úteis - CrieGrátis:\nData de partida: ${startDate}\nPrazo de: ${daysToAdd} dias úteis\nData final de entrega: ${targetDateStr}`;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="flex gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setMode('between')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'between'
              ? 'bg-amber-500 text-neutral-950 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Dias Úteis Entre Duas Datas
        </button>
        <button
          type="button"
          onClick={() => setMode('add')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'add'
              ? 'bg-amber-500 text-neutral-950 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Somar Dias Úteis a uma Data
        </button>
      </div>

      {/* Input Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Data Inicial
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {mode === 'between' ? (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Data Final
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Quantidade de Dias Úteis
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={daysToAdd}
                  onChange={(e) => setDaysToAdd(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setDaysToAdd('5')}
                  className="px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
                >
                  5d
                </button>
                <button
                  type="button"
                  onClick={() => setDaysToAdd('15')}
                  className="px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
                >
                  15d
                </button>
                <button
                  type="button"
                  onClick={() => setDaysToAdd('30')}
                  className="px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
                >
                  30d
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2 border-t border-neutral-800/60">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Considera automaticamente sábados, domingos e todos os feriados nacionais oficiais do Brasil (fixos e móveis).</span>
        </div>
      </div>

      {/* Result Cards */}
      {mode === 'between' && isValidBetween && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-800">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Total de Dias Úteis no Período
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-black text-emerald-400 font-mono tracking-tight">
                {businessDaysCount}
              </span>
              <span className="text-2xl font-bold text-neutral-300">
                {businessDaysCount === 1 ? 'dia útil' : 'dias úteis'}
              </span>
            </div>
            <div className="text-sm text-neutral-400 mt-2">
              De um total de <strong className="text-white">{totalCalendarDays} dias corridos</strong>
            </div>
          </div>

          {/* Breakdown List */}
          {holidaysList.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Feriados Nacionais Identificados ({holidaysList.length})
              </h4>
              <div className="space-y-2">
                {holidaysList.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-sm">
                    <span className="text-neutral-200 font-medium">{h.name}</span>
                    <span className="text-amber-400 font-mono text-xs">{h.date.split('-').reverse().join('/')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Resultado'}
            </button>
          </div>
        </div>
      )}

      {mode === 'add' && targetDateStr && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-800">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Data de Vencimento / Entrega Final
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight capitalize">
              {targetDateStr}
            </div>
            <div className="text-sm text-neutral-400 mt-2">
              Prazo calculado de <strong className="text-white">{daysToAdd} dias úteis</strong> a partir de {startDate.split('-').reverse().join('/')}
            </div>
          </div>

          {addHolidaysEncountered.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Feriados no Percurso ({addHolidaysEncountered.length})
              </h4>
              <div className="space-y-2">
                {addHolidaysEncountered.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-sm">
                    <span className="text-neutral-200 font-medium">{h.name}</span>
                    <span className="text-amber-400 font-mono text-xs">{h.date.split('-').reverse().join('/')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Data de Entrega'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
