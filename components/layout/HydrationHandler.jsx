"use client";

import { useEffect } from "react";

export default function HydrationHandler() {
  useEffect(() => {
    // Add js-hydrated class to HTML element once the client-side JavaScript has hydrated
    document.documentElement.classList.add("js-hydrated");
  }, []);

  return null;
}
