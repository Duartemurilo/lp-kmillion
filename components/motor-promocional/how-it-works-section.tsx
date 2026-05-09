"use client";

import {
  BarChart3,
  Globe,
  Layers3,
  RefreshCcw,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, type Transition } from "motion/react";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

type CampaignType = "cashback" | "progressive" | "combo" | "coupon";

const EASE = [0.23, 1, 0.32, 1] as const;

const CAMPAIGNS: Array<{
  key: CampaignType;
  label: string;
  icon: LucideIcon;
}> = [
  { key: "cashback", label: "Cashback", icon: Wallet },
  { key: "progressive", label: "Desconto progressivo", icon: TrendingUp },
  { key: "combo", label: "Combo", icon: ShoppingBag },
  { key: "coupon", label: "Cupom", icon: Tag },
];

const cardTransition = (delay = 0): Transition => ({
  duration: 0.65,
  ease: EASE,
  delay,
});

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  helper,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  formatValue: (next: number) => string;
  helper?: string;
}): ReactNode {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-sm font-semibold text-white">{label}</label>
        <span className="text-primary text-base font-semibold tabular-nums">
          {formatValue(value)}
        </span>
      </div>

      <input
        className="km-range"
        style={{ "--range-progress": `${percent}%` } as CSSProperties}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />

      {helper ? (
        <p className="mt-2 text-xs leading-relaxed text-white/62">{helper}</p>
      ) : null}
    </div>
  );
}

