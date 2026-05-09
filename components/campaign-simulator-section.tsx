"use client";

import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { CALCULADORA_URL } from "@/lib/calculator-url";

const EASE = [0.23, 1, 0.32, 1] as const;

export function CampaignSimulatorSection(): ReactNode {
  return (
    <section
      id="simulador-campanha"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white sm:py-24"
      aria-labelledby="simulador-campanha-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_20%,rgba(254,102,52,0.12),transparent_55%),radial-gradient(700px_380px_at_90%_60%,rgba(48,2,80,0.18),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center lg:text-left"
        >
          <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
            Motor promocional
          </p>
          <h2
            id="simulador-campanha-heading"
            className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-white"
          >
            <span className="block">Simule sua</span>
            <span className="block">
              <span className="text-[#FE6634] font-semibold tracking-[-0.04em]">
                campanha
              </span>
              .
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70 lg:mx-0">
            Defina regras, explore cenários e veja estimativas em tempo real —
            a mesma lógica do motor Kmillion, numa experiência dedicada.
          </p>
          <Link
            href={CALCULADORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d] lg:mt-10"
          >
            Abrir simulador
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-[1.6rem] border border-white/10 bg-[#111111] p-6 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.45)] sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#300250] text-white"
                aria-hidden
              >
                <Calculator className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  calculadora.com
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                  Simule cashback, desconto progressivo, combo ou cupom e acompanhe
                  o impacto estimado na receita.
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
              {[
                "Parâmetros de negócio e ticket médio",
                "Mecânica e benefício da campanha",
                "Projeção de ROI e receita adicional",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/80 sm:text-[0.9375rem]"
                >
                  <Sparkles
                    className="h-4 w-4 shrink-0 text-[#FE6634]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
