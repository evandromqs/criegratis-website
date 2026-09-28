"use client";

import React, { useState } from "react";
import {
  FileText,
  Crop,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

export default function CropPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [cropTop, setCropTop] = useState<number>(30);
  const [cropBottom, setCropBottom] = useState<number>(30);
  const [cropLeft, setCropLeft] = useState<number>(20);
  const [cropRight, setCropRight] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf") && selectedFile.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPageCount(pdf.getPageCount());
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o arquivo PDF.");
      setFile(null);
    }
  };

  const handleCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const newX = cropLeft;
        const newY = cropBottom;
        const newWidth = Math.max(50, width - cropLeft - cropRight);
        const newHeight = Math.max(50, height - cropTop - cropBottom);

        page.setCropBox(newX, newY, newWidth, newHeight);
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao aplicar recorte no documento PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          onFileSelect={handleFile}
          maxSizeMB={50}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Crop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total de {pageCount} página(s)</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setDownloadUrl(null);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              Trocar Arquivo
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {downloadUrl && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  PDF Recortado com Sucesso!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  As margens brancas foram removidas das {pageCount} páginas do documento.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`recortado_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Recortado
              </a>
            </div>
          )}

          {/* Ajuste de Margens */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Definir Margens a Cortar (Pontos / Pixels)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Superior (Topo)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={cropTop}
                    onChange={(e) => setCropTop(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold text-slate-800 dark:text-slate-200 text-center"
                  />
                  <span className="text-xs text-slate-400">px</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Inferior (Base)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={cropBottom}
                    onChange={(e) => setCropBottom(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold text-slate-800 dark:text-slate-200 text-center"
                  />
                  <span className="text-xs text-slate-400">px</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Esquerda
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={cropLeft}
                    onChange={(e) => setCropLeft(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold text-slate-800 dark:text-slate-200 text-center"
                  />
                  <span className="text-xs text-slate-400">px</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Direita
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={200}
                    value={cropRight}
                    onChange={(e) => setCropRight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm font-bold text-slate-800 dark:text-slate-200 text-center"
                  />
                  <span className="text-xs text-slate-400">px</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleCrop}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Aplicando Recorte...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Cortar Margens de Todas as Páginas
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              O corte de margens ajusta a caixa de exibição física do PDF sem recompactação com perda de qualidade.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
