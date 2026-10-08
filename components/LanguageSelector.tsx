"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LOCALES, Locale } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSelector({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale: currentLocale, setLocale } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLocaleInfo = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fechar no ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (selectedLocale: Locale) => {
    setIsOpen(false);
    setLocale(selectedLocale);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        aria-label={`Idioma atual: ${activeLocaleInfo.name}. Clique para alterar.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group relative flex items-center justify-center min-h-[44px] min-w-[44px] gap-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9] shadow-2xs hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-white dark:hover:bg-[#0F172A] transition-all duration-150 cursor-pointer active:scale-95"
      >
        <span className="text-sm leading-none" aria-hidden="true">
          {activeLocaleInfo.flag}
        </span>
        <span className="font-extrabold text-xs uppercase tracking-wider text-[#475569] dark:text-[#CBD5E1] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
          {activeLocaleInfo.code}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-[#94A3B8] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#2563EB] dark:text-[#38BDF8]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Menu Dropdown de Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-1.5 shadow-xl shadow-slate-900/10 dark:shadow-black/40 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 border-b border-[#E2E8F0]/80 dark:border-[#334155]/80 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Idioma / Language
            </span>
          </div>

          <div className="space-y-0.5">
            {LOCALES.map((locale) => {
              const isSelected = locale.code === currentLocale;
              return (
                <button
                  key={locale.code}
                  type="button"
                  onClick={() => handleSelect(locale.code)}
                  className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#38BDF8]"
                      : "text-[#0F172A] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none" aria-hidden="true">
                      {locale.flag}
                    </span>
                    <div className="text-left">
                      <span className="block leading-tight">{locale.nativeName}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
