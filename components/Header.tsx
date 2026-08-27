"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Wrench, Grid2X2, Compass, Play, Pause, Star } from "lucide-react";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";
import PwaInstallButton from "./PwaInstallButton";
import { useFavorites } from "@/hooks/useFavorites";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isPlayingVerse, setIsPlayingVerse] = useState(false);
  const pathname = usePathname();
  const { favorites, isLoaded } = useFavorites();

  // Atalho de Teclado Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    {
      href: "/ferramentas",
      label: "Ferramentas",
      icon: Wrench,
      iconColor: "text-[#2563EB] dark:text-[#38BDF8]",
      activeBg: "bg-blue-50/80 dark:bg-blue-950/40 text-[#2563EB] dark:text-[#38BDF8]",
    },
    {
      href: "/categorias",
      label: "Categorias",
      icon: Grid2X2,
      iconColor: "text-[#06B6D4] dark:text-[#22D3EE]",
      activeBg: "bg-cyan-50/80 dark:bg-cyan-950/40 text-[#06B6D4] dark:text-[#22D3EE]",
    },
    {
      href: "/roadmap",
      label: "Roadmap",
      icon: Compass,
      iconColor: "text-[#8B5CF6] dark:text-[#A78BFA]",
      activeBg: "bg-purple-50/80 dark:bg-purple-950/40 text-[#8B5CF6] dark:text-[#A78BFA]",
    },
  ];

  return (
    <header className="sticky top-0 z-50 relative w-full border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation com Ícones Temáticos */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? link.activeBg
                    : "hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${link.iconColor}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Link Rápido de Favoritas */}
          {isLoaded && favorites.length > 0 && (
            <Link
              href="/#favoritos"
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold bg-amber-50/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60 hover:bg-amber-100 transition-all duration-150 shadow-2xs"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>Favoritas</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-black">
                {favorites.length}
              </span>
            </Link>
          )}
        </nav>

        {/* Action: Search Button + PWA Button + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Botão de Busca (Oculto na Home pois já existe barra de busca destacada no Hero) */}
          {pathname !== "/" && (
            <button
              onClick={() => setSearchModalOpen(true)}
              type="button"
              className="group relative flex items-center justify-center gap-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] p-2.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] shadow-2xs hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-white dark:hover:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-[#F1F5F9] transition-all duration-150 cursor-pointer"
              aria-label="Buscar ferramenta"
            >
              <Search className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors duration-150 shrink-0" />
              
              <span className="hidden sm:inline font-medium">Buscar ferramenta...</span>
              
              <kbd className="hidden lg:inline-flex items-center rounded-md bg-white dark:bg-[#0F172A] px-1.5 py-0.5 text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] group-hover:border-[#2563EB]/40 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors duration-150">
                Ctrl K
              </kbd>
            </button>
          )}

          {/* Botão PWA no Desktop */}
          <div className="hidden lg:block">
            <PwaInstallButton />
          </div>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Linha fina interativa com Início e Tempo de Animação Responsivos */}
      <div className="border-t border-[#E2E8F0]/80 dark:border-[#1E293B]/80 bg-[#F8FAFC]/90 dark:bg-[#0B0F19]/90 py-1.5 px-3 sm:px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 sm:gap-3">
          {/* Botão Play/Pause com Texto Efésios 2:8 */}
          <button
            onClick={() => setIsPlayingVerse((prev) => !prev)}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#2563EB] dark:text-[#38BDF8] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-[#0F172A] transition-all duration-150 cursor-pointer shrink-0 shadow-2xs"
            aria-label={isPlayingVerse ? "Pausar versículo" : "Tocar animação do versículo Efésios 2:8"}
          >
            {isPlayingVerse ? (
              <Pause className="h-3 w-3 fill-current" />
            ) : (
              <Play className="h-3 w-3 fill-current" />
            )}
            <span>Efésios 2:8</span>
          </button>

          {/* Container Responsivo com Início Imediato e Fade suave */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${
              isPlayingVerse
                ? "flex-1 max-w-[220px] xs:max-w-[280px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl opacity-100"
                : "max-w-0 opacity-0 pointer-events-none"
            }`}
          >
            {isPlayingVerse && (
              <div className="animate-verse-marquee whitespace-nowrap text-[10.5px] sm:text-xs text-[#475569] dark:text-[#CBD5E1] font-medium tracking-wide">
                &ldquo;Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] px-4 py-5 shadow-lg">
          <div className="flex flex-col gap-2 font-medium text-[#0F172A] dark:text-[#F1F5F9]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl p-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? link.activeBg
                      : "hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${link.iconColor}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {isLoaded && favorites.length > 0 && (
              <Link
                href="/#favoritos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-3 text-sm font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60"
              >
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
                  <span>Suas Ferramentas Favoritas</span>
                </div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-black">
                  {favorites.length}
                </span>
              </Link>
            )}

            {/* Botão de Atalho PWA no Menu Mobile */}
            <div className="pt-2 pb-1">
              <PwaInstallButton />
            </div>

            <hr className="my-2 border-[#E2E8F0] dark:border-[#1E293B]" />
            <Link
              href="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white px-3 py-1.5"
            >
              Sobre o Crie Grátis
            </Link>
            <Link
              href="/privacidade"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white px-3 py-1.5"
            >
              Privacidade
            </Link>
          </div>
        </div>
      )}

      {/* Spotlight Command Palette Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
