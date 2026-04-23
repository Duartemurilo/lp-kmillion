"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

type ImsContactSectionProps = {
  persona: "brand" | "influencer";
  id?: string;
  tone?: "light" | "dark";
  accentColor?: string;
};

export function ImsContactSection({
  persona,
  id = "converse",
  tone = "light",
  accentColor = "#300250",
}: ImsContactSectionProps): ReactNode {
  const isDark = tone === "dark";
  const title =
    persona === "brand"
      ? "Vamos colocar influenciadores pra vender — com rastreio e controle."
      : "Quer transformar seu conteúdo em resultado rastreável?";
  const description =
    persona === "brand"
      ? "Conte com o IMS para ativar creators com mensuração real, governança e ajustes em tempo real."
      : "Entre para campanhas com cupom exclusivo, rastreio por CPF e pagamento automático por performance.";

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-20 sm:py-28 ${
        isDark ? "bg-[#0f0f12] text-white" : "bg-white text-[#18131a]"
      }`}
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className={`rounded-[2.5rem] border p-8 sm:p-10 lg:p-12 ${
            isDark
              ? "border-white/10 bg-white/5 shadow-[0_26px_70px_-44px_rgba(0,0,0,0.55)]"
              : "border-[#300250]/12 bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ff_56%,#ffffff_100%)] shadow-[0_26px_80px_-60px_rgba(48,2,80,0.32)]"
          }`}
        >
          <div className="max-w-4xl">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-white/55" : "text-[#300250]/70"
              }`}
            >
              Entre em contato
            </p>
            <h2
              className={`mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-[#18131a]"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-5 max-w-3xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-white/72" : "text-[#4c4050]"
              }`}
            >
              {description}
            </p>

            <Link
              href="/motor-promocional#converse"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5"
              style={{ backgroundColor: accentColor }}
            >
              Falar com o time
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

