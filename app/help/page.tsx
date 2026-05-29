"use client";

import { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/app-layout";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How long does it take to complete all stages?", a: "The complete curriculum typically takes 4-6 weeks of dedicated learning, depending on your pace." },
  { q: "Can I skip stages if I already have experience?", a: "Stages are designed to be completed in order to build upon previous knowledge. Each stage unlocks the next." },
  { q: "What are the certification requirements?", a: "Complete all lessons in a stage and submit a capstone project. Projects are reviewed within 48 hours." },
  { q: "Is there live support available?", a: "Yes! Use the chat assistant below for instant help, or email us for complex queries." },
];

export default function HelpPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm the Academy Assistant. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");

    setTimeout(() => {
      let botResponse = "I can help with that! For more specific questions, type 'human' to connect with our support team.";
      if (userMessage.toLowerCase().includes("certification")) {
        botResponse = "Certifications are earned by completing all lessons in a stage and submitting a capstone project.";
      } else if (userMessage.toLowerCase().includes("stage") || userMessage.toLowerCase().includes("course")) {
        botResponse = "We have 4 stages covering foundations to advanced agentic bots. Start with Stage 1!";
      } else if (userMessage.toLowerCase().includes("human") || userMessage.toLowerCase().includes("agent") || userMessage.toLowerCase().includes("support")) {
        botResponse = "I'll connect you with our support team. Please email academy@limechat.ai - we respond within 24 hours.";
      }
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[#E2E6E1] bg-white">
          <div className="flex h-14 items-center px-6">
            <nav className="flex items-center gap-1.5 text-sm">
              <Link href="/dashboard" className="font-medium text-[#7FB13D] transition-colors hover:text-[#5E8E2E]">Academy</Link>
              <span className="text-[#9AA19B]">/</span>
              <span className="text-[#2F3431]">Help</span>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#2F3431]">Help Center</h1>
            <p className="mt-1 text-sm text-[#5F6661]">Find answers or chat with our assistant</p>
          </div>

          {/* FAQs */}
          <div className="mb-6 rounded-lg border border-[#E2E6E1] bg-white">
            <div className="border-b border-[#E2E6E1] px-5 py-4">
              <h2 className="text-sm font-semibold text-[#2F3431]">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-[#E2E6E1]">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm text-[#2F3431] hover:bg-[#F8F9F7]">
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA19B" strokeWidth="1.5" className="transition-transform group-open:rotate-90">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-[#5F6661]">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid gap-4 sm:grid-cols-2">
            <a 
              href="mailto:academy@limechat.ai" 
              className="rounded-lg border border-[#E2E6E1] bg-white p-5 transition-colors hover:border-[#7FB13D] hover:bg-[#F8F9F7]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBEAFE]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[#2F3431]">Email Support</h3>
              <p className="mt-1 text-xs text-[#5F6661]">academy@limechat.ai</p>
              <p className="mt-0.5 text-xs text-[#9AA19B]">Response within 24 hours</p>
            </a>
            <button 
              onClick={() => setChatOpen(true)}
              className="rounded-lg border border-[#E2E6E1] bg-white p-5 text-left transition-colors hover:border-[#7FB13D] hover:bg-[#F8F9F7]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF4DD]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FB13D" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[#2F3431]">Chat Assistant</h3>
              <p className="mt-1 text-xs text-[#5F6661]">Get instant answers</p>
              <p className="mt-0.5 text-xs text-[#9AA19B]">Available 24/7</p>
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot FAB */}
      <button
        onClick={() => setChatOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#7FB13D] text-white shadow-lg transition-all hover:bg-[#5E8E2E] hover:shadow-xl",
          chatOpen && "hidden"
        )}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-[#E2E6E1] bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#7FB13D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-sm font-medium">Academy Assistant</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="rounded-lg p-1 transition-colors hover:bg-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                  msg.role === "user" ? "bg-[#DBEAFE]" : "bg-[#EAF4DD]"
                )}>
                  {msg.role === "user" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FB13D" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                </div>
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-3 py-2 text-sm",
                  msg.role === "user" 
                    ? "rounded-tr-sm bg-[#7FB13D] text-white" 
                    : "rounded-tl-sm bg-[#F1F3F0] text-[#2F3431]"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-[#E2E6E1] p-3">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="h-10 flex-1 rounded-full border-[#E2E6E1] px-4 text-sm"
              />
              <button 
                onClick={handleSendMessage} 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7FB13D] text-white transition-colors hover:bg-[#5E8E2E]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
