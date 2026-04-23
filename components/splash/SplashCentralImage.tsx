"use client";

import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroMediaSurface } from "@/components/shared/HeroMediaSurface";
import { cn } from "@/lib/utils/cn";

type SplashCentralImageProps = {
  images?: readonly string[];
  src?: string | undefined;
  videoSrc?: string | undefined;
  cycleInterval?: number;
  transitionDuration?: number;
  alt?: string;
  visible: boolean;
  finalCardInteractive?: boolean;
  isExpanding?: boolean;
  expandingCardRect?: DOMRect | null;
  onFinalCardClick?: () => void;
  onExpansionComplete?: (videoTime: number) => void;
  onVideoCardVisibleChange?: (visible: boolean) => void;
  onActiveSlotChange?: (index: number) => void;
  className?: string;
};

const CARD_ROTATION = 1.4;
const RESTING_ROTATIONS = [-7, 7] as const;
const EASE_OUT: [number, number, number, number] = [0.19, 1, 0.22, 1];
const EXPAND_DURATION = 0.82;

/**
 * Visual config per stack depth (0 = front/newest, higher = further back).
 * rotOffset is added to each image's own ±7° resting tilt to fan the deck.
 */
const STACK_CONFIGS = [
  { scale: 1.00, opacity: 1.00, rotOffset:  0, zIndex: 50, shadow: "0 20px 56px rgba(0,0,0,0.24)" },
  { scale: 0.97, opacity: 0.88, rotOffset:  6, zIndex: 40, shadow: "0 12px 32px rgba(0,0,0,0.16)" },
  { scale: 0.94, opacity: 0.72, rotOffset: -5, zIndex: 30, shadow: "0  8px 24px rgba(0,0,0,0.12)" },
  { scale: 0.91, opacity: 0.54, rotOffset:  8, zIndex: 20, shadow: "0  4px 16px rgba(0,0,0,0.09)" },
  { scale: 0.88, opacity: 0.38, rotOffset: -7, zIndex: 10, shadow: "0  2px 10px rgba(0,0,0,0.07)" },
] as const;

/**
 * Computes the effective rotation that the top card (depth=0) will settle at.
 * This is what the hero (Cover) needs as its initial rotation when morphing.
 */
export function getTopCardRotation(imageCount: number): number {
  // The last (newest) image sits at imgIndex = imageCount - 1, depth = 0
  const imgIndex = imageCount - 1;
  const cfg = STACK_CONFIGS[0]!;
  const baseRot = RESTING_ROTATIONS[imgIndex % 2]!;
  return baseRot + cfg.rotOffset; // rotOffset is 0 for depth 0
}

