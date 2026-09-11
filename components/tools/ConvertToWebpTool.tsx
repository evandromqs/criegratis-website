"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { convertToWebp, formatFileSize } from "@/lib/image-utils";
import { Sparkles, Sliders, TrendingDown } from "lucide-react";

export default function ConvertToWebpTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(85);
  const [result, setResult] = useState<{
    url: string;
    originalSize: number;
    convertedSize: number;
    savedPercentage: number;
    width: number;
    height: number;
  } | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processConversion = async (currentFile: File, currentQuality: number) => {
    setIsConverting(true);
    setError(null);
    try {
      const res = await convertToWebp(currentFile, currentQuality);
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao converter para WebP.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    processConversion(selectedFile, quality);
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (file) processConversion(file, newQuality);
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/png,image/jpeg,image/jpg,image/bmp" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Painel de Controles */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <span className="inline-block rounded bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:text-blue-300 mt-1">
                  Original: {formatFileSize(file.size)}
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Qualidade de Compressão WebP</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Recomendado pelo Google PageSpeed</p>
                </div>
              </div>

              {/* Slider de Qualidade */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    Qualidade da Imagem
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Mais Leve (20%)</span>
                  <span>Equilibrado (85%)</span>
                  <span>Máxima (100%)</span>
                </div>
              </div>

              {/* Estatísticas de Economia */}
              {result && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl bg-white dark:bg-slate-800 p-3.5 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Novo Tamanho</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                      {formatFileSize(result.convertedSize)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3.5 border border-emerald-200 dark:border-emerald-800 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                      <TrendingDown className="w-3 h-3" /> Economia
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {result.savedPercentage > 0 ? `-${result.savedPercentage}%` : "Otimizado"}
                    </span>
                  </div>
                </div>
              )}

              {error && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>}

              {result && (
                <DownloadButton
                  href={result.url}
                  downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}.webp`}
                  label={isConverting ? "Otimizando..." : "Baixar Imagem em WebP"}
                  size="lg"
                  className="w-full mt-2"
                />
              )}
            </div>
          </div>

          {/* Preview da Imagem */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview em WebP ({result ? `${result.width}x${result.height}px` : ""})
            </h4>

            <div className="relative max-h-80 w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-2 shadow-inner">
              {result ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={result.url}
                  alt="Preview WebP"
                  className="max-h-72 object-contain rounded-lg"
                />
              ) : (
                <div className="py-12 text-slate-400 text-xs">Convertendo para WebP...</div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
              Formato WebP de última geração compatível com todos os navegadores modernos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
