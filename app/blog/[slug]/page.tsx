import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Home,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Share2,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { BLOG_POSTS, getPostBySlug } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import MicrosoftStoreSection from "@/components/MicrosoftStoreSection";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo Não Encontrado | Crie Grátis",
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog CrieGrátis`,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "article",
      publishedTime: "2026-09-28T00:00:00.000Z",
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting & BreadcrumbList
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: "2026-09-28T00:00:00.000Z",
    dateModified: "2026-09-28T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: post.author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-96x96.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  // Artigos relacionados (exclui o atual)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Renderizador simples de blocos de markdown para evitar dependências pesadas
  const renderContent = (rawText: string) => {
    const lines = rawText.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        elements.push(
          <p key={key} className="text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed my-4">
            {text}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (key: string) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key} className="my-4 space-y-2 text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] list-disc list-inside">
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph(`p-before-h2-${index}`);
        flushList(`list-before-h2-${index}`);
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white mt-10 mb-4 pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B]"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(`p-before-h3-${index}`);
        flushList(`list-before-h3-${index}`);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white mt-6 mb-3"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        flushParagraph(`p-before-li-${index}`);
        listItems.push(trimmed.substring(2));
      } else if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ") || trimmed.startsWith("5. ")) {
        flushParagraph(`p-before-num-${index}`);
        listItems.push(trimmed);
      } else if (trimmed === "---") {
        flushParagraph(`p-before-hr-${index}`);
        flushList(`list-before-hr-${index}`);
        elements.push(
          <hr key={`hr-${index}`} className="my-8 border-[#E2E8F0] dark:border-[#1E293B]" />
        );
      } else if (trimmed === "") {
        flushParagraph(`p-blank-${index}`);
        flushList(`list-blank-${index}`);
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("p-final");
    flushList("list-final");

    return elements;
  };

  return (
    <article className="space-y-12 pb-16">
      {/* Schema.org BlogPosting & BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([postSchema, breadcrumbSchema]),
        }}
      />

      {/* Cabeçalho do Artigo */}
      <header className="border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A]/50 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] mb-6" aria-label="Navegação estrutural">
            <Link href="/" className="hover:text-[#0F172A] dark:hover:text-white flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span>Início</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-[#0F172A] dark:hover:text-white">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-[#0F172A] dark:text-white truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${post.badgeColor}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {post.description}
          </p>

          {/* Dados do Autor */}
          <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-blue-500/20 shadow-xs shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A] dark:text-white leading-tight">
                {post.author.name}
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                {post.author.role} • 100% Client-Side
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Post */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Card CTA de Acesso Rápido à Ferramenta correspondente */}
        {post.tool && (
          <aside className="mb-8 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8]">
                <Sparkles className="h-4 w-4" />
                <span>Ferramenta Pronta no Navegador</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
                {post.tool.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                Sem cadastro, sem filas e sem enviar arquivos para a internet.
              </p>
            </div>

            <Link
              href={post.tool.href}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 dark:bg-[#38BDF8] dark:hover:bg-cyan-400 text-white dark:text-[#0F172A] px-5 py-3 text-sm font-bold shadow-xs hover:shadow-md transition-all duration-150 shrink-0 cursor-pointer"
            >
              <span>{post.tool.actionText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        )}

        {/* Artigo Estruturado */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-[#334155] dark:text-[#CBD5E1]">
          {renderContent(post.content)}
        </div>

        {/* Card Final de Ação da Ferramenta */}
        {post.tool && (
          <div className="mt-12 rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-gradient-to-br from-slate-50 to-white dark:from-[#0F172A] dark:to-[#1E293B] p-6 sm:p-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white">
              Pronto para colocar em prática?
            </h3>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-lg mx-auto">
              Utilize o <strong>{post.tool.name}</strong> agora mesmo de forma 100% gratuita, sem limite de uso e com total sigilo dos seus dados.
            </p>
            <div className="pt-2">
              <Link
                href={post.tool.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
              >
                <span>{post.tool.actionText}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Navegação entre artigos */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o Blog</span>
          </Link>

          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2563EB] dark:text-[#38BDF8] hover:underline"
          >
            <span>Explorar 70+ ferramentas</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Outros Artigos Recomendados */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h4 className="text-lg font-bold text-[#0F172A] dark:text-white mb-6">
              Você também pode gostar:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] p-5 hover:border-[#2563EB]/40 transition-colors"
                >
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${related.badgeColor}`}>
                    {related.category}
                  </span>
                  <h5 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white mt-2 leading-snug">
                    <Link href={`/blog/${related.slug}`} className="hover:text-[#2563EB] dark:hover:text-[#38BDF8]">
                      {related.title}
                    </Link>
                  </h5>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2 line-clamp-2">
                    {related.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Seção Microsoft Store */}
      <MicrosoftStoreSection />
    </article>
  );
}
