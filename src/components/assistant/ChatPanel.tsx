"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, RotateCcw, Send, User } from "lucide-react";
import { profile, suggestedQuestions } from "@/data/profile";
import { cn } from "@/lib/utils";

type Message = { id: string; role: "user" | "assistant"; content: string; sources?: string[] };

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const welcome: Message = {
  id: "welcome",
  role: "assistant",
  content: `Hi! I'm ${profile.firstName}'s AI assistant. I answer from ${profile.firstName}'s resume, projects and experience using retrieval-augmented generation. Ask me anything about the work.`,
};

export function ChatPanel({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const userMsg: Message = { id: uid(), role: "user", content: q };
    const assistantId = uid();
    const history = [...messages.filter((m) => m.id !== "welcome"), userMsg];
    setMessages((m) => [...m, userMsg, { id: assistantId, role: "assistant", content: "" }]);
    setBusy(true);
    window.dispatchEvent(new CustomEvent("avatar:action", { detail: "talk" }));

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => "");
        throw new Error(err || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const evt = JSON.parse(line.slice(5));
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: msg.content + (evt.delta ?? "") + (evt.error ? `\n\n_${evt.error}_` : ""),
                    sources: evt.sources ?? msg.sources,
                  }
                : msg,
            ),
          );
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((m) => m.map((x) => (x.id === assistantId ? { ...x, content: `Sorry, I hit an error: ${msg}` } : x)));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([welcome]);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              <div
                className={cn(
                  "h-8 w-8 shrink-0 rounded-full flex items-center justify-center",
                  m.role === "user" ? "bg-line" : "bg-accent text-white",
                )}
              >
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={cn("max-w-[85%]", m.role === "user" && "text-right")}>
                <div
                  className={cn(
                    "inline-block text-left rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user" ? "bg-fg text-bg rounded-tr-sm" : "glass rounded-tl-sm prose-chat",
                  )}
                >
                  {m.role === "assistant" ? (
                    m.content ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      <span className="inline-flex gap-1 py-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                          />
                        ))}
                      </span>
                    )
                  ) : (
                    m.content
                  )}
                </div>
                {m.sources && m.sources.length > 0 && m.content && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {m.sources.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full border border-line px-2 py-0.5 text-[10px] font-mono text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {messages.length === 1 && (
        <div className={cn("px-4 sm:px-5 pb-3 flex flex-wrap gap-2", compact && "pb-2")}>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:text-fg hover:border-accent transition text-left"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-3 flex items-center gap-2"
      >
        <button type="button" onClick={reset} aria-label="Reset chat" className="h-9 w-9 rounded-full hover:bg-line/60 flex items-center justify-center text-muted">
          <RotateCcw size={14} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${profile.firstName}'s work...`}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="h-9 w-9 rounded-full bg-fg text-bg flex items-center justify-center disabled:opacity-40 hover:scale-105 transition"
          aria-label="Send"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
