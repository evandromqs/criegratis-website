"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Sliders,
} from "lucide-react";

interface ConvertedItem {
  id: string;
  originalName: string;
  originalSize: number;
  outputName: string;
  outputSize: number;
  previewUrl: string;
  blob: Blob;
}

export default function WebpConverterTool() {
  const [items, setItems] = useState<ConvertedItem[]>([]);
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg">("png");
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsConverting(true);

    const newItems: ConvertedItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.includes("webp") && !file.name.toLowerCase().endsWith(".webp")) {
        // Aceita também outros formatos para conversão mútua
      }

      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          if (outputFormat === "jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);

          const mimeType = outputFormat === "png" ? "image/png" : "image/jpeg";
          const blob: Blob = await new Promise((resolve) => {
            canvas.toBlob(
              (b) => resolve(b as Blob),
              mimeType,
              quality / 100
            );
          });

          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const ext = outputFormat === "png" ? ".png" : ".jpg";
          const outputName = `${baseName}${ext}`;
          const previewUrl = URL.createObjectURL(blob);

          newItems.push({
            id: Math.random().toString(36).substring(2, 9),
            originalName: file.name,
            originalSize: file.size,
            outputName,
            outputSize: blob.size,
            previewUrl,
            blob,
          });
        }

        URL.revokeObjectURL(objectUrl);
      } catch (err) {
        console.error("Erro ao converter WebP:", err);
      }
    }

    setItems((prev) => [...prev, ...newItems]);
    setIsConverting(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const downloadSingle = (item: ConvertedItem) => {
    const a = document.createElement("a");
    a.href = item.previewUrl;
    a.download = item.outputName;
    a.click();
  };

  const downloadAll = () => {
    items.forEach((item) => {
      downloadSingle(item);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Configurações de Saída */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Formato de Saída Desejado:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setOutputFormat("png")}
              className={`flex-1 rounded-xl py-2 px-3 text-xs font-bold transition-all cursor-pointer ${
                outputFormat === "png"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              PNG (Suporta Transparência)
            </button>
            <button
              onClick={() => setOutputFormat("jpeg")}
              className={`flex-1 rounded-xl py-2 px-3 text-xs font-bold transition-all cursor-pointer ${
                outputFormat === "jpeg"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              JPG / JPEG (Fotográfico)
            </button>
          </div>
        </div>

        {outputFormat === "jpeg" ? (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Qualidade da Imagem JPG:
              </label>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{quality}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 pt-5">
            <span>✨ O formato PNG gera imagens sem perda de qualidade visual.</span>
          </div>
        )}
      </div>

      {/* Upload Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          processFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[0.99]"
            : "border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50 hover:bg-slate-100/70 dark:hover:bg-slate-900/80 hover:border-blue-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/webp,.webp,image/*"
          onChange={(e) => processFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3 shadow-xs">
          <Upload className="h-7 w-7" />
        </div>
        <p className="text-base font-bold text-slate-900 dark:text-white">
          Clique para selecionar ou arraste arquivos WebP aqui
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Conversão instantânea direta no seu navegador
        </p>
      </div>

      {/* Lista de Imagens Convertidas */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {items.length} imagem{items.length > 1 ? "s" : ""} convertida{items.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={downloadAll}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Todas</span>
              </button>
              <button
                onClick={() => setItems([])}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-3 shadow-2xs"
              >
                <img
                  src={item.previewUrl}
                  alt={item.outputName}
                  className="h-14 w-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.outputName}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {formatFileSize(item.outputSize)}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => downloadSingle(item)}
                    title="Baixar imagem"
                    className="rounded-lg p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 cursor-pointer shadow-2xs"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    title="Remover"
                    className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
