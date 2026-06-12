"use client";

import { useEffect, useState } from "react";

function readFlag(): boolean {
  if (typeof window === "undefined") return false;
  const value = new URLSearchParams(window.location.search).get("fullscreen");
  if (!value) return false;
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Reads the `fullscreen` URL flag.
 * When `?fullscreen=true` (or `1`/`yes`) is present, the app chrome
 * (slim navbar + page top bars) should be hidden.
 *
 * Reads directly from `window.location` so it works on any client page
 * without requiring a Suspense boundary (unlike `useSearchParams`).
 */
export function useFullscreen(): boolean {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setFullscreen(readFlag());
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return fullscreen;
}
