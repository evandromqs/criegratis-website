import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Image as ImageIcon,
  Type,
  Calculator,
  QrCode,
  Code2,
  Sparkles,
  Lock,
  Cpu,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import FavoritesSection from "@/components/FavoritesSection";
import HomeToolFilter from "@/components/HomeToolFilter";
import DollarBlockedIcon from "@/components/icons/DollarBlockedIcon";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";

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

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16 w-full max-w-full overflow-x-clip">
      {/* Script estruturado JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO DA HOMEPAGE */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A]/50 pt-6 pb-12 sm:pt-16 sm:pb-20">
        {/* Detalhes de Fundo Geométricos Suaves */}
        <div className="absolute top-12 right-12 h-72 w-72 rounded-full bg-blue-100/40 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-8 left-12 h-72 w-72 rounded-full bg-cyan-100/40 dark:bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
            {/* 1. NO MOBILE É O PRIMEIRO (order-1) / NO DESKTOP É A DIREITA (order-2 lg:col-span-5): Mockup Visual */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center w-full max-w-full">
              {/* CONTAINER DO MOCKUP (Mobile = Celular; Desktop = Janela Studio Mac) */}
              <div className="relative w-full max-w-[220px] xs:max-w-[240px] sm:max-w-md">
                
                {/* === VERSÃO CELULAR VERTICAL (Exibida em telas < sm) === */}
                <div className="block sm:hidden overflow-hidden rounded-[2rem] border-4 border-[#334155] dark:border-[#475569] bg-white dark:bg-[#1E293B] shadow-xl shadow-slate-900/25">
                  {/* Topo do Celular: Notch / Câmera + Bateria */}
                  <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-b border-[#F1F5F9] dark:border-[#334155]">
                    <span className="text-[9px] font-bold text-[#64748B] dark:text-[#94A3B8]">9:41</span>
                    <div className="h-2.5 w-12 rounded-full bg-[#1E293B] dark:bg-[#334155] flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-[#0F172A] dark:bg-[#020617] border border-slate-700" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-2.5 rounded-xs border border-[#64748B] dark:border-[#94A3B8] p-0.5">
                        <div className="h-full w-full bg-[#22C55E]" />
                      </div>
                    </div>
                  </div>

                  {/* Grid de Ícones do Celular */}
                  <div className="p-2.5 space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5">
                      <Link
                        href="/ferramentas/imagens"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8]"
                      >
                        <ImageIcon className="h-4 w-4 mb-0.5" />
                        <span className="text-[8px] font-bold">Imagens</span>
                      </Link>

                      <Link
                        href="/ferramentas/texto"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-[#10B981] dark:text-[#34D399]"
                      >
                        <Type className="h-4 w-4 mb-0.5" />
                        <span className="text-[8px] font-bold">Texto</span>
                      </Link>

                      <Link
                        href="/ferramentas/calculadoras"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 text-[#F59E0B] dark:text-[#FBBF24]"
                      >
                        <Calculator className="h-4 w-4 mb-0.5" />
                        <span className="text-[8px] font-bold">Cálculos</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <Link
                        href="/ferramentas/qr-code"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 text-[#06B6D4] dark:text-[#22D3EE]"
                      >
                        <QrCode className="h-4 w-4 mb-0.5" />
                        <span className="text-[8px] font-bold">QR Code</span>
                      </Link>

                      <Link
                        href="/ferramentas/desenvolvedor"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-[#8B5CF6] dark:text-[#A78BFA]"
                      >
                        <Code2 className="h-4 w-4 mb-0.5" />
                        <span className="text-[8px] font-bold">Dev</span>
                      </Link>

                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8]">
                        <DollarBlockedIcon className="h-4 w-4 mb-0.5 text-[#2563EB] dark:text-[#38BDF8]" />
                        <span className="text-[8px] font-bold">Grátis</span>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Celular: 3 Botões de Navegação Clássicos */}
                  <div className="flex items-center justify-around py-2 px-6 border-t border-[#F1F5F9] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]">
                    <div className="flex items-center justify-center h-5 w-5 text-[#64748B] dark:text-[#94A3B8]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
                        <polygon points="6,12 18,5 18,19" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-center h-5 w-5 text-[#64748B] dark:text-[#94A3B8]">
                      <circle cx="12" cy="12" r="5" />
                    </div>
                    <div className="flex items-center justify-center h-5 w-5 text-[#64748B] dark:text-[#94A3B8]">
                      <rect x="7" y="7" width="10" height="10" rx="1.5" />
                    </div>
                  </div>
                </div>

                {/* === VERSÃO JANELA PC / MAC (Exibida em telas ≥ sm) === */}
                <div className="hidden sm:block overflow-hidden rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-xl shadow-slate-200/50 dark:shadow-black/40">
                  {/* Header da Janela com Controles Mac na Direita */}
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

            {/* 2. NO MOBILE É O SEGUNDO (order-2) / NO DESKTOP É A ESQUERDA (order-1 lg:col-span-7): Texto e Ações */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col space-y-4 sm:space-y-6 text-center lg:text-left">
              
              {/* Badge de Destaque Superior */}
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>100% Gratuito & Ilimitado • Sem Cadastro • No seu Navegador</span>
                </div>
              </div>

              {/* Texto H1 Principal */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white leading-[1.18] sm:leading-[1.15]">
                Ferramentas gratuitas para{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">criar</span>,{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">converter</span> e{" "}
                <span className="text-[#2563EB] dark:text-[#38BDF8]">resolver</span>.
              </h1>

              {/* Texto H2 */}
              <h2 className="text-sm sm:text-lg text-[#475569] dark:text-[#94A3B8] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Tudo o que você precisa no dia a dia, em um só lugar. Rápido, seguro, sem anúncios invasivos e 100% processado no seu navegador.
              </h2>

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

              {/* Botões de Ação do Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
                <Link
                  href="/ferramentas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  Explorar catálogo completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] px-6 py-3.5 sm:py-3 text-sm font-semibold text-[#0F172A] dark:text-white shadow-2xs hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] hover:border-[#CBD5E1] dark:hover:border-[#475569] active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                >
                  Ver Roadmap das 50 Ferramentas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE ESTATÍSTICAS E CONFIANÇA (SOCIAL PROOF / QUICK STATS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-sm">
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">0s de Espera</div>
              <div className="text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">Processamento local</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#10B981] dark:text-[#34D399]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">100% Privado</div>
              <div className="text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">Sem upload para nuvem</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/50 text-[#8B5CF6] dark:text-[#A78BFA]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">50 Ferramentas</div>
              <div className="text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">Catálogo em expansão</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-[#F59E0B] dark:text-[#FBBF24]">
              <DollarBlockedIcon className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8]" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">R$ 0,00 Grátis</div>
              <div className="text-[11px] sm:text-xs text-[#64748B] dark:text-[#94A3B8]">Sem planos ou limites</div>
            </div>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS FAVORITAS (ACESSO RÁPIDO DO USUÁRIO) */}
      <FavoritesSection />

      {/* CATEGORIAS EM DESTAQUE */}
      <section id="categorias" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
            Navegue por Categoria
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Encontre a solução exata para imagens, códigos, textos, cálculos e conexões.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            return <CategoryCard key={cat.id} category={cat} toolCount={count} />;
          })}
        </div>
      </section>

      {/* FERRAMENTAS COM FILTRO INTERATIVO */}
      <section id="populares" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-3xl">
            Ferramentas Disponíveis
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Escolha uma ferramenta abaixo ou use os filtros para encontrar o que precisa em segundos.
          </p>
        </div>

        {/* Componente Interativo com Abas de Categorias e Ordenação de Populares */}
        <HomeToolFilter tools={TOOLS} />
      </section>

      {/* PILARES DE SEGURANÇA E PRIVACIDADE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6 sm:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white sm:text-3xl">
              Por que escolher o Crie Grátis?
            </h2>
            <p className="mt-2 text-[#475569] dark:text-[#94A3B8] text-xs sm:text-base">
              Desenvolvemos cada utilitário com obsessão por velocidade, simplicidade e privacidade inegociável.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#10B981] dark:text-[#34D399] border border-emerald-100 dark:border-emerald-900/50">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Privacidade Absoluta</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Nenhum arquivo seu sobe para servidores na nuvem. A conversão e o processamento acontecem 100% no seu próprio computador ou celular.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-[#38BDF8] border border-blue-100 dark:border-blue-900/50">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Velocidade Instantânea</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Zero filas de conversão e zero tempo de upload. O resultado aparece na hora usando todo o poder de processamento do seu navegador.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-[#F59E0B] dark:text-[#FBBF24] border border-amber-100 dark:border-amber-900/50">
                <DollarBlockedIcon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 text-[#2563EB] dark:text-[#38BDF8]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">Sem Planos ou Pegadinhas</h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Sem assinaturas premium, sem limite de arquivos por dia e sem marcas d&apos;água nas suas imagens e PDFs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) - ALAVANCANDO SEO COM SCHEMA ORG */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/40 p-6 sm:p-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {HOME_FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-2xs space-y-2"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

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
