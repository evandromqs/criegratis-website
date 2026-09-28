import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles, ChevronRight, Home, ShieldCheck } from "lucide-react";
import { BLOG_POSTS } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import MicrosoftStoreSection from "@/components/MicrosoftStoreSection";

export const metadata: Metadata = {
  title: "Blog & Tutoriais — Guias Práticos para PDF, Imagens e Produtividade",
  description: "Aprenda a assinar PDFs, criar fotos 3x4, censurar dados confidenciais com tarja preta e otimizar imagens com privacidade e segurança 100% no navegador.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog & Guias Práticos | CrieGrátis",
    description: "Tutoriais passo a passo sobre edição de documentos, fotos, segurança de dados e uso eficiente de ferramentas online gratuitas.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog do CrieGrátis",
    description: "Tutoriais e guias práticos sobre ferramentas online e produtividade digital com privacidade.",
    url: `${SITE_URL}/blog`,
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: "2026-09-28",
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Schema.org Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      {/* Hero do Blog */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A]/50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] mb-6" aria-label="Navegação estrutural">
            <Link href="/" className="hover:text-[#0F172A] dark:hover:text-white flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span>Início</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-[#0F172A] dark:text-white">Blog & Guias</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/50 px-3.5 py-1 text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Guias Práticos & Artigos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
              Blog do <span className="text-[#2563EB] dark:text-[#38BDF8]">Crie Grátis</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Tutoriais objetivos, dicas de segurança digital e guias passo a passo para você resolver tarefas burocráticas e criativas direto no navegador sem complicação.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Artigos */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-6 sm:p-7 hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 hover:shadow-lg transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${post.badgeColor}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-hidden">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E2E8F0]/80 dark:border-[#1E293B] flex items-center justify-between">
                {post.tool ? (
                  <Link
                    href={post.tool.href}
                    className="text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{post.tool.name}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">{post.publishedAt}</span>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white dark:bg-[#1E293B] dark:hover:bg-[#38BDF8] dark:hover:text-[#0F172A] text-xs font-bold px-3 py-1.5 transition-colors"
                  aria-label={`Acessar artigo ${post.title}`}
                >
                  <span>Ler post</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Seção Microsoft Store */}
      <MicrosoftStoreSection />
    </div>
  );
}
