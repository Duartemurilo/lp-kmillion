/**
 * Gera public/og-image.png (1200x630), a imagem usada em og:image / twitter:image.
 *
 * Roda offline (`node scripts/generate-og-image.mjs`) e comita o PNG: a imagem
 * é estática, então não faz sentido pagar renderização em runtime. Reexecute
 * quando a marca ou o posicionamento do site mudarem.
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

const element = h(
  "div",
  {
    style: {
      width: "1200px",
      height: "630px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#0f0f12",
      backgroundImage: `radial-gradient(circle at 78% 18%, rgba(254,102,52,0.42) 0%, rgba(15,15,18,0) 55%)`,
      padding: "72px 80px",
      color: "#ffffff",
    },
  },
  h("img", { src: logoDataUri, width: 300, height: 68, style: { objectFit: "contain" } }),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    h(
      "div",
      {
        style: {
          fontSize: 62,
          lineHeight: 1.1,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          maxWidth: "900px",
        },
      },
      "Promoções inteligentes para o varejo físico"
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
      "Plataforma SaaS de inteligência promocional: campanhas, cashback e influenciadores sem depender do TI."
    )
  ),
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: "18px" } },
    h("div", {
      style: { width: 72, height: 8, borderRadius: 999, backgroundColor: ACCENT },
    }),
    h(
      "div",
      { style: { fontSize: 26, color: "rgba(255,255,255,0.85)" } },
      "kmillion.com.br"
    )
  )
);

const response = new ImageResponse(element, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());
const outPath = path.join(root, "public/og-image.png");
await writeFile(outPath, buffer);

console.log(`og-image.png gerado (${(buffer.length / 1024).toFixed(1)} KB) em ${outPath}`);
