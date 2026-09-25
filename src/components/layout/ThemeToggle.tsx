"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const noop = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // false during SSR, true once hydrated — avoids a hydration mismatch on the icon.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dark = mounted ? theme === "dark" : true;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative h-9 w-9 rounded-full glass flex items-center justify-center text-fg hover:scale-105 transition"
    >
      <motion.span key={dark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.span>
    </button>
  );
}
