"use client";

import { SectionTitle } from "@/components/motor-promocional/section-title";
import { motorSteps } from "@/components/motor-promocional/data";
import type { ReactNode } from "react";

export function MotorProblemSection(): ReactNode {
  return (
    <section id="problema" className="relative w-full bg-[#0A0A0A] text-white">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="text-center lg:sticky lg:top-48 lg:h-fit lg:self-start lg:text-left">
          <SectionTitle
            eyebrow="O problema do mercado"
            variant="dark"
            title={
              <>
                <span className="block">A maioria dos motores promocionais</span>
                <span className="block">
                  <span className="text-[#FE6634] font-semibold tracking-[-0.04em]">
                    limitam sua estratégia
                  </span>
                </span>
              </>
            }
          />
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/70 lg:mx-0">
            Você já viveu isso? A promoção precisa passar por TI, o sistema só
            permite regras básicas e o PDV demora para atualizar.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-6 left-6 h-[calc(100%-6rem)] w-0.5 -translate-x-1/2 bg-white/10"
            aria-hidden="true"
          />

          <ol className="relative m-0 list-none p-0">
            {motorSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className={`relative flex gap-5 ${index === motorSteps.length - 1 ? "" : "pb-16 sm:pb-20"}`}
                >
                  <div
                    className="bg-accent relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-black" strokeWidth={2} />
                  </div>

                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-white/68">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
