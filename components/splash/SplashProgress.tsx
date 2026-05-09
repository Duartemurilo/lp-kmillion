"use client";

import { cn } from "@/lib/utils/cn";
import { useI18n } from "@/i18n";

type SplashProgressProps = {
  percent: number;
  className?: string;
};

export function SplashProgress({ percent, className }: SplashProgressProps) {
  const { t } = useI18n();
  const rounded = Math.round(percent);
  const display = String(rounded).padStart(2, "0") + "%";
  const isComplete = rounded >= 100;
  const micro = isComplete
    ? (t("splashProgressMicroComplete") as string)
    : (t("splashProgressMicroLoading") as string);

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 flex justify-center pb-8",
        className
      )}
      aria-hidden
    >
      <div
        className="flex flex-col items-center gap-1.5 text-center"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <span className="text-4xl font-medium tabular-nums text-[rgb(var(--color-sand-500))] md:text-5xl">
          {display}
        </span>
        <span
          className="max-w-[min(90vw,20rem)] text-[0.7rem] font-medium uppercase leading-snug tracking-[0.12em] text-[rgb(var(--color-sand-600))] md:text-xs"
        >
          {micro}
        </span>
      </div>
    </div>
  );
}
