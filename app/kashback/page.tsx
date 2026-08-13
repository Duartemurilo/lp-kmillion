import { JsonLd } from "@/components/json-ld";
import { KashbackPage } from "@/components/kashback-page";
import { createMetadata } from "@/lib/metadata";
import { createModuleSchema } from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Kashback Kmillion",
  description:
    "Cashback que gera recompra, dados e performance. O Kashback Kmillion transforma cada compra em uma nova oportunidade de venda.",
  path: "/kashback",
});

const kashbackSchema = createModuleSchema({
  name: "Kashback Kmillion",
  description:
    "Módulo de cashback da Kmillion para o varejo físico: regras flexíveis, saldo controlado e recompra medida em painel.",
  path: "/kashback",
  featureList: [
    "Cashback automatizado com regras flexíveis por campanha",
    "Nome da ação personalizável pela marca",
    "Controle de saldo e validade do benefício",
    "Painéis de recompra e ROI",
    "Integração via API com os principais ERPs do mercado",
  ],
});

export default function KashbackRoute(): ReactNode {
  return (
    <>
      <JsonLd schema={kashbackSchema} />
      <KashbackPage />
    </>
  );
}
