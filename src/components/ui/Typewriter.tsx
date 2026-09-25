"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay: number;
    let step: () => void;

    if (!deleting && text === word) {
      delay = 1800;
      step = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 250;
      step = () => {
        setDeleting(false);
        setI((v) => (v + 1) % words.length);
      };
    } else {
      delay = deleting ? 35 : 70;
      step = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }

    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className={className}>
      {text}
      <span className="caret text-accent">|</span>
    </span>
  );
}
