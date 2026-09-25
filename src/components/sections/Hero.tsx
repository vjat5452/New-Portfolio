"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { Typewriter } from "@/components/ui/Typewriter";
import { Magnetic } from "@/components/ui/Magnetic";
import { openChat } from "@/components/layout/Navbar";
import { scrollToId } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

const AvatarCanvas = dynamic(() => import("@/components/three/AvatarCanvas").then((m) => m.AvatarCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const chips = [
  { label: "RAG pipelines", x: "6%", y: "12%", d: 0 },
  { label: "Claude API", x: "78%", y: "8%", d: 0.8 },
  { label: "Tool-calling agents", x: "2%", y: "62%", d: 1.4 },
  { label: "Next.js 16 + R3F", x: "74%", y: "70%", d: 0.4 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16">
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 grid-bg" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        {/* Copy */}
        <div>
          <motion.p {...fadeUp(0.1)} className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]" />
            {profile.availability}
          </motion.p>

          <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
            <motion.span {...fadeUp(0.2)} className="block">
              Hi, I&apos;m
            </motion.span>
            <span className="block [perspective:700px]" aria-label={`${profile.firstName}.`}>
              {[...profile.firstName, "."].map((ch, i, arr) => {
                const last = i === arr.length - 1;
                return (
                  <motion.span
                    key={i}
                    aria-hidden
                    initial={{ opacity: 0, y: "0.55em", rotateX: -55, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.75, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("inline-block origin-bottom will-change-transform", last ? "text-muted" : "text-accent")}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          <motion.div {...fadeUp(0.35)} className="mt-6 text-xl sm:text-2xl md:text-3xl font-medium min-h-[2.5rem]">
            <Typewriter words={profile.roles.map((r) => r.label)} className="font-display" />
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="mt-6 text-muted max-w-xl text-base sm:text-lg leading-relaxed">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                onClick={openChat}
                className="group inline-flex items-center gap-2 rounded-full bg-fg text-bg px-6 py-3 font-medium shadow-[0_10px_40px_-10px_var(--glow)] hover:scale-[1.03] transition"
              >
                <Sparkles size={16} className="group-hover:rotate-12 transition" />
                Ask my AI assistant
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.links.resume}
                download
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-line/60 transition"
              >
                <Download size={16} /> Resume
              </a>
            </Magnetic>
            <div className="flex items-center gap-2 ml-1">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-11 w-11 rounded-full glass flex items-center justify-center hover:bg-line/60 transition">
                <GithubIcon size={18} />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-11 w-11 rounded-full glass flex items-center justify-center hover:bg-line/60 transition">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </motion.div>

          <motion.button
            {...fadeUp(0.8)}
            onClick={() => scrollToId("#about")}
            className="mt-14 hidden sm:inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition"
          >
            <span className="h-9 w-6 rounded-full border border-line flex items-start justify-center p-1">
              <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Scroll to explore <ArrowDown size={14} />
          </motion.button>
        </div>

        {/* 3D avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[360px] sm:h-[520px] lg:h-[640px]"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_45%,var(--glow),transparent_70%)]" aria-hidden />
          <div className="absolute inset-x-8 bottom-6 h-24 rounded-[100%] bg-accent/10 blur-2xl" aria-hidden />
          <AvatarCanvas className="absolute inset-0" />

          {chips.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 1 + c.d }, y: { repeat: Infinity, duration: 4 + c.d, ease: "easeInOut", delay: c.d } }}
              style={{ left: c.x, top: c.y }}
              className="absolute hidden sm:block glass rounded-full px-3 py-1.5 text-xs font-mono pointer-events-none"
            >
              {c.label}
            </motion.div>
          ))}

          <p className="absolute bottom-2 inset-x-0 text-center text-[11px] font-mono text-muted/70 pointer-events-none">
            <span className="pointer-coarse:hidden">move your mouse · click me to dance</span>
            <span className="hidden pointer-coarse:inline">tap me to dance</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
