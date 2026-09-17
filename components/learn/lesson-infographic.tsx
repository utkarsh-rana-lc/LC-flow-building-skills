import { Clock, Layers, GraduationCap, Bot, Workflow, MessageSquareText, LineChart, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: Clock, label: "Est. time", value: "12 min" },
  { icon: Layers, label: "Lessons", value: "6 parts" },
  { icon: GraduationCap, label: "Level", value: "Beginner" },
];

const journey = [
  { icon: Bot, title: "Create a bot", caption: "Spin up a new bot from the Agentic Studio UI." },
  { icon: Workflow, title: "Design the flow", caption: "Map intents, branches and fallbacks visually." },
  { icon: MessageSquareText, title: "Train responses", caption: "Add knowledge, tone and guardrails." },
  { icon: LineChart, title: "Measure & iterate", caption: "Track resolution rate in Bot Analytics." },
];

const outcomes = [
  "Understand how LimeChat bots automate D2C conversations",
  "Build and publish your first bot end-to-end",
  "Read the core analytics that prove bot performance",
  "Know when to hand off from bot to a human agent",
];

export function LessonInfographic() {
  return (
    <section
      aria-label="Lesson overview infographic"
      className="mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-xl border border-[#E2E6E1] bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-[#E2E6E1] bg-gradient-to-b from-[#EAF4DD] to-white px-6 py-5">
        <span className="inline-flex items-center rounded-full bg-[#7FB13D] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          Sample preview
        </span>
        <h2 className="mt-3 text-xl font-bold text-[#2F3431]">Lesson at a glance</h2>
        <p className="mt-1 text-sm text-[#5F6661]">
          A quick visual summary of what this module covers. (Placeholder content for review.)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 px-6 py-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-lg border border-[#E2E6E1] bg-[#F8F9F7] px-4 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#EAF4DD]">
              <s.icon className="h-5 w-5 text-[#5E8E2E]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA19B]">{s.label}</p>
              <p className="text-base font-bold text-[#2F3431]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Learning journey */}
      <div className="border-t border-[#E2E6E1] px-6 py-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#7FB13D]">The learning journey</h3>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, i) => (
            <li key={step.title} className="relative flex flex-col rounded-lg border border-[#E2E6E1] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4DD]">
                  <step.icon className="h-5 w-5 text-[#5E8E2E]" />
                </div>
                <span className="text-2xl font-bold text-[#E2E6E1]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-sm font-semibold text-[#2F3431]">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#5F6661]">{step.caption}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Outcomes */}
      <div className="border-t border-[#E2E6E1] bg-[#F8F9F7] px-6 py-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#7FB13D]">What you&apos;ll be able to do</h3>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7FB13D]" />
              <span className="text-sm leading-relaxed text-[#2F3431]">{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
