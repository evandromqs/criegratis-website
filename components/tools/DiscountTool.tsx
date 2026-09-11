'use client';

import { useState } from 'react';
import { Tag, Copy, Check, Sparkles, TrendingDown, Percent, ArrowRight } from 'lucide-react';

export default function DiscountTool() {
  const [mode, setMode] = useState<'standard' | 'findPercent' | 'findOriginal'>('standard');

  // Mode standard: price + discountPercent -> finalPrice & savings
  const [originalPrice, setOriginalPrice] = useState('250.00');
  const [discountPercent, setDiscountPercent] = useState('20');

  // Mode findPercent: originalPrice + finalPrice -> discountPercent
  const [paidPrice, setPaidPrice] = useState('200.00');

  const [copied, setCopied] = useState(false);

  // Parse numbers
  const orig = parseFloat(originalPrice.replace(',', '.')) || 0;
  const pct = parseFloat(discountPercent.replace(',', '.')) || 0;
  const paid = parseFloat(paidPrice.replace(',', '.')) || 0;

  let calculatedFinal = 0;
  let calculatedSavings = 0;
  let calculatedPercent = 0;
  let calculatedOriginal = 0;

  if (mode === 'standard') {
    calculatedSavings = orig * (pct / 100);
    calculatedFinal = Math.max(0, orig - calculatedSavings);
  } else if (mode === 'findPercent') {
    if (orig > 0) {
      calculatedSavings = Math.max(0, orig - paid);
      calculatedPercent = (calculatedSavings / orig) * 100;
      calculatedFinal = paid;
    }
  } else if (mode === 'findOriginal') {
    if (pct < 100) {
      calculatedOriginal = paid / (1 - pct / 100);
      calculatedSavings = calculatedOriginal - paid;
    }
  }

  const formatBrl = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleCopy = async () => {
    let text = '';
    if (mode === 'standard') {
      text = `Cálculo de Desconto - CrieGrátis:\nPreço Original: ${formatBrl(orig)}\nDesconto: ${pct}%\nEconomia: ${formatBrl(calculatedSavings)}\nPreço Final a Pagar: ${formatBrl(calculatedFinal)}`;
    } else if (mode === 'findPercent') {
      text = `Desconto Real - CrieGrátis:\nPreço Original: ${formatBrl(orig)}\nPreço Pago: ${formatBrl(paid)}\nDesconto Obtido: ${calculatedPercent.toFixed(1)}%\nEconomia Total: ${formatBrl(calculatedSavings)}`;
    } else {
      text = `Preço Antes do Desconto - CrieGrátis:\nPreço com Desconto: ${formatBrl(paid)}\nDesconto Aplicado: ${pct}%\nPreço Original Anterior: ${formatBrl(calculatedOriginal)}\nEconomia: ${formatBrl(calculatedSavings)}`;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setMode('standard')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'standard'
              ? 'bg-amber-500 text-neutral-950 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Calcular Preço com Desconto
        </button>
        <button
          type="button"
          onClick={() => setMode('findPercent')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'findPercent'
              ? 'bg-amber-500 text-neutral-950 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Descobrir % de Desconto
        </button>
        <button
          type="button"
          onClick={() => setMode('findOriginal')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'findOriginal'
              ? 'bg-amber-500 text-neutral-950 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Calcular Preço Original
        </button>
      </div>

      {/* Input Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        {mode === 'standard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Preço Original (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-neutral-500 font-medium">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Porcentagem de Desconto (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="absolute right-4 top-3.5 text-neutral-500 font-medium">%</span>
              </div>
            </div>

            {/* Quick chips */}
            <div className="md:col-span-2 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/60">
              <span className="text-xs text-neutral-400">Atalhos rápidos:</span>
              {[5, 10, 15, 20, 25, 30, 40, 50, 70].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDiscountPercent(p.toString())}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                    discountPercent === p.toString()
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'findPercent' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Preço Original Sem Desconto (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-neutral-500 font-medium">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Preço Final Pago com Desconto (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-neutral-500 font-medium">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={paidPrice}
                  onChange={(e) => setPaidPrice(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {mode === 'findOriginal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Preço Pago com Desconto (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-neutral-500 font-medium">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={paidPrice}
                  onChange={(e) => setPaidPrice(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Porcentagem de Desconto Aplicada (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="99"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="absolute right-4 top-3.5 text-neutral-500 font-medium">%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Result Overview */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        {mode === 'standard' && (
          <div>
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Preço Final com Desconto
              </div>
              <div className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight">
                {formatBrl(calculatedFinal)}
              </div>
              <div className="text-sm text-neutral-400 mt-2">
                Você economiza <strong className="text-amber-400 font-semibold">{formatBrl(calculatedSavings)}</strong> ({pct}% de desconto)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
                <div className="text-xs text-neutral-400">Preço Original</div>
                <div className="text-2xl font-bold text-neutral-300 font-mono mt-1 line-through decoration-rose-500">
                  {formatBrl(orig)}
                </div>
              </div>
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 text-center">
                <div className="text-xs text-neutral-400">Total Economizado</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                  - {formatBrl(calculatedSavings)}
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'findPercent' && (
          <div>
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Porcentagem de Desconto Real
              </div>
              <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight">
                {calculatedPercent.toFixed(1)}%
              </div>
              <div className="text-sm text-neutral-400 mt-2">
                Economia total de <strong className="text-emerald-400 font-semibold">{formatBrl(calculatedSavings)}</strong> na compra
              </div>
            </div>
          </div>
        )}

        {mode === 'findOriginal' && (
          <div>
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Preço Original Anterior
              </div>
              <div className="text-5xl sm:text-6xl font-black text-neutral-200 font-mono tracking-tight">
                {formatBrl(calculatedOriginal)}
              </div>
              <div className="text-sm text-neutral-400 mt-2">
                Com o desconto de {pct}%, você pagou <strong className="text-emerald-400">{formatBrl(paid)}</strong>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}
