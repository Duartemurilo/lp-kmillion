"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type BentoCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ImsBrandBentoSectionProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  cards: BentoCard[];
};

export function ImsBrandBentoSection({
  id = "para-quem-marca",
  eyebrow,
  title,
  description,
  cards,
}: ImsBrandBentoSectionProps): ReactNode {
  return (
    <section id={id} className="bg-[#0f0f12] px-6 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl"
        >
          <span className="text-sm font-semibold tracking-[0.22em] text-[#FE6634] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            {description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const span = index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";
            const featured = index === 0;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className={`${span} relative overflow-hidden rounded-[1.75rem] border ${
                  featured
                    ? "border-[#FE6634]/35 bg-[#141418] shadow-[0_28px_80px_-48px_rgba(254,102,52,0.48)]"
                    : "border-white/10 bg-[#111115] shadow-[0_24px_70px_-54px_rgba(0,0,0,0.72)]"
                } p-6`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FE6634]/20 bg-[#FE6634]/10 text-[#FE6634]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 max-w-2xl text-xl font-semibold leading-tight sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
