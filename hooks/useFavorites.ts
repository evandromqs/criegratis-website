"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "criegratis-favorites";
const EVENT_NAME = "criegratis-favorites-updated";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.warn("Erro ao carregar favoritos do localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(EVENT_NAME, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(EVENT_NAME, handleStorageChange);
    };
  }, [loadFavorites]);

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
      setFavorites(updated);
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (e) {
      console.error("Erro ao salvar favoritos no localStorage:", e);
    }
  }, []);

  const clearAllFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFavorites([]);
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
    isLoaded,
  };
}
