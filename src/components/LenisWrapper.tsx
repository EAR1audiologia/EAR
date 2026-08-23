"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

interface LenisWrapperProps {
  children: ReactNode;
}

export function LenisWrapper({ children }: LenisWrapperProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
