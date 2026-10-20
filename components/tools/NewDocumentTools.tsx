"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

const input = "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white";
const button = "min-h-11 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white disabled:opacity-50";

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("image"));
      image.src = url;
    });
  } finally { URL.revokeObjectURL(url); }
}

function cover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, zoom = 1, shiftX = 0, shiftY = 0) {
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, width, height);
  const factor = Math.max(width / image.width, height / image.height) * zoom;
  const imageWidth = image.width * factor, imageHeight = image.height * factor;
  const maxX = Math.max(0, (imageWidth - width) / 2), maxY = Math.max(0, (imageHeight - height) / 2);
  const offsetX = Math.max(-maxX, Math.min(maxX, shiftX * width / 100));
  const offsetY = Math.max(-maxY, Math.min(maxY, shiftY * height / 100));
  ctx.drawImage(image, (width - imageWidth) / 2 + offsetX, (height - imageHeight) / 2 + offsetY, imageWidth, imageHeight);
}

function useDownload() {
  const [url, setUrl] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  return { url, notice, setNotice, save: (blob: Blob) => setUrl(URL.createObjectURL(blob)), clear: () => setUrl(null) };
}

function Download({ state, filename, label = "Baixar arquivo" }: { state: ReturnType<typeof useDownload>; filename: string; label?: string }) {
  return <>{state.url && <a href={state.url} download={filename} onClick={() => state.setNotice(true)} className={`${button} inline-flex items-center`}>{label}</a>}<DownloadSuccessModal isOpen={state.notice} onClose={() => state.setNotice(false)} /></>;
}

function canvasBlob(canvas: HTMLCanvasElement, format: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("blob")), format, quality));
}

export function LetterheadCreatorTool() {
  const [logo, setLogo] = useState<File | null>(null);
  const [company, setCompany] = useState("Minha Empresa");
  const [subtitle, setSubtitle] = useState("Documentos e correspondências");
  const [contact, setContact] = useState("contato@exemplo.com · (11) 99999-9999");
  const [accent, setAccent] = useState("#2563eb");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useDownload();
  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = 840; canvas.height = 1188;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 840, 1188);
    ctx.fillStyle = accent; ctx.fillRect(60, 158, 720, 4); ctx.fillRect(60, 1082, 720, 2);
    let textX = 65;
    if (logo) {
      try {
        const image = await loadImage(logo);
        const factor = Math.min(125 / image.width, 90 / image.height);
        ctx.drawImage(image, 65, 45, image.width * factor, image.height * factor);
        textX = 210;
      } catch { throw new Error("logo"); }
    }
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 33px Arial"; ctx.fillText(company.slice(0, 38), textX, 91, 630 - textX);
    ctx.fillStyle = "#475569"; ctx.font = "19px Arial"; ctx.fillText(subtitle.slice(0, 65), textX, 121, 630 - textX);
    ctx.font = "17px Arial"; ctx.textAlign = "center"; ctx.fillText(contact.slice(0, 100), 420, 1120, 700); ctx.textAlign = "left";
  }, [logo, company, subtitle, contact, accent]);
  useEffect(() => { void draw().catch(() => setError("Não foi possível ler o logotipo. Use JPG ou PNG.")); }, [draw]);
  const generate = async () => {
    if (!company.trim()) return setError("Digite o nome que aparecerá no cabeçalho.");
    setError("");
    try { await draw(); } catch { return setError("Não foi possível ler o logotipo. Use JPG ou PNG."); }
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const r = parseInt(accent.slice(1, 3), 16), g = parseInt(accent.slice(3, 5), 16), b = parseInt(accent.slice(5, 7), 16);
    pdf.setFillColor(r, g, b); pdf.rect(15, 39, 180, 1, "F"); pdf.rect(15, 270.5, 180, 0.5, "F");
    let textX = 16;
    if (logo) {
      try {
        const image = await loadImage(logo);
        const factor = Math.min(30 / image.width, 23 / image.height);
        const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height;
        canvas.getContext("2d")?.drawImage(image, 0, 0);
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 16, 11, image.width * factor, image.height * factor);
        textX = 52;
      } catch { return setError("Não foi possível ler o logotipo. Use JPG ou PNG."); }
    }
    pdf.setTextColor(15, 23, 42); pdf.setFont("helvetica", "bold"); pdf.setFontSize(17);
    pdf.text(company.slice(0, 38), textX, 22, { maxWidth: 190 - textX });
    pdf.setTextColor(71, 85, 105); pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
    pdf.text(subtitle.slice(0, 65), textX, 31, { maxWidth: 190 - textX });
    pdf.setFontSize(9); pdf.text(contact.slice(0, 100), 105, 280, { align: "center", maxWidth: 180 });
    state.save(pdf.output("blob"));
  };
  return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1 text-sm">Nome / empresa<input value={company} onChange={(e) => { setCompany(e.target.value); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Subtítulo<input value={subtitle} onChange={(e) => { setSubtitle(e.target.value); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Contato no rodapé<input value={contact} onChange={(e) => { setContact(e.target.value); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Cor<input type="color" value={accent} onChange={(e) => { setAccent(e.target.value); state.clear(); }} className={`${input} p-1`} /></label></div><label className="block space-y-1 text-sm">Logotipo (opcional)<input type="file" accept="image/png,image/jpeg" onChange={(e) => { setLogo(e.target.files?.[0] ?? null); state.clear(); }} className={input} /></label><div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-white p-2 shadow"><canvas ref={canvasRef} aria-label="Prévia da folha timbrada A4" className="w-full" /></div>{error && <p role="alert" className="text-sm text-rose-600">{error}</p>}<div className="flex flex-wrap gap-3"><button type="button" className={button} onClick={generate}>Gerar papel timbrado</button><Download state={state} filename="papel-timbrado-a4.pdf" label="Baixar PDF" /></div><p className="text-xs text-slate-500">Para aplicar um timbre a um documento existente, use a ferramenta Folha Timbrada PDF.</p></div>;
}

