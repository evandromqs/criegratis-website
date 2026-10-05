"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "ys6o33uz8a";

export default function MicrosoftClarity() {
  useEffect(() => {
    if (typeof window !== "undefined" && CLARITY_PROJECT_ID) {
      Clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return null;
}
