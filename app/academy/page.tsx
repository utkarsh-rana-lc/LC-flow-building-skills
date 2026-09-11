"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";

export default function AcademyPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}
        <header className="border-b border-[#E8EDE6] bg-white px-8 py-4">
          <nav className="text-sm">
            <span className="font-medium text-[#7FB13D]">Academy</span>
            <span className="mx-2 text-[#D4D9D4]">/</span>
            <span className="text-[#5F6661]">Home</span>
          </nav>
        </header>

        <div className="mx-auto max-w-3xl px-8 py-10">

          {/* Hero card */}
          <section className="mb-10 overflow-hidden rounded-xl border border-[#E8EDE6] bg-white">
            <div className="bg-gradient-to-b from-[#F5FAF0] to-white px-10 py-12 text-center">
              {/* Graduation cap badge */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5E8E2E] shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-[#2F3431]">Agentic Studio Learning Academy</h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6B7280]">
                Master LimeChat&apos;s Agentic Studio — explore every node, flow, and agent at your own pace.
              </p>

              <div className="mt-8">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#5E8E2E] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#4E7926] hover:shadow-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Explore Learning Academy
                </Link>
              </div>
            </div>
          </section>

          {/* Two equal paths */}
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Card 1 — Learning Academy */}
            <Link
              href="/learn"
              className="group flex flex-col rounded-xl border border-[#E8EDE6] bg-white p-7 shadow-sm transition-all hover:border-[#5E8E2E] hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF4DD]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5E8E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                </svg>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7FB13D]">
                Learn
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-[#2F3431]">Learning Academy</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                Learn LimeChat&apos;s Agentic Studio through practical, structured learning content and build your understanding at your own pace.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5E8E2E]">
                Explore Learning Academy
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            {/* Card 2 — Certification Programme */}
            <Link
              href="/certifications"
              className="group flex flex-col rounded-xl border border-[#5E8E2E] bg-gradient-to-br from-[#5E8E2E] to-[#4A7A24] p-7 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                Apply &amp; Validate
              </p>
              <h2 className="mt-1.5 text-lg font-bold text-white">Certification Programme</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80">
                Put your Agentic Studio skills into practice through hands-on assignments, testing, review and progressive certification from L0 to L4.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Explore Certification
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
