"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Heart, Copy, Check, X, QrCode as QrIcon, Sparkles } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

interface DonationTier {
  id: "cafe" | "lanche" | "servidores" | "outro";
  label: string;
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
    label: "Pagar um cafézinho",
    icon: "☕",
    valueText: "R$ 5",
    phrase: "A energia necessária para transformar mais ideias em ferramentas gratuitas.",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d694652040000530398654045.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO61080540900062250521TqzXesWSjVEK07m101uzm63045C3F",
  },
  {
    id: "lanche",
    label: "Pagar um lanche",
    badge: "Mais Escolhido",
    icon: "🍕",
    valueText: "R$ 15",
    phrase: "O combustível oficial da comunidade: pizza, foco e código livre para todo mundo!",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d6946520400005303986540515.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO61080540900062250521FaNctkuao8s1rfx101uzm6304AA4B",
  },
  {
    id: "servidores",
    label: "Apoiar servidores & Novas Ferramentas",
    icon: "🚀",
    valueText: "R$ 30",
    phrase: "Contribuição de quem realmente acredita em uma internet mais aberta, rápida e sem pegadinhas.",
    pixPayload:
      "00020126580014BR.GOV.BCB.PIX0136ef2848a5-ffbc-46ac-9bb1-5187d61d6946520400005303986540530.005802BR592548.434.238 EVANDRO MARQUE6009SAO PAULO6108054090006225052180mbhpBwS5wZybp101uzm6304129D",
  },
  {
    id: "outro",
    label: "Outro valor livre",
    icon: "✨",
    valueText: "Outro Valor",
    phrase: "Contribua com qualquer quantia diretamente via chave Pix de e-mail no aplicativo do seu banco.",
    pixPayload: "pix@criegratis.com.br",
    isEmailKey: true,
  },
];

const emptySubscribe = () => () => {};

