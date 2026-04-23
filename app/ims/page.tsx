import { ImsBrandPage } from "@/components/ims-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "IMS Marca",
  description:
    "Com o IMS da Kmillion, sua marca transforma influenciadores em um motor de conversão real, rastreável e escalável.",
  path: "/ims",
});

export default function ImsRoute(): ReactNode {
  return <ImsBrandPage />;
}
