"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";

type TemaKey = "azul" | "verde" | "preto";

interface TemaConfig {
  nome: string;
  primary: [number, number, number];
  accent: [number, number, number];
  lightBg: [number, number, number];
  lightBorder: [number, number, number];
  darkText: [number, number, number];
  hex: string;
}

const TEMAS: Record<TemaKey, TemaConfig> = {
  azul: {
    nome: "Azul (Tema do Site)",
    primary: [37, 99, 235],
    accent: [56, 189, 248],
    lightBg: [239, 246, 255],
    lightBorder: [191, 219, 254],
    darkText: [29, 78, 216],
    hex: "#2563EB",
  },
  verde: {
    nome: "Verde Pix",
    primary: [5, 150, 105],
    accent: [52, 211, 153],
    lightBg: [236, 253, 245],
    lightBorder: [167, 243, 208],
    darkText: [4, 120, 87],
    hex: "#059669",
  },
  preto: {
    nome: "Preto Clássico",
    primary: [15, 23, 42],
    accent: [56, 189, 248],
    lightBg: [241, 245, 249],
    lightBorder: [203, 213, 225],
    darkText: [15, 23, 42],
    hex: "#0F172A",
  },
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function generateRoundedQrDataUrl(text: string, primaryHex: string): string {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const margin = 2;
  const canvasSize = 1000;
  const cell = canvasSize / (size + margin * 2);
  const offset = margin * cell;

  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const isFinderZone = (r: number, c: number) =>
    (r < 7 && c < 7) ||
    (r < 7 && c >= size - 7) ||
    (r >= size - 7 && c < 7);

  ctx.fillStyle = "#0F172A";
  const inset = cell * 0.08;
  const dotSize = cell - inset * 2;
  const dotRadius = cell * 0.34;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isFinderZone(r, c)) continue;
      if (qr.modules.get(r, c)) {
        drawRoundedRect(
          ctx,
          offset + c * cell + inset,
          offset + r * cell + inset,
          dotSize,
          dotSize,
          dotRadius
        );
        ctx.fill();
      }
    }
  }

  const corners: [number, number][] = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  for (const [col, row] of corners) {
    const fx = offset + col * cell;
    const fy = offset + row * cell;

    ctx.fillStyle = "#0F172A";
    drawRoundedRect(ctx, fx, fy, 7 * cell, 7 * cell, 1.6 * cell);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    drawRoundedRect(ctx, fx + cell, fy + cell, 5 * cell, 5 * cell, 1.0 * cell);
    ctx.fill();

    ctx.fillStyle = primaryHex;
    drawRoundedRect(ctx, fx + 2 * cell, fy + 2 * cell, 3 * cell, 3 * cell, 0.75 * cell);
    ctx.fill();
  }

  return canvas.toDataURL("image/png");
}

