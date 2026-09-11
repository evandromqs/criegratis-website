"use client";

import React, { useState, useMemo } from "react";
import { Link2, Copy, Check, ArrowRightLeft, Trash2 } from "lucide-react";

export default function UrlEncodeTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("https://criegratis.com.br/busca?termo=ferramentas gratuitas&categoria=imagens");
  const [componentMode, setComponentMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null };
    try {
      if (mode === "encode") {
        const res = componentMode ? encodeURIComponent(input) : encodeURI(input);
        return { output: res, error: null };
      } else {
        const res = componentMode ? decodeURIComponent(input) : decodeURI(input);
        return { output: res, error: null };
      }
    } catch (err: unknown) {
      return { output: "", error: "Sequência de caracteres inválida para decodificação de URL." };
    }
  }, [input, mode, componentMode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode((m) => (m === "encode" ? "decode" : "encode"));
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Abas e Controles */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Operação de URL</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Codificação e decodificação RFC 3986</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSwap}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1.5 transition-colors px-2 py-1 rounded-lg"
              title="Inverter entrada com saída"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              Inverter
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Seletor Encode/Decode */}
          <div className="grid grid-cols-2 gap-2 w-full sm:w-72">
            <button
              type="button"
              onClick={() => setMode("encode")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                mode === "encode"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Codificar (Encode)
            </button>
            <button
              type="button"
              onClick={() => setMode("decode")}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                mode === "decode"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Decodificar (Decode)
            </button>
          </div>

          {/* Opção encodeURIComponent */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={componentMode}
              onChange={(e) => setComponentMode(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Codificar parâmetros estritos (encodeURIComponent)</span>
          </label>
        </div>
      </div>

      {/* Editor Entrada / Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {mode === "encode" ? "URL ou Texto Bruto" : "URL Codificada com %"}
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole o endereço ou parâmetros aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {mode === "encode" ? "URL Codificada" : "Texto Decodificado"}
          </label>
          <textarea
            readOnly
            rows={8}
            value={error || output}
            placeholder="O resultado transformado aparecerá aqui..."
            className={`w-full rounded-2xl border p-4 text-xs font-mono focus:outline-hidden ${
              error
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            }`}
          />
        </div>
      </div>

      {output && !error && (
        <button
          type="button"
          onClick={handleCopy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-300" />
              <span>URL Copiada com Sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar Resultado</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
