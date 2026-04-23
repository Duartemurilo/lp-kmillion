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

export function LandingPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <Hero backgroundImageSrc="/BG_HOME.png" ctaHref={WHATSAPP_CONTACT_URL} />
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
