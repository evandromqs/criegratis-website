"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
}

export default function FaqAccordion({ items, defaultOpenIndex = null }: FaqAccordionProps) {
  // Permite abrir e fechar itens individualmente
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-[#1E293B] shadow-2xs ${
              isOpen
                ? "border-[#2563EB]/40 dark:border-[#38BDF8]/40 shadow-xs"
                : "border-[#E2E8F0] dark:border-[#334155] hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-[#0F172A] dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="pr-2">{item.question}</span>
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isOpen
                    ? "bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-[#38BDF8]"
                    : "bg-[#F8FAFC] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8]"
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-[#F1F5F9] dark:border-[#334155]/60 animate-in fade-in-50 duration-200">
                <p className="pt-3 text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
