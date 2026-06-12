"use client";

import React from "react"

import { Sidebar } from "./sidebar";
import { useFullscreen } from "@/hooks/use-fullscreen";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const fullscreen = useFullscreen();

  return (
    <div className="min-h-screen bg-[#F8F9F7]">
      {!fullscreen && <Sidebar />}
      <main className={fullscreen ? "min-h-screen" : "ml-16 min-h-screen"}>
        {children}
      </main>
    </div>
  );
}
