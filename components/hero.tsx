"use client";

import { LogoLoop, type LogoItem } from "@/components/logo-loop";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useRef, type ReactNode, type MouseEvent } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const logos: LogoItem[] = [
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_424025ea4edf4f1fac850b7ba412a812~mv2.avif/v1/fill/w_140,h_70,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.avif"
        alt="Marca 1"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_ea92226b12aa4211aa467140e675a74b~mv2.avif/v1/fill/w_137,h_68,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.avif"
        alt="Marca 2"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_316a4a55454d4085a9a62d0f4393925e~mv2.avif/v1/fill/w_133,h_66,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.avif"
        alt="Marca 3"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_bc559861e0fa4d349e4fa6e79460136e~mv2.avif/v1/fill/w_147,h_73,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.avif"
        alt="Marca 4"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_2d09a9e3a652433a98eb072a0ba8db1c~mv2.avif/v1/fill/w_133,h_66,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.avif"
        alt="Marca 5"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
  {
    node: (
      <img
        src="https://static.wixstatic.com/media/f9ab6d_cb6383215a814cd6a10d5bd9728528e2~mv2.avif/v1/fill/w_118,h_58,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.avif"
        alt="Marca 6"
        className="h-[1em] w-auto object-contain"
      />
    ),
  },
];

const PARALLAX_INTENSITY = 20;

type HeroProps = {
  id?: string;
  headlineLines?: ReactNode[];
  subheadline?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  showPreview?: boolean;
  /** Se false, esconde a faixa de logos (ex.: LP Motor Promocional). */
  showLogos?: boolean;
  /** Se true, a hero ocupa pelo menos 100dvh e centra título+CTA verticalmente. */
  fillViewport?: boolean;
  /** Imagem de fundo (parallax). Só aplica se não houver `backgroundVideoSrc`. */
  backgroundImageSrc?: string;
  /**
   * Se true, o CTA primário é um `button` sem ação (ex.: "Sou marca" em LP IMS).
   * Ignorado se `secondaryCta` existir: o par primário+secundário trata o primário.
   */
  ctaAsNoop?: boolean;
  /** Segundo CTA (estilo contorno) ao lado do primário, ex. "Quero fazer parte". */
  secondaryCta?: { label: string; href: string };
  /**
   * Texto título e subtítulo em claro (sobre fundo de imagem), ex. IMS.
   * O título ainda pode usar spans de destaque (ex. roxo) por conta própria.
   */
  lightText?: boolean;
  /**
   * Só com `secondaryCta`: o link (ex. Quero fazer parte) fica com fundo #300250 + seta
   * à esquerda no eixo; `ctaLabel` + `ctaAsNoop` fica o botão secundário borda clara, sem seta.
   */
  dualCtaImsLayout?: boolean;
  /** Cor do CTA primário quando `dualCtaImsLayout` estiver ativo. */
  dualCtaPrimaryColor?: string;
  backgroundVideoSrc?: string;
};

