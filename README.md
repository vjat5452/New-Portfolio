# Vijay Saharan — Portfolio

Full-Stack & AI Engineer · AI Engineer · Creative Web Developer

A Next.js 16 portfolio with a 3D animated avatar, scroll-driven animations, dark/light theme and a RAG (retrieval-augmented generation) assistant that answers questions about Vijay from the resume, projects and experience.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, custom design tokens, next-themes |
| Animation | Framer Motion, Lenis smooth scroll, custom cursor |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| AI | Sarvam AI chat completions (`sarvam-105b`), BM25 retriever, SSE streaming |

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste your Sarvam key
npm run dev                  # http://localhost:3000
```

Without `SARVAM_API_KEY` the assistant still runs retrieval and shows the matched profile chunks, so you can test it before adding the key.

## Where things live

```
src/data/profile.ts            <- ALL content: bio, experience, projects, skills, certs
src/lib/rag/knowledge.ts       <- knowledge base generated from profile.ts
src/lib/rag/retrieve.ts        <- BM25 retriever (swap for pgvector later)
src/app/api/chat/route.ts      <- Sarvam streaming route handler
src/components/three/          <- Avatar + animation state machine, hero canvas
src/components/sections/       <- Hero, About, Skills, Projects, Experience, Certifications, Assistant, Contact
src/components/assistant/      <- ChatPanel (shared UI) + floating ChatWidget
public/models/avatar.glb       <- the avatar shown in the hero (currently the Ready Player Me placeholder)
public/models/anim/*.glb       <- idle / idle2 / wave / talk / dance clips
public/resume.pdf
```

## Avatar

`public/models/avatar.glb` is currently a stock Ready Player Me placeholder (`avatar-stock.glb` is the same file). To use your own likeness:

1. Go to [hub.avaturn.me](https://hub.avaturn.me) (or [readyplayer.me](https://readyplayer.me)), upload a selfie and customise the avatar.
2. Export as GLB. On Avaturn choose "Avatar (T-Pose)".
3. Overwrite `public/models/avatar.glb` (or set `NEXT_PUBLIC_AVATAR_URL` to point at a different file).

The loader detects the bone-name prefix, retargets the five animation clips onto the rig and normalises scale, so no code changes are needed. Any humanoid GLB with a Mixamo-compatible skeleton works (Avaturn, Ready Player Me, or a Mixamo-rigged model). The animation clips in `public/models/anim/` came from [mixamo.com](https://www.mixamo.com) and are reused as-is.

## Avatar behaviour

- Plays a greeting on load, then idles with random gestures every 11 s.
- Head, neck and torso follow the mouse.
- Click the avatar to dance. Opening the chat triggers a greeting; sending a message triggers a talking gesture.
- Trigger from anywhere: `window.dispatchEvent(new CustomEvent("avatar:action", { detail: "dance" }))`.

## Deploy

Push to GitHub and import on Vercel. Add `SARVAM_API_KEY` (and optionally `SARVAM_MODEL`, `NEXT_PUBLIC_SITE_URL`) as environment variables.
