"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Download,
  RefreshCw,
  RotateCw,
  ShieldCheck,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

interface PageItem {
  originalIndex: number;
  rotation: number;
}

export default function OrganizePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf") && selectedFile.type !== "application/pdf") {
      setError("Por favor, selecione um arquivo no formato PDF válido.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);
    setIsProcessing(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();

      const initialPages: PageItem[] = Array.from({ length: count }, (_, i) => ({
        originalIndex: i,
        rotation: 0,
      }));

      setPages(initialPages);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o arquivo PDF. Verifique se o documento não está corrompido ou protegido por senha forte.");
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const movePage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;

    const newPages = [...pages];
    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;
    setPages(newPages);
    setDownloadUrl(null);
  };

  const rotatePage = (index: number) => {
    setPages((prev) =>
      prev.map((p, i) => (i === index ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
    setDownloadUrl(null);
  };

  const removePage = (index: number) => {
    if (pages.length <= 1) {
      setError("O documento precisa ter pelo menos uma página.");
      return;
    }
    setPages((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  };

  const handleExport = async () => {
    if (!file || pages.length === 0) return;
    setIsExporting(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      for (const p of pages) {
        const [copiedPage] = await newDoc.copyPages(srcDoc, [p.originalIndex]);
        if (p.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation(degrees((currentRotation + p.rotation) % 360));
        }
        newDoc.addPage(copiedPage);
      }

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao gerar o novo arquivo PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setDownloadUrl(null);
    setError(null);
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
        <div className="space-y-6">
          {/* Header de controles do arquivo */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pages.length} {pages.length === 1 ? "página selecionada" : "páginas selecionadas"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Trocar Arquivo
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Salvar e Baixar PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {downloadUrl && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  PDF Reorganizado com Sucesso!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  A nova ordem das páginas e orientações foram salvas na memória com segurança.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`organizado_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Organizado
              </a>
            </div>
          )}

          {/* Grid de páginas reordenáveis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>Use as setas para mover as páginas para a esquerda ou direita</span>
              <span>Total de {pages.length} páginas</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pages.map((p, idx) => (
                <div
                  key={`${p.originalIndex}-${idx}`}
                  className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                >
                  {/* Visualização simbólica da folha */}
                  <div className="relative aspect-[3/4] w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200/80 dark:border-slate-700/80 overflow-hidden select-none">
                    <FileText className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                    <span className="mt-2 text-xs font-black text-slate-700 dark:text-slate-200">
                      Pág. {p.originalIndex + 1}
                    </span>
                    {p.rotation !== 0 && (
                      <span className="mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        {p.rotation}°
                      </span>
                    )}
                    <span className="absolute top-2 left-2 rounded-md bg-slate-900/80 text-white dark:bg-slate-100 dark:text-slate-900 px-1.5 py-0.5 text-[10px] font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Ações da página */}
                  <div className="mt-3 flex items-center justify-between gap-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                    <button
                      type="button"
                      onClick={() => movePage(idx, "left")}
                      disabled={idx === 0}
                      title="Mover para esquerda"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 disabled:opacity-25 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => rotatePage(idx)}
                      title="Girar 90 graus"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => removePage(idx)}
                      title="Excluir página"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => movePage(idx, "right")}
                      disabled={idx === pages.length - 1}
                      title="Mover para direita"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 disabled:opacity-25 transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Box de segurança */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
        <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
        <p>
          <strong>Privacidade total:</strong> Todas as páginas são reorganizadas localmente no seu computador através da biblioteca WebAssembly e Web Worker. Seus arquivos confidenciais nunca são transferidos para a internet.
        </p>
      </div>
    </div>
  );
}
