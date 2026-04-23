"use client";

import ScrollStack, { ScrollStackItem } from "@/components/scroll-stack";
import { motorCards } from "@/components/motor-promocional/data";
import { MotorVideoBlock } from "@/components/motor-promocional/video-block";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type MotorSectionProps = {
  ease: readonly [number, number, number, number];
};

export function MotorSection({ ease }: MotorSectionProps): ReactNode {
  return (
    <section id="motor" className="w-full bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-[clamp(2.4rem,4.8vw,3.8rem)] leading-[1.1] font-semibold tracking-[-0.05em] text-white">
            Um motor que se adapta
          </h2>
          <h3
            className="text-[clamp(3rem,6vw,4.8rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-[#FE6634]"
          >
            à sua estratégia
          </h3>
          <p className="mt-6 text-center text-base leading-relaxed text-white/78 sm:text-lg">
            O Motor Promocional Kmillion é uma plataforma de gestão de
            promoções que permite ao time de marketing criar, configurar e
            ativar campanhas complexas sem depender de TI &mdash; com
            atualização em tempo real e cobertura omnichannel.
          </p>
          <p className="mt-4 text-center text-sm leading-relaxed text-white/65 sm:text-base">
            Não o contrário.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <MotorVideoBlock />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="relative lg:pt-6"
          >
            <ScrollStack
              className="mx-auto w-full max-w-[34rem]"
              itemDistance={52}
              itemScale={0.032}
              itemStackDistance={22}
              stackPosition="24%"
              scaleEndPosition="8%"
              baseScale={0.88}
              rotationAmount={0.35}
              blurAmount={0.35}
            >
              {motorCards.map((card) => (
                <ScrollStackItem key={card.title}>
                  <article className="group relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.05))] p-5 shadow-[0_24px_80px_-46px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,102,52,0.18),transparent_42%)] opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex min-h-[10.5rem] flex-col justify-between gap-5 sm:min-h-[11.5rem]">
                      <div className="space-y-3">
                        <h3 className="max-w-[14ch] text-2xl font-semibold tracking-[-0.05em] text-white sm:text-[2rem]">
                          {card.title}
                        </h3>
                        <p className="max-w-md text-sm leading-relaxed text-white/74 sm:text-[1rem]">
                          {card.body}
                        </p>
                      </div>

                      <div className="flex items-center justify-start gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full bg-[#FE6634] shadow-[0_0_0_6px_rgba(254,102,52,0.14)]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </article>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
