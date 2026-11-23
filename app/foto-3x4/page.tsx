import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { generateToolSchema, generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import Photo3x4Tool from "@/components/tools/Photo3x4Tool";
import Foto3x4UpgradeSection from "@/components/Foto3x4UpgradeSection";

const SLUG = "foto-3x4";

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug(SLUG);
  if (!tool) return {};
  return generateToolMetadata(tool);
}

export default function Photo3x4Page() {
  const tool = getToolBySlug(SLUG);
  if (!tool) notFound();

  const schemas = generateToolSchema(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ToolLayout tool={tool} showSupportCard={false}>
        <Photo3x4Tool />
        <Foto3x4UpgradeSection />
      </ToolLayout>
    </>
  );
}
