import { Award, Trophy } from "lucide-react";
import { achievements, certifications } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="05 — Credentials"
        title={
          <>
            Proof of <span className="text-accent serif-highlight">work</span>.
          </>
        }
      />
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5">
        <Stagger className="grid gap-4">
          {certifications.map((c) => (
            <StaggerItem key={c.title} className="glass rounded-3xl p-6 hover:-translate-y-1 transition-transform">
              <Award className="text-accent" size={22} />
              <p className="font-display font-bold text-lg mt-4 leading-tight">{c.title}</p>
              <p className="text-muted text-sm mt-1">
                {c.issuer} · {c.date}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="glass rounded-3xl p-7">
          <div className="flex items-center gap-2 text-muted text-sm">
            <Trophy size={16} className="text-accent-soft" /> Achievements
          </div>
          <ul className="mt-5 space-y-4">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
