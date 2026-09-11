"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, Copy, Check, Download, Trash2 } from "lucide-react";

export default function SortListTool() {
  const [input, setInput] = useState<string>(
    "Banana\nMaçã\nAbacaxi\nLaranja\nUva\nMorango"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "num-asc" | "num-desc" | "len">("asc");
  const [ignoreAccents, setIgnoreAccents] = useState<boolean>(true);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(true);
  const [addNumbering, setAddNumbering] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!input) return "";

    let lines = input.split(/\r?\n/);

    if (removeEmpty) {
      lines = lines.filter((l) => l.trim().length > 0);
    }

    lines.sort((a, b) => {
      if (sortOrder === "len") {
        return a.length - b.length;
      }

      if (sortOrder === "num-asc" || sortOrder === "num-desc") {
        const numA = parseFloat(a.replace(/[^\d.-]/g, "")) || 0;
        const numB = parseFloat(b.replace(/[^\d.-]/g, "")) || 0;
        return sortOrder === "num-asc" ? numA - numB : numB - numA;
      }

      // Ordenação Alfabética
      const compA = ignoreAccents ? a.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : a;
      const compB = ignoreAccents ? b.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : b;

      const res = compA.localeCompare(compB, "pt-BR", { sensitivity: "base", numeric: true });
      return sortOrder === "asc" ? res : -res;
    });

    if (addNumbering) {
      lines = lines.map((line, idx) => `${idx + 1}. ${line}`);
    }

    return lines.join("\n");
  }, [input, sortOrder, ignoreAccents, removeEmpty, addNumbering]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_ordenada.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Opções de Ordenação */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ArrowUpDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Configurações de Ordenação</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Classifique listas alfabética ou numericamente</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>

        {/* Tipos de Ordenação */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {[
            { id: "asc", label: "A → Z (Crescente)" },
            { id: "desc", label: "Z → A (Decrescente)" },
            { id: "num-asc", label: "1 → 9 (Numérico)" },
            { id: "num-desc", label: "9 → 1 (Decrescente)" },
            { id: "len", label: "Pelo Tamanho" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSortOrder(item.id as typeof sortOrder)}
              className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                sortOrder === item.id
                  ? "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-200 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Modificadores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ignoreAccents}
              onChange={(e) => setIgnoreAccents(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Ignorar Acentos (A = Á)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Remover Linhas Vazias</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={addNumbering}
              onChange={(e) => setAddNumbering(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Adicionar Numeração (1, 2, 3)</span>
          </label>
        </div>
      </div>

      {/* Editor Entrada / Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lista Original</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole os itens que você quer ordenar..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Lista Ordenada</label>
          <textarea
            readOnly
            rows={10}
            value={output}
            placeholder="A lista classificada aparecerá aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {output && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Lista Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar Lista Ordenada</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Baixar .TXT</span>
          </button>
        </div>
      )}
    </div>
  );
}
