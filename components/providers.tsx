"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SplashGate } from "@/components/splash/SplashGate";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ReducedMotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
        <SplashGate />
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
