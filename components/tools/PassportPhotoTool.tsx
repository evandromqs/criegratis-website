"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { Upload, Download, User, Printer } from "lucide-react";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

type DocPreset = "5x5" | "35x45" | "5x7";

const PRESETS: Record<DocPreset, { label: string; sub: string; wMm: number; hMm: number; pxW: number; pxH: number }> = {
  "5x5": { label: "5x5 cm (Visto EUA / Passaporte)", sub: "600 x 600 px", wMm: 50, hMm: 50, pxW: 600, pxH: 600 },
  "35x45": { label: "35x45 mm (Passaporte BR / Schengen)", sub: "413 x 531 px", wMm: 35, hMm: 45, pxW: 413, pxH: 531 },
  "5x7": { label: "5x7 cm (OAB / Conselhos)", sub: "590 x 827 px", wMm: 50, hMm: 70, pxW: 590, pxH: 827 },
};

export default function PassportPhotoTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preset, setPreset] = useState<DocPreset>("5x5");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [exportType, setExportType] = useState<"single" | "sheet">("sheet");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const current = PRESETS[preset];

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const previewW = 240;
    const previewH = Math.round((previewW * current.hMm) / current.wMm);
    canvas.width = previewW;
    canvas.height = previewH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, previewW, previewH);

    const baseScale = Math.max(previewW / img.width, previewH / img.height);
    const scale = baseScale * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (previewW - drawW) / 2 + offsetX;
    const dy = (previewH - drawH) / 2 + offsetY;

    ctx.drawImage(img, dx, dy, drawW, drawH);

    // Guia biométrica
    ctx.save();
    ctx.strokeStyle = "rgba(37, 99, 235, 0.7)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(previewW / 2, previewH * 0.45, previewW * 0.28, previewH * 0.34, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }, [current.hMm, current.wMm, offsetX, offsetY, zoom]);

  useEffect(() => {
    if (imageSrc && imgRef.current) drawPreview();
  }, [imageSrc, drawPreview]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      setImageSrc(url);
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      setDownloadUrl(null);
    };
    img.src = url;
  };

  const generateOutput = () => {
    const img = imgRef.current;
    if (!img) return;

    const outCanvas = document.createElement("canvas");
    outCanvas.width = current.pxW;
    outCanvas.height = current.pxH;
    const ctx = outCanvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, current.pxW, current.pxH);

    const previewW = 240;
    const previewH = Math.round((previewW * current.hMm) / current.wMm);
    const ratioX = current.pxW / previewW;
    const ratioY = current.pxH / previewH;

    const baseScale = Math.max(current.pxW / img.width, current.pxH / img.height);
    const scale = baseScale * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (current.pxW - drawW) / 2 + offsetX * ratioX;
    const dy = (current.pxH - drawH) / 2 + offsetY * ratioY;

    ctx.drawImage(img, dx, dy, drawW, drawH);

    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    if (exportType === "single") {
      outCanvas.toBlob(
        (blob) => {
          if (blob) setDownloadUrl(URL.createObjectURL(blob));
        },
        "image/jpeg",
        0.95
      );
    } else {
      const imgData = outCanvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [150, 100] });
      const cols = Math.floor(140 / (current.wMm + 4));
      const rows = Math.floor(90 / (current.hMm + 4));
      const startX = (150 - (cols * current.wMm + (cols - 1) * 4)) / 2;
      const startY = (100 - (rows * current.hMm + (rows - 1) * 4)) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (current.wMm + 4);
          const y = startY + r * (current.hMm + 4);
          pdf.addImage(imgData, "JPEG", x, y, current.wMm, current.hMm);
          pdf.setDrawColor(200);
          pdf.rect(x, y, current.wMm, current.hMm);
        }
      }
      setDownloadUrl(URL.createObjectURL(pdf.output("blob")));
    }
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-10 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <Upload className="w-8 h-8 text-blue-600 mb-3" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Clique para enviar sua foto ou selfie
          </span>
          <span className="text-xs text-slate-500 mt-1">JPG, PNG ou WebP • Processamento 100% local</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Formato do Documento
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(PRESETS) as DocPreset[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setPreset(key); setDownloadUrl(null); }}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                        preset === key
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <p className="text-xs font-bold">{PRESETS[key].label}</p>
                      <p className="text-[10px] opacity-80">{PRESETS[key].sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Zoom ({Math.round(zoom * 100)}%)</span>
                  <button
                    type="button"
                    onClick={() => { setZoom(1); setOffsetX(0); setOffsetY(0); setDownloadUrl(null); }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Resetar
                  </button>
                </div>
                <input type="range" min={0.6} max={2.5} step={0.05} value={zoom} onChange={(e) => { setZoom(Number(e.target.value)); setDownloadUrl(null); }} className="w-full accent-blue-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Horizontal ({offsetX}px)</label>
                  <input type="range" min={-100} max={100} value={offsetX} onChange={(e) => { setOffsetX(Number(e.target.value)); setDownloadUrl(null); }} className="w-full accent-blue-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Vertical ({offsetY}px)</label>
                  <input type="range" min={-120} max={120} value={offsetY} onChange={(e) => { setOffsetY(Number(e.target.value)); setDownloadUrl(null); }} className="w-full accent-blue-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setExportType("sheet"); setDownloadUrl(null); }}
                  className={`p-2.5 rounded-lg border text-xs font-bold cursor-pointer ${
                    exportType === "sheet"
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-700 text-slate-600"
                  }`}
                >
                  Folha 10x15 cm (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => { setExportType("single"); setDownloadUrl(null); }}
                  className={`p-2.5 rounded-lg border text-xs font-bold cursor-pointer ${
                    exportType === "single"
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "border-slate-200 dark:border-slate-700 text-slate-600"
                  }`}
                >
                  1 Foto Digital (JPG)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={generateOutput}
              className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {exportType === "sheet" ? "Gerar Folha 10x15 cm em PDF" : "Gerar Foto Individual em JPG"}
            </button>
          </div>

          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" /> Prévia com guia biométrica
              </span>
              <canvas ref={canvasRef} className="rounded-lg border border-slate-300 shadow-sm" />
              <label className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                Trocar foto
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>

            {downloadUrl && (
              <div className="w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Arquivo pronto para baixar!</p>
                <a
                  href={downloadUrl}
                  download={exportType === "sheet" ? `folha_10x15_${preset}.pdf` : `foto_${preset}.jpg`}
                  onClick={() => setDownloadNoticeOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Download className="w-4 h-4" /> Baixar Agora
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
