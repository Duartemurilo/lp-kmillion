"use client";

import Image from "next/image";
import { forwardRef, type ReactNode } from "react";

type HeroMediaSurfaceProps = {
  src?: string | undefined;
  alt?: string;
  children?: ReactNode;
  videoSrc?: string | undefined;
  videoPaused?: boolean;
};

export const HeroMediaSurface = forwardRef<HTMLVideoElement, HeroMediaSurfaceProps>(
  function HeroMediaSurface({ src, alt = "", children, videoSrc, videoPaused }, ref) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        {videoSrc ? (
          <video
            ref={ref}
            src={videoSrc}
            autoPlay={!videoPaused}
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : src ? (
          <Image src={src} alt={alt} fill className="object-cover" />
        ) : null}
        {children}
      </div>
    );
  },
);
