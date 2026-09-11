"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { removeWhiteBackground } from "@/lib/image-utils";
import { Eraser, Sliders, CheckCircle2 } from "lucide-react";

export default function RemoveWhiteBackgroundTool() {
  const [file, setFile] = useState<File | null>(null);
  const [tolerance, setTolerance] = useState<number>(25);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = async (currentFile: File, currentTolerance: number) => {
    setIsProcessing(true);
    setError(null);
    try {
      const res = await removeWhiteBackground(currentFile, currentTolerance);
      setResultUrl(res.url);
      setDimensions({ width: res.width, height: res.height });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao remover fundo da imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    processImage(selectedFile, tolerance);
  };

  const handleToleranceChange = (newTolerance: number) => {
    setTolerance(newTolerance);
    if (file) processImage(file, newTolerance);
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
        <FileDropzone accept="image/png,image/jpeg,image/jpg,image/webp" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <span className="inline-block rounded bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 mt-1">
                  Remoção de Fundo Branco
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <Eraser className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ajuste de Tolerância</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ideal para logos, assinaturas e ícones</p>
                </div>
              </div>

              {/* Slider de Tolerância */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    Sensibilidade / Tolerância
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-mono text-sm">{tolerance}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={tolerance}
                  onChange={(e) => handleToleranceChange(Number(e.target.value))}
                  className="w-full accent-purple-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Apenas Branco Puro (5%)</span>
                  <span>Médio (25%)</span>
                  <span>Mais Agressivo (80%)</span>
                </div>
              </div>

              <div className="rounded-xl bg-purple-50/60 dark:bg-purple-950/30 p-3 border border-purple-100 dark:border-purple-900/50 text-xs text-purple-900 dark:text-purple-200 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  Dica de Qualidade:
                </div>
                <p className="text-[11px] text-purple-700 dark:text-purple-300">
                  Se partes da imagem estiverem sumindo, diminua a tolerância. Se ainda restarem bordas brancas, aumente gradualmente.
                </p>
              </div>

              {error && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>}

              {resultUrl && (
                <DownloadButton
                  href={resultUrl}
                  downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}_sem_fundo.png`}
                  label={isProcessing ? "Processando..." : "Baixar Imagem sem Fundo (PNG)"}
                  size="lg"
                  className="w-full mt-2"
                />
              )}
            </div>
          </div>

          {/* Preview com Fundo Xadrez */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview com Fundo Transparente
            </h4>

            <div
              className="relative max-h-80 w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 p-4"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                backgroundColor: "#ffffff",
              }}
            >
              {resultUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={resultUrl}
                  alt="Preview Sem Fundo"
                  className="max-h-72 object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="py-12 text-slate-400 text-xs">Processando remoção de fundo...</div>
              )}
            </div>
            {dimensions && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 font-mono">
                {dimensions.width} x {dimensions.height} px • Formato final PNG com canal Alpha
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
