'use client';

import { useState } from 'react';
import { Calendar, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function DateDiffTool() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);

  // default end date: +30 days
  const future30 = new Date();
  future30.setDate(future30.getDate() + 30);
  const [endDate, setEndDate] = useState(future30.toISOString().split('T')[0]);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [copied, setCopied] = useState(false);

  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');

  const isValid = !isNaN(start.getTime()) && !isNaN(end.getTime());
  const isReverse = isValid && start > end;

  // Ordering
  const d1 = isReverse ? end : start;
  const d2 = isReverse ? start : end;

  let totalDays = 0;
  let businessDays = 0;
  let weekendDays = 0;

  if (isValid) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Count weekend vs business
    const cur = new Date(d1);
    const stop = new Date(d2);
    if (!includeEndDay) stop.setDate(stop.getDate() - 1);

    while (cur <= stop) {
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = totalDays * 24;

  // Approximate months
  const approxMonths = (totalDays / 30.4375).toFixed(1);

  const handleCopy = async () => {
    const text = `Diferença entre Datas - CrieGrátis:\nDe ${startDate} até ${endDate}\nTotal de dias: ${totalDays} dias (${businessDays} dias úteis, ${weekendDays} dias de fim de semana)\nEquivalente a: ${weeks} semanas e ${remainingDays} dias (${totalHours.toLocaleString('pt-BR')} horas)`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickAdd = (days: number) => {
    const d = new Date(startDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setEndDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-8">
      {/* Date Selection Box */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-300">
                Data Inicial
              </label>
              <button
                type="button"
                onClick={() => setStartDate(todayStr)}
                className="text-xs text-amber-400 hover:underline"
              >
                Definir Hoje
              </button>
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* End Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-300">
                Data Final
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(7)}
                  className="text-xs text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  +7d
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(15)}
                  className="text-xs text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  +15d
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(30)}
                  className="text-xs text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  +30d
                </button>
              </div>
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/60">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={includeEndDay}
              onChange={(e) => setIncludeEndDay(e.target.checked)}
              className="w-4 h-4 rounded accent-amber-500 bg-neutral-950 border-neutral-800"
            />
            Incluir a data final na contagem (inclusivo)
          </label>
        </div>
      </div>

      {/* Results Overview */}
      {isValid && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-800">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Diferença Total
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl font-black text-amber-400 font-mono tracking-tight">
                {totalDays}
              </span>
              <span className="text-2xl font-bold text-neutral-300">
                {totalDays === 1 ? 'dia' : 'dias'}
              </span>
            </div>
            <div className="text-sm text-neutral-400 mt-2">
              Equivalente a <strong className="text-white">{weeks} semanas</strong> {remainingDays > 0 && `e ${remainingDays} dias`} (~{approxMonths} meses)
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Dias Úteis (Seg-Sex)</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                {businessDays}
              </div>
              <div className="text-xs text-neutral-500 mt-1">Sem fins de semana</div>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Fins de Semana</div>
              <div className="text-2xl font-bold text-blue-400 font-mono mt-1">
                {weekendDays}
              </div>
              <div className="text-xs text-neutral-500 mt-1">Sábados e domingos</div>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Horas Totais</div>
              <div className="text-2xl font-bold text-neutral-200 font-mono mt-1">
                {totalHours.toLocaleString('pt-BR')}h
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {(totalHours * 60).toLocaleString('pt-BR')} minutos
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Resumo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
