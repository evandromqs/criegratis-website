import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import Logo from "./Logo";
import FooterPixButton from "./FooterPixButton";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#0F172A] text-[#94A3B8]">
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
                Gostou do projeto? Apoie a manter os servidores rápidos e livres de anúncios.
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
              href="https://www.threads.net/@evandromqs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[#1E293B] text-[#CBD5E1] border border-[#334155] hover:border-white hover:bg-white/10 hover:text-white transition-all duration-200 shadow-xs"
              aria-label="Threads de Evandro Mqs"
              title="Threads @evandromqs"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
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
