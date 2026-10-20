"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Layers,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  Sliders,
  Sparkles,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { formatFileSize } from "@/lib/image-utils";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

type LogoPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-watermark"
  | "bottom-center"
  | "bottom-right";

type ApplyTarget = "all" | "first-only";

interface OverlayOptions {
  docFile: File;
  stampFile: File;
  isImageStamp: boolean;
  position: LogoPosition;
  logoWidth: number;
  logoOpacity: number;
  margin: number;
  applyTo: ApplyTarget;
  previewOnly?: boolean;
}

// Converte qualquer imagem (PNG, JPG, WebP, etc.) em bytes PNG limpos e padronizados
async function imageFileToPngData(
  file: File
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível inicializar o motor de renderização da imagem."));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(async (blob) => {
          if (!blob) {
            reject(new Error("Falha ao processar o canal alfa da imagem."));
            return;
          }
          const buf = await blob.arrayBuffer();
          resolve({
            bytes: new Uint8Array(buf),
            width: canvas.width,
            height: canvas.height,
          });
        }, "image/png");
      };
      img.onerror = () =>
        reject(new Error("Formato de imagem não suportado ou arquivo corrompido."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erro ao ler o arquivo selecionado."));
    reader.readAsDataURL(file);
  });
}

async function createTimbradoPdf(options: OverlayOptions): Promise<Uint8Array> {
  const source = await PDFDocument.load(await options.docFile.arrayBuffer(), { ignoreEncryption: true });
  const mainPdf = options.previewOnly ? await PDFDocument.create() : source;
  if (options.previewOnly) {
    const [firstPage] = await mainPdf.copyPages(source, [0]);
    mainPdf.addPage(firstPage);
  }
  const pages = mainPdf.getPages();

  if (options.isImageStamp) {
    const { bytes, width, height } = await imageFileToPngData(options.stampFile);
    const embeddedImg = await mainPdf.embedPng(bytes);
    const drawWidth = options.logoWidth;
    const drawHeight = drawWidth * height / width;

    pages.forEach((page, index) => {
      if (options.applyTo === "first-only" && index > 0) return;
      const { width: pageWidth, height: pageHeight } = page.getSize();
      let x = options.margin;
      let y = pageHeight - options.margin - drawHeight;

      switch (options.position) {
        case "top-center":
          x = (pageWidth - drawWidth) / 2;
          break;
        case "top-right":
          x = pageWidth - options.margin - drawWidth;
          break;
        case "center-watermark":
          x = (pageWidth - drawWidth) / 2;
          y = (pageHeight - drawHeight) / 2;
          break;
        case "bottom-center":
          x = (pageWidth - drawWidth) / 2;
          y = options.margin;
          break;
        case "bottom-right":
          x = pageWidth - options.margin - drawWidth;
          y = options.margin;
          break;
      }

      page.drawImage(embeddedImg, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
        opacity: Math.min(Math.max(options.logoOpacity / 100, 0.05), 1),
      });
    });
  } else {
    const stampPdf = await PDFDocument.load(await options.stampFile.arrayBuffer(), { ignoreEncryption: true });
    const [embeddedStamp] = await mainPdf.embedPdf(stampPdf, [0]);
    pages.forEach((page, index) => {
      if (options.applyTo === "first-only" && index > 0) return;
      const { width, height } = page.getSize();
      page.drawPage(embeddedStamp, { x: 0, y: 0, width, height });
    });
  }

  return mainPdf.save();
}

