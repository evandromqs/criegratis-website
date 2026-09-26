import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";
import CategoryCard from "@/components/CategoryCard";
import ToolGrid from "@/components/ToolGrid";
import { ArrowRight } from "lucide-react";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Categorias de Ferramentas Gratuitas | Crie Grátis",
  description: "Navegue pelas ferramentas do Crie Grátis organizadas por categoria: Imagens, Texto, Calculadoras, Desenvolvedor e QR Code.",
  alternates: {
    canonical: `${SITE_URL}/categorias`,
  },
  openGraph: {
    title: "Categorias de Ferramentas Gratuitas | Crie Grátis",
    description: "Navegue pelas ferramentas do Crie Grátis organizadas por categoria: Imagens, Texto, Calculadoras, Desenvolvedor e QR Code.",
    url: `${SITE_URL}/categorias`,
  },
};

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header da Página */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Categorias de Ferramentas
          </h1>
          <p className="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Encontre exatamente o que você precisa selecionando uma das nossas categorias organizadas para o seu dia a dia.
          </p>
        </div>

        {/* Grid dos Cards de Categorias */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            return <CategoryCard key={cat.id} category={cat} toolCount={count} />;
          })}
        </section>

        {/* Seções Detalhadas por Categoria com Lista de Ferramentas */}
        <div className="space-y-12 pt-6">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.slug);
            return (
              <section
                key={cat.id}
                id={cat.slug}
                className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-[#334155] pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center rounded-xl ${cat.bgColor} dark:bg-opacity-20 ${cat.textColor} ${cat.borderColor} dark:border-opacity-30 border px-2.5 py-1 text-xs font-bold`}>
                        {cat.name}
                      </span>
                      <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                        {catTools.length} {catTools.length === 1 ? "ferramenta disponível" : "ferramentas disponíveis"}
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-1.5">
                      {cat.description}
                    </p>
                  </div>

                  <Link
                    href={`/ferramentas/${cat.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline shrink-0"
                  >
                    Ver página exclusiva de {cat.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <ToolGrid tools={catTools} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
