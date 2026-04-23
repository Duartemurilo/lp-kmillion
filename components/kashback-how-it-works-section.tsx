"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import TiltedCard from "@/components/reactbits/TiltedCard";

const EASE = [0.23, 1, 0.32, 1] as const;

const KASHBACK_TITLE_STYLE = {
  fontWeight: 600,
  letterSpacing: "-0.04em",
};

const FLOW_CARDS = [
  {
    step: "01",
    title: "Cliente compra e ativa o benefício",
    description:
      "No momento da compra, o cliente é automaticamente cadastrado no programa de Kashback.",
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_27369e909ef94414875e1bba98a4cea1~mv2.png/v1/fill/w_242,h_444,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hf_20260120_205937_0cde91ed-a75c-4943-a428-41d17c5dd13c.png",
  },
  {
    step: "02",
    title: "Plataforma identifica o comportamento",
    description:
      "Nossa IA analisa histórico, preferências e padrões para entender o perfil do cliente.",
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_0e08997e47ea442f9224c815bce6b807~mv2.png/v1/crop/x_0,y_55,w_1469,h_2697/fill/w_242,h_444,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hf_20260120_212857_1b9d24cf-b9f5-4d3a-9b09-631aca6e90fe.png",
  },
  {
    step: "03",
    title: "Oferta disparada automaticamente",
    description:
      "No momento certo e pelo canal ideal, uma oferta personalizada é enviada ao cliente.",
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_06fa75f8e3a24306952d42c68dc0e263~mv2.png/v1/fill/w_242,h_444,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hf_20260120_212520_cbbecd61-e6da-4650-ae49-ddc099323572.png",
  },
  {
    step: "04",
    title: "Acompanhamento em tempo real",
    description:
      "Todas as métricas são monitoradas em dashboards intuitivos para otimização contínua.",
    imageSrc:
      "https://static.wixstatic.com/media/f9ab6d_5ecfb88c0347429ba79c03ff5f3db35a~mv2.png/v1/crop/x_59,y_688,w_1087,h_1993/fill/w_242,h_444,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hf_20260120_215009_781ae3be-9e69-4fa1-9684-6089788f8174.png",
  },
] as const;

function FlowCard({
  step,
  title,
  description,
  imageSrc,
  index,
}: {
  step: string;
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}): ReactNode {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
      className="group h-full rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3.5 shadow-[0_18px_50px_-34px_rgba(255,122,26,0.16)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-white/16"
    >
      <div className="aspect-[242/230] w-full overflow-hidden rounded-[1.1rem]">
        <TiltedCard
          imageSrc={imageSrc}
          altText={title}
          captionText={title}
          containerHeight="220px"
          containerWidth="100%"
          imageHeight="220px"
          imageWidth="100%"
          rotateAmplitude={10}
          scaleOnHover={1.03}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>

      <div className="mt-3.5 flex items-start gap-2.5">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FF7A1A]/25 bg-[#FF7A1A]/10 text-[0.62rem] font-semibold tracking-[0.18em] text-[#FF7A1A]">
          {step}
        </div>

        <div className="min-w-0">
          <h3 className="text-[0.92rem] leading-snug font-semibold text-white sm:text-[0.98rem]">
            {title}
          </h3>
          <p className="mt-1.5 text-[0.78rem] leading-relaxed text-white/68 sm:text-[0.82rem]">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function KashbackHowItWorksSection(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/bg_liberdade.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-45 mix-blend-screen"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1480px]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.22em] text-[#FF7A1A] uppercase">
            Como funciona
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Como o{" "}
            <span className="text-[#FF7A1A]" style={KASHBACK_TITLE_STYLE}>
              Kashback
            </span>{" "}
            funciona
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
            Um fluxo inteligente que transforma cada transação em uma
            oportunidade de relacionamento.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {FLOW_CARDS.map((card, index) => (
            <FlowCard
              key={card.step}
              step={card.step}
              title={card.title}
              description={card.description}
              imageSrc={card.imageSrc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
