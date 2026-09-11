"use client";

import React, { useState } from "react";
import { Heart, Copy, Check } from "lucide-react";
import SupportModal from "@/components/SupportModal";

export default function RoadmapSupportSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pixKey = "pix@criegratis.com.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-2xs">
          <Heart className="h-6 w-6 fill-rose-500 text-rose-500" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Apoie o Projeto CrieGrátis
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          O CrieGrátis é mantido de forma independente, sem anúncios invasivos e sem cobrar assinaturas. Contribuições voluntárias via Pix ajudam a acelerar a chegada às 100 ferramentas.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* Botão Principal: Abrir Modal */}
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-2.5 text-sm font-semibold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Abrir modal para apoiar o projeto com doação Pix"
          >
            <Heart className="h-4 w-4 fill-white" aria-hidden="true" />
            <span>Apoiar com Pix</span>
          </button>

          {/* Botão Secundário: Copiar Chave */}
          <button
            onClick={handleCopyPix}
            type="button"
            className="min-h-[44px] inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-all shadow-2xs font-mono cursor-pointer"
            aria-label="Copiar chave Pix pix@criegratis.com.br"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                <span className="text-emerald-600 dark:text-emerald-400">Chave Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8]" aria-hidden="true" />
                <span>pix@criegratis.com.br</span>
              </>
            )}
          </button>
        </div>
      </div>

      <SupportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Apoie o Projeto CrieGrátis"
      />
    </>
  );
}
