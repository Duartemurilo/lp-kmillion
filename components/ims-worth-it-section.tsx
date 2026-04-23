"use client";

import type { LucideIcon } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const PURPLE = "#300250";

type WorthReason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ImsWorthItSectionProps = {
  id?: string;
  eyebrow: string;
  /** Título (ex. palavra de destaque já em itálico + roxo). */
  title: ReactNode;
  lead?: string;
  reasons: readonly WorthReason[];
  /** Foto / arte central (parallax) — p.ex. /kashback.avif */
  centerImageSrc: string;
  centerImageAlt: string;
  /** Vídeo opcional como background da seção (full-bleed). */
  backgroundVideoSrc?: string;
  tone?: "light" | "dark";
  accentColor?: string;
  reasonLayout?: "default" | "three";
  centerImageDensity?: "default" | "compact";
  centerImageRadius?: "default" | "none";
};

const ease = [0.23, 1, 0.32, 1] as const;

function ParallaxMaskImage({
  src,
  alt,
  className: outerClass,
  tone = "light",
  density = "default",
  radius = "default",
}: {
  src: string;
  alt: string;
  className?: string;
  tone?: "light" | "dark";
  density?: "default" | "compact";
  radius?: "default" | "none";
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [32, -32]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto h-full w-full overflow-hidden",
        radius === "none"
          ? "rounded-none"
          : "rounded-t-[2.25rem] sm:rounded-t-[2.5rem]",
        /* “Semicírculo” alargado em baixo: quase a altura da secção, como a referência */
        radius === "none"
          ? density === "compact"
            ? "min-h-[15rem] max-w-[16rem] md:min-h-[min(48vh,420px)] lg:mx-0 lg:min-h-[min(58vh,520px)] lg:max-w-[min(22rem,30vw)] xl:max-w-[24rem]"
            : "min-h-[20rem] max-w-[20rem] md:min-h-[min(64vh,600px)] lg:mx-0 lg:min-h-[min(72vh,720px)] lg:max-w-[min(24rem,32vw)] xl:max-w-[28rem]"
          : density === "compact"
            ? "min-h-[15rem] max-w-[16rem] rounded-b-[3.75rem] sm:min-h-[18rem] sm:max-w-[18rem] sm:rounded-b-[4.5rem] md:min-h-[min(48vh,420px)] md:rounded-b-[5rem] lg:mx-0 lg:min-h-[min(58vh,520px)] lg:max-w-[min(22rem,30vw)] lg:rounded-b-[6rem] xl:max-w-[24rem] xl:rounded-b-[6.5rem] 2xl:rounded-b-[7rem]"
            : "min-h-[20rem] max-w-[20rem] rounded-b-[4.5rem] sm:min-h-[24rem] sm:max-w-[22rem] sm:rounded-b-[6rem] md:min-h-[min(64vh,600px)] md:rounded-b-[7rem] lg:mx-0 lg:min-h-[min(72vh,720px)] lg:max-w-[min(24rem,32vw)] lg:rounded-b-[9rem] xl:max-w-[28rem] xl:rounded-b-[10rem] 2xl:rounded-b-[12rem]",
        outerClass
      )}
    >
      <div
        className={`absolute inset-0 -z-10 ${
          tone === "dark" ? "bg-[#0f0f12]" : ""
        }`}
        style={
          tone === "dark"
            ? undefined
            : {
                background: `radial-gradient(120% 85% at 50% 100%, rgba(48,2,80,0.38) 0%, transparent 70%)`,
              }
        }
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 h-[120%] min-h-full w-full -translate-y-[2%] sm:-translate-y-[1%] lg:translate-y-0"
        style={!reduceMotion ? { y } : {}}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32rem"
          className="object-cover object-top md:object-center"
          priority={false}
        />
      </motion.div>
    </div>
  );
}

