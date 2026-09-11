'use client';

import { useState } from 'react';
import { Cake, Copy, Check, Sparkles, Clock, Heart, Star } from 'lucide-react';

function getZodiac(month: number, day: number): { sign: string; element: string } {
  // month is 1-indexed
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Áries', element: 'Fogo' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Touro', element: 'Terra' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gêmeos', element: 'Ar' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Câncer', element: 'Água' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leão', element: 'Fogo' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgem', element: 'Terra' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', element: 'Ar' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Escorpião', element: 'Água' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagitário', element: 'Fogo' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricórnio', element: 'Terra' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquário', element: 'Ar' };
  return { sign: 'Peixes', element: 'Água' };
}

export default function ExactAgeTool() {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [birthTime, setBirthTime] = useState('12:00');
  const [copied, setCopied] = useState(false);

  const bDate = new Date(`${birthDate}T${birthTime || '00:00'}:00`);
  const now = new Date();
  const isValid = !isNaN(bDate.getTime()) && bDate <= now;

  let years = 0;
  let months = 0;
  let days = 0;
  let totalDays = 0;
  let totalHours = 0;
  let nextBirthdayDays = 0;
  let zodiac = { sign: '', element: '' };

  if (isValid) {
    totalDays = Math.floor((now.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
    totalHours = Math.floor((now.getTime() - bDate.getTime()) / (1000 * 60 * 60));

    let curYear = now.getFullYear();
    let curMonth = now.getMonth();
    let curDay = now.getDate();

    let bYear = bDate.getFullYear();
    let bMonth = bDate.getMonth();
    let bDay = bDate.getDate();

    years = curYear - bYear;
    months = curMonth - bMonth;
    days = curDay - bDay;

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(curYear, curMonth, 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Next birthday
    let nextB = new Date(curYear, bMonth, bDay);
    if (nextB < now) {
      nextB = new Date(curYear + 1, bMonth, bDay);
    }
    nextBirthdayDays = Math.ceil((nextB.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    zodiac = getZodiac(bMonth + 1, bDay);
  }

  const estimatedHeartbeats = (totalHours * 60 * 75).toLocaleString('pt-BR');

  const handleCopy = async () => {
    const text = `Idade Exata - CrieGrátis:\nNascido em: ${birthDate}\nIdade: ${years} anos, ${months} meses e ${days} dias\nTotal de dias vividos: ${totalDays.toLocaleString('pt-BR')} dias (${totalHours.toLocaleString('pt-BR')} horas)\nFaltam ${nextBirthdayDays} dias para o próximo aniversário\nSigno: ${zodiac.sign} (${zodiac.element})`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Data de Nascimento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Hora de Nascimento (opcional)
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {isValid && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-center pb-6 border-b border-neutral-800">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Sua Idade Exata
            </div>
            <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl sm:text-6xl font-black text-amber-400 font-mono">{years}</span>
                <span className="text-lg text-neutral-300 font-semibold">anos</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-white font-mono">{months}</span>
                <span className="text-sm text-neutral-400 font-medium">meses</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-white font-mono">{days}</span>
                <span className="text-sm text-neutral-400 font-medium">dias</span>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Dias Vividos</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1">
                {totalDays.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-neutral-500 mt-1">dias completos</div>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Próximo Aniversário</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono mt-1">
                {nextBirthdayDays}
              </div>
              <div className="text-xs text-neutral-500 mt-1">dias restantes</div>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Signo do Zodíaco</div>
              <div className="text-lg sm:text-xl font-bold text-purple-400 mt-1">
                {zodiac.sign}
              </div>
              <div className="text-xs text-neutral-500 mt-1">Elemento {zodiac.element}</div>
            </div>

            <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
              <div className="text-xs text-neutral-400">Batimentos Estimados</div>
              <div className="text-lg sm:text-xl font-bold text-rose-400 font-mono mt-1 truncate">
                ~{estimatedHeartbeats}
              </div>
              <div className="text-xs text-neutral-500 mt-1">batimentos cardíacos</div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Resumo da Idade'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
