import { JsonLd } from "@/components/json-ld";
import { MotorPromocionalPage } from "@/components/motor-promocional-page-content";
import { createMetadata } from "@/lib/metadata";
import { IMS_INFLUENCER_VIDEO } from "@/data/videos";
import {
  createBreadcrumbSchema,
  createModuleSchema,
  createVideoSchema,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Motor Promocional",
  description:
    "Promoções não deveriam depender de TI. Veja como o Motor Promocional Kmillion dá autonomia total ao marketing.",
  path: "/motor-promocional",
  image: "/og-motor-promocional.png",
});

const motorSchema = createModuleSchema({
  name: "Motor Promocional Kmillion",
  description:
    "Módulo da Kmillion que permite ao marketing criar, ativar e medir campanhas promocionais no varejo físico sem depender do time de TI.",
  path: "/motor-promocional",
  featureList: [
    "Criação e ativação de campanhas promocionais sem depender do TI",
    "Regras promocionais personalizáveis por rede, loja e público",
    "Integração entre canais físicos e digitais",
    "Medição de resultado das campanhas em tempo real",
    "Conexão via API com ERP e sistemas de venda",
  ],
});

export default function MotorPromocionalRoute(): ReactNode {
  return (
    <>
      <JsonLd
        schema={[
          motorSchema,
          createVideoSchema(IMS_INFLUENCER_VIDEO),
          createBreadcrumbSchema([
            { name: "Motor Promocional", path: "/motor-promocional" },
          ]),
        ]}
      />
      <MotorPromocionalPage />
    </>
  );
}
