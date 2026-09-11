"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import SupportModal from "./SupportModal";

export default function SupportCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card Discreto de Apoio */}
      <div className="rounded-2xl border border-rose-100 dark:border-rose-950/40 bg-gradient-to-r from-rose-50/50 via-white to-pink-50/50 dark:from-rose-950/20 dark:via-[#1E293B] dark:to-pink-950/20 p-5 sm:p-6 text-center shadow-2xs">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
            <span>Gostou do Crie Grátis?</span>
            <span className="text-rose-500 animate-pulse" aria-hidden="true">❤️</span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Ajude a manter as ferramentas gratuitas, rápidas e sem anúncios abusivos para todos.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-150 cursor-pointer"
              aria-label="Abrir modal para apoiar o projeto com doação Pix"
            >
              <Heart className="h-4 w-4 fill-white" aria-hidden="true" />
              <span>Apoiar o projeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Padronizado de Apoio com Chave Pix */}
      <SupportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Apoie o Crie Grátis"
      />
    </>
  );
}
