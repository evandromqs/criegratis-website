"use client";

import React, { useState, useMemo } from "react";
import { Database, Copy, Check, Minimize2, AlignLeft, Trash2 } from "lucide-react";

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN",
  "FULL JOIN", "JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
  "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "DROP TABLE",
  "ALTER TABLE", "AS", "IN", "NOT IN", "IS NULL", "IS NOT NULL", "LIKE", "BETWEEN",
  "UNION", "UNION ALL", "EXISTS", "NOT EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END",
  "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX", "ASC", "DESC"
];

function formatSQL(sql: string, uppercaseKeywords: boolean = true): string {
  if (!sql.trim()) return "";

  // Normaliza espaços
  let formatted = sql.replace(/\s+/g, " ").trim();

  // Substitui palavras-chave por maiúsculas se solicitado
  if (uppercaseKeywords) {
    SQL_KEYWORDS.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(regex, kw);
    });
  }

  // Quebra linhas nas principais cláusulas
  const mainClauses = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
    "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "JOIN", "UNION ALL", "UNION",
    "VALUES", "SET"
  ];

  mainClauses.forEach((clause) => {
    const regex = new RegExp(`\\s+(${clause})\\b`, "gi");
    formatted = formatted.replace(regex, `\n$1`);
  });

  // Quebra linhas para AND e OR com indentação
  formatted = formatted.replace(/\s+(AND|OR)\b/gi, `\n  $1`);

  // Indenta itens de SELECT separados por vírgula
  const lines = formatted.split("\n").map((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith("AND ") ||
      trimmed.startsWith("OR ") ||
      trimmed.startsWith("ON ")
    ) {
      return `  ${trimmed}`;
    }
    return trimmed;
  });

  return lines.join("\n");
}

export default function SqlFormatterTool() {
  const [input, setInput] = useState<string>(
    "select u.id, u.nome, u.email, count(p.id) as total_pedidos from usuarios u left join pedidos p on u.id = p.usuario_id where u.ativo = 1 and p.status = 'pago' group by u.id, u.nome, u.email order by total_pedidos desc limit 50;"
  );
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [minified, setMinified] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!input) return "";
    if (minified) {
      return input.replace(/\s+/g, " ").trim();
    }
    return formatSQL(input, uppercase);
  }, [input, uppercase, minified]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Formatador de SQL</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Embeleze ou minifique consultas SQL em tempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              disabled={minified}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 disabled:opacity-40"
            />
            <span>Palavras-chave em MAIÚSCULAS</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={minified}
              onChange={(e) => setMinified(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Minificar SQL (Em uma única linha)</span>
          </label>
        </div>
      </div>

      {/* Editor Entrada / Saída */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Consulta SQL Bruta</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole sua query SQL aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="lg:col-span-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SQL Formatado / Indentado</label>
          <textarea
            readOnly
            rows={12}
            value={output}
            placeholder="O SQL formatado e organizado aparecerá aqui..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-emerald-400 p-4 text-xs font-mono focus:outline-hidden"
          />
        </div>
      </div>

      {output && (
        <button
          type="button"
          onClick={handleCopy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-300" />
              <span>SQL Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar SQL Formatado</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
