"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";

interface Lesson {
  stage: string;
  module: string;
  order: number;
  title: string;
  videoUrl: string;
  description: string;
}

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Hahijs0C135EAdtK9q_kQbAUecZRTIpSHSHL0srya9Zl-jsL2Z-WMV8yIF1pmOOuR87zazRz8k7V/pub?output=csv";

function parseCSV(csvText: string): Lesson[] {
  const lines = csvText.split("\n");
  const lessons: Lesson[] = [];
  let lastStage = "";
  let lastModule = "";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const stage = values[0]?.trim() || "";
    const module = values[1]?.trim() || "";
    const order = parseInt(values[2]?.trim() || "0") || 0;
    const title = values[3]?.trim() || "";
    const videoUrl = values[4]?.trim() || "";
    const description = values[5]?.trim() || "";

    if (stage) lastStage = stage;
    if (module) lastModule = module;
    if (!title) continue;

    lessons.push({ stage: lastStage, module: lastModule, order, title, videoUrl, description });
  }
  return lessons;
}

export default function AcademyPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [openStage, setOpenStage] = useState<string | null>(null);

  useEffect(() => {
    fetch(CSV_URL)
      .then((r) => r.text())
      .then((text) => setLessons(parseCSV(text)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stageMap = useMemo(() => {
    const map: Record<string, { modules: Record<string, Lesson[]> }> = {};
    for (const lesson of lessons) {
      if (!map[lesson.stage]) map[lesson.stage] = { modules: {} };
      if (!map[lesson.stage].modules[lesson.module])
        map[lesson.stage].modules[lesson.module] = [];
      map[lesson.stage].modules[lesson.module].push(lesson);
    }
    for (const stage of Object.keys(map)) {
      for (const mod of Object.keys(map[stage].modules)) {
        map[stage].modules[mod].sort((a, b) => a.order - b.order);
      }
    }
    return map;
  }, [lessons]);

  const stageNames = Object.keys(stageMap);

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
          <section className="mb-12 overflow-hidden rounded-xl border border-[#E8EDE6] bg-white">
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

          {/* Stage accordions */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-[#2F3431]">Browse by Stage</h2>

            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-xl bg-[#F5F7F5]" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {stageNames.map((stageName, idx) => {
                  const moduleNames = Object.keys(stageMap[stageName].modules);
                  const totalLessons = moduleNames.reduce(
                    (sum, mod) => sum + stageMap[stageName].modules[mod].length,
                    0
                  );
                  const isOpen = openStage === stageName;

                  return (
                    <div
                      key={stageName}
                      className="overflow-hidden rounded-xl border border-[#E8EDE6] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      {/* Header */}
                      <button
                        onClick={() => setOpenStage(isOpen ? null : stageName)}
                        className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors"
                      >
                        {/* Numbered badge */}
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAF4DD]">
                          <span className="text-base font-bold text-[#5E8E2E]">{idx + 1}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-[#2F3431]">{stageName}</p>
                          <p className="mt-1 text-sm text-[#9CA3AF]">
                            {moduleNames.length} {moduleNames.length === 1 ? "section" : "sections"} · {totalLessons} lessons
                          </p>
                        </div>

                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Expanded body */}
                      {isOpen && (
                        <div className="border-t border-[#F0F4EE] px-6 pb-6 pt-5">
                          {moduleNames.map((moduleName, modIdx) => {
                            const moduleLessons = stageMap[stageName].modules[moduleName];
                            return (
                              <div
                                key={moduleName}
                                className={modIdx > 0 ? "mt-6 border-t border-[#F0F4EE] pt-6" : ""}
                              >
                                {/* Section label */}
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                                  {moduleName}
                                </p>

                                <div className="flex flex-col">
                                  {moduleLessons.map((lesson) =>
                                    lesson.videoUrl ? (
                                      <Link
                                        key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                        href="/learn"
                                        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#4B5563] transition-colors hover:bg-[#EAF4DD] hover:text-[#5E8E2E]"
                                      >
                                        <svg
                                          width="12" height="12" viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="flex-shrink-0 text-[#D1D5DB] transition-colors group-hover:text-[#7FB13D]"
                                        >
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        {lesson.title}
                                      </Link>
                                    ) : (
                                      <div
                                        key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#D1D5DB]"
                                      >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        {lesson.title}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
