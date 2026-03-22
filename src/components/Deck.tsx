import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useBgLayer } from "./BgLayer";

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
  const { setActiveSrc } = useBgLayer();

  useEffect(() => {
    if (images[activeIndex]) {
      setActiveSrc(images[activeIndex]);
    }
  }, [activeIndex, images, setActiveSrc]);

  const value = useMemo(() => ({ activeIndex, setActiveIndex }), [activeIndex]);

  return (
    <DeckContext.Provider value={value}>
      {children}
    </DeckContext.Provider>
  );
}
