"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";
import EmbeddedUpgradeCard from "@/components/EmbeddedUpgradeCard";

export default function GeradorCurriculoPdfPage() {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [contato, setContato] = useState("");
  const [resumo, setResumo] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [formacao, setFormacao] = useState("");
  const [habilidades, setHabilidades] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(nome || "Seu Nome Completo", 15, y);
    y += 7;

    if (cargo) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text(cargo, 15, y);
      y += 6;
    }

    if (contato) {
      doc.setFontSize(10);
      doc.text(contato, 15, y);
      y += 10;
    }

    const addSection = (title: string, body: string) => {
      if (!body.trim()) return;
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title.toUpperCase(), 15, y);
      y += 2;
      doc.setDrawColor(203, 213, 225);
      doc.line(15, y, 195, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(body, 180);
      doc.text(lines, 15, y);
      y += lines.length * 5 + 6;
    };

    addSection("Resumo Profissional", resumo);
    addSection("Experiência Profissional", experiencia);
    addSection("Formação Acadêmica", formacao);
    addSection("Habilidades", habilidades);

    doc.save("curriculo-ats-criegratis.pdf");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-4 w-4" />
          <span>Layout Limpo (ATS-Friendly)</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerador de Currículo em PDF</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Monte um currículo profissional com texto selecionável, ideal para sistemas de recrutamento (ATS).
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <input required placeholder="Nome completo *" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <input placeholder="Cargo desejado (ex: Analista Administrativo)" value={cargo} onChange={(e) => setCargo(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <input placeholder="Cidade/UF • Telefone • E-mail • LinkedIn" value={contato} onChange={(e) => setContato(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <textarea rows={3} placeholder="Resumo profissional" value={resumo} onChange={(e) => setResumo(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <textarea rows={5} placeholder="Experiência profissional (Empresa, cargo, período e principais resultados)" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <textarea rows={3} placeholder="Formação acadêmica" value={formacao} onChange={(e) => setFormacao(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />
        <textarea rows={2} placeholder="Habilidades e ferramentas" value={habilidades} onChange={(e) => setHabilidades(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm" />

        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition cursor-pointer">
          <Download className="h-4 w-4" />
          <span>Baixar Currículo em PDF</span>
        </button>
      </form>

      <EmbeddedUpgradeCard
        toolSlug="gerador-curriculo-pdf"
        title="Currículo Executivo Premium (Layout Duas Colunas)"
        description="Gere seu currículo com barra lateral executiva, tipografia refinada e destaque visual mantendo leitura ATS."
        priceLabel="R$ 4,90"
        priceCents={490}
        benefits={[
          "Layout Executivo com barra lateral",
          "Mesmos dados já preenchidos",
          "Texto 100% selecionável (ATS)",
          "Download imediato em PDF",
        ]}
        onBeforeCheckout={() => {
          localStorage.setItem(
            "curriculo_draft",
            JSON.stringify({ nome, cargo, contato, resumo, experiencia, formacao, habilidades })
          );
        }}
        onUnlocked={() => {
          const saved = localStorage.getItem("curriculo_draft");
          if (!saved) return;
          const d = JSON.parse(saved);
          const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, 65, 297, "F");
          doc.setTextColor(255, 255, 255);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text(doc.splitTextToSize(d.nome || "Seu Nome", 55), 8, 24);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          if (d.cargo) doc.text(doc.splitTextToSize(d.cargo, 55), 8, 42);
          if (d.contato) doc.text(doc.splitTextToSize(d.contato, 55), 8, 58);
          if (d.habilidades) {
            doc.setFont("helvetica", "bold");
            doc.text("HABILIDADES", 8, 95);
            doc.setFont("helvetica", "normal");
            doc.text(doc.splitTextToSize(d.habilidades, 55), 8, 102);
          }
          doc.setTextColor(15, 23, 42);
          let y = 24;
          const addMain = (t: string, b: string) => {
            if (!b?.trim()) return;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(t, 75, y);
            y += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            const lines = doc.splitTextToSize(b, 122);
            doc.text(lines, 75, y);
            y += lines.length * 5 + 8;
          };
          addMain("RESUMO PROFISSIONAL", d.resumo);
          addMain("EXPERIÊNCIA", d.experiencia);
          addMain("FORMAÇÃO", d.formacao);
          doc.save("curriculo-executivo-premium.pdf");
        }}
      />
    </div>
  );
}
