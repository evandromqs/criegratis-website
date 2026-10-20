"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

export const STRIPE_DONATION_URL = "https://donate.stripe.com/eVq4gz6YG3f51tU9wB1kA01";

const BRAZILIAN_TIMEZONES = [
  "America/Sao_Paulo",
  "America/Fortaleza",
  "America/Belem",
  "America/Manaus",
  "America/Recife",
  "America/Cuiaba",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Campo_Grande",
  "America/Rio_Branco",
  "America/Noronha",
  "America/Maceio",
  "America/Bahia",
  "America/Araguaina",
  "America/Santarem",
  "America/Eirunepe",
];
const noSubscribe = () => () => {};

export function checkBrowserIsInternational(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && !BRAZILIAN_TIMEZONES.includes(tz)) {
      return true;
    }
  } catch {
    // fallback se Intl falhar
  }
  return false;
}

export function useIsInternational() {
  const browserInternational = useSyncExternalStore(noSubscribe, checkBrowserIsInternational, () => false);
  const isLoaded = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [remoteInternational, setRemoteInternational] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Verificação instantânea local por Timezone do navegador
    // Confirmação via IP pelo cabeçalho da Vercel (/api/geo)
    fetch("/api/geo")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na rota geo");
        return res.json();
      })
      .then((data) => {
        if (typeof data.isInternational === "boolean") {
          setRemoteInternational(data.isInternational);
        }
      })
      .catch(() => {
        // Mantém a detecção do navegador como fallback silencioso
      });
  }, []);

  return {
    isInternational: remoteInternational ?? browserInternational,
    isLoaded,
    stripeUrl: STRIPE_DONATION_URL,
  };
}
