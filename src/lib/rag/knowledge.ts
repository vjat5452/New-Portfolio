import {
  achievements,
  certifications,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/data/profile";

export type Chunk = {
  id: string;
  title: string;
  text: string;
};

/**
 * The knowledge base is generated from the same data that renders the site,
 * so the assistant can never drift from what visitors see.
 */
export function buildKnowledgeBase(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "about",
    title: `About ${profile.firstName}`,
    text: `${profile.name} is a ${profile.headline} based in ${profile.location}. Target roles: ${profile.roles
      .map((r) => r.label)
      .join(", ")}. ${profile.summary} Availability: ${profile.availability}.`,
  });

  chunks.push({
    id: "contact",
    title: "Contact and links",
    text: `Email: ${profile.email}. Location: ${profile.location}. GitHub: ${profile.links.github}. LinkedIn: ${profile.links.linkedin}. Resume PDF available at ${profile.links.resume} on the portfolio. ${profile.availability}.`,
  });

  chunks.push({
    id: "education",
    title: "Education",
    text: `${profile.education.degree} at ${profile.education.school}, ${profile.education.location}, ${profile.education.period}.`,
  });

  for (const e of experience) {
    chunks.push({
      id: `exp-${e.company}`,
      title: `Experience: ${e.role} at ${e.company}`,
      text: `${e.role} at ${e.company} (${e.period}). Stack: ${e.stack.join(", ")}. ${e.bullets.join(" ")}`,
    });
  }

  for (const p of projects) {
    chunks.push({
      id: `proj-${p.slug}`,
      title: `Project: ${p.title}`,
      text: `${p.title} (${p.year}) — ${p.tagline}. ${p.description} Highlights: ${p.highlights.join("; ")}. Stack: ${p.stack.join(", ")}.${
        p.github ? ` GitHub: ${p.github}.` : ""
      }${p.live ? ` Live demo: ${p.live}.` : ""}`,
    });
  }

  for (const g of skillGroups) {
    chunks.push({
      id: `skills-${g.key}`,
      title: `Skills: ${g.title}`,
      text: `${g.title}. ${g.blurb} Skills: ${g.skills.map((s) => s.name).join(", ")}.`,
    });
  }

  chunks.push({
    id: "certs",
    title: "Certifications and achievements",
    text: `Certifications: ${certifications.map((c) => `${c.title} (${c.issuer}, ${c.date})`).join("; ")}. Achievements: ${achievements.join(" ")}`,
  });

  return chunks;
}

export const knowledgeBase = buildKnowledgeBase();
