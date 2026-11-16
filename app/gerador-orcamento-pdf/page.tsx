import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { generateToolSchema, generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import QuoteGeneratorPdfTool from "@/components/tools/QuoteGeneratorPdfTool";

const SLUG = "gerador-orcamento-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default function QuoteGeneratorPdfPage() {
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
        <QuoteGeneratorPdfTool />
      </ToolLayout>
    </>
  );
}
