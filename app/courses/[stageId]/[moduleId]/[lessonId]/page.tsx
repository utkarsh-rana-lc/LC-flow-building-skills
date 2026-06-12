"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  FileText,
  Code,
  ChevronLeft,
  ChevronRight,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { stages } from "@/lib/data/courses";
import { cn } from "@/lib/utils";
import { useFullscreen } from "@/hooks/use-fullscreen";

const lessonTypeIcons: Record<string, React.ElementType> = {
  video: PlayCircle,
  reading: FileText,
  exercise: Code,
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const fullscreen = useFullscreen();

  const stageId = params.stageId as string;
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const stageNumber = parseInt(stageId.replace("stage-", ""));
  const stage = stages.find((s) => s.number === stageNumber);

  if (!stage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#5F6661]">Stage not found</p>
      </div>
    );
  }

  let currentModule = null;
  let currentSection = null;
  let currentLesson = null;

  for (const section of stage.sections) {
    for (const module of section.modules) {
      if (module.id === moduleId) {
        currentModule = module;
        currentSection = section;
        for (const lesson of module.lessons) {
          if (lesson.id === lessonId) {
            currentLesson = lesson;
            break;
          }
        }
        break;
      }
    }
    if (currentModule) break;
  }

  if (!currentLesson || !currentModule || !currentSection) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#5F6661]">Lesson not found</p>
      </div>
    );
  }

  const allLessons = stage.sections.flatMap((s) =>
    s.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        ...l,
        moduleId: m.id,
        moduleName: m.title,
        sectionName: s.title,
      }))
    )
  );

  const currentGlobalIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson =
    currentGlobalIndex > 0 ? allLessons[currentGlobalIndex - 1] : null;
  const nextLesson =
    currentGlobalIndex < allLessons.length - 1
      ? allLessons[currentGlobalIndex + 1]
      : null;

  const completedLessons = [
    "s1-m1-l1",
    "s1-m1-l2",
    "s1-m1-l3",
    "s1-m2-l1",
    "s1-m2-l2",
  ];

  const Icon = lessonTypeIcons[currentLesson.type] || FileText;

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      if (nextLesson) {
        router.push(`/courses/${stageId}/${nextLesson.moduleId}/${nextLesson.id}`);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Sidebar Toggle */}
      {!fullscreen && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#7FB13D] text-white shadow-lg lg:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      )}

      <div className="flex">
        {/* Sidebar */}
        {!fullscreen && (
          <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-80 transform border-r border-[#E2E6E1] bg-white transition-transform duration-200 lg:relative lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-[#E2E6E1] p-4">
              <Link
                href={`/courses/${stageId}`}
                className="flex items-center gap-2 text-sm font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Stage {stageNumber}
              </Link>
              <h2 className="mt-3 font-semibold text-[#2F3431]">
                {stage.title}
              </h2>
              <div className="mt-2 flex items-center gap-4 text-xs text-[#5F6661]">
                <span>
                  {currentGlobalIndex + 1} / {allLessons.length} lessons
                </span>
                <span>
                  {Math.round(
                    ((currentGlobalIndex + 1) / allLessons.length) * 100
                  )}
                  % complete
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#E2E6E1]">
                <div
                  className="h-full rounded-full bg-[#7FB13D] transition-all"
                  style={{
                    width: `${((currentGlobalIndex + 1) / allLessons.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Lessons List */}
            <div className="flex-1 overflow-y-auto p-4">
              {stage.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#5F6661]">
                    {section.title}
                  </h3>
                  {section.modules.map((module) => (
                    <div key={module.id} className="mb-3">
                      <p className="mb-1 text-sm font-medium text-[#2F3431]">
                        {module.title}
                      </p>
                      <div className="space-y-1">
                        {module.lessons.map((lesson) => {
                          const isActive = lesson.id === lessonId;
                          const isLessonCompleted =
                            completedLessons.includes(lesson.id) ||
                            (isActive && isCompleted);
                          const LessonIcon =
                            lessonTypeIcons[lesson.type] || FileText;

                          return (
                            <Link
                              key={lesson.id}
                              href={`/courses/${stageId}/${module.id}/${lesson.id}`}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                                isActive
                                  ? "bg-[#EAF4DD] text-[#5E8E2E]"
                                  : "text-[#5F6661] hover:bg-[#F8F9F7] hover:text-[#2F3431]"
                              )}
                            >
                              {isLessonCompleted ? (
                                <CheckCircle className="h-4 w-4 text-[#7FB13D]" />
                              ) : (
                                <LessonIcon className="h-4 w-4" />
                              )}
                              <span className="flex-1 truncate">
                                {lesson.title}
                              </span>
                              <span className="text-xs">{lesson.duration}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>
        )}

        {/* Main Content */}
        <main className="min-h-screen flex-1">
          {/* Top Bar */}
          {!fullscreen && (
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E2E6E1] bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    currentLesson.type === "video" && "bg-[#EAF4DD]",
                    currentLesson.type === "reading" && "bg-[#E3F3F9]",
                    currentLesson.type === "exercise" && "bg-orange-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      currentLesson.type === "video" && "text-[#7FB13D]",
                      currentLesson.type === "reading" && "text-[#1F8AB5]",
                      currentLesson.type === "exercise" && "text-orange-500"
                    )}
                  />
                </div>
                <div>
                  <p className="text-xs text-[#5F6661]">
                    {currentSection.title} / {currentModule.title}
                  </p>
                  <h1 className="font-semibold text-[#2F3431]">
                    {currentLesson.title}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-[#5F6661]">
                  <Clock className="h-4 w-4" />
                  {currentLesson.duration}
                </span>
              </div>
            </header>
          )}

          {/* Content Area */}
          <div className="p-6">
            <div className="mx-auto max-w-4xl">
              {/* Video Content */}
              {currentLesson.type === "video" && (
                <div className="mb-6 flex aspect-video items-center justify-center rounded-xl bg-[#2F3431]">
                  <div className="text-center text-white">
                    <PlayCircle className="mx-auto mb-4 h-16 w-16 opacity-80" />
                    <p className="text-lg font-medium">
                      Video: {currentLesson.title}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      {currentLesson.duration}
                    </p>
                  </div>
                </div>
              )}

              {/* Reading Content */}
              {currentLesson.type === "reading" && (
                <div className="mb-6 rounded-xl border border-[#E2E6E1] bg-white p-8">
                  <div className="prose prose-sm max-w-none">
                    <h2 className="text-[#2F3431]">{currentLesson.title}</h2>
                    <p className="text-[#5F6661]">
                      This is a reading lesson. In a real implementation, this
                      would contain the actual documentation content with
                      formatted text, images, code examples, and more.
                    </p>
                    <h3 className="text-[#2F3431]">Key Concepts</h3>
                    <ul className="text-[#5F6661]">
                      <li>Understanding the fundamentals of bot building</li>
                      <li>Best practices for flow design</li>
                      <li>How to structure your bot architecture</li>
                    </ul>
                    <h3 className="text-[#2F3431]">Summary</h3>
                    <p className="text-[#5F6661]">
                      After completing this lesson, you should have a solid
                      understanding of the core concepts covered.
                    </p>
                  </div>
                </div>
              )}

              {/* Exercise Content */}
              {currentLesson.type === "exercise" && (
                <div className="mb-6 rounded-xl border border-[#E2E6E1] bg-white p-8">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                      <Code className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#2F3431]">
                        Practice Exercise
                      </h2>
                      <p className="text-[#5F6661]">{currentLesson.title}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#F8F9F7] p-6">
                    <h3 className="mb-2 font-medium text-[#2F3431]">
                      Instructions
                    </h3>
                    <p className="mb-4 text-sm text-[#5F6661]">
                      Complete the following tasks to practice what you have
                      learned in this module.
                    </p>
                    <ul className="mb-4 space-y-2 text-sm text-[#5F6661]">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7FB13D]" />
                        Create a new flow with a welcome message
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7FB13D]" />
                        Add a condition based on user input
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7FB13D]" />
                        Test the flow in preview mode
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Completion Section */}
              <div className="rounded-xl border border-[#E2E6E1] bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2F3431]">
                      Ready to continue?
                    </h3>
                    <p className="text-sm text-[#5F6661]">
                      Mark this lesson as complete to track your progress
                    </p>
                  </div>
                  <button
                    onClick={handleMarkComplete}
                    disabled={isCompleted}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                      isCompleted
                        ? "bg-[#EAF4DD] text-[#5E8E2E]"
                        : "bg-[#7FB13D] text-white hover:bg-[#5E8E2E]"
                    )}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        Mark as Complete
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                {prevLesson ? (
                  <Link
                    href={`/courses/${stageId}/${prevLesson.moduleId}/${prevLesson.id}`}
                    className="flex items-center gap-2 rounded-lg border border-[#E2E6E1] bg-white px-4 py-3 text-sm transition-all hover:border-[#7FB13D]/30"
                  >
                    <ChevronLeft className="h-4 w-4 text-[#5F6661]" />
                    <div className="text-left">
                      <p className="text-xs text-[#5F6661]">Previous</p>
                      <p className="font-medium text-[#2F3431]">
                        {prevLesson.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link
                    href={`/courses/${stageId}/${nextLesson.moduleId}/${nextLesson.id}`}
                    className="flex items-center gap-2 rounded-lg border border-[#E2E6E1] bg-white px-4 py-3 text-sm transition-all hover:border-[#7FB13D]/30"
                  >
                    <div className="text-right">
                      <p className="text-xs text-[#5F6661]">Next</p>
                      <p className="font-medium text-[#2F3431]">
                        {nextLesson.title}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#5F6661]" />
                  </Link>
                ) : (
                  <Link
                    href="/certifications"
                    className="flex items-center gap-2 rounded-full bg-[#7FB13D] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5E8E2E]"
                  >
                    View Certification
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
