"use client";

import React from "react";
import EmbeddedUpgradeCard from "./EmbeddedUpgradeCard";

export default function FolhaTimbradaUpgradeSection() {
  return (
    <div className="mt-8">
      <EmbeddedUpgradeCard
        toolSlug="folha-timbrada-pdf"
        title="Pacote Papel Timbrado Profissional (3 Variações)"
        description="Receba também versões com marca d'água central sutil, rodapé institucional e folha de continuação para contratos longos."
        priceLabel="R$ 4,90"
        priceCents={490}
        benefits={[
          "Versão com marca d'água central",
          "Folha de continuação automática",
          "Cabeçalho + rodapé institucional",
          "Uso ilimitado no arquivo gerado",
        ]}
        onUnlocked={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
