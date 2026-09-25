export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-widest text-muted whitespace-nowrap flex items-center gap-10">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
