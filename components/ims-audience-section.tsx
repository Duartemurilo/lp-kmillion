"use client";

import { motion } from "motion/react";
import {
  BadgeCheck,
  BarChart3,
  Megaphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const audienceCards: {
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    title: "Criadores de conteúdo que querem monetizar de verdade",
    description:
      "Transforme indicação em receita rastreável, recorrente e conectada a cada venda gerada.",
    icon: Users,
    className: "lg:col-span-7",
  },
  {
    title: "Microinfluenciadores com audiência engajada",
    description:
      "Base menor, relação mais próxima e conversão clara quando existe oferta certa.",
    icon: Megaphone,
    className: "lg:col-span-5",
  },
  {
    title: "Quem já indica produtos e não rastreia resultado",
    description:
      "Pare de perder valor em recomendações que geram compra, mas não voltam como dado.",
    icon: BadgeCheck,
    className: "lg:col-span-5",
  },
  {
    title: "Creators que querem parceria com dado, não só com feeling",
    description:
      "Use performance real para provar impacto, ajustar conteúdo e negociar melhor.",
    icon: BarChart3,
    className: "lg:col-span-7",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

type AudienceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

type ImsAudienceSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  cards?: AudienceCard[];
  tone?: "light" | "dark";
  accentColor?: string;
};

const defaultAudienceTitle: ReactNode = (
  <>
    Se você já indica, por que não está{" "}
    <span className="text-[#300250] font-semibold tracking-[-0.04em]">
      ganhando
    </span>{" "}
    por cada venda?
  </>
);

export function ImsAudienceSection({
  id = "para-quem",
  eyebrow = "Para quem é",
  title = defaultAudienceTitle,
  cards = audienceCards,
  tone = "light",
  accentColor = "#300250",
}: ImsAudienceSectionProps = {}): ReactNode {
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-20 sm:py-28 ${isDark ? "bg-[#0f0f12] text-white" : "bg-white text-[#18131a]"}`}
    >
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-[#0f0f12]" : "bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ff_54%,#ffffff_100%)]"
        }`}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="max-w-4xl"
        >
          <span
            className="text-sm font-semibold tracking-[0.22em] uppercase"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </span>
          <h2 className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-[#18131a]"}`}>
            {title}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.62, delay: index * 0.06, ease }}
                className={`${card.className ?? ""} relative min-h-48 overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5 shadow-[0_28px_90px_-62px_rgba(254,102,52,0.38)]"
                    : "border-[#300250]/12 bg-white/58 shadow-[0_28px_90px_-62px_rgba(48,2,80,0.38)]"
                }`}
              >
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-[linear-gradient(135deg,rgba(254,102,52,0.14),rgba(255,255,255,0.04)_42%,rgba(254,102,52,0.08))]"
                      : "bg-[linear-gradient(135deg,rgba(48,2,80,0.12),rgba(255,255,255,0.46)_42%,rgba(48,2,80,0.08))]"
                  }`}
                />
                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      isDark
                        ? "border-[#FE6634]/20 bg-[#FE6634]/10"
                        : "border-[#300250]/15 bg-[#300250]/10"
                    }`}
                    style={{ color: accentColor }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mt-5 max-w-2xl text-xl font-semibold leading-tight sm:text-2xl ${isDark ? "text-white" : "text-[#18131a]"}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? "text-white/68" : "text-[#4c4050]"}`}>
                    {card.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
