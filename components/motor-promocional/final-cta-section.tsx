"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function FinalCtaSection(): ReactNode {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-white/8" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-[clamp(2.35rem,4.8vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.07em] text-white"
        >
          <span className="block">Promoção não é sobre desconto.</span>
          <span className="block">
            É sobre{" "}
            <span className="text-[#FE6634] font-semibold tracking-[-0.04em]">
              controle.
            </span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center font-sans"
          >
            <span className="bg-accent relative z-10 rounded-xl px-6 py-3 font-medium text-white">
              Converse com nosso time
            </span>
            <span className="text-accent relative -left-px z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
