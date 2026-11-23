"use client";

import React, { useState } from "react";
import EmbeddedUpgradeCard from "./EmbeddedUpgradeCard";

export default function Foto3x4UpgradeSection() {
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlocked = async (sessionId: string) => {
    const savedImage = localStorage.getItem("foto3x4_upgrade_image");
    if (!savedImage) {
      setError("Pagamento confirmado! Envie sua foto abaixo para aplicar o fundo branco com IA.");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/enhance-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, imageBase64: savedImage }),
      });
      const data = await res.json();
      if (!res.ok || !data.outputUrl) {
        setError(data.error || "Erro ao processar foto com IA.");
        return;
      }
      setEnhancedUrl(data.outputUrl);
    } catch {
      setError("Erro de conexão ao processar foto.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <EmbeddedUpgradeCard
        toolSlug="foto-3x4"
        title="Foto 3x4 Estúdio com IA (Fundo Branco Perfeito)"
        description="Remova o fundo automaticamente com inteligência artificial e deixe sua foto pronta para RG, CNH, Passaporte ou concurso."
        priceLabel="R$ 6,90"
        priceCents={690}
        benefits={[
          "Remoção de fundo com IA (cabelo e bordas)",
          "Fundo branco limpo padrão documento",
          "Alta resolução pronta para imprimir",
          "Sem assinatura, pagamento único",
        ]}
        onUnlocked={handleUnlocked}
      />

      {processing && (
        <p className="text-sm text-blue-600 font-medium text-center">
          Processando sua foto com IA... aguarde alguns segundos.
        </p>
      )}
      {error && <p className="text-sm text-amber-700 font-medium text-center">{error}</p>}
      {enhancedUrl && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center space-y-3">
          <p className="text-sm font-semibold text-emerald-800">Foto com fundo removido pronta!</p>
          <a
            href={enhancedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700 transition"
          >
            Baixar Foto HD Sem Fundo
          </a>
        </div>
      )}
    </div>
  );
}
