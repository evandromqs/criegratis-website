import React from "react";
import type { Metadata } from "next";
import InternationalHome from "@/components/InternationalHome";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Crie Grátis — Más de 70 Herramientas Online Gratuitas y 100% en el Navegador",
  description:
    "Herramientas gratuitas para unir y firmar PDF, generar códigos QR, comprimir imágenes, fotos para documentos y más. 100% en tu navegador con privacidad total.",
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      "pt-BR": SITE_URL,
      es: `${SITE_URL}/es`,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "Crie Grátis — Herramientas Online Gratuitas",
    description:
      "Edición de PDF, compresión de imágenes, códigos QR y calculadoras sin enviar archivos a internet. Rápido, seguro y gratis.",
    url: `${SITE_URL}/es`,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default function SpanishHomePage() {
  return <InternationalHome locale="es" />;
}
