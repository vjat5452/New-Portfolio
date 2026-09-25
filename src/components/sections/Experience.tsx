"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="04 — Experience"
        title={
          <>
            Where I have <span className="text-accent serif-highlight">shipped</span>.
          </>
        }
        description="Startups, an agency and freelance clients, one throughline: AI and web shipped to production."
      />

      <div ref={ref} className="relative">
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-line lg:-translate-x-1/2" />
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px timeline-line lg:-translate-x-1/2"
        />

        <div className="space-y-12">
          {experience.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <div key={e.company} className={cn("relative lg:grid lg:grid-cols-2 lg:gap-12", !left && "lg:[direction:rtl]")}>
                <span className="absolute left-4 lg:left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg shadow-[0_0_16px_2px_var(--glow)]" />
                <Reveal delay={0.1} className={cn("ml-10 lg:ml-0 [direction:ltr]", left ? "lg:col-start-1" : "lg:col-start-1")}>
                  <div className="glass rounded-3xl p-6 sm:p-8 hover:-translate-y-1 transition-transform">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold">{e.role}</h3>
                      <span className="font-mono text-xs text-accent">{e.period}</span>
                    </div>
                    <p className="text-muted mt-1">
                      {e.company}
                      {e.location && ` · ${e.location}`}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span key={s} className="rounded-md border border-line px-2 py-0.5 text-[11px] font-mono text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <div className="hidden lg:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
