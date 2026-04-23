"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

type ImsBrandVideoSectionProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  videoSrc: string;
};

export function ImsBrandVideoSection({
  id = "ims-brand-video",
  eyebrow,
  title,
  description,
  videoSrc,
}: ImsBrandVideoSectionProps): ReactNode {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    const video = videoRef.current;
    if (video) {
      video.muted = nextMuted;
      if (!nextMuted) {
        void video.play().catch(() => {});
      }
    }
  };

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#0f0f12] px-6 py-20 text-white sm:py-28"
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="order-2 max-w-3xl lg:order-1"
        >
          <span className="text-sm font-semibold tracking-[0.22em] text-[#FE6634] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="order-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_30px_80px_-40px_rgba(0,0,0,0.72)] lg:order-2 lg:justify-self-end lg:w-full lg:max-w-[22rem]"
        >
          <div className="relative">
            <video
              ref={videoRef}
              className="block aspect-[9/16] w-full object-contain bg-black"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
              className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/70 text-white backdrop-blur-md transition-colors hover:bg-black/85"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
