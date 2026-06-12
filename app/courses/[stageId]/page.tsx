"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { stages } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

// All stages use LimeChat green variations
const stageColors = ["#7FB13D", "#5E8E2E", "#4A7A24", "#3D6B1C"];
const stageBgColors = ["#EAF4DD", "#E5F0DA", "#DCE8D2", "#D4E0C9"];

export default function StagePage() {
  const params = useParams();
  const stageNumber = Number.parseInt((params.stageId as string).replace("stage-", ""));
  const stage = stages.find((s) => s.number === stageNumber);
  const stageIndex = stageNumber - 1;
  const fullscreen = useFullscreen();

  if (!stage) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-[#5F6661]">Stage not found</p>
        </div>
      </AppLayout>
    );
  }

  const completedLessons = ["s1-m1-l1", "s1-m1-l2", "s1-m1-l3", "s1-m2-l1", "s1-m2-l2"];
  const currentLesson = "s1-m2-l3";
  const totalLessons = stage.sections.flatMap((s) => s.modules.flatMap((m) => m.lessons)).length;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

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
                <Link href="/courses" className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">Courses</Link>
                <span className="text-[#9AA19B]">/</span>
                <span className="text-[#2F3431]">Stage {stageNumber}</span>
              </nav>
            </div>
          </header>
        )}

        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Stage Header Card */}
          <div className="mb-6 rounded-xl border border-[#E2E6E1] bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div 
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                  style={{ backgroundColor: stageBgColors[stageIndex], color: stageColors[stageIndex] }}
                >
                  {stageNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: stageColors[stageIndex] }}
                    >
                      Stage {stageNumber}
                    </span>
                    {progress > 0 && progress < 100 && (
                      <span className="text-xs font-medium text-[#7FB13D]">In Progress</span>
                    )}
                  </div>
                  <h1 className="mt-2 text-xl font-semibold text-[#2F3431]">{stage.title}</h1>
                  <p className="mt-1 text-sm text-[#5F6661]">{stage.subtitle}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-[#5F6661]">
                    <span>{totalLessons} lessons</span>
                    <span>{stage.sections.flatMap(s => s.modules).length} modules</span>
                    <span>~{Math.round(totalLessons * 0.15)}h</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: stageColors[stageIndex] }}>{progress}%</p>
                <div className="mt-2 h-2 w-24 overflow-hidden rounded-full bg-[#E2E6E1]">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${progress}%`, backgroundColor: stageColors[stageIndex] }} 
                  />
                </div>
                <p className="mt-1 text-xs text-[#5F6661]">{completedLessons.length} of {totalLessons} complete</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Modules List */}
            <div className="space-y-4 lg:col-span-2">
              {stage.sections.map((section, si) => (
                <div key={section.id} className="rounded-xl border border-[#E2E6E1] bg-white">
                  <div className="flex items-center gap-3 border-b border-[#E2E6E1] px-5 py-4">
                    <div 
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: stageColors[stageIndex] }}
                    >
                      {si + 1}
                    </div>
                    <span className="text-sm font-semibold text-[#2F3431]">{section.title}</span>
                  </div>
                  <div className="divide-y divide-[#E2E6E1]">
                    {section.modules.map((module) => (
                      <div key={module.id} className="p-4">
                        <p className="mb-3 text-sm font-medium text-[#2F3431]">{module.title}</p>
                        <div className="space-y-1">
                          {module.lessons.map((lesson) => {
                            const done = completedLessons.includes(lesson.id);
                            const current = lesson.id === currentLesson;
                            return (
                              <Link 
                                key={lesson.id} 
                                href={`/courses/stage-${stageNumber}/${module.id}/${lesson.id}`}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                                  current ? "bg-[#EAF4DD]" : "hover:bg-[#F8F9F7]"
                                )}
                              >
                                {/* Icon */}
                                <div className={cn(
                                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded",
                                  done ? "bg-[#EAF4DD]" : "bg-[#F1F3F0]"
                                )}>
                                  {lesson.type === "video" && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={done ? "#7FB13D" : "#9AA19B"}>
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  )}
                                  {lesson.type === "reading" && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={done ? "#7FB13D" : "#9AA19B"} strokeWidth="2">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                      <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                  )}
                                  {lesson.type === "exercise" && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={done ? "#7FB13D" : "#9AA19B"} strokeWidth="2">
                                      <polyline points="16 18 22 12 16 6" />
                                      <polyline points="8 6 2 12 8 18" />
                                    </svg>
                                  )}
                                </div>
                                <span className={cn("flex-1", done ? "text-[#5F6661]" : "text-[#2F3431]")}>
                                  {lesson.title}
                                </span>
                                <span className="text-xs text-[#9AA19B]">{lesson.duration}</span>
                                {done && (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#7FB13D">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                  </svg>
                                )}
                                {current && !done && (
                                  <span className="rounded-full bg-[#7FB13D] px-2 py-0.5 text-xs font-medium text-white">Continue</span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Certification Card */}
              <div className="rounded-xl border border-[#E2E6E1] bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F2B705" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span className="text-sm font-semibold text-[#2F3431]">Stage Certification</span>
                </div>
                <p className="text-sm text-[#2F3431]">{stage.certification.title}</p>
                <p className="mt-1 text-xs text-[#5F6661]">{stage.certification.projectTitle}</p>
                <button 
                  disabled={progress < 100}
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors",
                    progress >= 100 
                      ? "bg-[#7FB13D] text-white hover:bg-[#5E8E2E]" 
                      : "cursor-not-allowed bg-[#F1F3F0] text-[#9AA19B]"
                  )}
                >
                  {progress >= 100 ? "Start Project" : "Complete all lessons first"}
                </button>
              </div>

              {/* Skills Card */}
              <div className="rounded-xl border border-[#E2E6E1] bg-white p-5">
                <p className="text-sm font-semibold text-[#2F3431]">You will learn</p>
                <ul className="mt-3 space-y-2">
                  {stage.capabilities.slice(0, 4).map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#2F3431]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#7FB13D" className="mt-0.5 flex-shrink-0">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
