"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ToolCard from "./ToolCard";
import { ToolInfo } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";

interface HomeToolFilterProps {
  tools: ToolInfo[];
}

export default function HomeToolFilter({ tools }: HomeToolFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const filteredTools = useMemo(() => {
    if (selectedCategory === "todas") {
      // Ordena populares primeiro
      return [...tools].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    return tools.filter((tool) => tool.category === selectedCategory);
  }, [tools, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Barra de Abas de Categoria com Scroll Horizontal em Telas Pequenas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <button
          type="button"
          onClick={() => setSelectedCategory("todas")}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
            selectedCategory === "todas"
              ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
              : "bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#CBD5E1] dark:hover:border-[#475569]"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Todas</span>
          <span
            className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === "todas"
                ? "bg-white/20 text-white"
                : "bg-slate-100 dark:bg-[#0F172A] text-slate-500"
            }`}
          >
            {tools.length}
          </span>
        </button>

        {CATEGORIES.map((cat) => {
          const count = tools.filter((t) => t.category === cat.slug).length;
          const isSelected = selectedCategory === cat.slug;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
                  : "bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#CBD5E1] dark:hover:border-[#475569]"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-[#0F172A] text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Ferramentas */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* Rodapé da Seção com Link para Catálogo Completo */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2E8F0] dark:border-[#1E293B]">
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] text-center sm:text-left">
          Mostrando <span className="font-semibold text-[#0F172A] dark:text-white">{filteredTools.length}</span> de{" "}
          <span className="font-semibold text-[#0F172A] dark:text-white">{tools.length}</span> ferramentas disponíveis
        </p>
        <Link
          href="/ferramentas"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:text-[#1D4ED8] dark:hover:text-[#7DD3FC] hover:gap-2.5 transition-all"
        >
          Explorar catálogo completo de ferramentas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
