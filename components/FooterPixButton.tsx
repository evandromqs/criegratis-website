"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode } from "lucide-react";
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
      <div className="rounded-2xl border border-[#334155] bg-[#020617]/70 p-3.5 space-y-2.5 max-w-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#94A3B8] font-medium">Chave Pix:</span>
          <span className="font-mono font-bold text-[#38BDF8] select-all">{pixKey}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Botão Copiar */}
          <button
            onClick={handleCopy}
            type="button"
            className="min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl bg-[#1E293B] hover:bg-[#2563EB] text-white py-2.5 px-3 text-xs font-semibold border border-[#334155] hover:border-[#2563EB] transition-all duration-150 cursor-pointer shadow-xs"
            aria-label="Copiar chave Pix do projeto"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>Copiada!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                <span>Copiar Pix</span>
              </>
            )}
          </button>

          {/* Botão Ver Modal / QR Code */}
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white py-2.5 px-3 text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs"
            aria-label="Abrir modal com QR Code e detalhes para apoiar o Crie Grátis"
          >
            <QrCode className="h-4 w-4" aria-hidden="true" />
            <span>QR Code</span>
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
