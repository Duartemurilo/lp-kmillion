import { IMS_INFLUENCER_FAQS } from "@/data/faqs";
import { ImsInfluencerPage } from "@/components/ims-page";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createFaqSchema } from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "IMS visão influencer",
  description:
    "Com o IMS da Kmillion, seu conteúdo vira resultado real e você recebe de forma automática, transparente e rastreável por venda gerada.",
  path: "/ims/influencer",
  image: "/og-ims-influencer.png",
});

export default function ImsInfluencerRoute(): ReactNode {
  return (
    <>
      <JsonLd
        schema={[
          createFaqSchema(IMS_INFLUENCER_FAQS, "/ims/influencer"),
          createBreadcrumbSchema([
            { name: "IMS visão loja", path: "/ims" },
            { name: "IMS visão influencer", path: "/ims/influencer" },
          ]),
        ]}
      />
      <ImsInfluencerPage />
    </>
  );
}
