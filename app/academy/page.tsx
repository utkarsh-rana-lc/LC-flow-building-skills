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
      <div className="min-h-screen bg-[#F8FAF6]">

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#5E8E2E]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-4xl px-8 py-16 text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/limechat-logo.png"
                alt="LimeChat"
                width={160}
                height={42}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <h1 className="text-balance text-4xl font-bold leading-tight text-white">
              Bot Builder Academy
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Master LimeChat&apos;s Agentic Studio from zero to certified expert — at your own pace.
            </p>

            {!loading && (
              <div className="mt-8 flex items-center justify-center gap-12">
                {[
                  { label: "Stages", value: stats.stages },
                  { label: "Total Lessons", value: stats.total },
                  { label: "Available Now", value: stats.available },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-bold text-white">{s.value}</p>
                    <p className="mt-0.5 text-sm text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#5E8E2E] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Learning Academy
              </Link>
            </div>
          </div>
        </section>

        {/* Stage Cards */}
        <section className="mx-auto max-w-2xl px-6 py-12">
          <h2 className="mb-1 text-xl font-bold text-[#2F3431]">Your Learning Journey</h2>
          <p className="mb-8 text-sm text-[#9AA19B]">Click a stage to explore its lessons</p>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-white shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {stageNames.map((stageName, idx) => {
                const moduleNames = Object.keys(stageMap[stageName].modules);
                const isOpen = openStage === stageName;

                return (
                  <div
                    key={stageName}
                    className="overflow-hidden rounded-2xl border border-[#E8EDE6] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    {/* Card header — clickable */}
                    <button
                      onClick={() => setOpenStage(isOpen ? null : stageName)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    >
                      {/* Number circle */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5E8E2E]">
                        <span className="text-sm font-bold text-white">{idx + 1}</span>
                      </div>

                      {/* Stage name */}
                      <div className="flex-1">
                        <p className="font-semibold text-[#2F3431]">{stageName}</p>
                        <p className="mt-0.5 text-xs text-[#9AA19B]">
                          {moduleNames.length} {moduleNames.length === 1 ? "section" : "sections"}
                        </p>
                      </div>

                      {/* Chevron */}
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#7FB13D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Expanded lesson list */}
                    {isOpen && (
                      <div className="border-t border-[#F1F5EE] px-6 pb-5 pt-4">
                        {moduleNames.map((moduleName) => {
                          const moduleLessons = stageMap[stageName].modules[moduleName];
                          return (
                            <div key={moduleName} className="mb-5 last:mb-0">
                              {/* Module heading */}
                              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#7FB13D]">
                                {moduleName}
                              </p>
                              <div className="flex flex-col gap-0.5">
                                {moduleLessons.map((lesson) =>
                                  lesson.videoUrl ? (
                                    <Link
                                      key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                      href="/learn"
                                      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#5F6661] transition-colors hover:bg-[#EAF4DD] hover:text-[#5E8E2E]"
                                    >
                                      <svg
                                        width="13" height="13" viewBox="0 0 24 24"
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
                                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#C4C9C5]"
                                    >
                                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                      </svg>
                                      <span className="flex-1">{lesson.title}</span>
                                      <span className="rounded bg-[#F1F3F0] px-1.5 py-0.5 text-[10px] font-medium text-[#9AA19B]">
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
        </section>
      </div>
    </AppLayout>
  );
}
