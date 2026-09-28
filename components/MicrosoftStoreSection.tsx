import React from "react";
import Link from "next/link";
import { Download, Monitor, Zap, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

interface MicrosoftStoreSectionProps {
  className?: string;
}

export default function MicrosoftStoreSection({ className = "" }: MicrosoftStoreSectionProps) {
  const storeUrl = "https://apps.microsoft.com/detail/9pfbgktpt934?hl=pt-BR&gl=BR";

  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 dark:from-[#0F172A] dark:via-[#131C31] dark:to-[#0B0F19] p-6 sm:p-10 shadow-sm">
        {/* Glow decorativo de fundo */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Lado Esquerdo: Textos & Recursos */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
              {/* Ícone de janelas do Windows */}
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <span>Aplicativo Oficial para Desktop</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
              Crie Grátis na <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Microsoft Store</span>
            </h2>

            <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
              Instale o aplicativo oficial no seu computador com Windows 10 ou 11. Acesse as 70+ ferramentas direto da sua barra de tarefas, com carregamento instantâneo e privacidade total garantida.
            </p>

            {/* Destaques rápidos */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-medium text-[#334155] dark:text-[#CBD5E1]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Sem Anúncios</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Processamento Local</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Inicialização Rápida</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Botão Oficial Microsoft Store Call-to-action */}
          <div className="shrink-0 flex flex-col items-center sm:items-end gap-2.5">
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3.5 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 px-6 py-4 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] border border-slate-700/50 dark:border-blue-400/30"
              aria-label="Baixar o Crie Grátis na Microsoft Store"
            >
              {/* Logotipo Windows 4 Squares */}
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0">
                <span className="bg-[#00ADEF] rounded-[1px] w-2 h-2" />
                <span className="bg-[#00ADEF] rounded-[1px] w-2 h-2" />
                <span className="bg-[#00ADEF] rounded-[1px] w-2 h-2" />
                <span className="bg-[#00ADEF] rounded-[1px] w-2 h-2" />
              </div>

              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-300 dark:text-blue-100 leading-none">
                  Disponível na
                </div>
                <div className="text-base font-bold text-white leading-tight">
                  Microsoft Store
                </div>
              </div>

              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors ml-1" />
            </a>

            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Compatível com Windows 10 e Windows 11
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
