"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { splashData } from "@/data/splash";
import { useSplashSequence } from "@/hooks/useSplashSequence";
import { SplashCentralImage } from "./SplashCentralImage";
import { SplashAnnotations } from "./SplashAnnotations";
import { SplashProgress } from "./SplashProgress";
import { cn } from "@/lib/utils/cn";
import { useI18n } from "@/i18n";

const EXIT_DURATION_MS = 700;

type SplashScreenProps = {
  onComplete?: () => void;
  onExpandStart?: () => void;
  onExpandComplete?: (videoTime: number) => void;
  minDuration?: number;
  persistent?: boolean;
  className?: string;
};

export function SplashScreen({
  onComplete,
  onExpandStart,
  onExpandComplete,
  minDuration = 0,
  persistent = false,
  className,
}: SplashScreenProps) {
  const { t } = useI18n();
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const annotationStages = t("splashAnnotationStages") as readonly string[];
  const leftAnnotationText =
    annotationStages[Math.min(activeSlotIndex, Math.max(annotationStages.length - 1, 0))] ??
    "";

  const {
    progressPercent,
    imageVisible,
    isVideoExpanding,
  } = useSplashSequence({ minDuration, persistent });

  const cardRef = useRef<HTMLDivElement>(null);
  const completeFiredRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const [expansionRect, setExpansionRect] = useState<DOMRect | null>(null);
  const [videoCardRevealed, setVideoCardRevealed] = useState(false);
  const isExpanding = expansionRect !== null;

  const handleVideoCardVisibleChange = (revealed: boolean) => {
    setVideoCardRevealed(revealed);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (persistent || !isVideoExpanding || completeFiredRef.current) return;

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      if (completeFiredRef.current) return;
      completeFiredRef.current = true;
      onComplete?.();
    }, EXIT_DURATION_MS);
  }, [isVideoExpanding, onComplete, persistent]);

  const handleFinalCardClick = () => {
    if (!persistent || isExpanding || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setExpansionRect(rect);
    onExpandStart?.();
  };

  const leftAnnotationVisible = imageVisible && !isVideoExpanding && !isExpanding;
  const rightAnnotationVisible = videoCardRevealed && !isVideoExpanding && !isExpanding;
  const annotationsShell = leftAnnotationVisible || rightAnnotationVisible;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[var(--z-loader)] flex flex-col items-center justify-center",
        "bg-[rgb(var(--color-sand-100))]",
        className,
      )}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: persistent ? 0.01 : 0.7,
          ease: [0.19, 1, 0.22, 1],
        },
      }}
      style={{ pointerEvents: "auto" }}
    >
      <div className="splash-grain absolute inset-0" aria-hidden />

      <div className="relative flex flex-1 w-full flex-col items-center justify-center gap-4 px-4 md:gap-0 md:px-0">
        {/* Mobile: CTA above card */}
        <SplashAnnotations
          position="top"
          leftText={leftAnnotationText}
          rightText={t("splashAnnotationRight")}
          visible={rightAnnotationVisible}
          staggerDelay={splashData.durations.annotationsStagger / 1000}
          className="md:hidden"
        />
        <div className="relative flex flex-col items-center">
          <SplashCentralImage
            ref={cardRef}
            images={splashData.centralImages}
            videoSrc={splashData.heroVideoSrc ?? undefined}
            cycleInterval={splashData.imageCycleInterval}
            transitionDuration={splashData.imageTransitionDuration / 1000}
            visible={imageVisible}
            finalCardInteractive={persistent}
            isExpanding={isExpanding}
            expandingCardRect={expansionRect}
            onFinalCardClick={handleFinalCardClick}
            onVideoCardVisibleChange={handleVideoCardVisibleChange}
            onActiveSlotChange={setActiveSlotIndex}
            onExpansionComplete={(videoTime) => {
              if (completeFiredRef.current) return;
              completeFiredRef.current = true;
              onExpandComplete?.(videoTime);
              if (persistent) {
                onComplete?.();
                return;
              }

              if (closeTimerRef.current !== null) {
                window.clearTimeout(closeTimerRef.current);
              }
              closeTimerRef.current = window.setTimeout(() => {
                closeTimerRef.current = null;
                onComplete?.();
              }, EXIT_DURATION_MS);
            }}
          />
          {/* Mobile: stage label below card */}
          <SplashAnnotations
            position="bottom"
            leftText={leftAnnotationText}
            rightText={t("splashAnnotationRight")}
            visible={leftAnnotationVisible}
            staggerDelay={splashData.durations.annotationsStagger / 1000}
            className="md:hidden"
          />
          {/* Desktop: left/right annotations beside card */}
          <SplashAnnotations
            position="sides"
            leftText={leftAnnotationText}
            rightText={t("splashAnnotationRight")}
            visible={annotationsShell}
            leftVisible={leftAnnotationVisible}
            rightVisible={rightAnnotationVisible}
            staggerDelay={splashData.durations.annotationsStagger / 1000}
            className="hidden md:block"
          />
        </div>
      </div>

      {!isVideoExpanding && !isExpanding && (
        <SplashProgress percent={progressPercent} />
      )}
    </motion.div>
  );
}
