"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Download,
  Printer,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  zoom: number,
  offsetX: number,
  offsetY: number,
) {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  const scale = Math.max(width / img.width, height / img.height) * zoom;
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  ctx.drawImage(img, (width - drawW) / 2 + offsetX, (height - drawH) / 2 + offsetY, drawW, drawH);
}

function drawSheet(ctx: CanvasRenderingContext2D, photo: HTMLCanvasElement, scale = 1) {
  const sheetWidth = 1800 * scale;
  const sheetHeight = 1200 * scale;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, sheetWidth, sheetHeight);
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const x = (180 + col * 540) * scale;
      const y = (90 + row * 540) * scale;
      ctx.drawImage(photo, x, y, 360 * scale, 480 * scale);
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = Math.max(1, scale);
      ctx.strokeRect(x, y, 360 * scale, 480 * scale);
    }
  }
}

export default function Photo3x4Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [sheetMode, setSheetMode] = useState<"single" | "sheet6">("sheet6");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sheetPreviewRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    return () => { if (imageSrc) URL.revokeObjectURL(imageSrc); };
  }, [imageSrc]);

  useEffect(() => {
    return () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); };
  }, [downloadUrl]);

  const invalidateResult = () => {
    setDownloadUrl(null);
    setDownloadNoticeOpen(false);
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    invalidateResult();
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    const url = URL.createObjectURL(selectedFile);
    setImageSrc(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      renderPreview();
    };
    img.onerror = () => {
      setImageSrc(null);
      setFile(null);
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
    drawPhoto(ctx, img, width, height, zoom, offsetX, offsetY);

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

    const sheetPreview = sheetPreviewRef.current;
    const sheetCtx = sheetPreview?.getContext("2d");
    if (sheetPreview && sheetCtx) {
      sheetPreview.width = 900;
      sheetPreview.height = 600;
      const photo = document.createElement("canvas");
      photo.width = 360;
      photo.height = 480;
      const photoCtx = photo.getContext("2d");
      if (photoCtx) {
        drawPhoto(photoCtx, img, 360, 480, zoom, offsetX, offsetY);
        drawSheet(sheetCtx, photo, 0.5);
      }
    }
  };

  useEffect(() => {
    if (imageSrc) renderPreview();
    // A renderização depende dos ajustes abaixo; a imagem é guardada em uma ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, zoom, offsetX, offsetY, sheetMode]);

  const generateOutput = async () => {
    const img = imageElementRef.current;
    if (!img) return;
    invalidateResult();

    if (sheetMode === "single") {
      // 1 foto 3x4 individual em 300 DPI
      const canvas = document.createElement("canvas");
      const width = 354;
      const height = 472;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawPhoto(ctx, img, width, height, zoom, offsetX, offsetY);

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

      // Foto individual
      const photo = document.createElement("canvas");
      const pW = 360;
      const pH = 480;
      photo.width = pW;
      photo.height = pH;
      const pCtx = photo.getContext("2d");
      if (!pCtx) return;

      drawPhoto(pCtx, img, pW, pH, zoom, offsetX, offsetY);
      drawSheet(sCtx, photo);

      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [150, 100] });
      pdf.addImage(sheet.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, 150, 100);
      setDownloadUrl(URL.createObjectURL(pdf.output("blob")));
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
                <p className="text-xs text-slate-500 dark:text-slate-400">Enquadramento para foto 3x4</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setImageSrc(null);
                  invalidateResult();
                  imageElementRef.current = null;
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
                  onChange={(e) => { invalidateResult(); setZoom(Number(e.target.value)); }}
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
                  onChange={(e) => { invalidateResult(); setOffsetY(Number(e.target.value)); }}
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
                  onChange={(e) => { invalidateResult(); setOffsetX(Number(e.target.value)); }}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Formato de Exportação */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Layout de Impressão:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { setSheetMode("sheet6"); invalidateResult(); }}
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
                    onClick={() => { setSheetMode("single"); invalidateResult(); }}
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
              {sheetMode === "sheet6" ? "Gerar folha 10x15 cm em PDF" : "Gerar foto 3x4 em JPG"}
            </button>
          </div>

          {/* Pré-visualização e Download */}
          <div className="md:col-span-6 w-full space-y-5 flex flex-col items-center">
            <div className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Ajuste o rosto com as linhas de referência
              </span>

              <div className="relative rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
                <canvas
                  ref={previewCanvasRef}
                  className="w-[220px] h-[293px] bg-slate-100 dark:bg-slate-800"
                  aria-label="Prévia do enquadramento da foto 3x4"
                />
              </div>
              <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                As linhas são apenas guias e não aparecem no arquivo baixado.
              </p>
            </div>

            {sheetMode === "sheet6" && (
              <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Printer className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  Prévia da folha 10x15 cm com 6 fotos
                </div>
                <canvas
                  ref={sheetPreviewRef}
                  className="aspect-[3/2] w-full rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700"
                  aria-label="Prévia da folha de impressão com seis fotos 3x4"
                />
                <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                  Na impressão, selecione tamanho real ou escala de 100%.
                </p>
              </div>
            )}

            {downloadUrl && (
              <div className="w-full p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  {sheetMode === "sheet6" ? "Folha 10x15cm Gerada!" : "Foto 3x4 Gerada!"}
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={downloadUrl}
                    download={sheetMode === "sheet6" ? "folha_10x15_6_fotos_3x4.pdf" : "foto_3x4.jpg"}
                    onClick={() => setDownloadNoticeOpen(true)}
                    className="inline-flex min-h-11 items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {sheetMode === "sheet6" ? "Baixar folha em PDF" : "Baixar foto em JPG"}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
