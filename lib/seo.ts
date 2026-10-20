import type { Metadata } from "next";
import { ToolInfo } from "./tools";

export const SITE_URL = "https://www.criegratis.com.br";
export const SITE_NAME = "Crie Grátis";
export const DEFAULT_DESCRIPTION = "Ferramentas gratuitas para criar, converter, calcular, editar e resolver tarefas rapidamente.";

export function generateToolMetadata(tool: ToolInfo): Metadata {
  const canonicalUrl = `${SITE_URL}${tool.href}`;
  const title = `${tool.metaTitle.replace(/\s*[|—-]\s*Crie\s?Grátis$/i, "")} | ${SITE_NAME}`;
  return {
    title,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: tool.metaDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.metaDescription,
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "pt-BR",
  };
}

export function generateToolSchema(tool: ToolInfo) {
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      url: `${SITE_URL}${tool.href}`,
      description: tool.fullDescription,
      applicationCategory: "UtilityApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
    },
    {
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
          name: "Ferramentas",
          item: `${SITE_URL}/ferramentas`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tool.name,
          item: `${SITE_URL}${tool.href}`,
        },
      ],
    },
  ];

  if (tool.faqs && tool.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}