const SplashCentralImage = forwardRef<HTMLDivElement, SplashCentralImageProps>(
  function SplashCentralImage(
    {
      src,
      images,
      videoSrc,
      cycleInterval = 1800,
      transitionDuration = 1.5,
      alt = "",
      visible,
      finalCardInteractive = false,
      isExpanding = false,
      expandingCardRect = null,
      onFinalCardClick,
      onExpansionComplete,
      onVideoCardVisibleChange,
      onActiveSlotChange,
      className,
    },
    ref
  ) {
    const imageList = useMemo(
      () => (images && images.length > 0 ? images : src ? [src] : []),
      [images, src]
    );

    const list = useMemo(
      () => (videoSrc ? [...imageList, videoSrc] : imageList),
      [imageList, videoSrc]
    );

    /**
     * shownCount: how many slots have appeared so far (1 → list.length).
     * Images never leave the stack — shownCount only grows.
     */
    const [shownCount, setShownCount] = useState(1);
    const finalCardVideoRef = useRef<HTMLVideoElement>(null);
    const expansionCompleteRef = useRef(false);

    useEffect(() => {
      if (!visible || !videoSrc) {
        onVideoCardVisibleChange?.(false);
        return;
      }
      const revealed = shownCount >= list.length;
      onVideoCardVisibleChange?.(revealed);
    }, [visible, videoSrc, shownCount, list.length, onVideoCardVisibleChange]);

    useEffect(() => {
      if (!visible) {
        onActiveSlotChange?.(0);
        return;
      }
      onActiveSlotChange?.(Math.max(0, shownCount - 1));
    }, [visible, shownCount, onActiveSlotChange]);

    useEffect(() => {
      if (!visible) return;
      for (const imgSrc of imageList) {
        const img = new window.Image();
        img.src = imgSrc;
      }
      if (shownCount >= list.length) return;
      const id = setInterval(() => {
        setShownCount((c) => Math.min(c + 1, list.length));
      }, cycleInterval);
      return () => clearInterval(id);
    }, [visible, imageList, list, cycleInterval, shownCount]);

    useEffect(() => {
      if (!isExpanding || expansionCompleteRef.current) return;
      const id = window.setTimeout(() => {
        expansionCompleteRef.current = true;
        onExpansionComplete?.(finalCardVideoRef.current?.currentTime ?? 0);
      }, EXPAND_DURATION * 1000);

      return () => window.clearTimeout(id);
    }, [isExpanding, onExpansionComplete]);

    // Build stack: newest (front) at index 0
    const lastSlotIndex = list.length - 1;
    const stack = isExpanding
      ? [lastSlotIndex]
      : Array.from({ length: shownCount }, (_, i) => shownCount - 1 - i);
    const expandedWidth =
      typeof window !== "undefined"
        ? window.innerWidth
        : expandingCardRect?.width ?? 380;
    const expandedHeight =
      typeof window !== "undefined"
        ? window.innerHeight
        : expandingCardRect?.height ?? 380;

    return (
      <motion.div
        ref={ref}
        className={cn(
          isExpanding ? "fixed z-[var(--z-loader)]" : "relative z-10 w-[min(72vw,380px)]",
          className,
        )}
        initial={
          isExpanding
            ? false
            : { opacity: 0, scale: 0.9, rotate: CARD_ROTATION - 1 }
        }
        animate={
          isExpanding
            ? {
                top: 0,
                left: 0,
                width: expandedWidth,
                height: expandedHeight,
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  duration: EXPAND_DURATION,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
            : visible
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: CARD_ROTATION,
                  transition: { duration: 0.9, ease: EASE_OUT },
                }
              : { opacity: 0, scale: 0.9, rotate: CARD_ROTATION - 1 }
        }
        {...(isExpanding
          ? {
              style: {
                top: expandingCardRect?.top ?? 0,
                left: expandingCardRect?.left ?? 0,
                width: expandingCardRect?.width ?? 0,
                height: expandingCardRect?.height ?? 0,
              },
            }
          : {})}
      >
        <div
          className={cn("relative", isExpanding ? "h-full w-full" : "w-full")}
          style={isExpanding ? undefined : { aspectRatio: "1 / 1" }}
        >
          {stack.map((slotIndex, depth) => {
            const cfg = STACK_CONFIGS[Math.min(depth, STACK_CONFIGS.length - 1)]!;
            const baseRot = RESTING_ROTATIONS[slotIndex % 2]!;
            const targetRot = baseRot + cfg.rotOffset;
            const isTop = depth === 0;
            const isVideoSlot = videoSrc && slotIndex === lastSlotIndex;
            const isInteractiveFinalCard =
              Boolean(finalCardInteractive && !isExpanding && isTop && isVideoSlot);

            return (
              <motion.div
                key={slotIndex}
                className="absolute inset-0 overflow-hidden"
                onClick={isInteractiveFinalCard ? onFinalCardClick : undefined}
                role={isInteractiveFinalCard ? "button" : undefined}
                tabIndex={isInteractiveFinalCard ? 0 : undefined}
                onKeyDown={
                  isInteractiveFinalCard
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onFinalCardClick?.();
                        }
                      }
                    : undefined
                }
                initial={
                  isExpanding
                    ? false
                    : {
                        scale: 0.16,
                        opacity: 0,
                        borderRadius: 220,
                        rotate: baseRot * 1.6,
                      }
                }
                animate={
                  isExpanding
                    ? {
                        scale: 1,
                        opacity: 1,
                        borderRadius: 0,
                        rotate: 0,
                      }
                    : {
                        scale: cfg.scale,
                        opacity: cfg.opacity,
                        borderRadius: 28,
                        rotate: targetRot,
                      }
                }
                transition={
                  isExpanding
                    ? { duration: EXPAND_DURATION, ease: [0.22, 1, 0.36, 1] }
                    : { duration: transitionDuration, ease: EASE_OUT }
                }
                style={{
                  zIndex: cfg.zIndex,
                  boxShadow: isExpanding ? "none" : cfg.shadow,
                  cursor: isInteractiveFinalCard ? "pointer" : "default",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: isExpanding ? 1 : isTop ? 1.35 : 1.26 }}
                  transition={
                    isExpanding
                      ? { duration: EXPAND_DURATION, ease: [0.22, 1, 0.36, 1] }
                      : isTop
                      ? { duration: 7, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                      : { duration: transitionDuration, ease: EASE_OUT }
                  }
                >
                  {isVideoSlot ? (
                    <HeroMediaSurface
                      ref={finalCardVideoRef}
                      videoSrc={list[slotIndex] ?? undefined}
                      videoPaused={!isExpanding}
                    />
                  ) : (
                    <Image
                      src={list[slotIndex % list.length]!}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, 380px"
                      priority={slotIndex === 0}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }
);

SplashCentralImage.displayName = "SplashCentralImage";

export { SplashCentralImage };
