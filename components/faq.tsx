"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

const faqs = [
  {
    question: "O que difere a Kmillion de outras plataformas?",
    answer:
      "A Kmillion foi criada exclusivamente para o varejo físico. É a única plataforma que une autonomia para o marketing com personalização e integração entre canais físicos e digitais, sem depender do TI.",
  },
  {
    question: "Posso personalizar os nomes das ações (ex: cashback)?",
    answer:
      'Sim! Você pode nomear ações como quiser, criando experiências únicas - por exemplo: "Cashback Kmillion", "PremiaFashion" ou "Volta+".',
  },
  {
    question: "Preciso integrar com o ERP?",
    answer:
      "Não é obrigatório, mas integrar com o ERP permite um controle mais completo de regras, saldos e resultados. A Kmillion se conecta via API com os principais ERPs do mercado.",
  },
  {
    question: "A Kmillion serve para redes pequenas?",
    answer:
      "A Kmillion é ideal para redes com mais de 20 lojas, especialmente no varejo de moda. Para redes pequenas, o ganho com automação pode ser limitado - mas analisamos caso a caso.",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      onClick={onToggle}
      className="cursor-pointer rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-sm sm:p-6"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isOpen}
    >
      <div className="flex w-full items-center justify-between gap-4 text-left">
        <span className="text-base font-medium text-white sm:text-lg">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-white/60" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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

        <div className="flex flex-col gap-3" role="list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
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
