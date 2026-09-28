"use client";

import React, { useState } from "react";
import {
  FileText,
  Shield,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  Trash2,
  Edit2,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

interface MetadataState {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
  creationDate: string;
  modificationDate: string;
}

export default function PdfMetadataTool() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<MetadataState>({
    title: "",
    author: "",
    subject: "",
    keywords: "",
    creator: "",
    producer: "",
    creationDate: "",
    modificationDate: "",
  });
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
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      setMeta({
        title: pdfDoc.getTitle() || "",
        author: pdfDoc.getAuthor() || "",
        subject: pdfDoc.getSubject() || "",
        keywords: pdfDoc.getKeywords() || "",
        creator: pdfDoc.getCreator() || "",
        producer: pdfDoc.getProducer() || "",
        creationDate: pdfDoc.getCreationDate()?.toLocaleString("pt-BR") || "Não informada",
        modificationDate: pdfDoc.getModificationDate()?.toLocaleString("pt-BR") || "Não informada",
      });
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os metadados do documento.");
      setFile(null);
    }
  };

  const handleClearAll = () => {
    setMeta({
      title: "",
      author: "",
      subject: "",
      keywords: "",
      creator: "",
      producer: "",
      creationDate: "Removida",
      modificationDate: "Removida",
    });
    setDownloadUrl(null);
  };

  const handleSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      pdfDoc.setTitle(meta.title);
      pdfDoc.setAuthor(meta.author);
      pdfDoc.setSubject(meta.subject);
      pdfDoc.setKeywords(meta.keywords ? meta.keywords.split(",").map((k) => k.trim()) : []);
      pdfDoc.setCreator(meta.creator);
      pdfDoc.setProducer(meta.producer);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar os novos metadados.");
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
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspeção e Anonimização de Metadados
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
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar Todos os Rastros
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
                  Metadados Atualizados com Sucesso!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  O documento foi higienizado e está livre de identificadores indesejados.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`limpo_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Sanitizado
              </a>
            </div>
          )}

          {/* Editor de Metadados */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-blue-600" />
              Campos de Metadados do Arquivo
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Título</label>
                <input
                  type="text"
                  value={meta.title}
                  onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                  placeholder="Título do documento..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Autor</label>
                <input
                  type="text"
                  value={meta.author}
                  onChange={(e) => setMeta({ ...meta, author: e.target.value })}
                  placeholder="Nome do autor ou empresa..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Assunto</label>
                <input
                  type="text"
                  value={meta.subject}
                  onChange={(e) => setMeta({ ...meta, subject: e.target.value })}
                  placeholder="Assunto ou descrição sumária..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Palavras-chave</label>
                <input
                  type="text"
                  value={meta.keywords}
                  onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
                  placeholder="palavra1, palavra2, tag3..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Software Criador</label>
                <input
                  type="text"
                  value={meta.creator}
                  onChange={(e) => setMeta({ ...meta, creator: e.target.value })}
                  placeholder="Software que originou o arquivo..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Produtor PDF</label>
                <input
                  type="text"
                  value={meta.producer}
                  onChange={(e) => setMeta({ ...meta, producer: e.target.value })}
                  placeholder="Motor de conversão..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Datas originais: Criação ({meta.creationDate}) • Modificação ({meta.modificationDate})
              </span>
              <button
                type="button"
                onClick={handleSave}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Salvar Metadados no PDF
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Perfeito para remover rastros de versão, nomes de usuários e diretórios locais antes de enviar documentos para clientes ou licitações.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
