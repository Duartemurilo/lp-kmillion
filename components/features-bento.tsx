"use client";

import { motion, type Transition } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

const HERO_BADGES = [
  {
    src: "https://static.wixstatic.com/media/f9ab6d_07b3ff49476e4c318d5477c238b7b642~mv2.png/v1/crop/x_450,y_968,w_1434,h_1322/fill/w_316,h_292,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/13.png",
    alt: "Ícone promocional 1",
    className: "top-6 left-0 md:-left-2",
  },
  {
    src: "https://static.wixstatic.com/media/f9ab6d_78048d158ab54630a010d1ef11681b93~mv2.png/v1/crop/x_463,y_980,w_1751,h_1170/fill/w_386,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/15.png",
    alt: "Ícone promocional 2",
    className: "top-10 right-0 md:-right-4",
  },
  {
    src: "https://static.wixstatic.com/media/f9ab6d_a0d7ad7982df415da6c15c4137316cfa~mv2.png/v1/crop/x_399,y_1024,w_1924,h_1316/fill/w_424,h_290,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/12.png",
    alt: "Ícone promocional 3",
    className: "bottom-20 left-2 md:-left-5",
  },
  {
    src: "https://static.wixstatic.com/media/f9ab6d_0966d0fc0cd54278b910eeb70abcaa87~mv2.png/v1/crop/x_444,y_951,w_1485,h_1406/fill/w_326,h_310,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/14.png",
    alt: "Ícone promocional 4",
    className: "bottom-8 right-2 md:-right-3",
  },
] as const;

