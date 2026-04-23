"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const VIDEO_SRC = "/videos/IML.mp4";
const ACCENT = "#FE6634";

function VideoBlock(): ReactNode {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-black p-4 sm:p-6 lg:p-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-black lg:aspect-[11/10] lg:min-h-[560px]">
        <video
          key={VIDEO_SRC}
          className="block h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function InfluencerManagementSection(): ReactNode {
  return (
    <section
      id="influencer-management-system"
      className="w-full bg-black text-white"
    >
      <div className="mx-auto max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14">
          <div className="py-4 lg:py-10">
            <div className="space-y-2">
              <span
                className="block text-[clamp(4.2rem,8vw,7.6rem)] leading-[0.84] font-semibold tracking-[-0.05em]"
                style={{ letterSpacing: "-0.05em", color: ACCENT }}
              >
                IMS
              </span>

              <h4 className="text-[clamp(1.95rem,4vw,4.1rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-white">
                <span className="block">Influencer</span>
                <span className="block whitespace-nowrap">
                  Management System
                </span>
              </h4>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
              A Gestão de Influenciadores Kmillion transforma influenciadores
              em um canal de vendas mensurável, previsível e escalável. Unimos
              tecnologia, dados e automação para acompanhar a jornada completa:
              do conteúdo postado à venda realizada. O influenciador deixa de
              ser só mídia e passa a ser parte da estratégia de performance,
              com relatórios em tempo real, engajamento rastreado e campanhas
              inteligentes.
            </p>

            <a
              href="#faq"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-0.5 hover:bg-[#e85b2d]"
            >
              Saiba mais
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="py-4 lg:py-10">
            <VideoBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
