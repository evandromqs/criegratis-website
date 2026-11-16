"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { jsPDF } from "jspdf";
import { Plus, Trash2, Download, FileText, Upload, Eye, X } from "lucide-react";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

interface QuoteItem {
  id: number;
  description: string;
  qty: number;
  price: number;
}

export default function QuoteGeneratorPdfTool() {
  const [companyName, setCompanyName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [clientName, setClientName] = useState("");
  const [validity, setValidity] = useState("15 dias");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<QuoteItem[]>([
    { id: 1, description: "Serviço / Produto exemplo", qty: 1, price: 150 },
  ]);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfImagePreview, setPdfImagePreview] = useState<string | null>(null);
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogoDataUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), description: "", qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof QuoteItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  const formatBRL = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const buildPdf = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let y = 20;

    if (logoDataUrl) {
      try {
        const format = logoDataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
        pdf.addImage(logoDataUrl, format, 20, 14, 24, 24);
      } catch {
        // Ignora se a imagem não for suportada
      }
    }

    const textX = logoDataUrl ? 50 : 20;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(companyName || "ORÇAMENTO / PROPOSTA COMERCIAL", textX, y);
    y += 7;

    if (companyContact) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(companyContact, textX, y);
      y += 8;
    }

    if (logoDataUrl && y < 42) y = 42;

    pdf.setDrawColor(220);
    pdf.line(20, y, 190, y);
    y += 10;

    pdf.setTextColor(30);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text(`Cliente: ${clientName || "Não informado"}`, 20, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Data: ${new Date().toLocaleDateString("pt-BR")}   |   Validade: ${validity}`, 20, y + 6);
    y += 16;

    // Cabeçalho da tabela
    pdf.setFillColor(241, 245, 249);
    pdf.rect(20, y - 5, 170, 8, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("Descrição", 22, y);
    pdf.text("Qtd", 125, y);
    pdf.text("Unitário", 142, y);
    pdf.text("Subtotal", 168, y);
    y += 8;

    pdf.setFont("helvetica", "normal");
    items.forEach((item) => {
      const desc = item.description || "Item";
      pdf.text(desc.slice(0, 50), 22, y);
      pdf.text(String(item.qty), 125, y);
      pdf.text(formatBRL(item.price), 142, y);
      pdf.text(formatBRL(item.qty * item.price), 168, y);
      y += 7;
    });

    y += 5;
    pdf.line(20, y, 190, y);
    y += 8;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(`TOTAL: ${formatBRL(total)}`, 190, y, { align: "right" });
    y += 12;

    if (notes) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Observações:", 20, y);
      y += 5;
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(notes, 170);
      pdf.text(lines, 20, y);
    }

    return pdf;
  };

  const openPdfPreview = async () => {
    const pdf = buildPdf();
    const blob = pdf.output("blob");
    if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
    const blobUrl = URL.createObjectURL(blob);
    setPdfPreviewUrl(blobUrl);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const arrayBuffer = await blob.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        setLogoDataUrl((prev) => prev); // noop to keep state clean
        setPdfImagePreview(canvas.toDataURL("image/png"));
      }
    } catch {
      setPdfImagePreview(null);
    }
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Sua Empresa ou Nome</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Ex: Silva Serviços Digitais"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contato (WhatsApp / E-mail / CNPJ)</label>
          <input
            type="text"
            value={companyContact}
            onChange={(e) => setCompanyContact(e.target.value)}
            placeholder="Ex: (11) 99999-9999 • contato@empresa.com"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nome do Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ex: João da Silva"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Validade do Orçamento</label>
          <input
            type="text"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoDataUrl} alt="Logo do orçamento" className="h-12 w-12 rounded-lg object-contain border border-slate-200 bg-white p-1" />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Upload className="w-5 h-5" />
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Logotipo da Empresa (opcional)</p>
            <p className="text-[11px] text-slate-500">PNG ou JPG para exibir no topo do PDF</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer">
            {logoDataUrl ? "Trocar Logo" : "Adicionar Logo"}
            <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={handleLogoUpload} />
          </label>
          {logoDataUrl && (
            <button
              type="button"
              onClick={() => setLogoDataUrl(null)}
              className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
            >
              Remover
            </button>
          )}
        </div>
      </div>

      {/* Itens */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Itens do Orçamento
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Adicionar Item
          </button>
        </div>

        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              placeholder="Descrição do serviço ou produto"
              className="col-span-12 sm:col-span-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
            <input
              type="number"
              min={1}
              value={item.qty}
              onChange={(e) => updateItem(item.id, "qty", Number(e.target.value) || 1)}
              className="col-span-4 sm:col-span-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              value={item.price}
              onChange={(e) => updateItem(item.id, "price", Number(e.target.value) || 0)}
              className="col-span-6 sm:col-span-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="col-span-2 sm:col-span-1 flex justify-center text-rose-500 hover:text-rose-700 cursor-pointer"
              aria-label="Remover item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Observações / Condições de Pagamento</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: Pagamento via Pix com 50% de entrada."
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
        <div>
          <span className="text-xs text-slate-500">Valor Total</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{formatBRL(total)}</p>
        </div>
        <button
          type="button"
          onClick={openPdfPreview}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="w-4 h-4" /> Revisar e Baixar PDF
        </button>
      </div>

      {previewOpen &&
        pdfPreviewUrl &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xl space-y-4">
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Fechar revisão"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Prévia Real do PDF Gerado
              </h4>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-3 flex justify-center overflow-y-auto max-h-[65vh]">
                {pdfImagePreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pdfImagePreview}
                    alt="Prévia do Orçamento em PDF"
                    className="w-full max-w-md rounded-lg shadow-md bg-white object-contain"
                  />
                )}
              </div>

              <a
                href={pdfPreviewUrl}
                download={`orcamento_${(clientName || "cliente").toLowerCase().replace(/\s+/g, "_")}.pdf`}
                onClick={() => {
                  setPreviewOpen(false);
                  setDownloadNoticeOpen(true);
                }}
                className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Confirmar e Baixar PDF
              </a>
            </div>
          </div>,
          document.body
        )}

      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
