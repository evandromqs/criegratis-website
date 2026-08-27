"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Sparkles,
} from "lucide-react";
import jsPDF from "jspdf";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<"auto" | "portrait" | "landscape">("auto");
  const [margin, setMargin] = useState<"none" | "small" | "large">("small");
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substring(2, 9);
        const previewUrl = URL.createObjectURL(file);
        validFiles.push({
          id,
          file,
          previewUrl,
          name: file.name,
          size: file.size,
        });
      }
    });

    setImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const toRemove = prev.find((img) => img.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
      return filtered;
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === images.length - 1)
    )
      return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      let pdf: jsPDF | null = null;

      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        const img = new Image();
        img.src = item.previewUrl;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;

        let pageOrient: "portrait" | "landscape" = "portrait";
        if (orientation === "auto") {
          pageOrient = imgWidth > imgHeight ? "landscape" : "portrait";
        } else {
          pageOrient = orientation;
        }

        if (pageSize === "a4") {
          const pageWidth = pageOrient === "portrait" ? 210 : 297;
          const pageHeight = pageOrient === "portrait" ? 297 : 210;

          if (i === 0) {
            pdf = new jsPDF({
              orientation: pageOrient,
              unit: "mm",
              format: "a4",
            });
          } else if (pdf) {
            pdf.addPage("a4", pageOrient);
          }

          let marginMm = 0;
          if (margin === "small") marginMm = 10;
          if (margin === "large") marginMm = 20;

          const usableWidth = pageWidth - marginMm * 2;
          const usableHeight = pageHeight - marginMm * 2;

          const imgRatio = imgWidth / imgHeight;
          const usableRatio = usableWidth / usableHeight;

          let renderWidth = usableWidth;
          let renderHeight = usableHeight;

          if (imgRatio > usableRatio) {
            renderHeight = usableWidth / imgRatio;
          } else {
            renderWidth = usableHeight * imgRatio;
          }

          const posX = marginMm + (usableWidth - renderWidth) / 2;
          const posY = marginMm + (usableHeight - renderHeight) / 2;

          const canvas = document.createElement("canvas");
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            pdf?.addImage(imgData, "JPEG", posX, posY, renderWidth, renderHeight);
          }
        } else {
          // Fit mode: Cada página tem o tamanho da imagem exata em mm
          const pxToMm = 0.264583;
          const widthMm = imgWidth * pxToMm;
          const heightMm = imgHeight * pxToMm;

          if (i === 0) {
            pdf = new jsPDF({
              orientation: imgWidth > imgHeight ? "landscape" : "portrait",
              unit: "mm",
              format: [widthMm, heightMm],
            });
          } else if (pdf) {
            pdf.addPage([widthMm, heightMm], imgWidth > imgHeight ? "landscape" : "portrait");
          }

          const canvas = document.createElement("canvas");
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            pdf?.addImage(imgData, "JPEG", 0, 0, widthMm, heightMm);
          }
        }
      }

      pdf?.save("documento-criegratis.pdf");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Área de Upload Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
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
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3 shadow-xs">
          <Upload className="h-7 w-7" />
        </div>
        <p className="text-base font-bold text-slate-900 dark:text-white">
          Clique para selecionar ou arraste suas fotos aqui
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Suporta JPG, PNG e WebP • Processamento 100% privado no seu navegador
        </p>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {/* Barra de Opções e Configuração do PDF */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Opções do PDF ({images.length} foto{images.length > 1 ? "s" : ""})
                </span>
              </div>
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Limpar Tudo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Formato de Página */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Tamanho da Página:
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as "a4" | "fit")}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value="a4">Padrão A4 (Documento)</option>
                  <option value="fit">Ajustar ao tamanho da foto</option>
                </select>
              </div>

              {/* Orientação */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Orientação:
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as "auto" | "portrait" | "landscape")}
                  disabled={pageSize === "fit"}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden disabled:opacity-50"
                >
                  <option value="auto">Automática (Detectar)</option>
                  <option value="portrait">Retrato (Vertical)</option>
                  <option value="landscape">Paisagem (Horizontal)</option>
                </select>
              </div>

              {/* Margens */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Margens:
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value as "none" | "small" | "large")}
                  disabled={pageSize === "fit"}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden disabled:opacity-50"
                >
                  <option value="none">Sem Margem (Preenchimento Total)</option>
                  <option value="small">Margem Pequena (Recomendado)</option>
                  <option value="large">Margem Grande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Reordenação e Miniaturas das Imagens */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ordem das Páginas no PDF:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-3 shadow-2xs"
                >
                  {/* Número da Página */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-700 dark:text-slate-300">
                    {idx + 1}
                  </span>

                  {/* Thumbnail */}
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />

                  {/* Detalhes */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {formatFileSize(item.size)}
                    </p>
                  </div>

                  {/* Ações de Reordenação e Exclusão */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveImage(idx, "up")}
                        disabled={idx === 0}
                        title="Subir página"
                        className="rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveImage(idx, "down")}
                        disabled={idx === images.length - 1}
                        title="Descer página"
                        className="rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeImage(item.id)}
                      title="Remover"
                      className="rounded-lg p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer self-end"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Geração e Download */}
          <div className="pt-2">
            <button
              onClick={generatePdf}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 sm:py-4 px-6 text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Gerando PDF no seu navegador...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>Gerar e Baixar PDF ({images.length} Página{images.length > 1 ? "s" : ""})</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
