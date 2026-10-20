"use client";

import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import Image from "next/image";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

const input = "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white";
const action = "min-h-11 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50";

function useResult() {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(false);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  const save = (bytes: Uint8Array | Blob, type = "application/pdf") => {
    const blob = bytes instanceof Blob ? bytes : new Blob([Uint8Array.from(bytes)], { type });
    setUrl(URL.createObjectURL(blob));
  };
  return { url, error, setError, busy, setBusy, notice, setNotice, save, clear: () => { setUrl(null); setError(""); } };
}

function FileInput({ onChange }: { onChange: (file: File | null) => void }) {
  return <label className="block space-y-1 text-sm font-semibold">Arquivo PDF<input type="file" accept="application/pdf,.pdf" onChange={(e) => onChange(e.target.files?.[0] ?? null)} className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:font-bold file:text-blue-700`} /></label>;
}

function Result({ state, filename, image = false }: { state: ReturnType<typeof useResult>; filename: string; image?: boolean }) {
  return <>
    {state.error && <p role="alert" className="text-sm text-rose-600">{state.error}</p>}
    {state.url && <div className="space-y-3"><p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Arquivo pronto para conferir e baixar.</p>{image ? <Image src={state.url} width={1200} height={1600} unoptimized alt="Prévia da página convertida" className="max-h-80 max-w-full rounded-xl border border-slate-200 object-contain" /> : <iframe title="Prévia do PDF gerado" src={state.url} className="h-72 w-full rounded-xl border border-slate-200 bg-white" />}<a className={`${action} inline-flex items-center`} href={state.url} download={filename} onClick={() => state.setNotice(true)}>Baixar {image ? "imagem" : "PDF"}</a></div>}
    <DownloadSuccessModal isOpen={state.notice} onClose={() => state.setNotice(false)} />
  </>;
}

export function NumberPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [start, setStart] = useState(1);
  const [position, setPosition] = useState<"left" | "center" | "right">("center");
  const state = useResult();
  const generate = async () => {
    if (!file || !Number.isInteger(start) || start < 0) return state.setError("Escolha um PDF e um número inicial válido.");
    state.setBusy(true); state.clear();
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      pdf.getPages().forEach((page, index) => {
        const text = String(start + index);
        const size = 11;
        const width = font.widthOfTextAtSize(text, size);
        const x = position === "left" ? 32 : position === "right" ? page.getWidth() - width - 32 : (page.getWidth() - width) / 2;
        page.drawText(text, { x, y: 22, size, font, color: rgb(0.22, 0.27, 0.35) });
      });
      state.save(await pdf.save());
    } catch { state.setError("Não foi possível numerar este PDF. Verifique se o arquivo está íntegro e sem senha."); }
    finally { state.setBusy(false); }
  };
  return <div className="space-y-4"><FileInput onChange={(value) => { setFile(value); state.clear(); }} /><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1 text-sm">Começar em<input type="number" min="0" value={start} onChange={(e) => { setStart(Number(e.target.value)); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Posição no rodapé<select value={position} onChange={(e) => { setPosition(e.target.value as typeof position); state.clear(); }} className={input}><option value="left">Esquerda</option><option value="center">Centro</option><option value="right">Direita</option></select></label></div><button className={action} type="button" disabled={!file || state.busy} onClick={generate}>{state.busy ? "Numerando…" : "Numerar PDF"}</button><Result state={state} filename="pdf-numerado.pdf" /></div>;
}

export function WatermarkPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("RASCUNHO");
  const [opacity, setOpacity] = useState(25);
  const [color, setColor] = useState("#64748b");
  const state = useResult();
  const generate = async () => {
    if (!file || !text.trim()) return state.setError("Escolha um PDF e digite o texto da marca d'água.");
    state.setBusy(true); state.clear();
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const clean = color.replace("#", "");
      const ink = rgb(parseInt(clean.slice(0, 2), 16) / 255, parseInt(clean.slice(2, 4), 16) / 255, parseInt(clean.slice(4, 6), 16) / 255);
      pdf.getPages().forEach((page) => {
        const size = Math.min(56, Math.max(20, page.getWidth() / Math.max(10, text.length * 0.8)));
        const width = font.widthOfTextAtSize(text, size);
        page.drawText(text, { x: (page.getWidth() - width * 0.7) / 2, y: page.getHeight() / 2, size, font, color: ink, opacity: opacity / 100, rotate: degrees(-25) });
      });
      state.save(await pdf.save());
    } catch { state.setError("Falha ao gerar o PDF. Verifique a senha do arquivo e use texto comum, sem emojis."); }
    finally { state.setBusy(false); }
  };
  return <div className="space-y-4"><FileInput onChange={(value) => { setFile(value); state.clear(); }} /><label className="block space-y-1 text-sm">Texto da marca d&apos;água<input value={text} onChange={(e) => { setText(e.target.value); state.clear(); }} maxLength={60} className={input} /></label><div className="grid gap-3 sm:grid-cols-2"><label className="space-y-1 text-sm">Opacidade: {opacity}%<input type="range" min="10" max="70" value={opacity} onChange={(e) => { setOpacity(Number(e.target.value)); state.clear(); }} className="min-h-11 w-full" /></label><label className="space-y-1 text-sm">Cor<input type="color" value={color} onChange={(e) => { setColor(e.target.value); state.clear(); }} className={`${input} p-1`} /></label></div><p className="text-xs text-slate-500">A marca é visual e não impede edição ou cópia do conteúdo.</p><button className={action} type="button" disabled={!file || state.busy} onClick={generate}>{state.busy ? "Aplicando…" : "Aplicar marca d'água"}</button><Result state={state} filename="pdf-com-marca-dagua.pdf" /></div>;
}

export function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [scale, setScale] = useState(1.5);
  const state = useResult();
  const choose = async (selected: File | null) => {
    setFile(selected); setCount(0); setPage(1); state.clear();
    if (!selected) return;
    try { const pdf = await PDFDocument.load(await selected.arrayBuffer()); setCount(pdf.getPageCount()); }
    catch { state.setError("Não foi possível abrir o PDF. Verifique se ele está sem senha."); }
  };
  const generate = async () => {
    if (!file || !count) return;
    state.setBusy(true); state.clear();
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const pdf = await loadingTask.promise;
      const selected = await pdf.getPage(page);
      const viewport = selected.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("canvas");
      if (format === "jpeg") { context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height); }
      await selected.render({ canvas, canvasContext: context, viewport }).promise;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, `image/${format}`, 0.9));
      if (!blob) throw new Error("blob");
      state.save(blob);
      await loadingTask.destroy();
    } catch { state.setError("Não foi possível converter a página. Tente um PDF menor ou outra página."); }
    finally { state.setBusy(false); }
  };
  return <div className="space-y-4"><FileInput onChange={choose} /><div className="grid gap-3 sm:grid-cols-3"><label className="space-y-1 text-sm">Página (1 a {count || "…"})<input type="number" min="1" max={count || 1} value={page} onChange={(e) => { setPage(Number(e.target.value)); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Formato<select value={format} onChange={(e) => { setFormat(e.target.value as typeof format); state.clear(); }} className={input}><option value="jpeg">JPG</option><option value="png">PNG</option></select></label><label className="space-y-1 text-sm">Resolução<select value={scale} onChange={(e) => { setScale(Number(e.target.value)); state.clear(); }} className={input}><option value={1}>Padrão</option><option value={1.5}>Alta</option><option value={2}>Muito alta</option></select></label></div><p className="text-xs text-slate-500">Cada conversão salva uma página. Imagens em resolução alta podem ocupar mais memória.</p><button className={action} type="button" disabled={!file || !count || page < 1 || page > count || state.busy} onClick={generate}>{state.busy ? "Convertendo…" : "Converter página"}</button><Result state={state} filename={`pagina-${page}.${format === "jpeg" ? "jpg" : "png"}`} image /></div>;
}

export function AddTextPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [size, setSize] = useState(16);
  const state = useResult();
  const choose = async (selected: File | null) => {
    setFile(selected); setCount(0); state.clear();
    if (!selected) return;
    try { setCount((await PDFDocument.load(await selected.arrayBuffer())).getPageCount()); }
    catch { state.setError("Não foi possível abrir o PDF. Verifique se ele está sem senha."); }
  };
  const generate = async () => {
    if (!file || !text.trim() || page < 1 || page > count) return state.setError("Informe um texto e uma página válida.");
    state.setBusy(true); state.clear();
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const target = pdf.getPage(page - 1);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      target.drawText(text.trim(), { x: target.getWidth() * x / 100, y: target.getHeight() * (1 - y / 100) - size, size, font, color: rgb(0, 0, 0), lineHeight: size * 1.3, maxWidth: target.getWidth() * (1 - x / 100) - 10 });
      state.save(await pdf.save());
    } catch { state.setError("Não foi possível adicionar o texto. Retire emojis e confira o arquivo PDF."); }
    finally { state.setBusy(false); }
  };
  return <div className="space-y-4"><FileInput onChange={choose} /><label className="block space-y-1 text-sm">Texto<textarea rows={3} value={text} onChange={(e) => { setText(e.target.value); state.clear(); }} className={input} placeholder="Digite o texto que será inserido" /></label><div className="grid gap-3 sm:grid-cols-4"><label className="space-y-1 text-sm">Página<input type="number" min="1" max={count || 1} value={page} onChange={(e) => { setPage(Number(e.target.value)); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Esquerda (%)<input type="number" min="0" max="90" value={x} onChange={(e) => { setX(Number(e.target.value)); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Topo (%)<input type="number" min="0" max="90" value={y} onChange={(e) => { setY(Number(e.target.value)); state.clear(); }} className={input} /></label><label className="space-y-1 text-sm">Tamanho<input type="number" min="8" max="72" value={size} onChange={(e) => { setSize(Number(e.target.value)); state.clear(); }} className={input} /></label></div><p className="text-xs text-slate-500">Esta ferramenta acrescenta texto sobre o PDF. Ela não altera palavras que já estão no documento.</p><button className={action} type="button" disabled={!file || !count || !text.trim() || state.busy} onClick={generate}>{state.busy ? "Adicionando…" : "Adicionar texto"}</button><Result state={state} filename="pdf-com-texto.pdf" /></div>;
}

export function PdfA4Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [margin, setMargin] = useState(12);
  const state = useResult();
  const generate = async () => {
    if (!file) return;
    state.setBusy(true); state.clear();
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const source = await PDFDocument.load(bytes);
      const output = await PDFDocument.create();
      const originals = source.getPages();
      const embedded = await output.embedPdf(bytes);
      const pageWidth = 595.28, pageHeight = 841.89, padding = margin * 72 / 25.4;
      originals.forEach((original, index) => {
        const item = embedded[index];
        const width = original.getWidth(), height = original.getHeight();
        const factor = Math.min((pageWidth - padding * 2) / width, (pageHeight - padding * 2) / height);
        const page = output.addPage([pageWidth, pageHeight]);
        page.drawPage(item, { x: (pageWidth - width * factor) / 2, y: (pageHeight - height * factor) / 2, width: width * factor, height: height * factor });
      });
      state.save(await output.save());
    } catch { state.setError("Não foi possível ajustar este PDF. Confira se ele está íntegro e sem senha."); }
    finally { state.setBusy(false); }
  };
  return <div className="space-y-4"><FileInput onChange={(value) => { setFile(value); state.clear(); }} /><label className="block space-y-1 text-sm">Margem: {margin} mm<input type="range" min="0" max="30" value={margin} onChange={(e) => { setMargin(Number(e.target.value)); state.clear(); }} className="min-h-11 w-full" /></label><p className="text-xs text-slate-500">Cada página será centralizada em uma folha A4 sem esticar a imagem. Páginas pequenas podem ser ampliadas.</p><button className={action} type="button" disabled={!file || state.busy} onClick={generate}>{state.busy ? "Ajustando…" : "Criar PDF A4"}</button><Result state={state} filename="documento-a4.pdf" /></div>;
}
