"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import QRCode from "qrcode";
import {
  QrCode as QrIcon,
  Link2,
  FileText,
  Wifi,
  Mail,
  Phone,
  DollarSign,
  Download,
  Copy,
  Check,
  Palette,
  Sparkles,
  Sliders,
  Maximize2,
} from "lucide-react";

type QrType = "url" | "text" | "wifi" | "pix" | "email" | "phone";

const COLOR_PRESETS = [
  { label: "Preto Clássico", dark: "#0F172A", light: "#FFFFFF" },
  { label: "Azul Profissional", dark: "#1E40AF", light: "#FFFFFF" },
  { label: "Verde Esmeralda", dark: "#065F46", light: "#FFFFFF" },
  { label: "Roxo Moderno", dark: "#5B21B6", light: "#FFFFFF" },
  { label: "Vermelho Rubi", dark: "#991B1B", light: "#FFFFFF" },
  { label: "Cinza Grafite", dark: "#334155", light: "#F8FAFC" },
];

export default function QrCodeTool() {
  const [activeType, setActiveType] = useState<QrType>("url");

  // Campos dos Tipos de QR Code
  const [urlValue, setUrlValue] = useState("https://criegratis.com.br");
  const [textValue, setTextValue] = useState("");
  
  // Wi-Fi
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  // Pix
  const [pixKey, setPixKey] = useState("");
  const [pixName, setPixName] = useState("");
  const [pixCity, setPixCity] = useState("");

  // E-mail
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Telefone
  const [phoneNumber, setPhoneNumber] = useState("");

  // Customizações Visuais
  const [darkColor, setDarkColor] = useState("#0F172A");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [downloadSize, setDownloadSize] = useState(600);

  // Estados de Output
  const [dataUrl, setDataUrl] = useState<string>("");
  const [svgString, setSvgString] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computa o payload do QR Code de acordo com o tipo ativo
  const rawQrPayload = useMemo(() => {
    switch (activeType) {
      case "url":
        return urlValue.trim();

      case "text":
        return textValue.trim();

      case "wifi":
        if (!wifiSsid.trim()) return "";
        const enc = wifiEncryption === "nopass" ? "nopass" : wifiEncryption;
        return `WIFI:T:${enc};S:${wifiSsid.trim()};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};;`;

      case "pix":
        // Payload simples ou chave direta
        if (!pixKey.trim()) return "";
        return pixKey.trim();

      case "email":
        if (!emailTo.trim()) return "";
        const params: string[] = [];
        if (emailSubject) params.push(`subject=${encodeURIComponent(emailSubject)}`);
        if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
        return `mailto:${emailTo.trim()}${params.length > 0 ? `?${params.join("&")}` : ""}`;

      case "phone":
        const cleanDigits = phoneNumber.replace(/\D/g, "");
        if (!cleanDigits) return "";
        return `tel:+${cleanDigits.startsWith("55") ? cleanDigits : `55${cleanDigits}`}`;

      default:
        return "";
    }
  }, [
    activeType,
    urlValue,
    textValue,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    pixKey,
    emailTo,
    emailSubject,
    emailBody,
    phoneNumber,
  ]);

  // Gera o QR Code em PNG e SVG
  useEffect(() => {
    let isMounted = true;
    const payload = rawQrPayload;

    if (!payload) {
      const timer = setTimeout(() => {
        if (isMounted) {
          setDataUrl("");
          setSvgString("");
          setError(null);
        }
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    const options = {
      width: downloadSize,
      margin: 2,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: darkColor,
        light: lightColor,
      },
    };

    // Gera PNG
    QRCode.toDataURL(payload, options)
      .then((url) => {
        if (isMounted) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Erro ao gerar PNG:", err);
        if (isMounted) {
          setError("Texto muito longo para a resolução e nível de correção de erro selecionados.");
        }
      });

    // Gera SVG
    QRCode.toString(payload, { ...options, type: "svg" })
      .then((svg) => {
        if (isMounted) {
          setSvgString(svg);
        }
      })
      .catch((err) => {
        console.error("Erro ao gerar SVG:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [rawQrPayload, darkColor, lightColor, errorCorrection, downloadSize]);

  // Download PNG
  const handleDownloadPng = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode-${activeType}-${downloadSize}px.png`;
    link.click();
  };

  // Download SVG
  const handleDownloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${activeType}-vetor.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copiar Imagem para o Clipboard
  const handleCopyImage = async () => {
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } catch (err) {
      console.warn("Não foi possível copiar imagem diretamente, copiando link:", err);
      navigator.clipboard.writeText(rawQrPayload);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Copiar Conteúdo de Texto
  const handleCopyText = () => {
    if (!rawQrPayload) return;
    navigator.clipboard.writeText(rawQrPayload);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Abas de Tipos de QR Code */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E2E8F0] dark:border-[#334155]">
        {[
          { id: "url", label: "Link / URL", icon: Link2 },
          { id: "text", label: "Texto Livre", icon: FileText },
          { id: "wifi", label: "Rede Wi-Fi", icon: Wifi },
          { id: "pix", label: "Chave Pix", icon: DollarSign },
          { id: "email", label: "E-mail", icon: Mail },
          { id: "phone", label: "Telefone", icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id as QrType)}
              type="button"
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-[#475569] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0F172A] dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Painel Esquerdo: Entrada de Dados e Customização */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Formulário Específico por Tipo */}
          <div className="space-y-4">
            {activeType === "url" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  URL de Destino
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="https://seusite.com.br"
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] shadow-inner focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                  Ao escanear com a câmera do celular, o visitante será redirecionado automaticamente para o site.
                </p>
              </div>
            )}

            {activeType === "text" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Mensagem ou Texto Livre
                </label>
                <textarea
                  rows={4}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Escreva qualquer texto, cupom promocional, aviso ou anotação..."
                  className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] shadow-inner focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:bg-white dark:focus:bg-[#0F172A] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all resize-none"
                />
              </div>
            )}

            {activeType === "wifi" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Nome da Rede (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Ex: MinhaCasa_5G ou Loja_Clientes"
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Senha do Wi-Fi
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="Senha da rede..."
                      className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Criptografia
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value)}
                      className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3 (Padrão)</option>
                      <option value="WEP">WEP (Antigo)</option>
                      <option value="nopass">Sem Senha (Rede Aberta)</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Rede Wi-Fi Oculta (Hidden SSID)</span>
                </label>
              </div>
            )}

            {activeType === "pix" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Chave Pix ou Código Copia e Cola
                  </label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="Chave CPF, CNPJ, E-mail, Celular ou Código Pix..."
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                  Dica: Você pode colar tanto sua chave Pix direta quanto o código completo copia e cola gerado no app do seu banco.
                </p>
              </div>
            )}

            {activeType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    E-mail do Destinatário
                  </label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="contato@empresa.com"
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Assunto Pré-definido
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Orçamento / Dúvida..."
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Mensagem Inicial (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Olá, gostaria de saber mais sobre..."
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {activeType === "phone" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Número de Telefone (com DDD)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-slate-500 border-r border-slate-300 dark:border-slate-700 pr-2.5">
                    <span>🇧🇷</span>
                    <span>+55</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] pl-24 pr-4 py-3.5 text-sm font-medium text-[#0F172A] dark:text-white placeholder-[#94A3B8] focus:border-[#2563EB] dark:focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Customização de Cores e Estilo */}
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A]/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <Palette className="h-4 w-4 text-blue-500" />
                <span>Personalização Visual</span>
              </span>
            </div>

            {/* Presets de Cor */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                Paletas Rápidas:
              </span>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = darkColor === preset.dark && lightColor === preset.light;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setDarkColor(preset.dark);
                        setLightColor(preset.light);
                      }}
                      type="button"
                      className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-2xs font-bold"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: preset.dark }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seletor Customizado HEX */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Cor do QR Code:
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="h-7 w-7 rounded-lg border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-full font-mono text-xs font-bold text-slate-900 dark:text-white uppercase bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Cor do Fundo:
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                  <input
                    type="color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="h-7 w-7 rounded-lg border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-full font-mono text-xs font-bold text-slate-900 dark:text-white uppercase bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Configurações de Qualidade e Correção */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-800/80">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Resolução para Download:
                </label>
                <select
                  value={downloadSize}
                  onChange={(e) => setDownloadSize(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value={400}>400x400 px (Tela / Web)</option>
                  <option value={600}>600x600 px (HD - Recomendado)</option>
                  <option value={1200}>1200x1200 px (Ultra HD / Impressão)</option>
                  <option value={2000}>2000x2000 px (Gráfica / Cartaz)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Resistência a Danos (Error Correction):
                </label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="L">L (7% de recuperação - mais simples)</option>
                  <option value="M">M (15% de recuperação - Padrão)</option>
                  <option value="Q">Q (25% de recuperação)</option>
                  <option value="H">H (30% de recuperação - Impressos)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Direito: Preview em Tempo Real e Ações */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between rounded-3xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-6 text-center space-y-6">
          <div className="w-full flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#334155] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
              Preview do QR Code
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ao Vivo
            </span>
          </div>

          {/* Card do QR Code com Sombra Suave */}
          <div
            className="relative flex h-64 w-64 items-center justify-center rounded-2xl p-4 shadow-md transition-all duration-200 border"
            style={{ backgroundColor: lightColor, borderColor: "#E2E8F0" }}
          >
            {dataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={dataUrl}
                alt="QR Code Gerado"
                className="h-full w-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <QrIcon className="h-16 w-16 mb-2 stroke-1" />
                <span className="text-xs">Digite as informações para gerar</span>
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>
          )}

          {/* Botões de Ação */}
          <div className="space-y-3 w-full">
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={handleDownloadPng}
                disabled={!dataUrl}
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-white px-4 py-3 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Download className="h-4 w-4" />
                <span>Baixar PNG</span>
              </button>

              <button
                onClick={handleDownloadSvg}
                disabled={!svgString}
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-800 dark:text-white px-4 py-3 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Download className="h-4 w-4" />
                <span>Baixar SVG (Vetor)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={handleCopyImage}
                disabled={!dataUrl}
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 px-3 py-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {copiedImage ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedImage ? "Imagem Copiada!" : "Copiar Imagem"}</span>
              </button>

              <button
                onClick={handleCopyText}
                disabled={!rawQrPayload}
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 px-3 py-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? "Copiado!" : "Copiar Conteúdo"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
