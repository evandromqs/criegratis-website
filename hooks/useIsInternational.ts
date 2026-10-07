"use client";

import { useState, useEffect } from "react";

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
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 1. Verificação instantânea local por Timezone do navegador
    const browserSaysInternational = checkBrowserIsInternational();
    setIsInternational(browserSaysInternational);
    setIsLoaded(true);

    // 2. Confirmação precisa via IP pelo cabeçalho da Vercel (/api/geo)
    fetch("/api/geo")
      .then((res) => {
        if (!res.ok) throw new Error("Erro na rota geo");
        return res.json();
      })
      .then((data) => {
        if (typeof data.isInternational === "boolean") {
          setIsInternational(data.isInternational);
        }
      })
      .catch(() => {
        // Mantém a detecção do navegador como fallback silencioso
      });
  }, []);

  return {
    isInternational,
    isLoaded,
    stripeUrl: STRIPE_DONATION_URL,
  };
}
