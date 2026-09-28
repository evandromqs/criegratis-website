import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { generateToolSchema, generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import FillPdfFormTool from "@/components/tools/FillPdfFormTool";

const SLUG = "preencher-formulario-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default function FillPdfFormPage() {
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
        <FillPdfFormTool />
      </ToolLayout>
    </>
  );
}
