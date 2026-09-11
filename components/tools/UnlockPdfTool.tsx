'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Check, AlertCircle, RefreshCw, Unlock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { PDFDocument } from '@cantoo/pdf-lib';

export default function UnlockPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setError('Por favor selecione um arquivo PDF válido.');
      return;
    }

    setError(null);
    setSuccess(false);
    setFile(selected);
  };

  const handleUnlockAndDownload = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(false);

      const buffer = await file.arrayBuffer();
      
      // Attempt load with password
      let pdf: PDFDocument;
      try {
        pdf = await PDFDocument.load(buffer, { password: password || undefined });
      } catch (err: any) {
        if (err.message && err.message.toLowerCase().includes('password')) {
          setError('Senha incorreta para este documento PDF. Verifique e tente novamente.');
          return;
        }
        // Fallback with ignoreEncryption
        pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      }

      // Re-saving creates an unencrypted clean PDF
      const unencryptedBytes = await pdf.save();
      const blob = new Blob([unencryptedBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-desprotegido.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError('Não foi possível desbloquear o PDF. Certifique-se de que a senha digitada é a correta.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPassword('');
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
            <Unlock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Escolha o arquivo PDF para Desproteger
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Remova a senha e as restrições de impressão e edição de PDFs para os quais você tem a senha.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs text-neutral-500">
            <span>Desbloqueio 100% privado na memória do seu navegador</span>
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
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
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

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Senha Atual do PDF (se houver)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha de abertura do documento"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Se o documento possuir apenas restrições de impressão/edição sem senha de abertura, basta deixar o campo em branco.
            </p>
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
              <span>PDF desbloqueado com sucesso! Cópia desprotegida baixada.</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              onClick={handleUnlockAndDownload}
              disabled={isProcessing}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
              {isProcessing ? 'Desbloqueando...' : 'Desproteger e Baixar PDF Livre'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
