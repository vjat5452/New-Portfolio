"use client";

import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] glass p-6 sm:p-10 lg:p-16">
        <div className="aurora" aria-hidden />
        <div className="relative grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading
              eyebrow="07 — Contact"
              title={
                <>
                  Let&apos;s build something <span className="text-accent serif-highlight">intelligent</span>.
                </>
              }
              description="Open to full-time roles and interesting freelance work in web, full-stack and applied AI. Drop a line, I usually reply within a day."
            />
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={copy} className="inline-flex max-w-full items-center gap-2 rounded-full bg-fg text-bg px-5 py-2.5 text-sm font-medium">
                <span className="shrink-0">{copied ? <Check size={14} /> : <Copy size={14} />}</span>
                <span className="truncate">{copied ? "Copied" : profile.email}</span>
              </button>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full glass flex items-center justify-center" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="h-11 w-11 rounded-full glass flex items-center justify-center" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="h-11 w-11 rounded-full glass flex items-center justify-center" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-mono text-muted">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-2xl bg-bg-elev border border-line px-4 py-3 outline-none focus:border-accent transition"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-mono text-muted">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-2xl bg-bg-elev border border-line px-4 py-3 outline-none focus:border-accent transition"
                    placeholder="jane@company.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-mono text-muted">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-2xl bg-bg-elev border border-line px-4 py-3 outline-none focus:border-accent transition resize-none"
                  placeholder="Tell me about the role or the product..."
                />
              </label>
              <Magnetic>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 font-medium shadow-[0_10px_40px_-10px_var(--glow)]">
                  <Send size={16} /> Send message
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
