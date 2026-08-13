"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { IMS_INFLUENCER_FAQS, type FaqEntry } from "@/data/faqs";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const faqs = IMS_INFLUENCER_FAQS;

const ease = [0.23, 1, 0.32, 1] as const;

function FaqItem({
  faq,
  index,
  idPrefix,
  isOpen,
  onToggle,
  tone,
  accentColor,
}: {
  faq: FaqEntry;
  index: number;
  idPrefix: string;
  isOpen: boolean;
  onToggle: () => void;
  tone: "light" | "dark";
  accentColor: string;
}): ReactNode {
  const isDark = tone === "dark";
  const panelId = `${idPrefix}-answer-${index}`;
  const buttonId = `${idPrefix}-question-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className={`w-full rounded-[1.5rem] border p-5 text-left shadow-[0_20px_70px_-55px_rgba(48,2,80,0.3)] backdrop-blur-xl transition-colors sm:p-6 ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-[#300250]/12 bg-white/72 hover:bg-[#faf7ff]"
      }`}
    >
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
      >
        <span className={`text-base font-semibold sm:text-lg ${isDark ? "text-white" : "text-[#18131a]"}`}>
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="mt-0.5 shrink-0"
        >
          <ChevronDown
            className="h-5 w-5"
            style={{ color: accentColor }}
            aria-hidden="true"
          />
        </motion.span>
      </button>

      {/*
        Resposta sempre presente no HTML servido: o acordeão só colapsa
        visualmente, então crawlers de IA leem o conteúdo sem executar JS.
      */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease }}
        className="overflow-hidden"
      >
        <p
          className={`pt-4 text-sm leading-relaxed sm:text-base ${isDark ? "text-white/68" : "text-[#4c4050]"}`}
        >
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

type ImsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  faqs?: readonly FaqEntry[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tone?: "light" | "dark";
  accentColor?: string;
};

export function ImsFaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title = "Suas dúvidas, respondidas.",
  faqs: faqItems = faqs,
  primaryCta = { label: "Quero fazer parte do IMS", href: WHATSAPP_CONTACT_URL },
  secondaryCta = { label: "Falar com a Kmillion", href: WHATSAPP_CONTACT_URL },
  tone = "light",
  accentColor = "#300250",
}: ImsFaqSectionProps = {}): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 py-20 sm:py-28 ${isDark ? "bg-[#0f0f12] text-white" : "bg-white text-[#18131a]"}`}
    >
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-[#0f0f12]" : "bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ff_48%,#ffffff_100%)]"
        }`}
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 text-center sm:mb-12"
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

        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              idPrefix={id}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              tone={tone}
              accentColor={accentColor}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
          className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href={primaryCta.href}
            target={primaryCta.href === WHATSAPP_CONTACT_URL ? "_blank" : undefined}
            rel={primaryCta.href === WHATSAPP_CONTACT_URL ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5"
            style={{ backgroundColor: accentColor }}
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            target={secondaryCta.href === WHATSAPP_CONTACT_URL ? "_blank" : undefined}
            rel={secondaryCta.href === WHATSAPP_CONTACT_URL ? "noopener noreferrer" : undefined}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
              isDark
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-[#300250]/18 bg-white hover:bg-[#f8f1ff]"
            }`}
            style={!isDark ? { color: accentColor } : undefined}
          >
            {secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