export default function SupportModal({
  isOpen,
  onClose,
  title = "Apoie o Crie Grátis",
}: SupportModalProps) {
  const [selectedTierId, setSelectedTierId] = useState<"cafe" | "lanche" | "servidores" | "outro">("lanche");
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQr, setShowQr] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const currentTier = DONATION_TIERS.find((t) => t.id === selectedTierId) || DONATION_TIERS[1];

  // Gera o QR Code Pix sob demanda sempre que o payload ativo mudar
  useEffect(() => {
    if (isOpen && currentTier.pixPayload) {
      QRCode.toDataURL(currentTier.pixPayload, {
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
  }, [isOpen, currentTier.pixPayload]);

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
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Cabeçalho do Modal */}
          <div className="text-center space-y-1.5 pt-1">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 border border-rose-100 dark:border-rose-900/50 mb-0.5 shadow-2xs">
              <Heart className="h-5 w-5 fill-rose-500" aria-hidden="true" />
            </div>
            <h2
              id="support-modal-title"
              className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight"
            >
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-sm mx-auto">
              O Crie Grátis é 100% gratuito e livre de anúncios. Escolha um valor para apoiar a infraestrutura e acelerar novas ferramentas:
            </p>
          </div>

          {/* Seletor dos 3 Valores Prontos + Outro Valor */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {DONATION_TIERS.slice(0, 3).map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTierId(tier.id);
                      setCopied(false);
                    }}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3 border text-center transition-all cursor-pointer min-h-[72px] ${
                      isSelected
                        ? "border-[#2563EB] dark:border-[#38BDF8] bg-blue-50/80 dark:bg-blue-950/50 shadow-xs ring-2 ring-[#2563EB]/20 dark:ring-[#38BDF8]/20 scale-[1.02]"
                        : "border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/70 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-[#1E293B]"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {tier.badge && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 text-white px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider shadow-2xs whitespace-nowrap">
                        {tier.badge}
                      </span>
                    )}
                    <span className="text-base sm:text-lg mb-0.5" aria-hidden="true">
                      {tier.icon}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-black ${
                        isSelected
                          ? "text-[#2563EB] dark:text-[#38BDF8]"
                          : "text-[#0F172A] dark:text-white"
                      }`}
                    >
                      {tier.valueText}
                    </span>
                    <span className="text-[10px] text-[#475569] dark:text-[#94A3B8] font-medium leading-tight truncate max-w-full">
                      {tier.label.replace("Pagar um ", "").replace("Apoiar ", "")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Opção 4: Outro Valor */}
            <button
              type="button"
              onClick={() => {
                setSelectedTierId("outro");
                setCopied(false);
              }}
              className={`w-full flex items-center justify-between rounded-xl px-3 py-2 border text-xs font-semibold transition-all cursor-pointer ${
                selectedTierId === "outro"
                  ? "border-[#2563EB] dark:border-[#38BDF8] bg-blue-50/80 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] ring-1 ring-[#2563EB]/30"
                  : "border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/60 text-[#475569] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-[#1E293B]"
              }`}
              aria-pressed={selectedTierId === "outro"}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                <span>Deseja apoiar com qualquer outro valor?</span>
              </div>
              <span className="font-bold underline text-[11px]">Chave E-mail</span>
            </button>
          </div>

          {/* Card Detalhado do Valor Selecionado */}
          <div className="space-y-3 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 sm:p-5">
            {/* Título e Frase Simpática */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                <span aria-hidden="true">{currentTier.icon}</span>
                <span>{currentTier.label} ({currentTier.valueText})</span>
              </div>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] italic leading-relaxed">
                &ldquo;{currentTier.phrase}&rdquo;
              </p>
            </div>

            {/* QR Code opcional para escanear */}
            {showQr && qrDataUrl && (
              <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] animate-in fade-in zoom-in-95 duration-150 shadow-xs">
                <img
                  src={qrDataUrl}
                  alt={`QR Code Pix para doação de ${currentTier.valueText}`}
                  className="h-44 w-44 rounded-xl object-contain"
                />
                <p className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8] mt-2 text-center">
                  Abra o app do seu banco e escaneie o código Pix de {currentTier.valueText}
                </p>
              </div>
            )}

            {/* Prévia do Código ou Chave */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] dark:text-[#94A3B8]">
                <span>{currentTier.isEmailKey ? "Chave Pix (E-mail):" : "Código Pix Copia e Cola:"}</span>
                <button
                  type="button"
                  onClick={() => setShowQr((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[#2563EB] dark:text-[#38BDF8] hover:underline cursor-pointer min-h-[28px] px-1"
                  aria-label={showQr ? "Ocultar QR Code" : "Ver QR Code para escanear"}
                >
                  <QrIcon className="h-3 w-3" aria-hidden="true" />
                  <span>{showQr ? "Ocultar QR Code" : "Ver QR Code"}</span>
                </button>
              </div>

              <div className="font-mono text-xs text-[#2563EB] dark:text-[#38BDF8] bg-white dark:bg-[#1E293B] p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] select-all break-all max-h-16 overflow-y-auto leading-relaxed">
                {currentTier.pixPayload}
              </div>
            </div>

            {/* Botão de Cópia Principal (Touch-Target >= 44px) */}
            <button
              onClick={() => handleCopy(currentTier.pixPayload)}
              type="button"
              className="w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] px-4 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-xs"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  <span>{currentTier.isEmailKey ? "Chave E-mail Copiada!" : "Código Pix Copiado com Sucesso!"}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>{currentTier.isEmailKey ? "Copiar Chave Pix E-mail" : `Copiar Código Pix (${currentTier.valueText})`}</span>
                </>
              )}
            </button>
          </div>

          {/* Rodapé do Modal */}
          <div className="text-center space-y-1 pt-1">
            <p className="text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
              Pagamento processado 100% no seu banco com segurança pelo Banco Central do Brasil.
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
              Muito obrigado pelo carinho e por apoiar o Crie Grátis! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
