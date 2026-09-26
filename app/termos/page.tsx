import React from "react";
import { Metadata } from "next";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Termos de Uso | Crie Grátis",
  description: "Leia os Termos de Uso e condições para utilização das ferramentas do Crie Grátis.",
  alternates: {
    canonical: `${SITE_URL}/termos`,
  },
  openGraph: {
    title: "Termos de Uso | Crie Grátis",
    description: "Leia os Termos de Uso e condições para utilização das ferramentas do Crie Grátis.",
    url: `${SITE_URL}/termos`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
          Termos de Uso
        </h1>
        <p className="text-sm text-[#64748B]">Última atualização: Agosto de 2026</p>
      </div>

      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm space-y-6 text-[#0F172A] leading-relaxed text-sm sm:text-base">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0F172A]">1. Aceitação dos Termos</h2>
          <p className="text-[#475569]">
            Ao acessar e utilizar a plataforma <strong>Crie Grátis</strong> (criegratis.com.br), você concorda integralmente com os presentes Termos de Uso. Caso não concorde com algum dos termos, recomendamos não utilizar os nossos serviços.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">2. Uso das Ferramentas</h2>
          <p className="text-[#475569]">
            Todas as ferramentas disponibilizadas no Crie Grátis são gratuitas para uso pessoal e comercial. Você é o único responsável pelos arquivos, conteúdos e textos inseridos nas ferramentas.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">3. Isenção de Garantias</h2>
          <p className="text-[#475569]">
            As ferramentas são fornecidas &quot;como estão&quot;, sem garantias expressas ou implícitas de disponibilidade ininterrupta. Embora nos esforcemos para manter o site rápido e preciso, não nos responsabilizamos por perdas de dados decorrentes do uso das ferramentas.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">4. Modificações dos Termos</h2>
          <p className="text-[#475569]">
            Reservamo-nos o direito de atualizar estes termos a qualquer momento para refletir melhorias no serviço ou alterações legais.
          </p>
        </section>
      </div>
    </div>
  );
}
