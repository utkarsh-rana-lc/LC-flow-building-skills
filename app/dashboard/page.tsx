"use client";

import Link from "next/link";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";

export default function DashboardPage() {
  const stages = [
    { id: 1, title: "Bot Builder Foundations", desc: "Click-based bots, flow logic, and basic configurations", modules: 17, hours: 12, progress: 35 },
    { id: 2, title: "Advanced Bot Builder & Agents", desc: "Hybrid architectures, GPT integration, and agent systems", modules: 9, hours: 8, progress: 0 },
    { id: 3, title: "Production-Ready Agentic Bots", desc: "Real-world implementation, scaling, and optimization", modules: 10, hours: 10, progress: 0 },
    { id: 4, title: "Auditing, Testing & Debugging", desc: "Quality assurance, testing frameworks, and debugging tools", modules: 6, hours: 6, progress: 0 },
  ];

  const stageColors = ["#7FB13D", "#5E8E2E", "#4A7A24", "#3D6B1C"];
  const stageBgColors = ["#EAF4DD", "#E5F0DA", "#DCE8D2", "#D4E0C9"];

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[#E2E6E1] bg-white">
          <div className="flex h-14 items-center px-6">
            <nav className="flex items-center gap-1.5 text-sm">
              <span className="font-medium text-[#7FB13D]">Academy</span>
              <span className="text-[#9AA19B]">/</span>
              <span className="text-[#2F3431]">Home</span>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Hero */}
          <section className="mb-8 overflow-hidden rounded-xl border border-[#E2E6E1] bg-white">
            <div className="bg-gradient-to-r from-[#EAF4DD]/50 to-white px-8 py-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/images/limechat-logo.png"
                    alt="LimeChat"
                    width={180}
                    height={48}
                    className="h-12 w-auto"
                    priority
                  />
                  <span className="text-sm font-medium text-[#5F6661]">Bot Builder Academy</span>
                </div>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#5F6661]">
                  Master building production-ready conversational bots. Complete 4 stages to earn your certification as a LimeChat Bot Builder expert.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href="/courses/stage-1"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7FB13D] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#5E8E2E] hover:shadow"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Continue Learning
                  </Link>
                  <Link
                    href="/learning-path"
                    className="inline-flex items-center gap-2 rounded-full border border-[#E2E6E1] bg-white px-5 py-2.5 text-sm font-medium text-[#5F6661] transition-all hover:border-[#7FB13D] hover:text-[#5E8E2E]"
                  >
                    View Full Path
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Stats - hidden for now */}
          {false && (
          <section className="mb-8 grid grid-cols-3 gap-4">
            {[
              { label: "Lessons Completed", value: "18", total: "/ 157" },
              { label: "Current Stage", value: "1", total: "of 4", color: "#7FB13D" },
              { label: "Certifications", value: "0", total: "/ 4" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-[#E2E6E1] bg-white p-5 transition-shadow hover:shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9AA19B]">{stat.label}</p>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold" style={{ color: stat.color || "#2F3431" }}>{stat.value}</span>
                  <span className="text-sm text-[#9AA19B]">{stat.total}</span>
                </p>
              </div>
            ))}
          </section>
          )}

          {/* Learning Path */}
          <section className="rounded-xl border border-[#E2E6E1] bg-white">
            <header className="flex items-center justify-between border-b border-[#E2E6E1] px-6 py-4">
              <h2 className="font-semibold text-[#2F3431]">Your Learning Path</h2>
              <Link href="/learning-path" className="text-sm font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">
                View all
              </Link>
            </header>
            <div className="divide-y divide-[#E2E6E1]">
              {stages.map((stage, idx) => (
                <Link
                  key={stage.id}
                  href={`/courses/stage-${stage.id}`}
                  className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#F8F9F7]"
                >
                  <div 
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                    style={{ backgroundColor: stageBgColors[idx] }}
                  >
                    <span className="text-sm font-bold" style={{ color: stageColors[idx] }}>{stage.id}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#2F3431]">{stage.title}</p>
                    <p className="mt-0.5 text-sm text-[#9AA19B]">{stage.desc}</p>
                  </div>
                  <div className="hidden items-center gap-5 text-sm text-[#5F6661] lg:flex">
                    <span className="tabular-nums">{stage.modules} modules</span>
                    <span className="tabular-nums">{stage.hours}h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {stage.progress > 0 ? (
                      <>
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-[#E2E6E1]">
                          <div className="h-full rounded-full bg-[#7FB13D] transition-all" style={{ width: `${stage.progress}%` }} />
                        </div>
                        <span className="w-10 text-right text-sm font-medium text-[#7FB13D]">{stage.progress}%</span>
                      </>
                    ) : (
                      <span className="text-sm text-[#9AA19B]">Start</span>
                    )}
                    <svg className="text-[#9AA19B] transition-colors group-hover:text-[#7FB13D]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Actions - hidden for now */}
          {false && (
          <section className="mt-8 grid grid-cols-3 gap-4">
            {[
              { href: "/courses", icon: "book", color: "#7FB13D", bg: "#EAF4DD", title: "Browse Courses", desc: "Explore all content" },
              { href: "/certifications", icon: "award", color: "#3B82F6", bg: "#DBEAFE", title: "Certifications", desc: "Track achievements" },
              { href: "/help", icon: "help", color: "#F2B705", bg: "#FEF3C7", title: "Get Help", desc: "FAQs and support" },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="group rounded-xl border border-[#E2E6E1] bg-white p-5 transition-all hover:border-[#7FB13D]/30 hover:shadow-sm"
              >
                <div 
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon === "book" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  )}
                  {item.icon === "award" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  )}
                  {item.icon === "help" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )}
                </div>
                <p className="font-medium text-[#2F3431]">{item.title}</p>
                <p className="mt-1 text-sm text-[#9AA19B]">{item.desc}</p>
              </Link>
            ))}
          </section>
          )}
      </div>
    </AppLayout>
  );
}
