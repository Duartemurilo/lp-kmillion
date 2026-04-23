"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";

const testimonials = [
  {
    quote:
      "Com os motores promocionais da Kmillion, ganhamos liberdade criativa e agilidade real. A equipe consegue testar mecânicas diferentes por canal — loja, e-commerce, app — sem depender do time de TI. Isso mudou completamente nossa dinâmica interna e aumentou a conversão no PDV.",
    name: "Gerente de Marketing",
    title: "Marca de Moda Premium | Lacoste",
    avatar:
      "https://static.wixstatic.com/media/f9ab6d_424025ea4edf4f1fac850b7ba412a812~mv2.avif/v1/fill/w_140,h_70,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.avif",
    color: "#fe6634",
    company: "Lacoste",
  },
  {
    quote:
      "A inteligência promocional da Kmillion trouxe clareza total pra nossa estratégia comercial. Agora conseguimos enxergar o que realmente performa em cada loja, por tipo de cliente. É um novo nível de decisão baseada em dados, e isso refletiu direto no giro de estoque e nas metas batidas.",
    name: "Diretor Comercial",
    title: "Rede de Cosméticos Nacional | Osklen",
    avatar:
      "https://static.wixstatic.com/media/f9ab6d_316a4a55454d4085a9a62d0f4393925e~mv2.avif/v1/fill/w_133,h_66,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.avif",
    color: "#ff8d18",
    company: "Osklen",
  },
  {
    quote:
      "A gestão de benefícios por CPF foi a solução que precisávamos. Antes era um caos controlar o quanto cada colaborador podia comprar com desconto. Com a Kmillion, temos limite por canal, por período e sem risco de abuso. O RH agradece!",
    name: "Coordenadora de RH",
    title: "Grupo de Lojas de Moda | Farmácia",
    avatar:
      "https://static.wixstatic.com/media/f9ab6d_bc559861e0fa4d349e4fa6e79460136e~mv2.avif/v1/fill/w_147,h_73,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.avif",
    color: "#ff3131",
    company: "Farmácia",
  },
];

const companies = [
  { name: "Lacoste" },
  { name: "Osklen" },
  { name: "Farmácia" },
];

export function Testimonials(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-frame border-accent/15 w-full border-t border-b px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 text-4xl leading-tight font-medium text-neutral-900 sm:text-5xl lg:mb-20 lg:text-6xl dark:text-neutral-50"
        >
          Gerando resultados e fazendo promoções com propósito
        </motion.h2>

        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-12">
          <div
            className="flex items-center justify-start gap-4 lg:gap-6"
            role="tablist"
            aria-label="Testimonials"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: activeIndex === index ? 1.1 : 0.9,
                  opacity: activeIndex === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
                role="tab"
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                  style={{
                    backgroundColor:
                      activeIndex === index ? testimonial.color : "#111111",
                  }}
                >
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.company} logo`}
                    width={64}
                    height={64}
                    className="h-8 w-8 object-contain sm:h-12 sm:w-12 lg:h-16 lg:w-16"
                  />
                </div>

                {activeIndex === index && (
                  <svg
                    className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={testimonial.color}
                      strokeWidth="1.5"
                      opacity="0.2"
                    />
                    <motion.circle
                      key={`progress-${activeIndex}`}
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={testimonial.color}
                      strokeWidth="1.5"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 10, ease: "linear" }}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          <div
            className="flex flex-col justify-center"
            role="tabpanel"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {testimonials[activeIndex] && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="mb-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </blockquote>
                  <div className="text-base font-medium text-neutral-900 sm:text-lg dark:text-neutral-100">
                    {testimonials[activeIndex].name},{" "}
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {testimonials[activeIndex].title}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
          {companies.map((company, index) => {
            const isActive =
              testimonials[activeIndex]?.company === company.name;
            return (
              <motion.div
                key={company.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                animate={{ scale: isActive ? 1.04 : 1 }}
                className="flex items-center"
              >
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 sm:px-5 sm:py-2.5 ${
                    isActive
                      ? "border-[#FE6634] bg-[#FE6634] text-white"
                      : "border-[#FE6634]/35 bg-white text-[#FE6634] hover:border-[#FE6634] hover:bg-[#FFF2EC]"
                  }`}
                >
                  {company.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
