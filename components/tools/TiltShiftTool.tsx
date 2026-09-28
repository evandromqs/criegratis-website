"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Focus,
  Download,
  Sliders,
  Sparkles,
  Camera,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function TiltShiftTool() {
  const [file, setFile] = useState<File | null>(null);
  const [focusPosition, setFocusPosition] = useState<number>(50); // % de 0 a 100
  const [focusWidth, setFocusWidth] = useState<number>(25); // % de 10 a 60
  const [blurIntensity, setBlurIntensity] = useState<number>(10); // px de 2 a 30
  const [saturationBoost, setSaturationBoost] = useState<number>(130); // 100 a 180% (típico de maquetes)
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
      renderTiltShift();
    };
  };

  const renderTiltShift = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;

    // 1. Desenha imagem desfocada no fundo com saturação reforçada (efeito maquete)
    const blurredCanvas = document.createElement("canvas");
    blurredCanvas.width = w;
    blurredCanvas.height = h;
    const bCtx = blurredCanvas.getContext("2d");
    if (!bCtx) return;

    bCtx.filter = `blur(${blurIntensity}px) saturate(${saturationBoost}%)`;
    bCtx.drawImage(img, 0, 0);

    ctx.drawImage(blurredCanvas, 0, 0);

    // 2. Cria máscara gradiente para aplicar a faixa nítida no centro
    const sharpCanvas = document.createElement("canvas");
    sharpCanvas.width = w;
    sharpCanvas.height = h;
    const sCtx = sharpCanvas.getContext("2d");
    if (!sCtx) return;

    sCtx.filter = `saturate(${saturationBoost}%)`;
    sCtx.drawImage(img, 0, 0);

    // Calcula coordenadas da faixa de foco
    const centerY = (focusPosition / 100) * h;
    const halfBand = ((focusWidth / 100) * h) / 2;
    const transitionZone = halfBand * 0.8;

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = w;
    maskCanvas.height = h;
    const mCtx = maskCanvas.getContext("2d");
    if (!mCtx) return;

    const grad = mCtx.createLinearGradient(0, centerY - halfBand - transitionZone, 0, centerY + halfBand + transitionZone);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.3, "rgba(0,0,0,1)");
    grad.addColorStop(0.7, "rgba(0,0,0,1)");
    grad.addColorStop(1, "rgba(0,0,0,0)");

    mCtx.fillStyle = grad;
    mCtx.fillRect(0, 0, w, h);

    // Aplica a máscara composta sobre a imagem nítida
    sCtx.globalCompositeOperation = "destination-in";
    sCtx.drawImage(maskCanvas, 0, 0);

    // 3. Sobrepõe a faixa nítida sobre o fundo desfocado
    ctx.drawImage(sharpCanvas, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, file?.type === "image/png" ? "image/png" : "image/jpeg", 0.95);
  };

  useEffect(() => {
    if (imgRef.current) renderTiltShift();
  }, [focusPosition, focusWidth, blurIntensity, saturationBoost]);

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
                <p className="text-xs text-slate-500 dark:text-slate-400">Efeito Miniatura / Diorama</p>
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
              {/* Posição da Faixa de Foco */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Posição da Faixa de Foco (Vertical):</span>
                  <span>{focusPosition}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={focusPosition}
                  onChange={(e) => setFocusPosition(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Largura da Faixa de Foco */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Largura do Foco Nítido:</span>
                  <span>{focusWidth}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={focusWidth}
                  onChange={(e) => setFocusWidth(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Intensidade do Desfoque */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Intensidade do Desfoque (Blur):</span>
                  <span>{blurIntensity}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={25}
                  value={blurIntensity}
                  onChange={(e) => setBlurIntensity(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Saturação Maquete */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Saturação de Brinquedo/Maquete:</span>
                  <span>{saturationBoost}%</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={180}
                  value={saturationBoost}
                  onChange={(e) => setSaturationBoost(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`tilt_shift_${file.name}`}
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Foto com Efeito Tilt-Shift
              </a>
            )}
          </div>

          {/* Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 w-full flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <Focus className="w-4 h-4 text-blue-600" />
                Efeito Tilt-Shift Aplicado
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
