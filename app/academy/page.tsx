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

function ProgressRing({ percent, size = 48 }: { percent: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E6E1" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#7FB13D"
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
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

  const stageColors = [
    { bg: "from-[#5E8E2E] to-[#7FB13D]", ring: "#7FB13D", light: "#EAF4DD", num: "#5E8E2E" },
    { bg: "from-[#3A7D44] to-[#52A55C]", ring: "#52A55C", light: "#E0F2E5", num: "#3A7D44" },
    { bg: "from-[#2D6E6E] to-[#3D9E9E]", ring: "#3D9E9E", light: "#DDF2F2", num: "#2D6E6E" },
    { bg: "from-[#6E5E2E] to-[#9E8540]", ring: "#9E8540", light: "#F5F0DC", num: "#6E5E2E" },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#F8F9F7]">

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#5E8E2E]">
          {/* Decorative circles */}
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

            {/* Stats row */}
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

        {/* Roadmap */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-2 text-center text-2xl font-bold text-[#2F3431]">Your Learning Journey</h2>
          <p className="mb-12 text-center text-sm text-[#9AA19B]">
            Progress through each stage to earn your certification
          </p>

          {loading ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-2xl bg-[#E2E6E1]" />
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-8 top-10 h-[calc(100%-80px)] w-0.5 bg-gradient-to-b from-[#7FB13D] via-[#7FB13D]/40 to-transparent" />

              <div className="flex flex-col gap-6">
                {stageNames.map((stageName, idx) => {
                  const color = stageColors[idx % stageColors.length];
                  const moduleNames = Object.keys(stageMap[stageName].modules);
                  const stageLessons = moduleNames.flatMap(
                    (m) => stageMap[stageName].modules[m]
                  );
                  const total = stageLessons.length;
                  const available = stageLessons.filter((l) => l.videoUrl).length;
                  const pct = total > 0 ? Math.round((available / total) * 100) : 0;

                  return (
                    <div key={stageName} className="flex items-start gap-5">
                      {/* Stage node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg`}
                        >
                          <span className="text-xl font-bold text-white">{idx + 1}</span>
                        </div>
                      </div>

                      {/* Stage card */}
                      <div className="group flex-1 rounded-2xl border border-[#E2E6E1] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p
                              className="mb-1 text-[11px] font-bold uppercase tracking-widest"
                              style={{ color: color.num }}
                            >
                              {stageName}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {moduleNames.map((mod) => (
                                <span
                                  key={mod}
                                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                                  style={{ background: color.light, color: color.num }}
                                >
                                  {mod}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 text-xs text-[#9AA19B]">
                              {available} of {total} lessons available
                            </p>
                          </div>

                          {/* Progress ring */}
                          <div className="relative flex-shrink-0">
                            <ProgressRing percent={pct} size={56} />
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#5E8E2E]">
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {/* Module lesson counts */}
                        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#F1F3F0] pt-4 sm:grid-cols-3">
                          {moduleNames.map((mod) => {
                            const count = stageMap[stageName].modules[mod].length;
                            const avail = stageMap[stageName].modules[mod].filter(
                              (l) => l.videoUrl
                            ).length;
                            return (
                              <div key={mod} className="flex items-center gap-2">
                                <div
                                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                                  style={{ background: color.ring }}
                                />
                                <span className="truncate text-[11px] text-[#5F6661]">
                                  {mod}
                                  <span className="ml-1 text-[#9AA19B]">
                                    ({avail}/{count})
                                  </span>
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* CTA */}
                        <div className="mt-4">
                          <Link
                            href="/learn"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                            style={{ color: color.num }}
                          >
                            Start Stage {idx + 1}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Finish node */}
                {!loading && stageNames.length > 0 && (
                  <div className="flex items-center gap-5">
                    <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-[#C4C9C5] bg-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4C9C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    </div>
                    <div className="flex-1 rounded-2xl border border-dashed border-[#E2E6E1] bg-white/60 px-5 py-4">
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
