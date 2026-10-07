import React from "react";
import type { Metadata } from "next";
import InternationalHome from "@/components/InternationalHome";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Crie Grátis — 70+ Free Online In-Browser Utility & PDF Tools",
  description:
    "Free tools to merge and sign PDFs, generate QR codes, compress images, passport photos and more. 100% client-side in your browser with total privacy.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "pt-BR": SITE_URL,
      es: `${SITE_URL}/es`,
      en: `${SITE_URL}/en`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "Crie Grátis — Free Online Productivity Tools",
    description:
      "Client-side PDF suite, image compression, QR codes, password generators and calculators. Fast, private and free forever.",
    url: `${SITE_URL}/en`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishHomePage() {
  return <InternationalHome locale="en" />;
}
