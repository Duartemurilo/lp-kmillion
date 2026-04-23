"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { differentialRows, ease } from "@/components/motor-promocional/data";
import type { ReactNode } from "react";

const KMILLION_LOGO_SRC = encodeURI(
  "/LOGO OFICIAL/PNG_VERSÕES LOGO HORIZONTAL/ALTERNATIVO KMILLION_LARANJA.png"
);

export function DifferentialSection(): ReactNode {
  return (
    <section
      id="diferencial"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 text-white sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bg_liberdade.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-45 mix-blend-screen"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute left-[-8%] top-[16%] h-[42rem] w-[42rem] opacity-60"
          viewBox="0 0 800 800"
          fill="none"
        >
          <path
            d="M-60 110C150 10 260 70 380 170C500 270 610 320 860 220"
            stroke="rgba(255,122,26,0.18)"
            strokeWidth="1.2"
          />
          <path
            d="M-120 170C90 70 220 130 340 230C460 330 600 390 900 290"
            stroke="rgba(255,122,26,0.12)"
            strokeWidth="1.1"
          />
          <path
            d="M-170 230C40 130 180 190 300 290C420 390 560 450 940 350"
            stroke="rgba(255,122,26,0.08)"
            strokeWidth="1"
          />
        </svg>
        <svg
          className="absolute bottom-[-10%] right-[-6%] h-[46rem] w-[46rem] opacity-55"
          viewBox="0 0 800 800"
          fill="none"
        >
          <path
            d="M120 720C320 620 430 660 550 760C670 860 760 900 1010 800"
            stroke="rgba(255,122,26,0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M60 650C260 550 380 590 500 690C620 790 720 840 980 740"
            stroke="rgba(255,122,26,0.1)"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-5xl text-center"
        >
          <h2 className="text-[clamp(2.95rem,6vw,6rem)] leading-[0.94] font-semibold tracking-[-0.075em] text-white">
            <span className="block">Não é sobre ter um motor.</span>
            <span className="block">
              É sobre ter{" "}
              <span className="text-[#FF7A1A] font-semibold tracking-[-0.04em]">
                liberdade.
              </span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.06 }}
          className="relative mx-auto mt-14 max-w-[1320px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#111111] shadow-[0_40px_120px_-55px_rgba(0,0,0,0.85)]"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-y-0 left-[34%] w-px bg-white/10" />
            <div className="absolute inset-y-0 left-[66%] w-px bg-white/10" />
            <div className="absolute top-0 right-0 h-full w-[34%] bg-[linear-gradient(180deg,rgba(255,122,26,0.22),rgba(255,122,26,0.04)_20%,rgba(255,122,26,0.04)_78%,rgba(255,122,26,0.16))] opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_14%,rgba(255,122,26,0.18),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
          </div>

          <div className="relative hidden md:block">
            <div className="grid grid-cols-[1.15fr_0.82fr_1fr] border-b border-white/10">
              <div className="px-8 py-6" />
              <div className="flex items-center justify-center px-8 py-6">
                <span className="text-[0.72rem] font-semibold tracking-[0.28em] text-white/60 uppercase">
                  Mercado
                </span>
              </div>
              <div className="border-l border-[#FF7A1A]/28 px-8 py-5">
                <div className="flex items-center justify-center gap-3 rounded-[1.5rem] border border-[#FF7A1A]/40 bg-[linear-gradient(180deg,rgba(255,122,26,0.48),rgba(255,122,26,0.12))] px-5 py-4 shadow-[0_0_0_1px_rgba(255,122,26,0.08),0_0_40px_rgba(255,122,26,0.18)]">
                  <Image
                    src={KMILLION_LOGO_SRC}
                    alt="Kmillion"
                    width={240}
                    height={64}
                    className="h-8 w-auto object-contain sm:h-9"
                    priority
                  />
                </div>
              </div>
            </div>

            {differentialRows.map((row, index) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.15fr_0.82fr_1fr] ${index === differentialRows.length - 1 ? "" : "border-b border-white/10"}`}
                >
                  <div className="flex items-center gap-4 px-8 py-8">
                    <Icon
                      className="h-7 w-7 shrink-0 text-[#FF7A1A] sm:h-8 sm:w-8"
                      strokeWidth={1.85}
                    />
                    <div className="text-[1.02rem] font-semibold leading-snug text-white sm:text-[1.15rem]">
                      {row.label}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-8 py-8 text-white/70">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40">
                      <X className="h-4 w-4" strokeWidth={2.3} />
                    </div>
                    <div className="max-w-[18ch] text-[0.98rem] leading-relaxed text-white/60">
                      {row.market}
                    </div>
                  </div>

                  <div className="border-l border-[#FF7A1A]/28 px-8 py-8">
                    <div className="flex h-full items-center gap-4 rounded-[1.45rem] border border-[#FF7A1A]/24 bg-[linear-gradient(180deg,rgba(255,122,26,0.18),rgba(0,0,0,0.2))] px-5 py-5 shadow-[0_0_0_1px_rgba(255,122,26,0.05),0_0_42px_rgba(255,122,26,0.1)]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF7A1A] text-white shadow-[0_0_0_8px_rgba(255,122,26,0.14)]">
                        <Check className="h-5 w-5" strokeWidth={2.7} />
                      </div>
                      <div className="max-w-[20ch] text-[1rem] font-medium leading-snug text-white sm:text-[1.1rem]">
                        {row.kmillion}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative grid gap-4 md:hidden">
            {differentialRows.map((row) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.label}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F0F0F]"
                >
                  <div className="flex items-center gap-4 border-b border-white/10 px-5 py-5">
                    <Icon
                      className="h-7 w-7 shrink-0 text-[#FF7A1A]"
                      strokeWidth={1.85}
                    />
                    <div className="text-base font-semibold text-white">
                      {row.label}
                    </div>
                  </div>

                  <div className="grid gap-3 p-5">
                    <div className="rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-4">
                      <div className="mb-2 text-[0.68rem] font-semibold tracking-[0.24em] text-white/50 uppercase">
                        Mercado
                      </div>
                      <div className="flex items-start gap-3 text-white/70">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40">
                          <X className="h-4 w-4" strokeWidth={2.3} />
                        </div>
                        <p className="text-sm leading-relaxed">{row.market}</p>
                      </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[#FF7A1A]/30 bg-[linear-gradient(180deg,rgba(255,122,26,0.16),rgba(0,0,0,0.18))] px-4 py-4 shadow-[0_0_0_1px_rgba(255,122,26,0.05),0_0_34px_rgba(255,122,26,0.08)]">
                      <div className="mb-2 flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.24em] text-[#FFB36A] uppercase">
                        <Image
                          src={KMILLION_LOGO_SRC}
                          alt="Kmillion"
                          width={150}
                          height={36}
                          className="h-4 w-auto object-contain"
                        />
                        Kmillion
                      </div>
                      <div className="flex items-start gap-3 text-white">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF7A1A] text-white shadow-[0_0_0_7px_rgba(255,122,26,0.14)]">
                          <Check className="h-4 w-4" strokeWidth={2.7} />
                        </div>
                        <p className="text-sm font-medium leading-relaxed">
                          {row.kmillion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
