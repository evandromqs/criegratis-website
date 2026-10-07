"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Heart, Copy, Check, X, QrCode as QrIcon, ShieldCheck, CreditCard, ExternalLink, Globe } from "lucide-react";
import { useIsInternational, STRIPE_DONATION_URL } from "@/hooks/useIsInternational";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultMethod?: "pix" | "stripe";
}

interface DonationTier {
  id: "cafe" | "lanche" | "servidores" | "outro";
  label: string;
  subLabel: string;
  badge?: string;
  icon: string;
  valueText: string;
  phrase: string;
  pixPayload: string;
  isEmailKey?: boolean;
}

const DONATION_TIERS: DonationTier[] = [
  {
    id: "cafe",
    label: "Pagar um café",
    subLabel: "Café",
    icon: "☕",
    valueText: "R$ 5",
    phrase: "A energia necessária para transformar mais ideias em ferramentas gratuitas.",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d694652040000530398654045.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO61080540900062250521TqzXesWSjVEK07m101uzm63045C3F",
  },
  {
    id: "lanche",
    label: "Pagar um lanche",
    subLabel: "Lanche",
    badge: "TOP",
    icon: "🍕",
    valueText: "R$ 15",
    phrase: "O combustível oficial da comunidade: pizza, foco e código livre para todo mundo!",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d6946520400005303986540515.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO61080540900062250521FaNctkuao8s1rfx101uzm6304AA4B",
  },
  {
    id: "servidores",
    label: "Apoiar servidores",
    subLabel: "Servidores",
    icon: "🚀",
    valueText: "R$ 30",
    phrase: "Contribuição de quem realmente acredita em uma internet aberta, rápida e sem pegadinhas.",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d6946520400005303986540530.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO6108054090006225052180mbhpBwS5wZybp101uzm6304129D",
  },
  {
    id: "outro",
    label: "Outro valor livre",
    subLabel: "Livre",
    icon: "✨",
    valueText: "Outro",
    phrase: "Contribua com qualquer quantia diretamente via chave de e-mail no aplicativo do seu banco.",
    pixPayload: "pix@criegratis.com.br",
    isEmailKey: true,
  },
];

const emptySubscribe = () => () => {};

