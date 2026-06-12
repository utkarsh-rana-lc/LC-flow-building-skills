"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { stages, getTotalLessonsInStage } from "@/lib/data/courses";

export default function CoursesPage() {
  // All stages use LimeChat green variations
  const stageColors = ["#7FB13D", "#5E8E2E", "#4A7A24", "#3D6B1C"];
  const stageBgColors = ["#EAF4DD", "#E5F0DA", "#DCE8D2", "#D4E0C9"];
  const durations = [12, 8, 10, 6];
  const userProgress = [35, 0, 0, 0];
  const fullscreen = useFullscreen();

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Header */}
        {!fullscreen && (
          <header className="sticky top-0 z-10 border-b border-[#E2E6E1] bg-white">
            <div className="flex h-14 items-center px-6">
              <nav className="flex items-center gap-1.5 text-sm">
                <Link href="/dashboard" className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">Academy</Link>
                <span className="text-[#9AA19B]">/</span>
                <span className="text-[#2F3431]">Courses</span>
              </nav>
            </div>
          </header>
        )}

        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#2F3431]">Courses</h1>
            <p className="mt-1 text-sm text-[#5F6661]">Browse all available learning content</p>
          </div>

          {/* Featured Course */}
          <div className="mb-8 overflow-hidden rounded-xl border border-[#E2E6E1] bg-white">
            <div className="flex">
              <div className="flex w-40 flex-shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[#7FB13D] to-[#5E8E2E] p-6 text-white">
                <p className="text-4xl font-bold">4</p>
                <p className="mt-1 text-sm">Stages</p>
                <p className="mt-4 text-3xl font-bold">157</p>
                <p className="mt-1 text-sm">Lessons</p>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#EAF4DD] px-2 py-0.5 text-xs font-medium text-[#7FB13D]">Featured</span>
                  <span className="rounded-md bg-[#DBEAFE] px-2 py-0.5 text-xs font-medium text-[#3B82F6]">In Progress</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-[#2F3431]">Bot Builder Certification Program</h2>
                <p className="mt-1 text-sm text-[#5F6661]">
                  Complete certification course covering everything from click-based bots to production-ready agentic systems.
                </p>
                <div className="mt-4 flex items-center gap-6 text-sm text-[#5F6661]">
                  <span>36 hours total</span>
                  <span>42 modules</span>
                  <span>4 certifications</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5F6661]">Overall Progress</span>
                    <span className="font-medium text-[#7FB13D]">12%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#E2E6E1]">
                    <div className="h-full rounded-full bg-[#7FB13D]" style={{ width: "12%" }} />
                  </div>
                </div>
                <Link
                  href="/learning-path"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#7FB13D] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5E8E2E]"
                >
                  Continue Learning
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* All Stages */}
          <h2 className="mb-4 text-sm font-semibold text-[#2F3431]">All Stages</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {stages.map((stage, i) => {
              const totalLessons = getTotalLessonsInStage(stage);
              const progress = userProgress[i];

              return (
                <Link
                  key={stage.id}
                  href={`/courses/stage-${stage.number}`}
                  className="rounded-lg border border-[#E2E6E1] bg-white p-5 transition-all hover:border-[#7FB13D] hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: stageBgColors[i] }}
                    >
                      <span className="text-sm font-bold" style={{ color: stageColors[i] }}>{stage.number}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#2F3431]">{stage.title}</h3>
                      <p className="mt-0.5 text-xs text-[#5F6661]">{stage.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#5F6661]">
                    <span>{totalLessons} lessons</span>
                    <span>{stage.sections.flatMap(s => s.modules).length} modules</span>
                    <span>{durations[i]}h</span>
                  </div>
                  {progress > 0 && (
                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E6E1]">
                        <div className="h-full rounded-full bg-[#7FB13D]" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-1 text-right text-xs font-medium text-[#7FB13D]">{progress}%</p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
