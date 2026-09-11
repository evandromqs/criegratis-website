"use client";

import React, { useState, useMemo } from "react";
import { Pilcrow, Copy, Check, RefreshCw } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

function generateSentence(): string {
  const len = Math.floor(Math.random() * 10) + 8;
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(): string {
  const sentenceCount = Math.floor(Math.random() * 4) + 4;
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

export default function LoremIpsumTool() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [includeHtml, setIncludeHtml] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const output = useMemo(() => {
    let result = "";

    if (type === "words") {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
      }
      if (startWithLorem && words.length >= 2) {
        words[0] = "Lorem";
        words[1] = "ipsum";
      }
      result = words.join(" ");
    } else if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }
      result = sentences.join(" ");
    } else {
      // Parágrafos
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      if (startWithLorem && paragraphs.length > 0) {
        paragraphs[0] =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
          paragraphs[0];
      }

      if (includeHtml) {
        result = paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
      } else {
        result = paragraphs.join("\n\n");
      }
    }

    return result;
  }, [type, count, startWithLorem, includeHtml, seed]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Pilcrow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Configuração do Texto</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gere textos fictícios para layouts e design</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegenerate}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regerar Texto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Unidade */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tipo de Conteúdo</label>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              {[
                { id: "paragraphs", label: "Parágrafos" },
                { id: "sentences", label: "Frases" },
                { id: "words", label: "Palavras" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id as typeof type)}
                  className={`py-1.5 rounded-lg font-bold text-center transition-all ${
                    type === item.id
                      ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Quantidade: <span className="text-blue-600 font-mono">{count}</span>
            </label>
            <input
              type="range"
              min="1"
              max={type === "paragraphs" ? 15 : type === "sentences" ? 30 : 100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer mt-2"
            />
          </div>

          {/* Opções extras */}
          <div className="space-y-2 flex flex-col justify-center">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span>Iniciar com "Lorem ipsum"</span>
            </label>

            {type === "paragraphs" && (
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeHtml}
                  onChange={(e) => setIncludeHtml(e.target.checked)}
                  className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Envolver em tags &lt;p&gt;</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Caixa de Texto Gerado */}
      <div className="space-y-3">
        <textarea
          readOnly
          rows={10}
          value={output}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-hidden leading-relaxed"
        />

        <button
          type="button"
          onClick={handleCopy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-300" />
              <span>Lorem Ipsum Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar Texto Gerado</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