function StageShell({
  step,
  title,
  icon: Icon,
  children,
}: {
  step: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={cardTransition()}
      className="rounded-[2rem] border border-white/10 bg-[#111111] p-5 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.45)] sm:p-6"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Icon
            className="text-primary h-8 w-8 shrink-0 self-center"
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#FE6634] uppercase">
              {step}
            </p>
            <h3 className="text-lg leading-tight font-semibold text-white sm:text-[1.15rem]">
              {title}
            </h3>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function Chip({
  label,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
        selected
          ? "border-transparent bg-[#FE6634] text-white shadow-[0_10px_30px_-16px_rgba(254,102,52,0.5)]"
          : "border-white/10 bg-white/5 text-white/70 hover:border-[#FE6634]/40 hover:text-white"
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
  featured = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  featured?: boolean;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={cardTransition(0.05)}
      className={`rounded-[1.35rem] border p-5 ${
        featured
          ? "border-transparent bg-[#FE6634] text-white shadow-[0_20px_50px_-30px_rgba(254,102,52,0.45)]"
          : "border-white/10 bg-[#111111] text-white"
      }`}
    >
      <Icon
        className={`mb-3 h-7 w-7 shrink-0 ${
          featured ? "text-white" : "text-primary"
        }`}
        strokeWidth={1.85}
        aria-hidden
      />

      <p
        className={`text-xs font-medium ${featured ? "text-white/72" : "text-white/60"}`}
      >
        {label}
      </p>

      <p
        className={`mt-1 text-[1.7rem] leading-tight font-semibold tabular-nums ${
          featured ? "text-white" : "text-primary"
        }`}
      >
        {value}
      </p>

      <p
        className={`mt-2 text-xs ${featured ? "text-white/62" : "text-white/58"}`}
      >
        {note}
      </p>
    </motion.div>
  );
}

export function HowItWorksSection(): ReactNode {
  const [customers, setCustomers] = useState(4200);
  const [ticket, setTicket] = useState(250);
  const [purchases, setPurchases] = useState(1.2);
  const [campaignType, setCampaignType] = useState<CampaignType>("cashback");
  const [benefit, setBenefit] = useState(10);
  const [repurchase, setRepurchase] = useState(20);
  const [ticketIncrease, setTicketIncrease] = useState(15);
  const [returningPct, setReturningPct] = useState(30);
  const [frequency, setFrequency] = useState(1.5);

  const results = useMemo(() => {
    const newTicket = ticket * (1 + ticketIncrease / 100);
    const returningCustomers = customers * (returningPct / 100);
    const additionalRevenue =
      returningCustomers * newTicket * Math.max(frequency - purchases, 0);
    const investment =
      returningCustomers * newTicket * frequency * (benefit / 100);
    const netGain = additionalRevenue - investment;
    const roi = investment > 0 ? (netGain / investment) * 100 : 0;
    const annualProjection = netGain * 12;

    return {
      newTicket,
      returningCustomers,
      additionalRevenue,
      investment,
      roi,
      annualProjection,
    };
  }, [
    customers,
    ticket,
    purchases,
    benefit,
    ticketIncrease,
    returningPct,
    frequency,
  ]);

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 text-white sm:py-28"
    >
      <div className="relative mx-auto max-w-[1480px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={cardTransition()}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.02] font-semibold tracking-[-0.06em] text-white">
            <span className="block">Você define a lógica.</span>
            <span className="block">
              O motor executa em{" "}
              <span className="whitespace-nowrap text-[#FE6634] font-semibold tracking-[-0.04em] sm:whitespace-normal">
                tempo real
              </span>
            </span>{" "}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <StageShell step="Etapa 1" title="Contexto do negócio" icon={Users}>
            <div className="space-y-4">
              <RangeField
                label="Clientes ativos"
                value={customers}
                min={100}
                max={50000}
                step={100}
                onChange={setCustomers}
                formatValue={(next) => formatNumber(next)}
              />
              <RangeField
                label="Ticket médio atual"
                value={ticket}
                min={30}
                max={3000}
                step={10}
                onChange={setTicket}
                formatValue={(next) => formatCurrency(next)}
              />
              <RangeField
                label="Compras por mês (média)"
                value={purchases}
                min={0.5}
                max={6}
                step={0.1}
                onChange={setPurchases}
                formatValue={(next) => `${formatNumber(next, 1)}x / mês`}
              />
            </div>
          </StageShell>

          <StageShell step="Etapa 2" title="Mecânica da campanha" icon={Tag}>
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-white">
                  Tipo de campanha
                </p>
                <div className="flex flex-wrap gap-2">
                  {CAMPAIGNS.map((campaign) => {
                    const selected = campaignType === campaign.key;

                    return (
                      <Chip
                        key={campaign.key}
                        label={campaign.label}
                        icon={campaign.icon}
                        selected={selected}
                        onClick={() => setCampaignType(campaign.key)}
                      />
                    );
                  })}
                </div>
              </div>

              <RangeField
                label="Percentual de benefício"
                value={benefit}
                min={1}
                max={40}
                step={1}
                onChange={setBenefit}
                formatValue={(next) => `${formatNumber(next)}%`}
              />

              <RangeField
                label="Taxa estimada de recompra"
                value={repurchase}
                min={2}
                max={60}
                step={1}
                onChange={setRepurchase}
                formatValue={(next) => `${formatNumber(next)}%`}
              />
            </div>
          </StageShell>

          <StageShell
            step="Etapa 3"
            title="Impacto no comportamento"
            icon={TrendingUp}
          >
            <div className="space-y-4">
              <RangeField
                label="Aumento esperado no ticket médio"
                value={ticketIncrease}
                min={0}
                max={60}
                step={1}
                onChange={setTicketIncrease}
                formatValue={(next) => `+${formatNumber(next)}%`}
              />
              <RangeField
                label="Percentual de clientes que retornam"
                value={returningPct}
                min={2}
                max={80}
                step={1}
                onChange={setReturningPct}
                formatValue={(next) => `${formatNumber(next)}%`}
              />
              <RangeField
                label="Frequência de compra após campanha"
                value={frequency}
                min={0.5}
                max={8}
                step={0.1}
                onChange={setFrequency}
                formatValue={(next) => `${formatNumber(next, 1)}x / mês`}
              />
            </div>
          </StageShell>
        </div>

        <div className="mt-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={cardTransition(0.05)}
            className="w-full"
          >
            <h3 className="text-left text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.02] font-semibold tracking-[-0.05em] text-white">
              Quanto dinheiro uma campanha{" "}
              <span className="text-[#FE6634] font-semibold tracking-[-0.04em]">
                gera para você?
              </span>
            </h3>

            <div className="mt-8 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] lg:items-stretch lg:gap-8">
              <div className="min-w-0 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  icon={Zap}
                  label="Receita adicional / mês"
                  value={formatCurrency(results.additionalRevenue)}
                  note="Estimativa mensal"
                  featured
                />
                <MetricCard
                  icon={TrendingUp}
                  label="Novo ticket médio"
                  value={formatCurrency(results.newTicket)}
                  note={`era ${formatCurrency(ticket)}`}
                />
                <MetricCard
                  icon={RefreshCcw}
                  label="Clientes que retornam"
                  value={formatNumber(results.returningCustomers)}
                  note={`de ${formatNumber(customers)} ativos`}
                />
                <MetricCard
                  icon={Layers3}
                  label="Investimento promocional"
                  value={formatCurrency(results.investment)}
                  note="benefício concedido / mês"
                />
                <MetricCard
                  icon={Globe}
                  label="Retorno líquido (ROI)"
                  value={`${formatNumber(results.roi)}%`}
                  note="retorno sobre o investimento"
                />
                <MetricCard
                  icon={BarChart3}
                  label="Projeção anual"
                  value={formatCurrency(results.annualProjection)}
                  note="resultado acumulado em 12 meses"
                />
              </div>

              <div className="flex h-full min-h-44 w-full min-w-0 flex-col justify-center self-stretch rounded-[1.6rem] border border-white/10 bg-[#111111] p-6 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.35)]">
                <p className="text-sm font-semibold text-white">
                  O que isso significa na prática
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  Com uma campanha de cashback, {formatNumber(benefit)}% de
                  benefício e {formatNumber(repurchase)}% de recompra estimada,
                  você pode aumentar a receita mensal em aproximadamente{" "}
                  {formatCurrency(results.additionalRevenue)}.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .km-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 999px;
          outline: none;
          background: linear-gradient(
            to right,
            #300250 0%,
            #300250 var(--range-progress),
            rgba(255, 255, 255, 0.12) var(--range-progress),
            rgba(255, 255, 255, 0.12) 100%
          );
        }

        .km-range::-webkit-slider-runnable-track {
          height: 10px;
          border-radius: 999px;
          background: transparent;
        }

        .km-range::-moz-range-track {
          height: 10px;
          border-radius: 999px;
          background: transparent;
        }

        .km-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          margin-top: -6px;
          border-radius: 999px;
          border: 3px solid #0a0a0a;
          background: #300250;
          box-shadow: 0 8px 24px rgba(48, 2, 80, 0.35);
          cursor: pointer;
        }

        .km-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 3px solid #0a0a0a;
          background: #300250;
          box-shadow: 0 8px 24px rgba(48, 2, 80, 0.35);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
