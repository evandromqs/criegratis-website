"use client";

import React, { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import SupportModal from "./SupportModal";

export default function FooterPixButton() {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pixKey = "pix@criegratis.com.br";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="space-y-2.5 max-w-sm pt-1">
        {/* Ação 1 (Primária): Botão principal de destaque no tom azul da marca com coração sutil */}
        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 px-4 text-xs sm:text-sm font-bold shadow-sm shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer"
          aria-label="Abrir opções de apoio voluntário ao Crie Grátis"
        >
          <Heart className="h-4 w-4 fill-white/20 text-white" aria-hidden="true" />
          <span>Apoiar o Crie Grátis</span>
        </button>

        {/* Ação 2 (Rápida): Campo discreto de cópia direta da chave Pix */}
        <div className="flex items-center justify-between rounded-xl bg-[#020617]/70 border border-[#334155] p-1.5 pl-3 gap-2">
          <div className="flex items-center gap-2 min-w-0 text-xs">
            <span className="text-[#64748B] text-[11px] font-medium shrink-0">Chave:</span>
            <span className="font-mono text-xs text-[#38BDF8] truncate select-all">{pixKey}</span>
          </div>

          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-colors cursor-pointer shrink-0 border border-[#334155]/60 min-h-[32px]"
            aria-label="Copiar chave Pix de e-mail"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400 font-medium text-[11px]">Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#94A3B8]" aria-hidden="true" />
                <span className="text-[11px]">Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      <SupportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Apoie o Crie Grátis"
      />
    </>
  );
}
