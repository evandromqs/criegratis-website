"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function OverlayPdfTool() {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [stampFile, setStampFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOverlay = async () => {
    if (!docFile || !stampFile) {
      setError("Por favor, selecione ambos os arquivos PDF.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const docBuffer = await docFile.arrayBuffer();
      const stampBuffer = await stampFile.arrayBuffer();

      const mainPdf = await PDFDocument.load(docBuffer, { ignoreEncryption: true });
      const stampPdf = await PDFDocument.load(stampBuffer, { ignoreEncryption: true });

      // Embebe a 1ª página da folha timbrada
      const [embeddedStamp] = await mainPdf.embedPdf(stampPdf, [0]);

      const pages = mainPdf.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawPage(embeddedStamp, {
          x: 0,
          y: 0,
          width,
          height,
        });
      });

      const pdfBytes = await mainPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao aplicar a folha timbrada sobre o documento.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documento Principal */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
            1. Documento Base (Contrato / Relatório)
          </span>

          {!docFile ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all text-center">
              <FileText className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selecione o PDF do Documento Base
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setDocFile(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                {docFile.name}
              </span>
              <button
                type="button"
                onClick={() => setDocFile(null)}
                className="text-rose-600 hover:underline"
              >
                Trocar
              </button>
            </div>
          )}
        </div>

        {/* Folha Timbrada */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            2. Folha Timbrada (Logotipo / Cabeçalho)
          </span>

          {!stampFile ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-center">
              <Layers className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Selecione o PDF da Folha Timbrada
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setStampFile(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                {stampFile.name}
              </span>
              <button
                type="button"
                onClick={() => setStampFile(null)}
                className="text-rose-600 hover:underline"
              >
                Trocar
              </button>
            </div>
          )}
        </div>
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
              Documento Timbrado Gerado!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              O papel timbrado corporativo foi sobreposto em todas as páginas com perfeita fidelidade gráfica.
            </p>
          </div>
          <a
            href={downloadUrl}
            download={`timbrado_${docFile?.name || "documento.pdf"}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Baixar PDF Timbrado
          </a>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleOverlay}
          disabled={!docFile || !stampFile || isProcessing}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Sobrepondo Páginas...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Aplicar Folha Timbrada no Documento
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p>
          Nenhum documento é enviado para a nuvem. Toda a fusão vetorial é processada na memória do seu navegador.
        </p>
      </div>
    </div>
  );
}
