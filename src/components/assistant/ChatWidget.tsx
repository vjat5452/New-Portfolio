"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";
import { profile } from "@/data/profile";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      window.dispatchEvent(new CustomEvent("avatar:action", { detail: "greet" }));
    };
    window.addEventListener("open-chat", onOpen);
    return () => window.removeEventListener("open-chat", onOpen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[400px] h-[min(620px,calc(100vh-8rem))] rounded-3xl bg-bg-elev border border-line shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="font-medium text-sm">{profile.firstName}&apos;s Assistant</p>
                <span className="font-mono text-[10px] text-muted border border-line rounded px-1.5">RAG</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="h-8 w-8 rounded-full hover:bg-line/60 flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <ChatPanel className="flex-1 min-h-0" compact />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => (open ? setOpen(false) : window.dispatchEvent(new CustomEvent("open-chat")))}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-4 sm:right-6 z-[70] h-14 w-14 rounded-full bg-accent text-white shadow-[0_10px_40px_-8px_var(--glow)] flex items-center justify-center"
      >
        {!open && <span className="absolute inset-0 rounded-full animate-ping bg-accent/40" />}
        <span className="relative">{open ? <X size={22} /> : <MessageCircle size={22} />}</span>
      </motion.button>
    </>
  );
}
