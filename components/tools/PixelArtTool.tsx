"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Gamepad2,
  Download,
  Sliders,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function PixelArtTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pixelSize, setPixelSize] = useState<number>(12); // 4 a 40
  const [colorLevels, setColorLevels] = useState<number>(8); // 4, 8, 16, 32
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setDownloadUrl(null);
    const url = URL.createObjectURL(selectedFile);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imgRef.current = img;
      renderPixelArt();
    };
  };

  const renderPixelArt = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const origW = img.naturalWidth;
    const origH = img.naturalHeight;

    // Resolução baixa simulada
    const downW = Math.max(1, Math.floor(origW / pixelSize));
    const downH = Math.max(1, Math.floor(origH / pixelSize));

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = downW;
    tempCanvas.height = downH;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.drawImage(img, 0, 0, downW, downH);

    // Posterização de cores (estilo retrô 8-bit)
    const imgData = tempCtx.getImageData(0, 0, downW, downH);
    const data = imgData.data;
    const step = Math.floor(255 / (colorLevels - 1));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.round(data[i] / step) * step; // R
      data[i + 1] = Math.round(data[i + 1] / step) * step; // G
      data[i + 2] = Math.round(data[i + 2] / step) * step; // B
    }
    tempCtx.putImageData(imgData, 0, 0);

    // Re-upscaling nítido sem interpolação
    canvas.width = origW;
    canvas.height = origH;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, origW, origH);

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  useEffect(() => {
    if (imgRef.current) renderPixelArt();
  }, [pixelSize, colorLevels]);

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
                <p className="text-xs text-slate-500 dark:text-slate-400">Conversor Retrô Pixel Art</p>
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
              {/* Tamanho do Bloco de Pixel */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tamanho do Pixel (Resolução 8-bit):</span>
                  <span>{pixelSize}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  step={2}
                  value={pixelSize}
                  onChange={(e) => setPixelSize(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Posterização */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Paleta de Cores (Estilo Arcade):
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 4, label: "4 Níveis (GameBoy)" },
                    { id: 8, label: "8 Níveis (NES 8-bit)" },
                    { id: 16, label: "16 Níveis (Arcade)" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setColorLevels(lvl.id)}
                      className={`p-2.5 rounded-lg border font-bold text-center ${
                        colorLevels === lvl.id
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`pixel_art_${file.name}.png`}
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Pixel Art (PNG Cristalino)
              </a>
            )}
          </div>

          {/* Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 w-full flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-purple-600" />
                Efeito Pixel Art Renderizado
              </span>
              <div className="max-h-[460px] overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 shadow-md">
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
