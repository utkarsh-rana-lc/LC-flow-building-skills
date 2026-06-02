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

  useEffect(() => {
    fetch(CSV_URL)
      .then((r) => r.text())
      .then((text) => setLessons(parseCSV(text)))
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
    return map;
  }, [lessons]);

  const stageNames = Object.keys(stageMap);

  return (
    <AppLayout>
      <div className="min-h-screen bg-white">

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
              <div className="mt-8 flex items-center justify-center gap-8">
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

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#5E8E2E] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Learning Academy
              </Link>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="mb-1 text-center text-2xl font-bold text-[#2F3431]">Your Learning Journey</h2>
          <p className="mb-14 text-center text-sm text-[#9AA19B]">
            Progress through each stage to earn your certification
          </p>

          {loading ? (
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-[#F1F3F0]" />
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Timeline spine */}
              <div
                className="absolute left-[27px] top-14 w-px bg-gradient-to-b from-[#7FB13D] to-[#7FB13D]/10"
                style={{ height: "calc(100% - 96px)" }}
              />

              <div className="flex flex-col gap-8">
                {stageNames.map((stageName, idx) => {
                  const moduleNames = Object.keys(stageMap[stageName].modules);
                  const stageLessons = moduleNames.flatMap((m) => stageMap[stageName].modules[m]);
                  const total = stageLessons.length;
                  const available = stageLessons.filter((l) => l.videoUrl).length;
                  const pct = total > 0 ? Math.round((available / total) * 100) : 0;
                  const circ = 2 * Math.PI * 20;
                  const offset = circ - (pct / 100) * circ;

                  return (
                    <div key={stageName} className="flex items-start gap-5">
                      {/* Numbered node */}
                      <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#5E8E2E] shadow-md ring-4 ring-white">
                        <span className="text-base font-bold text-white">{idx + 1}</span>
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-2xl border border-[#E8EDE6] bg-white p-6 shadow-[0_2px_12px_rgba(94,142,46,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(94,142,46,0.13)]">

                        {/* Card header */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7FB13D]">
                              {stageName}
                            </p>
                            {/* Lesson count chip */}
                            <span className="mt-2 inline-flex items-center rounded-full bg-[#EAF4DD] px-3 py-1 text-xs font-semibold text-[#5E8E2E]">
                              {available} / {total} lessons available
                            </span>
                          </div>

                          {/* Progress ring */}
                          <div className="relative flex-shrink-0">
                            <svg width="56" height="56" className="-rotate-90">
                              <circle cx="28" cy="28" r="20" fill="none" stroke="#EAF4DD" strokeWidth="4" />
                              <circle
                                cx="28" cy="28" r="20"
                                fill="none"
                                stroke="#7FB13D"
                                strokeWidth="4"
                                strokeDasharray={circ}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s ease" }}
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#5E8E2E]">
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#EAF4DD]">
                          <div
                            className="h-full rounded-full bg-[#7FB13D] transition-all duration-1000"
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Module tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {moduleNames.map((mod) => {
                            const modLessons = stageMap[stageName].modules[mod];
                            const modAvail = modLessons.filter((l) => l.videoUrl).length;
                            return (
                              <span
                                key={mod}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE8D4] bg-white px-2.5 py-1 text-[11px] font-medium text-[#5E8E2E]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#7FB13D]" />
                                {mod}
                                <span className="text-[#9AA19B]">({modAvail}/{modLessons.length})</span>
                              </span>
                            );
                          })}
                        </div>

                        {/* CTA */}
                        <div className="mt-5 border-t border-[#F1F5EE] pt-4">
                          <Link
                            href="/learn"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E8E2E] transition-all hover:gap-2.5"
                          >
                            Start Stage {idx + 1}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Certification node */}
                {stageNames.length > 0 && (
                  <div className="flex items-center gap-5">
                    <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#C4C9C5] bg-white">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4C9C5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                    <div className="flex-1 rounded-2xl border border-dashed border-[#E8EDE6] bg-[#FAFCF8] px-6 py-4">
                      <p className="font-semibold text-[#9AA19B]">Certification</p>
                      <p className="mt-0.5 text-xs text-[#C4C9C5]">
                        Complete all stages to unlock your LimeChat Bot Builder certificate
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
