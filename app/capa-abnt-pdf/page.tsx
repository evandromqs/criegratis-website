"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";

export default function CapaAbntPdfPage() {
  const [instituicao, setInstituicao] = useState("");
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [cidade, setCidade] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [incluirFolhaRosto, setIncluirFolhaRosto] = useState(true);
  const [natureza, setNatureza] = useState("Trabalho acadêmico apresentado como requisito parcial para obtenção de nota.");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Capa
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text(instituicao.toUpperCase(), 105, 30, { align: "center" });

    doc.setFont("times", "normal");
    doc.text(autor.toUpperCase(), 105, 65, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text(titulo.toUpperCase(), 105, 135, { align: "center" });

    if (subtitulo.trim()) {
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(subtitulo, 105, 143, { align: "center" });
    }

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(cidade.toUpperCase(), 105, 265, { align: "center" });
    doc.text(ano, 105, 272, { align: "center" });

    // Folha de Rosto
    if (incluirFolhaRosto) {
      doc.addPage();
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(autor.toUpperCase(), 105, 30, { align: "center" });

      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.text(titulo.toUpperCase(), 105, 115, { align: "center" });

      if (subtitulo.trim()) {
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text(subtitulo, 105, 123, { align: "center" });
      }

      doc.setFont("times", "normal");
      doc.setFontSize(10);
      const natLines = doc.splitTextToSize(natureza, 85);
      doc.text(natLines, 105, 145);

      doc.setFontSize(12);
      doc.text(cidade.toUpperCase(), 105, 265, { align: "center" });
      doc.text(ano, 105, 272, { align: "center" });
    }

    doc.save("capa-abnt-criegratis.pdf");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-4 w-4" />
          <span>Normas ABNT</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerador de Capa e Folha de Rosto ABNT</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Gere capa e folha de rosto formatadas nas normas ABNT e baixe em PDF.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <input required placeholder="Nome da Instituição *" value={instituicao} onChange={(e) => setInstituicao(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <input required placeholder="Nome do Autor *" value={autor} onChange={(e) => setAutor(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <input required placeholder="Título do Trabalho *" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <input placeholder="Subtítulo (opcional)" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Cidade *" value={cidade} onChange={(e) => setCidade(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
          <input required placeholder="Ano *" value={ano} onChange={(e) => setAno(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <input type="checkbox" checked={incluirFolhaRosto} onChange={(e) => setIncluirFolhaRosto(e.target.checked)} />
          <span>Incluir Folha de Rosto</span>
        </label>
        {incluirFolhaRosto && (
          <textarea rows={2} value={natureza} onChange={(e) => setNatureza(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        )}
        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition cursor-pointer">
          <Download className="h-4 w-4" />
          <span>Baixar Capa ABNT em PDF</span>
        </button>
      </form>
    </div>
  );
}
