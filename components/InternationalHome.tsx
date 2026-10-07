import React from "react";
import Link from "next/link";
import {
  QrCode,
  Files,
  FileSignature,
  Minimize2,
  UserSquare2,
  RefreshCw,
  MonitorSmartphone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Heart,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import DollarBlockedIcon from "@/components/icons/DollarBlockedIcon";
import MicrosoftStoreSection from "@/components/MicrosoftStoreSection";
import SupportCard from "@/components/SupportCard";
import FaqAccordion from "@/components/FaqAccordion";
import { TRANSLATIONS, INTERNATIONAL_SHOWCASE_TOOLS, Locale } from "@/lib/i18n";

const ICON_MAP: Record<string, React.ElementType> = {
  QrCode,
  Files,
  FileSignature,
  Minimize2,
  UserSquare2,
  RefreshCw,
  MonitorSmartphone,
  Lock,
};

interface InternationalHomeProps {
  locale: "es" | "en";
}

const FAQS_ES = [
  {
    question: "¿Cómo garantiza Crie Grátis la privacidad total de mis archivos?",
    answer:
      "A diferencia de la mayoría de los sitios web que envían tus documentos e imágenes a servidores en la nube, Crie Grátis procesa el 100% de los datos directamente en la memoria de tu navegador (client-side). Tus archivos, fotos y contratos nunca salen de tu dispositivo.",
  },
  {
    question: "¿Las herramientas son realmente 100% gratuitas o existen límites?",
    answer:
      "Todas las herramientas son completamente gratuitas, ilimitadas y libres de suscripciones ocultas. Puedes unir PDFs, comprimir imágenes o generar códigos QR tantas veces como necesites sin tarifas.",
  },
  {
    question: "¿Funciona en teléfonos móviles y tablets?",
    answer:
      "¡Sí! La plataforma está optimizada para pantallas táctiles y funciona a máxima velocidad en iPhone (iOS), Android, iPad y ordenadores con Windows o Mac.",
  },
  {
    question: "¿Tengo que instalar programas en mi ordenador?",
    answer:
      "No es necesario. Puedes usar todo directamente desde tu navegador (Chrome, Edge, Safari, Firefox). Opcionalmente, puedes instalar la aplicación oficial de Crie Grátis disponible en la Microsoft Store para Windows 10 y 11.",
  },
];

const FAQS_EN = [
  {
    question: "How does Crie Grátis protect my private and confidential files?",
    answer:
      "Unlike traditional conversion websites that upload your documents to remote cloud servers, Crie Grátis operates 100% client-side in your web browser. Your PDFs, photos and passwords are processed in-memory and never transmitted over the internet.",
  },
  {
    question: "Are these tools truly 100% free with no hidden paywalls?",
    answer:
      "Yes! All utilities are completely free and unrestricted. There are no surprise 'Pro' paywalls, credit systems or artificial daily document caps.",
  },
  {
    question: "Does it work smoothly on mobile phones and tablets?",
    answer:
      "Absolutely. Our responsive interface is lightweight and optimized for touchscreens, delivering instant speed on iOS, Android, tablets, and desktop computers.",
  },
  {
    question: "Do I need to download or install software?",
    answer:
      "No installation required. Everything works straight from your web browser. You can also get our official desktop app from the Microsoft Store for Windows 10 & 11.",
  },
];

export default function InternationalHome({ locale }: InternationalHomeProps) {
  const t = TRANSLATIONS[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-[#0B0F19] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge de Idioma / Global */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/60 px-4 py-1.5 text-xs font-extrabold text-[#2563EB] dark:text-[#38BDF8] mb-6 shadow-2xs">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-white max-w-4xl mx-auto leading-tight">
            {t.hero.titleStart}{" "}
            <span className="text-[#2563EB] dark:text-[#38BDF8]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 text-sm sm:text-lg text-[#475569] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-medium">
            {t.hero.subtitle}
          </p>

          {/* Badges Rápidos de Destaque */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-[#475569] dark:text-[#CBD5E1]">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{locale === "es" ? "Cero Subidas a la Nube" : "Zero Cloud Upload"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-2xs">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>{locale === "es" ? "Velocidad Inmediata" : "Instant In-Browser"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <span>{locale === "es" ? "100% Gratuito" : "100% Free Forever"}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Grid de Ferramentas Mais Acessadas (Showcase Internacional) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{locale === "es" ? "Selección Principal" : "Core Utility Suite"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
              {t.topTools.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
              {t.topTools.subtitle}
            </p>
          </div>

          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2563EB] dark:text-[#38BDF8] hover:underline shrink-0"
          >
            <span>{t.topTools.seeAll} (70+)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INTERNATIONAL_SHOWCASE_TOOLS.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || Zap;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-5 sm:p-6 hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {tool.badge && (
                      <span className="rounded-full bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                    {tool.title[locale]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                    {tool.description[locale]}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E2E8F0]/80 dark:border-[#1E293B] flex items-center justify-between text-xs font-bold text-[#2563EB] dark:text-[#38BDF8]">
                  <span>{tool.actionText[locale]}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Seção Trio de Vantagens (Privacidade, Velocidade, Gratuito) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-6 sm:p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
              {t.features.privacy}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
              {t.features.privacyDesc}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-6 sm:p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8] mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
              {t.features.speed}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
              {t.features.speedDesc}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-6 sm:p-7 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 mb-4">
              <DollarBlockedIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
              {t.features.freeForever}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
              {t.features.freeForeverDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Seção Microsoft Store */}
      <MicrosoftStoreSection />

      {/* Card de Apoio (Stripe Internacional) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SupportCard />
      </section>

      {/* Perguntas Frequentes (FAQ) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
            {locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            {locale === "es"
              ? "Todo lo que necesitas saber sobre cómo funciona la plataforma."
              : "Everything you need to know about our privacy-first tools."}
          </p>
        </div>

        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}
