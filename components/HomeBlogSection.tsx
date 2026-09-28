import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/lib/posts";

export default function HomeBlogSection() {
  // Exibimos os 3 primeiros posts na Home de forma limpa e compacta para não poluir
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 px-3 py-1 text-xs font-bold text-[#2563EB] dark:text-[#38BDF8] mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Guias & Dicas Práticas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
            Aprenda a Tirar o Máximo Proveito das Ferramentas
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
            Artigos objetivos e tutoriais passo a passo para simplificar tarefas do dia a dia.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline shrink-0"
        >
          <span>Ver todos os artigos</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-6 hover:border-[#2563EB]/40 dark:hover:border-[#38BDF8]/40 hover:shadow-md transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${post.badgeColor}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`} className="focus:outline-hidden">
                  {post.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2.5 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0]/80 dark:border-[#1E293B] flex items-center justify-between">
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
                className="text-xs font-semibold text-[#0F172A] dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                aria-label={`Ler artigo: ${post.title}`}
              >
                Ler guia →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
