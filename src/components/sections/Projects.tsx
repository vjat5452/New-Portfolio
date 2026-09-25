"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects, profile, type Project, type RoleKey } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLenis } from "@/components/layout/SmoothScroll";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

type Filter = "all" | RoleKey;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "web", label: "Creative Web" },
];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const list = useMemo(() => {
    const l = filter === "all" ? projects : projects.filter((p) => p.roles.includes(filter));
    return [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (selected) getLenis()?.stop();
    else getLenis()?.start();
  }, [selected]);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="03 — Projects"
        title={
          <>
            Things I have <span className="text-accent serif-highlight">built and shipped</span>.
          </>
        }
        description="Filter by role. Click any card for the architecture, highlights and links."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition",
              filter === f.key ? "text-bg" : "glass text-muted hover:text-fg",
            )}
          >
            {filter === f.key && (
              <motion.span layoutId="proj-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={cn(p.featured && i === 0 && "sm:col-span-2 lg:col-span-2")}
            >
              <TiltCard onClick={() => setSelected(p)} className="glass rounded-3xl overflow-hidden h-full cursor-pointer group">
                <div className={cn("relative h-40 bg-gradient-to-br", p.gradient)}>
                  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {p.roles.map((r) => (
                      <span key={r} className="rounded-full bg-black/30 text-white backdrop-blur px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider">
                        {r}
                      </span>
                    ))}
                  </div>
                  <span className="absolute top-4 right-4 font-mono text-xs text-white/80">{p.year}</span>
                  <ArrowUpRight className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold leading-tight">{p.title}</h3>
                  <p className="text-muted mt-1.5 text-sm">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="rounded-md border border-line px-2 py-0.5 text-[11px] font-mono text-muted">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 5 && <span className="text-[11px] font-mono text-muted">+{p.stack.length - 5}</span>}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-8 text-sm text-muted">
        More on{" "}
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-fg">
          GitHub
        </a>
        .
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-bg-elev border border-line shadow-2xl"
            >
              <div className={cn("h-32 bg-gradient-to-br", selected.gradient)} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs text-accent uppercase tracking-widest">{selected.year} · {selected.roles.join(" / ")}</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">{selected.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{selected.description}</p>

                <h4 className="font-medium mt-6 mb-2">Highlights</h4>
                <ul className="space-y-1.5">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" /> {h}
                    </li>
                  ))}
                </ul>

                <h4 className="font-medium mt-6 mb-2">Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.stack.map((s) => (
                    <span key={s} className="rounded-md border border-line px-2 py-0.5 text-xs font-mono text-muted">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {selected.live && (
                    <a href={selected.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fg text-bg px-5 py-2.5 text-sm font-medium">
                      <ExternalLink size={14} /> Live demo
                    </a>
                  )}
                  {selected.github && (
                    <a href={selected.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium">
                      <GithubIcon size={14} /> Source
                    </a>
                  )}
                  {!selected.live && !selected.github && (
                    <span className="text-sm text-muted">No public link yet. Ask the AI assistant for details.</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
