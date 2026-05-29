"use client";

import React from "react"

import { Sidebar } from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F9F7]">
      <Sidebar />
      <main className="ml-16 min-h-screen">{children}</main>
    </div>
  );
}