export function Hero({
  id,
  headlineLines = [
    <>
      Uma plataforma <span className="text-accent">SaaS</span>
    </>,
    <>para criar promoções</>,
    <>inteligentes para</>,
    <>sua rede de lojas</>,
  ],
  subheadline = (
    <>
      Automatize <span className="text-accent">campanhas promocionais</span> —
      crie, personalize e execute em todos os canais, sem depender do TI.
    </>
  ),
  ctaLabel = "Entre em contato",
  ctaHref,
  showPreview = true,
  showLogos = true,
  fillViewport = false,
  backgroundImageSrc = "/BG.webp",
  ctaAsNoop = false,
  secondaryCta,
  lightText = false,
  dualCtaImsLayout = false,
  dualCtaPrimaryColor = "#300250",
  backgroundVideoSrc,
}: HeroProps = {}): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;

    if (window.innerWidth < 850) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(offsetX * PARALLAX_INTENSITY);
    mouseY.set(offsetY * PARALLAX_INTENSITY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative isolate flex flex-col font-sans",
        fillViewport && "min-h-[100dvh]"
      )}
      style={{ colorScheme: "light" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {backgroundVideoSrc ? (
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden rounded-br-4xl rounded-bl-4xl bg-black min-[850px]:inset-2.5 min-[850px]:scale-105"
          style={{ x, y }}
          aria-hidden="true"
        >
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={backgroundVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 z-0 rounded-br-4xl rounded-bl-4xl bg-cover bg-center bg-no-repeat brightness-125 min-[850px]:inset-2.5 min-[850px]:scale-105"
          style={{
            backgroundImage: `url(${backgroundImageSrc})`,
            x,
            y,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex justify-center px-6",
          fillViewport
            ? "min-h-0 flex-1 flex-col items-center justify-center py-12 max-[850px]:py-8"
            : "items-start pt-64 max-[850px]:pt-32"
        )}
      >
        <motion.div
          className="flex max-w-4xl flex-col items-center text-center font-sans max-[850px]:w-full max-[850px]:items-start max-[850px]:text-left"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <h1
            className={cn(
              "mb-6 text-7xl leading-[1.04] font-medium tracking-tight max-[850px]:text-4xl",
              lightText ? "text-white" : "text-black"
            )}
          >
            {headlineLines.map((line, index) => (
              <motion.span
                key={index}
                className="block"
                variants={fadeInUp}
                transition={{ duration: 0.8, ease }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {subheadline != null ? (
            <motion.div
              className={cn(
                "mb-8 max-w-xl text-lg",
                lightText ? "text-white/90" : "text-neutral-600",
                "max-[850px]:text-white/90"
              )}
              variants={fadeInUp}
              transition={{ duration: 0.8, ease }}
            >
              {subheadline}
            </motion.div>
          ) : null}

          {secondaryCta != null && dualCtaImsLayout ? (
            <motion.div
              className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
              variants={fadeInScale}
              transition={{ duration: 0.8, ease }}
            >
              <a
                href={secondaryCta.href}
                className="group relative inline-flex w-full min-w-0 cursor-pointer items-center font-sans sm:w-auto"
              >
                <span
                  className="relative z-10 rounded-l-xl border px-5 py-3 pl-5 text-sm font-medium text-white max-[850px]:flex-1 sm:px-6 sm:py-3 sm:max-w-none sm:flex-initial sm:text-base"
                  style={{
                    backgroundColor: dualCtaPrimaryColor,
                    borderColor: dualCtaPrimaryColor,
                  }}
                >
                  {secondaryCta.label}
                </span>
                <span
                  className="relative -left-px z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-r-xl border border-l-0 bg-white max-[850px]:flex-none sm:h-[50px]"
                  style={{
                    borderColor: dualCtaPrimaryColor,
                    color: dualCtaPrimaryColor,
                  }}
                >
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
              {ctaAsNoop || !ctaHref ? (
                <button
                  type="button"
                  className="inline-flex w-full min-w-0 items-center justify-center rounded-xl border-2 border-white/50 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10 sm:w-auto"
                >
                  {ctaLabel}
                </button>
              ) : (
                <a
                  href={ctaHref}
                  className="inline-flex w-full min-w-0 items-center justify-center rounded-xl border-2 border-white/50 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10 sm:w-auto"
                >
                  {ctaLabel}
                </a>
              )}
            </motion.div>
          ) : secondaryCta != null ? (
            <motion.div
              className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
              variants={fadeInScale}
              transition={{ duration: 0.8, ease }}
            >
              {ctaAsNoop ? (
                <button
                  type="button"
                  className="group relative inline-flex w-full min-w-0 cursor-pointer items-center font-sans sm:w-auto"
                >
                  <span className="bg-accent relative z-10 rounded-xl px-6 py-3 font-medium text-white max-[850px]:flex-1 sm:max-w-none sm:flex-initial">
                    {ctaLabel}
                  </span>
                  <span className="text-accent relative -left-px z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm max-[850px]:flex-none">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </button>
              ) : ctaHref ? (
                <a
                  href={ctaHref}
                  className="group relative inline-flex w-full min-w-0 cursor-pointer items-center font-sans sm:w-auto"
                >
                  <span className="bg-accent relative z-10 rounded-xl px-6 py-3 font-medium text-white max-[850px]:flex-1 sm:max-w-none sm:flex-initial">
                    {ctaLabel}
                  </span>
                  <span className="text-accent relative -left-px z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm max-[850px]:flex-none">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ) : null}

              <a
                href={secondaryCta.href}
                className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-xl border-2 border-neutral-900/10 bg-white/90 px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-sm transition-transform hover:border-neutral-900/18 hover:bg-white sm:w-auto"
              >
                {secondaryCta.label}
              </a>
            </motion.div>
          ) : ctaHref ? (
            <motion.a
              href={ctaHref}
              className="group relative inline-flex cursor-pointer items-center font-sans max-[850px]:w-full"
              variants={fadeInScale}
              transition={{ duration: 0.8, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-accent relative z-10 rounded-xl px-6 py-3 font-medium text-white max-[850px]:flex-1">
                {ctaLabel}
              </span>
              <span className="text-accent relative -left-px z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm max-[850px]:flex-none">
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ) : (
            <motion.button
              type="button"
              className="group relative inline-flex cursor-pointer items-center font-sans max-[850px]:w-full"
              variants={fadeInScale}
              transition={{ duration: 0.8, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-accent relative z-10 rounded-xl px-6 py-3 font-medium text-white max-[850px]:flex-1">
                {ctaLabel}
              </span>
              <span className="text-accent relative -left-px z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm max-[850px]:flex-none">
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          )}
        </motion.div>
      </div>

      {showPreview ? (
        <motion.div
          className="relative z-10 mt-24 px-6 max-[850px]:mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)] shadow-2xl/5 [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
              <Image
                src="/dashboardmock_2.png"
                alt="Dashboard preview"
                width={1920}
                height={1080}
                className="h-auto w-full dark:hidden"
                priority
              />
              <Image
                src="/dashboardmock_2_white.png"
                alt="Dashboard preview"
                width={1920}
                height={1080}
                className="hidden h-auto w-full dark:block"
                priority
              />
            </div>
          </div>
        </motion.div>
      ) : null}

      {showLogos ? (
        <motion.div
          className="relative z-10 pt-24 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
        >
          <LogoLoop logos={logos} speed={60} logoHeight={42} gap={124} />
        </motion.div>
      ) : null}
    </section>
  );
}
