import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato e Suporte | Crie Grátis",
  description: "Entre em contato com a equipe do Crie Grátis para tirar dúvidas, enviar sugestões ou relatar problemas.",
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
  openGraph: {
    title: "Contato e Suporte | Crie Grátis",
    description: "Entre em contato com a equipe do Crie Grátis para tirar dúvidas, enviar sugestões ou relatar problemas.",
    url: `${SITE_URL}/contato`,
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
