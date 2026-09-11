"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { flipImage } from "@/lib/image-utils";
import { FlipHorizontal, FlipVertical, RotateCcw } from "lucide-react";

export default function FlipImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [flipH, setFlipH] = useState<boolean>(true);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processFlip = async (currentFile: File, h: boolean, v: boolean) => {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await flipImage(currentFile, h, v);
      setResultUrl(res.url);
      setDimensions({ width: res.width, height: res.height });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao espelhar imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    processFlip(selectedFile, flipH, flipV);
  };

  const handleToggleH = () => {
    const newH = !flipH;
    setFlipH(newH);
    if (file) processFlip(file, newH, flipV);
  };

  const handleToggleV = () => {
    const newV = !flipV;
    setFlipV(newV);
    if (file) processFlip(file, flipH, newV);
  };

  const handleReset = () => {
    setFlipH(false);
    setFlipV(false);
    if (file) processFlip(file, false, false);
  };

  const handleClear = () => {
    setFile(null);
    setResultUrl(null);
    setDimensions(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/*" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <span className="inline-block rounded bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:text-blue-300 mt-1">
                  Espelhamento de Imagem
                </span>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium transition-colors"
              >
                Trocar Imagem
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 space-y-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Direção do Espelhamento
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleToggleH}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
                    flipH
                      ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-400 shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <FlipHorizontal className="w-5 h-5" />
                  <span>Espelhar Horizontal</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {flipH ? "Ativado" : "Desativado"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleV}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-bold transition-all ${
                    flipV
                      ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-400 shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <FlipVertical className="w-5 h-5" />
                  <span>Espelhar Vertical</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {flipV ? "Ativado" : "Desativado"}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurar Original
                </button>
              </div>

              {error && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>}

              {resultUrl && (
                <DownloadButton
                  href={resultUrl}
                  downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}_espelhado.${file.type === "image/png" ? "png" : "jpg"}`}
                  label={isProcessing ? "Processando..." : "Baixar Imagem Espelhada"}
                  size="lg"
                  className="w-full mt-2"
                />
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview da Imagem Espelhada
            </h4>

            <div className="relative max-h-80 w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-2 shadow-inner">
              {resultUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={resultUrl}
                  alt="Preview Espelhado"
                  className="max-h-72 object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="py-12 text-slate-400 text-xs">Processando...</div>
              )}
            </div>
            {dimensions && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 font-mono">
                {dimensions.width} x {dimensions.height} px
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
