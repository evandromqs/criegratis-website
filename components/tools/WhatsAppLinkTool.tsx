"use client";

import React, { useState, useMemo, useEffect } from "react";
import QRCode from "qrcode";
import {
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  QrCode as QrCodeIcon,
  Download,
  Phone,
  Sparkles,
  Code,
  Share2,
  Send,
  HelpCircle,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "55", label: "Brasil (+55)", flag: "🇧🇷" },
  { code: "351", label: "Portugal (+351)", flag: "🇵🇹" },
  { code: "1", label: "Estados Unidos / Canadá (+1)", flag: "🇺🇸" },
  { code: "54", label: "Argentina (+54)", flag: "🇦🇷" },
  { code: "244", label: "Angola (+244)", flag: "🇦🇴" },
  { code: "258", label: "Moçambique (+258)", flag: "🇲🇿" },
  { code: "34", label: "Espanha (+34)", flag: "🇪🇸" },
  { code: "44", label: "Reino Unido (+44)", flag: "🇬🇧" },
  { code: "39", label: "Itália (+39)", flag: "🇮🇹" },
  { code: "49", label: "Alemanha (+49)", flag: "🇩🇪" },
  { code: "598", label: "Uruguai (+598)", flag: "🇺🇾" },
  { code: "595", label: "Paraguai (+595)", flag: "🇵🇾" },
];

const MESSAGE_TEMPLATES = [
  {
    title: "Vendas & Catálogo",
    text: "Olá! Vi seus produtos no site e gostaria de saber mais informações sobre valores e formas de entrega.",
  },
  {
    title: "Agendamento",
    text: "Olá! Gostaria de consultar a disponibilidade de horários para agendamento esta semana.",
  },
  {
    title: "Orçamento",
    text: "Olá! Gostaria de solicitar um orçamento personalizado sem compromisso, por favor.",
  },
  {
    title: "Suporte / Dúvida",
    text: "Olá! Preciso de ajuda e suporte com meu pedido/serviço. Poderia me atender?",
  },
  {
    title: "Parceria / Contato",
    text: "Olá! Gostaria de conversar com o setor responsável sobre uma oportunidade de parceria.",
  },
];

