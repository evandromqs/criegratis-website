import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";
import Logo from "./Logo";
import FooterPixButton from "./FooterPixButton";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#0F172A] text-[#94A3B8]">
      {/* Banner de Privacidade */}
      <div className="border-b border-[#1E293B] bg-[#020617]/50 py-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Client-Side & Privado</p>
              <p className="text-xs text-[#94A3B8]">Seus arquivos e textos são processados inteiramente no seu próprio navegador.</p>
            </div>
          </div>
          <Link
            href="/privacidade"
            className="rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2 text-xs font-semibold text-white hover:border-[#2563EB] hover:bg-[#2563EB] transition-colors shrink-0"
          >
            Saber mais
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Coluna 1: Marca & Apoio Pix */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="white" size="md" />
            </Link>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-sm">
              Ferramentas online gratuitas para todos.
            </p>

            {/* Bloco de Apoio Voluntário Pix */}
            <div className="pt-2 space-y-2.5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Heart className="h-3.5 w-3.5 fill-rose-400" />
                <span>Apoie o projeto</span>
              </div>
              
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                O Crie Grátis é gratuito para todos. Se alguma ferramenta te ajudou, você pode contribuir voluntariamente para ajudar a manter o projeto, servidores e novas ferramentas.
              </p>

              <FooterPixButton />
            </div>
          </div>

          {/* Coluna 2: Ferramentas Populares */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Populares</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/criar-qr-code" className="hover:text-white transition-colors">Criar QR Code</Link>
              </li>
              <li>
                <Link href="/comprimir-imagem" className="hover:text-white transition-colors">Comprimir Imagem</Link>
              </li>
              <li>
                <Link href="/redimensionar-imagem" className="hover:text-white transition-colors">Redimensionar Imagem</Link>
              </li>
              <li>
                <Link href="/calculadora-de-porcentagem" className="hover:text-white transition-colors">Calculadora %</Link>
              </li>
              <li>
                <Link href="/gerar-senha" className="hover:text-white transition-colors">Gerar Senha Forte</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Categorias</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/ferramentas/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/roadmap" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Roadmap (100 Ferramentas)</span>
                  <span className="rounded-full bg-blue-500/20 text-[#38BDF8] text-[10px] font-bold px-1.5 py-0.2">Novo</span>
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
              </li>
              <li>
                <a href="mailto:contato@criegratis.com.br" className="text-xs text-[#38BDF8] hover:underline font-mono">
                  contato@criegratis.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção Centralizada: Criador do Site */}
        <div className="mt-12 border-t border-[#1E293B] pt-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#334155] shadow-md shrink-0">
              <Image
                src="/evandromqs.png"
                alt="Evandro Mqs"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8]">Criado por</p>
              <p className="text-sm font-bold text-white leading-tight">Evandro Mqs</p>
            </div>
          </div>

          {/* Redes Sociais com Touch Targets Acessíveis (min 44x44px) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/evandromqs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E293B] text-[#CBD5E1] border border-[#334155] hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C] transition-all duration-200 shadow-xs"
              aria-label="Instagram de Evandro Mqs"
              title="Instagram @evandromqs"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://x.com/evandromqs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E293B] text-[#CBD5E1] border border-[#334155] hover:border-white hover:bg-white/10 hover:text-white transition-all duration-200 shadow-xs"
              aria-label="X de Evandro Mqs"
              title="X @evandromqs"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://www.threads.com/@evandromqs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E293B] text-[#CBD5E1] border border-[#334155] hover:border-white hover:bg-white/10 hover:text-white transition-all duration-200 shadow-xs"
              aria-label="Threads de Evandro Mqs"
              title="Threads @evandromqs"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 192 192" aria-hidden="true">
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2109 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.921 72.2999C81.4116 63.9723 90.3168 60.9168 97.2025 60.9168C110.155 60.9168 119.824 69.9678 120.915 88.6209C114.739 88.0834 107.962 88.0494 100.869 88.5199C71.3654 90.4764 54.764 107.411 55.7005 129.569C56.637 151.728 74.453 166.425 99.418 165.733C117.842 165.223 130.824 156.402 136.784 140.428C142.148 152.923 153.228 160.05 167.925 159.643C185.074 159.168 196.223 147.214 196.223 129.213C196.223 125.753 195.344 97.2345 141.537 88.9883ZM101.409 148.065C87.498 148.451 77.2035 140.835 76.671 128.219C76.1385 115.603 85.6415 105.109 101.761 104.04C108.647 103.583 115.19 104.225 121.177 105.518C119.508 139.117 110.603 147.811 101.409 148.065Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1E293B]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Crie Grátis. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para ser simples, rápido e gratuito.
          </p>
        </div>
      </div>
    </footer>
  );
}