function PhotoCrop({ mode }: { mode: "a4" | "kb" }) {
  const [file, setFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(1);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  const [copies, setCopies] = useState(12);
  const [maxKb, setMaxKb] = useState(200);
  const [sizeKb, setSizeKb] = useState<number | null>(null);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useDownload();
  const preview = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = 354; canvas.height = 472;
    ctx.fillStyle = "#f1f5f9"; ctx.fillRect(0, 0, 354, 472);
    if (!file) return;
    cover(ctx, await loadImage(file), 354, 472, zoom, shiftX, shiftY);
  }, [file, zoom, shiftX, shiftY]);
  useEffect(() => { void preview().catch(() => setError("Não foi possível abrir a foto. Use JPG ou PNG.")); }, [preview]);
  const generate = async () => {
    if (!file) return setError("Escolha uma foto antes de gerar.");
    try { await preview(); } catch { return setError("Não foi possível abrir a foto. Use JPG ou PNG."); }
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      if (mode === "a4") {
        const pdf = new jsPDF({ unit: "mm", format: "a4" });
        const cols = 4, rows = Math.ceil(copies / cols), gap = 4;
        const startX = (210 - cols * 30 - (cols - 1) * gap) / 2;
        const startY = (297 - rows * 40 - (rows - 1) * gap) / 2;
        const image = canvas.toDataURL("image/jpeg", 0.94);
        for (let i = 0; i < copies; i++) pdf.addImage(image, "JPEG", startX + (i % cols) * (30 + gap), startY + Math.floor(i / cols) * (40 + gap), 30, 40);
        state.save(pdf.output("blob"));
      } else {
        if (!Number.isFinite(maxKb) || maxKb < 10) return setError("Informe um limite de pelo menos 10 KB.");
        let found: Blob | null = null;
        for (const width of [354, 300, 240, 180]) {
          const resized = document.createElement("canvas"); resized.width = width; resized.height = Math.round(width * 4 / 3);
          resized.getContext("2d")?.drawImage(canvas, 0, 0, resized.width, resized.height);
          for (const quality of [0.92, 0.8, 0.68, 0.55, 0.42]) {
            const blob = await canvasBlob(resized, "image/jpeg", quality);
            if (blob.size <= maxKb * 1024) { found = blob; break; }
          }
          if (found) break;
        }
        if (!found) return setError("Não foi possível atingir o limite com qualidade mínima. Aumente o limite ou use outra foto.");
        setSizeKb(Math.round(found.size / 1024)); state.save(found);
      }
      setError("");
    } catch { setError("Não foi possível gerar o arquivo. Tente uma imagem menor."); }
  };
  return <div className="space-y-4"><label className="block space-y-1 text-sm">Foto original<input type="file" accept="image/png,image/jpeg" onChange={(e) => { setFile(e.target.files?.[0] ?? null); state.clear(); }} className={input} /></label><div className="grid gap-3 sm:grid-cols-3"><label className="space-y-1 text-sm">Zoom: {zoom.toFixed(1)}×<input type="range" min="1" max="2" step="0.05" value={zoom} onChange={(e) => { setZoom(Number(e.target.value)); state.clear(); }} className="min-h-11 w-full" /></label><label className="space-y-1 text-sm">Mover horizontal: {shiftX}%<input type="range" min="-30" max="30" value={shiftX} onChange={(e) => { setShiftX(Number(e.target.value)); state.clear(); }} className="min-h-11 w-full" /></label><label className="space-y-1 text-sm">Mover vertical: {shiftY}%<input type="range" min="-30" max="30" value={shiftY} onChange={(e) => { setShiftY(Number(e.target.value)); state.clear(); }} className="min-h-11 w-full" /></label></div><div className="mx-auto w-40 overflow-hidden rounded-xl border border-slate-200 bg-white"><canvas ref={canvasRef} aria-label="Prévia do corte 3x4" className="w-full" /></div>{mode === "a4" ? <label className="block max-w-xs space-y-1 text-sm">Quantidade de fotos<select value={copies} onChange={(e) => { setCopies(Number(e.target.value)); state.clear(); }} className={input}><option value={4}>4 fotos</option><option value={8}>8 fotos</option><option value={12}>12 fotos</option><option value={20}>20 fotos</option></select></label> : <label className="block max-w-xs space-y-1 text-sm">Tamanho máximo (KB)<input type="number" min="10" max="5000" value={maxKb} onChange={(e) => { setMaxKb(Number(e.target.value)); state.clear(); }} className={input} /></label>}{error && <p role="alert" className="text-sm text-rose-600">{error}</p>}<div className="flex flex-wrap items-center gap-3"><button type="button" onClick={generate} disabled={!file} className={button}>{mode === "a4" ? "Montar folha A4" : "Preparar JPG"}</button><Download state={state} filename={mode === "a4" ? "fotos-3x4-a4.pdf" : "foto-3x4-inscricao.jpg"} label={mode === "a4" ? "Baixar PDF A4" : "Baixar foto JPG"} /></div>{mode === "kb" && sizeKb !== null && state.url && <p className="text-sm text-emerald-700">Arquivo pronto: cerca de {sizeKb} KB.</p>}<p className="text-xs text-slate-500">{mode === "a4" ? "Imprima o PDF em tamanho real (escala 100%). As fotos têm 3 × 4 cm no papel." : "Confira as regras do formulário: limite em KB, fundo, expressão e enquadramento podem variar."}</p></div>;
}

