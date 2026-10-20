"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import DownloadButton from "@/components/DownloadButton";
import { convertJpgToPng, loadImageFromFile } from "@/lib/image-utils";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function JpgToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (pngUrl) URL.revokeObjectURL(pngUrl);
    setFile(selectedFile);
    setPreviewUrl(null);
    setPngUrl(null);
    setError(null);
    setIsConverting(true);

    try {
      const { img } = await loadImageFromFile(selectedFile);
      setPreviewUrl(img.src);

      const res = await convertJpgToPng(selectedFile);
      setPngUrl(res.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao converter para PNG.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleClear = () => {
    if (pngUrl) URL.revokeObjectURL(pngUrl);
    setFile(null);
    setPreviewUrl(null);
    setPngUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/jpeg,image/jpg" onFileSelect={handleFileSelect} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Painel Esquerdo */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 break-all">{file.name}</p>
                <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 mt-1">
                  Formato Inicial: JPG
                </span>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                Trocar Foto
              </button>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{isConverting ? "Convertendo imagem..." : error ? "Não foi possível converter" : "PNG pronto para baixar"}</h4>
                  <p className="text-xs text-slate-500">O formato muda para PNG; a qualidade original do JPG e o fundo permanecem.</p>
                </div>
              </div>

              {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

              {pngUrl && (
                <DownloadButton
                  href={pngUrl}
                  downloadFileName={`${file.name.replace(/\.[^/.]+$/, "")}.png`}
                  label="Baixar Imagem em PNG"
                  size="lg"
                  className="w-full"
                />
              )}
              <p className="text-xs text-slate-600">Precisa de fundo transparente? <Link href="/remover-fundo-branco" className="text-blue-700 underline">Remover fundo branco</Link>.</p>
            </div>
          </div>

          {/* Preview Esquerdo x Direito */}
          <div className="md:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Preview da Imagem Convertida (PNG)
            </h4>

            <div className="relative max-h-72 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pngUrl || previewUrl || ""}
                alt="Preview PNG"
                className="max-h-64 object-contain rounded-lg"
              />
            </div>
            {isConverting && <p className="text-xs text-blue-600 font-medium mt-3">Convertendo no navegador...</p>}
          </div>
        </div>
      )}
    </div>
  );
}
