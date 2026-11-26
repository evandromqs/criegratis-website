"use client";

import React from "react";
import { Download } from "lucide-react";
import { unlockPwaInstall } from "@/hooks/usePwaUnlocked";

interface DownloadButtonProps {
  href?: string;
  downloadFileName?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function DownloadButton({
  href,
  downloadFileName = "arquivo",
  onClick,
  label = "Baixar Arquivo",
  className = "",
  disabled = false,
  size = "md",
}: DownloadButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:scale-[0.98] shadow-sm transition-all cursor-pointer";

  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  if (href) {
    return (
      <a
        href={href}
        download={downloadFileName}
        onClick={() => {
          unlockPwaInstall();
          onClick?.();
        }}
        className={`${baseStyles} ${sizeStyles[size]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      >
        <Download className="h-4 w-4" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      onClick={() => {
        unlockPwaInstall();
        onClick?.();
      }}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <Download className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
