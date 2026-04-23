"use client";

import { motion, type Transition } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

const cardAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const getCardTransition = (delay = 0): Transition => ({
  duration: 0.8,
  ease: EASE,
  delay,
});

const FEATURED_IMAGE_SRC =
  "https://static.wixstatic.com/media/f9ab6d_f992d909008f443094614d720da8d707~mv2.png/v1/fill/w_157,h_152,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f9ab6d_f992d909008f443094614d720da8d707~mv2.png";

type SupportingCardItem = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  noIcon?: boolean;
};

const SUPPORTING_CARDS: SupportingCardItem[] = [
  {
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_4639d5c4fa0e4f48ac9debaf4c427ec2~mv2.png/v1/fill/w_129,h_129,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f9ab6d_4639d5c4fa0e4f48ac9debaf4c427ec2~mv2.png",
    imageAlt: "Autonomia para o marketing",
    title: "Autonomia para o marketing",
    description:
      "Crie e gerencie campanhas de Kashback sem depender de equipes técnicas.",
    noIcon: true,
  },
  {
    title: "Menos dependência de TI",
    description:
      "Plataforma intuitiva que permite operação independente pelo time de negócios.",
    noIcon: true,
  },
  {
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_c50b8a6c2816412399c8f58c2db02dbc~mv2.png/v1/fill/w_141,h_141,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f9ab6d_c50b8a6c2816412399c8f58c2db02dbc~mv2.png",
    imageAlt: "Mais recompra",
    title: "Mais recompra",
    description:
      "Estratégias inteligentes que aumentam a frequência de retorno dos clientes.",
    noIcon: true,
  },
  {
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_eeeae578b6db47b9ab5d3946bd3339d2~mv2.png/v1/fill/w_164,h_164,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f9ab6d_eeeae578b6db47b9ab5d3946bd3339d2~mv2.png",
    imageAlt: "Visibilidade total de ROI",
    title: "Visibilidade total de ROI",
    description:
      "Dashboards em tempo real mostrando o retorno de cada ação promocional.",
    noIcon: true,
  },
] as const;

function FeaturedCard(): ReactNode {
  return (
    <motion.div
      {...cardAnimation}
      transition={getCardTransition(0)}
      className="group relative overflow-hidden rounded-4xl border border-[#FF7A1A]/35 bg-[linear-gradient(180deg,#FF7A1A_0%,#E95F23_100%)] p-6 text-white shadow-[0_30px_80px_-44px_rgba(255,122,26,0.48)] md:min-h-[31rem] md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_82%,rgba(255,255,255,0.1),transparent_24%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] text-white/90 uppercase">
            Kashback Kmillion
          </div>

          <h3 className="mt-5 max-w-[15ch] text-[clamp(2rem,3.4vw,3.5rem)] leading-[0.94] font-semibold tracking-[-0.06em] text-white">
            Resultados reais com{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#300250]">
              simplicidade
            </span>
          </h3>

          <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/80 sm:text-[1.05rem]">
            Uma estrutura pensada para acelerar a operação, reduzir atrito e
            manter o time de marketing no controle.
          </p>
        </div>

        <div className="relative flex min-h-[10rem] items-end justify-end">
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-white/12 blur-3xl" />
          <Image
            src={FEATURED_IMAGE_SRC}
            alt="Kashback Kmillion"
            width={314}
            height={304}
            className="h-36 w-36 object-contain sm:h-44 sm:w-44"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

function SupportingCard({
  imageSrc,
  imageAlt,
  title,
  description,
  delay,
  noIcon = false,
}: {
  imageSrc: string | undefined;
  imageAlt: string | undefined;
  title: string;
  description: string;
  delay: number;
  noIcon: boolean | undefined;
}): ReactNode {
  return (
    <motion.article
      {...cardAnimation}
      transition={getCardTransition(delay)}
      className="group relative min-h-64 overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,26,0.08),transparent_38%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        {noIcon ? null : (
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF2EC] shadow-sm transition-transform duration-500 ease-out group-hover:scale-105">
            {imageSrc != null && imageAlt != null ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={164}
                height={164}
                className="h-16 w-16 object-contain"
              />
            ) : null}
          </div>
        )}

        <h3 className="text-[1.05rem] leading-snug font-semibold tracking-[-0.03em] text-[#18131a] sm:text-[1.15rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-[#5f4d58]">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export function KashbackResultsBentoSection(): ReactNode {
  return (
    <section className="w-full bg-black px-6 pb-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-[#FF7A1A] uppercase">
            Resultado final
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Resultados reais com{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#300250]">
              simplicidade
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/68 sm:text-lg">
            Um fluxo pensado para acelerar a operação, reduzir atrito e manter
            o time de marketing no controle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.08fr_1fr]">
          <FeaturedCard />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SUPPORTING_CARDS.map((card, index) => (
              <SupportingCard
                key={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                title={card.title}
                description={card.description}
                delay={0.1 * (index + 1)}
                noIcon={card.noIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
