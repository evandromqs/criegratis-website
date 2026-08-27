"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Crop as CropIcon,
  RotateCw,
  Download,
  Trash2,
  Check,
  Maximize2,
} from "lucide-react";

interface AspectRatioPreset {
  label: string;
  value: number | null; // width / height or null for free
}

const PRESETS: AspectRatioPreset[] = [
  { label: "Livre", value: null },
  { label: "1:1 (Quadrado)", value: 1 },
  { label: "4:5 (Feed Insta)", value: 4 / 5 },
  { label: "9:16 (Stories / TikTok)", value: 9 / 16 },
  { label: "16:9 (YouTube / Banner)", value: 16 / 9 },
  { label: "4:3 (Foto)", value: 4 / 3 },
];

export default function ImageCropTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("imagem-recortada");
  const [selectedRatio, setSelectedRatio] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Coordenadas de corte relativas (0 a 100%)
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setImageName(file.name.replace(/\.[^/.]+$/, ""));
    setRotation(0);
    setCropBox({ x: 10, y: 10, width: 80, height: 80 });
  };

  // Ajusta proporção da cropBox quando o preset muda
  useEffect(() => {
    if (!selectedRatio) return;
    setCropBox((prev) => {
      let newW = prev.width;
      let newH = newW / selectedRatio;
      if (newH > 90) {
        newH = 80;
        newW = newH * selectedRatio;
      }
      return {
        x: Math.max(0, Math.min(100 - newW, prev.x)),
        y: Math.max(0, Math.min(100 - newH, prev.y)),
        width: Math.min(100, newW),
        height: Math.min(100, newH),
      };
    });
  }, [selectedRatio]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const executeCrop = () => {
    if (!imageSrc || !imgRef.current) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;

      // Se rotacionado 90 ou 270, inverte dimensões
      const isRotated = rotation === 90 || rotation === 270;
      const srcW = isRotated ? naturalH : naturalW;
      const srcH = isRotated ? naturalW : naturalH;

      const cropPixelX = (cropBox.x / 100) * srcW;
      const cropPixelY = (cropBox.y / 100) * srcH;
      const cropPixelW = (cropBox.width / 100) * srcW;
      const cropPixelH = (cropBox.height / 100) * srcH;

      const canvas = document.createElement("canvas");
      canvas.width = cropPixelW;
      canvas.height = cropPixelH;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Aplica rotação se houver
        if (rotation !== 0) {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = srcW;
          tempCanvas.height = srcH;
          const tempCtx = tempCanvas.getContext("2d");
          if (tempCtx) {
            tempCtx.translate(srcW / 2, srcH / 2);
            tempCtx.rotate((rotation * Math.PI) / 180);
            tempCtx.drawImage(img, -naturalW / 2, -naturalH / 2);
            ctx.drawImage(
              tempCanvas,
              cropPixelX,
              cropPixelY,
              cropPixelW,
              cropPixelH,
              0,
              0,
              cropPixelW,
              cropPixelH
            );
          }
        } else {
          ctx.drawImage(
            img,
            cropPixelX,
            cropPixelY,
            cropPixelW,
            cropPixelH,
            0,
            0,
            cropPixelW,
            cropPixelH
          );
        }

        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${imageName}-recortada.png`;
        a.click();
      }
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50 hover:bg-slate-100/70 dark:hover:bg-slate-900/80 p-12 text-center cursor-pointer transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            className="hidden"
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3 shadow-xs">
            <CropIcon className="h-7 w-7" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            Clique para selecionar a imagem que deseja recortar
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Suporta JPG, PNG, WebP e outros formatos
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controles de Proporção e Rotação */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-1">
                Proporção:
              </span>
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRatio(preset.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedRatio === preset.value
                      ? "bg-blue-600 text-white shadow-xs"
                      : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRotate}
                title="Girar 90°"
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer shadow-2xs"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Girar 90°</span>
              </button>

              <button
                onClick={() => setImageSrc(null)}
                title="Trocar imagem"
                className="flex items-center gap-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer px-2"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Trocar</span>
              </button>
            </div>
          </div>

          {/* Área Interativa de Visualização e Recorte */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center p-4 min-h-[340px] max-h-[500px]"
          >
            <div className="relative inline-block max-w-full max-h-full">
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Para recortar"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.2s ease",
                }}
                className="max-h-[440px] w-auto object-contain rounded-xl select-none pointer-events-none"
              />

              {/* Overlay Escuro */}
              <div className="absolute inset-0 bg-black/40 rounded-xl pointer-events-none" />

              {/* Caixa de Recorte Iluminada */}
              <div
                style={{
                  left: `${cropBox.x}%`,
                  top: `${cropBox.y}%`,
                  width: `${cropBox.width}%`,
                  height: `${cropBox.height}%`,
                }}
                className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move rounded-sm flex items-center justify-center"
              >
                {/* Linhas guia de terços */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-r border-white" />
                  <div className="border-r border-white" />
                  <div />
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Download */}
          <button
            onClick={executeCrop}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 px-6 text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="h-5 w-5" />
            <span>Recortar e Baixar Imagem (PNG)</span>
          </button>
        </div>
      )}
    </div>
  );
}
