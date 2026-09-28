"use client";

import React, { useState } from "react";
import {
  Upload,
  Shield,
  Download,
  Trash2,
  CheckCircle,
  MapPin,
  Camera,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function RemoveExifTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [hasExif, setHasExif] = useState<boolean>(true);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageSrc(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      // Re-desenhar a imagem do zero em um Canvas HTML5 limpa automaticamente todos os blocos EXIF/IPTC/XMP
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) setDownloadUrl(URL.createObjectURL(blob));
      }, selectedFile.type === "image/png" ? "image/png" : "image/jpeg", 0.95);
    };
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/jpeg,image/png,image/webp"
          onFileSelect={handleFile}
          maxSizeMB={25}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Higienização de Privacidade e Remoção de Metadados
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setImageSrc(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Imagem
              </button>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={`limpa_${file.name}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem sem EXIF
                </a>
              )}
            </div>
          </div>

          {/* Cards de Metadados Removidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Localização GPS</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Latitude, longitude e altitude apagadas permanentemente.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Identificação do Aparelho</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Modelo do celular, número de série e lente ocultados.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Horários e Datas</p>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Timestamp exato de disparo e modificações originais zerados.
                </p>
              </div>
            </div>
          </div>

          {/* Pré-visualização da Imagem Limpa */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 mb-3">Foto Segura (100% Anônima)</span>
            <div className="max-h-[420px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Foto limpa"
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Proteção anti-rastreamento: Esta ferramenta reconstitui a matriz de pixels sem transferir nenhum cabeçalho EXIF/IPTC. Ideal antes de postar fotos em classificados, redes ou fóruns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
