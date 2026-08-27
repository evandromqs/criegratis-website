import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { generateToolSchema } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import WhatsAppLinkTool from "@/components/tools/WhatsAppLinkTool";

const SLUG = "gerador-link-whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
  };
}

export default function WhatsAppLinkPage() {
  const tool = getToolBySlug(SLUG);
  if (!tool) notFound();

  const schemas = generateToolSchema(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ToolLayout tool={tool}>
        <WhatsAppLinkTool />
      </ToolLayout>
    </>
  );
}
