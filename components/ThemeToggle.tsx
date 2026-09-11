"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function getThemeSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined" || typeof MutationObserver === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => false);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const isCurrentlyDark = html.classList.contains("dark");

    if (isCurrentlyDark) {
      html.classList.remove("dark");
      localStorage.setItem("criegratis-theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("criegratis-theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
      className={`group relative flex items-center justify-center min-h-[44px] min-w-[44px] gap-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9] shadow-2xs hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:bg-white dark:hover:bg-[#0F172A] transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
    >
      <div className="relative h-4 w-4 pointer-events-none">
        {isDark ? (
          <Sun className="h-4 w-4 text-[#F59E0B] transition-transform duration-300 rotate-0 group-hover:rotate-45" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 text-[#2563EB] transition-transform duration-300 rotate-0 group-hover:-rotate-12" aria-hidden="true" />
        )}
      </div>
      <span className="hidden sm:inline transition-colors font-medium pointer-events-none">
        {isDark ? "Claro" : "Escuro"}
      </span>
    </button>
  );
}
