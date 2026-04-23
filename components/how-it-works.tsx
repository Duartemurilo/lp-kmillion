"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AlertTriangle, ArrowRight, Settings, PauseCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const steps = [
  {
    icon: AlertTriangle,
    title: "IMS",
    description:
      "Transforme influenciadores em um canal de vendas mensurável, com campanhas rastreáveis e dados em tempo real.",
  },
  {
    icon: Settings,
    title: "Kashback",
    description:
      "Estimule a recompra com cashback automatizado, com regras flexíveis e dashboards claros para medir o ROI.",
  },
  {
    icon: PauseCircle,
    title: "Motor promocional",
    description:
      "Crie e ative campanhas personalizadas em minutos — sem depender de TI, com total controle por canal, loja e perfil de cliente.",
  },
] as const;

type Step = (typeof steps)[number];

function StepItem({
  step,
  isLast,
}: {
  step: Step;
  isLast: boolean;
}): ReactNode {
  const Icon = step.icon;

  return (
    <div className={`relative flex gap-5 ${isLast ? "" : "pb-24 sm:pb-32"}`}>
      <div
        className="bg-accent relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5 text-black" strokeWidth={2} />
      </div>

      <div className="pt-1">
        <h3 className="text-foreground text-xl font-semibold sm:text-2xl">
          {step.title}
        </h3>
        <p className="text-foreground/60 mt-2 max-w-xl text-base leading-relaxed">
          {step.description}
        </p>

        <Link
          href="/ims"
          className="group text-accent mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#e85b2d]"
        >
          <span className="relative inline-flex">
            <span>Saiba mais</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function HowItWorks(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.3", "end 0.7"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-background relative w-full">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-48 lg:h-fit lg:self-start">
          <h2 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            O que é a
          </h2>
          <div className="mt-6 max-w-xs">
            <Image
              src="/LOGO%20OFICIAL/PNG_VERS%C3%95ES%20LOGO%20HORIZONTAL/KMILLION%20LARANJA_VERTICAL.png"
              alt="KMILLION Laranja Vertical"
              width={420}
              height={420}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
          <p className="text-foreground/60 mt-6 max-w-md text-lg leading-relaxed">
            A Kmillion é uma plataforma SaaS de inteligência promocional que
            permite a times de marketing e planejamento criarem e gerenciarem
            campanhas de forma autônoma, com integração omnichannel e sem
            depender de TI
          </p>
        </div>

        <div className="relative">
          <div
            className="bg-foreground/10 absolute top-6 left-6 h-[calc(100%-6rem)] w-0.5 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              style={{ height: lineHeight, willChange: "height" }}
              className="bg-accent w-full"
            />
          </div>

          <ol className="relative m-0 list-none p-0">
            {steps.map((step, index) => (
              <li key={step.title}>
                <StepItem step={step} isLast={index === steps.length - 1} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
