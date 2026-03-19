import React, { createContext, useContext, useMemo, useState } from "react";

type DeckCtx = {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
};
const DeckContext = createContext<DeckCtx | null>(null);

export function useBgDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useBgDeck must be used within <Deck>");
  return ctx;
}

export function Deck({
  images,
  children,
}: {
  images: string[];
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const value = useMemo(() => ({ activeIndex, setActiveIndex }), [activeIndex]);

  return (
    <DeckContext.Provider value={value}>
      {/* Fixed full-viewport background under everything */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500
                       ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* App/content scrolls above the fixed deck */}
      {children}
    </DeckContext.Provider>
  );
}
