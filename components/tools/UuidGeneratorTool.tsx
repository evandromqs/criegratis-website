"use client";

import React, { useState } from "react";
import { Key, Copy, Check, RefreshCw, Sliders, Trash2 } from "lucide-react";

export default function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [braces, setBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>(() => generateList(5, false, true, false));
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  function generateSingle(isUpper: boolean, hasHyphens: boolean, hasBraces: boolean): string {
    let id = "";
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      // Fallback v4
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hasHyphens) {
      id = id.replace(/-/g, "");
    }
    if (isUpper) {
      id = id.toUpperCase();
    } else {
      id = id.toLowerCase();
    }
    if (hasBraces) {
      id = `{${id}}`;
    }
    return id;
  }

  function generateList(qty: number, isUpper: boolean, hasHyphens: boolean, hasBraces: boolean): string[] {
    const list: string[] = [];
    for (let i = 0; i < qty; i++) {
      list.push(generateSingle(isUpper, hasHyphens, hasBraces));
    }
    return list;
  }

  const handleGenerate = () => {
    setUuids(generateList(quantity, uppercase, hyphens, braces));
  };

  const copySingle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Opções de Configuração */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Quantidade:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value={1}>1 UUID</option>
            <option value={5}>5 UUIDs</option>
            <option value={10}>10 UUIDs</option>
            <option value={25}>25 UUIDs</option>
            <option value={50}>50 UUIDs</option>
            <option value={100}>100 UUIDs</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Caixa de Letras:
          </label>
          <select
            value={uppercase ? "upper" : "lower"}
            onChange={(e) => setUppercase(e.target.value === "upper")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="lower">minúsculas (padrão)</option>
            <option value="upper">MAIÚSCULAS</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Hifens de Separação:
          </label>
          <select
            value={hyphens ? "yes" : "no"}
            onChange={(e) => setHyphens(e.target.value === "yes")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="yes">Com Hifens (36 caracteres)</option>
            <option value="no">Sem Hifens (32 caracteres)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Chaves Envolventes:
          </label>
          <select
            value={braces ? "yes" : "no"}
            onChange={(e) => setBraces(e.target.value === "yes")}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="no">Sem Chaves</option>
            <option value="yes">Com Chaves &#123;...&#125;</option>
          </select>
        </div>
      </div>

      {/* Botão de Geração */}
      <button
        onClick={handleGenerate}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 text-sm shadow-md transition-all cursor-pointer"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Gerar Novos UUIDs v4</span>
      </button>

      {/* Lista de Resultados */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            UUIDs Gerados ({uuids.length}):
          </span>
          <button
            onClick={copyAll}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
          >
            {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedAll ? "Copiados!" : "Copiar Lista Completa"}</span>
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {uuids.map((id, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 py-2.5 shadow-2xs"
            >
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate mr-2">
                {id}
              </span>
              <button
                onClick={() => copySingle(id, idx)}
                className="flex items-center gap-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shadow-2xs shrink-0"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
