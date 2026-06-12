"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "v0:fullscreen";

function parse(value: string | null): boolean {
  if (!value) return false;
  return value === "true" || value === "1" || value === "yes";
}

function readFlag(): boolean {
  if (typeof window === "undefined") return false;

  // The URL param takes priority and sets/clears the persisted value.
  const params = new URLSearchParams(window.location.search);
  if (params.has("fullscreen")) {
    const active = parse(params.get("fullscreen"));
    try {
      if (active) {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // sessionStorage may be unavailable (e.g. privacy mode) — ignore.
    }
    return active;
  }

  // No param present: fall back to the persisted value so the flag
  // survives internal navigation where links omit the query string.
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Reads the `fullscreen` URL flag.
 * When `?fullscreen=true` (or `1`/`yes`) is present, the app chrome
 * (slim navbar + page top bars) is hidden. Once activated, the state is
 * persisted in sessionStorage so it survives internal navigation where
 * links don't carry the query string. Pass `?fullscreen=false` to exit.
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
