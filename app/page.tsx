import { LandingPage } from "@/components/landing-page";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  return <LandingPage />;
}
