"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  ShieldCheck,
  Sparkles,
  FileCode,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

export default function OcrPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setExtractedText("");
    setIsProcessing(true);

    try {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) throw new Error("file type");
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
      const task = pdfjs.getDocument({ data: new Uint8Array(await selectedFile.arrayBuffer()) });
      try {
        const pdf = await task.promise;
        const pages: string[] = [];
        for (let index = 1; index <= pdf.numPages; index++) {
          const page = await pdf.getPage(index);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => "str" in item ? item.str : "").join(" ").trim();
          if (pageText) pages.push(`Página ${index}\n${pageText}`);
          page.cleanup();
        }
        if (pages.length === 0) setError("Este PDF não contém texto selecionável. A ferramenta não reconhece texto de páginas digitalizadas ou imagens.");
        else setExtractedText(pages.join("\n\n"));
      } finally { await task.destroy(); }
    } catch (err) {
      console.error(err);
      setError("Não foi possível ler o texto deste PDF. Confira se o arquivo está íntegro e sem senha.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `texto_extraido_${file?.name.replace(/\.[^/.]+$/, "") || "documento"}.txt`;
    a.click();
    setNotice(true);
    URL.revokeObjectURL(url);
  };

  const wordCount = extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0;
  const charCount = extractedText.length;

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          onFileSelect={handleFile}
          maxSizeMB={30}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isProcessing ? "Lendo PDF…" : `${wordCount} palavras • ${charCount} caracteres`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setExtractedText("");
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Trocar Arquivo
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!extractedText || isProcessing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar Texto"}
              </button>
              <button
                type="button"
                onClick={handleDownloadTxt}
                disabled={!extractedText || isProcessing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar .TXT
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {/* Área de texto extraído */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 px-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Texto Extraído (Editável):
              </span>
              <span className="text-slate-500 font-normal">
                Você pode editar e formatar o texto diretamente nesta caixa
              </span>
            </div>

            <textarea
              rows={12}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              placeholder="O texto extraído do seu documento aparecerá aqui..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Toda a análise textual é executada na máquina do usuário. Nenhum contrato, nota fiscal ou extrato é enviado para a nuvem.
            </p>
          </div>
        </div>
      )}
      <DownloadSuccessModal isOpen={notice} onClose={() => setNotice(false)} />
    </div>
  );
}
