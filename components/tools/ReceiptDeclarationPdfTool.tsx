"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { Download, FileSignature } from "lucide-react";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

type DocType = "recibo" | "declaracao" | "procuracao";

export default function ReceiptDeclarationPdfTool() {
  const [docType, setDocType] = useState<DocType>("recibo");
  const [issuerName, setIssuerName] = useState("");
  const [issuerDoc, setIssuerDoc] = useState("");
  const [otherName, setOtherName] = useState("");
  const [otherDoc, setOtherDoc] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [downloadNoticeOpen, setDownloadNoticeOpen] = useState(false);

  const generatePdf = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const today = new Date().toLocaleDateString("pt-BR");

    let title = "RECIBO DE PAGAMENTO";
    let body = "";

    if (docType === "recibo") {
      title = "RECIBO DE PAGAMENTO";
      body = `Recebi de ${otherName || "[Nome do Pagador]"} (CPF/CNPJ: ${otherDoc || "[Documento]"}), a importância de R$ ${amount || "0,00"}, referente a ${details || "[Descrição do serviço ou produto]"}.\n\nPara maior clareza, firmo o presente recibo dando plena e geral quitação.`;
    } else if (docType === "declaracao") {
      title = "DECLARAÇÃO DE RESIDÊNCIA";
      body = `Eu, ${issuerName || "[Seu Nome Completo]"}, inscrito(a) no CPF sob o nº ${issuerDoc || "[Seu CPF]"}, DECLARO para os devidos fins que resido no endereço: ${details || "[Endereço completo com CEP, Cidade e Estado]"}.\n\nPor ser verdade, firmo a presente declaração sob as penas da lei.`;
    } else {
      title = "PROCURAÇÃO SIMPLES";
      body = `OUTORGANTE: ${issuerName || "[Seu Nome]"}, CPF ${issuerDoc || "[Seu CPF]"}.\nOUTORGADO(A): ${otherName || "[Nome do Procurador]"}, CPF ${otherDoc || "[CPF do Procurador]"}.\n\nPODERES: Pelo presente instrumento particular, o(a) Outorgante nomeia e constitui o(a) Outorgado(a) como seu(sua) bastante procurador(a) para fins específicos de: ${details || "[Descrever os poderes concedidos]"}.`;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(title, 105, 35, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(body, 165);
    pdf.text(lines, 22, 60, { lineHeightFactor: 1.5 });

    const dateLine = `${city || "Cidade"}, ${today}.`;
    pdf.text(dateLine, 22, 150);

    pdf.line(55, 185, 155, 185);
    pdf.setFontSize(10);
    pdf.text(issuerName || "Assinatura", 105, 192, { align: "center" });

    pdf.save(`${docType}_simples.pdf`);
    setDownloadNoticeOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: "recibo" as DocType, label: "Recibo Simples" },
          { id: "declaracao" as DocType, label: "Declaração de Residência" },
          { id: "procuracao" as DocType, label: "Procuração Simples" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setDocType(tab.id)}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer ${
              docType === tab.id
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            {docType === "recibo" ? "Seu Nome (Quem Recebe)" : "Seu Nome Completo"}
          </label>
          <input type="text" value={issuerName} onChange={(e) => setIssuerName(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Seu CPF / CNPJ</label>
          <input type="text" value={issuerDoc} onChange={(e) => setIssuerDoc(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
        </div>

        {docType !== "declaracao" && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {docType === "recibo" ? "Nome do Pagador" : "Nome do Procurador"}
              </label>
              <input type="text" value={otherName} onChange={(e) => setOtherName(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">CPF / CNPJ da outra parte</label>
              <input type="text" value={otherDoc} onChange={(e) => setOtherDoc(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
            </div>
          </>
        )}

        {docType === "recibo" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Valor (R$)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ex: 250,00" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Cidade</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex: São Paulo - SP" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          {docType === "recibo" ? "Referente a (Serviço/Produto)" : docType === "declaracao" ? "Endereço Completo" : "Finalidade / Poderes da Procuração"}
        </label>
        <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" />
      </div>

      <button
        type="button"
        onClick={generatePdf}
        className="w-full py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer"
      >
        <Download className="w-4 h-4" /> Baixar Documento em PDF
      </button>

      <p className="text-xs text-slate-600 dark:text-slate-400 text-center flex items-center justify-center gap-1.5">
        <FileSignature className="w-4 h-4 text-blue-600" />
        Precisa assinar este PDF pelo celular?{" "}
        <Link href="/assinar-pdf" className="text-blue-600 underline font-semibold">
          Assinar PDF Online Grátis
        </Link>
      </p>

      <DownloadSuccessModal isOpen={downloadNoticeOpen} onClose={() => setDownloadNoticeOpen(false)} />
    </div>
  );
}
