"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  PenTool,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

export default function SignPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [targetPage, setTargetPage] = useState<number>(1);
  const [signaturePosition, setSignaturePosition] = useState<"bottom-right" | "bottom-left" | "bottom-center" | "top-right">("bottom-right");
  const [penColor, setPenColor] = useState<string>("#000000");
  const [penWidth, setPenWidth] = useState<number>(2.5);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf") && selectedFile.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setPageCount(count);
      setTargetPage(count); // Por padrão assina a última página
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o arquivo PDF.");
      setFile(null);
    }
  };

  // Canvas drawing logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawing.current = true;
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const exportSignedPdf = async () => {
    if (!file || !hasDrawn) {
      setError("Por favor, faça sua assinatura antes de salvar.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setError(null);

    try {
      // Obter imagem PNG da assinatura desenhada
      const signatureDataUrl = canvas.toDataURL("image/png");
      const signatureImageBytes = await fetch(signatureDataUrl).then((res) => res.arrayBuffer());

      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();
      const pageIndex = Math.max(0, Math.min(targetPage - 1, pages.length - 1));
      const page = pages[pageIndex];

      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      // Proporções da assinatura
      const sigWidth = 150;
      const sigHeight = (signatureImage.height / signatureImage.width) * sigWidth;

      let x = pageWidth - sigWidth - 40;
      let y = 40;

      if (signaturePosition === "bottom-left") {
        x = 40;
        y = 40;
      } else if (signaturePosition === "bottom-center") {
        x = (pageWidth - sigWidth) / 2;
        y = 40;
      } else if (signaturePosition === "top-right") {
        x = pageWidth - sigWidth - 40;
        y = pageHeight - sigHeight - 40;
      }

      page.drawImage(signatureImage, {
        x,
        y,
        width: sigWidth,
        height: sigHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao carimbar a assinatura no PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          onFileSelect={handleFile}
          maxSizeMB={50}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Coluna 1: Painel de Assinatura */}
          <div className="md:col-span-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total de {pageCount} página(s)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
              >
                Trocar Arquivo
              </button>
            </div>

            {/* Painel do Canvas da Assinatura */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Desenhe sua Assinatura / Rubrica:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPenColor("#000000")}
                    className={`w-5 h-5 rounded-full bg-black border-2 transition-all ${
                      penColor === "#000000" ? "border-blue-500 scale-110" : "border-transparent"
                    }`}
                    title="Caneta Preta"
                  />
                  <button
                    type="button"
                    onClick={() => setPenColor("#1d4ed8")}
                    className={`w-5 h-5 rounded-full bg-blue-700 border-2 transition-all ${
                      penColor === "#1d4ed8" ? "border-blue-500 scale-110" : "border-transparent"
                    }`}
                    title="Caneta Azul"
                  />
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors ml-2"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={180}
                  className="w-full h-[180px] touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 dark:text-slate-500 text-xs">
                    <span>Assine com o mouse ou o dedo aqui</span>
                    <span className="text-[10px] mt-1 opacity-70">Sua assinatura terá fundo transparente</span>
                  </div>
                )}
              </div>
            </div>

            {/* Opções de posicionamento */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Em qual página carimbar a assinatura?
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={pageCount}
                    value={targetPage}
                    onChange={(e) => setTargetPage(Number(e.target.value))}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-blue-600 dark:text-blue-400">
                    Página {targetPage} de {pageCount}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Posicionamento na Folha:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "bottom-right", label: "Inferior Direito (Padrão)" },
                    { id: "bottom-left", label: "Inferior Esquerdo" },
                    { id: "bottom-center", label: "Inferior Central" },
                    { id: "top-right", label: "Superior Direito" },
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => setSignaturePosition(pos.id as any)}
                      className={`p-2.5 rounded-lg border text-left font-semibold transition-all ${
                        signaturePosition === pos.id
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-300"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={exportSignedPdf}
              disabled={!hasDrawn || isExporting}
              className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Carimbando Assinatura...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Aplicar Assinatura no PDF
                </>
              )}
            </button>
          </div>

          {/* Coluna 2: Resultado e Download */}
          <div className="md:col-span-6 space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
                {error}
              </div>
            )}

            {downloadUrl ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    PDF Assinado com Sucesso!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 max-w-sm mx-auto">
                    Sua assinatura foi inserida na página {targetPage}. O documento está pronto para download.
                  </p>
                </div>

                <a
                  href={downloadUrl}
                  download={`assinado_${file.name}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  Baixar Documento Assinado
                </a>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-center text-slate-500 dark:text-slate-400 space-y-2">
                <FileText className="w-10 h-10 mx-auto opacity-40" />
                <p className="text-sm font-semibold">Pré-visualização da Assinatura</p>
                <p className="text-xs">
                  Faça o traço de sua rubrica no painel ao lado e clique em &quot;Aplicar Assinatura&quot; para gerar seu arquivo finalizado.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
              <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
              <p>
                <strong>Sigilo Absoluto:</strong> Nenhuma assinatura ou contrato é transmitido pela internet. O carimbo digital ocorre estritamente dentro da memória RAM do seu navegador.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
