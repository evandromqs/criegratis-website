"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2, FileText, Sparkles, RefreshCw } from "lucide-react";

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());

  const toSentenceCase = () => {
    const res = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w|\n\s*\w)/g, (c) => c.toUpperCase());
    setText(res);
  };

  const toTitleCase = () => {
    const res = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(res);
  };

  const toAlternatingCase = () => {
    let alt = "";
    for (let i = 0; i < text.length; i++) {
      alt += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    setText(alt);
  };

  const cleanWords = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9À-ÿ\s]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const toCamelCase = () => {
    const words = cleanWords(text);
    if (words.length === 0) return;
    const res = words
      .map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join("");
    setText(res);
  };

  const toPascalCase = () => {
    const words = cleanWords(text);
    if (words.length === 0) return;
    const res = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    setText(res);
  };

  const toSnakeCase = () => {
    const words = cleanWords(text);
    setText(words.map((w) => w.toLowerCase()).join("_"));
  };

  const toKebabCase = () => {
    const words = cleanWords(text);
    setText(words.map((w) => w.toLowerCase()).join("-"));
  };

  const toConstantCase = () => {
    const words = cleanWords(text);
    setText(words.map((w) => w.toUpperCase()).join("_"));
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText("O CrieGrátis é uma suíte completa de ferramentas 100% gratuitas e privadas.");
  };

  return (
    <div className="space-y-6">
      {/* Botões de Ação de Conversão */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <button
          onClick={toUpperCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          MAIÚSCULAS
        </button>
        <button
          onClick={toLowerCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          minúsculas
        </button>
        <button
          onClick={toTitleCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          Primeira Letra
        </button>
        <button
          onClick={toSentenceCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          Início de Frases
        </button>
        <button
          onClick={toAlternatingCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          aLtErNaDo
        </button>
        <button
          onClick={toCamelCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          camelCase
        </button>
        <button
          onClick={toPascalCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          PascalCase
        </button>
        <button
          onClick={toSnakeCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          snake_case
        </button>
        <button
          onClick={toKebabCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          kebab-case
        </button>
        <button
          onClick={toConstantCase}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
        >
          CONSTANT_CASE
        </button>
      </div>

      {/* Caixa de Texto */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Digite, cole ou clique nos botões acima para converter:
          </label>
          <div className="flex items-center gap-3">
            {!text && (
              <button
                onClick={loadSample}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Carregar Exemplo
              </button>
            )}
            {text && (
              <button
                onClick={() => setText("")}
                className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={9}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole seu texto aqui e selecione a formatação desejada..."
          className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
        />
      </div>

      {/* Barra de Rodapé: Contadores & Botão Copiar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>{wordCount} palavras</span>
          <span>•</span>
          <span>{charCount} caracteres</span>
        </div>

        <button
          onClick={copyText}
          disabled={!text}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 text-xs sm:text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? "Texto Copiado!" : "Copiar Texto Convertido"}</span>
        </button>
      </div>
    </div>
  );
}
