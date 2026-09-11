"use client";

import React, { useState, useMemo } from "react";
import { AlignJustify, FileText, Hash, Trash2, Copy, Check } from "lucide-react";

export default function LineCounterTool() {
  const [text, setText] = useState<string>(
    "O Crie Grátis é uma suíte de ferramentas online gratuitas.\n\nTodo o processamento é feito 100% no seu navegador com privacidade total.\nSem cadastro, sem limites e sem enviar arquivos para servidores remotos."
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    if (!text) {
      return {
        totalLines: 0,
        nonEmptyLines: 0,
        emptyLines: 0,
        paragraphs: 0,
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        maxLineLength: 0,
        avgLineLength: 0,
      };
    }

    const lines = text.split(/\r?\n/);
    const totalLines = lines.length;
    const nonEmptyLines = lines.filter((l) => l.trim().length > 0).length;
    const emptyLines = totalLines - nonEmptyLines;

    // Parágrafos: blocos separados por uma ou mais linhas vazias
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;

    const lineLengths = lines.map((l) => l.length);
    const maxLineLength = Math.max(...lineLengths, 0);
    const avgLineLength = totalLines > 0 ? Math.round(charsWithSpaces / totalLines) : 0;

    return {
      totalLines,
      nonEmptyLines,
      emptyLines,
      paragraphs,
      words,
      charsWithSpaces,
      charsNoSpaces,
      maxLineLength,
      avgLineLength,
    };
  }, [text]);

  const handleCopyMetrics = () => {
    const summary = `Métricas do Texto:
• Linhas Totais: ${stats.totalLines}
• Linhas com Texto: ${stats.nonEmptyLines}
• Linhas Vazias: ${stats.emptyLines}
• Parágrafos: ${stats.paragraphs}
• Palavras: ${stats.words}
• Caracteres (com espaços): ${stats.charsWithSpaces}
• Caracteres (sem espaços): ${stats.charsNoSpaces}
• Linha Mais Longa: ${stats.maxLineLength} caracteres
• Média por Linha: ${stats.avgLineLength} caracteres`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Total de Linhas
          </span>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {stats.totalLines}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Linhas com Texto
          </span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {stats.nonEmptyLines}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Linhas Vazias
          </span>
          <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {stats.emptyLines}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Parágrafos
          </span>
          <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {stats.paragraphs}
          </span>
        </div>
      </div>

      {/* Editor de Texto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <AlignJustify className="w-4 h-4 text-blue-600" />
            Digite ou cole seu texto abaixo:
          </label>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole seu texto para contagem em tempo real..."
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
        />
      </div>

      {/* Estatísticas Detalhadas & Ações */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Detalhamento Adicional
          </h4>

          <button
            type="button"
            onClick={handleCopyMetrics}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Métricas Copiadas!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Relatório de Métricas</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Total de Palavras</span>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{stats.words}</span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Caracteres c/ Espaços</span>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{stats.charsWithSpaces}</span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Linha Mais Longa</span>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{stats.maxLineLength} chars</span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-slate-400 block text-[10px]">Média por Linha</span>
            <span className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">{stats.avgLineLength} chars</span>
          </div>
        </div>
      </div>
    </div>
  );
}
