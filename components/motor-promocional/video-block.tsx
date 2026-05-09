"use client";

import type { ReactNode } from "react";

export function MotorVideoBlock(): ReactNode {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-black p-4 sm:p-6 lg:p-8">
      <div className="relative aspect-[370/640] w-full overflow-hidden rounded-[1.5rem] bg-black">
        <video
          className="block h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        >
          <source src="/videos/IML.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
