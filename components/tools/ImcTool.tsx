'use client';

import { useState } from 'react';
import { Activity, Copy, Check, Info, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';

interface ImcCategory {
  label: string;
  min: number;
  max: number;
  color: string;
  badgeColor: string;
  textColor: string;
  description: string;
}

const CATEGORIES: ImcCategory[] = [
  {
    label: 'Abaixo do Peso',
    min: 0,
    max: 18.5,
    color: 'bg-blue-500',
    badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    textColor: 'text-blue-400',
    description: 'Pode indicar desnutrição ou problemas de saúde. Procure avaliação médica.'
  },
  {
    label: 'Peso Normal',
    min: 18.5,
    max: 24.9,
    color: 'bg-emerald-500',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    textColor: 'text-emerald-400',
    description: 'Parabéns! Seu peso está dentro da faixa saudável recomendada pela OMS.'
  },
  {
    label: 'Sobrepeso',
    min: 25.0,
    max: 29.9,
    color: 'bg-amber-500',
    badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    textColor: 'text-amber-400',
    description: 'Atenção aos hábitos alimentares e prática de atividades físicas para prevenir complicações.'
  },
  {
    label: 'Obesidade Grau I',
    min: 30.0,
    max: 34.9,
    color: 'bg-orange-500',
    badgeColor: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    textColor: 'text-orange-400',
    description: 'Risco moderado de hipertensão, colesterol e diabetes. Recomenda-se acompanhamento nutricional.'
  },
  {
    label: 'Obesidade Grau II',
    min: 35.0,
    max: 39.9,
    color: 'bg-rose-500',
    badgeColor: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    textColor: 'text-rose-400',
    description: 'Obesidade severa. Alto risco de doenças cardiovasculares. Consulte um médico especialista.'
  },
  {
    label: 'Obesidade Grau III',
    min: 40.0,
    max: 999,
    color: 'bg-red-600',
    badgeColor: 'bg-red-600/10 border-red-600/30 text-red-400',
    textColor: 'text-red-400',
    description: 'Obesidade mórbida. Risco crítico para a saúde geral. Acompanhamento médico multidisciplinar urgente.'
  }
];

export default function ImcTool() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [copied, setCopied] = useState(false);

  const w = parseFloat(weight.replace(',', '.'));
  const hCm = parseFloat(height.replace(',', '.'));
  const hM = hCm > 3 ? hCm / 100 : hCm; // auto handles cm or meters

  let imc: number | null = null;
  let currentCategory: ImcCategory | null = null;
  let minIdealWeight = 0;
  let maxIdealWeight = 0;

  if (w > 0 && hM > 0) {
    imc = w / (hM * hM);
    currentCategory = CATEGORIES.find(c => imc! >= c.min && imc! < c.max) || CATEGORIES[CATEGORIES.length - 1];
    minIdealWeight = 18.5 * (hM * hM);
    maxIdealWeight = 24.9 * (hM * hM);
  }

  const handleCopy = async () => {
    if (!imc || !currentCategory) return;
    const text = `Resultado IMC - CrieGrátis:\nPeso: ${w} kg | Altura: ${(hM * 100).toFixed(0)} cm\nIMC: ${imc.toFixed(1)} (${currentCategory.label})\nFaixa de peso ideal: ${minIdealWeight.toFixed(1)} kg a ${maxIdealWeight.toFixed(1)} kg`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-300">
                Seu Peso (kg)
              </label>
              <span className="text-xs text-neutral-400">Ex: 72.5</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="20"
                max="300"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 70"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="absolute right-4 top-3.5 text-neutral-500 text-sm font-medium">kg</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-300">
                Sua Altura (cm ou metros)
              </label>
              <span className="text-xs text-neutral-400">Ex: 175 ou 1.75</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0.5"
                max="250"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ex: 175"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="absolute right-4 top-3.5 text-neutral-500 text-sm font-medium">
                {hCm > 3 ? 'cm' : 'm'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick sample buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/60">
          <span className="text-xs text-neutral-400">Exemplos rápidos:</span>
          <button
            type="button"
            onClick={() => { setWeight('65'); setHeight('170'); }}
            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors"
          >
            65 kg, 1,70 m
          </button>
          <button
            type="button"
            onClick={() => { setWeight('82'); setHeight('178'); }}
            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors"
          >
            82 kg, 1,78 m
          </button>
          <button
            type="button"
            onClick={() => { setWeight('52'); setHeight('162'); }}
            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors"
          >
            52 kg, 1,62 m
          </button>
        </div>
      </div>

      {/* Result Display */}
      {imc && currentCategory ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Seu Índice de Massa Corporal
              </div>
              <div className="flex items-baseline justify-center sm:justify-start gap-3">
                <span className="text-5xl font-black text-white font-mono tracking-tight">
                  {imc.toFixed(1)}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full border font-semibold ${currentCategory.badgeColor}`}>
                  {currentCategory.label}
                </span>
              </div>
              <p className="text-sm text-neutral-400 mt-2 max-w-md">
                {currentCategory.description}
              </p>
            </div>

            {/* Ideal Weight Card */}
            <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 text-center sm:text-right min-w-[200px]">
              <div className="text-xs text-neutral-400 font-medium">Faixa de Peso Ideal</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                {minIdealWeight.toFixed(1)} kg – {maxIdealWeight.toFixed(1)} kg
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {w < minIdealWeight ? (
                  <span className="text-blue-400 flex items-center justify-center sm:justify-end gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> {(minIdealWeight - w).toFixed(1)} kg abaixo do ideal
                  </span>
                ) : w > maxIdealWeight ? (
                  <span className="text-amber-400 flex items-center justify-center sm:justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {(w - maxIdealWeight).toFixed(1)} kg acima do ideal
                  </span>
                ) : (
                  <span className="text-emerald-400">Dentro da faixa recomendada!</span>
                )}
              </div>
            </div>
          </div>

          {/* Visual Gauge Scale */}
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-2">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
            <div className="relative h-4 rounded-full overflow-hidden flex bg-neutral-800">
              <div className="h-full bg-blue-500" style={{ width: '15%' }} title="Abaixo do peso (&lt; 18.5)" />
              <div className="h-full bg-emerald-500" style={{ width: '30%' }} title="Normal (18.5 a 24.9)" />
              <div className="h-full bg-amber-500" style={{ width: '20%' }} title="Sobrepeso (25 a 29.9)" />
              <div className="h-full bg-orange-500" style={{ width: '15%' }} title="Obesidade I (30 a 34.9)" />
              <div className="h-full bg-rose-500" style={{ width: '10%' }} title="Obesidade II (35 a 39.9)" />
              <div className="h-full bg-red-600" style={{ width: '10%' }} title="Obesidade III (40+)" />
            </div>

            {/* Marker */}
            {(() => {
              const clamped = Math.min(Math.max(imc, 15), 45);
              const percent = ((clamped - 15) / (45 - 15)) * 100;
              return (
                <div
                  className="w-3 h-3 bg-white border-2 border-neutral-900 rounded-full shadow -mt-3.5 transition-all"
                  style={{ marginLeft: `calc(${percent}% - 6px)` }}
                />
              );
            })()}
          </div>

          {/* WHO Table breakdown */}
          <div className="overflow-x-auto rounded-xl border border-neutral-800">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-neutral-950 text-neutral-400 font-semibold border-b border-neutral-800">
                <tr>
                  <th className="py-2.5 px-4">Classificação (OMS)</th>
                  <th className="py-2.5 px-4 font-mono">Faixa de IMC</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {CATEGORIES.map((cat, idx) => {
                  const isActive = currentCategory?.label === cat.label;
                  return (
                    <tr
                      key={idx}
                      className={isActive ? 'bg-amber-500/10 font-semibold' : 'text-neutral-300 hover:bg-neutral-800/40'}
                    >
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                        {cat.label}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-neutral-400">
                        {cat.max === 999 ? `≥ ${cat.min}` : `${cat.min} – ${cat.max}`}
                      </td>
                      <td className="py-2.5 px-4">
                        {isActive ? (
                          <span className="text-amber-400 font-medium">← Sua faixa atual</span>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Copy Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Resultado Copiado!' : 'Copiar Diagnóstico'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
