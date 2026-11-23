"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";

export default function GeradorContratoPrestacaoServicosPage() {
  const [contratante, setContratante] = useState("");
  const [contratanteDoc, setContratanteDoc] = useState("");
  const [contratado, setContratado] = useState("");
  const [contratadoDoc, setContratadoDoc] = useState("");
  const [objeto, setObjeto] = useState("");
  const [valor, setValor] = useState("");
  const [prazo, setPrazo] = useState("");
  const [cidade, setCidade] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS", 105, 22, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const texto = `Pelo presente instrumento particular, de um lado ${contratante}, inscrito(a) no CPF/CNPJ sob nº ${contratanteDoc}, doravante denominado(a) CONTRATANTE, e de outro lado ${contratado}, inscrito(a) no CPF/CNPJ sob nº ${contratadoDoc}, doravante denominado(a) CONTRATADO(A), têm entre si justo e contratado o seguinte:

CLÁUSULA 1ª - DO OBJETO
O presente contrato tem como objeto a prestação dos seguintes serviços: ${objeto}.

CLÁUSULA 2ª - DO PRAZO
Os serviços serão executados e entregues no prazo de ${prazo}.

CLÁUSULA 3ª - DO VALOR E PAGAMENTO
Pelos serviços prestados, o(a) CONTRATANTE pagará ao(à) CONTRATADO(A) o valor total de R$ ${valor}.

CLÁUSULA 4ª - DO FORO
Fica eleito o foro da comarca de ${cidade || "residência do contratante"} para dirimir quaisquer dúvidas oriundas deste contrato.

E, por estarem assim justos e contratados, assinam o presente instrumento.`;

    const lines = doc.splitTextToSize(texto, 180);
    doc.text(lines, 15, 36);

    const sigY = 36 + lines.length * 5 + 25;
    doc.line(15, sigY, 90, sigY);
    doc.text("CONTRATANTE", 15, sigY + 5);

    doc.line(115, sigY, 190, sigY);
    doc.text("CONTRATADO(A)", 115, sigY + 5);

    doc.save("contrato-prestacao-servicos.pdf");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-4 w-4" />
          <span>Pronto para Assinar</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contrato de Prestação de Serviços PDF</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Gere um contrato simples para autônomos, freelancers e MEIs direto no navegador.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Nome do Contratante *" value={contratante} onChange={(e) => setContratante(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
          <input required placeholder="CPF/CNPJ do Contratante *" value={contratanteDoc} onChange={(e) => setContratanteDoc(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input required placeholder="Nome do Contratado *" value={contratado} onChange={(e) => setContratado(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
          <input required placeholder="CPF/CNPJ do Contratado *" value={contratadoDoc} onChange={(e) => setContratadoDoc(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        </div>
        <textarea required rows={3} placeholder="Descrição do serviço (objeto do contrato) *" value={objeto} onChange={(e) => setObjeto(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input required placeholder="Valor (ex: 1.500,00) *" value={valor} onChange={(e) => setValor(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
          <input required placeholder="Prazo (ex: 15 dias úteis) *" value={prazo} onChange={(e) => setPrazo(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
          <input placeholder="Cidade/UF do foro" value={cidade} onChange={(e) => setCidade(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        </div>
        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition cursor-pointer">
          <Download className="h-4 w-4" />
          <span>Baixar Contrato em PDF</span>
        </button>
      </form>
    </div>
  );
}
