import type { Metadata } from "next";

export const siteConfig = {
  name: "Kmillion",
  legalName: "Kmillion",
  description:
    "Kmillion é uma plataforma SaaS de inteligência promocional para o varejo físico. Crie, ative e meça promoções, cashback e campanhas com influenciadores sem depender do time de TI.",
  shortDescription:
    "Plataforma SaaS de inteligência promocional para o varejo físico.",
  url: "https://www.kmillion.com.br",
  ogImage: "/og-image.png",
  email: "marketing@kmillion.cloud",
  /** Mesmo número usado no CTA de WhatsApp do site (lib/whatsapp.ts). */
  phone: "+55 11 96775-0313",
  locale: "pt_BR",
  authors: [
    {
      name: "Kmillion",
      url: "https://www.kmillion.com.br",
    },
  ],
  /**
   * Perfis oficiais confirmados pela Kmillion. Alimentam o `sameAs` do
   * schema.org, que é como os motores de resposta ligam o site à entidade
   * "Kmillion" em outras fontes.
   */
  sameAs: [
    "https://www.linkedin.com/company/kmilliontech/",
    "https://www.instagram.com/kmillion.promo/",
    "https://www.youtube.com/@kmillionpromo",
  ] as string[],
  keywords: [
    "Kmillion",
    "inteligência promocional",
    "plataforma de promoções",
    "motor promocional",
    "cashback para varejo",
    "kashback",
    "varejo físico",
    "campanhas promocionais",
    "influencer marketing para varejo",
    "IMS",
    "SaaS para varejo",
    "omnichannel",
  ],
} as const;

const officialSquareIcon = encodeURI(
  "/LOGO OFICIAL/SVG_VERSÕES LOGO QUADRADO/CAMALEÃO LARANJA.svg"
);

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Inteligência promocional para o varejo físico`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Inteligência promocional para o varejo físico`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, plataforma SaaS de inteligência promocional`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Inteligência promocional para o varejo físico`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: officialSquareIcon,
    shortcut: officialSquareIcon,
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const ogTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: ogTitle,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
