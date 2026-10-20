"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  EyeOff,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";
import DownloadSuccessModal from "@/components/DownloadSuccessModal";

interface RedactionBox {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: "black" | "white";
}

function RedactionPreview({ file, pageNumber, boxes }: { file: File; pageNumber: number; boxes: RedactionBox[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewportData, setViewportData] = useState<{ width: number; height: number; transform: number[] } | null>(null);
  const [previewError, setPreviewError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let task: ReturnType<typeof import("pdfjs-dist").getDocument> | undefined;
    const render = async () => {
      setViewportData(null);
      setPreviewError(false);
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
      task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const pdf = await task.promise;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      if (cancelled || !canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("canvas");
      await page.render({ canvas, canvasContext: context, viewport }).promise;
      if (!cancelled) setViewportData({ width: viewport.width, height: viewport.height, transform: viewport.transform });
    };
    void render().catch(() => { if (!cancelled) setPreviewError(true); });
    return () => { cancelled = true; void task?.destroy(); };
  }, [file, pageNumber]);
  const point = (x: number, y: number) => {
    const [a, b, c, d, e, f] = viewportData!.transform;
    return [a * x + c * y + e, b * x + d * y + f];
  };
  return <div className="rounded-2xl border border-slate-200 p-3 dark:border-slate-700">
    <p className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Prévia da página {pageNumber}: ajuste X, Y, largura e altura das tarjas abaixo. Valores em pontos (pt).</p>
    {previewError && <p className="text-sm text-rose-700">Não foi possível mostrar a prévia deste PDF.</p>}
    <div className="relative mx-auto max-w-2xl bg-white shadow-sm" style={viewportData ? { aspectRatio: `${viewportData.width}/${viewportData.height}` } : undefined}>
      <canvas ref={canvasRef} className="block h-auto w-full" aria-label={`Prévia da página ${pageNumber}`} />
      {viewportData && boxes.filter((box) => box.page === pageNumber).map((box) => {
        const p1 = point(box.x, box.y), p2 = point(box.x + box.width, box.y + box.height);
        return <div key={box.id} aria-hidden="true" className="pointer-events-none absolute ring-2 ring-rose-500"
          style={{ left: `${Math.min(p1[0], p2[0]) / viewportData.width * 100}%`, top: `${Math.min(p1[1], p2[1]) / viewportData.height * 100}%`, width: `${Math.abs(p2[0] - p1[0]) / viewportData.width * 100}%`, height: `${Math.abs(p2[1] - p1[1]) / viewportData.height * 100}%`, backgroundColor: box.color }} />;
      })}
    </div>
  </div>;
}

export default function RedactPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageSizes, setPageSizes] = useState<{ width: number; height: number }[]>([]);
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [boxColor, setBoxColor] = useState<"black" | "white">("black");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);
  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf") && selectedFile.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setPageCount(count);
      setPageSizes(pdf.getPages().map((page) => ({ width: page.getWidth(), height: page.getHeight() })));
      setActivePage(1);
      setRedactions([]);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar o arquivo PDF.");
      setFile(null);
    }
  };

  const addRedaction = () => {
    const size = pageSizes[activePage - 1];
    const newBox: RedactionBox = {
      id: Math.random().toString(36).substring(2, 9),
      page: activePage,
      x: Math.round((size?.width ?? 595) * 0.2),
      y: Math.round((size?.height ?? 842) * 0.5),
      width: Math.round((size?.width ?? 595) * 0.45),
      height: 30,
      color: boxColor,
    };
    setRedactions((prev) => [...prev, newBox]);
    setDownloadUrl(null);
  };

  const removeRedaction = (id: string) => {
    setRedactions((prev) => prev.filter((r) => r.id !== id));
    setDownloadUrl(null);
  };

  const updateRedaction = (id: string, updates: Partial<RedactionBox>) => {
    setRedactions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    setDownloadUrl(null);
  };

  const exportRedactedPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    let loadingTask: ReturnType<typeof import("pdfjs-dist").getDocument> | undefined;
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
      loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const original = await loadingTask.promise;
      const output = await PDFDocument.create();
      for (let pageNumber = 1; pageNumber <= original.numPages; pageNumber++) {
        const sourcePage = await original.getPage(pageNumber);
        const viewport = sourcePage.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("canvas");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        await sourcePage.render({ canvas, canvasContext: context, viewport }).promise;
        for (const box of redactions.filter((item) => item.page === pageNumber)) {
          const coordinates = [box.x, box.y, box.width, box.height];
          if (coordinates.some((value) => !Number.isFinite(value)) || box.width <= 0 || box.height <= 0) throw new Error("box");
          const [left, top] = viewport.convertToViewportPoint(box.x, box.y);
          const [right, bottom] = viewport.convertToViewportPoint(box.x + box.width, box.y + box.height);
          context.fillStyle = box.color === "black" ? "#000" : "#fff";
          context.fillRect(Math.floor(Math.min(left, right)), Math.floor(Math.min(top, bottom)), Math.ceil(Math.abs(right - left)), Math.ceil(Math.abs(bottom - top)));
        }
        const image = await output.embedJpg(canvas.toDataURL("image/jpeg", 0.94));
        const resultPage = output.addPage([viewport.width / 2, viewport.height / 2]);
        resultPage.drawImage(image, { x: 0, y: 0, width: resultPage.getWidth(), height: resultPage.getHeight() });
        sourcePage.cleanup();
        canvas.width = 0;
        canvas.height = 0;
      }
      const pdfBytes = await output.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Não foi possível gerar o PDF censurado. Confira as medidas das tarjas e tente um arquivo menor.");
    } finally {
      await loadingTask?.destroy();
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileDropzone
          accept="application/pdf"
          onFileSelect={handleFile}
          maxSizeMB={50}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">{file.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pageCount} página(s) • {redactions.length} tarja(s) de censura
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Trocar Arquivo
              </button>
              <button
                type="button"
                onClick={exportRedactedPdf}
                disabled={isProcessing || redactions.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Aplicar Censura e Salvar
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <RedactionPreview file={file} pageNumber={activePage} boxes={redactions} />

          {downloadUrl && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  PDF Censurado com Sucesso!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                  As páginas foram convertidas em imagens antes de gerar o novo PDF. Confira o resultado antes de compartilhar.
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`censurado_${file.name}`}
                onClick={() => setNotice(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PDF Censurado
              </a>
              <iframe title="Confira o PDF censurado antes de compartilhar" src={downloadUrl} className="h-80 w-full rounded-xl border border-emerald-200 bg-white" />
            </div>
          )}

          {/* Gerenciamento das Tarjas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Adicionar Nova Tarja
                </h4>
                <button
                  type="button"
                  onClick={addRedaction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Nova Tarja
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Página Alvo:
                  </label>
                  <select
                    value={activePage}
                    onChange={(e) => setActivePage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    {Array.from({ length: pageCount }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Página {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Cor da Tarja:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBoxColor("black")}
                      className={`p-2 rounded-lg border font-bold flex items-center justify-center gap-2 ${
                        boxColor === "black"
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black inline-block" />
                      Tarja Preta
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoxColor("white")}
                      className={`p-2 rounded-lg border font-bold flex items-center justify-center gap-2 ${
                        boxColor === "white"
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "border-slate-200 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block" />
                      Tarja Branca
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Tarjas Criadas */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Tarjas Configuradas ({redactions.length})
              </h4>

              {redactions.length === 0 ? (
                <div className="p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-500">
                  Nenhuma tarja adicionada ainda. Clique em &quot;Nova Tarja&quot; para proteger dados confidenciais.
                </div>
              ) : (
                <div className="space-y-3">
                  {redactions.map((box, idx) => (
                    <div
                      key={box.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${
                            box.color === "black"
                              ? "bg-black text-white"
                              : "bg-white border border-slate-400 text-slate-800"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Página {box.page} • Largura: {box.width} pt • Altura: {box.height} pt
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Posição X: {box.x} | Y: {box.y}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {(["x", "y", "width", "height"] as const).map((field) => (
                          <label key={field} className="flex items-center gap-1 text-[11px] text-slate-500">
                            {field === "width" ? "Largura" : field === "height" ? "Altura" : field.toUpperCase()}:
                            <input type="number" min={field === "width" || field === "height" ? 1 : 0} value={box[field]}
                              onChange={(e) => updateRedaction(box.id, { [field]: Number(e.target.value) })}
                              className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-center" />
                          </label>
                        ))}

                        <button
                          type="button"
                          onClick={() => removeRedaction(box.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remover tarja"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <p>
              As medidas são em pontos (pt), a partir do canto inferior esquerdo da página. O PDF final contém imagens das páginas, sem a camada de texto original. Confira se todas as informações sensíveis ficaram cobertas antes de compartilhar.
            </p>
          </div>
        </div>
      )}
      <DownloadSuccessModal isOpen={notice} onClose={() => setNotice(false)} />
    </div>
  );
}
