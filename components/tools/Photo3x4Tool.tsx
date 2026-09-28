"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  User,
  Download,
  RefreshCw,
  Printer,
  Sparkles,
  Layers,
  ZoomIn,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function Photo3x4Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [bgColor, setBgColor] = useState<"white" | "light-blue" | "original">("white");
  const [sheetMode, setSheetMode] = useState<"single" | "sheet6">("sheet6");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setDownloadUrl(null);
    const url = URL.createObjectURL(selectedFile);
    setImageSrc(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      renderPreview();
    };
  };

  const renderPreview = () => {
    const canvas = previewCanvasRef.current;
    const img = imageElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 354; // ~3cm em 300 DPI
    const height = 472; // ~4cm em 300 DPI
    canvas.width = width;
    canvas.height = height;

    // Fundo
    if (bgColor === "white") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    } else if (bgColor === "light-blue") {
      ctx.fillStyle = "#DCEAFE";
      ctx.fillRect(0, 0, width, height);
    }

    // Desenhar imagem com zoom e offset
    const scale = Math.max(width / img.width, height / img.height) * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = (width - drawW) / 2 + offsetX;
    const drawY = (height - drawH) / 2 + offsetY;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Linha guia de enquadramento da cabeça
    ctx.strokeStyle = "rgba(37, 99, 235, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Guia dos olhos (terço superior)
    ctx.beginPath();
    ctx.moveTo(30, height * 0.35);
    ctx.lineTo(width - 30, height * 0.35);
    ctx.stroke();

    // Guia do queixo (terço inferior)
    ctx.beginPath();
    ctx.moveTo(40, height * 0.75);
    ctx.lineTo(width - 40, height * 0.75);
    ctx.stroke();
  };

  useEffect(() => {
    if (imageSrc) renderPreview();
  }, [zoom, offsetX, offsetY, bgColor]);

  const generateOutput = () => {
    const img = imageElementRef.current;
    if (!img) return;

    if (sheetMode === "single") {
      // 1 foto 3x4 individual em 300 DPI
      const canvas = document.createElement("canvas");
      const width = 354;
      const height = 472;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (bgColor === "white") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
      } else if (bgColor === "light-blue") {
        ctx.fillStyle = "#DCEAFE";
        ctx.fillRect(0, 0, width, height);
      }

      const scale = Math.max(width / img.width, height / img.height) * zoom;
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (width - drawW) / 2 + offsetX;
      const drawY = (height - drawH) / 2 + offsetY;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      canvas.toBlob((blob) => {
        if (blob) setDownloadUrl(URL.createObjectURL(blob));
      }, "image/jpeg", 0.95);
    } else {
      // Folha 10x15cm (1200 x 1800 px) com 6 fotos 3x4
      const sheet = document.createElement("canvas");
      sheet.width = 1800; // 15cm em 300 DPI
      sheet.height = 1200; // 10cm em 300 DPI
      const sCtx = sheet.getContext("2d");
      if (!sCtx) return;

      // Fundo branco da folha de papel fotográfico
      sCtx.fillStyle = "#FFFFFF";
      sCtx.fillRect(0, 0, sheet.width, sheet.height);

      // Foto individual
      const photo = document.createElement("canvas");
      const pW = 354;
      const pH = 472;
      photo.width = pW;
      photo.height = pH;
      const pCtx = photo.getContext("2d");
      if (!pCtx) return;

      if (bgColor === "white") {
        pCtx.fillStyle = "#FFFFFF";
        pCtx.fillRect(0, 0, pW, pH);
      } else if (bgColor === "light-blue") {
        pCtx.fillStyle = "#DCEAFE";
        pCtx.fillRect(0, 0, pW, pH);
      }

      const scale = Math.max(pW / img.width, pH / img.height) * zoom;
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (pW - drawW) / 2 + offsetX;
      const drawY = (pH - drawH) / 2 + offsetY;
      pCtx.drawImage(img, drawX, drawY, drawW, drawH);

      // Borda fina de corte ao redor da foto
      pCtx.strokeStyle = "#CCCCCC";
      pCtx.lineWidth = 1;
      pCtx.strokeRect(0, 0, pW, pH);

      // Dispor 6 fotos (2 linhas de 3 colunas)
      const startX = 200;
      const startY = 100;
      const gapX = 120;
      const gapY = 60;

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const posX = startX + col * (pW + gapX);
          const posY = startY + row * (pH + gapY);
          sCtx.drawImage(photo, posX, posY);
        }
      }

      // Adicionar linha de corte pontilhada sutil
      sCtx.fillStyle = "#666666";
      sCtx.font = "bold 20px sans-serif";
      sCtx.fillText("CrieGrátis • Folha 10x15cm (6 Fotos 3x4 padrão 300 DPI)", 200, 1140);

      sheet.toBlob((blob) => {
        if (blob) setDownloadUrl(URL.createObjectURL(blob));
      }, "image/jpeg", 0.95);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFileSelect={handleFile}
          maxSizeMB={20}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles de Enquadramento */}
          <div className="md:col-span-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Padrão Biométrico 3x4 (300 DPI)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setImageSrc(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Foto
              </button>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
              {/* Zoom */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Zoom / Escala do Rosto:</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Posição Vertical */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Ajuste Vertical (Cima / Baixo):</span>
                  <span>{offsetY}px</span>
                </div>
                <input
                  type="range"
                  min={-150}
                  max={150}
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Posição Horizontal */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Ajuste Horizontal (Esquerda / Direita):</span>
                  <span>{offsetX}px</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={offsetX}
                  onChange={(e) => setOffsetX(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Cor de Fundo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Cor de Fundo da Foto:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBgColor("white")}
                    className={`p-2 rounded-lg border font-bold ${
                      bgColor === "white"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    Branco Puro
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgColor("light-blue")}
                    className={`p-2 rounded-lg border font-bold ${
                      bgColor === "light-blue"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    Azul Claro
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgColor("original")}
                    className={`p-2 rounded-lg border font-bold ${
                      bgColor === "original"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    Fundo Original
                  </button>
                </div>
              </div>

              {/* Formato de Exportação */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Layout de Impressão:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSheetMode("sheet6")}
                    className={`p-2.5 rounded-lg border font-bold text-left ${
                      sheetMode === "sheet6"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    <p>Folha 10x15cm (6 Fotos)</p>
                    <p className="text-[10px] font-normal text-slate-500">Impressão fotográfica econômica</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSheetMode("single")}
                    className={`p-2.5 rounded-lg border font-bold text-left ${
                      sheetMode === "single"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    <p>1 Foto Individual</p>
                    <p className="text-[10px] font-normal text-slate-500">Para envio digital em cadastros</p>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={generateOutput}
              className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Gerar Foto 3x4 Pronta para Impressão
            </button>
          </div>

          {/* Pré-visualização e Download */}
          <div className="md:col-span-6 space-y-5 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Guia Biométrica (Alinhe os olhos na linha pontilhada)
              </span>

              <div className="relative rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
                <canvas
                  ref={previewCanvasRef}
                  className="w-[220px] h-[293px] bg-slate-100 dark:bg-slate-800"
                />
              </div>
            </div>

            {downloadUrl && (
              <div className="w-full p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  {sheetMode === "sheet6" ? "Folha 10x15cm Gerada!" : "Foto 3x4 Gerada!"}
                </h4>
                <a
                  href={downloadUrl}
                  download={sheetMode === "sheet6" ? "folha_10x15_6_fotos_3x4.jpg" : "foto_3x4.jpg"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem em Alta Resolução (300 DPI)
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
