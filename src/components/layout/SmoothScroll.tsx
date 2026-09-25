"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  if (instance) instance.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    instance = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);
  return <>{children}</>;
}
