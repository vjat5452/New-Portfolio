import { Cpu, Search, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ChatPanel } from "@/components/assistant/ChatPanel";
import { profile } from "@/data/profile";

const steps = [
  {
    icon: <Search size={18} />,
    title: "Retrieve",
    text: "Your question is tokenised and scored with BM25 against a knowledge base generated from the same data that renders this site.",
  },
  {
    icon: <Cpu size={18} />,
    title: "Ground",
    text: "The top-ranked chunks are injected into a system prompt with strict rules: answer only from context, never invent.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Generate",
    text: "Sarvam-105B streams the answer token by token through a Next.js route handler, with the retrieved sources shown under every reply.",
  },
];

export function AssistantSection() {
  return (
    <section id="assistant" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="06 — AI Assistant"
        title={
          <>
            Don&apos;t read. <span className="text-accent serif-highlight">Ask.</span>
          </>
        }
        description="A live RAG assistant that knows my resume, projects and experience. It is the same pattern I ship for clients, running right here."
      />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
        <Stagger className="space-y-4">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="glass rounded-3xl p-6 flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-accent text-white flex items-center justify-center">
                {s.icon}
              </div>
              <div>
                <p className="font-mono text-[11px] text-muted uppercase tracking-widest">Step {i + 1}</p>
                <p className="font-display font-bold text-lg mt-0.5">{s.title}</p>
                <p className="text-muted text-sm mt-1 leading-relaxed">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem className="rounded-3xl border border-dashed border-line p-5 text-sm text-muted">
            <span className="text-fg font-medium">Under the hood: </span>
            Next.js route handler → BM25 retriever → Sarvam chat completions (SSE streaming) → React streaming UI. Swap the retriever
            for pgvector embeddings without touching the UI.
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.15} className="rounded-3xl bg-bg-elev border border-line shadow-[0_30px_80px_-30px_var(--glow)] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-xs text-muted">assistant.{profile.firstName.toLowerCase()}.dev</span>
          </div>
          <ChatPanel className="h-[460px] sm:h-[520px]" />
        </Reveal>
      </div>
    </section>
  );
}
