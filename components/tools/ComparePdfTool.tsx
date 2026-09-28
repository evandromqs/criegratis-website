"use client";

import React, { useState } from "react";
import {
  FileText,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface PdfMeta {
  file: File;
  name: string;
  size: number;
  pageCount: number;
  title?: string;
  author?: string;
  producer?: string;
}

export default function ComparePdfTool() {
  const [docA, setDocA] = useState<PdfMeta | null>(null);
  const [docB, setDocB] = useState<PdfMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDoc = async (file: File, target: "A" | "B") => {
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const meta: PdfMeta = {
        file,
        name: file.name,
        size: file.size,
        pageCount: pdf.getPageCount(),
        title: pdf.getTitle() || "Sem título definido",
        author: pdf.getAuthor() || "Não informado",
        producer: pdf.getProducer() || "Não informado",
      };

      if (target === "A") setDocA(meta);
      else setDocB(meta);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao ler o arquivo PDF.");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Upload dos dois documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documento A */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
              Versão Original (A)
            </span>
            {docA && (
              <button
                type="button"
                onClick={() => setDocA(null)}
                className="text-xs text-rose-600 hover:underline"
              >
                Trocar
              </button>
            )}
          </div>

          {!docA ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all text-center">
              <FileText className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selecione o Primeiro PDF (Versão A)
              </span>
              <span className="text-[10px] text-slate-400 mt-1">Ou arraste o arquivo aqui</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && loadDoc(e.target.files[0], "A")}
              />
            </label>
          ) : (
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-100 break-all">{docA.name}</p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-slate-600 dark:text-slate-300">
                <p><strong>Páginas:</strong> {docA.pageCount}</p>
                <p><strong>Tamanho:</strong> {formatSize(docA.size)}</p>
                <p><strong>Título:</strong> {docA.title}</p>
                <p><strong>Autor:</strong> {docA.author}</p>
              </div>
            </div>
          )}
        </div>

        {/* Documento B */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Nova Versão (B)
            </span>
            {docB && (
              <button
                type="button"
                onClick={() => setDocB(null)}
                className="text-xs text-rose-600 hover:underline"
              >
                Trocar
              </button>
            )}
          </div>

          {!docB ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-center">
              <FileText className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selecione o Segundo PDF (Versão B)
              </span>
              <span className="text-[10px] text-slate-400 mt-1">Ou arraste o arquivo aqui</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && loadDoc(e.target.files[0], "B")}
              />
            </label>
          ) : (
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-100 break-all">{docB.name}</p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-slate-600 dark:text-slate-300">
                <p><strong>Páginas:</strong> {docB.pageCount}</p>
                <p><strong>Tamanho:</strong> {formatSize(docB.size)}</p>
                <p><strong>Título:</strong> {docB.title}</p>
                <p><strong>Autor:</strong> {docB.author}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {/* Relatório de Comparação */}
      {docA && docB && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Relatório de Comparação Estrutural
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Quantidade de Páginas</span>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {docA.pageCount === docB.pageCount ? (
                  <span className="text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Idêntica ({docA.pageCount})
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Diferente ({docA.pageCount} vs {docB.pageCount})
                  </span>
                )}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Diferença de Tamanho</span>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {Math.abs(docA.size - docB.size) === 0
                  ? "Mesmo tamanho"
                  : `${docB.size > docA.size ? "+" : "-"}${formatSize(Math.abs(docA.size - docB.size))}`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Status Geral</span>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {docA.name === docB.name && docA.size === docB.size
                  ? "Arquivos Idênticos"
                  : "Versões Distintas"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p>
          Privacidade garantida: Os PDFs são processados lado a lado estritamente no seu navegador web, ideal para comparar minutas confidenciais de contratos.
        </p>
      </div>
    </div>
  );
}
