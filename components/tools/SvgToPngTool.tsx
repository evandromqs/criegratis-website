"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { convertSvgToPng } from "@/lib/image-utils";
import { FileCode, Sliders, Check } from "lucide-react";

export default function SvgToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [bg, setBg] = useState<string>("transparent");
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processConversion = async (currentFile: File, currentScale: number, currentBg: string) => {
    setIsConverting(true);
    setError(null);
    try {
      const res = await convertSvgToPng(currentFile, currentScale, currentBg);
      setPngUrl(res.url);
      setDimensions({ width: res.width, height: res.height });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao converter SVG.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    processConversion(selectedFile, scale, bg);
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    if (file) processConversion(file, newScale, bg);
  };

  const handleBgChange = (newBg: string) => {
    setBg(newBg);
    if (file) processConversion(file, scale, newBg);
  };

  const handleClear = () => {
    setFile(null);
    setPngUrl(null);
    setDimensions(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept=".svg,image/svg+xml" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Painel de Controles */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <span className="inline-block rounded bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 mt-1">
                  Vetor SVG
                </span>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium transition-colors"
              >
                Trocar Arquivo
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FileCode className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Configurações de Exportação</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Personalize escala e transparência</p>
                </div>
              </div>

              {/* Escala */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Resolução / Escala de Exportação</span>
                  {dimensions && (
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-[11px]">
                      {dimensions.width} x {dimensions.height} px
                    </span>
                  )}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 8].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleScaleChange(s)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        scale === s
                          ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-400 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {s}x {s === 2 ? "(Ideal)" : s === 4 ? "(4K)" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cor de Fundo */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Fundo da Imagem
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "transparent", label: "Transparente" },
                    { id: "#FFFFFF", label: "Branco" },
                    { id: "#0B0F19", label: "Preto" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleBgChange(item.id)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        bg === item.id
                          ? "border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-400"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      {bg === item.id && <Check className="w-3.5 h-3.5" />}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>}

              {pngUrl && (
                <DownloadButton
                  href={pngUrl}
                  downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}_${scale}x.png`}
                  label={isConverting ? "Processando..." : "Baixar Imagem em PNG"}
                  size="lg"
                  className="w-full mt-2"
                />
              )}
            </div>
          </div>

          {/* Preview da Imagem */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview do PNG Renderizado
            </h4>

            <div
              className="relative max-h-80 w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 p-4"
              style={{
                backgroundImage:
                  bg === "transparent"
                    ? "radial-gradient(#CBD5E1 1px, transparent 1px)"
                    : undefined,
                backgroundColor: bg !== "transparent" ? bg : undefined,
                backgroundSize: "12px 12px",
              }}
            >
              {pngUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={pngUrl}
                  alt="Preview do PNG convertido"
                  className="max-h-72 object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="py-12 text-slate-400 text-xs">Renderizando vetor...</div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
              Renderizado com antialiasing de alta resolução 100% no navegador.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