export default function WhatsAppLinkTool() {
  const [selectedDdi, setSelectedDdi] = useState("55");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"link" | "html">("link");

  // Formatação visual do telefone (máscara brasileira inteligente se DDI = 55)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (selectedDdi === "55") {
      if (raw.length <= 2) {
        setPhone(raw);
      } else if (raw.length <= 6) {
        setPhone(`(${raw.slice(0, 2)}) ${raw.slice(2)}`);
      } else if (raw.length <= 10) {
        setPhone(`(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`);
      } else {
        setPhone(`(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`);
      }
    } else {
      setPhone(raw);
    }
  };

  const rawDigits = phone.replace(/\D/g, "");

  // Constrói número com DDI completo
  const fullPhoneNumber = useMemo(() => {
    if (!rawDigits) return "";
    return `${selectedDdi}${rawDigits}`;
  }, [selectedDdi, rawDigits]);

  // Links gerados
  const generatedLink = useMemo(() => {
    if (!fullPhoneNumber) return "";
    const encoded = encodeURIComponent(message.trim());
    return `https://wa.me/${fullPhoneNumber}${encoded ? `?text=${encoded}` : ""}`;
  }, [fullPhoneNumber, message]);

  // Código do Botão HTML para sites
  const htmlButtonSnippet = useMemo(() => {
    if (!generatedLink) return "";
    return `<a href="${generatedLink}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#25D366;color:#ffffff;padding:12px 24px;border-radius:12px;font-family:sans-serif;font-size:15px;font-weight:bold;text-decoration:none;box-shadow:0 2px 8px rgba(37,211,102,0.3);">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.44 19.65L5.27 16.61L5.09 16.31C4.27 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
  Falar no WhatsApp
</a>`;
  }, [generatedLink]);

  // Geração do QR Code em PNG e SVG
  useEffect(() => {
    let isMounted = true;
    if (generatedLink) {
      // PNG
      QRCode.toDataURL(generatedLink, {
        width: 500,
        margin: 2,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      })
        .then((url) => {
          if (isMounted) setQrCodeDataUrl(url);
        })
        .catch(console.error);

      // SVG
      QRCode.toString(generatedLink, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      })
        .then((svg) => {
          if (isMounted) setQrCodeSvg(svg);
        })
        .catch(console.error);
    } else {
      const timer = setTimeout(() => {
        if (isMounted) {
          setQrCodeDataUrl("");
          setQrCodeSvg("");
        }
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [generatedLink]);

  const copyToClipboard = (textToCopy: string, type: "link" | "html") => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  const downloadQrCodePng = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement("a");
    a.href = qrCodeDataUrl;
    a.download = `whatsapp-qrcode-${fullPhoneNumber || "link"}.png`;
    a.click();
  };

  const downloadQrCodeSvg = () => {
    if (!qrCodeSvg) return;
    const blob = new Blob([qrCodeSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qrcode-${fullPhoneNumber || "link"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyQrCodeImage = async () => {
    if (!qrCodeDataUrl) return;
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopiedQr(true);
      setTimeout(() => setCopiedQr(false), 2000);
    } catch {
      navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Configuração (7 Colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Entrada de Telefone com Seletor DDI */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Número do WhatsApp com DDD</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              {/* Seletor DDI */}
              <div className="sm:col-span-5">
                <select
                  value={selectedDdi}
                  onChange={(e) => setSelectedDdi(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none shadow-2xs"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input do Telefone */}
              <div className="sm:col-span-7">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={selectedDdi === "55" ? "(11) 99999-9999" : "Número com código de área"}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm sm:text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none shadow-2xs transition-all"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Exemplo Brasil: digite o DDD (ex: 11) seguido dos 9 dígitos do seu celular.
            </p>
          </div>

          {/* 2. Mensagem Personalizada */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Mensagem Pré-definida (Opcional)</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {message.length} caracteres
              </span>
            </div>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Olá! Gostaria de mais informações sobre..."
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none shadow-2xs resize-none transition-all"
            />

            {/* Modelos de Mensagens Rápidas */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Modelos Prontos de Mensagem:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {MESSAGE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.title}
                    type="button"
                    onClick={() => setMessage(tmpl.text)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 px-2.5 py-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Abas de Exportação (Link vs Código HTML) */}
          {generatedLink && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0F172A]/80 p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("link")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === "link"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Link Curto (wa.me)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("html")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === "html"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Botão HTML para Sites
                </button>
              </div>

              {activeTab === "link" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="w-full font-mono text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-slate-800 dark:text-slate-200 select-all outline-none"
                    />
                    <button
                      onClick={() => copyToClipboard(generatedLink, "link")}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shrink-0 transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedLink ? "Copiado!" : "Copiar Link"}</span>
                    </button>
                  </div>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 text-xs shadow-xs transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Testar e Abrir Conversa no WhatsApp</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    readOnly
                    value={htmlButtonSnippet}
                    className="w-full font-mono text-[11px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-slate-800 dark:text-slate-200 select-all outline-none resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => copyToClipboard(htmlButtonSnippet, "html")}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedHtml ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                      <span>{copiedHtml ? "Código Copiado!" : "Copiar Código HTML"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Painel Direito: Mockup do Chat e QR Code (5 Colunas) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-5 sm:p-6 space-y-6">
          <div className="w-full flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#334155] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Simulador do WhatsApp
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Preview em Tempo Real
            </span>
          </div>

          {/* Smartphone Chat Mockup */}
          <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-[#EFEAE2] dark:bg-[#0B141A] shadow-md">
            {/* Topo Verde WhatsApp */}
            <div className="bg-[#075E54] dark:bg-[#1F2C34] text-white px-3.5 py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-700 dark:bg-emerald-900 flex items-center justify-center font-bold text-sm text-white shadow-2xs shrink-0">
                {rawDigits ? "👤" : "💬"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs sm:text-sm truncate">
                    {phone ? `+${selectedDdi} ${phone}` : "Seu Contato / Empresa"}
                  </span>
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
                <span className="text-[10px] text-emerald-100/80 block">online</span>
              </div>
            </div>

            {/* Área de Conversa com Balão */}
            <div className="p-4 min-h-[160px] flex flex-col justify-end">
              {/* Balão do Usuário */}
              <div className="self-end max-w-[85%] rounded-2xl rounded-tr-xs bg-[#E7FFDB] dark:bg-[#005C4B] border border-emerald-300/60 dark:border-emerald-800/40 p-3 shadow-2xs">
                <p className="whitespace-pre-wrap break-words text-xs text-slate-800 dark:text-emerald-50 leading-relaxed font-normal">
                  {message || "Olá! Gostaria de conversar com você."}
                </p>
                <div className="text-[9px] text-slate-500 dark:text-emerald-300 text-right mt-1 flex items-center justify-end gap-1 font-medium">
                  <span>12:00</span>
                  <span className="text-blue-500 font-bold">✓✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card do QR Code do Link */}
          <div className="w-full flex flex-col items-center pt-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              QR Code do Link Direto:
            </span>

            <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl bg-white p-3 shadow-sm border border-slate-200">
              {qrCodeDataUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={qrCodeDataUrl}
                  alt="QR Code WhatsApp"
                  className="h-full w-full object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-300">
                  <QrCodeIcon className="h-12 w-12 mb-1" />
                  <span className="text-[11px] text-slate-400">Digite o número acima</span>
                </div>
              )}
            </div>

            {qrCodeDataUrl && (
              <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={downloadQrCodePng}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Baixar PNG</span>
                </button>
                <button
                  type="button"
                  onClick={downloadQrCodeSvg}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Baixar SVG</span>
                </button>
                <button
                  type="button"
                  onClick={copyQrCodeImage}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer shadow-2xs"
                >
                  {copiedQr ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedQr ? "Copiado!" : "Copiar Imagem"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
