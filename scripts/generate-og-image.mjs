/**
 * Gera as imagens de compartilhamento (og:image / twitter:image), 1200x630.
 *
 * Roda offline (`node scripts/generate-og-image.mjs`) e os PNGs são comitados:
 * são estáticos, então não faz sentido pagar renderização em runtime.
 * Reexecute quando a marca ou as chamadas das páginas mudarem.
 */
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const logoPath = path.join(
  root,
  "public/LOGO OFICIAL/PNG_VERSÕES LOGO HORIZONTAL/LOGO OFICIAL KMILLION_BRANCO.png"
);
const logoDataUri = `data:image/png;base64,${(await readFile(logoPath)).toString("base64")}`;

const ACCENT = "#fe6634";

/** Uma arte por página: mesma identidade, chamada específica. */
const pages = [
  {
    file: "og-image.png",
    headline: "Promoções inteligentes para o varejo físico",
    lead: "Plataforma SaaS de inteligência promocional: campanhas, cashback e influenciadores sem depender do TI.",
    tag: "kmillion.com.br",
  },
  {
    file: "og-motor-promocional.png",
    headline: "Promoções não deveriam depender de TI",
    lead: "O Motor Promocional dá ao marketing autonomia para criar, ativar e medir campanhas em minutos.",
    tag: "Motor Promocional",
  },
  {
    file: "og-kashback.png",
    headline: "Cashback que gera recompra, dados e performance",
    lead: "O Kashback Kmillion transforma cada compra em uma nova oportunidade de venda.",
    tag: "Kashback",
  },
  {
    file: "og-ims.png",
    headline: "Influencer não é mídia. É canal de vendas.",
    lead: "O IMS transforma influenciadores em um motor de conversão real, rastreável e escalável.",
    tag: "IMS, visão loja",
  },
  {
    file: "og-ims-influencer.png",
    headline: "Influência que gera vendas",
    lead: "Seu conteúdo vira resultado real, com pagamento automático e rastreável por venda gerada.",
    tag: "IMS, visão influencer",
  },
];

function card({ headline, lead, tag }) {
  return h(
    "div",
    {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0f0f12",
        backgroundImage:
          "radial-gradient(circle at 78% 18%, rgba(254,102,52,0.42) 0%, rgba(15,15,18,0) 55%)",
        padding: "72px 80px",
        color: "#ffffff",
      },
    },
    h("img", {
      src: logoDataUri,
      width: 300,
      height: 68,
      style: { objectFit: "contain" },
    }),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            fontSize: headline.length > 44 ? 62 : 70,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          },
        },
        headline
      ),
      h(
        "div",
        {
          style: {
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "880px",
          },
        },
        lead
      )
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "18px" } },
      h("div", {
        style: {
          width: 72,
          height: 8,
          borderRadius: 999,
          backgroundColor: ACCENT,
        },
      }),
      h("div", { style: { fontSize: 26, color: "rgba(255,255,255,0.85)" } }, tag)
    )
  );
}

for (const page of pages) {
  const response = new ImageResponse(card(page), { width: 1200, height: 630 });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(root, "public", page.file), buffer);
  console.log(`${page.file} (${(buffer.length / 1024).toFixed(1)} KB)`);
}
