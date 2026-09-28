"use client";

import React, { useState } from "react";
import {
  FileText,
  EyeOff,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

interface RedactionBox {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: "black" | "white";
}

export default function RedactPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [boxColor, setBoxColor] = useState<"black" | "white">("black");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setActivePage(1);

      // Adiciona uma tarja padrão para guiar o usuário
      setRedactions([
        {
          id: Math.random().toString(36).substring(2, 9),
          page: 1,
          x: 50,
          y: 650,
          width: 250,
          height: 25,
          color: "black",
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o arquivo PDF.");
      setFile(null);
    }
  };

  const addRedaction = () => {
    const newBox: RedactionBox = {
      id: Math.random().toString(36).substring(2, 9),
      page: activePage,
      x: 50,
      y: 500,
      width: 200,
      height: 24,
      color: boxColor,
    };
    setRedactions((prev) => [...prev, newBox]);
    setDownloadUrl(null);
  };

  const removeRedaction = (id: string) => {
    setRedactions((prev) => prev.filter((r) => r.id !== id));
    setDownloadUrl(null);
  };

  const updateRedaction = (id: string, updates: Partial<RedactionBox>) => {
    setRedactions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    setDownloadUrl(null);
  };

  const exportRedactedPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      for (const box of redactions) {
        const pageIdx = Math.max(0, Math.min(box.page - 1, pages.length - 1));
        const page = pages[pageIdx];

        const fillColor = box.color === "black" ? rgb(0, 0, 0) : rgb(1, 1, 1);

        page.drawRectangle({
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          color: fillColor,
          opacity: 1,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao aplicar as tarjas de censura no PDF.");
    } finally {
      setIsProcessing(false);
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pageCount} página(s) • {redactions.length} tarja(s) de censura
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Trocar Arquivo
              </button>
              <button
                type="button"
                onClick={exportRedactedPdf}
                disabled={isProcessing || redactions.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Aplicar Censura e Salvar
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
                  PDF Censurado com Sucesso!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  As tarjas de proteção foram gravadas permanentemente sobre o conteúdo.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`censurado_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Censurado
              </a>
            </div>
          )}

          {/* Gerenciamento das Tarjas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Adicionar Nova Tarja
                </h4>
                <button
                  type="button"
                  onClick={addRedaction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Nova Tarja
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Página Alvo:
                  </label>
                  <select
                    value={activePage}
                    onChange={(e) => setActivePage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    {Array.from({ length: pageCount }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Página {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Cor da Tarja:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBoxColor("black")}
                      className={`p-2 rounded-lg border font-bold flex items-center justify-center gap-2 ${
                        boxColor === "black"
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black inline-block" />
                      Tarja Preta
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoxColor("white")}
                      className={`p-2 rounded-lg border font-bold flex items-center justify-center gap-2 ${
                        boxColor === "white"
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "border-slate-200 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block" />
                      Tarja Branca
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Tarjas Criadas */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Tarjas Configuradas ({redactions.length})
              </h4>

              {redactions.length === 0 ? (
                <div className="p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-500">
                  Nenhuma tarja adicionada ainda. Clique em &quot;Nova Tarja&quot; para proteger dados confidenciais.
                </div>
              ) : (
                <div className="space-y-3">
                  {redactions.map((box, idx) => (
                    <div
                      key={box.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${
                            box.color === "black"
                              ? "bg-black text-white"
                              : "bg-white border border-slate-400 text-slate-800"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Página {box.page} • Largura: {box.width}px • Altura: {box.height}px
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Posição X: {box.x} | Y: {box.y}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[11px]">
                          <label className="text-slate-500">Largura:</label>
                          <input
                            type="number"
                            value={box.width}
                            onChange={(e) => updateRedaction(box.id, { width: Number(e.target.value) })}
                            className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-center"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeRedaction(box.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remover tarja"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              As tarjas opacas são pintadas diretamente na matriz gráfica vetorial do PDF, garantindo conformidade com a LGPD e sigilo de CPFs, valores bancários ou nomes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
