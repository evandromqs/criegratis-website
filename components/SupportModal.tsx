"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Heart, Copy, Check, X, QrCode as QrIcon } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const emptySubscribe = () => () => {};

export default function SupportModal({
  isOpen,
  onClose,
  title = "Apoie o Crie Grátis",
}: SupportModalProps) {
  const [copied, setCopied] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQr, setShowQr] = useState(false);
  const pixKey = "pix@criegratis.com.br";

  // Gera o QR Code Pix em DataURL
  useEffect(() => {
    if (isOpen && !qrDataUrl) {
      QRCode.toDataURL(pixKey, {
        width: 280,
        margin: 1,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [isOpen, qrDataUrl, pixKey]);

  // Bloqueia o scroll de fundo do body ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 dark:bg-black/85 backdrop-blur-xs overflow-y-auto w-screen max-w-full h-screen h-[100dvh] animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="support-modal-title"
    >
      <div className="relative w-full max-w-md sm:max-w-lg my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] flex flex-col rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-2xl overflow-hidden">
        {/* Botão de Fechar com Touch-Target Acessível (44x44px) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <button
            onClick={onClose}
            type="button"
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar modal de doação Pix"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Conteúdo com Scroll interno resiliente para mobile */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5">
          {/* Cabeçalho do Modal */}
          <div className="text-center space-y-2 pt-2 sm:pt-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 border border-rose-100 dark:border-rose-900/50 mb-1 shadow-2xs">
              <Heart className="h-6 w-6 fill-rose-500" aria-hidden="true" />
            </div>
            <h2
              id="support-modal-title"
              className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight"
            >
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-sm mx-auto">
              O Crie Grátis é e sempre será <strong>gratuito para todos</strong>. Se alguma ferramenta te ajudou, você pode contribuir voluntariamente com qualquer valor para ajudar nos custos de infraestrutura e desenvolvimento contínuo.
            </p>
          </div>

          {/* Card Central da Chave Pix */}
          <div className="space-y-3 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 sm:p-5 text-center">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                Chave Pix (E-mail)
              </span>

              {/* Alternar QR Code */}
              <button
                type="button"
                onClick={() => setShowQr((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline cursor-pointer min-h-[32px] px-1"
                aria-label={showQr ? "Ocultar QR Code Pix" : "Exibir QR Code Pix"}
              >
                <QrIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{showQr ? "Ocultar QR Code" : "Ver QR Code"}</span>
              </button>
            </div>

            {/* QR Code opcional para escanear */}
            {showQr && qrDataUrl && (
              <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] animate-in fade-in zoom-in-95 duration-150">
                <img
                  src={qrDataUrl}
                  alt="QR Code Pix para doação voluntária"
                  className="h-44 w-44 rounded-lg object-contain shadow-2xs"
                />
                <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] mt-2">
                  Abra o app do seu banco e escaneie o código acima
                </p>
              </div>
            )}

            {/* Chave Pix destacada */}
            <div className="flex items-center justify-center font-mono text-sm sm:text-base font-bold text-[#2563EB] dark:text-[#38BDF8] select-all break-all bg-white dark:bg-[#1E293B] py-2.5 px-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
              {pixKey}
            </div>

            {/* Botão de Copiar com Touch-Target Confortável (min-h-[44px]) */}
            <button
              onClick={handleCopyPix}
              type="button"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] px-4 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-xs"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  <span>Chave Pix Copiada com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>Copiar Chave Pix</span>
                </>
              )}
            </button>
          </div>

          {/* Garantia de Privacidade e Agradecimento */}
          <div className="text-center space-y-1">
            <p className="text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
              Plataforma mantida 100% livre de publicidade invasiva.
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
              Qualquer quantia faz uma enorme diferença. Muito obrigado! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
