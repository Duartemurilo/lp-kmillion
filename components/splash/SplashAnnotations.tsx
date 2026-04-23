"use client";

import { useMemo } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils/cn";

export type SplashAnnotationLines = string | readonly string[];

type SplashAnnotationsProps = {
  leftText: SplashAnnotationLines;
  rightText: SplashAnnotationLines;
  visible: boolean;
  /** Desktop / split layouts: left copy (e.g. at 100%) vs right copy (e.g. when video card is up) */
  leftVisible?: boolean;
  rightVisible?: boolean;
  staggerDelay?: number;
  className?: string;
  /** "sides" = left/right of card (desktop), "top" = above card (mobile), "bottom" = below card (mobile) */
  position?: "sides" | "top" | "bottom";
};

const EASE_OUT: [number, number, number, number] = [0.19, 1, 0.22, 1];

const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const STAGGER_LINE: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Organic curved arrow pointing up-right — version A */
function ArrowUpRightA() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M7 26 Q9 13 22 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M19 7 L22 7 L22 10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Organic curved arrow pointing up-right — version B (slightly different path) */
function ArrowUpRightB() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M7 27 Q7 12 21 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 6.5 L21 7 L20.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Organic curved arrow pointing down-left — version A */
function ArrowDownLeftA() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M27 8 Q25 21 12 27"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 27 L12 27 L12 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Organic curved arrow pointing down-left — version B */
function ArrowDownLeftB() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M27 7 Q27 22 13 27"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.5 27.5 L12 27 L12.5 24"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownCenterA() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M17 6.5 L17 23.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 19.5 L17 24 L21.5 19.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownCenterB() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M17 7.5 L17 23"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13 20 L17 24 L21 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Two overlaid SVG icons alternating opacity for a hand-drawn blinking effect */
function WiggleIcon({
  iconA,
  iconB,
}: {
  iconA: React.ReactNode;
  iconB: React.ReactNode;
}) {
  return (
    <span className="relative inline-flex shrink-0">
      <motion.span
        className="absolute inset-0 flex"
        animate={{ opacity: [1, 0.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {iconA}
      </motion.span>
      <motion.span
        className="flex opacity-0"
        animate={{ opacity: [0.15, 1, 0.15] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {iconB}
      </motion.span>
    </span>
  );
}

/** Single character with subtle organic wiggle */
function WiggleChar({ char, index }: { char: string; index: number }) {
  if (char === " ") return <span>&nbsp;</span>;
  return (
    <motion.span
      className="inline-block"
      animate={{ x: [0, 1.5, -1.2, 0.8, 0], y: [0, -0.5, 0.5, 0] }}
      transition={{
        duration: 2.4 + index * 0.07,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.05,
      }}
    >
      {char}
    </motion.span>
  );
}

const annotationBase = "flex items-center gap-2 text-[rgb(var(--color-sand-600))]";
const annotationFont = { fontFamily: "var(--font-sora-stack)" };

function normalizeLines(text: SplashAnnotationLines): readonly string[] {
  return typeof text === "string" ? [text] : text;
}

/** Hand-drawn wiggle per character; one array item = one line (no mid-phrase wrap from CSS). */
function WiggleLines({
  lines,
  lineTextAlignClass = "text-left",
}: {
  lines: readonly string[];
  lineTextAlignClass?: string;
}) {
  const lineEntries = lines.map((line, lineIdx) => ({
    line,
    lineIdx,
    start:
      lines.slice(0, lineIdx).reduce((count, entry) => count + [...entry].length, 0),
  }));
  return (
    <span className="inline-flex min-w-0 flex-col text-base font-medium uppercase leading-tight tracking-wide">
      {lineEntries.map(({ line, lineIdx, start }) => {
        const chars = [...line];
        return (
          <span
            key={lineIdx}
            className={cn("block max-w-none whitespace-nowrap", lineTextAlignClass)}
          >
            {chars.map((char, i) => (
              <WiggleChar key={i} char={char} index={start + i} />
            ))}
          </span>
        );
      })}
    </span>
  );
}

/** Same lines with stagger + blur lift-in when `active` (e.g. video card revealed). */
function WiggleLinesStaggerEntrance({
  lines,
  lineTextAlignClass = "text-left",
  active,
}: {
  lines: readonly string[];
  lineTextAlignClass?: string;
  active: boolean;
}) {
  const lineEntries = lines.map((line, lineIdx) => ({
    line,
    lineIdx,
    start:
      lines.slice(0, lineIdx).reduce((count, entry) => count + [...entry].length, 0),
  }));
  return (
    <motion.span
      className={cn(
        "inline-flex min-w-0 flex-col gap-1 text-base font-medium uppercase leading-tight tracking-wide",
        lineTextAlignClass === "text-center" && "items-center",
        lineTextAlignClass === "text-right" && "items-end",
      )}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {lineEntries.map(({ line, lineIdx, start }) => {
        const chars = [...line];
        return (
          <motion.span
            key={lineIdx}
            className={cn("block max-w-none whitespace-nowrap", lineTextAlignClass)}
            variants={STAGGER_LINE}
          >
            {chars.map((char, i) => (
              <WiggleChar key={i} char={char} index={start + i} />
            ))}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export function SplashAnnotations({
  leftText,
  rightText,
  visible,
  leftVisible,
  rightVisible,
  staggerDelay = 0.12,
  className,
  position = "sides",
}: SplashAnnotationsProps) {
  const leftLines = useMemo(() => normalizeLines(leftText), [leftText]);
  const rightLines = useMemo(() => normalizeLines(rightText), [rightText]);

  const leftShown = leftVisible !== undefined ? leftVisible : visible;
  const rightShown = rightVisible !== undefined ? rightVisible : visible;

  const baseAnimation = {
    delay: 0,
    duration: 0.6,
    ease: EASE_OUT,
  };
  const rightAnimation = {
    delay: staggerDelay,
    duration: 0.6,
    ease: EASE_OUT,
  };

  /* Mobile: single annotation centered above or below the card */
  if (position === "top") {
    return (
      <motion.div
        className={cn(
          "z-20 flex min-h-[72px] w-full max-w-[min(92vw,380px)] shrink-0 items-center justify-center gap-2",
          annotationBase,
          className,
        )}
        style={annotationFont}
        initial={{ opacity: 0, y: -12 }}
        animate={
          rightShown
            ? {
                opacity: 1,
                y: 0,
                transition: baseAnimation,
              }
            : { opacity: 0, y: -12 }
        }
        exit={{ opacity: 0, y: -12, transition: { duration: 0.4 } }}
      >
        <WiggleLinesStaggerEntrance
          lines={rightLines}
          lineTextAlignClass="text-center"
          active={rightShown}
        />
        <WiggleIcon iconA={<ArrowDownCenterA />} iconB={<ArrowDownCenterB />} />
      </motion.div>
    );
  }

  if (position === "bottom") {
    return (
      <motion.div
        className={cn(
          "z-20 flex min-h-[72px] w-full max-w-[min(92vw,380px)] shrink-0 items-center justify-center text-center",
          annotationBase,
          className,
        )}
        style={annotationFont}
        initial={{ opacity: 0, y: 12 }}
        animate={
          leftShown
            ? {
                opacity: 1,
                y: 0,
                transition: baseAnimation,
              }
            : { opacity: 0, y: 12 }
        }
        exit={{ opacity: 0, y: 12, transition: { duration: 0.4 } }}
      >
        <WiggleLines
          lines={leftLines}
          lineTextAlignClass="text-center"
        />
      </motion.div>
    );
  }

  /* Desktop: both annotations on the sides of the card */
  return (
    <div className={cn("hidden md:block", className)}>
      <motion.div
        className={cn(
          "absolute z-20 w-max max-w-[min(44vw,320px)] shrink-0",
          annotationBase,
        )}
        style={{
          right: "calc(100% + 40px)",
          top: "62%",
          transform: "translateY(-50%)",
          transformOrigin: "right center",
          ...annotationFont,
        }}
        initial={{ opacity: 0, x: -20, rotate: -10 }}
        animate={
          leftShown
            ? {
                opacity: 1,
                x: 0,
                rotate: -10,
                transition: baseAnimation,
              }
            : { opacity: 0, x: -20, rotate: -10 }
        }
        exit={{ opacity: 0, x: -28, rotate: -10, transition: { duration: 0.4 } }}
      >
        <WiggleIcon iconA={<ArrowUpRightA />} iconB={<ArrowUpRightB />} />
        <WiggleLines lines={leftLines} />
      </motion.div>

      <motion.div
        className={cn(
          "absolute z-20 w-max max-w-[min(44vw,320px)] shrink-0 flex-row-reverse text-right",
          "flex items-center gap-2",
          annotationBase,
        )}
        style={{
          left: "calc(100% + 40px)",
          top: "16%",
          transformOrigin: "left center",
          ...annotationFont,
        }}
        initial={{ opacity: 0, x: 20, rotate: 11 }}
        animate={
          rightShown
            ? {
                opacity: 1,
                x: 0,
                rotate: 11,
                transition: rightAnimation,
              }
            : { opacity: 0, x: 20, rotate: 11 }
        }
        exit={{ opacity: 0, x: 28, rotate: 11, transition: { duration: 0.4 } }}
      >
        <WiggleIcon iconA={<ArrowDownLeftA />} iconB={<ArrowDownLeftB />} />
        <WiggleLinesStaggerEntrance
          lines={rightLines}
          lineTextAlignClass="text-right"
          active={rightShown}
        />
      </motion.div>
    </div>
  );
}
