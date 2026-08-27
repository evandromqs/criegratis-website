"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Files,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface PdfItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export default function MergePdfTool() {
  const [pdfList, setPdfList] = useState<PdfItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: PdfItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        const id = Math.random().toString(36).substring(2, 9);
        let pageCount = undefined;

        try {
          const buffer = await file.arrayBuffer();
          const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
          pageCount = doc.getPageCount();
        } catch (e) {
          console.warn("Não foi possível pré-carregar páginas do PDF:", e);
        }

        newItems.push({
          id,
          file,
          name: file.name,
          size: file.size,
          pageCount,
        });
      }
    }

    setPdfList((prev) => [...prev, ...newItems]);
  };

  const removePdf = (id: string) => {
    setPdfList((prev) => prev.filter((item) => item.id !== id));
  };

  const movePdf = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === pdfList.length - 1)
    )
      return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const nextList = [...pdfList];
    const temp = nextList[index];
    nextList[index] = nextList[targetIndex];
    nextList[targetIndex] = temp;
    setPdfList(nextList);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const mergePdfs = async () => {
    if (pdfList.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of pdfList) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "documentos-unificados-criegratis.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao juntar PDFs:", err);
      alert("Ocorreu um erro ao processar os arquivos PDF. Verifique se os arquivos não estão protegidos por senha.");
    } finally {
      setIsMerging(false);
    }
  };

  const totalPages = pdfList.reduce((acc, curr) => acc + (curr.pageCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Upload Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[0.99]"
            : "border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50 hover:bg-slate-100/70 dark:hover:bg-slate-900/80 hover:border-blue-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="application/pdf,.pdf"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3 shadow-xs">
          <Files className="h-7 w-7" />
        </div>
        <p className="text-base font-bold text-slate-900 dark:text-white">
          Clique para selecionar ou arraste seus arquivos PDF aqui
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Adicione 2 ou mais documentos PDF para combiná-los em um único arquivo
        </p>
      </div>

      {pdfList.length > 0 && (
        <div className="space-y-6">
          {/* Header da Lista */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {pdfList.length} documento{pdfList.length > 1 ? "s" : ""} carregado{pdfList.length > 1 ? "s" : ""}
              </span>
              {totalPages > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total estimado: {totalPages} páginas no documento unificado
                </p>
              )}
            </div>
            <button
              onClick={() => setPdfList([])}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpar Lista
            </button>
          </div>

          {/* Lista de PDFs com Reordenação */}
          <div className="space-y-2.5">
            {pdfList.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 shadow-2xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-300">
                    {idx + 1}
                  </span>

                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
                      <span>{formatFileSize(item.size)}</span>
                      {item.pageCount && (
                        <>
                          <span>•</span>
                          <span>{item.pageCount} página{item.pageCount > 1 ? "s" : ""}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => movePdf(idx, "up")}
                      disabled={idx === 0}
                      title="Subir ordem"
                      className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => movePdf(idx, "down")}
                      disabled={idx === pdfList.length - 1}
                      title="Descer ordem"
                      className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removePdf(item.id)}
                    title="Remover"
                    className="rounded-lg p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de Mesclagem */}
          <div className="pt-2">
            <button
              onClick={mergePdfs}
              disabled={pdfList.length < 2 || isMerging}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 px-6 text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              {isMerging ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Juntando PDFs no seu navegador...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>
                    {pdfList.length < 2
                      ? "Adicione pelo menos 2 PDFs para juntar"
                      : `Juntar e Baixar PDF Unificado (${pdfList.length} Arquivos)`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
