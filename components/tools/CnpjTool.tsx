"use client";

import React, { useState } from "react";
import { Building2, Copy, Check, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return cnpj;
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

function generateRandomCNPJ(formatted: boolean = true): string {
  const n: number[] = [];
  for (let i = 0; i < 8; i++) {
    n.push(Math.floor(Math.random() * 10));
  }
  // Filial padrão 0001
  n.push(0, 0, 0, 1);

  // Primeiro dígito verificador
  let soma =
    n[0] * 5 +
    n[1] * 4 +
    n[2] * 3 +
    n[3] * 2 +
    n[4] * 9 +
    n[5] * 8 +
    n[6] * 7 +
    n[7] * 6 +
    n[8] * 5 +
    n[9] * 4 +
    n[10] * 3 +
    n[11] * 2;
  let d1 = 11 - (soma % 11);
  if (d1 >= 10) d1 = 0;
  n.push(d1);

  // Segundo dígito verificador
  soma =
    n[0] * 6 +
    n[1] * 5 +
    n[2] * 4 +
    n[3] * 3 +
    n[4] * 2 +
    n[5] * 9 +
    n[6] * 8 +
    n[7] * 7 +
    n[8] * 6 +
    n[9] * 5 +
    n[10] * 4 +
    n[11] * 3 +
    n[12] * 2;
  let d2 = 11 - (soma % 11);
  if (d2 >= 10) d2 = 0;
  n.push(d2);

  const raw = n.join("");
  return formatted ? formatCNPJ(raw) : raw;
}

function validateCNPJ(cnpj: string): boolean {
  const clean = cnpj.replace(/\D/g, "");
  if (clean.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(clean)) return false;

  let tamanho = clean.length - 2;
  let numeros = clean.substring(0, tamanho);
  const digitos = clean.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0), 10)) return false;

  tamanho = tamanho + 1;
  numeros = clean.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1), 10);
}

export default function CnpjTool() {
  const [tab, setTab] = useState<"generator" | "validator">("generator");

  // Generator state
  const [formatted, setFormatted] = useState<boolean>(true);
  const [generatedCnpjs, setGeneratedCnpjs] = useState<string[]>(() => [
    generateRandomCNPJ(true),
  ]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Validator state
  const [validateInput, setValidateInput] = useState<string>("");

  const handleGenerate = (count: number = 1) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateRandomCNPJ(formatted));
    }
    setGeneratedCnpjs(list);
  };

  const handleCopy = (cnpj: string, idx: number) => {
    navigator.clipboard.writeText(cnpj);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const validationResult = validateInput.trim() ? validateCNPJ(validateInput) : null;

  return (
    <div className="space-y-6">
      {/* Abas */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setTab("generator")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            tab === "generator"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Gerador de CNPJ
        </button>
        <button
          type="button"
          onClick={() => setTab("validator")}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            tab === "validator"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Validador de CNPJ
        </button>
      </div>

      {tab === "generator" ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Gerar CNPJ Válido</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Geração com algoritmo oficial para testes de software</p>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formatted}
                  onChange={(e) => {
                    setFormatted(e.target.checked);
                    setGeneratedCnpjs((prev) =>
                      prev.map((c) => (e.target.checked ? formatCNPJ(c) : c.replace(/\D/g, "")))
                    );
                  }}
                  className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>Pontuação (Máscara)</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleGenerate(1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Gerar 1 CNPJ
              </button>
              <button
                type="button"
                onClick={() => handleGenerate(5)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
              >
                Gerar 5 CNPJs
              </button>
              <button
                type="button"
                onClick={() => handleGenerate(10)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
              >
                Gerar 10 CNPJs
              </button>
            </div>

            {/* Lista de CNPJs Gerados */}
            <div className="space-y-2 pt-2">
              {generatedCnpjs.map((cnpj, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                >
                  <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
                    {cnpj}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(cnpj, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              ⚠️ <strong>Aviso Legal:</strong> Os números gerados são matematicamente válidos segundo o algoritmo oficial e destinam-se exclusivamente para testes de sistemas e desenvolvimento de software.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-xs">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Digite ou cole o CNPJ para validação:
            </label>
            <input
              type="text"
              value={validateInput}
              onChange={(e) => setValidateInput(e.target.value)}
              placeholder="00.000.000/0001-00"
              maxLength={18}
              className="w-full text-lg font-mono p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-blue-600 dark:focus:border-blue-500"
            />
          </div>

          {validationResult !== null && (
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                validationResult
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
              }`}
            >
              {validationResult ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">CNPJ Válido!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Os dois dígitos verificadores atendem aos critérios de cálculo oficial da Receita Federal.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">CNPJ Inválido</h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300">
                      O número informado não possui dígitos verificadores válidos ou quantidade incorreta de caracteres.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
