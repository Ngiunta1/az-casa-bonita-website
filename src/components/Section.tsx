// Section.tsx
import React, { useEffect, useRef } from "react";
import { useBgDeck } from "./Deck";

export default function Section({
  deckIndex, // which background in the deck to show when this section is dominant
  className = "",
  children,
  threshold = 0.5, // how much of the section must be in view to flip (tweak as needed)
}: {
  deckIndex: number;
  className?: string;
  children?: React.ReactNode;
  threshold?: number;
}) {
  const { setActiveIndex } = useBgDeck();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveIndex(deckIndex);
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [deckIndex, threshold, setActiveIndex]);

  // NOTE: we do NOT set backgrounds here; they live in the fixed deck behind everything
  return (
    <section ref={ref} className={`relative min-h-dvh ${className}`}>
      {/* optional readability veil per-section if your content needs it */}
      <div className="absolute inset-0 -z-10 bg-black/20" />
      <div className="w-full h-full z-10">{children}</div>
    </section>
  );
}