export default function OverlayPdfTool() {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docPageCount, setDocPageCount] = useState<number | null>(null);

  const [stampFile, setStampFile] = useState<File | null>(null);
  const [isImageStamp, setIsImageStamp] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Configurações personalizáveis da Logo / Timbre
  const [position, setPosition] = useState<LogoPosition>("top-left");
  const [logoWidth, setLogoWidth] = useState<number>(150);
  const [logoOpacity, setLogoOpacity] = useState<number>(100);
  const [margin, setMargin] = useState<number>(36);
  const [applyTo, setApplyTo] = useState<ApplyTarget>("all");

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const docInputRef = useRef<HTMLInputElement>(null);
  const stampInputRef = useRef<HTMLInputElement>(null);

  const invalidateResult = () => {
    setDownloadUrl(null);
    setDownloadNoticeOpen(false);
    setError(null);
  };

  // Limpa URLs de objeto para evitar vazamentos de memória
  useEffect(() => {
    return () => { if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl); };
  }, [imagePreviewUrl]);

  useEffect(() => {
    return () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); };
  }, [downloadUrl]);

  useEffect(() => {
    if (!docFile || !stampFile) return;
    let cancelled = false;
    let createdUrl: string | null = null;
    const timer = window.setTimeout(async () => {
      setIsPreviewing(true);
      try {
        const bytes = await createTimbradoPdf({
          docFile, stampFile, isImageStamp, position, logoWidth,
          logoOpacity, margin, applyTo, previewOnly: true,
        });
        if (cancelled) return;
        createdUrl = URL.createObjectURL(new Blob([bytes as unknown as BlobPart], { type: "application/pdf" }));
        setPreviewUrl(createdUrl);
      } catch {
        if (!cancelled) {
          setPreviewUrl(null);
          setError("Não foi possível criar a prévia. Verifique se os dois arquivos estão íntegros e sem senha.");
        }
      } finally {
        if (!cancelled) setIsPreviewing(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [docFile, stampFile, isImageStamp, position, logoWidth, logoOpacity, margin, applyTo]);

  // Manipulador para documento base PDF
  const handleDocSelect = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Por favor, selecione um arquivo no formato PDF para o documento base.");
      return;
    }

    setDocFile(file);
    setError(null);
    setDownloadUrl(null);
    setPreviewUrl(null);
    setDownloadNoticeOpen(false);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setDocPageCount(pdf.getPageCount());
    } catch (err) {
      console.error(err);
      setDocFile(null);
      setDocPageCount(null);
      setError("Não foi possível ler este PDF. Escolha um documento válido e sem senha.");
      if (docInputRef.current) docInputRef.current.value = "";
    }
  };

  // Manipulador para folha timbrada ou logotipo (PDF ou Imagem)
  const handleStampSelect = (file: File) => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImg = file.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(file.name);

    if (!isPdf && !isImg) {
      setError("O arquivo do timbre deve ser um PDF ou uma imagem (PNG, JPG, WebP).");
      return;
    }

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setStampFile(file);
    setIsImageStamp(isImg);
    setError(null);
    setDownloadUrl(null);
    setPreviewUrl(null);
    setDownloadNoticeOpen(false);

    if (isImg) {
      const preview = URL.createObjectURL(file);
      setImagePreviewUrl(preview);
      // Se era PDF antes e virou imagem, mantém defaults apropriados para cabeçalho
      if (position === "center-watermark") {
        setLogoOpacity(20);
        setLogoWidth(300);
      } else {
        setLogoOpacity(100);
        setLogoWidth(150);
      }
    } else {
      setImagePreviewUrl(null);
    }
  };

  // Troca de posição inteligente ajustando opacidade sugerida
  const handlePositionChange = (pos: LogoPosition) => {
    invalidateResult();
    setPosition(pos);
    if (pos === "center-watermark") {
      if (logoOpacity === 100) setLogoOpacity(20);
      if (logoWidth < 220) setLogoWidth(300);
    } else {
      if (logoOpacity < 50) setLogoOpacity(100);
      if (logoWidth > 250) setLogoWidth(150);
    }
  };

  const handleOverlay = async () => {
    if (!docFile || !stampFile) {
      setError("Por favor, selecione tanto o documento base quanto a folha timbrada / logotipo.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadNoticeOpen(false);

    try {
      const pdfBytes = await createTimbradoPdf({
        docFile, stampFile, isImageStamp, position, logoWidth,
        logoOpacity, margin, applyTo,
      });
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao aplicar a folha timbrada sobre o documento. Certifique-se de que os arquivos estão íntegros.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setDocFile(null);
    setDocPageCount(null);
    setStampFile(null);
    setIsImageStamp(false);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setPreviewUrl(null);
    setDownloadNoticeOpen(false);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Uploads Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Documento Base */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
              1. Documento Base (Contrato / Relatório)
            </span>
            {docPageCount && (
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {docPageCount} {docPageCount === 1 ? "página" : "páginas"}
              </span>
            )}
          </div>

          {!docFile ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Selecione o PDF do Documento Base
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Formatos aceitos: PDF (máx. 50MB)
              </span>
              <input
                ref={docInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleDocSelect(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                    {docFile.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatFileSize(docFile.size)} • {docPageCount ? `${docPageCount} págs` : "PDF"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDocFile(null);
                  setDocPageCount(null);
                  invalidateResult();
                  setPreviewUrl(null);
                  if (docInputRef.current) docInputRef.current.value = "";
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline shrink-0 cursor-pointer"
              >
                Trocar
              </button>
            </div>
          )}
        </div>

        {/* 2. Folha Timbrada ou Logotipo */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              2. Timbre ou Logotipo (PDF ou Imagem)
            </span>
            {stampFile && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                {isImageStamp ? "Imagem (Logo)" : "PDF Timbrado"}
              </span>
            )}
          </div>

          {!stampFile ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-center group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Selecione o Timbre ou Logotipo
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Aceita: <strong>PNG (com transparência), JPG, WebP</strong> ou <strong>PDF A4</strong>
              </span>
              <input
                ref={stampInputRef}
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleStampSelect(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {isImageStamp && imagePreviewUrl ? (
                    <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center bg-white dark:bg-slate-900 shrink-0 overflow-hidden relative">
                      {/* Blob local criado pelo usuário; não há otimização remota para aplicar. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreviewUrl}
                        alt="Pré-visualização do logotipo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                      {stampFile.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatFileSize(stampFile.size)} • {isImageStamp ? "Logotipo" : "Folha A4"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStampFile(null);
                    setIsImageStamp(false);
                    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                    setImagePreviewUrl(null);
                    invalidateResult();
                    setPreviewUrl(null);
                    if (stampInputRef.current) stampInputRef.current.value = "";
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline shrink-0 cursor-pointer"
                >
                  Trocar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Opções Avançadas se for Imagem (Logotipo) ou PDF */}
      {stampFile && (
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Configurações de Aplicação no Documento</span>
          </div>

          {isImageStamp ? (
            <div className="space-y-4">
              {/* Seletor de Posição da Logo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Posição do Logotipo na Página:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePositionChange("top-left")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      position === "top-left"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                    <span>Topo Esquerda</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePositionChange("top-center")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      position === "top-center"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                    <span>Topo Centro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePositionChange("top-right")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      position === "top-right"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                    <span>Topo Direita</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePositionChange("center-watermark")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      position === "center-watermark"
                        ? "border-amber-600 bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-500 shadow-2xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Marca d&apos;Água</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePositionChange("bottom-center")}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      position === "bottom-center"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                    <span>Rodapé Centro</span>
                  </button>
                </div>
              </div>

              {/* Sliders: Tamanho, Opacidade e Margens */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {/* Tamanho da Logo */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Largura do Logo:</span>
                    <span className="text-blue-600 dark:text-blue-400">{logoWidth} px</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="450"
                    step="10"
                    value={logoWidth}
                    onChange={(e) => { invalidateResult(); setLogoWidth(Number(e.target.value)); }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Compacto (60px)</span>
                    <span>Padrão (150px)</span>
                    <span>Grande (450px)</span>
                  </div>
                </div>

                {/* Opacidade */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Opacidade / Transparência:</span>
                    <span className="text-blue-600 dark:text-blue-400">{logoOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={logoOpacity}
                    onChange={(e) => { invalidateResult(); setLogoOpacity(Number(e.target.value)); }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Marca d&apos;água (~20%)</span>
                    <span>Total (100%)</span>
                  </div>
                </div>

                {/* Margem das bordas */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Margem das Bordas:</span>
                    <span className="text-blue-600 dark:text-blue-400">{margin} pt</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    step="5"
                    value={margin}
                    onChange={(e) => { invalidateResult(); setMargin(Number(e.target.value)); }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Estreita (15pt)</span>
                    <span>Padrão (36pt)</span>
                    <span>Larga (70pt)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                A folha timbrada em PDF será sobreposta preservando as proporções vetoriais exatas de 100% da página original.
              </span>
            </div>
          )}

          {/* Onde aplicar */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Aplicar em quais páginas do documento?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { invalidateResult(); setApplyTo("all"); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  applyTo === "all"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Todas as páginas
              </button>
              <button
                type="button"
                onClick={() => { invalidateResult(); setApplyTo("first-only"); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  applyTo === "first-only"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500 shadow-2xs"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Apenas na 1ª página
              </button>
            </div>
          </div>
        </div>
      )}

      {docFile && stampFile && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-950/60" aria-label="Prévia da primeira página">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <Eye className="h-4 w-4 text-blue-600" aria-hidden="true" />
              Prévia antes de baixar
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Primeira página {docPageCount && docPageCount > 1 ? `de ${docPageCount}` : ""}</span>
              {previewUrl && (
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  Abrir prévia
                </a>
              )}
            </div>
          </div>
          <div className="relative mx-auto max-w-3xl p-3 sm:p-5">
            {previewUrl ? (
              <iframe
                key={previewUrl}
                src={`${previewUrl}#toolbar=0&navpanes=0&view=FitH`}
                title="Prévia da primeira página com o timbre aplicado"
                className="h-[400px] w-full rounded-lg border border-slate-200 bg-white sm:h-[560px] dark:border-slate-700"
              />
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm text-slate-500 sm:h-[560px] dark:border-slate-700 dark:bg-slate-900">
                Preparando a prévia…
              </div>
            )}
            {isPreviewing && (
              <div className="absolute inset-3 flex items-center justify-center rounded-lg bg-white/75 text-sm font-semibold text-slate-700 sm:inset-5 dark:bg-slate-950/75 dark:text-slate-200" role="status">
                Atualizando prévia…
              </div>
            )}
          </div>
          <p className="px-4 pb-4 text-center text-xs text-slate-500 dark:text-slate-400">
            A prévia mostra a primeira página. O PDF final seguirá a opção de páginas selecionada.
          </p>
        </section>
      )}

      {/* Mensagem de Erro */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      {/* Botão de Processamento */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="button"
          onClick={handleReset}
          disabled={!docFile && !stampFile}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar Tudo
        </button>

        <button
          type="button"
          onClick={handleOverlay}
          disabled={!docFile || !stampFile || isProcessing}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Aplicando Timbre ao Documento...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              {isImageStamp ? "Aplicar Logotipo no Documento" : "Sobrepor Folha Timbrada no Documento"}
            </>
          )}
        </button>
      </div>

      {/* Área de Resultado & Pré-visualizador Integrado */}
      {downloadUrl && (
        <div className="space-y-4 pt-2">
          {/* Card de Sucesso com Ações */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Documento Timbrado Gerado com Sucesso!
                </h4>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                {isImageStamp
                  ? "O logotipo oficial foi inserido com perfeita fidelidade gráfica e resolução mantida."
                  : "A folha timbrada vetorial foi sobreposta com precisão em todas as páginas configuradas."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-800 shadow-2xs transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir em Nova Aba
              </a>

              <a
                href={downloadUrl}
                download={`timbrado_${docFile?.name || "documento.pdf"}`}
                onClick={() => setDownloadNoticeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Timbrado
              </a>
            </div>
          </div>

          {/* Pré-Visualizador Embutido do PDF */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Pré-visualização do Documento Final</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Use os controles internos do leitor para navegar e dar zoom
              </span>
            </div>

            {/* Iframe embutido do PDF gerado */}
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
              <iframe
                src={`${downloadUrl}#toolbar=1&navpanes=0`}
                title="Pré-visualização do PDF Timbrado"
                className="w-full h-[550px] sm:h-[650px] border-0"
              />
            </div>

            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
              Caso seu navegador não exiba o leitor embutido acima, clique em{" "}
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                Abrir em Nova Aba
              </a>{" "}
              para visualizar o PDF completo.
            </p>
          </div>
        </div>
      )}

      {/* Selo de Privacidade */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p>
          <strong>Privacidade Total Garantida:</strong> Nenhum arquivo é enviado para servidores ou nuvem. O processamento vetorial e as imagens são renderizados 100% na memória do seu navegador.
        </p>
      </div>
      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
