"use client";

import React from "react";
import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  slug: string;
  variant?: "compact" | "full";
  className?: string;
}

export default function FavoriteButton({
  slug,
  variant = "compact",
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const active = isLoaded && isFavorite(slug);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className={`group/fav relative flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
          active
            ? "bg-amber-100 dark:bg-amber-950/80 text-amber-500 hover:bg-amber-200 dark:hover:bg-amber-900/60 shadow-2xs scale-105"
            : "text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        } ${className}`}
      >
        <Star
          className={`h-4 w-4 transition-transform duration-200 group-hover/fav:scale-110 ${
            active ? "fill-amber-400 text-amber-500" : ""
          }`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
        active
          ? "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400"
      } ${className}`}
    >
      <Star
        className={`h-3.5 w-3.5 transition-transform duration-200 ${
          active ? "fill-amber-400 text-amber-500 scale-110" : ""
        }`}
      />
      <span>{active ? "Favorita" : "Favoritar"}</span>
    </button>
  );
}
