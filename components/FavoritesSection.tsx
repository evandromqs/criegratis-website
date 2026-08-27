"use client";

import React from "react";
import { Star, Sparkles, Trash2, ArrowRight } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { TOOLS } from "@/lib/tools";
import ToolGrid from "./ToolGrid";

export default function FavoritesSection() {
  const { favorites, isLoaded, clearAllFavorites } = useFavorites();

  if (!isLoaded) {
    return null;
  }

  const favoriteTools = TOOLS.filter((tool) => favorites.includes(tool.slug));

  if (favoriteTools.length === 0) {
    return null;
  }

  return (
    <section id="favoritos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header da Seção de Favoritos */}
      <div className="rounded-3xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30 dark:from-amber-950/20 dark:via-slate-900/90 dark:to-slate-900 p-5 sm:p-7 shadow-xs mb-6 sm:mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 dark:border-amber-900/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                <Star className="h-4 w-4 fill-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Acesso Rápido • Favoritas</span>
                <span className="rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 px-2.5 py-0.5 text-xs font-bold">
                  {favoriteTools.length}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Suas ferramentas preferidas salvas no navegador para acesso com 1 clique.
            </p>
          </div>

          <button
            onClick={clearAllFavorites}
            className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shadow-2xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Limpar Favoritas</span>
          </button>
        </div>

        {/* Grid das Ferramentas Favoritas */}
        <div className="pt-2">
          <ToolGrid tools={favoriteTools} />
        </div>
      </div>
    </section>
  );
}
