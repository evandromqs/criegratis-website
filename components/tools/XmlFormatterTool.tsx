"use client";

import React, { useState, useMemo } from "react";
import { Code2, Copy, Check, Download, CheckCircle2, XCircle, Trash2 } from "lucide-react";

function formatXML(xml: string, indentSize: number = 2): { formatted: string; error: string | null } {
  if (!xml.trim()) return { formatted: "", error: null };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    const parserError = doc.querySelector("parsererror");

    if (parserError) {
      return {
        formatted: "",
        error: parserError.textContent || "Erro de sintaxe no XML fornecido.",
      };
    }

    // Algoritmo de formatação com recuo
    const PADDING = " ".repeat(indentSize);
    const reg = /(>)(<)(\/*)/g;
    let formatted = xml.replace(/\r?\n/g, "").replace(reg, "$1\r\n$2$3");
    let pad = 0;

    const lines = formatted.split("\r\n").map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = PADDING.repeat(pad);
      pad += indent;
      return padding + node;
    });

    return { formatted: lines.join("\n"), error: null };
  } catch (err: unknown) {
    return {
      formatted: "",
      error: err instanceof Error ? err.message : "Erro ao processar o arquivo XML.",
    };
  }
}

export default function XmlFormatterTool() {
  const [input, setInput] = useState<string>(
    `<notaFiscal><emitente><cnpj>12345678000195</cnpj><razaoSocial>Empresa Exemplo LTDA</razaoSocial></emitente><itens><item id="1"><descricao>Teclado Mecanico</descricao><valor>250.00</valor></item><item id="2"><descricao>Mouse Sem Fio</descricao><valor>120.00</valor></item></itens></notaFiscal>`
  );
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const { formatted, error } = useMemo(() => {
    return formatXML(input, indentSize);
  }, [input, indentSize]);

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!formatted) return;
    const blob = new Blob([formatted], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatado.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Formatador e Validador de XML</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Embeleze e verifique a sintaxe de NF-e e arquivos XML</p>
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

        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Espaçamento de Indentação:</span>
          <div className="flex gap-1.5">
            {[2, 4].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setIndentSize(size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  indentSize === size
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {size} Espaços
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Entrada / Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">XML de Entrada</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole seu código ou arquivo XML aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 dark:text-slate-300">XML Formatado</span>
            {input.trim() && (
              <span className={`flex items-center gap-1 ${error ? "text-rose-600" : "text-emerald-600"}`}>
                {error ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> Erro de Sintaxe
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> XML Válido
                  </>
                )}
              </span>
            )}
          </div>
          <textarea
            readOnly
            rows={12}
            value={error || formatted}
            placeholder="O XML formatado aparecerá aqui..."
            className={`w-full rounded-2xl border p-4 text-xs font-mono focus:outline-hidden ${
              error
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                : "border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-400"
            }`}
          />
        </div>
      </div>

      {formatted && !error && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>XML Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar XML Formatado</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Baixar .XML</span>
          </button>
        </div>
      )}
    </div>
  );
}
