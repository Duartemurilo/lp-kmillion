"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { pricingConfig } from "@/lib/config";

const comparisons = [
  { label: "Limite de promoções concorrentes", market: "Limitado", kmillion: "Promoções ilimitadas" },
  { label: "Atualização", market: "Por carga", kmillion: "Real-time" },
  { label: "Regras", market: "Simples", kmillion: "Altamente customizáveis" },
  { label: "Dependência de TI", market: "Alta", kmillion: "Autonomia do marketing" },
  { label: "Benefícios", market: "Isolados", kmillion: "Ecossistema de benefícios" },
];

function ComparisonRow({
  label,
  market,
  kmillion,
  index,
}: {
  label: string;
  market: string;
  kmillion: string;
  index: number;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }}
      className="grid gap-4 rounded-2xl border border-border bg-frame p-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:items-center sm:p-5"
    >
      <div>
        <div className="text-sm font-medium text-muted-foreground">Comparativo</div>
        <div className="mt-1 text-base font-semibold text-foreground">{label}</div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-foreground/80">
        <X className="h-4 w-4 shrink-0 text-muted-foreground" />
        {market}
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-foreground">
        <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
        {kmillion}
      </div>
    </motion.div>
  );
}

export function Pricing(): ReactNode {
  return (
    <section id="pricing" className="w-full bg-background px-6 py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Diferencial Técnico Real
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Não é sobre ter um motor. É sobre ter liberdade.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {pricingConfig.description}
          </p>
        </motion.div>

        <div className="mb-4 hidden grid-cols-[1.3fr_1fr_1fr] gap-4 px-5 text-sm font-medium text-muted-foreground sm:grid">
          <div>Critério</div>
          <div>Mercado</div>
          <div>Kmillion</div>
        </div>

        <div className="space-y-4">
          {comparisons.map((item, index) => (
            <ComparisonRow
              key={item.label}
              label={item.label}
              market={item.market}
              kmillion={item.kmillion}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
