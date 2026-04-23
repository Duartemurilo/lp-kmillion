"use client";

import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import styles from "./scroll-stack.module.css";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export function ScrollStackItem({
  children,
  itemClassName = "",
}: ScrollStackItemProps): ReactNode {
  return (
    <div
      data-scroll-stack-card
      className={`${styles.card} ${itemClassName}`.trim()}
    >
      {children}
    </div>
  );
}

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const clampProgress = (value: number, start: number, end: number) => {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }

  if (value < start) return 0;
  if (value > end) return 1;
  return (value - start) / (end - start);
};

const parseOffset = (value: string | number, containerHeight: number) => {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * containerHeight;
  }

  return Number(value);
};

const getPageTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top + window.scrollY;

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>());
  const stackCompletedRef = useRef(false);
  const tickingRef = useRef(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const updateCardTransforms = useCallback(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parseOffset(stackPosition, containerHeight);
    const scaleEndPositionPx = parseOffset(scaleEndPosition, containerHeight);
    const endElement = root.querySelector(
      "[data-scroll-stack-end]"
    ) as HTMLElement | null;
    const endElementTop = endElement ? getPageTop(endElement) : getPageTop(root);

    let topCardIndex = 0;

    cards.forEach((card, i) => {
      const cardTop = getPageTop(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = clampProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      if (scrollTop >= triggerStart) {
        topCardIndex = i;
      }

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    const lastCard = cards[cards.length - 1];
    if (lastCard) {
      const lastCardTop = getPageTop(lastCard);
      const lastTriggerStart =
        lastCardTop - stackPositionPx - itemStackDistance * (cards.length - 1);
      const isInView = scrollTop >= lastTriggerStart && scrollTop <= endElementTop - containerHeight / 2;

      if (isInView && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!isInView && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
  }, [
    baseScale,
    blurAmount,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  const scheduleUpdate = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;
    window.requestAnimationFrame(() => {
      tickingRef.current = false;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const transformsCache = lastTransformsRef.current;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scroll-stack-card]")
    );
    cardsRef.current = cards;
    transformsCache.clear();
    stackCompletedRef.current = false;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      } else {
        card.style.marginBottom = "0px";
      }

      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.webkitTransform = "translateZ(0)";
    });

    const handleScroll = () => scheduleUpdate();
    const handleResize = () => scheduleUpdate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    if ("ResizeObserver" in window) {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(root);
    }

    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      cardsRef.current = [];
      transformsCache.clear();
      stackCompletedRef.current = false;
      tickingRef.current = false;
    };
  }, [itemDistance, scheduleUpdate]);

  return (
    <div ref={rootRef} className={`${styles.viewport} ${className}`.trim()}>
      <div className={styles.inner}>
        {children}
        <div data-scroll-stack-end className={styles.end} />
      </div>
    </div>
  );
}
