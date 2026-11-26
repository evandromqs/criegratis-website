"use client";

import { useEffect, useSyncExternalStore } from "react";

const PWA_UNLOCKED_KEY = "criegratis-pwa-unlocked";
const PWA_UNLOCKED_EVENT = "criegratis-pwa-unlocked";

let listenersInstalled = false;

export function unlockPwaInstall() {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(PWA_UNLOCKED_KEY) !== "true") {
      localStorage.setItem(PWA_UNLOCKED_KEY, "true");
      window.dispatchEvent(new Event(PWA_UNLOCKED_EVENT));
    }
  } catch {
    // Ignore storage errors
  }
}

function installGlobalDownloadListeners() {
  if (typeof window === "undefined" || listenersInstalled) return;
  listenersInstalled = true;

  // 1. Detecta cliques em links <a download> ou botões de download na UI
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        if (
          anchor.hasAttribute("download") ||
          href.startsWith("blob:") ||
          href.startsWith("data:")
        ) {
          unlockPwaInstall();
          return;
        }
      }

      const clickable = target.closest("button, a");
      if (clickable) {
        const label = [
          clickable.textContent || "",
          clickable.getAttribute("aria-label") || "",
          clickable.getAttribute("title") || "",
        ]
          .join(" ")
          .toLowerCase();

        // Ignora botões do próprio PWA para evitar auto-desbloqueio
        if (label.includes("instalar") || label.includes("atalho")) return;

        if (/\b(baixar|download|exportar|salvar\s+(pdf|imagem|foto|arquivo|png|jpg|svg))\b/i.test(label)) {
          unlockPwaInstall();
        }
      }
    },
    true
  );

  // 2. Detecta downloads programáticos via a.click() sem anexar ao DOM
  const originalClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function patchedAnchorClick(this: HTMLAnchorElement) {
    try {
      const href = this.getAttribute("href") || "";
      if (
        this.hasAttribute("download") ||
        Boolean(this.download) ||
        href.startsWith("blob:") ||
        href.startsWith("data:")
      ) {
        unlockPwaInstall();
      }
    } catch {
      // Ignore errors
    }
    return originalClick.apply(this);
  };
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(PWA_UNLOCKED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PWA_UNLOCKED_EVENT, callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(PWA_UNLOCKED_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function usePwaUnlocked(): boolean {
  useEffect(() => {
    installGlobalDownloadListeners();
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
