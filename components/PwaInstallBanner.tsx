"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Smartphone, Download, X, Share2, PlusSquare } from "lucide-react";
import { usePwaUnlocked } from "@/hooks/usePwaUnlocked";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

function getIsStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as NavigatorWithStandalone;
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

function subscribeStandalone(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", callback);
  window.addEventListener("appinstalled", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("appinstalled", callback);
  };
}

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pwaUnlocked = usePwaUnlocked();

  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    () => false
  );

  useEffect(() => {
    // Registra o Service Worker para ativar os critérios PWA do Chromium / Android
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Exibe o banner somente após o primeiro download (quando pwaUnlocked = true)
    if (!pwaUnlocked) return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };

    const timer = setTimeout(() => {
      const dismissed = typeof window !== "undefined" && localStorage.getItem("criegratis-pwa-dismissed") === "true";
      if (!isStandalone && !dismissed) {
        setShowBanner(true);
      }
    }, 1500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [isStandalone, pwaUnlocked]);

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("criegratis-pwa-dismissed", "true");
    }
  };

  const handleInstallClick = async () => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      if (isIosDevice) {
        setShowIosModal(true);
        return;
      }
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        handleDismiss();
      }
      setDeferredPrompt(null);
    } else {
      setShowIosModal(true);
    }
  };

  if (!pwaUnlocked || isStandalone || isDismissed || !showBanner) return null;

  return (
    <>
      {/* Banner Centralizado no Cabeçalho após o 1º Download */}
      <aside
        aria-label="Aviso de Instalação do Aplicativo"
        className="fixed top-2.5 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-xl animate-in fade-in slide-in-from-top-3 duration-300 transition-all"
      >
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#2563EB]/30 dark:border-[#38BDF8]/30 bg-white/95 dark:bg-[#0F172A]/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white shadow-xs">
              <Smartphone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0F172A] dark:text-white truncate">
                Instalar app Crie Grátis
              </p>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate">
                Acesse mais rápido direto da tela inicial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#38BDF8] dark:hover:bg-[#0EA5E9] px-3 py-1.5 text-xs font-bold text-white dark:text-[#0F172A] shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Instalar</span>
            </button>
            <button
              onClick={handleDismiss}
              type="button"
              aria-label="Fechar aviso de instalação"
              title="Fechar"
              className="rounded-xl p-1.5 text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal Guia para iOS / Navegadores Manuais */}
      {showIosModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowIosModal(false);
          }}
        >
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white text-base">
                <Smartphone className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8]" />
                <span>Instalar Crie Grátis</span>
              </div>
              <button
                onClick={() => setShowIosModal(false)}
                className="rounded-full p-1 text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Adicione o Crie Grátis à tela de início do seu celular para acessar todas as ferramentas com 1 toque como um aplicativo:
            </p>

            <div className="space-y-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-xs font-medium text-[#0F172A] dark:text-white border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Toque no botão de <strong>Compartilhar</strong> <Share2 className="h-3.5 w-3.5 text-[#2563EB]" />
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white text-[11px] font-bold">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  Selecione <strong>Adicionar à Tela de Início</strong> <PlusSquare className="h-3.5 w-3.5 text-[#10B981]" />
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIosModal(false);
                handleDismiss();
              }}
              className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
