"use client";

import React, { useState, useMemo } from "react";
import {
  Percent,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

export default function RuleOfThreeTool() {
  const [valA, setValA] = useState<string>("100");
  const [valB, setValB] = useState<string>("50");
  const [valC, setValC] = useState<string>("200");
  const [type, setType] = useState<"direct" | "inverse">("direct");
  const [copied, setCopied] = useState(false);

  const numA = parseFloat(valA);
  const numB = parseFloat(valB);
  const numC = parseFloat(valC);

  const result = useMemo(() => {
    if (isNaN(numA) || isNaN(numB) || isNaN(numC) || numA === 0) {
      return null;
    }

    let x = 0;
    if (type === "direct") {
      // A / B = C / X  =>  X = (B * C) / A
      x = (numB * numC) / numA;
    } else {
      // A * B = C * X  =>  X = (A * B) / C
      if (numC === 0) return null;
      x = (numA * numB) / numC;
    }

    return Math.round(x * 10000) / 10000;
  }, [numA, numB, numC, type]);

  const copyResult = () => {
    if (result === null) return;
    navigator.clipboard.writeText(String(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (exA: string, exB: string, exC: string, exType: "direct" | "inverse") => {
    setValA(exA);
    setValB(exB);
    setValC(exC);
    setType(exType);
  };

  return (
    <div className="space-y-8">
      {/* Seletor Direta / Inversa */}
      <div className="flex rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-1.5">
        <button
          onClick={() => setType("direct")}
          className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            type === "direct"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>Diretamente Proporcional</span>
          <span className="block text-[10px] font-normal opacity-80">(Se A aumenta, B aumenta)</span>
        </button>

        <button
          onClick={() => setType("inverse")}
          className={`flex-1 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            type === "inverse"
              ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <span>Inversamente Proporcional</span>
          <span className="block text-[10px] font-normal opacity-80">(Se A aumenta, B diminui)</span>
        </button>
      </div>

      {/* Grid Visual de Entradas da Regra de 3 */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Linha 1: A está para B */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 mb-1 block">Valor A:</label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="Ex: 100"
                className="w-full text-lg sm:text-xl font-bold rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
            <div className="pt-5 text-slate-400 font-bold">está para</div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 mb-1 block">Valor B:</label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="Ex: 50"
                className="w-full text-lg sm:text-xl font-bold rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Linha 2: C está para X (Resultado) */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 mb-1 block">Assim como C:</label>
              <input
                type="number"
                value={valC}
                onChange={(e) => setValC(e.target.value)}
                placeholder="Ex: 200"
                className="w-full text-lg sm:text-xl font-bold rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
            <div className="pt-5 text-slate-400 font-bold">está para</div>
            <div className="flex-1">
              <label className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 block">Resultado X:</label>
              <div className="flex items-center justify-between text-lg sm:text-xl font-black rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/40 p-3 text-blue-700 dark:text-blue-300">
                <span className="truncate">{result !== null ? result : "..."}</span>
                {result !== null && (
                  <button
                    onClick={copyResult}
                    title="Copiar resultado"
                    className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explicação Passo a Passo Didática */}
      {result !== null && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-3 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Demonstração Passo a Passo do Cálculo:</span>
          </h4>

          {type === "direct" ? (
            <div className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p>1) Fórmula Direta: X = (B × C) ÷ A</p>
              <p>2) Substituição: X = ({numB} × {numC}) ÷ {numA}</p>
              <p>3) Multiplicação: X = {numB * numC} ÷ {numA}</p>
              <p className="font-bold text-blue-600 dark:text-blue-400 pt-1">
                4) Resultado Final: X = {result}
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p>1) Fórmula Inversa: X = (A × B) ÷ C</p>
              <p>2) Substituição: X = ({numA} × {numB}) ÷ {numC}</p>
              <p>3) Multiplicação: X = {numA * numB} ÷ {numC}</p>
              <p className="font-bold text-purple-600 dark:text-purple-400 pt-1">
                4) Resultado Final: X = {result}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Exemplos Rápidos */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="font-bold text-slate-500">Exemplos rápidos:</span>
        <button
          onClick={() => loadExample("10", "50", "20", "direct")}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer shadow-2xs"
        >
          10 itens = R$ 50 → 20 itens = ?
        </button>
        <button
          onClick={() => loadExample("2", "6", "4", "inverse")}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 cursor-pointer shadow-2xs"
        >
          2 pessoas = 6 dias → 4 pessoas = ?
        </button>
      </div>
    </div>
  );
}
