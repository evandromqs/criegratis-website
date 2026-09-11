"use client";

import React, { useState, useMemo } from "react";
import { GitCompare, Plus, Minus, FileText, Check, Copy } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  leftLineNum?: number;
  rightLineNum?: number;
}

export default function DiffCheckerTool() {
  const [originalText, setOriginalText] = useState<string>(
    "O Crie Grátis é uma suíte de ferramentas.\nProcessamento seguro e rápido.\nSuporte a imagens e calculadoras."
  );
  const [modifiedText, setModifiedText] = useState<string>(
    "O Crie Grátis é uma suíte completa de ferramentas.\nProcessamento 100% seguro e ultra rápido.\nSuporte a imagens, calculadoras e textos offline."
  );

  const { diffLines, addedCount, removedCount } = useMemo(() => {
    const origLines = originalText.split(/\r?\n/);
    const modLines = modifiedText.split(/\r?\n/);

    const diff: DiffLine[] = [];
    let added = 0;
    let removed = 0;

    let i = 0;
    let j = 0;

    while (i < origLines.length || j < modLines.length) {
      if (i < origLines.length && j < modLines.length) {
        if (origLines[i] === modLines[j]) {
          diff.push({
            type: "unchanged",
            text: origLines[i],
            leftLineNum: i + 1,
            rightLineNum: j + 1,
          });
          i++;
          j++;
        } else {
          // Checa se o próximo da esquerda combina com o atual da direita
          const nextInMod = modLines.indexOf(origLines[i], j);
          const nextInOrig = origLines.indexOf(modLines[j], i);

          if (nextInMod !== -1 && (nextInOrig === -1 || nextInMod - j <= nextInOrig - i)) {
            // Linhas foram adicionadas à direita
            while (j < nextInMod) {
              diff.push({
                type: "added",
                text: modLines[j],
                rightLineNum: j + 1,
              });
              added++;
              j++;
            }
          } else if (nextInOrig !== -1) {
            // Linhas foram removidas da esquerda
            while (i < nextInOrig) {
              diff.push({
                type: "removed",
                text: origLines[i],
                leftLineNum: i + 1,
              });
              removed++;
              i++;
            }
          } else {
            // Linha alterada: trata como remoção + adição
            diff.push({
              type: "removed",
              text: origLines[i],
              leftLineNum: i + 1,
            });
            removed++;
            i++;

            diff.push({
              type: "added",
              text: modLines[j],
              rightLineNum: j + 1,
            });
            added++;
            j++;
          }
        }
      } else if (i < origLines.length) {
        diff.push({
          type: "removed",
          text: origLines[i],
          leftLineNum: i + 1,
        });
        removed++;
        i++;
      } else if (j < modLines.length) {
        diff.push({
          type: "added",
          text: modLines[j],
          rightLineNum: j + 1,
        });
        added++;
        j++;
      }
    }

    return { diffLines: diff, addedCount: added, removedCount: removed };
  }, [originalText, modifiedText]);

  return (
    <div className="space-y-6">
      {/* Inputs Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>Texto Original (Antes)</span>
            <span className="text-slate-400 font-mono text-[11px]">{originalText.split("\n").length} linhas</span>
          </label>
          <textarea
            rows={8}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Cole o texto original aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>Texto Modificado (Depois)</span>
            <span className="text-slate-400 font-mono text-[11px]">{modifiedText.split("\n").length} linhas</span>
          </label>
          <textarea
            rows={8}
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="Cole a nova versão modificada aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Barra de Status e Métricas */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Resultado da Comparação (Diff)</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
            <Plus className="w-3.5 h-3.5" /> {addedCount} adições
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 px-2.5 py-1 text-rose-700 dark:text-rose-300">
            <Minus className="w-3.5 h-3.5" /> {removedCount} remoções
          </span>
        </div>
      </div>

      {/* Visualizador de Diff */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden font-mono text-xs shadow-inner">
        <div className="max-h-96 overflow-auto divide-y divide-slate-800">
          {diffLines.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Cole os dois textos acima para inspecionar as diferenças.</div>
          ) : (
            diffLines.map((line, idx) => {
              if (line.type === "added") {
                return (
                  <div key={idx} className="flex items-center bg-emerald-950/40 text-emerald-300 px-4 py-1.5 hover:bg-emerald-950/60 transition-colors">
                    <span className="w-8 select-none text-slate-600 text-right pr-3 font-mono text-[10px]"></span>
                    <span className="w-8 select-none text-emerald-500 font-bold text-right pr-3 font-mono text-[10px]">{line.rightLineNum}</span>
                    <span className="select-none text-emerald-400 font-bold mr-3">+</span>
                    <span className="break-all whitespace-pre-wrap">{line.text}</span>
                  </div>
                );
              }
              if (line.type === "removed") {
                return (
                  <div key={idx} className="flex items-center bg-rose-950/40 text-rose-300 px-4 py-1.5 hover:bg-rose-950/60 transition-colors">
                    <span className="w-8 select-none text-rose-500 font-bold text-right pr-3 font-mono text-[10px]">{line.leftLineNum}</span>
                    <span className="w-8 select-none text-slate-600 text-right pr-3 font-mono text-[10px]"></span>
                    <span className="select-none text-rose-400 font-bold mr-3">-</span>
                    <span className="break-all whitespace-pre-wrap line-through opacity-80">{line.text}</span>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex items-center text-slate-400 px-4 py-1.5 hover:bg-slate-850 transition-colors">
                  <span className="w-8 select-none text-slate-600 text-right pr-3 font-mono text-[10px]">{line.leftLineNum}</span>
                  <span className="w-8 select-none text-slate-600 text-right pr-3 font-mono text-[10px]">{line.rightLineNum}</span>
                  <span className="select-none text-slate-600 mr-3"> </span>
                  <span className="break-all whitespace-pre-wrap text-slate-200">{line.text}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
