"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, CheckCircle2, Copy, CreditCard, Heart, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { STRIPE_DONATION_URL } from "@/hooks/useIsInternational";
import type { Locale } from "@/lib/i18n";

const PIX_KEY = "pix@criegratis.com.br";
const emptySubscribe = () => () => {};

const COPY: Record<Locale, {
  title: string;
  message: string;
  optional: string;
  pix: string;
  copied: string;
  card: string;
  close: string;
  closeLabel: string;
}> = {
  pt: {
    title: "Seu download foi iniciado",
    message: "Gostou do Crie Grátis? Seu apoio ajuda a manter as ferramentas ativas e gratuitas.",
    optional: "A contribuição é opcional. O arquivo já está sendo baixado.",
    pix: "Copiar chave Pix",
    copied: "Chave Pix copiada",
    card: "Apoiar com cartão",
    close: "Agora não",
    closeLabel: "Fechar aviso de download",
  },
  es: {
    title: "Tu descarga ha comenzado",
    message: "¿Te gustó Crie Grátis? Tu apoyo ayuda a mantener las herramientas disponibles y gratuitas.",
    optional: "La contribución es opcional. El archivo ya se está descargando.",
    pix: "Copiar clave Pix",
    copied: "Clave Pix copiada",
    card: "Apoyar con tarjeta",
    close: "Ahora no",
    closeLabel: "Cerrar aviso de descarga",
  },
  en: {
    title: "Your download has started",
    message: "Like Crie Grátis? Your support helps keep the tools available and free.",
    optional: "Support is optional. Your file is already downloading.",
    pix: "Copy Pix key",
    copied: "Pix key copied",
    card: "Support by card",
    close: "Not now",
    closeLabel: "Close download notice",
  },
};

export default function DownloadSuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { locale } = useLanguage();
  const copy = COPY[locale];
  const [copied, setCopied] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const close = () => {
    setCopied(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCopied(false);
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-slate-950/65 p-3 backdrop-blur-xs sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-success-title"
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className="download-success-card relative w-full max-w-sm max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:rounded-3xl sm:p-6">
        <button
          type="button"
          onClick={close}
          aria-label={copy.closeLabel}
          className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="download-success-icon mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 id="download-success-title" className="px-6 text-lg font-extrabold leading-tight text-slate-900 dark:text-white sm:text-xl">
          {copy.title}
        </h2>
        <p className="download-success-message mx-auto mt-2 max-w-xs text-sm leading-snug text-slate-600 dark:text-slate-300">
          {copy.message}
        </p>

        <div className="download-success-actions mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={copyPix}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? copy.copied : copy.pix}
          </button>
          <a
            href={STRIPE_DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            {copy.card}
          </a>
        </div>
        <p className="download-success-optional mt-3 text-[11px] leading-tight text-slate-500 dark:text-slate-400">{copy.optional}</p>
        <button
          type="button"
          onClick={close}
          className="download-success-dismiss mt-2 inline-flex min-h-10 items-center justify-center gap-1.5 px-3 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <Heart className="h-3.5 w-3.5" aria-hidden="true" />
          {copy.close}
        </button>
      </div>
    </div>,
    document.body,
  );
}
