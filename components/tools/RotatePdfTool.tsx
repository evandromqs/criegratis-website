'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Check, AlertCircle, RefreshCw, RotateCw, RotateCcw } from 'lucide-react';
import { PDFDocument, degrees } from '@cantoo/pdf-lib';

interface PageRotation {
  pageIndex: number;
  rotation: number; // 0, 90, 180, 270
}

export default function RotatePdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRotations, setPageRotations] = useState<PageRotation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setError('Por favor selecione um arquivo PDF válido.');
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setFile(selected);
      setIsProcessing(true);

      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();

      const initial: PageRotation[] = [];
      for (let i = 0; i < count; i++) {
        const page = pdf.getPage(i);
        const currentRot = page.getRotation().angle || 0;
        initial.push({ pageIndex: i, rotation: currentRot });
      }
      setPageRotations(initial);
    } catch (err: any) {
      setError('Não foi possível ler o arquivo PDF.');
      setFile(null);
      setPageRotations([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const rotateAll = (delta: number) => {
    setPageRotations(prev =>
      prev.map(p => ({
        ...p,
        rotation: (p.rotation + delta + 360) % 360
      }))
    );
  };

  const rotatePage = (index: number, delta: number) => {
    setPageRotations(prev =>
      prev.map(p => {
        if (p.pageIndex === index) {
          return { ...p, rotation: (p.rotation + delta + 360) % 360 };
        }
        return p;
      })
    );
  };

  const handleSaveAndDownload = async () => {
    if (!file || pageRotations.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(false);

      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      pageRotations.forEach(item => {
        const page = pdf.getPage(item.pageIndex);
        page.setRotation(degrees(item.rotation));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-rotacionado.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError('Erro ao salvar o PDF rotacionado.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPageRotations([]);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-700 hover:border-amber-500/80 bg-neutral-900/50 hover:bg-neutral-900 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <RotateCw className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Selecione o PDF para Girar Páginas
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Corrija documentos escaneados de cabeça para baixo ou páginas deitadas individualmente ou em lote.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs text-neutral-500">
            <span>Processamento 100% privado na memória do seu computador</span>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          {/* File Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {pageRotations.length} {pageRotations.length === 1 ? 'página' : 'páginas'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-medium transition-colors"
            >
              Trocar Arquivo
            </button>
          </div>

          {/* Batch Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-neutral-950/60 border border-neutral-800 rounded-xl">
            <span className="text-sm font-medium text-neutral-300">Girar todas as páginas:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => rotateAll(90)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                +90° Horário
              </button>
              <button
                type="button"
                onClick={() => rotateAll(-90)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                -90° Anti-horário
              </button>
              <button
                type="button"
                onClick={() => rotateAll(180)}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors border border-neutral-700"
              >
                180° Inverter
              </button>
            </div>
          </div>

          {/* Individual Pages Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Páginas Individuais ({pageRotations.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto p-1">
              {pageRotations.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-between gap-2 text-center"
                >
                  <div className="text-xs font-medium text-neutral-400">Página {p.pageIndex + 1}</div>
                  
                  {/* Visual Page representation with rotation */}
                  <div
                    className="w-14 h-20 bg-neutral-900 border-2 border-dashed border-neutral-700 rounded flex items-center justify-center transition-transform duration-200"
                    style={{ transform: `rotate(${p.rotation}deg)` }}
                  >
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {p.rotation}°
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => rotatePage(p.pageIndex, -90)}
                      className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                      title="Girar anti-horário"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotatePage(p.pageIndex, 90)}
                      className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                      title="Girar horário"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>PDF rotacionado e baixado com sucesso!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              onClick={handleSaveAndDownload}
              disabled={isProcessing}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isProcessing ? 'Processando PDF...' : 'Salvar e Baixar PDF Rotacionado'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
