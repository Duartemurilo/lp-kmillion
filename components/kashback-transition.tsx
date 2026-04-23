"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

const KASHBACK_LOGO_SRC = encodeURI(
  "/LOGO OFICIAL/KASHBACK/kashback_horizontal.svg"
);
const KASHBACK_IMAGE_SRC = "/kashback.avif";

const KASHBACK_COPY =
  "O Kashback Kmillion é mais do que devolver parte do valor ao cliente - é uma estratégia inteligente de recompra. Ele conecta dados, canais e comportamento de consumo para ativar o cliente no momento certo, no lugar certo.";

const KASHBACK_COPY_2 =
  "Diferente do cashback tradicional, o Kashback Kmillion é pilotado com inteligência, permitindo segmentar, mensurar e impulsionar novas vendas com base em dados reais - tudo em tempo real.";

function KashbackImage(): ReactNode {
  return (
    <div className="relative aspect-[4/5] w-full">
      <Image
        src={KASHBACK_IMAGE_SRC}
        alt="Kashback Kmillion"
        fill
        sizes="(max-width: 1024px) 100vw, 48vw"
        className="object-cover object-center"
        priority
      />
    </div>
  );
}

export function KashbackTransitionSection(): ReactNode {
  return (
    <section
      id="kashback"
      className="relative w-full bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="w-full lg:w-[48%]">
          <KashbackImage />
        </div>

        <div className="flex w-full flex-col items-start justify-center lg:w-[52%]">
          <Image
            src={KASHBACK_LOGO_SRC}
            alt="Kashback Kmillion"
            width={420}
            height={80}
            className="h-10 w-auto object-contain sm:h-12 lg:h-14"
            priority
          />

          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-base leading-relaxed text-[#4B433D] sm:text-lg">
              {KASHBACK_COPY}
            </p>

            <p className="text-base leading-relaxed text-[#4B433D] sm:text-lg">
              {KASHBACK_COPY_2}
            </p>
          </div>

          <a
            href="#faq"
            className="bg-accent mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d]"
          >
            Saiba mais
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
