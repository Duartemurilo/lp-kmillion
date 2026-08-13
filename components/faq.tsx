"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { HOME_FAQS, type FaqEntry } from "@/data/faqs";

const ease = [0.23, 1, 0.32, 1] as const;

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  const panelId = `faq-answer-${index}`;
  const buttonId = `faq-question-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className="rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-sm sm:p-6"
    >
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <span className="text-base font-medium text-white sm:text-lg">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-white/60" aria-hidden="true" />
        </motion.span>
      </button>

      {/*
        A resposta fica SEMPRE no HTML (SSR) e só o colapso é visual: motores de
        busca e crawlers de IA leem o texto mesmo com o acordeão fechado.
      */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-sm leading-relaxed text-white/70 sm:text-base">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black px-6 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center sm:mb-16"
        >
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Perguntas frequentes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            Tudo o que você precisa saber sobre a Kmillion.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {HOME_FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
