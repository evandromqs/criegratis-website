"use client";

import React, { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";

function createRandomPassword(
  len: number,
  includeUpper: boolean,
  includeLower: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  const groups = [
    includeUpper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    includeLower ? "abcdefghijklmnopqrstuvwxyz" : "",
    includeNumbers ? "0123456789" : "",
    includeSymbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "",
  ].filter(Boolean);
  const chars = groups.join("");

  if (!chars || typeof window === "undefined" || !window.crypto) {
    return "";
  }

  const randomIndex = (size: number) => {
    const value = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / size) * size;
    do { window.crypto.getRandomValues(value); } while (value[0] >= limit);
    return value[0] % size;
  };
  const result = groups.map((group) => group[randomIndex(group.length)]);
  while (result.length < len) result.push(chars[randomIndex(chars.length)]);
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.join("");
}

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    const nextPassword = createRandomPassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
    setPassword(nextPassword);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePassword();
    }, 0);
    return () => clearTimeout(timer);
  }, [generatePassword]);

  // Cálculo de Força da Senha
  const getPasswordStrength = () => {
    if (!password) return { label: "Sem senha", score: 0, color: "bg-slate-200 dark:bg-slate-700", text: "text-[#64748B] dark:text-[#94A3B8]" };

    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;

    let typesCount = 0;
    if (includeUpper) typesCount++;
    if (includeLower) typesCount++;
    if (includeNumbers) typesCount++;
    if (includeSymbols) typesCount++;

    if (typesCount >= 2) score += 1;
    if (typesCount >= 4) score += 1;

    if (score <= 2) return { label: "Fraca", score: 1, color: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" };
    if (score === 3) return { label: "Média", score: 2, color: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" };
    if (score === 4) return { label: "Forte", score: 3, color: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" };
    return { label: "Muito Forte", score: 4, color: "bg-[#2563EB] dark:bg-[#38BDF8]", text: "text-[#2563EB] dark:text-[#38BDF8]" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="space-y-6">
      {/* Campo de Exibição da Senha */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900 dark:bg-[#020617] p-4 sm:p-5 text-white shadow-inner">
        <div className="w-full overflow-x-auto font-mono text-lg sm:text-xl font-bold tracking-wider text-emerald-400 select-all break-all">
          {password || "Selecione ao menos 1 tipo de caractere"}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={generatePassword}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Regerar Senha"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <CopyButton text={password} label="Copiar" variant="primary" size="md" />
        </div>
      </div>

      {/* Indicador Visual de Força */}
      <div className="rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Força da Senha
          </span>
          <span className={`text-xs font-bold ${strength.text}`}>
            {strength.label}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                step <= strength.score ? strength.color : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Opções de Configuração */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Comprimento */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#0F172A] dark:text-white">
              Tamanho da Senha
            </label>
            <span className="rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 px-2.5 py-1 font-mono text-xs font-bold text-[#2563EB] dark:text-[#38BDF8]">
              {length} caracteres
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-[#2563EB] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono">
            <span>4</span>
            <span>16</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Checkboxes de Caracteres */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#0F172A] dark:text-white block">
            Caracteres Incluídos
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#0F172A] dark:text-white">
            <label className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="rounded accent-[#2563EB]"
              />
              <span>Maiúsculas (A-Z)</span>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="rounded accent-[#2563EB]"
              />
              <span>Minúsculas (a-z)</span>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded accent-[#2563EB]"
              />
              <span>Números (0-9)</span>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-2.5 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded accent-[#2563EB]"
              />
              <span>Símbolos (!@#$)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
