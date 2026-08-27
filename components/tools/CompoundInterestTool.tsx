"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  PiggyBank,
  Sparkles,
  Table as TableIcon,
} from "lucide-react";

interface EvolutionPoint {
  period: number;
  label: string;
  totalInvested: number;
  totalInterest: number;
  totalBalance: number;
}

export default function CompoundInterestTool() {
  const [initialValue, setInitialValue] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [rateType, setRateType] = useState<"annual" | "monthly">("annual");
  const [period, setPeriod] = useState<number>(5);
  const [periodType, setPeriodType] = useState<"years" | "months">("years");

  // Cálculo da evolução dos juros
  const calculation = useMemo(() => {
    const totalMonths = periodType === "years" ? period * 12 : period;
    
    // Converte taxa anual para mensal equivalente caso necessário
    let monthlyRate = 0;
    if (rateType === "annual") {
      monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    } else {
      monthlyRate = interestRate / 100;
    }

    let currentBalance = initialValue;
    let totalInvested = initialValue;
    const history: EvolutionPoint[] = [];

    history.push({
      period: 0,
      label: "Início",
      totalInvested: initialValue,
      totalInterest: 0,
      totalBalance: initialValue,
    });

    for (let m = 1; m <= totalMonths; m++) {
      const interestEarned = currentBalance * monthlyRate;
      currentBalance += interestEarned + monthlyContribution;
      totalInvested += monthlyContribution;

      // Guarda pontos chave para o gráfico e tabela
      if (totalMonths <= 24 || m % 12 === 0 || m === totalMonths) {
        history.push({
          period: m,
          label: periodType === "years" ? `Ano ${Math.ceil(m / 12)}` : `Mês ${m}`,
          totalInvested: Math.round(totalInvested * 100) / 100,
          totalInterest: Math.round((currentBalance - totalInvested) * 100) / 100,
          totalBalance: Math.round(currentBalance * 100) / 100,
        });
      }
    }

    const totalInterest = currentBalance - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;

    return {
      totalBalance: currentBalance,
      totalInvested,
      totalInterest,
      returnPercentage,
      history,
      totalMonths,
    };
  }, [initialValue, monthlyContribution, interestRate, rateType, period, periodType]);

  const formatBrl = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Formulário de Parâmetros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 sm:p-6">
        {/* Valor Inicial */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Valor Inicial (R$):</span>
          </label>
          <input
            type="number"
            min={0}
            step={100}
            value={initialValue}
            onChange={(e) => setInitialValue(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Aporte Mensal */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <PiggyBank className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Aporte Mensal (R$):</span>
          </label>
          <input
            type="number"
            min={0}
            step={50}
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Taxa de Juros */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <Percent className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Taxa de Juros (%):</span>
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              min={0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
            />
            <select
              value={rateType}
              onChange={(e) => setRateType(e.target.value as "annual" | "monthly")}
              className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden shrink-0"
            >
              <option value="annual">ao ano (% a.a.)</option>
              <option value="monthly">ao mês (% a.m.)</option>
            </select>
          </div>
        </div>

        {/* Período */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span>Período:</span>
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              min={1}
              max={600}
              value={period}
              onChange={(e) => setPeriod(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
            />
            <select
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as "years" | "months")}
              className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden shrink-0"
            >
              <option value="years">Anos</option>
              <option value="months">Meses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards de Métricas e Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Final */}
        <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/30 dark:to-slate-900 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            Valor Total Final
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {formatBrl(calculation.totalBalance)}
          </p>
        </div>

        {/* Total Investido */}
        <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-slate-900 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">
            Total Investido (Bolso)
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {formatBrl(calculation.totalInvested)}
          </p>
        </div>

        {/* Total em Juros */}
        <div className="rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/30 dark:to-slate-900 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
            Total em Juros Ganhos
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {formatBrl(calculation.totalInterest)}
          </p>
        </div>

        {/* Rentabilidade */}
        <div className="rounded-3xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/30 dark:to-slate-900 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 mb-1">
            Rentabilidade dos Juros
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            +{calculation.returnPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Gráfico Visual de Barras */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Evolução do Patrimônio ao Longo do Tempo:</span>
          </h3>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-xs bg-blue-500" />
              <span className="text-slate-600 dark:text-slate-400">Total Investido</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-xs bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-400">Juros Acumulados</span>
            </div>
          </div>
        </div>

        {/* Barra comparativa geral */}
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-xl overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            <div
              style={{
                width: `${(calculation.totalInvested / calculation.totalBalance) * 100}%`,
              }}
              className="bg-blue-500 h-full transition-all duration-500"
              title={`Investido: ${formatBrl(calculation.totalInvested)}`}
            />
            <div
              style={{
                width: `${(calculation.totalInterest / calculation.totalBalance) * 100}%`,
              }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Juros: ${formatBrl(calculation.totalInterest)}`}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>Investido: {((calculation.totalInvested / calculation.totalBalance) * 100).toFixed(0)}%</span>
            <span>Juros: {((calculation.totalInterest / calculation.totalBalance) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Tabela de Evolução Período a Período */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs overflow-hidden">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TableIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Tabela Detalhada de Rendimento:</span>
        </h3>

        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold sticky top-0 bg-white dark:bg-slate-900">
              <tr>
                <th className="pb-2.5 font-bold">Período</th>
                <th className="pb-2.5 font-bold">Total Investido</th>
                <th className="pb-2.5 font-bold">Juros Acumulados</th>
                <th className="pb-2.5 font-bold">Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {calculation.history.map((pt, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300">{pt.label}</td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400">{formatBrl(pt.totalInvested)}</td>
                  <td className="py-2.5 font-bold text-emerald-600 dark:text-emerald-400">+{formatBrl(pt.totalInterest)}</td>
                  <td className="py-2.5 font-black text-slate-900 dark:text-white">{formatBrl(pt.totalBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
