import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Map,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Heart,
  MessageSquarePlus,
  ShieldCheck,
  Zap,
  Wrench,
  Flame,
  Layers,
} from "lucide-react";
import RoadmapView from "./RoadmapView";

export const metadata: Metadata = {
  title: "Roadmap Oficial — Rumo às 100 Ferramentas Gratuitas | CrieGrátis",
  description:
    "Acompanhe o desenvolvimento público do CrieGrátis. Veja as 10 ferramentas lançadas, as 11 em desenvolvimento ativo (Fase 2) e as próximas novidades rumo às 100 ferramentas 100% privadas no navegador.",
  openGraph: {
    title: "Roadmap CrieGrátis — Rumo às 100 Ferramentas Gratuitas",
    description:
      "Acompanhe as próximas ferramentas gratuitas, rápidas e 100% client-side que estamos construindo.",
    url: "https://criegratis.com.br/roadmap",
  },
};

export default function RoadmapPage() {
  const totalTools = 100;
  const availableTools = 21;
  const inProgressTools = 0;
  const plannedTools = 79;
  const progressPercent = Math.round((availableTools / totalTools) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        {/* Título Principal */}
        <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
          Roadmap do <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">CrieGrátis</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Nossa meta é construir o ecossistema definitivo de <strong>100 utilitários gratuitos</strong>, 
          rápidos, sem anúncios invasivos e com processamento <strong>100% privado no seu navegador</strong>.
        </p>

        {/* Barra de Progresso Geral da Plataforma */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-4 sm:p-5 shadow-2xs text-left space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold">
            <span className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Progresso Rumo às 100 Ferramentas</span>
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
              {availableTools}% Concluído ({availableTools} de {totalTools})
            </span>
          </div>

          {/* Barra de Progresso Segmentada */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 flex">
            {/* Disponíveis */}
            <div
              style={{ width: `${availableTools}%` }}
              className="h-full bg-emerald-500 transition-all duration-500"
              title={`${availableTools} Disponíveis`}
            />
            {/* Planejadas */}
            <div
              style={{ width: `${plannedTools}%` }}
              className="h-full bg-slate-200 dark:bg-slate-700/60 transition-all duration-500"
              title={`${plannedTools} Planejadas`}
            />
          </div>

          {/* Legenda da Barra */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>{availableTools} Prontas ({availableTools}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />
              <span>{plannedTools} No Radar ({plannedTools}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block" />
              <span>Meta Final (100 Ferramentas)</span>
            </div>
          </div>
        </div>

        {/* Resumo em Cards com Contraste Aprimorado */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 text-left">
          {/* Card Disponíveis */}
          <div className="group rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900/80 p-4 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Disponíveis</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{availableTools}</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Fases 1 & 2 (Lançadas)</p>
          </div>

          {/* Card Próximas */}
          <div className="group rounded-2xl border border-sky-200/80 dark:border-sky-900/50 bg-gradient-to-b from-sky-50/50 to-white dark:from-sky-950/20 dark:to-slate-900/80 p-4 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">Próxima Fase</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">19</p>
            <p className="text-[11px] text-sky-700 dark:text-sky-300 font-medium">Fase 3 (v1.2)</p>
          </div>

          {/* Card Planejadas */}
          <div className="group rounded-2xl border border-purple-200/80 dark:border-purple-900/50 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900/80 p-4 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">No Radar</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{plannedTools}</p>
            <p className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">Fases 3 a 6</p>
          </div>

          {/* Card Meta Final */}
          <div className="group rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-900/80 p-4 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Meta Final</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{totalTools}</p>
            <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">100 Ferramentas</p>
          </div>
        </div>
      </div>

      {/* Componente Interativo de Visualização do Roadmap (Filtros, Busca e Fases) */}
      <RoadmapView />

      {/* Seção de Contribuição & Apoio com Alto Conforto Visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Card de Sugestão de Ferramenta */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/20 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 shadow-2xs">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tem ideia de uma ferramenta útil?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Priorizamos o desenvolvimento com base nas necessidades reais da comunidade. Se você precisa de um conversor, calculadora ou utilitário específico, envie sua sugestão!
          </p>
          <div className="pt-2">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-slate-950 px-5 py-2.5 text-sm font-bold text-white transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Sugerir Nova Ferramenta</span>
            </Link>
          </div>
        </div>

        {/* Card de Apoio ao Desenvolvimento */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-2xs">
            <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Apoie o Projeto CrieGrátis
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            O CrieGrátis é mantido de forma independente, sem anúncios invasivos e sem cobrar assinaturas. Contribuições voluntárias via Pix ajudam a acelerar a chegada às 100 ferramentas.
          </p>
          <div className="pt-2">
            <a
              href="mailto:pix@criegratis.com.br"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-all shadow-2xs font-mono"
            >
              <span>Chave Pix: pix@criegratis.com.br</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}