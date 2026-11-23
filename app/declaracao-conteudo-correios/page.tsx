"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText, Plus, Trash2 } from "lucide-react";

interface Item {
  descricao: string;
  qtd: number;
  valor: number;
}

export default function DeclaracaoConteudoCorreiosPage() {
  const [remetenteNome, setRemetenteNome] = useState("");
  const [remetenteDoc, setRemetenteDoc] = useState("");
  const [remetenteEnd, setRemetenteEnd] = useState("");
  const [destNome, setDestNome] = useState("");
  const [destDoc, setDestDoc] = useState("");
  const [destEnd, setDestEnd] = useState("");
  const [itens, setItens] = useState<Item[]>([{ descricao: "", qtd: 1, valor: 0 }]);

  const addItem = () => setItens([...itens, { descricao: "", qtd: 1, valor: 0 }]);
  const removeItem = (idx: number) => setItens(itens.filter((_, i) => i !== idx));

  const updateItem = (idx: number, field: keyof Item, value: string | number) => {
    const next = [...itens];
    next[idx] = { ...next[idx], [field]: value };
    setItens(next);
  };

  const totalGeral = itens.reduce((acc, item) => acc + item.qtd * item.valor, 0);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE CONTEÚDO", 105, 20, { align: "center" });

    doc.setFontSize(11);
    doc.text("REMETENTE", 15, 34);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Nome: ${remetenteNome}`, 15, 40);
    doc.text(`CPF/CNPJ: ${remetenteDoc}`, 15, 46);
    doc.text(`Endereço: ${remetenteEnd}`, 15, 52);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("DESTINATÁRIO", 15, 66);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Nome: ${destNome}`, 15, 72);
    doc.text(`CPF/CNPJ: ${destDoc}`, 15, 78);
    doc.text(`Endereço: ${destEnd}`, 15, 84);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("IDENTIFICAÇÃO DOS BENS", 15, 98);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    let y = 106;
    itens.forEach((item, i) => {
      const sub = (item.qtd * item.valor).toFixed(2);
      doc.text(`${i + 1}. ${item.descricao} | Qtd: ${item.qtd} | Unit: R$ ${item.valor.toFixed(2)} | Total: R$ ${sub}`, 15, y);
      y += 7;
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text(`VALOR TOTAL DECLARADO: R$ ${totalGeral.toFixed(2)}`, 15, y);

    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996,", 15, y);
    doc.text("responsabilizando-me pelas informações prestadas.", 15, y + 5);

    y += 25;
    doc.line(15, y, 105, y);
    doc.text("Assinatura do Declarante / Remetente", 15, y + 5);

    doc.save("declaracao-de-conteudo.pdf");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <FileText className="h-4 w-4" />
          <span>Padrão Correios / Transportadoras</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Declaração de Conteúdo Correios PDF</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Preencha os dados e baixe a Declaração de Conteúdo pronta para imprimir e colar na encomenda.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white">Dados do Remetente</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Nome completo" value={remetenteNome} onChange={(e) => setRemetenteNome(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
            <input required placeholder="CPF ou CNPJ" value={remetenteDoc} onChange={(e) => setRemetenteDoc(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
          </div>
          <input required placeholder="Endereço completo com CEP" value={remetenteEnd} onChange={(e) => setRemetenteEnd(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white">Dados do Destinatário</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder="Nome completo" value={destNome} onChange={(e) => setDestNome(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
            <input required placeholder="CPF ou CNPJ" value={destDoc} onChange={(e) => setDestDoc(e.target.value)} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
          </div>
          <input required placeholder="Endereço completo com CEP" value={destEnd} onChange={(e) => setDestEnd(e.target.value)} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">Itens da Encomenda</h2>
            <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Adicionar item
            </button>
          </div>
          {itens.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
              <input required placeholder="Descrição do item" value={item.descricao} onChange={(e) => updateItem(idx, "descricao", e.target.value)} className="col-span-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
              <input type="number" min={1} required placeholder="Qtd" value={item.qtd} onChange={(e) => updateItem(idx, "qtd", Number(e.target.value))} className="col-span-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
              <input type="number" min={0} step="0.01" required placeholder="Valor R$" value={item.valor} onChange={(e) => updateItem(idx, "valor", Number(e.target.value))} className="col-span-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
              {itens.length > 1 && (
                <button type="button" onClick={() => removeItem(idx)} className="col-span-1 text-rose-500 flex justify-center cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <p className="text-sm font-semibold text-right text-slate-700 dark:text-slate-300">
            Total declarado: R$ {totalGeral.toFixed(2)}
          </p>
        </div>

        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition cursor-pointer">
          <Download className="h-4 w-4" />
          <span>Baixar Declaração de Conteúdo em PDF</span>
        </button>
      </form>
    </div>
  );
}
