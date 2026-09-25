import { knowledgeBase, type Chunk } from "./knowledge";

/**
 * Lightweight BM25 retriever. Sarvam does not expose an embeddings endpoint,
 * and the corpus is small, so lexical ranking is fast, free and deterministic.
 * Swap `retrieve` for a vector search later without touching the API route.
 */

const STOP = new Set(
  "a an the and or of to in on for with is are was were be been has have had he his him it its this that these those what which who whom how does do did at by from as about into than then can could would should any some there their vijay tell me".split(
    " ",
  ),
);

const SYNONYMS: Record<string, string[]> = {
  web: ["web", "website", "3d", "three", "gsap", "spline", "animation", "motion", "frontend"],
  ai: ["ai", "llm", "genai", "agent", "rag", "qdrant", "vector", "claude", "sarvam", "ollama", "prompt", "chatbot"],
  llm: ["llm", "ai", "model"],
  frontend: ["react", "next", "nextjs", "tailwind", "ui"],
  backend: ["node", "express", "api", "postgresql", "mongodb", "redis"],
  database: ["postgresql", "mongodb", "mysql", "redis", "sql"],
  job: ["job", "role", "work", "hire", "available", "availability", "open"],
  hire: ["job", "role", "available", "availability", "open", "contact"],
  experience: ["experience", "worked", "company", "engineer", "developer"],
  contact: ["contact", "email", "linkedin", "github", "reach"],
  education: ["education", "college", "university", "institute", "degree", "iiit", "jabalpur"],
  cert: ["certification", "certified", "swafinix", "hackathon", "hackbyte", "leetcode", "jee"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/\.js$/, "").replace(/\.$/, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

function stem(t: string): string {
  return t
    .replace(/(ations|ation|ing|ings|ers|er|ies|es|s)$/g, "")
    .replace(/^$/, t);
}

function expand(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    const syn = SYNONYMS[t];
    if (syn) syn.forEach((s) => out.add(stem(s)));
  }
  return [...out];
}

type Indexed = { chunk: Chunk; tf: Map<string, number>; len: number };

const index: Indexed[] = knowledgeBase.map((chunk) => {
  const tokens = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
  const tf = new Map<string, number>();
  tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
  return { chunk, tf, len: tokens.length };
});

const avgLen = index.reduce((a, d) => a + d.len, 0) / Math.max(index.length, 1);
const df = new Map<string, number>();
index.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));

export function retrieve(query: string, k = 5): Chunk[] {
  const q = expand(tokenize(query));
  if (q.length === 0) return knowledgeBase.slice(0, k);

  const N = index.length;
  const k1 = 1.4;
  const b = 0.75;

  const scored = index.map((d) => {
    let score = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
    }
    return { chunk: d.chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, k).map((s) => s.chunk);

  // Always keep the profile summary in context so answers stay grounded.
  const about = knowledgeBase.find((c) => c.id === "about")!;
  if (!top.some((c) => c.id === "about")) top.push(about);
  return top;
}
