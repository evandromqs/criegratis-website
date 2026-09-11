"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "criegratis-favorites";
const EVENT_NAME = "criegratis-favorites-updated";

let cachedRaw: string | null = null;
let cachedParsed: string[] = [];

function getFavoritesSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) {
      return cachedParsed;
    }
    cachedRaw = raw;
    cachedParsed = raw ? JSON.parse(raw) : [];
    return cachedParsed;
  } catch {
    return [];
  }
}

function subscribeFavorites(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    getFavoritesSnapshot,
    () => []
  );

  const toggleFavorite = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const current: string[] = stored ? JSON.parse(stored) : [];
      let updated: string[];

      if (current.includes(slug)) {
        updated = current.filter((s) => s !== slug);
      } else {
        updated = [...current, slug];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.error("Erro ao salvar favoritos no localStorage:", e);
    }
  }, []);

  const clearAllFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.error("Erro ao limpar favoritos:", e);
    }
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    isLoaded: true,
  };
}
