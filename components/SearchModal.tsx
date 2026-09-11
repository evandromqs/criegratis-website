"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Search, ArrowRight, X, TrendingUp } from "lucide-react";
import { searchTools, ToolInfo, TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolInfo[]>([]);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Bloqueia o scroll de fundo do body ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setResults(searchTools(val));
    } else {
      setResults([]);
    }
  };

  if (!isOpen || !mounted) return null;

  const popularTools = TOOLS.slice(0, 6);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-slate-950/50 dark:bg-black/75 p-3 pt-4 sm:pt-10 backdrop-blur-xs transition-opacity duration-150 w-screen max-w-full h-screen h-[100dvh] overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] shadow-2xl transition-all my-auto sm:my-0">
        <h2 id="search-modal-title" className="sr-only">
          Buscar Ferramentas Crie Grátis
        </h2>

        {/* Barra de Entrada Spotlight */}
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] dark:border-[#334155] px-4 sm:px-5 py-3.5 bg-white dark:bg-[#1E293B]">
          <Search className="h-5 w-5 text-[#2563EB] dark:text-[#38BDF8] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="O que você precisa hoje? (ex: QR Code, JPG, Senha, %...)"
            aria-label="Buscar ferramenta por nome ou utilidade"
            className="flex-1 bg-transparent text-[#0F172A] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#64748B] text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                inputRef.current?.focus();
              }}
              type="button"
              className="flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Limpar campo de busca"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={onClose}
              type="button"
              className="flex min-h-[36px] items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-2.5 py-1 text-xs font-semibold text-[#475569] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar busca (ESC)"
            >
              ESC
            </button>
          )}
        </div>

        {/* Conteúdo: Resultados ou Sugestões */}
        <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {query.trim() !== "" ? (
            /* Lista de Resultados */
            results.length > 0 ? (
              <div className="space-y-1.5">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                  {results.length} {results.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
                </div>
                {results.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl p-3 hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#334155] transition-all group min-h-[44px]"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-1 mt-0.5">
                        {tool.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0 ml-2" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
                  Nenhuma ferramenta encontrada para &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Tente buscar por termos genéricos como: imagem, jpg, senha, texto ou porcentagem.
                </p>
              </div>
            )
          ) : (
            /* Sugestões Rápidas (Populares + Categorias) */
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#38BDF8]" aria-hidden="true" />
                  <span>Mais Acessadas</span>
                </div>
                <div className="mt-1 space-y-1">
                  {popularTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#334155] transition-all group min-h-[44px]"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-1">
                          {tool.shortDescription}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8]">
                  Categorias
                </div>
                <div className="mt-2 flex flex-wrap gap-2 px-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/ferramentas/${cat.slug}`}
                      onClick={onClose}
                      className="rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] px-3.5 py-2 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors min-h-[36px] inline-flex items-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] px-4 sm:px-5 py-2.5 text-xs text-[#475569] dark:text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded bg-white dark:bg-[#1E293B] px-1.5 py-0.5 text-[10px] font-mono border border-[#E2E8F0] dark:border-[#334155]">
              ESC
            </kbd>
            fechar
          </span>
          <span className="font-medium text-[#2563EB] dark:text-[#38BDF8]">Crie Grátis</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
