import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EmbeddedBackBarProps {
  href: string;
  label: string;
  children?: ReactNode;
}

export function EmbeddedBackBar({ href, label, children }: EmbeddedBackBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-[#E2E6E1] bg-white px-4 sm:px-6">
      <Link
        href={href}
        className="inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-medium text-[#5E8E2E] transition-colors hover:text-[#4A7A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E8E2E]"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {label}
      </Link>
      {children}
    </header>
  );
}
