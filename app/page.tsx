import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Image as ImageIcon,
  Type,
  Calculator,
  QrCode,
  Code2,
  Sparkles,
  Lock,
  Zap,
  HelpCircle,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FavoritesSection from "@/components/FavoritesSection";
import HomeToolFilter from "@/components/HomeToolFilter";
import FaqAccordion from "@/components/FaqAccordion";
import DollarBlockedIcon from "@/components/icons/DollarBlockedIcon";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Crie Grátis — Ferramentas Gratuitas Online e 100% no Navegador",
  description:
    "Ferramentas online gratuitas para converter JPG para PNG, PNG para JPG, redimensionar e comprimir imagens, criar QR Code, gerar senhas fortes e calcular com privacidade total.",
  alternates: {
    canonical: "https://criegratis.com.br",
  },
  openGraph: {
    title: "Crie Grátis — Ferramentas Gratuitas Online",
    description:
      "Tudo o que você precisa no dia a dia: conversão de imagens, gerador de senhas, QR code e calculadoras. Rápido, seguro e 100% no navegador.",
    url: "https://criegratis.com.br",
    siteName: "Crie Grátis",
    locale: "pt_BR",
    type: "website",
  },
};

const HOME_FAQS = [
  {
    question: "Como o Crie Grátis garante a total privacidade dos meus arquivos?",
    answer:
      "Diferente da maioria dos sites que enviam suas imagens e documentos para servidores externos, o Crie Grátis processa 100% dos dados diretamente na memória do seu navegador (client-side). Seus arquivos, senhas e textos nunca saem do seu computador ou celular.",
  },
  {
    question: "As ferramentas são realmente 100% gratuitas ou existe limite de uso?",
    answer:
      "Todas as ferramentas são 100% gratuitas, ilimitadas e livres de assinaturas ou taxas ocultas. Você pode converter, redimensionar, gerar senhas ou calcular quantas vezes precisar sem limites diários.",
  },
  {
    question: "O Crie Grátis funciona em celulares e tablets?",
    answer:
      "Sim! A plataforma foi desenvolvida com design 100% responsivo e otimizado para toque, funcionando com máxima velocidade no iPhone (iOS), Android, tablets e computadores.",
  },
  {
    question: "Preciso instalar algum aplicativo ou extensão?",
    answer:
      "Não. Basta abrir o site no seu navegador favorito (Chrome, Safari, Firefox, Edge). Opcionalmente, você pode instalar o Crie Grátis como um Progressive Web App (PWA) no seu celular para acesso instantâneo.",
  },
  {
    question: "Como posso sugerir novas ferramentas para a plataforma?",
    answer:
      "A comunidade é o coração do projeto! Você pode acessar nossa página de Roadmap para acompanhar o lançamento das 50 ferramentas planejadas e sugerir novas ideias na página de contato.",
  },
];

