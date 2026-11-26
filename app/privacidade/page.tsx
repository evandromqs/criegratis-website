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
        <p className="text-sm text-[#64748B]">Última atualização: Novembro de 2026</p>
      </div>

      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm space-y-6 text-[#0F172A] leading-relaxed text-sm sm:text-base">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#0F172A]">1. Compromisso com o Processamento Client-Side</h2>
          <p className="text-[#475569]">
            No <strong>Crie Grátis</strong> (criegratis.com.br), a sua privacidade é nossa prioridade absoluta. Nossas ferramentas de manipulação de imagem, PDF, geração de QR Code, contagem de palavras e formatação operam <strong>100% no seu navegador de internet (client-side)</strong>.
          </p>
          <p className="text-[#475569]">
            Isso significa que suas fotos, textos, senhas ou arquivos <strong>nunca são enviados ou salvos em nossos servidores</strong>. Todo o processamento computacional ocorre localmente no seu computador ou dispositivo móvel.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">2. Coleta de Dados, Cookies e Analytics</h2>
          <p className="text-[#475569]">
            Para melhorar continuamente o desempenho, a acessibilidade e a usabilidade do site, utilizamos serviços de análise de tráfego e comportamento, incluindo <strong>Google Analytics</strong>, <strong>Vercel Analytics</strong> e <strong>Microsoft Clarity</strong>. Esses serviços utilizam cookies e identificadores técnicos para coletar métricas agregadas de navegação, como páginas visitadas, tempo de permanência, tipo de navegador e interações de interface.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">3. Publicidade, Google AdSense e Cookies de Terceiros</h2>
          <p className="text-[#475569]">
            Para manter a plataforma gratuita e acessível a todos, o <strong>Crie Grátis</strong> pode exibir anúncios veiculados pelo <strong>Google AdSense</strong>, além de contar com apoio voluntário da comunidade via Pix.
          </p>
          <p className="text-[#475569]">
            Fornecedores de terceiros, incluindo o <strong>Google</strong>, utilizam cookies para veicular anúncios com base nas visitas anteriores do usuário a este site ou a outros sites na Internet. O uso de cookies de publicidade permite que o Google e seus parceiros exibam anúncios personalizados com base em sua navegação.
          </p>
          <p className="text-[#475569]">
            Você pode desativar a publicidade personalizada a qualquer momento acessando as{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Configurações de anúncios do Google
            </a>{" "}
            ou visitando{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              aboutads.info
            </a>
            . Também é possível gerenciar ou bloquear cookies diretamente nas configurações do seu navegador.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">4. Direitos do Usuário (LGPD)</h2>
          <p className="text-[#475569]">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar esclarecimentos, revisão ou exclusão de quaisquer dados eventualmente tratados por meio dos nossos canais de atendimento, bem como gerenciar suas preferências de cookies no banner de consentimento do site.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#F1F5F9]">
          <h2 className="text-lg font-bold text-[#0F172A]">5. Contato sobre Privacidade</h2>
          <p className="text-[#475569]">
            Caso você tenha dúvidas ou sugestões em relação à nossa política de privacidade, entre em contato através do e-mail oficial <a href="mailto:contato@criegratis.com.br" className="text-[#2563EB] font-bold hover:underline">contato@criegratis.com.br</a> ou pela nossa página de contato.
          </p>
        </section>
      </div>
    </div>
  );
}
