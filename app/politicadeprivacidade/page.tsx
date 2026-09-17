import { JsonLd } from "@/components/json-ld";
import { PrivacyPolicyPage } from "@/components/privacy-policy-page";
import { POLICY_META } from "@/data/privacy-policy";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Endereço pedido pela Kmillion, em palavra única e sem hífens. */
const PATH = "/politicadeprivacidade";

export const metadata: Metadata = createMetadata({
  title: "Política de Privacidade, Cookies e Termos de Uso",
  description:
    "Como a Kmillion coleta, usa, guarda, compartilha e protege dados pessoais, em conformidade com a LGPD. Direitos do titular, cookies, segurança e contato do Encarregado.",
  path: PATH,
});

/**
 * Página institucional obrigatória, estática. O texto vem de
 * `data/privacy-policy.ts`, transcrito do documento jurídico da Kmillion.
 */
export default function PoliticaDePrivacidadeRoute(): ReactNode {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${siteConfig.url}${PATH}#webpage`,
            name: POLICY_META.title,
            url: `${siteConfig.url}${PATH}`,
            inLanguage: "pt-BR",
            dateModified: POLICY_META.updatedAt,
            isPartOf: { "@id": `${siteConfig.url}#website` },
            about: {
              "@type": "Thing",
              name: "Proteção de dados pessoais (LGPD)",
            },
          },
          createBreadcrumbSchema([
            { name: "Política de Privacidade", path: PATH },
          ]),
        ]}
      />
      <PrivacyPolicyPage />
    </>
  );
}
