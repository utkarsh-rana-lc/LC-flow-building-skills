"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/app-layout";

interface Lesson {
  stage: string;
  module: string;
  order: number;
  title: string;
  videoUrl: string;
  description: string;
}

function parseCSV(csvText: string): Lesson[] {
  const lines = csvText.split("\n");
  const lessons: Lesson[] = [];

  let lastStage = "";
  let lastModule = "";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse respecting quoted commas
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

    // col0=Stages, col1=Module, col2=Order, col3=Title, col4=VideoURL, col5=Description
    const stage   = values[0]?.trim() || "";
    const module  = values[1]?.trim() || "";
    const order   = parseInt(values[2]?.trim() || "0") || 0;
    const title   = values[3]?.trim() || "";
    const videoUrl = values[4]?.trim() || "";
    const description = values[5]?.trim() || "";

    // Forward-fill stage and module
    if (stage)  lastStage  = stage;
    if (module) lastModule = module;

    // Skip rows with no title
    if (!title) continue;

    lessons.push({
      stage: lastStage,
      module: lastModule,
      order,
      title,
      videoUrl,
      description,
    });
  }

  return lessons;
}

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Hahijs0C135EAdtK9q_kQbAUecZRTIpSHSHL0srya9Zl-jsL2Z-WMV8yIF1pmOOuR87zazRz8k7V/pub?output=csv"
        );
        const csvText = await response.text();
        const parsedLessons = parseCSV(csvText);
        setLessons(parsedLessons);

        const firstWithVideo = parsedLessons.find((l) => l.videoUrl);
        if (firstWithVideo) setSelectedLesson(firstWithVideo);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  // Filter lessons by search term across title, module, stage, description
  const filteredLessons = useMemo(() => {
    if (!searchTerm.trim()) return lessons;
    const q = searchTerm.toLowerCase();
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.module.toLowerCase().includes(q) ||
        l.stage.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }, [lessons, searchTerm]);

  // Group: Stage → Module → sorted Lessons
  const groupedByStage = useMemo(() => {
    const stageMap: Record<string, Record<string, Lesson[]>> = {};
    for (const lesson of filteredLessons) {
      if (!stageMap[lesson.stage]) stageMap[lesson.stage] = {};
      if (!stageMap[lesson.stage][lesson.module]) stageMap[lesson.stage][lesson.module] = [];
      stageMap[lesson.stage][lesson.module].push(lesson);
    }
    // Sort lessons within each module by order
    for (const stage of Object.keys(stageMap)) {
      for (const mod of Object.keys(stageMap[stage])) {
        stageMap[stage][mod].sort((a, b) => a.order - b.order);
      }
    }
    return stageMap;
  }, [filteredLessons]);

  const stageNames = Object.keys(groupedByStage);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#7FB13D] border-t-transparent" />
            <p className="text-sm text-[#5F6661]">Loading lessons...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex h-screen flex-col">
        {/* Top bar */}
        <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-[#E2E6E1] bg-white px-5">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]"
            >
              <ArrowLeft className="h-4 w-4" />
              Academy
            </Link>
            <span className="text-[#E2E6E1]">/</span>
            {selectedLesson ? (
              <>
                <span className="text-sm text-[#9AA19B]">{selectedLesson.stage}</span>
                <span className="text-[#E2E6E1]">/</span>
                <span className="text-sm text-[#9AA19B]">{selectedLesson.module}</span>
                <span className="text-[#E2E6E1]">/</span>
                <span className="max-w-xs truncate text-sm font-medium text-[#2F3431]">
                  {selectedLesson.title}
                </span>
              </>
            ) : (
              <span className="text-sm text-[#2F3431]">Bot Builder Academy</span>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5F6661] hover:bg-[#F8F9F7] lg:hidden"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={cn(
              "absolute inset-y-14 left-0 z-40 flex w-72 flex-col border-r border-[#E2E6E1] bg-white transition-transform duration-200 lg:relative lg:inset-y-0 lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {/* Sidebar header */}
            <div className="flex-shrink-0 border-b border-[#E2E6E1] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA19B]">
                Bot Builder Academy
              </p>
            </div>

            {/* Search */}
            <div className="flex-shrink-0 border-b border-[#E2E6E1] px-3 py-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#E2E6E1] bg-[#F8F9F7] px-3 py-2 focus-within:border-[#7FB13D] focus-within:bg-white transition-colors">
                <Search className="h-3.5 w-3.5 flex-shrink-0 text-[#9AA19B]" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#2F3431] placeholder-[#9AA19B] outline-none"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="flex-shrink-0 text-[#9AA19B] hover:text-[#5F6661]">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Lesson list */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {stageNames.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="mb-3 h-8 w-8 text-[#E2E6E1]" />
                  <p className="text-sm font-medium text-[#2F3431]">No results</p>
                  <p className="mt-1 text-xs text-[#9AA19B]">Try a different search term</p>
                </div>
              ) : (
                stageNames.map((stageName) => (
                  <div key={stageName} className="mb-6">
                    {/* Stage heading */}
                    <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-[#7FB13D]">
                      {stageName}
                    </p>

                    {Object.keys(groupedByStage[stageName]).map((moduleName) => (
                      <div key={moduleName} className="mb-4">
                        {/* Module sub-heading */}
                        <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#9AA19B]">
                          {moduleName}
                        </p>
                        <div className="space-y-0.5">
                          {groupedByStage[stageName][moduleName].map((lesson) => {
                            const isActive =
                              selectedLesson?.title === lesson.title &&
                              selectedLesson?.module === lesson.module &&
                              selectedLesson?.stage === lesson.stage;
                            const hasVideo = !!lesson.videoUrl;

                            if (!hasVideo) {
                              return (
                                <div
                                  key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                  className="flex cursor-not-allowed items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-[#C4C9C5]"
                                >
                                  <PlayCircle className="h-4 w-4 flex-shrink-0" />
                                  <span className="flex-1 truncate">{lesson.title}</span>
                                  <span className="flex-shrink-0 rounded bg-[#F1F3F0] px-1.5 py-0.5 text-[10px] font-medium text-[#9AA19B]">
                                    Soon
                                  </span>
                                </div>
                              );
                            }

                            return (
                              <button
                                key={`${lesson.stage}-${lesson.module}-${lesson.order}`}
                                onClick={() => {
                                  setSelectedLesson(lesson);
                                  setSidebarOpen(false);
                                }}
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                                  isActive
                                    ? "bg-[#EAF4DD] font-medium text-[#5E8E2E]"
                                    : "text-[#5F6661] hover:bg-[#F8F9F7] hover:text-[#2F3431]"
                                )}
                              >
                                <PlayCircle
                                  className={cn(
                                    "h-4 w-4 flex-shrink-0",
                                    isActive ? "text-[#7FB13D]" : "text-[#C4C9C5]"
                                  )}
                                />
                                <span className="flex-1 leading-snug">{lesson.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          )}

          {/* Main content */}
          <main className="flex flex-1 flex-col overflow-hidden bg-black">
            {selectedLesson ? (
              <>
                {/* Video — full width, fills entire main area */}
                <div className="mx-auto h-full w-full flex-1 max-w-[1041px]">
                  <iframe
                    key={selectedLesson.videoUrl}
                    src={selectedLesson.videoUrl}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedLesson.title}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4DD]">
                    <PlayCircle className="h-8 w-8 text-[#7FB13D]" />
                  </div>
                  <p className="font-medium text-[#2F3431]">Select a lesson to begin</p>
                  <p className="mt-1 text-sm text-[#9AA19B]">
                    Choose from the sidebar to start watching
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
