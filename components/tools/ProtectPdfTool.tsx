'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Check, AlertCircle, RefreshCw, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { PDFDocument } from '@cantoo/pdf-lib';

export default function ProtectPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleProtectAndDownload = async () => {
    if (!file) return;

    if (!password) {
      setError('Por favor digite uma senha para proteger o documento.');
      return;
    }

    if (password !== confirmPassword) {
      setError('A confirmação de senha não confere com a senha digitada.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(false);

      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Encrypt with AES-256
      pdf.encrypt({
        userPassword: password,
        ownerPassword: password,
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-protegido.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError('Erro ao criptografar o documento PDF. Verifique se o arquivo original já não está protegido.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPassword('');
    setConfirmPassword('');
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
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Escolha o arquivo PDF para Proteger com Senha
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Proteja contracheques, contratos e dados confidenciais (LGPD) com criptografia militar AES.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs text-neutral-500">
            <span>Criptografia 100% local no seu navegador • Nenhum arquivo é enviado a servidores</span>
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

          {/* Password Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Senha de Abertura do PDF
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite uma senha forte"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Confirmar Senha
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a mesma senha"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl flex items-center gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              O PDF resultante exigirá essa senha para ser visualizado em qualquer leitor de PDF (Adobe Acrobat, navegadores, celulares).
            </span>
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
              <span>PDF protegido com sucesso! O download foi iniciado automaticamente.</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-800">
            <button
              onClick={handleProtectAndDownload}
              disabled={isProcessing || !password}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isProcessing ? 'Criptografando PDF...' : 'Proteger e Baixar PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
