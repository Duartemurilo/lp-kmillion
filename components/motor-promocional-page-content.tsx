"use client";

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { AudienceSection } from "@/components/motor-promocional/audience-section";
import { ease } from "@/components/motor-promocional/data";
import { DifferentialSection } from "@/components/motor-promocional/differential-section";
import { FinalCtaSection } from "@/components/motor-promocional/final-cta-section";
import { HowItWorksSection } from "@/components/motor-promocional/how-it-works-section";
import { MotorProblemSection } from "@/components/motor-promocional/problem-section";
import { MotorSection } from "@/components/motor-promocional/motor-section";
import type { ReactNode } from "react";

export function MotorPromocionalPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1 overflow-hidden">
      <Hero
        id="top"
        headlineLines={[
          <span key="headline" className="text-white">
            Promoções não deveriam depender de{" "}
            <span
              className="text-accent font-semibold tracking-[-0.04em]"
            >
              TI.
            </span>
          </span>,
        ]}
        subheadline={
          null
        }
        ctaLabel="Entenda como funciona"
        ctaHref="#como-funciona"
        showPreview={false}
        showLogos={false}
        fillViewport
      />

      <MotorProblemSection />
      <MotorSection ease={ease} />
      <HowItWorksSection />
      <DifferentialSection />
      <AudienceSection />
      <FinalCtaSection />

      <Footer />
    </main>
  );
}