function ReasonCard({
  item,
  index,
  className,
  tone,
  accentColor,
}: {
  item: WorthReason;
  index: number;
  className?: string;
  tone: "light" | "dark";
  accentColor: string;
}): ReactNode {
  const Icon = item.icon;
  const isDark = tone === "dark";
  const isFeatured =
    item.title === "Campanhas em tempo real" ||
    item.title === "Segmentação inteligente";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      className={cn(
        !isDark
          ? "rounded-[1.6rem] border border-white/16 bg-white/8 p-5 shadow-[0_24px_70px_-44px_rgba(255,255,255,0.08),0_18px_50px_-40px_rgba(48,2,80,0.16)] backdrop-blur-2xl"
          : isFeatured
            ? "rounded-[1.6rem] border border-[#FE6634]/25 bg-[#FE6634] p-5 shadow-[0_26px_70px_-42px_rgba(254,102,52,0.48)]"
            : "rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-[0_22px_55px_-44px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border",
          isFeatured
            ? "border-white/18 bg-white/12"
            : isDark
              ? "border-[#FE6634]/20 bg-[#FE6634]/12"
              : "border-[#300250]/14 bg-[#300250]/10"
        )}
      >
        <Icon
          className={cn("h-5 w-5", isFeatured ? "text-white" : "")}
          style={!isFeatured ? { color: accentColor } : undefined}
          strokeWidth={1.8}
        />
      </div>
      <h3
        className={cn(
          "mt-4 text-base leading-snug font-semibold sm:text-lg",
          isFeatured ? "text-white" : isDark ? "text-white" : "text-[#18131a]"
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          isFeatured
            ? "text-white/78"
            : isDark
              ? "text-white/68"
              : "text-[#3f3740]"
        )}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

/**
 * "Por que vale a pena" — layout com título à esquerda, cards 2+2 em volta
 * e imagem central com máscara/parallax (inspirado em referência tipo "ingredients").
 */
export function ImsWorthItSection({
  id = "por-que",
  eyebrow,
  title,
  lead,
  reasons,
  centerImageSrc,
  centerImageAlt,
  backgroundVideoSrc,
  tone = "light",
  accentColor = PURPLE,
  reasonLayout = "default",
  centerImageDensity = "default",
  centerImageRadius = "default",
}: ImsWorthItSectionProps): ReactNode {
  const list = [...reasons];
  const six = list.length > 5;
  const isDark = tone === "dark";
  const useThreeCardLayout = reasonLayout === "three" && list.length >= 3;

  /** Coluna 2+1: dois cards lado a lado e um de largura total abaixo (índice base para stagger). */
  const side2Plus1 = (
    a: WorthReason,
    b: WorthReason,
    c: WorthReason,
    i0: number,
    wrapClass = ""
  ) => (
    <div
      className={cn(
        "relative z-10 flex w-full flex-col gap-3 sm:gap-4 lg:max-w-[30rem] lg:shrink-0 xl:max-w-[34rem] 2xl:max-w-[38rem]",
        wrapClass
      )}
    >
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
        <ReasonCard
          className="min-w-0"
          item={a}
          index={i0}
          tone={tone}
          accentColor={accentColor}
        />
        <ReasonCard
          className="min-w-0"
          item={b}
          index={i0 + 1}
          tone={tone}
          accentColor={accentColor}
        />
      </div>
      <ReasonCard
        className="w-full"
        item={c}
        index={i0 + 2}
        tone={tone}
        accentColor={accentColor}
      />
    </div>
  );

  /** 2 na direita (lado a lado) */
  const side2Only = (
    a: WorthReason,
    b: WorthReason,
    i0: number,
    wrapClass = ""
  ) => (
    <div
      className={cn(
        "relative z-10 w-full lg:max-w-[30rem] lg:shrink-0 xl:max-w-[34rem] 2xl:max-w-[38rem]",
        wrapClass
      )}
    >
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
        <ReasonCard
          className="min-w-0"
          item={a}
          index={i0}
          tone={tone}
          accentColor={accentColor}
        />
        <ReasonCard
          className="min-w-0"
          item={b}
          index={i0 + 1}
          tone={tone}
          accentColor={accentColor}
        />
      </div>
    </div>
  );

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden px-6 py-20 pb-24 sm:py-28 sm:pb-32 ${isDark ? "bg-[#0f0f12] text-white" : "bg-white text-[#18131a]"}`}
    >
      {backgroundVideoSrc != null && backgroundVideoSrc.trim().length > 0 ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={backgroundVideoSrc} type="video/mp4" />
          </video>
          <div
            className={cn(
              "absolute inset-0",
              isDark ? "bg-[#0f0f12]/55" : "bg-white/35"
            )}
          />
        </div>
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-[1680px]">
        <div className="mb-10 max-w-2xl text-left sm:mb-12 lg:mb-16">
          <p
            className="text-sm font-semibold tracking-[0.22em] uppercase"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </p>
          <div
            className={`mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl ${isDark ? "text-white" : "text-[#18131a]"}`}
          >
            {title}
          </div>
          {lead != null && lead.length > 0 ? (
            <p
              className={`mt-4 max-w-xl whitespace-pre-line text-base leading-relaxed ${isDark ? "text-white/68" : "text-[#5f4d58]"}`}
            >
              {lead}
            </p>
          ) : null}
        </div>

        {/* Layout alto (~200vh): esquerda primeiro, direita mais em baixo; imagem diagonal por baixo */}
        <div
          className={cn(
            "relative",
            useThreeCardLayout
              ? "min-h-[120vh] sm:min-h-[132vh] lg:min-h-[146vh]"
              : "min-h-[150vh] sm:min-h-[162vh] lg:min-h-[175vh]"
          )}
        >
          {backgroundVideoSrc == null ||
          backgroundVideoSrc.trim().length === 0 ? (
            <div
              className={cn(
                "pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 rotate-[-14deg] opacity-[0.92]",
                centerImageDensity === "compact"
                  ? "top-[22vh] w-[min(420px,78vw)] sm:top-[20vh] sm:w-[min(520px,72vw)] lg:top-[16vh] lg:w-[min(680px,44vw)] xl:w-[min(760px,40vw)]"
                  : "top-[18vh] w-[min(560px,92vw)] sm:top-[16vh] sm:w-[min(680px,88vw)] lg:top-[12vh] lg:w-[min(900px,62vw)] xl:w-[min(1020px,56vw)]",
                "mix-blend-normal"
              )}
              aria-hidden
            >
              <ParallaxMaskImage
                className="!max-w-none"
                src={centerImageSrc}
                alt={centerImageAlt}
                tone={tone}
                density={centerImageDensity}
                radius={centerImageRadius}
              />
            </div>
          ) : null}

          {useThreeCardLayout ? (
            <>
              <div className="relative z-10 max-w-xl lg:max-w-[36rem]">
                <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <ReasonCard
                    className="min-w-0"
                    item={list[0]!}
                    index={0}
                    tone={tone}
                    accentColor={accentColor}
                  />
                  <ReasonCard
                    className="min-w-0"
                    item={list[1]!}
                    index={1}
                    tone={tone}
                    accentColor={accentColor}
                  />
                </div>
              </div>

              <div className="relative z-10 mt-[58vh] flex w-full justify-start lg:mt-[68vh] lg:justify-end">
                <div className="w-full max-w-xl lg:max-w-[30rem]">
                  <ReasonCard
                    className="w-full"
                    item={list[2]!}
                    index={2}
                    tone={tone}
                    accentColor={accentColor}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Grupo esquerda (topo) */}
              {list[0] != null && list[1] != null && list[2] != null ? (
                <div className="relative z-10 max-w-xl lg:max-w-none">
                  {side2Plus1(list[0]!, list[1]!, list[2]!, 0)}
                </div>
              ) : null}

              {/* Grupo direita (bem mais em baixo) */}
              {six && list[3] != null && list[4] != null && list[5] != null ? (
                <div className="relative z-10 mt-[64vh] flex w-full justify-start sm:mt-[70vh] lg:mt-[80vh] lg:justify-end">
                  {side2Plus1(list[3]!, list[4]!, list[5]!, 3)}
                </div>
              ) : !six && list[3] != null && list[4] != null ? (
                <div className="relative z-10 mt-[64vh] flex w-full justify-start sm:mt-[70vh] lg:mt-[80vh] lg:justify-end">
                  {side2Only(list[3]!, list[4]!, 3)}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
