"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import {
  certificationLinks,
  certificationLevels,
} from "@/lib/data/certification";

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckDot() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#EAF4DD]">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5E8E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

const whatYoullDo = [
  "Learn and apply Agentic Studio concepts through practical tasks",
  "Build and test real bot journeys based on defined requirements",
  "Work with APIs, validations, conditions, variables and edge cases",
  "Use test benches and Bot Reviewer MCPs to identify and fix issues",
  "Progress through L0 → L4 and demonstrate your ability to build production-ready bots",
];

export default function CertificationsPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <header className="sticky top-0 z-10 border-b border-[#E8EDE6] bg-white/95 backdrop-blur">
          <div className="flex h-14 items-center px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/academy"
                className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]"
              >
                Academy
              </Link>
              <span className="text-[#D4D9D4]">/</span>
              <span className="text-[#2F3431]">Certification Programme</span>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-8 py-10">
          {/* Title + Subtitle */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4DD] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#5E8E2E]">
              Certification Programme
            </span>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-[#2F3431]">
              LimeChat Bot Builder Certification Programme
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-[#5F6661]">
              A practical journey to build, test, review and optimise
              production-ready bots in Agentic Studio.
            </p>
          </div>

          {/* 1. Complete Notion Guide */}
          <section className="mb-10 overflow-hidden rounded-2xl border border-[#E7F0DC] bg-[#F4FAEB] shadow-sm">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#5E8E2E] text-white">
                  <BookIcon />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#2F3431]">
                    Complete Certification Guide
                  </h2>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-[#5E8E2E]">
                    Find the complete requirements, assignments, evaluation
                    criteria and submission instructions for every level.
                  </p>
                </div>
              </div>
              <a
                href={certificationLinks.notionGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#5E8E2E] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4A7A24] hover:shadow-md"
              >
                View Guide in Notion
                <ArrowRight />
              </a>
            </div>
          </section>

          {/* 2. Introduction / Why this certification matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#2F3431]">
              What is the LimeChat Bot Builder Certification?
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-[#5F6661]">
              The LimeChat Bot Builder Certification is a practical, hands-on
              journey designed to take you from understanding how bots work to
              confidently building and improving them in Agentic Studio. Instead
              of only testing your theoretical knowledge, the certification
              focuses on real bot-building assignments, testing, debugging, and
              review across five progressive levels.
            </p>

            <div className="mt-6 rounded-xl border border-[#E8EDE6] bg-[#F8F9F7] p-6">
              <h3 className="text-sm font-semibold text-[#2F3431]">
                What you&apos;ll do
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {whatYoullDo.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#5F6661]"
                  >
                    <CheckDot />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Callout */}
            <div className="mt-6 rounded-xl border border-[#DCE8D2] bg-[#EAF4DD] p-6">
              <h3 className="text-sm font-semibold text-[#4A7A24]">
                Why go to the Notion guide?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5E8E2E]">
                The complete certification guide contains the detailed
                requirements, assignments, evaluation criteria, test cases and
                submission instructions for every level. Use it as the source of
                truth before starting each level.
              </p>
              <a
                href={certificationLinks.notionGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#5E8E2E] bg-white px-5 py-2 text-sm font-semibold text-[#5E8E2E] transition-all hover:bg-[#5E8E2E] hover:text-white"
              >
                Explore Complete Certification Guide
                <ArrowRight />
              </a>
            </div>
          </section>

          {/* 3. Certification Journey (roadmap) */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#2F3431]">
              Certification Journey
            </h2>
            <p className="mt-2 text-sm text-[#5F6661]">
              Five progressive levels, from understanding bots to building and
              optimising them for production.
            </p>

            <ol className="relative mt-6 flex flex-col">
              {certificationLevels.map((level, i) => {
                const isLast = i === certificationLevels.length - 1;
                return (
                  <li key={level.id} className="relative flex gap-5 pb-6 last:pb-0">
                    {/* Connector line */}
                    {!isLast && (
                      <span
                        className="absolute left-[21px] top-11 h-[calc(100%-1rem)] w-0.5 bg-[#DCE8D2]"
                        aria-hidden="true"
                      />
                    )}
                    {/* Level marker */}
                    <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#5E8E2E] bg-white text-sm font-bold text-[#5E8E2E]">
                      {level.code}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-sm font-semibold text-[#2F3431]">
                        {level.name}
                      </h3>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-[#5F6661]">
                        {level.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* 4 + 5. Level Cards */}
          <section>
            <h2 className="text-xl font-semibold text-[#2F3431]">Levels</h2>
            <p className="mt-2 text-sm text-[#5F6661]">
              Open the guide for full requirements, then submit your assignment
              for each level.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {certificationLevels.map((level) => (
                <article
                  key={level.id}
                  className="group rounded-2xl border border-[#E8EDE6] bg-white p-6 transition-all hover:border-[#DCE8D2] hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAF4DD] text-base font-bold text-[#5E8E2E]">
                      {level.code}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-[#2F3431]">
                        {level.name}
                      </h3>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-[#5F6661]">
                        {level.description}
                      </p>
                    </div>
                  </div>

                  {/* What this level covers */}
                  <div className="mt-4 rounded-xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA19B]">
                      What this level covers
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#2F3431]">
                      {level.covers}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={level.notionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#E2E6E1] px-4 py-2 text-sm font-medium text-[#2F3431] transition-colors hover:border-[#5E8E2E] hover:text-[#5E8E2E]"
                    >
                      <BookIcon className="h-4 w-4" />
                      View Guide
                    </a>
                    <a
                      href={level.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#5E8E2E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4A7A24]"
                    >
                      Submit Assignment
                      <ArrowRight />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