export default function HomePage() {
  // Schema.org FAQPage para maximizar o ranqueamento orgânico no Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Schema.org ItemList para o catálogo de ferramentas na página inicial
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ferramentas Online Gratuitas do Crie Grátis",
    description:
      "Catálogo de utilitários rápidos que processam dados diretamente no navegador.",
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://criegratis.com.br${tool.href}`,
      description: tool.shortDescription,
    })),
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16 w-full max-w-full overflow-x-clip">
      {/* Scripts estruturados JSON-LD (FAQPage + ItemList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, itemListSchema]),
        }}
      />

      {/* HERO DA HOMEPAGE */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A]/50 pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Detalhes de Fundo Geométricos Suaves */}
        <div className="absolute top-12 right-12 h-72 w-72 rounded-full bg-blue-100/40 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 left-12 h-72 w-72 rounded-full bg-cyan-100/40 dark:bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Texto e Ações (Priorizado no topo em Mobile e à Esquerda no Desktop) */}
            <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left">
              
              {/* Texto H1 Principal */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white leading-[1.18] sm:leading-[1.15]">
                Ferramentas gratuitas para{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">criar</span>,{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">converter</span> e{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">resolver</span>.
              </h1>

              {/* Subtítulo Semântico com tag <p> */}
              <p className="text-sm sm:text-lg text-[#475569] dark:text-[#94A3B8] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Tudo o que você precisa no dia a dia, em um só lugar. Rápido, seguro, sem anúncios invasivos e 100% processado no seu navegador.
              </p>

              {/* Barra de Busca + Sugestões Otimizadas com Dados do GSC */}
              <div className="pt-1 max-w-xl mx-auto lg:mx-0 w-full space-y-3">
                <SearchBar placeholder="Buscar ferramenta (ex: png para jpg, qr code, senha...)" />
                
                {/* Sugestões Rápidas em Chips Clicáveis Baseados no Google Search Console */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  <span className="font-medium text-[#0F172A] dark:text-white mr-0.5">Mais buscadas:</span>
                  <Link
                    href="/jpg-para-png"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    JPG p/ PNG
                  </Link>
                  <Link
                    href="/png-para-jpg"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    PNG p/ JPG
                  </Link>
                  <Link
                    href="/redimensionar-imagem"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    Redimensionar
                  </Link>
                  <Link
                    href="/gerar-senha"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    Gerar Senha
                  </Link>
                  <Link
                    href="/criar-qr-code"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    QR Code
                  </Link>
                  <Link
                    href="/calculadora-de-porcentagem"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    Calculadora %
                  </Link>
                </div>
              </div>

              {/* Botão de Ação do Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
                <Link
                  href="/ferramentas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  Explorar catálogo completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Mockup Visual Desktop (Oculto no mobile para manter busca acima do fold) */}
            <div className="hidden lg:flex lg:col-span-5 justify-center w-full max-w-full">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-xl shadow-slate-200/50 dark:shadow-black/40">
                  {/* Header da Janela com Controles Mac */}
                  <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-5 py-3.5">
                    <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">Crie Grátis Studio</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    </div>
                  </div>

                  {/* Grid de Ícones de Categoria */}
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Link
                        href="/ferramentas/imagens"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8] hover:scale-105 transition-transform"
                      >
                        <ImageIcon className="h-7 w-7 mb-1" />
                        <span className="text-[10px] font-bold">Imagens</span>
                      </Link>

                      <Link
                        href="/ferramentas/texto"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-[#10B981] dark:text-[#34D399] hover:scale-105 transition-transform"
                      >
                        <Type className="h-7 w-7 mb-1" />
                        <span className="text-[10px] font-bold">Texto</span>
                      </Link>

                      <Link
                        href="/ferramentas/calculadoras"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 text-[#F59E0B] dark:text-[#FBBF24] hover:scale-105 transition-transform"
                      >
                        <Calculator className="h-7 w-7 mb-1" />
                        <span className="text-[10px] font-bold">Cálculos</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Link
                        href="/ferramentas/qr-code"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 text-[#06B6D4] dark:text-[#22D3EE] hover:scale-105 transition-transform"
                      >
                        <QrCode className="h-7 w-7 mb-1" />
                        <span className="text-[10px] font-bold">QR Code</span>
                      </Link>

                      <Link
                        href="/ferramentas/desenvolvedor"
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[#8B5CF6] dark:text-[#A78BFA] hover:scale-105 transition-transform"
                      >
                        <Code2 className="h-7 w-7 mb-1" />
                        <span className="text-[10px] font-bold">Dev</span>
                      </Link>

                      <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8]">
                        <DollarBlockedIcon className="h-7 w-7 mb-1 text-[#2563EB] dark:text-[#38BDF8]" />
                        <span className="text-[10px] font-bold">Grátis</span>
                      </div>
                    </div>
                  </div>

                  {/* Barra de Status */}
                  <div className="border-t border-[#F1F5F9] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-5 py-3 text-center text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
                    ⚡ Processamento direto no navegador • 100% Privado
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FERRAMENTAS FAVORITAS (ACESSO RÁPIDO SE HOUVER) */}
      <FavoritesSection />

      {/* FERRAMENTAS COM FILTRO INTERATIVO POR CATEGORIA */}
      <section id="ferramentas" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
            Ferramentas Disponíveis
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Escolha uma ferramenta abaixo ou filtre por categoria para resolver tarefas em segundos.
          </p>
        </div>

        {/* Componente Interativo com Abas de Categorias e Ordenação */}
        <HomeToolFilter tools={TOOLS} />
      </section>

      {/* SEÇÃO UNIFICADA DE DIFERENCIAIS E VANTAGENS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white sm:text-3xl">
              Por que usar o Crie Grátis?
            </h2>
            <p className="mt-2 text-[#475569] dark:text-[#94A3B8] text-xs sm:text-base">
              Desenvolvemos cada utilitário com foco em velocidade, simplicidade e privacidade inegociável.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Instantâneo</h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Resultados em milissegundos direto no seu aparelho, sem filas de espera ou lentidão.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#10B981] dark:text-[#34D399] border border-emerald-100 dark:border-emerald-900/50">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">100% Privado</h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Nenhum dado ou arquivo seu sobe para servidores. O processamento ocorre no navegador.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/50 text-[#8B5CF6] dark:text-[#A78BFA] border border-purple-100 dark:border-purple-900/50">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">50+ Ferramentas</h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Catálogo completo para converter imagens, manipular texto, gerar códigos e calcular.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] space-y-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-[#F59E0B] dark:text-[#FBBF24] border border-amber-100 dark:border-amber-900/50">
                <DollarBlockedIcon className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">100% Grátis</h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Sem assinaturas, sem limites de uso por dia, sem marcas d&apos;água e sem anúncios invasivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/40 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mb-8">
            Tire suas dúvidas sobre como o Crie Grátis funciona e como garantimos sua segurança.
          </p>

          {/* Lista Vertical de Perguntas Frequentes Recolhidas (Accordion) */}
          <FaqAccordion items={HOME_FAQS} />

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-semibold text-[#0F172A] dark:text-white">
                Tem alguma dúvida ou sugestão de ferramenta?
              </h4>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Nossa equipe está construindo a plataforma junto com a comunidade.
              </p>
            </div>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors cursor-pointer min-h-[40px] shrink-0"
            >
              Falar conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
