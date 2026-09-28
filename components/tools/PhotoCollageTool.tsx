"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Grid,
  Download,
  Trash2,
  Plus,
  Sparkles,
  Layout,
} from "lucide-react";

interface UploadedImage {
  id: string;
  file: File;
  img: HTMLImageElement;
}

export default function PhotoCollageTool() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [layout, setLayout] = useState<"side-by-side" | "stacked" | "grid-4" | "triple">("side-by-side");
  const [spacing, setSpacing] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files).slice(0, 4);

    const loaded: UploadedImage[] = [];
    let count = 0;

    fileList.forEach((file) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          img,
        });
        count++;
        if (count === fileList.length) {
          setImages(loaded);
        }
      };
    });
  };

  const renderCollage = () => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = 1200;
    const canvasHeight = 900;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fundo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Função auxiliar para desenhar imagem com cantos arredondados e preenchimento de corte (cover)
    const drawCoverImage = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, borderRadius);
      ctx.clip();

      const scale = Math.max(w / img.width, h / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = x + (w - drawW) / 2;
      const drawY = y + (h - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    if (layout === "side-by-side" && images.length >= 2) {
      // 2 fotos lado a lado
      const w = (canvasWidth - spacing * 3) / 2;
      const h = canvasHeight - spacing * 2;
      drawCoverImage(images[0].img, spacing, spacing, w, h);
      drawCoverImage(images[1].img, spacing * 2 + w, spacing, w, h);
    } else if (layout === "stacked" && images.length >= 2) {
      // 2 fotos verticais
      const w = canvasWidth - spacing * 2;
      const h = (canvasHeight - spacing * 3) / 2;
      drawCoverImage(images[0].img, spacing, spacing, w, h);
      drawCoverImage(images[1].img, spacing, spacing * 2 + h, w, h);
    } else if (layout === "triple" && images.length >= 3) {
      // 3 fotos verticais lado a lado
      const w = (canvasWidth - spacing * 4) / 3;
      const h = canvasHeight - spacing * 2;
      drawCoverImage(images[0].img, spacing, spacing, w, h);
      drawCoverImage(images[1].img, spacing * 2 + w, spacing, w, h);
      drawCoverImage(images[2].img, spacing * 3 + w * 2, spacing, w, h);
    } else if (layout === "grid-4" && images.length >= 4) {
      // Grade 2x2
      const w = (canvasWidth - spacing * 3) / 2;
      const h = (canvasHeight - spacing * 3) / 2;
      drawCoverImage(images[0].img, spacing, spacing, w, h);
      drawCoverImage(images[1].img, spacing * 2 + w, spacing, w, h);
      drawCoverImage(images[2].img, spacing, spacing * 2 + h, w, h);
      drawCoverImage(images[3].img, spacing * 2 + w, spacing * 2 + h, w, h);
    } else {
      // Fallback: desenha o que estiver disponível
      const count = images.length;
      const w = (canvasWidth - spacing * (count + 1)) / count;
      const h = canvasHeight - spacing * 2;
      images.forEach((item, i) => {
        drawCoverImage(item.img, spacing + i * (w + spacing), spacing, w, h);
      });
    }

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, "image/jpeg", 0.95);
  };

  useEffect(() => {
    if (images.length > 0) {
      renderCollage();
    }
  }, [images, layout, spacing, borderRadius, bgColor]);

  return (
    <div className="space-y-6">
      {images.length === 0 ? (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all text-center">
          <Grid className="w-10 h-10 text-slate-400 mb-3" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Selecione 2, 3 ou 4 Fotos para a Colagem
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            PNG, JPG ou WebP de qualquer resolução
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFiles}
          />
        </label>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {images.length} fotos carregadas
              </span>
              <button
                type="button"
                onClick={() => {
                  setImages([]);
                  setDownloadUrl(null);
                }}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Limpar Fotos
              </button>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
              {/* Layout da Colagem */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Modelo de Grid:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setLayout("side-by-side")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      layout === "side-by-side"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    2 Fotos Lado a Lado
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("stacked")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      layout === "stacked"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    2 Fotos Verticais
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("triple")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      layout === "triple"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    3 Fotos (Tríptico)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout("grid-4")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      layout === "grid-4"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    Grade 2x2 (4 Fotos)
                  </button>
                </div>
              </div>

              {/* Espaçamento */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Espaçamento entre Fotos:</span>
                  <span>{spacing}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={spacing}
                  onChange={(e) => setSpacing(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Cantos Arredondados */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Cantos Arredondados:</span>
                  <span>{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Cor de Fundo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Cor da Moldura:
                </label>
                <div className="flex items-center gap-2">
                  {["#FFFFFF", "#0F172A", "#F1F5F9", "#FEF08A"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setBgColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        bgColor === c ? "border-blue-600 scale-110" : "border-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download="colagem_criegratis.jpg"
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Colagem em Alta Resolução
              </a>
            )}
          </div>

          {/* Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 w-full flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                Pré-visualização da Colagem
              </span>
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-300 dark:border-slate-700">
                <canvas
                  ref={canvasRef}
                  className="max-h-[460px] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
