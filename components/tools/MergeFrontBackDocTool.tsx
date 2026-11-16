"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { jsPDF } from "jspdf";
import { Upload, Download, ArrowLeftRight, FileText, Image as ImageIcon, Trash2, X, Heart } from "lucide-react";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";
import SupportModal from "@/components/SupportModal";

type LayoutMode = "vertical" | "horizontal";
type ExportFormat = "pdf" | "jpg";

export default function MergeFrontBackDocTool() {
  const [frontUrl, setFrontUrl] = useState<string | null>(null);
  const [backUrl, setBackUrl] = useState<string | null>(null);
  const [layout, setLayout] = useState<LayoutMode>("vertical");
  const [format, setFormat] = useState<ExportFormat>("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const handleFile = (side: "front" | "back", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDownloadUrl(null);
    if (side === "front") {
      if (frontUrl) URL.revokeObjectURL(frontUrl);
      setFrontUrl(url);
    } else {
      if (backUrl) URL.revokeObjectURL(backUrl);
      setBackUrl(url);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const handleGenerate = async () => {
    if (!frontUrl || !backUrl) return;
    setIsGenerating(true);
    try {
      const [frontImg, backImg] = await Promise.all([loadImage(frontUrl), loadImage(backUrl)]);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // A4 proportion at 150 DPI: 1240 x 1754
      const width = 1240;
      const height = 1754;
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      const padding = 80;
      const gap = 50;

      const drawContained = (img: HTMLImageElement, x: number, y: number, maxW: number, maxH: number) => {
        const scale = Math.min(maxW / img.width, maxH / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const dx = x + (maxW - w) / 2;
        const dy = y + (maxH - h) / 2;
        ctx.drawImage(img, dx, dy, w, h);
      };

      if (layout === "vertical") {
        const slotW = width - padding * 2;
        const slotH = (height - padding * 2 - gap) / 2;
        drawContained(frontImg, padding, padding, slotW, slotH);
        drawContained(backImg, padding, padding + slotH + gap, slotW, slotH);
      } else {
        const slotW = (width - padding * 2 - gap) / 2;
        const slotH = height - padding * 2;
        drawContained(frontImg, padding, padding, slotW, slotH);
        drawContained(backImg, padding + slotW + gap, padding, slotW, slotH);
      }

      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      const previewImg = canvas.toDataURL("image/jpeg", 0.85);
      setPreviewDataUrl(previewImg);

      if (format === "jpg") {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setDownloadUrl(URL.createObjectURL(blob));
              setResultModalOpen(true);
            }
            setIsGenerating(false);
          },
          "image/jpeg",
          0.92
        );
      } else {
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        const blob = pdf.output("blob");
        setDownloadUrl(URL.createObjectURL(blob));
        setResultModalOpen(true);
        setIsGenerating(false);
      }
    } catch {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Frente */}
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-5 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">1. Frente do Documento (RG / CNH)</p>
          {frontUrl ? (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frontUrl} alt="Frente do documento" className="max-h-44 mx-auto rounded-lg border border-slate-200 object-contain" />
              <button
                type="button"
                onClick={() => { URL.revokeObjectURL(frontUrl); setFrontUrl(null); setDownloadUrl(null); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remover frente
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors">
              <Upload className="w-4 h-4" /> Selecionar Frente
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile("front", e)} />
            </label>
          )}
        </div>

        {/* Verso */}
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-5 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">2. Verso do Documento (RG / CNH)</p>
          {backUrl ? (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={backUrl} alt="Verso do documento" className="max-h-44 mx-auto rounded-lg border border-slate-200 object-contain" />
              <button
                type="button"
                onClick={() => { URL.revokeObjectURL(backUrl); setBackUrl(null); setDownloadUrl(null); }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remover verso
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors">
              <Upload className="w-4 h-4" /> Selecionar Verso
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile("back", e)} />
            </label>
          )}
        </div>
      </div>

      {/* Opções */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Disposição na Folha A4</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { setLayout("vertical"); setDownloadUrl(null); }}
              className={`group p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2.5 cursor-pointer transition-all ${
                layout === "vertical"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 shadow-xs"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <span className="flex flex-col items-center justify-center gap-0.5 w-6 h-8 rounded border border-current/30 bg-white/60 dark:bg-slate-900/60 p-0.5 shrink-0">
                <span className={`w-4 h-2.5 rounded-[2px] transition-transform duration-300 ${layout === "vertical" ? "bg-blue-600 dark:bg-blue-400 scale-105" : "bg-slate-400/70 group-hover:-translate-y-0.5"}`} />
                <span className={`w-4 h-2.5 rounded-[2px] transition-transform duration-300 ${layout === "vertical" ? "bg-blue-400 dark:bg-blue-300 scale-105" : "bg-slate-400/50 group-hover:translate-y-0.5"}`} />
              </span>
              <span className="text-left leading-tight">Um em cima do outro</span>
            </button>
            <button
              type="button"
              onClick={() => { setLayout("horizontal"); setDownloadUrl(null); }}
              className={`group p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2.5 cursor-pointer transition-all ${
                layout === "horizontal"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 shadow-xs"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center justify-center gap-0.5 w-6 h-8 rounded border border-current/30 bg-white/60 dark:bg-slate-900/60 p-0.5 shrink-0">
                <span className={`w-2 h-4 rounded-[2px] transition-transform duration-300 ${layout === "horizontal" ? "bg-blue-600 dark:bg-blue-400 scale-105" : "bg-slate-400/70 group-hover:-translate-x-0.5"}`} />
                <span className={`w-2 h-4 rounded-[2px] transition-transform duration-300 ${layout === "horizontal" ? "bg-blue-400 dark:bg-blue-300 scale-105" : "bg-slate-400/50 group-hover:translate-x-0.5"}`} />
              </span>
              <span className="text-left leading-tight">Lado a lado</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Formato de Saída</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { setFormat("pdf"); setDownloadUrl(null); }}
              className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                format === "pdf"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> PDF (A4)
            </button>
            <button
              type="button"
              onClick={() => { setFormat("jpg"); setDownloadUrl(null); }}
              className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                format === "jpg"
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Imagem JPG
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!frontUrl || !backUrl || isGenerating}
        onClick={handleGenerate}
        className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <ArrowLeftRight className="w-4 h-4" />
        {isGenerating ? "Gerando arquivo..." : `Juntar Frente e Verso em ${format.toUpperCase()}`}
      </button>

      {resultModalOpen &&
        downloadUrl &&
        previewDataUrl &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 text-center">
              <button
                type="button"
                onClick={() => setResultModalOpen(false)}
                aria-label="Fechar prévia"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Documento Frente e Verso Pronto!
              </h4>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewDataUrl}
                  alt="Prévia do documento frente e verso"
                  className="max-h-[55vh] w-auto rounded-lg shadow-xs object-contain"
                />
              </div>

              <a
                href={downloadUrl}
                download={`documento_frente_verso.${format}`}
                onClick={() => setDownloadNoticeOpen(true)}
                className="w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar {format.toUpperCase()}
              </a>
            </div>
          </div>,
          document.body
        )}

      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
