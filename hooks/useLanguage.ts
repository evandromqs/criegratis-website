"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, TRANSLATIONS, TranslationDictionary } from "@/lib/i18n";

const LANG_STORAGE_KEY = "criegratis-lang";

function getSavedLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pt" || saved === "es" || saved === "en") {
      return saved;
    }
  } catch {
    // ignore
  }
  return "pt";
}

export function useLanguage() {
  const pathname = usePathname();
  const router = useRouter();

  // Verifica se a rota atual é explicitamente /es ou /en
  const getRouteLocale = (path: string): Locale | null => {
    if (path.startsWith("/es")) return "es";
    if (path.startsWith("/en")) return "en";
    return null;
  };

  const [locale, setLocaleState] = useState<Locale>(() => {
    const routeLoc = getRouteLocale(pathname);
    if (routeLoc) return routeLoc;
    return getSavedLocale();
  });

  useEffect(() => {
    const routeLoc = getRouteLocale(pathname);
    if (routeLoc) {
      setLocaleState(routeLoc);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, routeLoc);
        document.cookie = `criegratis-lang=${routeLoc}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {
        // ignore
      }
    } else {
      // Se estiver em outra página (ex: /ferramentas, /blog, /criar-qr-code),
      // mantém e sincroniza o idioma salvo previamente sem resetar para português!
      const saved = getSavedLocale();
      if (saved && saved !== locale) {
        setLocaleState(saved);
      }
    }
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLocale);
      document.cookie = `criegratis-lang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }

    // Atualiza o cookie padrão de tradução do Google (googtrans: /origem/destino)
    try {
      if (newLocale === "pt") {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      } else {
        document.cookie = `googtrans=/pt/${newLocale}; path=/;`;
        document.cookie = `googtrans=/pt/${newLocale}; path=/; domain=.${window.location.hostname};`;
      }
    } catch {
      // ignore
    }

    // Se estiver na Home de algum idioma e trocar, redireciona para a Home correspondente
    if (pathname === "/" || pathname === "/es" || pathname === "/en") {
      if (newLocale === "pt") {
        router.push("/");
      } else if (newLocale === "es") {
        router.push("/es");
      } else if (newLocale === "en") {
        router.push("/en");
      }
    } else {
      // Se estiver em uma ferramenta (/criar-qr-code, /comprimir-imagem, etc), recarrega para aplicar a tradução instantânea em todos os elementos da página
      window.location.reload();
    }
  };

  return {
    locale,
    setLocale,
    t: TRANSLATIONS[locale],
  };
}
