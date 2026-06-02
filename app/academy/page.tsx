"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
      .then((text) => {
        const parsed = parseCSV(text);
        setLessons(parsed);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const stages = new Set(lessons.map((l) => l.stage));
    const available = lessons.filter((l) => l.videoUrl).length;
    return { stages: stages.size, total: lessons.length, available };
  }, [lessons]);

  const stageMap = useMemo(() => {
    const map: Record<string, { modules: Record<string, Lesson[]> }> = {};
    for (const lesson of lessons) {
      if (!map[lesson.stage]) map[lesson.stage] = { modules: {} };
      if (!map[lesson.stage].modules[lesson.module])
        map[lesson.stage].modules[lesson.module] = [];
      map[lesson.stage].modules[lesson.module].push(lesson);
    }
    // Sort lessons within each module by order
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
        <div className="border-b border-[#E2E6E1] px-6 py-3">
          <p className="text-sm text-[#5F6661]">
            <span className="font-medium text-[#7FB13D]">Academy</span>
            <span className="text-[#9AA19B]"> / </span>
            <span>Home</span>
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-8">
          {/* Hero Card */}
          <div className="mb-10 rounded-2xl border-2 border-[#E8EDE6] bg-[#F5FBEF] p-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/limechat-logo.png"
                alt="LimeChat"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <h1 className="text-center text-2xl font-bold text-[#2F3431]">
              Bot Builder Academy
            </h1>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-[#5F6661]">
              Master building production-ready conversational bots. Complete {stats.stages} stages to earn your certification as a LimeChat Bot Builder expert.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-[#7FB13D] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#6A9830] hover:shadow-md"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Continue Learning
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#7FB13D] px-6 py-2.5 text-sm font-semibold text-[#5F6661] transition-all hover:bg-[#F8F9F7]"
              >
                View Full Path
              </button>
            </div>
          </div>

          {/* Your Learning Path Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#2F3431]">Your Learning Path</h2>
              <span className="text-sm text-[#7FB13D] hover:text-[#6A9830] cursor-pointer">View all</span>
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-[#F1F3F0]" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {stageNames.map((stageName, idx) => {
                  const moduleNames = Object.keys(stageMap[stageName].modules);
                  const isOpen = openStage === stageName;
                  const totalLessons = moduleNames.reduce((sum, mod) => sum + stageMap[stageName].modules[mod].length, 0);

                  return (
                    <div
                      key={stageName}
                      className="overflow-hidden rounded-xl border border-[#E2E6E1] bg-white transition-all"
                    >
                      {/* Card header — clickable */}
                      <button
                        onClick={() => setOpenStage(isOpen ? null : stageName)}
                        className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-[#F8F9F7]/50 transition-colors"
                      >
                        {/* Number circle */}
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7FB13D]">
                          <span className="text-xs font-bold text-white">{idx + 1}</span>
                        </div>

                        {/* Stage name and details */}
                        <div className="flex-1">
                          <p className="font-semibold text-[#2F3431]">{stageName}</p>
                          <p className="mt-0.5 text-xs text-[#9AA19B]">
                            {moduleNames.length} {moduleNames.length === 1 ? "section" : "sections"} • {totalLessons} lessons
                          </p>
                        </div>

                        {/* Chevron */}
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="#9AA19B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Expanded lesson list */}
                      {isOpen && (
                        <div className="border-t border-[#F1F3F0] px-5 pb-4 pt-3">
                          {moduleNames.map((moduleName, modIdx) => {
                            const moduleLessons = stageMap[stageName].modules[moduleName];
                            return (
                              <div key={moduleName} className={modIdx > 0 ? "mt-4 pt-4 border-t border-[#F1F3F0]" : ""}>
                                {/* Module heading */}
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#9AA19B]">
                                  {moduleName}
                                </p>
                                <div className="flex flex-col gap-1">
                                  {moduleLessons.map((lesson) =>
                                    lesson.videoUrl ? (
                                      <Link
                                        key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                        href="/learn"
                                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#5F6661] transition-colors hover:bg-[#EAF4DD] hover:text-[#5E8E2E]"
                                      >
                                        <svg
                                          width="11" height="11" viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="flex-shrink-0 text-[#C4C9C5] group-hover:text-[#7FB13D]"
                                        >
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        {lesson.title}
                                      </Link>
                                    ) : (
                                      <div
                                        key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#C4C9C5]"
                                      >
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                                          <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        <span className="flex-1">{lesson.title}</span>
                                        <span className="rounded bg-[#F1F3F0] px-1 py-0.5 text-[9px] font-medium text-[#9AA19B]">
                                          Soon
                                        </span>
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
      </div>
    </AppLayout>
  );
}
