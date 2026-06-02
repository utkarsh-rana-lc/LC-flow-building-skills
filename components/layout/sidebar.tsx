"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  {
    label: "Academy",
    href: "/academy",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      </svg>
    )
  },
  { 
    label: "Learning Path", 
    href: "/learning-path", 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 4v4m0 4v4" />
        <circle cx="12" cy="6" r="2" />
        <circle cx="12" cy="14" r="2" />
        <circle cx="12" cy="22" r="2" />
      </svg>
    )
  },
  { 
    label: "Courses", 
    href: "/courses", 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  { 
    label: "Certifications", 
    href: "/certifications", 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    )
  },
  { 
    label: "Help", 
    href: "/help", 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const isActive = (href: string) => {
    if (href === "/academy") return pathname === "/academy" || pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Slim Icon Sidebar */}
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col bg-[#5E8E2E]">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-white/10">
          <Link href="/academy" className="transition-transform hover:scale-105">
            <Image
              src="/images/limechat-icon.png"
              alt="LimeChat"
              width={36}
              height={36}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* Nav Icons */}
        <nav className="flex flex-1 flex-col items-center gap-1 px-2 pt-4">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-150",
                index > 1 && "hidden",
                isActive(item.href)
                  ? "bg-white text-[#5E8E2E]"
                  : "text-white/80 hover:bg-white/15 hover:text-white"
              )}
            >
              {item.icon}
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#2F3431] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Expand Button */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-150",
              expanded 
                ? "bg-white text-[#5E8E2E]" 
                : "text-white/80 hover:bg-white/15 hover:text-white"
            )}
            aria-label={expanded ? "Collapse menu" : "Expand menu"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {expanded ? (
                <path d="M15 18l-6-6 6-6" />
              ) : (
                <path d="M9 18l6-6-6-6" />
              )}
            </svg>
          </button>
        </div>
      </aside>

      {/* Expanded Panel */}
      <div
        className={cn(
          "fixed left-16 top-0 z-40 h-screen w-56 border-r border-[#E2E6E1] bg-white shadow-lg transition-transform duration-200 ease-out",
          expanded ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-[#E2E6E1] px-4">
          <Image
            src="/images/limechat-logo.png"
            alt="LimeChat"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <div className="px-3 py-2">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#9AA19B]">Navigation</p>
        </div>
        <nav className="px-3">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setExpanded(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150",
                index > 1 && "hidden",
                isActive(item.href)
                  ? "bg-[#EAF4DD] font-medium text-[#5E8E2E]"
                  : "text-[#5F6661] hover:bg-[#F8F9F7] hover:text-[#2F3431]"
              )}
            >
              <span className={cn("flex-shrink-0", isActive(item.href) ? "text-[#5E8E2E]" : "text-[#9AA19B]")}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#E2E6E1] p-4">
          <p className="text-xs text-[#9AA19B]">Bot Builder Academy</p>
          <p className="text-[10px] text-[#9AA19B]/70">v1.0</p>
        </div>
      </div>

      {expanded && (
        <button 
          type="button"
          className="fixed inset-0 z-30 cursor-default bg-black/5" 
          onClick={() => setExpanded(false)} 
          aria-label="Close menu"
        />
      )}
    </>
  );
}
