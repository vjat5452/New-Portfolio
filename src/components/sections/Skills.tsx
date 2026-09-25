"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Layers, Palette } from "lucide-react";
import { skillGroups, type RoleKey } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const icons: Record<RoleKey, React.ReactNode> = {
  ai: <Bot size={16} />,
  fullstack: <Layers size={16} />,
  web: <Palette size={16} />,
};

export function Skills() {
  const [active, setActive] = useState<RoleKey>("ai");
  const group = skillGroups.find((g) => g.key === active)!;

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="02 — Skills"
        title={
          <>
            A stack shaped by <span className="text-accent serif-highlight">shipping</span>, not tutorials.
          </>
        }
        description="Switch between the three hats I wear. Each list is what I have used in production."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {skillGroups.map((g) => (
          <button
            key={g.key}
            onClick={() => setActive(g.key)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
              active === g.key ? "text-bg" : "glass text-muted hover:text-fg",
            )}
          >
            {active === g.key && (
              <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {icons[g.key]} {g.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-muted mb-6 max-w-2xl">{group.blurb}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group glass rounded-2xl p-4 hover:-translate-y-1 transition-transform"
                data-cursor
              >
                <p className="font-medium text-sm sm:text-base">{s.name}</p>
                <p className="mt-1.5 font-mono text-xs text-muted">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
