"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: {
      new (options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean; layout?: string }, elementId: string): unknown;
      InlineLayout?: { SIMPLE?: string };
    } } };
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "pt",
            includedLanguages: "pt,en,es",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return (
    <>
      {/* Container invisível para a inicialização do script do Google */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
