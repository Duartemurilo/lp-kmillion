import { IMS_BRAND_FAQS } from "@/data/faqs";
import { IMS_BRAND_VIDEO } from "@/data/videos";
import { ImsBrandPage } from "@/components/ims-page";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/metadata";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createModuleSchema,
  createVideoSchema,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "IMS visão loja",
  description:
    "Com o IMS da Kmillion, sua marca transforma influenciadores em um motor de conversão real, rastreável e escalável.",
  path: "/ims",
  image: "/og-ims.png",
});

const imsSchema = createModuleSchema({
  name: "IMS Kmillion (Influencer Management System)",
  description:
    "Módulo da Kmillion que transforma influenciadores em canal de vendas mensurável, com cupom exclusivo, rastreio por CPF e cashback automatizado.",
  path: "/ims",
  featureList: [
    "Cupom exclusivo por influenciador com rastreio por CPF",
    "Painel de vendas geradas em tempo real",
    "Cashback ao influenciador liberado automaticamente após validação da compra",
    "Integração com ERP, e-commerce, WhatsApp e sistemas de venda",
    "Campanhas simultâneas com múltiplos creators",
  ],
});

export default function ImsRoute(): ReactNode {
  return (
    <>
      <JsonLd
        schema={[
          imsSchema,
          createFaqSchema(IMS_BRAND_FAQS, "/ims"),
          createVideoSchema(IMS_BRAND_VIDEO),
          createBreadcrumbSchema([{ name: "IMS visão loja", path: "/ims" }]),
        ]}
      />
      <ImsBrandPage />
    </>
  );
}
