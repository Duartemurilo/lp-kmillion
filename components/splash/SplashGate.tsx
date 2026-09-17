"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { SplashScreen } from "./SplashScreen";

const SHOW_ON_NAVIGATION_TYPES = new Set(["navigate", "reload"]);

/**
 * Rotas que nunca abrem com a intro da marca. Quem chega numa página legal
 * vem do rodapé ou de uma busca, atrás de uma informação específica, e não
 * deve esperar uma animação para começar a ler.
 */
const ROUTES_WITHOUT_SPLASH = new Set(["/politicadeprivacidade"]);

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
  const pathname = usePathname();
  const splashAllowed = !ROUTES_WITHOUT_SPLASH.has(pathname);

  useEffect(() => {
    if (!splashAllowed) return;

    const frame = window.requestAnimationFrame(() => {
      setShowSplash(shouldShowSplashOnMount());
    });

    return () => window.cancelAnimationFrame(frame);
  }, [splashAllowed]);

  return (
    <AnimatePresence>
      {showSplash && splashAllowed ? (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
          minDuration={900}
        />
      ) : null}
    </AnimatePresence>
  );
}
