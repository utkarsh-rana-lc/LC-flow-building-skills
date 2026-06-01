"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/app-layout";

interface Lesson {
  module: string;
  order: number;
  title: string;
  videoUrl: string;
  description: string;
}

function parseCSV(csvText: string): Lesson[] {
  const lines = csvText.split("\n");
  const lessons: Lesson[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Handle quoted commas in CSV
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
    
    if (values.length >= 5) {
      lessons.push({
        module: values[0] || "",
        order: parseInt(values[1]) || 0,
        title: values[2] || "",
        videoUrl: values[3] || "",
        description: values[4] || "",
      });
    }
  }
  
  return lessons;
}

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
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
        
        // Auto-select first lesson with a video URL
        const firstWithVideo = parsedLessons.find((l) => l.videoUrl);
        if (firstWithVideo) {
          setSelectedLesson(firstWithVideo);
        }
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLessons();
  }, []);

  // Group lessons by module
  const groupedLessons = useMemo(() => {
    const groups: Record<string, Lesson[]> = {};
    
    for (const lesson of lessons) {
      if (!groups[lesson.module]) {
        groups[lesson.module] = [];
      }
      groups[lesson.module].push(lesson);
    }
    
    // Sort lessons within each module by order
    for (const module of Object.keys(groups)) {
      groups[module].sort((a, b) => a.order - b.order);
    }
    
    return groups;
  }, [lessons]);

  const moduleNames = Object.keys(groupedLessons);
  const totalLessons = lessons.length;
  const lessonsWithVideo = lessons.filter((l) => l.videoUrl).length;

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
      <div className="min-h-screen">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#7FB13D] text-white shadow-lg lg:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-16 z-40 w-80 transform border-r border-[#E2E6E1] bg-white transition-transform duration-200 lg:relative lg:left-0 lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b border-[#E2E6E1] p-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
                <h2 className="mt-3 font-semibold text-[#2F3431]">
                  Bot Builder Academy
                </h2>
                <div className="mt-2 flex items-center gap-4 text-xs text-[#5F6661]">
                  <span>{lessonsWithVideo} / {totalLessons} available</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#E2E6E1]">
                  <div
                    className="h-full rounded-full bg-[#7FB13D] transition-all"
                    style={{
                      width: `${(lessonsWithVideo / totalLessons) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="flex-1 overflow-y-auto p-4">
                {moduleNames.map((moduleName) => (
                  <div key={moduleName} className="mb-4">
                    <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#5F6661]">
                      {moduleName}
                    </h3>
                    <div className="space-y-1">
                      {groupedLessons[moduleName].map((lesson) => {
                        const isActive = selectedLesson?.title === lesson.title && selectedLesson?.module === lesson.module;
                        const hasVideo = !!lesson.videoUrl;

                        if (!hasVideo) {
                          return (
                            <div
                              key={`${lesson.module}-${lesson.order}`}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9AA19B] cursor-not-allowed"
                            >
                              <PlayCircle className="h-4 w-4" />
                              <span className="flex-1 truncate">
                                {lesson.title}
                              </span>
                              <span className="rounded bg-[#E2E6E1] px-1.5 py-0.5 text-[10px] font-medium">
                                Coming soon
                              </span>
                            </div>
                          );
                        }

                        return (
                          <button
                            key={`${lesson.module}-${lesson.order}`}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setSidebarOpen(false);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all",
                              isActive
                                ? "bg-[#EAF4DD] text-[#5E8E2E]"
                                : "text-[#5F6661] hover:bg-[#F8F9F7] hover:text-[#2F3431]"
                            )}
                          >
                            <PlayCircle className="h-4 w-4" />
                            <span className="flex-1 truncate">
                              {lesson.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-h-screen flex-1">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E2E6E1] bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF4DD]">
                  <PlayCircle className="h-5 w-5 text-[#7FB13D]" />
                </div>
                <div>
                  {selectedLesson && (
                    <>
                      <p className="text-xs text-[#5F6661]">
                        {selectedLesson.module}
                      </p>
                      <h1 className="font-semibold text-[#2F3431]">
                        {selectedLesson.title}
                      </h1>
                    </>
                  )}
                </div>
              </div>
              {selectedLesson && (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-[#5F6661]">
                    <Clock className="h-4 w-4" />
                    Video Lesson
                  </span>
                </div>
              )}
            </header>

            {/* Content Area */}
            <div className="w-full">
              {selectedLesson ? (
                <iframe
                  src={selectedLesson.videoUrl}
                  className="w-full border-0"
                  style={{ height: "calc(100vh - 57px)" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedLesson.title}
                />
              ) : (
                <div className="flex items-center justify-center bg-[#F8F9F7]" style={{ height: "calc(100vh - 57px)" }}>
                  <div className="text-center">
                    <PlayCircle className="mx-auto mb-4 h-16 w-16 text-[#9AA19B]" />
                    <p className="text-[#5F6661]">
                      Select a lesson from the sidebar to begin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
