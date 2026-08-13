import { HOME_FAQS } from "@/data/faqs";
import { IMS_INFLUENCER_VIDEO } from "@/data/videos";
import { JsonLd } from "@/components/json-ld";
import { LandingPage } from "@/components/landing-page";
import { createMetadata, siteConfig } from "@/lib/metadata";
import {
  createFaqSchema,
  createVideoSchema,
  softwareApplicationSchema,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <JsonLd
        schema={[
          softwareApplicationSchema,
          createFaqSchema(HOME_FAQS, "/"),
          createVideoSchema(IMS_INFLUENCER_VIDEO),
        ]}
      />
      <LandingPage />
    </>
  );
}
