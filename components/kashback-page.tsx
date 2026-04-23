"use client";

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { KashbackComparisonSection } from "@/components/kashback-comparison-section";
import { KashbackHowItWorksSection } from "@/components/kashback-how-it-works-section";
import { KashbackResultsBentoSection } from "@/components/kashback-results-bento-section";
import { ImsWorthItSection } from "@/components/ims-worth-it-section";
import { Database, Repeat2, Target } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

const KASHBACK_REFERENCE_IMAGE_SRC =
  "https://static.wixstatic.com/media/f9ab6d_ad7c26f768d24c7da246956941029344~mv2.png/v1/fill/w_718,h_404,al_c,lg_1,q_85,enc_avif,quality_auto/f9ab6d_ad7c26f768d24c7da246956941029344~mv2.png";

const KASHBACK_LOGO_SRC = encodeURI(
  "/LOGO OFICIAL/KASHBACK/kashback_horizontal.svg"
);

const CASHBACK_TRADICIONAL_IMAGE_SRC = "/cashback-tradicional.jpeg";

const kashbackConsolidatedReasons = [
  {
    icon: Target,
    title: "Clientes mais engajados",
    description:
      "Ative a recompra com incentivos mais relevantes para o momento e o perfil de cada cliente.",
  },
  {
    icon: Database,
    title: "Mais vendas recorrentes",
    description:
      "Transforme cada compra em uma nova oportunidade de retorno, com mais frequência e consistência.",
  },
  {
    icon: Repeat2,
    title: "Visibilidade total sobre o ROI de cada ação promocional",
    description:
      "Acompanhe o retorno de cada ação com clareza para decidir melhor e escalar com segurança.",
  },
] as const;

function KashbackWhyItMattersSection(): ReactNode {
  return (
    <ImsWorthItSection
      id="por-que"
      eyebrow="O que é o Kashback Kmillion?"
      title={
        <Image
          src={KASHBACK_LOGO_SRC}
          alt="Kashback Kmillion"
          width={1600}
          height={400}
          className="h-10 w-auto object-contain sm:h-12 lg:h-14"
          priority
        />
      }
      lead={
        "O Kashback Kmillion é uma evolução do cashback tradicional. Não é apenas um retorno financeiro ao cliente - é uma estratégia completa de recompra pilotada por dados e inteligência.\n\nCada transação gera uma oportunidade de comunicação personalizada, define o melhor momento e canal para ativá-lo e dispara ofertas que incentivam uma nova compra."
      }
      reasons={kashbackConsolidatedReasons}
      centerImageSrc={KASHBACK_REFERENCE_IMAGE_SRC}
      centerImageAlt="Kashback Kmillion"
      tone="dark"
      accentColor="#FF7A1A"
      reasonLayout="three"
      centerImageDensity="compact"
      centerImageRadius="none"
    />
  );
}

function KashbackLegacySection(): ReactNode {
  return (
    <section className="relative w-full bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="w-full lg:w-[48%]">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={CASHBACK_TRADICIONAL_IMAGE_SRC}
              alt="Cashback tradicional"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center lg:w-[52%]">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            O cashback tradicional não entrega{" "}
            <span className="text-accent font-semibold tracking-[-0.04em]">
              resultados
            </span>
            .
          </h2>

          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-base leading-relaxed text-[#4B433D] sm:text-lg">
              A maioria das estratégias de cashback no varejo ignora o que
              realmente importa: gerar valor contínuo para a marca e o cliente.
            </p>
          </div>

          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d]"
          >
            Falar com especialista
          </a>
        </div>
      </div>
    </section>
  );
}

export function KashbackPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 overflow-hidden bg-[#0f0f12]">
      <Hero
        id="top"
        headlineLines={[
          <span
            key="kashback-hero-1"
            className="text-accent font-semibold tracking-[-0.04em]"
          >
            Kashback Kmillion
          </span>,
          <span key="kashback-hero-2" className="text-black">
            cashback que
          </span>,
          <span key="kashback-hero-3" className="text-black">
            gera recompra,
          </span>,
          <span key="kashback-hero-4" className="text-black">
            dados e performance.
          </span>,
        ]}
        subheadline={
          <span className="text-black">
            Mais do que só devolver dinheiro, o{" "}
            <span
              className="text-accent font-semibold tracking-[-0.04em]"
            >
              Kashback Kmillion
            </span>{" "}
            transforma cada compra em uma nova oportunidade de venda
          </span>
        }
        ctaLabel="Fale com um especialista"
        ctaHref={WHATSAPP_CONTACT_URL}
        showPreview={false}
        showLogos={false}
        fillViewport
        lightText
        backgroundImageSrc="/BGkashback.jpeg"
      />

      <KashbackLegacySection />
      <KashbackWhyItMattersSection />
      <KashbackHowItWorksSection />
      <KashbackComparisonSection />
      <KashbackResultsBentoSection />
      <Footer />
    </main>
  );
}
