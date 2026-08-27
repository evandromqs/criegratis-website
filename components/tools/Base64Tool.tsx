"use client";

import React, { useState, useMemo } from "react";
import {
  Binary,
  Copy,
  Check,
  Trash2,
  Lock,
  Unlock,
  AlertCircle,
} from "lucide-react";

function utf8ToBase64(str: string): string {
  try {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    return btoa(unescape(encodeURIComponent(str)));
  }
}

function base64ToUtf8(b64: string): { text: string; error?: string } {
  try {
    const clean = b64.trim().replace(/\s+/g, "");
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder().decode(bytes);
    return { text: decoded };
  } catch (err: any) {
    return { text: "", error: "Código Base64 inválido ou corrompido." };
  }
}

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("Olá mundo! Teste de acentuação: café & coração ❤️");
  const [copied, setCopied] = useState<boolean>(false);

  const outputResult = useMemo(() => {
    if (!input) return { text: "", error: undefined };
    if (mode === "encode") {
      return { text: utf8ToBase64(input) };
    } else {
      return base64ToUtf8(input);
    }
  }, [input, mode]);

  const copyOutput = () => {
    if (!outputResult.text) return;
    navigator.clipboard.writeText(outputResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    if (mode === "encode") {
      setInput("CrieGrátis — 100 Ferramentas Gratuitas e Privadas no Navegador!");
    } else {
      setInput("Q3JpZUdyw6F0aXMg4oCUIDEwMCBGZXJyYW1lbnRhcyBHcmF0dWl0YXMgZSBQcml2YWRhcyBubyBOYXZlZ2Fkb3Ih");
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Modo */}
      <div className="flex rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-1.5">
        <button
          onClick={() => {
            setMode("encode");
            setInput("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "encode"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>Codificar (Texto → Base64)</span>
        </button>

        <button
          onClick={() => {
            setMode("decode");
            setInput("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            mode === "decode"
              ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Unlock className="h-4 w-4" />
          <span>Decodificar (Base64 → Texto)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entrada */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {mode === "encode" ? "Texto de Entrada (UTF-8):" : "Código Base64 de Entrada:"}
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Carregar Exemplo
              </button>
              {input && (
                <button
                  onClick={() => setInput("")}
                  className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Limpar</span>
                </button>
              )}
            </div>
          </div>

          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Digite ou cole o texto que deseja codificar para Base64..."
                : "Cole a sequência em Base64 aqui para decodificar..."
            }
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Saída */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {mode === "encode" ? "Resultado em Base64:" : "Resultado Decodificado (Texto):"}
            </label>
            {outputResult.text && (
              <button
                onClick={copyOutput}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copiado!" : "Copiar Resultado"}</span>
              </button>
            )}
          </div>

          {outputResult.error ? (
            <div className="h-[208px] rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 p-4 flex flex-col items-center justify-center text-center text-rose-700 dark:text-rose-300 space-y-2">
              <AlertCircle className="h-8 w-8 text-rose-500" />
              <p className="text-xs sm:text-sm font-bold">{outputResult.error}</p>
              <p className="text-[11px] text-rose-500 opacity-80">
                Verifique se o texto colado é uma sequência Base64 válida.
              </p>
            </div>
          ) : (
            <textarea
              readOnly
              rows={8}
              value={outputResult.text}
              placeholder="O resultado será gerado automaticamente aqui..."
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/90 p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden select-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}
