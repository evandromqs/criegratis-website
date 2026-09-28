"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Sliders,
  RotateCcw,
  Download,
  Sparkles,
  Sun,
  Contrast,
  Palette,
  Zap,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function EnhancePhotoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [brightness, setBrightness] = useState<number>(0); // -100 a 100
  const [contrast, setContrast] = useState<number>(0); // -100 a 100
  const [saturation, setSaturation] = useState<number>(100); // 0 a 200
  const [sharpness, setSharpness] = useState<number>(0); // 0 a 100
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setDownloadUrl(null);
    const url = URL.createObjectURL(selectedFile);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      applyFilters();
    };
  };

  const applyFilters = () => {
    const canvas = canvasRef.current;
    const img = imageElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Aplica filtros CSS nativos do Canvas para Brilho, Contraste e Saturação (ultra rápido)
    const bValue = 100 + brightness;
    const cValue = 100 + contrast;
    const sValue = saturation;

    ctx.filter = `brightness(${bValue}%) contrast(${cValue}%) saturate(${sValue}%)`;
    ctx.drawImage(img, 0, 0);

    // Se nitidez > 0, aplica matriz de convolução (Unsharp Mask)
    if (sharpness > 0) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;
      const weight = (sharpness / 100) * 1.5;

      const buff = new Uint8ClampedArray(data);

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;

          for (let c = 0; c < 3; c++) {
            const current = buff[idx + c];
            const up = buff[((y - 1) * w + x) * 4 + c];
            const down = buff[((y + 1) * w + x) * 4 + c];
            const left = buff[(y * w + (x - 1)) * 4 + c];
            const right = buff[(y * w + (x + 1)) * 4 + c];

            const sharpVal = current + (current * 4 - up - down - left - right) * weight;
            data[idx + c] = Math.min(255, Math.max(0, sharpVal));
          }
        }
      }

      ctx.filter = "none";
      ctx.putImageData(imageData, 0, 0);
    }

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, file?.type === "image/png" ? "image/png" : "image/jpeg", 0.95);
  };

  useEffect(() => {
    if (imageElementRef.current) {
      applyFilters();
    }
  }, [brightness, contrast, saturation, sharpness]);

  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(100);
    setSharpness(0);
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Editor e Ajustes de Foto</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Imagem
              </button>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
              {/* Brilho */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Brilho
                  </span>
                  <span>{brightness > 0 ? `+${brightness}` : brightness}</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Contraste */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Contrast className="w-3.5 h-3.5 text-blue-500" /> Contraste
                  </span>
                  <span>{contrast > 0 ? `+${contrast}` : contrast}</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Saturação */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-500" /> Saturação de Cores
                  </span>
                  <span>{saturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Nitidez */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" /> Nitidez (Unsharp Mask)
                  </span>
                  <span>{sharpness}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sharpness}
                  onChange={(e) => setSharpness(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Redefinir Filtros
                </button>
              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`tratada_${file.name}`}
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Foto com Alta Qualidade
              </a>
            )}
          </div>

          {/* Canvas de Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 w-full flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                Visualização em Tempo Real (60 FPS)
              </span>
              <div className="max-h-[500px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-md">
                <canvas
                  ref={canvasRef}
                  className="max-h-[500px] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
