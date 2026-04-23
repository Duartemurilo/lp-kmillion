"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { SplashScreen } from "./SplashScreen";

const SHOW_ON_NAVIGATION_TYPES = new Set(["navigate", "reload"]);

function shouldShowSplashOnMount(): boolean {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }

  const navEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const navigationType = navEntry?.type ?? "navigate";

  return SHOW_ON_NAVIGATION_TYPES.has(navigationType);
}

export function SplashGate(): ReactNode {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setShowSplash(shouldShowSplashOnMount());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} minDuration={900} />
      ) : null}
    </AnimatePresence>
  );
}
