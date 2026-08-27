"use client";

import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Building,
  Key,
} from "lucide-react";

const REGIOES_FISCAIS = [
  { digito: -1, label: "Todos os Estados (Aleatório)" },
  { digito: 1, label: "DF, GO, MS, MT, TO (1)" },
  { digito: 2, label: "AC, AM, AP, PA, RO, RR (2)" },
  { digito: 3, label: "CE, MA, PI (3)" },
  { digito: 4, label: "AL, PB, PE, RN (4)" },
  { digito: 5, label: "BA, SE (5)" },
  { digito: 6, label: "MG (6)" },
  { digito: 7, label: "ES, RJ (7)" },
  { digito: 8, label: "SP (8)" },
  { digito: 9, label: "PR, SC (9)" },
  { digito: 0, label: "RS (0)" },
];

function calcDigito(nums: number[]): number {
  let soma = 0;
  const pesoInicial = nums.length + 1;
  for (let i = 0; i < nums.length; i++) {
    soma += nums[i] * (pesoInicial - i);
  }
  const resto = (soma * 10) % 11;
  return resto === 10 || resto === 11 ? 0 : resto;
}

function generateSingleCpf(masked: boolean, estadoDigito: number = -1): string {
  const nums: number[] = [];
  for (let i = 0; i < 8; i++) {
    nums.push(Math.floor(Math.random() * 10));
  }
  if (estadoDigito >= 0 && estadoDigito <= 9) {
    nums.push(estadoDigito);
  } else {
    nums.push(Math.floor(Math.random() * 10));
  }

  const d1 = calcDigito(nums);
  nums.push(d1);
  const d2 = calcDigito(nums);
  nums.push(d2);

  const raw = nums.join("");
  if (masked) {
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
  }
  return raw;
}

function validateCpf(cpf: string): { valid: boolean; message: string; estado?: string } {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11) {
    return { valid: false, message: "O CPF deve conter exatamente 11 dígitos numéricos." };
  }

  // Verifica CPFs com todos dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(clean)) {
    return { valid: false, message: "CPF inválido (todos os dígitos repetidos)." };
  }

  const nums = clean.split("").map(Number);
  const d1 = calcDigito(nums.slice(0, 9));
  if (d1 !== nums[9]) {
    return { valid: false, message: "Primeiro dígito verificador inválido." };
  }

  const d2 = calcDigito(nums.slice(0, 10));
  if (d2 !== nums[10]) {
    return { valid: false, message: "Segundo dígito verificador inválido." };
  }

  const regiaoDigit = nums[8];
  const regiao = REGIOES_FISCAIS.find((r) => r.digito === regiaoDigit)?.label || "Desconhecida";

  return { valid: true, message: "CPF válido conforme algoritmo da Receita Federal!", estado: regiao };
}

export default function CpfGeneratorValidatorTool() {
  const [activeTab, setActiveTab] = useState<"generator" | "validator">("generator");

  // Estado Gerador
  const [quantity, setQuantity] = useState(1);
  const [useMask, setUseMask] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(-1);
  const [generatedList, setGeneratedList] = useState<string[]>([generateSingleCpf(true)]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Estado Validador
  const [validateInput, setValidateInput] = useState("");

  const validationResult = useMemo(() => {
    if (!validateInput.trim()) return null;
    return validateCpf(validateInput);
  }, [validateInput]);

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      list.push(generateSingleCpf(useMask, selectedRegion));
    }
    setGeneratedList(list);
  };

  const copySingle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generatedList.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Abas Alternadoras */}
      <div className="flex rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-1.5">
        <button
          onClick={() => setActiveTab("generator")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "generator"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Gerador de CPF</span>
        </button>
        <button
          onClick={() => setActiveTab("validator")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "validator"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Validador de CPF</span>
        </button>
      </div>

      {/* CONTEÚDO DA ABA GERADOR */}
      {activeTab === "generator" && (
        <div className="space-y-6">
          {/* Opções de Geração */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Quantidade de CPFs:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value={1}>1 CPF</option>
                <option value={5}>5 CPFs</option>
                <option value={10}>10 CPFs</option>
                <option value={20}>20 CPFs</option>
                <option value={50}>50 CPFs</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Formatação / Pontuação:
              </label>
              <select
                value={useMask ? "yes" : "no"}
                onChange={(e) => setUseMask(e.target.value === "yes")}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="yes">Com Pontos (000.000.000-00)</option>
                <option value="no">Sem Pontos (Apenas Números)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Estado / Região Fiscal:
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-hidden"
              >
                {REGIOES_FISCAIS.map((reg) => (
                  <option key={reg.digito} value={reg.digito}>
                    {reg.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Gerar */}
          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 text-sm shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Gerar Novos CPFs Válidos</span>
          </button>

          {/* Resultados Gerados */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                CPFs Gerados ({generatedList.length}):
              </span>
              {generatedList.length > 1 && (
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                >
                  {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedAll ? "Copiados!" : "Copiar Todos"}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {generatedList.map((cpf, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 py-3 shadow-2xs"
                >
                  <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
                    {cpf}
                  </span>
                  <button
                    onClick={() => copySingle(cpf, idx)}
                    className="flex items-center gap-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA VALIDADOR */}
      {activeTab === "validator" && (
        <div className="space-y-6">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Digite ou cole o CPF para validação:
            </label>
            <input
              type="text"
              maxLength={18}
              value={validateInput}
              onChange={(e) => setValidateInput(e.target.value)}
              placeholder="Ex: 123.456.789-00 ou 12345678900"
              className="w-full font-mono text-base sm:text-lg font-bold rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {validationResult && (
            <div
              className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                validationResult.valid
                  ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200"
                  : "border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200"
              }`}
            >
              <div className="flex items-start gap-3.5">
                {validationResult.valid ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="text-base font-black">
                    {validationResult.valid ? "CPF VÁLIDO" : "CPF INVÁLIDO"}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium">
                    {validationResult.message}
                  </p>
                  {validationResult.estado && (
                    <div className="pt-2 text-xs font-semibold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                      <Building className="h-3.5 w-3.5" />
                      <span>Origem Fiscal do 9º Dígito: {validationResult.estado}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
