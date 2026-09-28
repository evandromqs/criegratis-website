"use client";

import React, { useState } from "react";
import {
  Upload,
  Palette,
  Copy,
  Check,
  Download,
  Sparkles,
  Code,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

interface ColorItem {
  hex: string;
  rgb: string;
  count: number;
}

export default function ColorPaletteTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageSrc(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      extractPalette(img);
    };
  };

  const extractPalette = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduz resolução para amostragem ultrarrápida
    const sampleSize = 100;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

    const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
    const colorMap: Record<string, { r: number; g: number; b: number; count: number }> = {};

    // Quantização por agrupamento de 16 níveis
    for (let i = 0; i < imageData.length; i += 4) {
      const a = imageData[i + 3];
      if (a < 128) continue; // ignora pixels transparentes

      const r = Math.round(imageData[i] / 24) * 24;
      const g = Math.round(imageData[i + 1] / 24) * 24;
      const b = Math.round(imageData[i + 2] / 24) * 24;

      const key = `${r},${g},${b}`;
      if (!colorMap[key]) {
        colorMap[key] = { r, g, b, count: 1 };
      } else {
        colorMap[key].count++;
      }
    }

    const sorted = Object.values(colorMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const mapped = sorted.map((c) => {
      const hex = `#${((1 << 24) + (c.r << 16) + (c.g << 8) + c.b).toString(16).slice(1).toUpperCase()}`;
      return {
        hex,
        rgb: `rgb(${c.r}, ${c.g}, ${c.b})`,
        count: c.count,
      };
    });

    setColors(mapped);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const generateCssVariables = () => {
    return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.rgb} */`).join("\n")}\n}`;
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
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {colors.length} cores dominantes detectadas
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setImageSrc(null);
                setColors([]);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700"
            >
              Trocar Imagem
            </button>
          </div>

          {/* Imagem + Cores */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Foto Analisada</span>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs aspect-square flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Foto original"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Paleta de Cores Dominantes (Clique para Copiar)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => handleCopy(c.hex)}
                    className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-purple-400 dark:hover:border-purple-500 transition-all text-left cursor-pointer"
                  >
                    <div
                      style={{ backgroundColor: c.hex }}
                      className="h-24 w-full flex items-end justify-end p-2 transition-transform group-hover:scale-105"
                    >
                      <span className="rounded-md bg-black/40 backdrop-blur-xs text-white p-1">
                        {copiedHex === c.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{c.hex}</p>
                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{c.rgb}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bloco de Código CSS */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> Variáveis CSS Prontas:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generateCssVariables());
                      setCopiedHex("css");
                      setTimeout(() => setCopiedHex(null), 2000);
                    }}
                    className="text-[10px] text-purple-400 hover:text-purple-300 font-bold"
                  >
                    {copiedHex === "css" ? "Copiado!" : "Copiar CSS"}
                  </button>
                </div>
                <pre className="text-emerald-400 overflow-x-auto">{generateCssVariables()}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
