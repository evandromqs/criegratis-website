import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Zap, Info } from "lucide-react";
import DollarBlockedIcon from "@/components/icons/DollarBlockedIcon";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre o Crie Grátis — Ferramentas Gratuitas",
  description: "Conheça a missão do Crie Grátis: oferecer ferramentas web ultra-rápidas, 100% gratuitas e com total privacidade no navegador.",
  alternates: {
    canonical: `${SITE_URL}/sobre`,
  },
  openGraph: {
    title: "Sobre o Crie Grátis — Ferramentas Gratuitas",
    description: "Conheça a missão do Crie Grátis: oferecer ferramentas web ultra-rápidas, 100% gratuitas e com total privacidade no navegador.",
    url: `${SITE_URL}/sobre`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-xs font-semibold text-[#2563EB]">
          <Info className="h-4 w-4" />
          <span>Nossa Missão</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
          Sobre o Crie Grátis
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto">
          O Crie Grátis foi criado com um propósito claro: disponibilizar ferramentas indispensáveis, rápidas e gratuitas que funcionam diretamente no seu navegador.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm space-y-8 text-[#0F172A] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A]">Por que o Crie Grátis existe?</h2>
          <p className="text-[#475569]">
            Muitas plataformas na internet exigem downloads de programas pesados, cadastros demorados ou cobram assinaturas abusivas para tarefas simples como comprimir uma imagem ou gerar um QR Code.
          </p>
          <p className="text-[#475569]">
            Nós acreditamos que utilitários fundamentais devem ser acessíveis a todos, com navegação fluida, sem anúncios invasivos e sem complicações.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-xl font-bold text-[#0F172A]">Pilares Fundamentais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981] border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-[#0F172A] text-sm">Privacidade em 1.º Lugar</h3>
              <p className="text-xs text-[#64748B]">
                Seus arquivos não são enviados para nossos servidores. O processamento ocorre no seu computador ou celular.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-[#0F172A] text-sm">Velocidade Máxima</h3>
              <p className="text-xs text-[#64748B]">
                Aproveitamos o poder de processamento nativo do seu navegador para entregar respostas em milissegundos.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B] border border-amber-100">
                <DollarBlockedIcon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-[#0F172A] text-sm">Sem Pegadinhas (100% Grátis)</h3>
              <p className="text-xs text-[#64748B]">
                Sem cadastros, sem limite de uso diário e sem marcas d&apos;água nas suas imagens ou QR Codes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
