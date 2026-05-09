import { KashbackPage } from "@/components/kashback-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Kashback Kmillion",
  description:
    "Cashback que gera recompra, dados e performance. O Kashback Kmillion transforma cada compra em uma nova oportunidade de venda.",
  path: "/kashback",
});

export default function KashbackRoute(): ReactNode {
  return <KashbackPage />;
}

