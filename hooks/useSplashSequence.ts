"use client";

import { useEffect, useState } from "react";

type SplashSequenceOptions = {
  minDuration?: number;
  persistent?: boolean;
};

export function useSplashSequence({ minDuration = 0, persistent = false }: SplashSequenceOptions) {
  const [progressPercent, setProgressPercent] = useState(0);
  const [imageVisible, setImageVisible] = useState(false);
  const [isVideoExpanding, setIsVideoExpanding] = useState(false);

  useEffect(() => {
    if (!persistent) return;

    const showTimer = window.setTimeout(() => setImageVisible(true), 120);
    const progressTimer = window.setInterval(() => {
      setProgressPercent((value) => Math.min(value + 6, 100));
    }, 90);
    const expandTimer = window.setTimeout(() => {
      setIsVideoExpanding(true);
      window.clearInterval(progressTimer);
      setProgressPercent(100);
    }, Math.max(minDuration, 1200));

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(expandTimer);
      window.clearInterval(progressTimer);
    };
  }, [minDuration, persistent]);

  useEffect(() => {
    if (persistent) return;

    const showTimer = window.setTimeout(() => setImageVisible(true), 120);
    const totalDuration = Math.max(minDuration, 3400);
    const progressStartedAt = window.performance.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = window.performance.now() - progressStartedAt;
      setProgressPercent(Math.min((elapsed / totalDuration) * 100, 100));
    }, 50);
    const doneTimer = window.setTimeout(() => {
      setIsVideoExpanding(true);
      window.clearInterval(progressTimer);
      setProgressPercent(100);
    }, totalDuration);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(doneTimer);
      window.clearInterval(progressTimer);
    };
  }, [minDuration, persistent]);

  return { progressPercent, imageVisible, isVideoExpanding };
}
