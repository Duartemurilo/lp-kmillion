"use client";

import {
  Banknote,
  type LucideIcon,
  Store,
  Ticket,
  TrendingUp,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";

export type ImsComoFuncionaStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Estratégia influenciador — alinhada ao roteiro da LP. */
export const imsInfluencerComoFuncionaSteps: ImsComoFuncionaStep[] = [
  {
    icon: Ticket,
    title: "Você recebe seu cupom exclusivo",
    description:
      "personalizado pra sua audiência e rastreado pela plataforma",
  },
  {
    icon: Video,
    title: "Você posta do seu jeito",
    description:
      "story, reels, vídeo — o formato é seu, a estratégia também",
  },
  {
    icon: Store,
    title: "Sua audiência compra",
    description:
      "a venda é registrada automaticamente via CPF, sem complicação",
  },
  {
    icon: Banknote,
    title: "Você recebe seu cashback",
    description: "automático, transparente, sem precisar cobrar ninguém",
  },
  {
    icon: TrendingUp,
    title: "Quanto mais você vende, mais você ganha",
    description:
      "ranking, metas e recompensas extras pra quem performa",
  },
];

type ImsComoFuncionaProblemSectionProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  steps: ImsComoFuncionaStep[];
  tone?: "light" | "dark";
  accentColor?: string;
};

/** "Como funciona" com o mesmo padrão visual de `MotorProblemSection` (fundo escuro + timeline com ícones). */
export function ImsComoFuncionaProblemSection({
  id,
  eyebrow,
  title,
  lead,
  steps,
  tone = "light",
  accentColor = "#300250",
}: ImsComoFuncionaProblemSectionProps): ReactNode {
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={`relative w-full ${isDark ? "bg-[#0f0f12] text-white" : "bg-white text-[#18131a]"}`}
    >
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div
            className="absolute top-6 left-6 h-[calc(100%-6rem)] w-0.5 -translate-x-1/2"
            style={{ backgroundColor: `${accentColor}33` }}
            aria-hidden="true"
          />

          <ol className="relative m-0 list-none p-0">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className={`relative flex gap-5 ${
                    index === steps.length - 1 ? "" : "pb-16 sm:pb-20"
                  }`}
                >
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>

                  <div className="pt-1">
                    <h3 className={`text-xl font-semibold sm:text-2xl ${isDark ? "text-white" : "text-[#18131a]"}`}>
                      {step.title}
                    </h3>
                    <p className={`mt-2 max-w-xl text-base leading-relaxed ${isDark ? "text-white/68" : "text-[#5f4d58]"}`}>
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="order-1 text-center lg:order-2 lg:sticky lg:top-48 lg:h-fit lg:self-start lg:text-left">
          <div className="max-w-3xl">
            <span
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: accentColor }}
            >
              {eyebrow}
            </span>
            <h2 className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-[#18131a]"}`}>
              {title}
            </h2>
          </div>
          <p className={`mx-auto mt-6 max-w-md text-lg leading-relaxed lg:mx-0 ${isDark ? "text-white/68" : "text-[#5f4d58]"}`}>
            {lead}
          </p>
        </div>
      </div>
    </section>
  );
}
