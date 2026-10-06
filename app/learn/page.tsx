"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/app-layout";
import { EmbeddedBackBar } from "@/components/layout/embedded-back-bar";
import { useFullscreen } from "@/hooks/use-fullscreen";

interface Lesson {
  module: string;
  order: number;
  title: string;
  videoUrl: string;
  description: string;
}

function videoId(videoUrl: string): string {
  return new URL(videoUrl).pathname.split("/").filter(Boolean).at(-1) || "";
}

function requestedVideoId(): string | null {
  return new URLSearchParams(window.location.search).get("video");
}

function parseCSV(csvText: string): Lesson[] {
  const lines = csvText.split("\n");
  const lessons: Lesson[] = [];

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

    // col0=Module, col1=Order, col2=Title, col3=VideoURL, col4=Description
    const module  = values[0]?.trim() || "";
    const order   = parseInt(values[1]?.trim() || "0") || 0;
    const title   = values[2]?.trim() || "";
    const videoUrl = values[3]?.trim() || "";
    const description = values[4]?.trim() || "";

    // Forward-fill module (only the first row of each module names it)
    if (module) lastModule = module;

    // Skip rows with no title
    if (!title) continue;

    lessons.push({
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
  const fullscreen = useFullscreen();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch(`/api/learn-lessons?t=${Date.now()}`, {
          cache: "no-store",
        });
        const csvText = await response.text();
        const parsedLessons = parseCSV(csvText);
        setLessons(parsedLessons);

        const requestedId = requestedVideoId();
        const requestedLesson = parsedLessons.find(
          (lesson) => lesson.videoUrl && videoId(lesson.videoUrl) === requestedId
        );
        setSelectedLesson(
          requestedId
            ? requestedLesson || null
            : parsedLessons.find((lesson) => lesson.videoUrl) || null
        );
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  useEffect(() => {
    function selectFromUrl() {
      const requestedId = requestedVideoId();
      setSelectedLesson(
        requestedId
          ? lessons.find((lesson) => lesson.videoUrl && videoId(lesson.videoUrl) === requestedId) || null
          : lessons.find((lesson) => lesson.videoUrl) || null
      );
    }
    window.addEventListener("popstate", selectFromUrl);
    return () => window.removeEventListener("popstate", selectFromUrl);
  }, [lessons]);

  // Filter lessons by search term across title, module, stage, description
  const filteredLessons = useMemo(() => {
    if (!searchTerm.trim()) return lessons;
    const q = searchTerm.toLowerCase();
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.module.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }, [lessons, searchTerm]);

  // Group: Module → sorted Lessons (insertion order preserves the sheet order)
  const groupedByModule = useMemo(() => {
    const moduleMap: Record<string, Lesson[]> = {};
    for (const lesson of filteredLessons) {
      if (!moduleMap[lesson.module]) moduleMap[lesson.module] = [];
      moduleMap[lesson.module].push(lesson);
    }
    for (const mod of Object.keys(moduleMap)) {
      moduleMap[mod].sort((a, b) => a.order - b.order);
    }
    return moduleMap;
  }, [filteredLessons]);

  const moduleNames = Object.keys(groupedByModule);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-screen flex-col">
          {fullscreen && <EmbeddedBackBar href="/academy" label="Back to Academy home" />}
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#7FB13D] border-t-transparent" />
              <p className="text-sm text-[#5F6661]">Loading lessons...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  const lessonListToggle = (
    <button
      type="button"
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={sidebarOpen ? "Close lesson list" : "Open lesson list"}
      aria-expanded={sidebarOpen}
      aria-controls="academy-lesson-list"
      className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5F6661] hover:bg-[#F8F9F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5E8E2E] md:hidden"
    >
      {sidebarOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
    </button>
  );

  return (
    <AppLayout>
      <div className="flex h-screen flex-col">
        {/* Top bar */}
        {fullscreen ? <EmbeddedBackBar href="/academy" label="Back to Academy home">{lessonListToggle}</EmbeddedBackBar> : <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-[#E2E6E1] bg-white px-5">
          <div className="flex items-center gap-3">
            <Link
              href="/academy"
              className="flex items-center gap-1.5 text-sm font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]"
            >
              <ArrowLeft className="h-4 w-4" />
              Academy
            </Link>
            <span className="text-[#E2E6E1]">/</span>
            {selectedLesson ? (
              <>
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
          {lessonListToggle}
        </header>}

        <div className="relative flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            id="academy-lesson-list"
            className={cn(
              "absolute inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#E2E6E1] bg-white transition-transform duration-200 md:relative md:translate-x-0",
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
              {moduleNames.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="mb-3 h-8 w-8 text-[#E2E6E1]" />
                  <p className="text-sm font-medium text-[#2F3431]">No results</p>
                  <p className="mt-1 text-xs text-[#9AA19B]">Try a different search term</p>
                </div>
              ) : (
                moduleNames.map((moduleName) => (
                  <div key={moduleName} className="mb-5">
                    {/* Module heading */}
                    <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-[#7FB13D]">
                      {moduleName}
                    </p>
                    <div className="space-y-0.5">
                      {groupedByModule[moduleName].map((lesson) => {
                        const isActive = selectedLesson?.videoUrl === lesson.videoUrl;
                        const hasVideo = !!lesson.videoUrl;

                        if (!hasVideo) {
                          return (
                            <div
                              key={`${lesson.module}-${lesson.order}-${lesson.title}`}
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
                            key={`${lesson.module}-${lesson.order}-${lesson.title}`}
                            onClick={() => {
                              const url = new URL(window.location.href);
                              url.searchParams.set("video", videoId(lesson.videoUrl));
                              window.history.pushState(null, "", url);
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
                ))
              )}
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-black/20 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          )}

          {/* Main content */}
          <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F8F9F7]">
            {selectedLesson ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 lg:p-6">
                {/* Lesson title above the video */}
                <div className="mx-auto mb-4 w-full max-w-[820px] shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7FB13D]">
                    {selectedLesson.module}
                  </p>
                  <h1 className="mt-1 text-xl font-bold text-[#2F3431] text-balance">
                    {selectedLesson.title}
                  </h1>
                </div>
                {/* Keep Clueso below its two-column breakpoint so the document stays under the video. */}
                <div className="mx-auto min-h-[20rem] w-full max-w-[820px] flex-1 overflow-hidden rounded-xl border border-[#E2E6E1] bg-white shadow-sm">
                  <iframe
                    key={selectedLesson.videoUrl}
                    src={selectedLesson.videoUrl}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedLesson.title}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4DD]">
                    <PlayCircle className="h-8 w-8 text-[#7FB13D]" />
                  </div>
                  <p className="font-medium text-[#2F3431]">
                    {requestedVideoId() ? "Video unavailable" : "Select a lesson to begin"}
                  </p>
                  <p className="mt-1 text-sm text-[#9AA19B]">
                    {requestedVideoId()
                      ? "This video is no longer in the Learning Academy. Choose another from the sidebar."
                      : "Choose from the sidebar to start watching"}
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
