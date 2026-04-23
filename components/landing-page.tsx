"use client";

import type { ReactNode } from "react";
import { BlurInHeadline } from "@/components/blur-in-headline";
import { FAQ } from "@/components/faq";
import { FeaturesBento } from "@/components/features-bento";
import { KashbackTransitionSection } from "@/components/kashback-transition";
import { InfluencerManagementSection } from "@/components/influencer-management";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import TextType from "@/components/reactbits/TextType";

export function LandingPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <Hero
        backgroundImageSrc="/BG_HOME.png"
        parallax={false}
        ctaHref={WHATSAPP_CONTACT_URL}
        headlineLines={[
          <>
            Uma plataforma <span className="text-accent">SaaS</span>
          </>,
          <>para criar promoções</>,
          <>inteligentes para</>,
          <>
            <TextType
              className="text-accent font-semibold tracking-[-0.04em] whitespace-nowrap"
              as="span"
              showCursor={false}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={1700}
              text={[
                "sua rede de lojas",
                "sua rede de franquias",
                "sua rede de perfumarias",
                "sua rede de farmácias",
                "sua rede de academias",
                "sua rede de supermercados",
                "sua rede de pet shops",
                "sua rede de outlets",
                "sua rede de clínicas de estética",
                "sua rede de padarias",
                "sua rede de conveniências",
                "sua rede de salão de beleza",
              ]}
            />
          </>,
        ]}
      />
      <HowItWorks />
      <KashbackTransitionSection />
      <BlurInHeadline />
      <FeaturesBento />
      <InfluencerManagementSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
