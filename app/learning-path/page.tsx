"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { stages, getTotalLessonsInStage } from "@/lib/data/courses";

export default function LearningPathPage() {
  const userProgress = [35, 0, 0, 0];
  const durations = [12, 8, 10, 6];
  // All stages use LimeChat green variations
  const stageColors = ["#7FB13D", "#5E8E2E", "#4A7A24", "#3D6B1C"];
  const stageBgColors = ["#EAF4DD", "#E5F0DA", "#DCE8D2", "#D4E0C9"];

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[#E2E6E1] bg-white">
          <div className="flex h-14 items-center px-6">
            <nav className="flex items-center gap-1.5 text-sm">
              <Link href="/dashboard" className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">Academy</Link>
              <span className="text-[#9AA19B]">/</span>
              <span className="text-[#2F3431]">Learning Path</span>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#2F3431]">Learning Path</h1>
            <p className="mt-1 text-sm text-[#5F6661]">Your roadmap to becoming a certified LimeChat Bot Builder</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-5 top-12 bottom-12 w-0.5 bg-[#E2E6E1]" />
            
            <div className="space-y-4">
              {stages.map((stage, i) => {
                const totalLessons = getTotalLessonsInStage(stage);
                const progress = userProgress[i];
                const isStarted = progress > 0;

                return (
                  <div key={stage.id} className="relative flex gap-4">
                    {/* Stage Number Circle */}
                    <div 
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: stageBgColors[i], color: stageColors[i] }}
                    >
                      {progress === 100 ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      ) : stage.number}
                    </div>

                    {/* Stage Card */}
                    <Link
                      href={`/courses/stage-${stage.number}`}
                      className="flex-1 rounded-lg border border-[#E2E6E1] bg-white p-5 transition-all hover:border-[#7FB13D] hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span 
                              className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                              style={{ backgroundColor: stageColors[i] }}
                            >
                              Stage {stage.number}
                            </span>
                            {isStarted && progress < 100 && (
                              <span className="text-xs font-medium text-[#7FB13D]">In Progress</span>
                            )}
                            {progress === 100 && (
                              <span className="text-xs font-medium text-[#7FB13D]">Completed</span>
                            )}
                          </div>
                          <h3 className="mt-2 text-base font-semibold text-[#2F3431]">{stage.title}</h3>
                          <p className="mt-0.5 text-sm text-[#5F6661]">{stage.subtitle}</p>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9AA19B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>

                      {/* Meta Info */}
                      <div className="mt-3 flex items-center gap-4 text-xs text-[#5F6661]">
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                          {totalLessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {durations[i]} hours
                        </span>
                        <span>{stage.sections.flatMap(s => s.modules).length} modules</span>
                      </div>

                      {/* Progress Bar */}
                      {isStarted && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#5F6661]">Progress</span>
                            <span className="font-medium text-[#7FB13D]">{progress}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E2E6E1]">
                            <div className="h-full rounded-full bg-[#7FB13D]" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-8 rounded-lg border border-[#E2E6E1] bg-white p-5">
            <h3 className="text-sm font-semibold text-[#2F3431]">Path Overview</h3>
            <div className="mt-4 grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-[#7FB13D]">4</p>
                <p className="text-xs text-[#5F6661]">Stages</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2F3431]">42</p>
                <p className="text-xs text-[#5F6661]">Modules</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2F3431]">157</p>
                <p className="text-xs text-[#5F6661]">Lessons</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#2F3431]">36h</p>
                <p className="text-xs text-[#5F6661]">Total Duration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