export function PhotoA4Tool() { return <PhotoCrop mode="a4" />; }
export function PhotoKbTool() { return <PhotoCrop mode="kb" />; }

export function SignaturePngTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [color, setColor] = useState("#0f172a");
  const [hasStroke, setHasStroke] = useState(false);
  const state = useDownload();
  useEffect(() => { const canvas = canvasRef.current; if (canvas) { canvas.width = 900; canvas.height = 300; } }, []);
  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!; const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
  };
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext("2d")!; const p = point(event);
    canvas.setPointerCapture(event.pointerId); drawing.current = true; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(p.x, p.y); setHasStroke(true); state.clear();
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => { if (!drawing.current) return; const ctx = canvasRef.current?.getContext("2d"); const p = point(event); ctx?.lineTo(p.x, p.y); ctx?.stroke(); };
  const clear = () => { const canvas = canvasRef.current; canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); setHasStroke(false); state.clear(); };
  const generate = async () => { const canvas = canvasRef.current; if (canvas && hasStroke) state.save(await canvasBlob(canvas, "image/png")); };
  return <div className="space-y-4"><p className="text-sm text-slate-600 dark:text-slate-300">Desenhe com o mouse, dedo ou caneta. O fundo quadriculado é apenas uma referência visual; o PNG baixado é transparente.</p><canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} aria-label="Área para desenhar a assinatura" className="h-auto w-full touch-none rounded-xl border border-slate-300 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%,transparent_75%,#e2e8f0_75%),linear-gradient(45deg,#e2e8f0_25%,white_25%,white_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,10px_10] dark:border-slate-600" /><div className="flex flex-wrap items-end gap-3"><label className="space-y-1 text-sm">Cor da tinta<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className={`${input} w-20 p-1`} /></label><button type="button" onClick={clear} className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm">Limpar</button><button type="button" onClick={generate} disabled={!hasStroke} className={button}>Preparar PNG</button><Download state={state} filename="assinatura-transparente.png" label="Baixar PNG" /></div><p className="text-xs text-slate-500">Esta é uma imagem de assinatura, não uma assinatura digital certificada.</p></div>;
}

