"use client";

import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { imageToBase64, formatFileSize } from "@/lib/image-utils";
import { Binary, Copy, Check, Code, FileText, Download } from "lucide-react";

export default function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<{
    base64: string;
    dataUri: string;
    width: number;
    height: number;
    size: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"uri" | "html" | "css" | "raw">("uri");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    try {
      const res = await imageToBase64(selectedFile);
      setData(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao converter para Base64.");
    }
  };

  const getOutputText = (): string => {
    if (!data) return "";
    switch (activeTab) {
      case "uri":
        return data.dataUri;
      case "html":
        return `<img src="${data.dataUri}" alt="${file?.name || "Imagem"}" width="${data.width}" height="${data.height}" />`;
      case "css":
        return `background-image: url("${data.dataUri}");`;
      case "raw":
        return data.base64;
      default:
        return data.dataUri;
    }
  };

  const handleCopy = () => {
    const text = getOutputText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const text = getOutputText();
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(/\.[^/.]+$/, "")}_base64.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFile(null);
    setData(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone accept="image/*" onFileSelect={handleFileSelect} />
      ) : (
        <div className="space-y-6">
          {/* Header com Info do Arquivo */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block rounded bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:text-blue-300">
                  {formatFileSize(file.size)}
                </span>
                {data && (
                  <span className="inline-block rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {data.width} x {data.height} px
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium transition-colors"
            >
              Trocar Imagem
            </button>
          </div>

          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

          {data && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Preview Thumbnail */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Preview da Imagem
                </h4>
                <div className="relative max-h-56 w-full flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.dataUri}
                    alt="Preview Base64"
                    className="max-h-48 object-contain rounded-lg"
                  />
                </div>
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 space-y-1 text-left w-full bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                  <div>Tamanho Base64: ~{formatFileSize(data.base64.length)}</div>
                  <div>Tipo MIME: {file.type || "image/png"}</div>
                </div>
              </div>

              {/* Formato de Exportação & Código */}
              <div className="lg:col-span-8 space-y-4">
                {/* Abas */}
                <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {[
                    { id: "uri", label: "Data URI Completo" },
                    { id: "html", label: "Tag <img> HTML" },
                    { id: "css", label: "CSS Background" },
                    { id: "raw", label: "Base64 Puro" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Área de Código */}
                <div className="relative">
                  <textarea
                    readOnly
                    rows={8}
                    value={getOutputText()}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-xs p-4 focus:outline-hidden resize-none"
                  />
                </div>

                {/* Ações de Cópia e Download */}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-300" />
                        <span>Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copiar para Área de Transferência</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all"
                  >
                    <Download className="h-4 w-4 text-slate-500" />
                    <span>Baixar .TXT</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
