import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("mb-12", align === "center" && "text-center")}>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-balance">{title}</h2>
      {description && <p className={cn("mt-4 text-muted max-w-2xl text-base sm:text-lg", align === "center" && "mx-auto")}>{description}</p>}
    </Reveal>
  );
}
