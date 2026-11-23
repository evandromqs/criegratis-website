"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";

export default function PlacaPixPdfPage() {
  const [nome, setNome] = useState("");
  const [chave, setChave] = useState("");
  const [banco, setBanco] = useState("");
  const [mensagem, setMensagem] = useState("Aponte a câmera do seu celular para pagar");
  const [gerando, setGerando] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chave.trim()) return;
    setGerando(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(chave.trim(), { width: 600, margin: 2 });
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, 210, 42, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text("PAGUE COM PIX", 105, 26, { align: "center" });

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(18);
      doc.text(nome.trim() || "Recebedor", 105, 62, { align: "center" });

      if (banco.trim()) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(71, 85, 105);
        doc.text(banco.trim(), 105, 70, { align: "center" });
      }

      doc.addImage(qrDataUrl, "PNG", 50, 82, 110, 110);

      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(25, 204, 160, 24, 4, 4, "S");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105);
      doc.text("CHAVE PIX:", 105, 213, { align: "center" });
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(chave.trim(), 105, 222, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text(mensagem.trim(), 105, 248, { align: "center" });

      doc.save("placa-pix-criegratis.pdf");
    } finally {
      setGerando(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-semibold text-emerald-700">
          <QrCode className="h-4 w-4" />
          <span>100% Gratuito no Navegador</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerador de Placa Pix em PDF</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Crie uma placa Pix A4 com QR Code pronta para imprimir e colocar no balcão.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Nome do Estabelecimento ou Recebedor</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Padaria Central LTDA"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Chave Pix *</label>
          <input
            type="text"
            required
            value={chave}
            onChange={(e) => setChave(e.target.value)}
            placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Banco / Instituição (opcional)</label>
          <input
            type="text"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            placeholder="Ex: Nubank, Mercado Pago, Banco do Brasil"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Mensagem no rodapé</label>
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={gerando}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 transition cursor-pointer disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          <span>{gerando ? "Gerando PDF..." : "Baixar Placa Pix em PDF"}</span>
        </button>
      </form>
    </div>
  );
}
