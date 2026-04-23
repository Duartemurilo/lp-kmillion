"use client";

import {
  ArrowRight,
  BarChart3,
  Coins,
  Layers3,
  RefreshCcw,
  Target,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

const KASHBACK_HERO_TEXT = "A MAIORIA DOS CASHBACKS SÓ DEVOLVE DINHEIRO";
const KASHBACK_LOGO_SRC = encodeURI(
  "/LOGO OFICIAL/KASHBACK/kashback_horizontal.svg"
);
const KASHBACK_IMAGE_SRC = "/kashback.avif";

const KASHBACK_COPY =
  "O Kashback Kmillion é mais do que devolver parte do valor ao cliente - é uma estratégia inteligente de recompra. Ele conecta dados, canais e comportamento de consumo para ativar o cliente no momento certo, no lugar certo.";

const KASHBACK_COPY_2 =
  "Diferente do cashback tradicional, o Kashback Kmillion é pilotado com inteligência, permitindo segmentar, mensurar e impulsionar novas vendas com base em dados reais - tudo em tempo real.";

type FeatureCardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  wide?: boolean | undefined;
};

const featureCards: FeatureCardItem[] = [
  {
    icon: RefreshCcw,
    title: "Recompra inteligente",
    description:
      "Transforme cashback em fluxo de retorno contínuo com incentivo pensado para próxima compra.",
  },
  {
    icon: Target,
    title: "Segmentação",
    description:
      "Ative campanhas por perfil, comportamento e contexto para aumentar relevância e conversão.",
  },
  {
    icon: Coins,
    title: "Valor em tempo real",
    description:
      "Calcule, publique e valide benefícios com velocidade operacional e resposta imediata.",
  },
  {
    icon: BarChart3,
    title: "Mensurar resultados",
    description:
      "Leia claramente o que está ativo, o que converte e o que gera recorrência de compra.",
  },
  {
    icon: Layers3,
    title: "Omnichannel",
    description:
      "Conecte dados, canais e estratégia para operar cashback com visão integrada da jornada.",
    wide: true,
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  wide = false,
}: FeatureCardItem): ReactNode {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#080808] transition-all duration-300 hover:border-[#FF7A1A]/35 hover:shadow-[0_28px_70px_-42px_rgba(255,122,26,0.38)] ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,26,0.08),transparent_38%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full gap-4 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#FF7A1A]/35 bg-[linear-gradient(180deg,rgba(255,122,26,0.12),rgba(255,122,26,0.03))] shadow-[0_0_0_1px_rgba(255,122,26,0.06),0_18px_34px_-24px_rgba(255,122,26,0.7)]">
          <Icon className="h-5 w-5 text-[#FF7A1A]" />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-lg font-semibold tracking-[-0.04em] text-white sm:text-[1.38rem]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/70 sm:text-[1rem]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function KashbackCard(): ReactNode {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_120px_-52px_rgba(255,122,26,0.4)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(255,122,26,0.1),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(255,122,26,0.08),transparent_24%)]" />

      <div className="relative grid min-h-[38rem] gap-8 p-4 sm:p-5 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:p-6">
        <div className="relative overflow-hidden rounded-[1.9rem] border border-[#FF7A1A]/22 bg-[#0B0B0B] shadow-[0_0_0_1px_rgba(255,122,26,0.06),0_0_48px_rgba(255,122,26,0.16)]">
          <div className="absolute inset-0 rounded-[1.9rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />
          <div className="relative h-full min-h-[26rem] w-full overflow-hidden rounded-[1.9rem] bg-[#EFEDE8]">
            <Image
              src={KASHBACK_IMAGE_SRC}
              alt="Kashback Kmillion"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-8%,rgba(20,36,74,0.18),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0)_72%,rgba(0,0,0,0.08)_100%)]" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-6 px-1 py-2 sm:px-2 lg:py-4">
          <div className="space-y-4">
            <div className="space-y-4">
              <span className="inline-flex items-center text-[0.8rem] font-semibold tracking-[0.24em] text-[#FF7A1A] uppercase">
                Funcionalidades
              </span>

              <div className="space-y-4">
                <Image
                  src={KASHBACK_LOGO_SRC}
                  alt="Kashback Kmillion"
                  width={420}
                  height={80}
                  className="h-8 w-auto object-contain sm:h-10"
                />

                <h3 className="max-w-[14ch] text-[clamp(2.3rem,4.2vw,4.6rem)] leading-[0.95] font-semibold tracking-[-0.07em] text-white">
                  Tenha total controle da sua{" "}
                  <span className="text-[#FF7A1A]">recompra</span>
                </h3>

                <p className="max-w-[42rem] text-[0.98rem] leading-relaxed text-white/72 sm:text-[1.08rem]">
                  {KASHBACK_COPY}
                </p>

                <p className="max-w-[42rem] text-[0.95rem] leading-relaxed text-white/56 sm:text-[1rem]">
                  {KASHBACK_COPY_2}
                </p>
              </div>
            </div>

            <a
              href="#faq"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF7A1A]/70 bg-[#FF7A1A] px-4 py-2 text-[0.72rem] font-semibold tracking-[0.18em] text-white uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Saiba mais
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featureCards.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                wide={item.wide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function KashbackTransitionSection(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sectionBackground = useTransform(
    scrollYProgress,
    [0, 0.42, 0.7, 1],
    ["#F4EEE7", "#F4EEE7", "#090909", "#090909"]
  );

  const ambientOpacity = useTransform(scrollYProgress, [0.44, 0.7], [0, 1]);

  const headlineX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.5],
    reduceMotion ? ["0vw", "0vw", "0vw"] : ["110vw", "0vw", "-126vw"]
  );

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.14, 0.38, 0.5],
    [0, 1, 1, 1, 0]
  );

  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5],
    [0.98, 1, 0.985]
  );

  const cardX = useTransform(
    scrollYProgress,
    [0.48, 0.76],
    reduceMotion ? ["0vw", "0vw"] : ["-74vw", "0vw"]
  );

  const cardY = useTransform(scrollYProgress, [0.48, 0.76], ["26px", "0px"]);

  const cardOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.56, 0.76, 1],
    [0, 0.28, 1, 1]
  );

  const cardScale = useTransform(scrollYProgress, [0.48, 0.76], [0.97, 1]);

  if (reduceMotion) {
    return (
      <section
        id="kashback"
        className="relative -mt-px bg-[#F4EEE7] px-4 py-16 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8">
          <div className="max-w-6xl overflow-hidden">
            <h2 className="text-[clamp(2.4rem,8vw,6rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-[#131313]">
              {KASHBACK_HERO_TEXT}
            </h2>
          </div>

          <KashbackCard />
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="kashback"
        className="relative -mt-px overflow-hidden bg-[#F4EEE7] px-4 py-16 text-white sm:px-6 lg:hidden"
      >
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8">
          <div className="max-w-6xl overflow-hidden">
            <h2 className="text-[clamp(2.5rem,10vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-[#131313]">
              {KASHBACK_HERO_TEXT}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <KashbackCard />
          </motion.div>
        </div>
      </section>

      <motion.section
        ref={sectionRef}
        className="relative -mt-px hidden overflow-hidden text-white lg:block"
        style={{ backgroundColor: sectionBackground }}
      >
        <div style={{ height: "320vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ opacity: ambientOpacity }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,26,0.16),transparent_24%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
              <div className="absolute top-1/2 left-[-8rem] h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#FF7A1A]/10 blur-3xl" />
            </motion.div>

            <div className="relative h-full w-full">
              <motion.div
                className="absolute inset-0 z-[1] flex items-center will-change-transform"
                style={{
                  x: headlineX,
                  opacity: headlineOpacity,
                  scale: headlineScale,
                }}
              >
                <div className="w-full px-[4vw]">
                  <h2
                    className="font-semibold tracking-[-0.08em] whitespace-nowrap text-[#131313]"
                    style={{
                      fontSize: "clamp(4rem, 12.5vw, 12rem)",
                      lineHeight: 0.88,
                    }}
                  >
                    {KASHBACK_HERO_TEXT}
                  </h2>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 z-[2] flex items-center will-change-transform"
                style={{
                  x: cardX,
                  y: cardY,
                  opacity: cardOpacity,
                  scale: cardScale,
                }}
              >
                <div className="w-full px-[4vw]">
                  <div className="mx-auto max-w-[1380px]">
                    <KashbackCard />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
