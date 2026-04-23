import { ImsInfluencerPage } from "@/components/ims-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "IMS Influencer",
  description:
    "Com o IMS da Kmillion, seu conteúdo vira resultado real e você recebe de forma automática, transparente e rastreável por venda gerada.",
  path: "/ims/influencer",
});

export default function ImsInfluencerRoute(): ReactNode {
  return <ImsInfluencerPage />;
}

