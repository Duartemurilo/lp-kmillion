import type { FaqEntry } from "@/data/faqs";
import { siteConfig } from "@/lib/metadata";

/**
 * Dados estruturados (schema.org / JSON-LD).
 *
 * Motores de resposta (ChatGPT, Perplexity, Google AI Overviews) usam essa
 * marcação para entender formalmente quem é a empresa, o que o produto faz e
 * qual a categoria. Os `@id` são estáveis para que os nós se referenciem entre
 * si em vez de duplicar a entidade em cada página.
 */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;
export const SOFTWARE_ID = `${siteConfig.url}/#software`;

/** JSON-LD é um grafo aberto; tipar como Record evita brigar com o schema.org. */
export type JsonLdSchema = Record<string, unknown>;

const absoluteUrl = (path: string): string =>
  path.startsWith("http") ? path : `${siteConfig.url}${path}`;

const logoUrl = absoluteUrl(
  encodeURI("/LOGO OFICIAL/PNG_VERSÕES LOGO HORIZONTAL/LOGO OFICIAL KMILLION.png")
);

export const organizationSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  slogan: "Promoções inteligentes para o varejo físico, sem depender do TI.",
  logo: {
    "@type": "ImageObject",
    url: logoUrl,
    caption: siteConfig.name,
  },
  image: absoluteUrl(siteConfig.ogImage),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsAbout: [
    "Inteligência promocional",
    "Varejo físico",
    "Campanhas promocionais",
    "Cashback",
    "Influencer marketing",
    "Omnichannel",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
  ],
  ...(siteConfig.sameAs.length > 0 ? { sameAs: [...siteConfig.sameAs] } : {}),
};

export const websiteSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "pt-BR",
  publisher: { "@id": ORGANIZATION_ID },
};

export const softwareApplicationSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Plataforma SaaS de inteligência promocional",
  operatingSystem: "Web",
  browserRequirements: "Requer navegador moderno com JavaScript habilitado",
  inLanguage: "pt-BR",
  image: absoluteUrl(siteConfig.ogImage),
  publisher: { "@id": ORGANIZATION_ID },
  provider: { "@id": ORGANIZATION_ID },
  audience: {
    "@type": "BusinessAudience",
    name: "Redes de varejo físico",
    audienceType:
      "Redes de lojas, franquias, farmácias, supermercados e outros varejos físicos",
  },
  featureList: [
    "Motor promocional para criar e ativar campanhas sem depender do TI",
    "Kashback: cashback automatizado com regras flexíveis",
    "IMS: gestão de influenciadores com rastreio por cupom e CPF",
    "Integração via API com ERP, e-commerce, WhatsApp e sistemas de venda",
    "Painéis de resultado e medição de ROI em tempo real",
    "Personalização dos nomes e regras das ações promocionais",
  ],
};

/**
 * Módulo do produto (Motor Promocional, Kashback, IMS) como aplicação própria,
 * ligada à plataforma principal.
 */
export function createModuleSchema({
  name,
  description,
  path,
  featureList,
}: {
  name: string;
  description: string;
  path: string;
  featureList: string[];
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}/#software`,
    name,
    url: absoluteUrl(path),
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Plataforma SaaS de inteligência promocional",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    isPartOf: { "@id": SOFTWARE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    provider: { "@id": ORGANIZATION_ID },
    featureList,
  };
}

export function createFaqSchema(
  faqs: readonly FaqEntry[],
  path = "/"
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    inLanguage: "pt-BR",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
