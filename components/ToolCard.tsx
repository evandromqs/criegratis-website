import React from "react";
import Link from "next/link";
import {
  QrCode,
  KeyRound,
  FileText,
  AlignLeft,
  Percent,
  Scaling,
  Minimize2,
  Image,
  FileImage,
  Code2,
  ChevronRight,
  Wrench,
  CheckCircle,
  MessageSquare,
  Type,
  Files,
  TrendingUp,
  Crop,
  Key,
  Binary,
} from "lucide-react";
import { ToolInfo } from "@/lib/tools";
import FavoriteButton from "./FavoriteButton";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  QrCode,
  KeyRound,
  FileText,
  AlignLeft,
  Percent,
  Scaling,
  Minimize2,
  Image,
  FileImage,
  Code: Code2,
  Code2,
  CheckCircle,
  MessageSquare,
  Type,
  Files,
  TrendingUp,
  Crop,
  Key,
  Binary,
};

interface ToolCardProps {
  tool: ToolInfo;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.icon] || Wrench;

  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#2563EB] dark:hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-[#2563EB] dark:text-[#38BDF8] group-hover:bg-[#2563EB] dark:group-hover:bg-[#38BDF8] group-hover:text-white dark:group-hover:text-[#0F172A] transition-colors duration-200">
            <IconComponent className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {tool.badge && (
              <span className="rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 px-2 py-0.5 text-[10px] font-semibold text-[#2563EB] dark:text-[#38BDF8]">
                {tool.badge}
              </span>
            )}
            <FavoriteButton slug={tool.slug} variant="compact" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors line-clamp-1">
            {tool.name}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] line-clamp-2">
            {tool.shortDescription}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-[#F1F5F9] dark:border-[#334155]">
        <span className="text-xs font-semibold text-[#2563EB] dark:text-[#38BDF8] capitalize">
          {tool.category.replace("-", " ")}
        </span>
        <ChevronRight className="h-4 w-4 text-[#2563EB] dark:text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
