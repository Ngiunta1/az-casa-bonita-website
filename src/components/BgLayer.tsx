import { motion } from "motion/react";
import React, { createContext, useCallback, useContext, useState } from "react";

type BgLayerCtx = {
  setActiveSrc: (src: string) => void;
};

const BgLayerContext = createContext<BgLayerCtx | null>(null);

export function useBgLayer() {
  const ctx = useContext(BgLayerContext);
  if (!ctx) throw new Error("useBgLayer must be used within <BgProvider>");
  return ctx;
}

export function BgProvider({ children }: { children: React.ReactNode }) {
  const [srcs, setSrcs] = useState<string[]>([]);
  const [activeSrc, setActiveSrcState] = useState<string | null>(null);

  const setActiveSrc = useCallback((src: string) => {
    setSrcs((prev) => (prev.includes(src) ? prev : [...prev, src]));
    setActiveSrcState(src);
  }, []);

  return (
    <BgLayerContext.Provider value={{ setActiveSrc }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {srcs.map((src) => (
          <motion.div
            key={src}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: src === activeSrc ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
      {children}
    </BgLayerContext.Provider>
  );
}
