"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Eye, Globe } from "lucide-react";

export default function MetaTagsGeneratorTool() {
  const [title, setTitle] = useState<string>("Crie Grátis — Ferramentas Gratuitas e Rápidas");
  const [description, setDescription] = useState<string>(
    "Ferramentas online gratuitas para converter imagens, criar QR Code, gerar senhas fortes e calcular direto no navegador com privacidade total."
  );
  const [url, setUrl] = useState<string>("https://criegratis.com.br");
  const [image, setImage] = useState<string>("https://criegratis.com.br/opengraph-image");
  const [siteName, setSiteName] = useState<string>("Crie Grátis");
  const [twitterUser, setTwitterUser] = useState<string>("@criegratis");
  const [activePreview, setActivePreview] = useState<"google" | "whatsapp" | "twitter">("google");
  const [copied, setCopied] = useState<boolean>(false);

  const generatedHtml = `<!-- Metatags Básicas -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:site_name" content="${siteName}">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:site" content="${twitterUser}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Configuração */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Informações da Página</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Preencha os campos para gerar as tags SEO</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Título da Página (Meta Title)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={70}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600"
                />
                <div className="flex justify-end text-[10px] text-slate-400">
                  <span className={title.length > 60 ? "text-amber-500 font-bold" : ""}>{title.length}/60 chars (ideal)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Descrição (Meta Description)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={160}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600 resize-none"
                />
                <div className="flex justify-end text-[10px] text-slate-400">
                  <span className={description.length > 155 ? "text-amber-500 font-bold" : ""}>{description.length}/155 chars (ideal)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">URL Canônica do Site</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Nome do Site</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">URL da Imagem de Compartilhamento (Open Graph 1200x630)</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Usuário do Twitter/X</label>
                <input
                  type="text"
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visualizador de Preview & Código */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
            {/* Seletor de Preview */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-600" />
                Simulador Visual
              </span>

              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {[
                  { id: "google", label: "Google" },
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "twitter", label: "Twitter" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePreview(tab.id as typeof activePreview)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-center transition-all ${
                      activePreview === tab.id
                        ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulação Google */}
            {activePreview === "google" && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-950 space-y-1 text-left">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px]">G</div>
                  <span className="truncate">{url}</span>
                </div>
                <h4 className="text-base font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer truncate">
                  {title || "Título da Página"}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {description || "Descrição da página exibida nos resultados de pesquisa do Google."}
                </p>
              </div>
            )}

            {/* Simulação WhatsApp / Open Graph */}
            {activePreview === "whatsapp" && (
              <div className="max-w-sm mx-auto rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800 text-left shadow-xs">
                <div className="h-36 bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Open Graph" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block pt-1">{url.replace(/^https?:\/\//, "")}</span>
                </div>
              </div>
            )}

            {/* Simulação Twitter / X */}
            {activePreview === "twitter" && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-950 text-left shadow-xs">
                <div className="h-44 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Twitter Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-400">{url.replace(/^https?:\/\//, "")}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>
                </div>
              </div>
            )}

            {/* Código HTML */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Código HTML Gerado:</span>
              <textarea
                readOnly
                rows={8}
                value={generatedHtml}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-[11px] p-3 focus:outline-hidden leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Meta Tags Copiadas!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copiar Código HTML</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
