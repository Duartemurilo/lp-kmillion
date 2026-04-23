"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import type { ReactNode } from "react";

type ClosingSectionProps = {
  ease: readonly [number, number, number, number];
};

export function ClosingSection({ ease }: ClosingSectionProps): ReactNode {
  return (
    <section id="converse" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="border-border rounded-[2.5rem] border bg-[linear-gradient(180deg,#18131a_0%,#2a2026_100%)] p-8 text-white sm:p-10 lg:p-12"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-white/55 uppercase">
              Encerramento estratégico
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Promoção não é sobre desconto. É sobre controle.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/78 sm:text-lg">
              Quando você controla regra, margem, canal e comportamento em tempo
              real, a promoção deixa de ser improviso e vira estratégia.
            </p>

            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d]"
            >
              Converse com nosso time
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
