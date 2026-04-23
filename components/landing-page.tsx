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

export function LandingPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <Hero backgroundVideoSrc="/videos/SITE_HERO.mp4" />
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