const FEATURE_CARDS = {
  descontos: {
    title: "Descontos",
    description:
      "Descontos inteligentes e personalizáveis para impulsionar vendas.",
    image:
      "https://static.wixstatic.com/media/f9ab6d_345a5ac4a7454b7aaf3eca28eabb6e32~mv2.png/v1/crop/x_11,y_0,w_3352,h_3375/fill/w_576,h_580,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  },
  cupons: {
    title: "Cupons",
    description:
      "Cupons personalizados que aumentam engajamento e fidelização.",
    image:
      "https://static.wixstatic.com/media/f9ab6d_73599328dbf34cac87dc6f4ac3fb3a8e~mv2.png/v1/crop/x_14,y_0,w_3348,h_3375/fill/w_584,h_588,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7.png",
  },
  brindes: {
    title: "Brindes",
    image:
      "https://static.wixstatic.com/media/f9ab6d_2da008b8543e4553adff3fc1e1132f8d~mv2.png/v1/crop/x_11,y_0,w_3352,h_3375/fill/w_584,h_588,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
  },
  combo: {
    title: "Combo de Produto",
    image:
      "https://static.wixstatic.com/media/f9ab6d_990885c698054dc2879598fbf50e18b6~mv2.png/v1/crop/x_126,y_0,w_2297,h_2313/fill/w_584,h_588,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/imagens%20icones.png",
  },
} as const;

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

function PhoneMockup({
  children,
  variant = "full",
}: {
  children: ReactNode;
  variant?: "full" | "compact";
}): ReactNode {
  const isCompact = variant === "compact";

  return (
    <div
      className={`relative z-10 overflow-hidden border border-neutral-200 bg-white shadow-[0_30px_80px_-40px_rgba(17,17,17,0.28)] ${
        isCompact
          ? "h-64 w-44 rounded-3xl md:h-72 md:w-48"
          : "h-96 w-56 rounded-t-4xl border-b-0 md:h-115 md:w-64"
      }`}
    >
      <div
        className={`absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#EAE4EF] ${
          isCompact ? "top-2 h-4 w-16" : "top-2 h-5 w-20"
        }`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

function RemoteImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}): ReactNode {
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

function PromoFloatingBadges(): ReactNode {
  return (
    <>
      {HERO_BADGES.map((badge) => (
        <div
          key={badge.src}
          className={`absolute z-20 hidden rounded-2xl bg-white/85 p-2 shadow-lg backdrop-blur-sm md:block ${badge.className}`}
        >
          <RemoteImage
            src={badge.src}
            alt={badge.alt}
            className="h-12 w-auto object-contain"
          />
        </div>
      ))}
    </>
  );
}

function HeroPromoPreview(): ReactNode {
  return (
    <div className="absolute inset-0 bg-white px-5 pt-14">
      <div className="rounded-full bg-[#F7EFFC] px-3 py-1 text-center text-[11px] font-semibold tracking-[0.16em] text-[#300250] uppercase">
        Mecânicas promocionais
      </div>

      <h4 className="mt-5 text-3xl leading-none font-semibold tracking-tight text-[#300250]">
        Crie campanhas
      </h4>
      <h4 className="text-3xl leading-none font-semibold tracking-tight text-[#FE6634]">
        que performam
      </h4>

      <p className="mt-4 max-w-[16rem] text-sm leading-snug text-[#6F6577]">
        Descontos, cupons, brindes e combos em uma experiência visual, flexível
        e rápida de operar.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-[#FFF2EC] p-3">
          <RemoteImage
            src={FEATURE_CARDS.descontos.image}
            alt={FEATURE_CARDS.descontos.title}
            className="h-22 w-full rounded-xl object-cover"
          />
          <p className="mt-2 text-xs font-semibold text-[#300250]">
            {FEATURE_CARDS.descontos.title}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F7EFFC] p-3">
          <RemoteImage
            src={FEATURE_CARDS.cupons.image}
            alt={FEATURE_CARDS.cupons.title}
            className="h-22 w-full rounded-xl object-cover"
          />
          <p className="mt-2 text-xs font-semibold text-[#300250]">
            {FEATURE_CARDS.cupons.title}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#300250] px-3 py-1 text-xs font-medium text-white">
          Brindes
        </span>
        <span className="rounded-full bg-[#FE6634] px-3 py-1 text-xs font-medium text-white">
          Combo de Produto
        </span>
      </div>
    </div>
  );
}

function StepByStepCard(): ReactNode {
  return (
    <motion.div
      {...cardAnimation}
      transition={getCardTransition(0)}
      className="group relative flex min-h-140 flex-col overflow-hidden rounded-4xl border border-neutral-200 bg-white p-8 pb-0 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:row-span-2"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FE6634,#FF8D18,#FF3131)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,102,52,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,141,24,0.08),transparent_28%)]" />

      <div className="relative z-10 mb-6 text-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <h3 className="text-2xl leading-tight font-semibold md:text-4xl">
          <span className="text-neutral-900">Motor de</span>
          <br />
          <span className="text-accent">Promoções Inteligentes</span>
        </h3>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
          A base promocional da Kmillion para criar campanhas com mais controle,
          autonomia e velocidade de execução.
        </p>

        <Link
          href="/motor-promocional"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d]"
        >
          Saiba mais
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative flex flex-1 items-end justify-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <PromoFloatingBadges />
        <PhoneMockup variant="full">
          <HeroPromoPreview />
        </PhoneMockup>
      </div>
    </motion.div>
  );
}

function DashboardCard(): ReactNode {
  return (
    <motion.div
      {...cardAnimation}
      transition={getCardTransition(0.1)}
      className="group relative flex min-h-80 flex-col overflow-hidden rounded-4xl border border-neutral-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:block"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FE6634,#FF8D18)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,141,24,0.1),transparent_30%)]" />

      <div className="relative z-10 max-w-60 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <span className="inline-flex rounded-full bg-[#FFF2EC] px-3 py-1 text-xs font-semibold text-accent">
          Mecânica
        </span>

        <h3 className="mt-4 text-xl leading-tight font-semibold text-neutral-900 md:text-2xl">
          {FEATURE_CARDS.descontos.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {FEATURE_CARDS.descontos.description}
        </p>
      </div>

      <div className="relative mt-8 flex items-center justify-center self-center transition-transform duration-500 ease-out group-hover:scale-105 md:absolute md:top-1/2 md:right-8 md:mt-0 md:-translate-y-1/2 md:self-auto">
        <div className="absolute h-52 w-52 rounded-full bg-[#FE6634]/10 blur-3xl" />

        <PhoneMockup variant="compact">
          <div className="absolute inset-0 bg-white p-3">
            <RemoteImage
              src={FEATURE_CARDS.descontos.image}
              alt={FEATURE_CARDS.descontos.title}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </PhoneMockup>

        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-[#FE6634]/12 bg-[#FFF2EC] px-4 py-3 whitespace-nowrap shadow-xl">
          <div className="text-xs font-medium text-[#8A4A35]">
            Descontos inteligentes
          </div>
          <div className="mt-1 text-sm font-semibold text-[#300250]">
            Personalizáveis para vender mais
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrustedByCard(): ReactNode {
  return (
    <motion.div
      {...cardAnimation}
      transition={getCardTransition(0.2)}
      className="group flex min-h-64 flex-col items-center justify-center rounded-4xl border border-neutral-200 bg-white p-6 text-center shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:p-8"
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-105">
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-[#FFF2EC] shadow-sm">
          <RemoteImage
            src={FEATURE_CARDS.cupons.image}
            alt={FEATURE_CARDS.cupons.title}
            className="h-24 w-24 rounded-2xl object-cover"
          />
        </div>

        <h3 className="text-2xl leading-tight font-semibold text-neutral-900 md:text-3xl">
          {FEATURE_CARDS.cupons.title}
        </h3>

        <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
          {FEATURE_CARDS.cupons.description}
        </p>
      </div>
    </motion.div>
  );
}

function MiniFeatureRow({
  title,
  image,
}: {
  title: string;
  image: string;
}): ReactNode {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white">
        <RemoteImage
          src={image}
          alt={title}
          className="h-12 w-12 rounded-xl object-cover"
        />
      </div>
      <span className="max-w-[11rem] text-sm font-semibold text-neutral-900">
        {title}
      </span>
    </div>
  );
}

function IntegrationsCard(): ReactNode {
  return (
    <motion.div
      {...cardAnimation}
      transition={getCardTransition(0.3)}
      className="group flex min-h-64 flex-col rounded-4xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:p-8"
    >
      <div className="mb-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <div className="mb-3 inline-flex rounded-full bg-[#FFF2EC] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Destaques
        </div>

        <h3 className="text-xl leading-tight font-semibold text-neutral-900 md:text-2xl">
          Mais possibilidades promocionais
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Amplie sua operação promocional com diferentes mecânicas dentro da
          mesma experiência.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <MiniFeatureRow
          title={FEATURE_CARDS.brindes.title}
          image={FEATURE_CARDS.brindes.image}
        />
        <MiniFeatureRow
          title={FEATURE_CARDS.combo.title}
          image={FEATURE_CARDS.combo.image}
        />
      </div>
    </motion.div>
  );
}

export function FeaturesBento(): ReactNode {
  return (
    <section className="w-full bg-black px-6 pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr]">
          <StepByStepCard />
          <DashboardCard />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TrustedByCard />
            <IntegrationsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
