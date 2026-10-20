import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import { NumberPdfTool, WatermarkPdfTool, PdfToJpgTool, AddTextPdfTool, PdfA4Tool } from "@/components/tools/NewPdfTools";
import { LetterheadCreatorTool, PhotoA4Tool, PhotoKbTool, SignaturePngTool, FrontBackDocumentTool } from "@/components/tools/NewDocumentTools";
import { NEW_TOOLS } from "@/lib/new-tools";
import { generateToolMetadata, generateToolSchema } from "@/lib/seo";

const widgets: Record<string, React.ComponentType> = {
  "criar-papel-timbrado": LetterheadCreatorTool,
  "numerar-paginas-pdf": NumberPdfTool,
  "marca-dagua-pdf": WatermarkPdfTool,
  "pdf-para-jpg": PdfToJpgTool,
  "adicionar-texto-pdf": AddTextPdfTool,
  "ajustar-pdf-a4": PdfA4Tool,
  "foto-3x4-folha-a4": PhotoA4Tool,
  "foto-3x4-para-inscricao": PhotoKbTool,
  "criar-assinatura-png": SignaturePngTool,
  "documento-frente-verso-pdf": FrontBackDocumentTool,
};

export function generateStaticParams() {
  return NEW_TOOLS.map((tool) => ({ utility: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ utility: string }> }): Promise<Metadata> {
  const { utility } = await params;
  const tool = NEW_TOOLS.find((item) => item.slug === utility);
  return tool ? generateToolMetadata(tool) : {};
}

export default async function NewUtilityPage({ params }: { params: Promise<{ utility: string }> }) {
  const { utility } = await params;
  const tool = NEW_TOOLS.find((item) => item.slug === utility);
  const Widget = widgets[utility];
  if (!tool || !Widget) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(tool)) }} /><ToolLayout tool={tool}><Widget /></ToolLayout></>;
}