export default function SupportModal({
  isOpen,
  onClose,
  title = "Apoie o Crie Grátis",
  defaultMethod,
}: SupportModalProps) {
  const { isInternational } = useIsInternational();
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "stripe">("pix");
  const [selectedTierId, setSelectedTierId] = useState<"cafe" | "lanche" | "servidores" | "outro">("lanche");
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQr, setShowQr] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Define automaticamente o método inicial: se passado explicitamente ou se for acesso internacional
  useEffect(() => {
    if (defaultMethod) {
      setSelectedMethod(defaultMethod);
    } else if (isInternational) {
      setSelectedMethod("stripe");
    }
  }, [defaultMethod, isInternational]);

  const currentTier = DONATION_TIERS.find((t) => t.id === selectedTierId) || DONATION_TIERS[1];

  // Gera o QR Code Pix sob demanda sempre que o payload ativo mudar
  useEffect(() => {
    if (isOpen && selectedMethod === "pix" && currentTier.pixPayload) {
      QRCode.toDataURL(currentTier.pixPayload, {
        width: 240,
        margin: 1,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [isOpen, selectedMethod, currentTier.pixPayload]);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 dark:bg-black/85 backdrop-blur-xs w-screen max-w-full h-screen h-[100dvh] animate-in fade-in duration-150 overflow-y-auto scrollbar-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="support-modal-title"
    >
      <div className="relative w-full max-w-md sm:max-w-[500px] my-auto flex flex-col rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Botão de Fechar com Touch-Target Acessível */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar modal de apoio"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Conteúdo Principal do Modal */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Cabeçalho */}
          <div className="text-center space-y-1.5 pt-1 pr-6 pl-6 sm:pr-8 sm:pl-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 border border-rose-100 dark:border-rose-900/50 mb-0.5 shadow-2xs">
              <Heart className="h-5 w-5 fill-rose-500" aria-hidden="true" />
            </div>
            <h2
              id="support-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white tracking-tight"
            >
              {title}
            </h2>
            <p className="text-sm font-medium text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-sm mx-auto">
              100% gratuito e livre de anúncios. Ajude a manter os servidores ativos:
            </p>
          </div>

          {/* Seletor de Método de Doação: Pix vs Stripe (Cartão / Internacional) */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-[#334155]">
            <button
              type="button"
              onClick={() => {
                setSelectedMethod("pix");
                setCopied(false);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedMethod === "pix"
                  ? "bg-white dark:bg-[#1E293B] text-[#2563EB] dark:text-[#38BDF8] shadow-xs"
                  : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              }`}
              aria-pressed={selectedMethod === "pix"}
            >
              <span aria-hidden="true">🇧🇷</span>
              <span>Pix (Brasil)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedMethod("stripe");
                setCopied(false);
              }}
              className={`relative flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                selectedMethod === "stripe"
                  ? "bg-white dark:bg-[#1E293B] text-[#635BFF] dark:text-[#a5b4fc] shadow-xs"
                  : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white"
              }`}
              aria-pressed={selectedMethod === "stripe"}
            >
              <CreditCard className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Cartão / Stripe</span>
              {isInternational && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" title="Sugerido para sua região">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              )}
            </button>
          </div>

          {/* Visualização 1: STRIPE (Cartão de Crédito / Doação Internacional) */}
          {selectedMethod === "stripe" && (
            <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/20 dark:from-indigo-950/20 dark:via-[#0F172A] dark:to-indigo-950/10 p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-150">
              {/* Badge & Título */}
              <div className="text-center space-y-1.5 border-b border-[#E2E8F0] dark:border-[#334155]/80 pb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold text-[#635BFF] dark:text-[#a5b4fc]">
                  <Globe className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>Aceito no Brasil e no Exterior</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
                  Doação Segura via Stripe
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                  Pague com Cartão de Crédito (Visa, Mastercard, Elo, Amex), Apple Pay ou Google Pay.
                </p>
              </div>

              {/* Informação do Valor Base & Flexibilidade */}
              <div className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] p-3 sm:p-3.5 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#475569] dark:text-[#94A3B8] font-bold">Valor pré-definido:</span>
                  <span className="font-extrabold text-[#635BFF] dark:text-[#a5b4fc] bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-900/60 px-2.5 py-0.5 rounded-lg">
                    R$ 5,00
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  ✨ <strong>Valor personalizável:</strong> você pode manter R$ 5 ou alterar livremente para qualquer quantia na tela de checkout da Stripe.
                </p>
              </div>

              {/* Botão Principal de Ação Stripe */}
              <div className="pt-1 space-y-2">
                <a
                  href={STRIPE_DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#635BFF] hover:bg-[#5349e4] active:scale-[0.99] px-4 py-3 text-sm sm:text-base font-extrabold text-white transition-all cursor-pointer shadow-sm shadow-indigo-500/25"
                >
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  <span>Doar com Cartão no Stripe</span>
                  <ExternalLink className="h-4 w-4 ml-0.5 opacity-80" aria-hidden="true" />
                </a>

                <p className="text-[11px] text-center font-medium text-[#64748B] dark:text-[#94A3B8]">
                  Você será redirecionado para a página oficial e protegida do Stripe.
                </p>
              </div>
            </div>
          )}

          {/* Visualização 2: PIX (Para o público brasileiro) */}
          {selectedMethod === "pix" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Grid de 4 Valores Simétricos em 1 Linha */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setCopied(false);
                        setShowQr(false);
                      }}
                      className={`relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border text-center transition-all cursor-pointer min-h-[72px] sm:min-h-[78px] ${
                        isSelected
                          ? "border-[#2563EB] dark:border-[#38BDF8] bg-blue-50/80 dark:bg-blue-950/50 shadow-xs ring-2 ring-[#2563EB]/20 dark:ring-[#38BDF8]/20 scale-[1.02]"
                          : "border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/70 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-[#1E293B]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {tier.badge && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 text-white px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider shadow-2xs whitespace-nowrap">
                          {tier.badge}
                        </span>
                      )}
                      <span className="text-base sm:text-lg mb-0.5" aria-hidden="true">
                        {tier.icon}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-extrabold leading-tight ${
                          isSelected
                            ? "text-[#2563EB] dark:text-[#38BDF8]"
                            : "text-[#0F172A] dark:text-white"
                        }`}
                      >
                        {tier.valueText}
                      </span>
                      <span className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] leading-tight truncate w-full mt-0.5">
                        {tier.subLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Box de Detalhes do Pagamento Pix */}
              <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 sm:p-5 space-y-3.5">
                {/* Título Limpo */}
                <div className="text-center border-b border-[#E2E8F0] dark:border-[#334155]/80 pb-2.5">
                  <div className="inline-flex items-center gap-1.5 text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
                    <span aria-hidden="true">{currentTier.icon}</span>
                    <span>{currentTier.label}</span>
                    <span className="text-[#2563EB] dark:text-[#38BDF8]">({currentTier.valueText})</span>
                  </div>
                </div>

                {/* Frase Simpática */}
                <p className="text-xs sm:text-sm font-medium italic text-center leading-relaxed text-[#475569] dark:text-[#94A3B8] px-1">
                  &ldquo;{currentTier.phrase}&rdquo;
                </p>

                {/* Campo Discreto do Código Pix */}
                <div className="flex items-center justify-between rounded-xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] p-2 pl-3 gap-2">
                  <div className="flex-1 font-mono text-xs sm:text-sm font-bold text-[#2563EB] dark:text-[#38BDF8] truncate select-all">
                    {currentTier.pixPayload}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentTier.pixPayload)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#38BDF8] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-[#0F172A] transition-colors cursor-pointer"
                    aria-label="Copiar código Pix"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Ações: Copiar Código + Alternar QR Code */}
                <div className="space-y-2 pt-0.5">
                  <button
                    onClick={() => handleCopy(currentTier.pixPayload)}
                    type="button"
                    className="w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] px-4 py-3 text-sm sm:text-base font-extrabold text-white transition-all cursor-pointer shadow-sm shadow-blue-500/20"
                    aria-live="polite"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                        <span>{currentTier.isEmailKey ? "Chave E-mail Copiada!" : "Código Pix Copiado com Sucesso!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5" aria-hidden="true" />
                        <span>{currentTier.isEmailKey ? "Copiar Chave Pix E-mail" : `Copiar Código Pix (${currentTier.valueText})`}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowQr((prev) => !prev)}
                    type="button"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-[#0F172A] hover:border-[#2563EB] dark:hover:border-[#38BDF8] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white transition-all cursor-pointer shadow-2xs"
                    aria-expanded={showQr}
                  >
                    <QrIcon className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8]" aria-hidden="true" />
                    <span>{showQr ? "Ocultar QR Code" : `Pagar via QR Code Pix (${currentTier.valueText})`}</span>
                  </button>
                </div>

                {/* Visualizador do QR Code quando acionado */}
                {showQr && (
                  <div className="flex flex-col items-center justify-center space-y-2.5 pt-2 pb-1 animate-in fade-in zoom-in-95 duration-150">
                    {qrDataUrl ? (
                      <div className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrDataUrl}
                          alt={`QR Code Pix para doação de ${currentTier.valueText}`}
                          className="h-44 w-44 sm:h-48 sm:w-48 rounded-xl object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-44 w-44 flex items-center justify-center text-xs font-bold text-[#64748B]">
                        Gerando QR Code...
                      </div>
                    )}
                    <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8] text-center max-w-xs leading-relaxed">
                      Abra o aplicativo do seu banco e aponte a câmera para pagar {currentTier.valueText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rodapé do Modal */}
          <div className="flex items-center justify-center gap-2 text-center text-xs font-medium text-[#64748B] dark:text-[#94A3B8] pt-1">
            <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" aria-hidden="true" />
            <span>
              {selectedMethod === "stripe"
                ? "Processado com segurança pelo Stripe • Muito obrigado! ❤️"
                : "Processado pelo Banco Central • Obrigado pelo carinho! ❤️"}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