export function FrontBackDocumentTool() {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [layout, setLayout] = useState<"stack" | "side">("stack");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useDownload();
  const draw = useCallback(async () => {
    const canvas = canvasRef.current, ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = 794; canvas.height = 1122;
    ctx.fillStyle = "white"; ctx.fillRect(0, 0, 794, 1122);
    const images = await Promise.all([front, back].map(async (file) => file ? loadImage(file) : null));
    images.forEach((image, index) => {
      const box = layout === "stack" ? { x: 140, y: 220 + index * 340, w: 514, h: 300 } : { x: 55 + index * 350, y: 400, w: 330, h: 240 };
      ctx.strokeStyle = "#cbd5e1"; ctx.strokeRect(box.x, box.y, box.w, box.h);
      if (image) {
        const factor = Math.min(box.w / image.width, box.h / image.height);
        const width = image.width * factor, height = image.height * factor;
        ctx.drawImage(image, box.x + (box.w - width) / 2, box.y + (box.h - height) / 2, width, height);
      } else { ctx.fillStyle = "#94a3b8"; ctx.font = "20px Arial"; ctx.fillText(index === 0 ? "Frente" : "Verso", box.x + 15, box.y + 30); }
    });
  }, [front, back, layout]);
  useEffect(() => { void draw().catch(() => setError("Não foi possível ler uma das imagens.")); }, [draw]);
  const generate = async () => {
    if (!front || !back) return setError("Selecione as imagens da frente e do verso.");
    try { await draw(); const canvas = canvasRef.current; if (!canvas) return; const pdf = new jsPDF({ unit: "mm", format: "a4" }); pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 210, 297); state.save(pdf.output("blob")); setError(""); }
    catch { setError("Não foi possível gerar o PDF. Tente fotos menores em JPG ou PNG."); }
  };
  return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1 text-sm">Imagem da frente<input type="file" accept="image/jpeg,image/png" onChange={(e) => { setFront(e.target.files?.[0] ?? null); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Imagem do verso<input type="file" accept="image/jpeg,image/png" onChange={(e) => { setBack(e.target.files?.[0] ?? null); state.clear(); }} className={input} /></label></div><label className="block max-w-xs space-y-1 text-sm">Disposição<select className={input} value={layout} onChange={(e) => { setLayout(e.target.value as typeof layout); state.clear(); }}><option value="stack">Uma abaixo da outra</option><option value="side">Lado a lado</option></select></label><div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-white p-2 shadow"><canvas ref={canvasRef} aria-label="Prévia do documento frente e verso na folha A4" className="w-full" /></div>{error && <p role="alert" className="text-sm text-rose-600">{error}</p>}<div className="flex flex-wrap gap-3"><button type="button" onClick={generate} disabled={!front || !back} className={button}>Gerar PDF</button><Download state={state} filename="documento-frente-verso-a4.pdf" label="Baixar PDF" /></div><p className="text-xs text-slate-500">Confira a legibilidade e as exigências de quem receberá o documento. Esta montagem não substitui autenticação.</p></div>;
}
