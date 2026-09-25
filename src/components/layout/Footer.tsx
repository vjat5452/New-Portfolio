import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted text-center sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, React Three Fiber and a RAG assistant on Sarvam AI.
        </p>
        <div className="flex items-center gap-3">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg transition">
            <GithubIcon size={18} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg transition">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-fg transition">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
