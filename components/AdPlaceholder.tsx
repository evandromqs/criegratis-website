"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>> & { loaded?: boolean };
  }
}

export const ADSENSE_CLIENT_ID = "ca-pub-4702187766740144";
export const DEFAULT_AD_SLOT = "7565796996";

interface AdPlaceholderProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

function AdUnit({
  slot,
  format,
}: {
  slot: string;
  format: "auto" | "rectangle" | "horizontal" | "vertical";
}) {
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const el = insRef.current;
    if (!el || el.dataset.adRequested === "1") return;
    el.dataset.adRequested = "1";

    try {
      const host = window.location.hostname;
      if (host === "localhost" || host === "127.0.0.1") {
        el.setAttribute("data-adtest", "on");
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignora erro caso bloqueador de anúncios esteja ativo no navegador do visitante
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle block w-full overflow-hidden text-center"
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

/**
 * Bloco responsivo de anúncio Google AdSense:
 * - Usa tag <ins> block com largura 100% para cálculo responsivo correto em desktop e mobile
 * - Isolado por rota (usePathname) para funcionar na navegação SPA do Next.js
 * - Oculta automaticamente o container inteiro caso o AdSense retorne data-ad-status="unfilled"
 */
export default function AdPlaceholder({
  slot = DEFAULT_AD_SLOT,
  format = "auto",
  className = "",
  label = "Publicidade",
}: AdPlaceholderProps) {
  const pathname = usePathname() || "/";

  return (
    <aside
      aria-label={label}
      className={`w-full overflow-hidden rounded-2xl border border-[#E2E8F0]/80 dark:border-[#334155]/80 bg-white/70 dark:bg-[#1E293B]/50 px-3 py-3 sm:px-4 sm:py-4 text-center has-[ins[data-ad-status='unfilled']]:hidden ${className}`}
    >
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8] dark:text-[#64748B] select-none">
        {label}
      </div>
      <div className="w-full">
        <AdUnit key={`${slot}-${pathname}`} slot={slot} format={format} />
      </div>
    </aside>
  );
}
