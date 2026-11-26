"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "criegratis-cookie-consent";
const CONSENT_EVENT = "criegratis-cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(CONSENT_KEY) === null;
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function CookieConsentBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleChoice = (choice: "all" | "essential") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // Ignore storage access errors
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md p-4 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
          <Cookie className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8] shrink-0 mt-0.5" />
          <p>
            Utilizamos cookies essenciais, de análise e de publicidade (Google AdSense) para melhorar sua experiência e manter nossas ferramentas gratuitas. Saiba mais em nossa{" "}
            <Link href="/privacidade" className="font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => handleChoice("essential")}
            className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] px-3 py-2 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            Apenas essenciais
          </button>
          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer shadow-xs"
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