export default function PlacaPixPdfPage() {
  const [nome, setNome] = useState("");
  const [chave, setChave] = useState("");
  const [banco, setBanco] = useState("");
  const [mensagem, setMensagem] = useState("Aponte a câmera do seu celular para pagar");
  const [tema, setTema] = useState<TemaKey>("azul");
  const [gerando, setGerando] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chave.trim()) return;
    setGerando(true);
    try {
      const theme = TEMAS[tema];
      const qrDataUrl = generateRoundedQrDataUrl(chave.trim(), theme.hex);
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      // Moldura externa sutil para corte/impressão limpa em A4
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.8);
      doc.roundedRect(7, 7, 196, 283, 7, 7, "S");

      // Banner superior principal com presença marcante
      doc.setFillColor(...theme.primary);
      doc.rect(0, 0, 210, 58, "F");

      // Faixa de destaque inferior do cabeçalho
      doc.setFillColor(...theme.accent);
      doc.rect(0, 58, 210, 4, "F");

      // Pill superior no cabeçalho com tipografia padronizada e legível
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(42, 9, 126, 12.5, 6.25, 6.25, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(...theme.darkText);
      doc.text("PAGAMENTO INSTANTÂNEO", 105, 17.5, { align: "center" });

      // Título principal em destaque - Pague com Pix
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(50);
      doc.text("PAGUE COM PIX", 105, 47, { align: "center" });

      // Nome do estabelecimento / recebedor em tamanho grande e legível de longe
      const nomeTexto = nome.trim() || "Recebedor";
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(nomeTexto.length > 26 ? 28 : nomeTexto.length > 18 ? 34 : 42);
      doc.text(nomeTexto, 105, 78, { align: "center" });

      // Banco / instituição opcional em badge estilizado e de fácil leitura
      if (banco.trim()) {
        const bancoTexto = banco.trim();
        const pillWidth = Math.min(160, Math.max(72, bancoTexto.length * 6.2 + 28));
        doc.setFillColor(...theme.lightBg);
        doc.setDrawColor(...theme.lightBorder);
        doc.setLineWidth(0.8);
        doc.roundedRect(105 - pillWidth / 2, 85, pillWidth, 14.5, 7.25, 7.25, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(...theme.darkText);
        doc.text(bancoTexto, 105, 95.5, { align: "center" });
      }

      // Card do QR Code com bordas curvas e área ampla para leitura rápida
      const qrTop = banco.trim() ? 104 : 94;
      const qrBoxSize = 116;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...theme.primary);
      doc.setLineWidth(1.8);
      doc.roundedRect(105 - qrBoxSize / 2, qrTop, qrBoxSize, qrBoxSize, 10, 10, "FD");
      doc.addImage(qrDataUrl, "PNG", 105 - (qrBoxSize - 10) / 2, qrTop + 5, qrBoxSize - 10, qrBoxSize - 10);

      // Caixa de destaque da Chave Pix com fonte aumentada para leitura em balcão
      const chaveBoxTop = qrTop + qrBoxSize + 6;
      doc.setFillColor(...theme.lightBg);
      doc.setDrawColor(...theme.primary);
      doc.setLineWidth(1.4);
      doc.roundedRect(12, chaveBoxTop, 186, 36, 8, 8, "FD");

      // Rótulo CHAVE PIX
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(...theme.darkText);
      doc.text("CHAVE PIX", 105, chaveBoxTop + 12.5, { align: "center" });

      // Valor da Chave Pix em tamanho grande e destacado
      const chaveTexto = chave.trim();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(chaveTexto.length > 32 ? 20 : chaveTexto.length > 24 ? 24 : 29);
      doc.setTextColor(15, 23, 42);
      doc.text(chaveTexto, 105, chaveBoxTop + 27, { align: "center" });

      // Instrução no rodapé em tamanho ampliado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);
      doc.text(mensagem.trim(), 105, chaveBoxTop + 48, { align: "center" });

      // Faixa inferior elegante com branding do site
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 279, 210, 18, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(248, 250, 252);
      doc.text("criegratis.com.br • Gerador Gratuito de Placa Pix", 105, 291, { align: "center" });

      doc.save("placa-pix-criegratis.pdf");
    } finally {
      setGerando(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <QrCode className="h-4 w-4" />
          <span>100% Gratuito no Navegador</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerador de Placa Pix em PDF</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Crie uma placa Pix A4 com QR Code pronta para imprimir e colocar no balcão.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Nome do Estabelecimento ou Recebedor</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Padaria Central LTDA"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Chave Pix *</label>
          <input
            type="text"
            required
            value={chave}
            onChange={(e) => setChave(e.target.value)}
            placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Banco / Instituição (opcional)</label>
          <input
            type="text"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            placeholder="Ex: Nubank, Mercado Pago, Banco do Brasil"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Mensagem no rodapé</label>
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Cor da Placa</label>
          <div className="grid grid-cols-3 gap-2.5">
            {(Object.keys(TEMAS) as TemaKey[]).map((key) => {
              const t = TEMAS[key];
              const active = tema === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTema(key)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: t.hex }}
                  />
                  <span className="truncate">{key === "azul" ? "Azul Site" : key === "verde" ? "Verde Pix" : "Preto"}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={gerando}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition cursor-pointer disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          <span>{gerando ? "Gerando PDF..." : "Baixar Placa Pix em PDF"}</span>
        </button>
      </form>
    </div>
  );
}
