"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  Download,
  RefreshCw,
  ShieldCheck,
  Edit3,
  Layers,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";

interface FormFieldItem {
  name: string;
  type: string;
  value: string;
}

export default function FillPdfFormTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FormFieldItem[]>([]);
  const [hasAcroForm, setHasAcroForm] = useState<boolean>(false);
  const [isFlatten, setIsFlatten] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf") && selectedFile.type !== "application/pdf") {
      setError("Selecione um arquivo PDF.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);
    setIsProcessing(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const form = pdfDoc.getForm();
      const formFields = form.getFields();

      if (formFields.length > 0) {
        setHasAcroForm(true);
        const mapped = formFields.map((f) => {
          let val = "";
          try {
            // @ts-ignore
            val = f.getText?.() || "";
          } catch (e) {}

          return {
            name: f.getName(),
            type: f.constructor.name,
            value: val,
          };
        });
        setFields(mapped);
      } else {
        setHasAcroForm(false);
        setFields([
          { name: "Nome Completo", type: "Texto", value: "" },
          { name: "CPF ou Documento", type: "Texto", value: "" },
          { name: "Data", type: "Texto", value: new Date().toLocaleDateString("pt-BR") },
          { name: "Observações", type: "Texto", value: "" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os campos do PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const updateFieldValue = (index: number, val: string) => {
    setFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, value: val } : field))
    );
  };

  const handleExport = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      if (hasAcroForm) {
        const form = pdfDoc.getForm();
        fields.forEach((f) => {
          try {
            const field = form.getField(f.name);
            // @ts-ignore
            if (field && typeof field.setText === "function") {
              // @ts-ignore
              field.setText(f.value);
            }
          } catch (e) {
            console.warn(`Erro ao preencher campo ${f.name}:`, e);
          }
        });

        if (isFlatten) {
          form.flatten();
        }
      } else {
        // Documento sem formulário interativo nativo: carimba dados no rodapé da 1ª página
        const pages = pdfDoc.getPages();
        if (pages.length > 0) {
          const firstPage = pages[0];
          const summaryText = fields
            .filter((f) => f.value.trim() !== "")
            .map((f) => `${f.name}: ${f.value}`)
            .join(" | ");

          if (summaryText) {
            firstPage.drawText(summaryText, {
              x: 30,
              y: 20,
              size: 9,
            });
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Erro ao preencher e gerar o PDF.");
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
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {hasAcroForm
                    ? `${fields.length} campos de formulário detectados`
                    : "Formulário genérico (carimbo de dados adicionais)"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setDownloadUrl(null);
              }}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              Trocar Documento
            </button>
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
                  Formulário Preenchido e Finalizado!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {isFlatten
                    ? "Os campos foram achatados (flattened) tornando o documento protegido contra alterações."
                    : "O formulário foi salvo mantendo campos editáveis."}
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`preenchido_${file.name}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Preenchido
              </a>
            </div>
          )}

          {/* Lista de Campos para Preencher */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Campos do Documento
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field, idx) => (
                <div key={`${field.name}-${idx}`} className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 truncate">
                    {field.name}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateFieldValue(idx, e.target.value)}
                    placeholder={`Preencher ${field.name}...`}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {hasAcroForm && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFlatten}
                    onChange={(e) => setIsFlatten(e.target.checked)}
                    className="rounded accent-blue-600 w-4 h-4"
                  />
                  <span>
                    <strong>Achatar campos (Flatten):</strong> Bloqueia edições tornando os textos parte definitiva do PDF.
                  </span>
                </label>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleExport}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Salvar e Exportar PDF
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              Preenchimento 100% seguro: seus dados preenchidos nunca saem do seu navegador.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
