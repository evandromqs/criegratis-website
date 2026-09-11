'use client';

import { useState } from 'react';
import { PieChart, Plus, Trash2, Copy, Check, Sparkles, Building, DollarSign } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  shares: number; // either % or value/shares
}

export default function ProfitSharingTool() {
  const [totalProfit, setTotalProfit] = useState('50000.00');
  const [reservePercent, setReservePercent] = useState('10'); // 10% kept for cash reserve
  const [mode, setMode] = useState<'percent' | 'shares'>('percent');

  const [partners, setPartners] = useState<Partner[]>([
    { id: '1', name: 'Sócio Fundador A', shares: 50 },
    { id: '2', name: 'Sócio B (Operação)', shares: 30 },
    { id: '3', name: 'Sócio C (Investidor)', shares: 20 },
  ]);

  const [copied, setCopied] = useState(false);

  const profit = parseFloat(totalProfit.replace(',', '.')) || 0;
  const reservePct = parseFloat(reservePercent.replace(',', '.')) || 0;

  const reserveAmount = profit * (reservePct / 100);
  const distributableProfit = Math.max(0, profit - reserveAmount);

  // Sum of partner shares
  const totalShares = partners.reduce((sum, p) => sum + (p.shares || 0), 0);

  const formatBrl = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAddPartner = () => {
    const newId = (partners.length + 1).toString();
    setPartners([...partners, { id: newId, name: `Sócio ${String.fromCharCode(65 + partners.length)}`, shares: 10 }]);
  };

  const handleRemovePartner = (id: string) => {
    if (partners.length <= 2) return; // keep at least 2 partners
    setPartners(partners.filter(p => p.id !== id));
  };

  const handleUpdatePartner = (id: string, field: 'name' | 'shares', value: any) => {
    setPartners(partners.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handleCopy = async () => {
    let report = `Relatório de Distribuição de Lucros - CrieGrátis:\nLucro Total Líquido: ${formatBrl(profit)}\nReserva da Empresa (${reservePct}%): ${formatBrl(reserveAmount)}\nValor Distribuído aos Sócios: ${formatBrl(distributableProfit)}\n\nDivisão por Sócio:\n`;

    partners.forEach((p) => {
      const sharePct = totalShares > 0 ? (p.shares / totalShares) * 100 : 0;
      const amount = distributableProfit * (sharePct / 100);
      report += `- ${p.name}: ${sharePct.toFixed(1)}% → ${formatBrl(amount)}\n`;
    });

    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Configuration Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Profit */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Lucro Líquido a Distribuir (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-neutral-500 font-medium">R$</span>
              <input
                type="number"
                step="100"
                min="0"
                value={totalProfit}
                onChange={(e) => setTotalProfit(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Company Reserve */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Reserva da Empresa (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={reservePercent}
                onChange={(e) => setReservePercent(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="absolute right-4 top-3.5 text-neutral-500 font-medium">%</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">Reinvestimento e caixa</p>
          </div>
        </div>

        {/* Partners Section */}
        <div className="pt-4 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Quadro de Sócios / Participação</h3>
              <p className="text-xs text-neutral-400">Insira a porcentagem ou cotas de cada participante</p>
            </div>
            <button
              type="button"
              onClick={handleAddPartner}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              Adicionar Sócio
            </button>
          </div>

          <div className="space-y-3">
            {partners.map((partner, index) => {
              const sharePct = totalShares > 0 ? (partner.shares / totalShares) * 100 : 0;
              const amount = distributableProfit * (sharePct / 100);

              return (
                <div
                  key={partner.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => handleUpdatePartner(partner.id, 'name', e.target.value)}
                      placeholder="Nome do Sócio"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="w-full sm:w-36 relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={partner.shares}
                      onChange={(e) => handleUpdatePartner(partner.id, 'shares', parseFloat(e.target.value) || 0)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-3 pr-8 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                    <span className="absolute right-3 top-2 text-xs text-neutral-500 font-medium">cotas/%</span>
                  </div>

                  <div className="w-full sm:w-44 text-right sm:text-right flex items-center justify-between sm:justify-end gap-2 px-1">
                    <div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        {formatBrl(amount)}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {sharePct.toFixed(1)}% do total
                      </div>
                    </div>

                    {partners.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePartner(partner.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Remover sócio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalShares > 0 && Math.abs(totalShares - 100) > 0.01 && (
            <p className="text-xs text-amber-400 mt-3">
              Aviso: A soma das cotas/porcentagens é {totalShares.toFixed(1)}. O cálculo proporcional acima ajustou automaticamente as frações de cada sócio para totalizar 100%.
            </p>
          )}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="text-center pb-6 border-b border-neutral-800">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
            Total Líquido Distribuído aos Sócios
          </div>
          <div className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight">
            {formatBrl(distributableProfit)}
          </div>
          {reserveAmount > 0 && (
            <div className="text-sm text-neutral-400 mt-2">
              {formatBrl(reserveAmount)} ({reservePct}%) retido na conta da empresa como reserva
            </div>
          )}
        </div>

        {/* Visual Bar Breakdown */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Divisão Proporcional Visual
          </div>
          <div className="h-4 rounded-full overflow-hidden flex bg-neutral-800">
            {partners.map((p, idx) => {
              const sharePct = totalShares > 0 ? (p.shares / totalShares) * 100 : 0;
              const colors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-cyan-500'];
              const color = colors[idx % colors.length];
              return (
                <div
                  key={p.id}
                  className={`h-full ${color}`}
                  style={{ width: `${sharePct}%` }}
                  title={`${p.name}: ${sharePct.toFixed(1)}%`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-neutral-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatório dos Sócios'}
          </button>
        </div>
      </div>
    </div>
  );
}
