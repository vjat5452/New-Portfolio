"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";

/**
 * Counts a stat like "15+" or "8.5" up from zero the first time it scrolls into view.
 * Non-numeric prefixes/suffixes (e.g. "+", "k", "%") are kept static around the number.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 55, damping: 18, mass: 1 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) spring.jump(target);
    else raw.set(target);
  }, [inView, reduce, raw, spring, target]);

  useMotionValueEvent(spring, "change", (v) => {
    if (!ref.current) return;
    const clamped = Math.min(Math.max(v, 0), target);
    ref.current.textContent = `${prefix}${clamped.toFixed(decimals)}${suffix}`;
  });

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
