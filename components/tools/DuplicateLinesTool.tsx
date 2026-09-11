"use client";

import React, { useState, useMemo } from "react";
import { ListFilter, Copy, Check, Download, RotateCcw, Trash2 } from "lucide-react";

export default function DuplicateLinesTool() {
  const [input, setInput] = useState<string>("");
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [trimLines, setTrimLines] = useState<boolean>(true);
  const [removeEmpty, setRemoveEmpty] = useState<boolean>(true);
  const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const { output, originalCount, uniqueCount, duplicatesRemoved } = useMemo(() => {
    if (!input) {
      return { output: "", originalCount: 0, uniqueCount: 0, duplicatesRemoved: 0 };
    }

    let lines = input.split(/\r?\n/);
    const totalLines = lines.length;

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }

    if (removeEmpty) {
      lines = lines.filter((l) => l.length > 0);
    }

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }

    if (sortAlphabetically) {
      uniqueLines.sort((a, b) => a.localeCompare("pt-BR"));
    }

    return {
      output: uniqueLines.join("\n"),
      originalCount: totalLines,
      uniqueCount: uniqueLines.length,
      duplicatesRemoved: Math.max(0, totalLines - uniqueLines.length),
    };
  }, [input, caseSensitive, trimLines, removeEmpty, sortAlphabetically]);

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
    a.download = "linhas_unicas.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Controles de Configuração */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ListFilter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Filtros de Deduplicação</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure as regras de limpeza</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Texto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Diferenciar Maiúsculas</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Ignorar Espaços</span>
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
              checked={sortAlphabetically}
              onChange={(e) => setSortAlphabetically(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Ordenar de A-Z</span>
          </label>
        </div>
      </div>

      {/* Editor Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Entrada */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Texto Original</span>
            <span className="text-slate-400 font-mono">{originalCount} linhas</span>
          </div>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole sua lista de itens, e-mails ou nomes aqui (uma linha por item)..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Saída */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Linhas Únicas (Sem Repetições)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              {uniqueCount} únicas ({duplicatesRemoved} removidas)
            </span>
          </div>
          <textarea
            readOnly
            rows={12}
            value={output}
            placeholder="O resultado com linhas únicas aparecerá aqui em tempo real..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Barra de Ações */}
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
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar Linhas Únicas</span>
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
