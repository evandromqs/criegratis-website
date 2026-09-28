"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Smartphone,
  Globe,
  Download,
  Sparkles,
  Layers,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

export default function DeviceMockupTool() {
  const [file, setFile] = useState<File | null>(null);
  const [deviceType, setDeviceType] = useState<"phone" | "browser">("browser");
  const [bgStyle, setBgStyle] = useState<"gradient1" | "gradient2" | "dark" | "transparent">("gradient1");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setDownloadUrl(null);
    const url = URL.createObjectURL(selectedFile);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imgRef.current = img;
      renderMockup();
    };
  };

  const renderMockup = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = 1400;
    const canvasHeight = 900;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fundo
    if (bgStyle === "gradient1") {
      const grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      grad.addColorStop(0, "#4F46E5");
      grad.addColorStop(1, "#06B6D4");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else if (bgStyle === "gradient2") {
      const grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      grad.addColorStop(0, "#F43F5E");
      grad.addColorStop(1, "#FB923C");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else if (bgStyle === "dark") {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    if (deviceType === "browser") {
      // Mockup de Navegador Web
      const mockW = 1000;
      const mockH = 650;
      const mockX = (canvasWidth - mockW) / 2;
      const mockY = (canvasHeight - mockH) / 2;
      const headerH = 44;
      const radius = 16;

      // Sombra externa
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;

      // Corpo da janela
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(mockX, mockY, mockW, mockH, radius);
      ctx.fill();
      ctx.restore();

      // Barra superior do navegador
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(mockX, mockY, mockW, headerH, [radius, radius, 0, 0]);
      ctx.fillStyle = "#F1F5F9";
      ctx.fill();

      // Botões da janela (vermelho, amarelo, verde)
      const dotY = mockY + headerH / 2;
      const dotColors = ["#EF4444", "#F59E0B", "#10B981"];
      dotColors.forEach((color, i) => {
        ctx.beginPath();
        ctx.arc(mockX + 22 + i * 16, dotY, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Campo de URL simulado
      const urlBarW = 400;
      const urlBarH = 26;
      ctx.beginPath();
      ctx.roundRect(mockX + (mockW - urlBarW) / 2, mockY + (headerH - urlBarH) / 2, urlBarW, urlBarH, 6);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#E2E8F0";
      ctx.stroke();

      ctx.fillStyle = "#64748B";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("https://seusite.com.br", mockX + mockW / 2, mockY + headerH / 2 + 4);
      ctx.restore();

      // Conteúdo: Imagem do usuário
      const contentH = mockH - headerH;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(mockX, mockY + headerH, mockW, contentH, [0, 0, radius, radius]);
      ctx.clip();
      ctx.drawImage(img, mockX, mockY + headerH, mockW, contentH);
      ctx.restore();
    } else {
      // Mockup de Smartphone (iPhone style)
      const phoneW = 380;
      const phoneH = 750;
      const phoneX = (canvasWidth - phoneW) / 2;
      const phoneY = (canvasHeight - phoneH) / 2;
      const radius = 45;

      // Sombra
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 45;
      ctx.shadowOffsetY = 25;

      // Chassi do celular (borda metálica escura)
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.roundRect(phoneX - 8, phoneY - 8, phoneW + 16, phoneH + 16, radius + 4);
      ctx.fill();
      ctx.restore();

      // Tela do celular
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(phoneX, phoneY, phoneW, phoneH, radius);
      ctx.clip();
      ctx.drawImage(img, phoneX, phoneY, phoneW, phoneH);

      // Dynamic Island / Notch
      const notchW = 110;
      const notchH = 28;
      ctx.beginPath();
      ctx.roundRect(phoneX + (phoneW - notchW) / 2, phoneY + 12, notchW, notchH, 14);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.restore();
    }

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  useEffect(() => {
    if (imgRef.current) renderMockup();
  }, [deviceType, bgStyle]);

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="image/*"
          onFileSelect={handleFile}
          maxSizeMB={25}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mockup de Telas Profissional</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Trocar Imagem
              </button>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
              {/* Tipo de Moldura */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Escolha o Dispositivo:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeviceType("browser")}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                      deviceType === "browser"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    <Globe className="w-4 h-4" /> Janela Navegador
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceType("phone")}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                      deviceType === "phone"
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "border-slate-200 bg-white dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" /> Smartphone
                  </button>
                </div>
              </div>

              {/* Cor de Fundo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Cenário de Fundo:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBgStyle("gradient1")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      bgStyle === "gradient1" ? "border-blue-600 ring-2 ring-blue-500/20" : "border-slate-200"
                    } bg-gradient-to-r from-indigo-500 to-cyan-500 text-white`}
                  >
                    Gradiente Azul
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgStyle("gradient2")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      bgStyle === "gradient2" ? "border-blue-600 ring-2 ring-blue-500/20" : "border-slate-200"
                    } bg-gradient-to-r from-rose-500 to-orange-500 text-white`}
                  >
                    Gradiente Pôr do Sol
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgStyle("dark")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      bgStyle === "dark" ? "border-blue-600 ring-2 ring-blue-500/20" : "border-slate-200"
                    } bg-slate-900 text-white`}
                  >
                    Dark Elegante
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgStyle("transparent")}
                    className={`p-2.5 rounded-lg border font-bold ${
                      bgStyle === "transparent" ? "border-blue-600 ring-2 ring-blue-500/20" : "border-slate-200"
                    } bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200`}
                  >
                    Transparente (PNG)
                  </button>
                </div>
              </div>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`mockup_${file.name}.png`}
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Baixar Mockup em Alta Resolução (PNG)
              </a>
            )}
          </div>

          {/* Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 w-full flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                Resultado em Alta Fidelidade
              </span>
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700">
                <canvas
                  ref={canvasRef}
                  className="max-h-[460px] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
