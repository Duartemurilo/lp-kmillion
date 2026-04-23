import { MotorPromocionalPage } from "@/components/motor-promocional-page-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Motor Promocional",
  description:
    "Promoções não deveriam depender de TI. Veja como o Motor Promocional Kmillion dá autonomia total ao marketing.",
  path: "/motor-promocional",
});

export default function MotorPromocionalRoute(): ReactNode {
  return <MotorPromocionalPage />;
}
