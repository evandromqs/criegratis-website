'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { PDFDocument } from '@cantoo/pdf-lib';

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [rangeInput, setRangeInput] = useState('');
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
      setPageCount(count);
      setRangeInput(`1-${Math.min(count, 3)}`);
    } catch (err: any) {
      setError('Não foi possível ler o arquivo PDF. Verifique se o arquivo não está corrompido.');
      setFile(null);
      setPageCount(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const parsePageRanges = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(',').map(p => p.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
          throw new Error(`Intervalo inválido: "${part}"`);
        }
        for (let i = start; i <= Math.min(end, maxPages); i++) {
          pages.add(i - 1); // 0-indexed
        }
      } else {
        const page = parseInt(part, 10);
        if (isNaN(page) || page < 1 || page > maxPages) {
          throw new Error(`Página inválida: "${part}" (deve estar entre 1 e ${maxPages})`);
        }
        pages.add(page - 1);
      }
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);
    if (sorted.length === 0) {
      throw new Error('Nenhuma página válida selecionada.');
    }
    return sorted;
  };

  const handleSplitAndDownload = async () => {
    if (!file || !pageCount) return;

    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(false);

      const pageIndices = parsePageRanges(rangeInput, pageCount);
      const buffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-paginas-${rangeInput.replace(/[^a-zA-Z0-9-]/g, '_')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar e extrair páginas do PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPageCount(null);
    setRangeInput('');
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
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
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Escolha ou arraste seu arquivo PDF
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Divida contratos, separe relatórios e extraia apenas as páginas que você precisa com segurança total.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs text-neutral-500">
            <span>Processamento 100% privado na memória do seu navegador</span>
          </div>
        </div>
      ) : (
        /* Configuration & Extraction Box */
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
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
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {pageCount} {pageCount === 1 ? 'página' : 'páginas'} no total
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

          {/* Range Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Páginas ou Intervalos a Extrair
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="Ex: 1-3, 5, 8-10"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
              />
              <p className="text-xs text-neutral-500 mt-2">
                Use números separados por vírgula ou hífen. Exemplo: <strong className="text-neutral-400 font-mono">1-3, 5, 8-10</strong> para extrair as páginas 1 a 3, a página 5 e as páginas 8 a 10.
              </p>
            </div>

            {/* Quick Presets */}
            {pageCount && pageCount > 1 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-neutral-400">Seleção rápida:</span>
                <button
                  type="button"
                  onClick={() => setRangeInput('1')}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono"
                >
                  Apenas 1ª página
                </button>
                <button
                  type="button"
                  onClick={() => setRangeInput(`1-${Math.ceil(pageCount / 2)}`)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono"
                >
                  1ª Metade (1-{Math.ceil(pageCount / 2)})
                </button>
                <button
                  type="button"
                  onClick={() => setRangeInput(`${Math.ceil(pageCount / 2) + 1}-${pageCount}`)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono"
                >
                  2ª Metade ({Math.ceil(pageCount / 2) + 1}-{pageCount})
                </button>
                <button
                  type="button"
                  onClick={() => setRangeInput(Array.from({ length: pageCount }, (_, i) => i + 1).filter(n => n % 2 !== 0).join(', '))}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono"
                >
                  Páginas Ímpares
                </button>
                <button
                  type="button"
                  onClick={() => setRangeInput(Array.from({ length: pageCount }, (_, i) => i + 1).filter(n => n % 2 === 0).join(', '))}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-mono"
                >
                  Páginas Pares
                </button>
              </div>
            )}
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
              <span>Páginas extraídas e download iniciado com sucesso!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              onClick={handleSplitAndDownload}
              disabled={isProcessing || !rangeInput.trim()}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isProcessing ? 'Extraindo Páginas...' : 'Dividir e Baixar Novo PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
