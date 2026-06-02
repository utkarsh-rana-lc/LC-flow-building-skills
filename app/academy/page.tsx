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
      <div className="min-h-screen bg-[#F8FAF6]">

        {/* Breadcrumb */}
        <div className="border-b border-[#E8EDE6] bg-white px-8 py-3">
          <p className="text-sm">
            <span className="font-medium text-[#7FB13D]">Academy</span>
            <span className="text-[#C4C9C5]"> / </span>
            <span className="text-[#5F6661]">Home</span>
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-10">

          {/* Hero card */}
          <div className="mb-10 overflow-hidden rounded-2xl border border-[#DDE8D4] bg-white shadow-sm">
            <div className="bg-[#F2F9EA] px-8 pb-8 pt-10 text-center">
              {/* Graduation cap badge */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5E8E2E] shadow-md">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                </svg>
              </div>

              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#7FB13D]">LimeChat</p>
              <h1 className="text-balance text-2xl font-bold text-[#2F3431]">Bot Builder Academy</h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#5F6661]">
                Master LimeChat&apos;s Agentic Studio — explore every node, flow, and agent at your own pace.
              </p>

              <div className="mt-6">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 rounded-full bg-[#5E8E2E] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#4E7926] hover:shadow-md"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Explore Learning Academy
                </Link>
              </div>
            </div>
          </div>

          {/* Stage accordions */}
          <h2 className="mb-5 text-base font-semibold text-[#2F3431]">Browse by Stage</h2>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-white shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
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
                    className="overflow-hidden rounded-2xl border border-[#E8EDE6] bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Header */}
                    <button
                      onClick={() => setOpenStage(isOpen ? null : stageName)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FAFCF8]"
                    >
                      {/* Numbered badge */}
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#5E8E2E] shadow-sm">
                        <span className="text-sm font-bold text-white">{idx + 1}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#2F3431]">{stageName}</p>
                        <p className="mt-0.5 text-xs text-[#9AA19B]">
                          {moduleNames.length} {moduleNames.length === 1 ? "section" : "sections"} &middot; {totalLessons} lessons
                        </p>
                      </div>

                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#9AA19B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Expanded body */}
                    {isOpen && (
                      <div className="border-t border-[#F0F4EE] px-6 pb-5 pt-4">
                        {moduleNames.map((moduleName, modIdx) => {
                          const moduleLessons = stageMap[stageName].modules[moduleName];
                          return (
                            <div
                              key={moduleName}
                              className={modIdx > 0 ? "mt-5 border-t border-[#F0F4EE] pt-5" : ""}
                            >
                              {/* Section label */}
                              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9AA19B]">
                                {moduleName}
                              </p>

                              <div className="flex flex-col gap-0.5">
                                {moduleLessons.map((lesson) =>
                                  lesson.videoUrl ? (
                                    <Link
                                      key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                      href="/learn"
                                      className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[#5F6661] transition-colors hover:bg-[#EAF4DD] hover:text-[#5E8E2E]"
                                    >
                                      <svg
                                        width="11" height="11" viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="flex-shrink-0 text-[#C4C9C5] transition-colors group-hover:text-[#7FB13D]"
                                      >
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                      </svg>
                                      {lesson.title}
                                    </Link>
                                  ) : (
                                    <div
                                      key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[#C4C9C5]"
                                    >
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
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
        </div>
      </div>
    </AppLayout>
  );
}
