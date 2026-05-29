"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { stages } from "@/lib/data/courses";

export default function CertificationsPage() {
  // All stages use LimeChat green variations
  const stageColors = ["#7FB13D", "#5E8E2E", "#4A7A24", "#3D6B1C"];
  const stageBgColors = ["#EAF4DD", "#E5F0DA", "#DCE8D2", "#D4E0C9"];
  const userProgress = [35, 0, 0, 0];

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[#E2E6E1] bg-white">
          <div className="flex h-14 items-center px-6">
            <nav className="flex items-center gap-1.5 text-sm">
              <Link href="/dashboard" className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">Academy</Link>
              <span className="text-[#9AA19B]">/</span>
              <span className="text-[#2F3431]">Certifications</span>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#2F3431]">Certifications</h1>
            <p className="mt-1 text-sm text-[#5F6661]">Earn certifications by completing each stage</p>
          </div>

          {/* Summary */}
          <div className="mb-6 rounded-lg border border-[#E2E6E1] bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#5F6661]">Your Progress</p>
                <p className="mt-1 text-2xl font-semibold text-[#2F3431]">0 <span className="text-base font-normal text-[#5F6661]">of 4 certifications</span></p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#E2E6E1]">
                <span className="text-lg font-bold text-[#5F6661]">0%</span>
              </div>
            </div>
          </div>

          {/* Certification Cards */}
          <div className="space-y-3">
            {stages.map((stage, i) => {
              const progress = userProgress[i];
              const isCompleted = progress === 100;

              return (
                <div 
                  key={stage.id} 
                  className="flex items-center gap-4 rounded-lg border border-[#E2E6E1] bg-white p-4 transition-colors hover:bg-[#F8F9F7]"
                >
                  {/* Stage Badge */}
                  <div 
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: stageBgColors[i] }}
                  >
                    {isCompleted ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={stageColors[i]}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stageColors[i]} strokeWidth="1.5">
                        <circle cx="12" cy="8" r="6" />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: stageColors[i] }}
                      >
                        Stage {stage.number}
                      </span>
                      {isCompleted && <span className="text-xs font-medium text-[#7FB13D]">Certified</span>}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-[#2F3431]">{stage.certification.title}</h3>
                    <p className="text-xs text-[#5F6661]">{stage.certification.projectTitle}</p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <button className="flex items-center gap-1.5 rounded-full border border-[#E2E6E1] px-4 py-1.5 text-xs font-medium text-[#2F3431] transition-colors hover:bg-[#F8F9F7]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                      </button>
                    ) : progress > 0 ? (
                      <div className="text-right">
                        <p className="text-xs font-medium text-[#7FB13D]">{progress}%</p>
                        <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-[#E2E6E1]">
                          <div className="h-full rounded-full bg-[#7FB13D]" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/courses/stage-${stage.number}`}
                        className="text-xs font-medium text-[#7FB13D] hover:underline"
                      >
                        Start Stage
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
