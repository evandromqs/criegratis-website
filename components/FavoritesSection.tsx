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
      <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:p-7 shadow-sm mb-6 sm:mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-[#334155] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
                <Star className="h-5 w-5 fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>Acesso Rápido • Favoritas</span>
                <span className="rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 px-2.5 py-0.5 text-xs font-bold">
                  {favoriteTools.length}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
              Suas ferramentas preferidas salvas no navegador para acesso com 1 clique.
            </p>
          </div>

          <button
            onClick={clearAllFavorites}
            className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0F172A] px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shadow-2xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Limpar Favoritas</span>
          </button>
        </div>

        {/* Grid das Ferramentas Favoritas */}
        <div className="pt-1">
          <ToolGrid tools={favoriteTools} />
        </div>
      </div>
    </section>
  );
}
