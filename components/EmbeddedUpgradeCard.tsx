"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Lock } from "lucide-react";

interface EmbeddedUpgradeCardProps {
  toolSlug: string;
  title: string;
  description: string;
  priceLabel: string;
  priceCents: number;
  benefits: string[];
  onBeforeCheckout?: () => void;
  onUnlocked: (sessionId: string) => void;
}

export default function EmbeddedUpgradeCard({
  toolSlug,
  title,
  description,
  priceLabel,
  priceCents,
  benefits,
  onBeforeCheckout,
  onUnlocked,
}: EmbeddedUpgradeCardProps) {
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setUnlocked(true);
          onUnlocked(sessionId);
        }
      })
      .catch(() => {});
  }, [onUnlocked]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      onBeforeCheckout?.();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug,
          title,
          priceCents,
          returnPath: window.location.pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Não foi possível iniciar o pagamento.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Erro de conexão ao iniciar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/30 dark:border-emerald-800 p-5 flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
        <div className="text-sm font-medium">
          Versão Premium desbloqueada! Seu arquivo aprimorado está pronto.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200/90 dark:border-amber-800/60 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Upgrade Opcional</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-black text-slate-900 dark:text-white">{priceLabel}</span>
          <p className="text-[11px] text-slate-500">pagamento único</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-white font-semibold py-3 px-5 text-sm transition cursor-pointer disabled:opacity-60"
      >
        <Lock className="h-4 w-4" />
        <span>{loading ? "Redirecionando para o Stripe..." : `Desbloquear por ${priceLabel}`}</span>
      </button>
    </div>
  );
}
