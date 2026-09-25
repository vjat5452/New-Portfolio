"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { scrollToId } from "./SmoothScroll";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Assistant", href: "#assistant" },
  { label: "Contact", href: "#contact" },
];

export function openChat() {
  window.dispatchEvent(new CustomEvent("open-chat"));
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-[0_8px_40px_-12px_var(--glow)]" : "bg-transparent",
          )}
        >
          <button onClick={() => go("#top")} className="font-display font-bold text-lg tracking-tight">
            <span className="text-accent">{profile.firstName}</span>
            <span className="text-muted">.dev</span>
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="px-3 py-1.5 text-sm text-muted hover:text-fg rounded-lg hover:bg-line/60 transition"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={openChat}
              className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-fg text-bg px-3.5 py-1.5 text-sm font-medium hover:opacity-90 transition"
            >
              <Sparkles size={14} /> Ask AI
            </button>
            <ThemeToggle />
            <button
              className="lg:hidden h-9 w-9 rounded-full glass flex items-center justify-center"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-auto lg:hidden mt-2 rounded-2xl border border-line bg-bg-elev/95 p-2 shadow-[0_16px_50px_-20px_var(--glow)] backdrop-blur-xl"
            >
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-line/60 text-sm"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openChat();
                }}
                className="w-full mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-fg text-bg px-4 py-2.5 text-sm font-medium"
              >
                <Sparkles size={14} /> Ask AI
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
