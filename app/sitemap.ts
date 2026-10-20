import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { BLOG_POSTS } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/es`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/ferramentas`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categorias`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/roadmap`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/novidades/novas-ferramentas-pdf-e-imagem`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacidade`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/termos`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contato`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Páginas de Categorias individuais
  CATEGORIES.forEach((cat) => {
    routes.push({
      url: `${SITE_URL}/ferramentas/${cat.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Ferramentas individuais
  TOOLS.forEach((tool) => {
    routes.push({
      url: `${SITE_URL}${tool.href}`,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Artigos do Blog
  BLOG_POSTS.forEach((post) => {
    routes.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return routes;
}
