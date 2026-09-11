"use client";

import React, { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
import { Pipette, Copy, Check, Palette } from "lucide-react";

interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPickerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<ColorData>({
    hex: "#2563EB",
    rgb: "rgb(37, 99, 235)",
    hsl: "hsl(221, 83%, 53%)",
  });
  const [history, setHistory] = useState<string[]>([]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const sampleColor = (x: number, y: number, addToHistory: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Bounds checking
    const clampedX = Math.max(0, Math.min(canvas.width - 1, Math.round(x)));
    const clampedY = Math.max(0, Math.min(canvas.height - 1, Math.round(y)));

    const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r, g, b);

    const newColor: ColorData = { hex, rgb, hsl };
    setColor(newColor);

    if (addToHistory) {
      setHistory((prev) => {
        const filtered = prev.filter((c) => c !== hex);
        return [hex, ...filtered].slice(0, 10);
      });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    sampleColor(x, y, false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    sampleColor(x, y, true);
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          sampleColor(img.naturalWidth / 2, img.naturalHeight / 2, true);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const copyToClipboard = (text: string, formatId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatId);
    setTimeout(() => setCopiedFormat(null), 1800);
  };

  const handleClear = () => {
    setFile(null);
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/*" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Canvas da Imagem */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Pipette className="w-3.5 h-3.5 text-blue-600" />
                  Mova o mouse ou toque para capturar a cor
                </p>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium transition-colors"
              >
                Trocar Imagem
              </button>
            </div>

            <div className="relative max-h-[480px] overflow-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-900 p-2 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
                className="max-h-[450px] max-w-full object-contain rounded-xl cursor-crosshair shadow-sm"
              />
            </div>
          </div>

          {/* Painel da Cor Selecionada */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-xs">
              {/* Amostra Visual Grande */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl border-2 border-white dark:border-slate-800 shadow-md transition-colors"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cor Selecionada</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    {color.hex}
                  </h3>
                </div>
              </div>

              {/* Formatos com Botão Copiar */}
              <div className="space-y-2.5">
                {[
                  { id: "hex", label: "HEX", value: color.hex },
                  { id: "rgb", label: "RGB", value: color.rgb },
                  { id: "hsl", label: "HSL", value: color.hsl },
                ].map((fmt) => (
                  <div
                    key={fmt.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                  >
                    <div className="text-xs">
                      <span className="font-bold text-slate-400 mr-2 text-[10px]">{fmt.label}</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{fmt.value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(fmt.value, fmt.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
                      title={`Copiar ${fmt.label}`}
                    >
                      {copiedFormat === fmt.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Histórico da Paleta de Cores */}
              {history.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-600" />
                    Cores Capturadas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {history.map((h, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => copyToClipboard(h, `hist-${i}`)}
                        className="group relative w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-110 active:scale-95 transition-all"
                        style={{ backgroundColor: h }}
                        title={`Clique para copiar ${h}`}
                      >
                        {copiedFormat === `hist-${i}` && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
