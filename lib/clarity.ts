declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento customizado no Microsoft Clarity.
 * Seguro para SSR e para casos onde o script ainda não carregou ou foi bloqueado.
 */
export function trackClarityEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("event", eventName);
  } catch {
    // Silencioso: falhas de analytics nunca devem quebrar a ferramenta
  }
}

/**
 * Define uma tag customizada na sessão atual do Microsoft Clarity.
 */
export function setClarityTag(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("set", key, value);
  } catch {
    // Silencioso
  }
}
