import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { generateToolSchema, generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import WhatsAppLinkTool from "@/components/tools/WhatsAppLinkTool";

const SLUG = "gerador-link-whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return generateToolMetadata(tool);
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
