"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  RefreshCw,
  Download,
  Sliders,
  CheckCircle,
  Eye,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function InvertImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [invertChannels, setInvertChannels] = useState<"all" | "luminance">("all");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setDownloadUrl(null);
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      processInvert(img, invertChannels);
    };
  };

  const processInvert = (img: HTMLImageElement, mode: "all" | "luminance") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (mode === "all") {
        // Inverte cores (negativo fotográfico tradicional)
        data[i] = 255 - data[i]; // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
      } else {
        // Inverte apenas a luminosidade (tons de cinza invertidos)
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const invGray = 255 - gray;
        data[i] = invGray;
        data[i + 1] = invGray;
        data[i + 2] = invGray;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, file?.type === "image/png" ? "image/png" : "image/jpeg", 0.95);
  };

  const handleModeChange = (mode: "all" | "luminance") => {
    setInvertChannels(mode);
    if (imageElementRef.current) {
      processInvert(imageElementRef.current, mode);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFileSelect={handleFile}
          maxSizeMB={25}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inversão de Cores / Negativo para Positivo
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                  setOriginalUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Imagem
              </button>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={`invertida_${file.name}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem Invertida
                </a>
              )}
            </div>
          </div>

          {/* Opções de Inversão */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Modo de Inversão:
            </span>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleModeChange("all")}
                className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                  invertChannels === "all"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Inverter Todas as Cores (Negativo RGB)
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("luminance")}
                className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                  invertChannels === "luminance"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Inverter Luz (Preto no Branco)
              </button>
            </div>
          </div>

          {/* Comparativo Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Original</span>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                Resultado Invertido
              </span>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
