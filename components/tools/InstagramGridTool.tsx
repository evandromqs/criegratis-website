"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Grid3X3,
  Download,
  Share2,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

interface SliceItem {
  id: number;
  dataUrl: string;
  label: string;
}

export default function InstagramGridTool() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"carousel3" | "grid3x3" | "grid3x1">("carousel3");
  const [slices, setSlices] = useState<SliceItem[]>([]);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      sliceImage(img, mode);
    };
  };

  const sliceImage = (img: HTMLImageElement, currentMode: "carousel3" | "grid3x3" | "grid3x1") => {
    const origW = img.naturalWidth;
    const origH = img.naturalHeight;
    const result: SliceItem[] = [];

    if (currentMode === "carousel3") {
      // Divide largura em 3 fatias verticais iguais
      const sliceW = Math.floor(origW / 3);
      for (let i = 0; i < 3; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = sliceW;
        canvas.height = origH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, i * sliceW, 0, sliceW, origH, 0, 0, sliceW, origH);
          result.push({
            id: i + 1,
            dataUrl: canvas.toDataURL("image/jpeg", 0.95),
            label: `Parte ${i + 1} de 3 (Carrossel)`,
          });
        }
      }
    } else if (currentMode === "grid3x1") {
      // 3 quadrados lado a lado
      const sliceSize = Math.floor(origW / 3);
      for (let i = 0; i < 3; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = sliceSize;
        canvas.height = sliceSize;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const srcY = Math.max(0, (origH - sliceSize) / 2);
          ctx.drawImage(img, i * sliceSize, srcY, sliceSize, sliceSize, 0, 0, sliceSize, sliceSize);
          result.push({
            id: i + 1,
            dataUrl: canvas.toDataURL("image/jpeg", 0.95),
            label: `Foto ${i + 1} de 3`,
          });
        }
      }
    } else {
      // Grid 3x3 (9 quadrados para o feed do perfil)
      const minDimension = Math.min(origW, origH);
      const cropX = (origW - minDimension) / 2;
      const cropY = (origH - minDimension) / 2;
      const sliceSize = Math.floor(minDimension / 3);

      let counter = 1;
      // Ordem recomendada do Instagram (da última linha para primeira para postar)
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const canvas = document.createElement("canvas");
          canvas.width = sliceSize;
          canvas.height = sliceSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              img,
              cropX + col * sliceSize,
              cropY + row * sliceSize,
              sliceSize,
              sliceSize,
              0,
              0,
              sliceSize,
              sliceSize
            );
            result.push({
              id: counter,
              dataUrl: canvas.toDataURL("image/jpeg", 0.95),
              label: `Posição ${counter} (Grid 3x3)`,
            });
            counter++;
          }
        }
      }
    }

    setSlices(result);
  };

  const handleModeChange = (newMode: "carousel3" | "grid3x3" | "grid3x1") => {
    setMode(newMode);
    if (imageElementRef.current) {
      sliceImage(imageElementRef.current, newMode);
    }
  };

  const downloadAll = () => {
    slices.forEach((s, idx) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = s.dataUrl;
        a.download = `instagram_${mode}_parte_${s.id}.jpg`;
        a.click();
      }, idx * 250);
    });
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
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                <Grid3X3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {slices.length} fatias prontas para postagem
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setSlices([]);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Foto
              </button>
              <button
                type="button"
                onClick={downloadAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-pink-600 hover:bg-pink-700 text-white shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Todas as {slices.length} Fatias
              </button>
            </div>
          </div>

          {/* Seletor de Modelo */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Formato de Fatiamento:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleModeChange("carousel3")}
                className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                  mode === "carousel3"
                    ? "border-pink-600 bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                    : "border-slate-200 text-slate-600 dark:text-slate-400"
                }`}
              >
                Carrossel Infinito (3 Fatias)
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("grid3x3")}
                className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                  mode === "grid3x3"
                    ? "border-pink-600 bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                    : "border-slate-200 text-slate-600 dark:text-slate-400"
                }`}
              >
                Grade Feed 3x3 (9 Quadrados)
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("grid3x1")}
                className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                  mode === "grid3x1"
                    ? "border-pink-600 bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                    : "border-slate-200 text-slate-600 dark:text-slate-400"
                }`}
              >
                Faixa Horizontal 3x1 (3 Fotos)
              </button>
            </div>
          </div>

          {/* Grid de Fatias */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Fatias Geradas (Clique para baixar individualmente ou use o botão de baixar todas)
            </span>

            <div
              className={`grid gap-4 ${
                mode === "grid3x3" ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {slices.map((slice) => (
                <div
                  key={slice.id}
                  className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xs hover:border-pink-400 transition-all"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <img
                      src={slice.dataUrl}
                      alt={slice.label}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded-md bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 text-xs font-bold">
                      #{slice.id}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between p-1">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                      {slice.label}
                    </span>
                    <a
                      href={slice.dataUrl}
                      download={`instagram_parte_${slice.id}.jpg`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                      title="Baixar esta parte"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
