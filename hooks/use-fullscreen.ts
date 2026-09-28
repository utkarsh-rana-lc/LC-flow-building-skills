"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "v0:fullscreen";

function readFullscreen(): boolean {
  if (typeof window === "undefined") return false;

  const param = new URLSearchParams(window.location.search).get("fullscreen");
  if (param !== null) {
    const enabled = ["true", "1", "yes"].includes(param.toLowerCase());
    try {
      if (enabled) window.sessionStorage.setItem(STORAGE_KEY, "true");
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Private browsing can disable session storage.
    }
    return enabled;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function useFullscreen(): boolean {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setFullscreen(readFullscreen());
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return fullscreen;
}
