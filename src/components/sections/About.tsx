import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="01 — About"
        title={
          <>
            One engineer, <span className="text-accent serif-highlight">three roles</span>, zero hand‑offs.
          </>
        }
        description="From the RAG pipeline to the Postgres schema to the pixel on screen, I own the whole path."
      />

      <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StaggerItem className="col-span-2 sm:col-span-3 lg:col-span-4 glass rounded-3xl p-6 sm:p-9">
          <p className="text-lg sm:text-xl leading-relaxed">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <span key={r.key} className="rounded-full border border-line px-3 py-1 text-sm font-mono">
                {r.label}
              </span>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="col-span-2 sm:col-span-3 lg:col-span-2 glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-muted text-sm">
            <Sparkles size={16} className="text-accent" /> Currently
          </div>
          <div>
            <p className="font-display text-2xl font-bold mt-4">Full-Stack &amp; AI Engineer</p>
            <p className="text-muted mt-1">Sparrow Interactive · shipping the flagship site, a RAG chatbot and a 6-microservice AI kiosk</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </div>
        </StaggerItem>

        {profile.stats.map((s) => (
          <StaggerItem key={s.label} className="col-span-1 glass rounded-3xl p-5 sm:p-6">
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-accent tabular-nums">
              <Counter value={s.value} />
            </p>
            <p className="text-muted text-sm mt-1">{s.label}</p>
          </StaggerItem>
        ))}

        <StaggerItem className="col-span-1 glass rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <MapPin className="text-accent-soft" size={20} />
          <div>
            <p className="font-medium mt-4">{profile.location}</p>
            <p className="text-muted text-sm">Remote-friendly</p>
          </div>
        </StaggerItem>

        <StaggerItem className="col-span-1 glass rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <GraduationCap className="text-accent-soft" size={20} />
          <div>
            <p className="font-medium mt-4">B.Tech CSE</p>
            <p className="text-muted text-sm">IIIT Jabalpur · 2021 – 2025</p>
          </div>
        </StaggerItem>
      </Stagger>

      <Reveal className="mt-4 glass rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Briefcase className="text-accent shrink-0" size={20} />
        <p className="text-muted">
          <span className="text-fg font-medium">What I bring to a team: </span>
          production RAG systems (Claude and Sarvam AI, Qdrant, reranking, PDF and web ingestion) and tool-calling LLM agents shipped
          inside real products, plus the front-end craft to make them feel premium: Next.js 16, Three.js, GSAP and a 98 Lighthouse
          score on a 20+ page site.
        </p>
      </Reveal>
    </section>
  );
}
