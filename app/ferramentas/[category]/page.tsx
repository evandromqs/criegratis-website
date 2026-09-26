import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools";
import ToolGrid from "@/components/ToolGrid";
import { Image, Type, Calculator, Code2, QrCode } from "lucide-react";

import { SITE_URL, SITE_NAME } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const ICON_MAP = {
  Image,
  Type,
  Calculator,
  Code2,
  QrCode,
};

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === catSlug);
  if (!cat) return {};

  const pageUrl = `${SITE_URL}/ferramentas/${cat.slug}`;
  const title = `Ferramentas de ${cat.name} Gratuitas | Crie Grátis`;

  return {
    title,
    description: cat.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: cat.description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === catSlug);

  if (!cat) {
    notFound();
  }

  const IconComponent = ICON_MAP[cat.iconName] || Image;
  const tools = getToolsByCategory(cat.slug);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header da Categoria */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${cat.bgColor} dark:bg-opacity-20 ${cat.textColor} ${cat.borderColor} dark:border-opacity-30 border mb-2 shadow-2xs`}>
            <IconComponent className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Ferramentas de {cat.name}
          </h1>
          <p className="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {cat.description}
          </p>
        </div>

        {/* Navegação entre categorias (Pílulas) */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-6">
          <Link
            href="/ferramentas"
            className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] transition-colors"
          >
            Todas
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/ferramentas/${c.slug}`}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                c.slug === cat.slug
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Grid das ferramentas da categoria */}
        <section>
          <ToolGrid tools={tools} emptyMessage={`Nenhuma ferramenta encontrada na categoria ${cat.name}.`} />
        </section>
      </div>
    </div>
  );
}
