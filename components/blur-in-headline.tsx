"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

export function BlurInHeadline(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full bg-black px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
          Motor de Promoções Inteligentes
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Um motor que se adapta à sua estratégia. Não o contrário.
        </h2>
      </div>
    </section>
  );
}
