import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { ToolInfo } from "@/lib/tools";
import RelatedTools from "./RelatedTools";
import SupportCard from "./SupportCard";
import FavoriteButton from "./FavoriteButton";

interface ToolLayoutProps {
  tool: ToolInfo;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] pb-16 transition-colors duration-200">
      {/* Container Principal */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Breadcrumbs Discreto */}
        <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors">
            Início
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <Link href="/ferramentas" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors">
            Ferramentas
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <Link
            href={`/ferramentas/${tool.category}`}
            className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors capitalize"
          >
            {tool.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#94A3B8] shrink-0" />
          <span className="font-semibold text-[#0F172A] dark:text-white">{tool.name}</span>
        </nav>

        {/* Header Compacto da Ferramenta */}
        <div className="mb-4 sm:mb-6 text-center sm:text-left space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              {tool.h1}
            </h1>
            <div className="self-center sm:self-auto">
              <FavoriteButton slug={tool.slug} variant="full" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-3xl">
            {tool.fullDescription}
          </p>
        </div>

        {/* Widget Interativo da Ferramenta */}
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:p-8 shadow-sm">
          {children}
        </div>

        {/* Card Discreto de Apoio ao Projeto (Logo após o uso da ferramenta) */}
        <div className="mt-6">
          <SupportCard />
        </div>

        {/* Conteúdo Informativo & SEO On-Page */}
        <div className="mt-10 space-y-8 text-[#0F172A] dark:text-[#F1F5F9]">
          {/* Como Usar */}
          {tool.usageSteps && tool.usageSteps.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-white sm:text-xl mb-4">
                Como usar a ferramenta {tool.name}
              </h2>
              <ol className="space-y-3">
                {tool.usageSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] dark:bg-[#38BDF8] text-[11px] font-bold text-white dark:text-[#0F172A]">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Recursos Principais */}
          {tool.features && tool.features.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-white sm:text-xl mb-4">
                Recursos Principais
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tool.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8]">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Garantia de Privacidade */}
          <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-[#ECFDF5]/60 dark:bg-emerald-950/20 p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981] text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#065F46] dark:text-[#34D399]">
                  Garantia de Privacidade Crie Grátis
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-[#047857] dark:text-[#A7F3D0]">
                  Seus arquivos e dados são processados diretamente no seu próprio navegador e não precisam ser enviados para nossos servidores. Garantimos total confidencialidade, velocidade e segurança nas suas conversões.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <HelpCircle className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8]" />
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-white sm:text-xl">
                  Perguntas Frequentes (FAQ)
                </h2>
              </div>
              <div className="space-y-3 divide-y divide-[#F1F5F9] dark:divide-[#334155]">
                {tool.faqs.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                    <h3 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Ferramentas Relacionadas */}
        <RelatedTools currentSlug={tool.slug} category={tool.category} />
      </div>
    </div>
  );
}
