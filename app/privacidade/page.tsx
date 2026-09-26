import React from "react";
import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade | Crie Grátis",
  description: "Entenda como o Crie Grátis protege seus dados com processamento 100% client-side no seu navegador.",
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
  },
  openGraph: {
    title: "Política de Privacidade | Crie Grátis",
    description: "Entenda como o Crie Grátis protege seus dados com processamento 100% client-side no seu navegador.",
    url: `${SITE_URL}/privacidade`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-semibold text-[#10B981]">
          <ShieldCheck className="h-4 w-4" />
          <span>Privacidade Garantida</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="text-sm text-[#64748B]">Última atualização: Agosto de 2026</p>
      </div>

      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm space-y-6 text-[#0F172A] leading-relaxed text-sm sm:text-base">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0F172A]">1. Compromisso com o Processamento Client-Side</h2>
          <p className="text-[#475569]">
            No <strong>Crie Grátis</strong> (criegratis.com.br), a sua privacidade é nossa prioridade absoluta. Nossas ferramentas de manipulação de imagem, geração de QR Code, contagem de palavras e formatação JSON operam <strong>100% no seu navegador de internet (client-side)</strong>.
          </p>
          <p className="text-[#475569]">
            Isso significa que suas fotos, textos, senhas ou arquivos <strong>nunca são enviados ou salvos em nossos servidores</strong>. Todo o processamento computacional ocorre localmente no seu computador ou dispositivo móvel.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">2. Coleta de Dados e Analytics</h2>
          <p className="text-[#475569]">
            Para melhorar continuamente o desempenho e a usabilidade do site, poderemos utilizar serviços anônimos de estatísticas de tráfego (como Google Analytics e Google Search Console). Esses serviços coletam apenas métricas agregadas descaracterizadas, tais como tempo de permanência, tipo de navegador e páginas visitadas.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">3. Ausência de Anúncios e Sustentabilidade</h2>
          <p className="text-[#475569]">
            O <strong>Crie Grátis não exibe anúncios publicitários, pop-ups ou rastreadores de publicidade de terceiros</strong>. A plataforma é mantida e sustentada com recursos próprios e contribuições voluntárias da comunidade via Pix, garantindo uma navegação 100% limpa, segura e sem poluição visual.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">4. Contato sobre Privacidade</h2>
          <p className="text-[#475569]">
            Caso você tenha dúvidas ou sugestões em relação à nossa política de privacidade, entre em contato através do e-mail oficial <a href="mailto:contato@criegratis.com.br" className="text-[#2563EB] font-bold hover:underline">contato@criegratis.com.br</a> ou pela nossa página de contato.
          </p>
        </section>
      </div>
    </div>
  );
}
