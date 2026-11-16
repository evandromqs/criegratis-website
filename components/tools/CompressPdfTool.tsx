"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Minimize2, Download, Upload, FileText } from "lucide-react";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

type TargetPreset = "1mb" | "2mb" | "max";

export default function CompressPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<TargetPreset>("1mb");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(selected);
    setResultUrl(null);
    setResultSize(null);
    setError(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setProgress("Carregando PDF...");

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdfDoc.numPages;

      const targetBytes = preset === "1mb" ? 1024 * 1024 : preset === "2mb" ? 2 * 1024 * 1024 : 500 * 1024;
      const quality = preset === "max" ? 0.45 : preset === "1mb" ? 0.6 : 0.72;
      const scale = preset === "max" ? 1.1 : 1.35;

      let outPdf: jsPDF | null = null;

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Comprimindo página ${i} de ${numPages}...`);
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const imgData = canvas.toDataURL("image/jpeg", quality);

        const orientation = viewport.width > viewport.height ? "landscape" : "portrait";
        const wMm = (viewport.width * 25.4) / 96;
        const hMm = (viewport.height * 25.4) / 96;

        if (!outPdf) {
          outPdf = new jsPDF({ orientation, unit: "mm", format: [wMm, hMm] });
        } else {
          outPdf.addPage([wMm, hMm], orientation);
        }
        outPdf.addImage(imgData, "JPEG", 0, 0, wMm, hMm, undefined, "FAST");
      }

      if (!outPdf) throw new Error("Não foi possível processar as páginas do PDF.");

      const blob = outPdf.output("blob");
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setProgress(blob.size > targetBytes ? "Concluído (compressão máxima aplicada)" : "Concluído!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao comprimir PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-10 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Selecione o arquivo PDF para reduzir o tamanho
          </span>
          <span className="text-xs text-slate-500 mt-1">Processamento 100% local no navegador</span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 break-all">{file.name}</p>
                <p className="text-xs text-slate-500">Tamanho original: {formatBytes(file.size)}</p>
              </div>
            </div>
            <label className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
              Trocar PDF
              <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "1mb" as TargetPreset, title: "Meta: Até 1 MB", desc: "Ideal para concursos e RH" },
              { id: "2mb" as TargetPreset, title: "Meta: Até 2 MB", desc: "Equilíbrio entre peso e nitidez" },
              { id: "max" as TargetPreset, title: "Compressão Máxima", desc: "Menor tamanho possível" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPreset(item.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer ${
                  preset === item.id
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <p className="text-xs font-bold">{item.title}</p>
                <p className="text-[11px] opacity-80">{item.desc}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleCompress}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <Minimize2 className="w-4 h-4" />
            {isProcessing ? progress : "Reduzir Tamanho do PDF"}
          </button>

          {error && <p className="text-xs font-semibold text-rose-600 text-center">{error}</p>}

          {resultUrl && resultSize !== null && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                PDF Reduzido: {formatBytes(resultSize)} (Original: {formatBytes(file.size)})
              </p>
              <a
                href={resultUrl}
                download={`reduzido_${file.name}`}
                onClick={() => setDownloadNoticeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Download className="w-4 h-4" /> Baixar PDF Reduzido
              </a>
            </div>
          )}
        </div>
      )}

      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
