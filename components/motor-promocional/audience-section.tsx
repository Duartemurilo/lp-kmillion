"use client";

import {
  Building2,
  Megaphone,
  Repeat2,
  ShieldCheck,
  Store,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

type AudienceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Card em destaque (laranja) — contraste reforçado. */
  highlight?: boolean;
};

const LEFT_ITEMS: AudienceItem[] = [
  {
    icon: Store,
    title: "Redes de varejo físico",
    description:
      "Operações com alta frequência promocional e necessidade de padronização.",
  },
  {
    icon: Workflow,
    title: "Operações omnichannel",
    description:
      "Campanhas que precisam conversar entre loja, app e e-commerce.",
  },
  {
    icon: Repeat2,
    title: "Franquias",
    description:
      "Regras controladas com execução consistente em cada unidade.",
  },
];

const RIGHT_TOP_ITEMS: AudienceItem[] = [
  {
    icon: Building2,
    title: "Marcas com múltiplas lojas",
    description:
      "Governança central com operação distribuída e margem protegida.",
  },
  {
    icon: ShieldCheck,
    title: "Empresas com programas de fidelização",
    description:
      "Benefícios com lógica clara, recorrência mensurável e menos ruído.",
  },
];

const BOTTOM_ITEMS: AudienceItem[] = [
  {
    icon: Truck,
    title: "Operações com revendedores",
    description:
      "Canais indiretos com regras específicas, rastreáveis e seguras.",
    highlight: true,
  },
  {
    icon: Megaphone,
    title: "Marketing que quer autonomia",
    description: "Times que precisam publicar sem depender do TI.",
  },
];

const cardTransition = (delay = 0): Transition => ({
  duration: 0.8,
  ease: EASE,
  delay,
});

function AudienceMiniRow({
  icon: Icon,
  title,
  description,
}: AudienceItem): ReactNode {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white">
        <Icon className="h-6 w-6 text-[#FE6634]" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold tracking-[-0.03em] text-neutral-900">
          {title}
        </div>
        <p className="text-xs leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function LeftAudienceCard(): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={cardTransition(0)}
      className="group relative flex min-h-140 flex-col overflow-hidden rounded-4xl border border-neutral-200 bg-white p-8 pb-0 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:row-span-2"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FE6634,#FF8D18,#FF3131)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,102,52,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,141,24,0.08),transparent_28%)]" />

      <div className="relative z-10 mb-6 text-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <h3 className="text-2xl leading-tight font-semibold md:text-4xl">
          <span className="text-neutral-900">Feito para redes que não aceitam</span>
          <br />
          <span className="text-accent">limitações.</span>
        </h3>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
          Ideal para operações que precisam ganhar velocidade sem abrir mão de
          controle, margem e governança.
        </p>
      </div>

      <div className="relative flex flex-1 items-end justify-center">
        <div className="grid w-full gap-3 pb-8">
          {LEFT_ITEMS.map((item) => (
            <AudienceMiniRow key={item.title} {...item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RightTopAudienceCard(): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={cardTransition(0.1)}
      className="group relative flex min-h-80 flex-col overflow-hidden rounded-4xl border border-neutral-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:block"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#FE6634,#FF8D18)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,141,24,0.1),transparent_30%)]" />

      <div className="relative z-10 max-w-60 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <span className="inline-flex rounded-full bg-[#FFF2EC] px-3 py-1 text-xs font-semibold text-accent">
          Ideal para
        </span>

        <h3 className="mt-4 text-xl leading-tight font-semibold text-neutral-900 md:text-2xl">
          Marcas com múltiplas lojas
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Governança central com operação distribuída e margem protegida.
        </p>
      </div>

      <div className="mt-8 grid gap-3">
        {RIGHT_TOP_ITEMS.map((item) => (
          <AudienceMiniRow key={item.title} {...item} />
        ))}
      </div>
    </motion.div>
  );
}

function BottomAudienceCard({ item, delay }: { item: AudienceItem; delay: number }): ReactNode {
  const Icon = item.icon;
  const accent = item.highlight === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={cardTransition(delay)}
      className={
        accent
          ? "group relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-4xl border border-white/20 bg-[linear-gradient(160deg,#FE6634_0%,#D94E20_100%)] p-6 text-center shadow-[0_32px_90px_-48px_rgba(254,102,52,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] md:p-8"
          : "group flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6 text-center shadow-[0_30px_80px_-50px_rgba(17,17,17,0.18)] md:p-8"
      }
    >
      {accent ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0.1))]"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative transition-transform duration-500 ease-out group-hover:scale-105">
        <div
          className={
            accent
              ? "mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
              : "mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-[#FFF2EC] shadow-sm"
          }
        >
          <Icon
            className={accent ? "h-12 w-12 text-white" : "h-12 w-12 text-[#FE6634]"}
            strokeWidth={1.8}
          />
        </div>

        <h3
          className={
            accent
              ? "text-2xl leading-tight font-semibold text-white md:text-3xl"
              : "text-2xl leading-tight font-semibold text-neutral-900 md:text-3xl"
          }
        >
          {item.title}
        </h3>

        <p
          className={
            accent
              ? "mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/88"
              : "mx-auto mt-4 max-w-xs text-sm leading-relaxed text-neutral-600"
          }
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function AudienceSection(): ReactNode {
  return (
    <section className="w-full bg-black px-6 pb-32 pt-24 text-white sm:pb-36 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
            Para quem é
          </span>

          <h2 className="mt-4 text-[clamp(2.7rem,5.5vw,5.1rem)] leading-[0.98] font-semibold tracking-[-0.07em] text-white">
            Feito para redes que não aceitam{" "}
            <span className="text-[#FF7A1A] font-semibold tracking-[-0.04em]">
              limitações.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            Ideal para operações que precisam ganhar velocidade sem abrir mão
            de controle, margem e governança.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.5fr]">
          <LeftAudienceCard />
          <RightTopAudienceCard />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BOTTOM_ITEMS.map((item, index) => (
              <BottomAudienceCard
                key={item.title}
                item={item}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
