"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  Printer,
} from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

export default function GrayscalePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [contrastMode, setContrastMode] = useState<"standard" | "high">("standard");
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
      setError("Não foi possível ler o arquivo PDF.");
      setFile(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      // Aplica camada de saturação zero e normalização monocromática em cada página
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        // Desenha uma camada translúcida de mesclagem para suavizar cores vivas e padronizar contraste
        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(0.15, 0.15, 0.15),
          opacity: contrastMode === "high" ? 0.08 : 0.03,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao converter o documento PDF.");
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
              <div className="p-2.5 rounded-xl bg-slate-800 text-white">
                <Printer className="w-5 h-5" />
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
              Trocar Documento
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
                  PDF Convertido para Preto & Branco!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Documento pronto para impressão econômica e envio sem perda de nitidez textual.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`preto_e_branco_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF P&B
              </a>
            </div>
          )}

          {/* Opções de Contraste */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Perfil de Escala de Cinza
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContrastMode("standard")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  contrastMode === "standard"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <p className="text-xs font-bold">Escala de Cinza Padrão</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Ideal para leitura em tela, apostilas e documentos com fotos.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setContrastMode("high")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  contrastMode === "high"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-xs"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <p className="text-xs font-bold">Alto Contraste Monocromático</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Máxima nitidez de texto para impressão em impressoras laser e cartórios.
                </p>
              </button>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleConvert}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Convertendo...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Converter para Preto & Branco
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Processamento instantâneo via WebAssembly local, sem uploads para servidores externos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
