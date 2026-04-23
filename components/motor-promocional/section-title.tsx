"use client";

import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  variant?: "light" | "dark";
  /** Com `variant="dark"`, cor do eyebrow (padrão laranja de marca). */
  eyebrowAccent?: "orange" | "purple";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  variant = "light",
  eyebrowAccent = "orange",
}: SectionTitleProps): ReactNode {
  const isDark = variant === "dark";

  const eyebrowClass =
    !isDark
      ? "text-accent"
      : eyebrowAccent === "purple"
        ? "text-[#300250]"
        : "text-[#FE6634]";

  return (
    <div className="max-w-3xl">
      <span
        className={`text-sm font-semibold tracking-[0.2em] uppercase ${eyebrowClass}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
          isDark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
