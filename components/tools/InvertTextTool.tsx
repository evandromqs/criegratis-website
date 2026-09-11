"use client";

import React, { useState, useMemo } from "react";
import { RotateCw, Copy, Check, Trash2, ArrowLeftRight } from "lucide-react";

// Tabela de caracteres Unicode de cabeça para baixo
const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l",
  m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
  y: "ʎ", z: "z", A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ò", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ",
  W: "M", X: "X", Y: "⅄", Z: "Z", "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ",
  "6": "9", "7": "ㄥ", "8": "8", "9": "6", ".": "˙", ",": "'", "?": "¿", "!": "¡", "\"": "„",
};

export default function InvertTextTool() {
  const [input, setInput] = useState<string>("Crie Grátis — Ferramentas Gratuitas e Rápidas");
  const [mode, setMode] = useState<"chars" | "words" | "lines" | "upside">("chars");
  const [copied, setCopied] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!input) return "";

    switch (mode) {
      case "chars":
        // Inverte caractere por caractere
        return Array.from(input).reverse().join("");

      case "words":
        // Inverte a ordem das palavras de cada linha
        return input
          .split("\n")
          .map((line) => line.split(/\s+/).reverse().join(" "))
          .join("\n");

      case "lines":
        // Inverte a ordem das linhas
        return input.split(/\r?\n/).reverse().join("\n");

      case "upside":
        // Converte cada letra para o caractere de cabeça para baixo e inverte
        return Array.from(input)
          .map((ch) => UPSIDE_DOWN_MAP[ch] || ch)
          .reverse()
          .join("");

      default:
        return input;
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Modos */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Tipo de Inversão</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Escolha como o texto deve ser transformado</p>
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {[
            { id: "chars", label: "Inverter Caracteres", desc: "Ex: Brasil → lisarB" },
            { id: "words", label: "Inverter Palavras", desc: "Ex: Bom dia → dia Bom" },
            { id: "lines", label: "Inverter Linhas", desc: "De baixo para cima" },
            { id: "upside", label: "De Cabeça p/ Baixo", desc: "Ex: Olá → ɐlO" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id as typeof mode)}
              className={`p-3 rounded-xl border text-left transition-all ${
                mode === item.id
                  ? "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-200 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
              }`}
            >
              <div className="text-xs font-bold">{item.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Entrada e Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Texto Original</label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite ou cole o texto que deseja inverter..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Texto Invertido</label>
          <textarea
            readOnly
            rows={8}
            value={output}
            placeholder="O resultado invertido aparecerá aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {output && (
        <button
          type="button"
          onClick={handleCopy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-300" />
              <span>Texto Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar Texto Invertido</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
