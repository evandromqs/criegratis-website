"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  QrCode as QrCodeIcon,
  Download,
  Phone,
  Sparkles,
} from "lucide-react";
import QRCode from "qrcode";

export default function WhatsAppLinkTool() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Limpa e formata número
  const cleanPhone = phone.replace(/\D/g, "");

  // Formata o número final com DDI 55 se o usuário digitar 10 ou 11 dígitos
  const formattedFullPhone = useMemo(() => {
    if (!cleanPhone) return "";
    if (cleanPhone.startsWith("55") && cleanPhone.length >= 12) {
      return cleanPhone;
    }
    return `55${cleanPhone}`;
  }, [cleanPhone]);

  const generatedLink = useMemo(() => {
    if (!formattedFullPhone) return "";
    const encodedMsg = encodeURIComponent(message.trim());
    return `https://wa.me/${formattedFullPhone}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
  }, [formattedFullPhone, message]);

  // Gera QR Code
  useEffect(() => {
    if (generatedLink && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        generatedLink,
        {
          width: 260,
          margin: 2,
          color: {
            dark: "#0F172A",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (!error && canvasRef.current) {
            setQrCodeUrl(canvasRef.current.toDataURL("image/png"));
          }
        }
      );
    }
  }, [generatedLink]);

  const copyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQrCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `whatsapp-qrcode-${cleanPhone || "link"}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulário de Configuração (7 colunas) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Telefone */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              <span>Número de WhatsApp (com DDD):</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-bold text-xs text-slate-500 border-r border-slate-300 dark:border-slate-700 pr-2.5">
                <span>🇧🇷</span>
                <span>+55</span>
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-24 pr-4 py-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Digite apenas o DDD e o número (ex: 11987654321).
            </p>
          </div>

          {/* Mensagem Personalizada */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>Mensagem Inicial (Opcional):</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Olá! Gostaria de mais informações sobre..."
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Links e Botões de Ação */}
          {generatedLink && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full font-mono text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 px-3 py-2.5 text-slate-800 dark:text-slate-200 select-all focus:outline-hidden"
                />
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 text-xs shadow-xs transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Testar Link no WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Preview Visual e QR Code (5 colunas) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 space-y-4">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 self-start">
            Pré-visualização do Balão de Conversa:
          </span>

          {/* Balão estilizado WhatsApp */}
          <div className="w-full rounded-2xl bg-[#DCF8C6] dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/60 p-4 text-slate-800 dark:text-emerald-100 text-xs sm:text-sm relative shadow-2xs">
            <p className="whitespace-pre-wrap break-words font-medium">
              {message || "Olá! Gostaria de falar com você."}
            </p>
            <div className="text-[10px] text-slate-500 dark:text-emerald-400 text-right mt-1.5 flex items-center justify-end gap-1">
              <span>12:00</span>
              <span className="text-blue-500 font-bold">✓✓</span>
            </div>
          </div>

          {/* QR Code Canvas e Download */}
          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white p-2.5 shadow-xs">
              <canvas ref={canvasRef} className="max-w-[160px] h-auto rounded-xl" />
            </div>

            {qrCodeUrl && (
              <button
                onClick={downloadQrCode}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar QR Code PNG</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
