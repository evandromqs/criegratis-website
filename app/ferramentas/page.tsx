import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import ToolGrid from "@/components/ToolGrid";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Todas as Ferramentas Gratuitas | Crie Grátis",
  description: "Explore nosso catálogo completo de ferramentas gratuitas para imagens, calculadoras, edição de texto, utilitários para desenvolvedores e QR Code.",
  alternates: {
    canonical: `${SITE_URL}/ferramentas`,
  },
  openGraph: {
    title: "Todas as Ferramentas Gratuitas | Crie Grátis",
    description: "Explore nosso catálogo completo de ferramentas gratuitas para imagens, calculadoras, edição de texto, utilitários para desenvolvedores e QR Code.",
    url: `${SITE_URL}/ferramentas`,
  },
};

export default function AllToolsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header da Página */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Todas as Ferramentas Gratuitas
          </h1>
          <p className="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Pesquise ou navegue pelo nosso catálogo de ferramentas gratuitas que funcionam 100% no seu navegador.
          </p>
        </div>

        {/* Filtros por Categoria (Pílulas) */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-6">
          <Link
            href="/ferramentas"
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs"
          >
            Todas ({TOOLS.length})
          </Link>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            return (
              <Link
                key={cat.id}
                href={`/ferramentas/${cat.slug}`}
                className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] hover:border-[#CBD5E1] dark:hover:border-[#475569] transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-[#64748B] dark:text-[#94A3B8] font-normal ml-1">({count})</span>
              </Link>
            );
          })}
        </div>

        {/* Grid de Ferramentas */}
        <section>
          <ToolGrid tools={TOOLS} />
        </section>
      </div>
    </div>
  );
}
