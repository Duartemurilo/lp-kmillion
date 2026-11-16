import fs from "node:fs";
import path from "node:path";

import { siteConfig } from "@/lib/metadata";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/structured-data";

/**
 * Blog feito de páginas prontas.
 *
 * A agência gera cada post como uma página HTML completa (layout próprio,
 * calculadora, vídeos) e entrega uma pasta:
 *
 *   public/blog/<slug>/index.html
 *   public/blog/<slug>/img/...
 *   public/blog/<slug>/video/...
 *
 * Não existe cadastro em outro lugar: a lista de /blog, o sitemap e o
 * llms.txt saem das tags <meta> do próprio index.html. O passo a passo para
 * a agência está em docs/blog-como-publicar.md.
 *
 * Tudo aqui roda só no build (as rotas são estáticas), por isso pode ler o
 * disco com fs.
 */

const BLOG_DIR = path.join(process.cwd(), "public", "blog");
export const BLOG_PATH = "/blog";

/** Endereço em minúsculas, números e hífen: vira a URL do post. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const WORDS_PER_MINUTE = 200;

export type BlogPost = {
  slug: string;
  /** Caminho no site, ex.: /blog/estoque-parado */
  path: string;
  url: string;
  title: string;
  description: string;
  /** Caminho público da capa (og:image do post), ou null se não houver. */
  cover: string | null;
  coverAlt: string;
  category: string | null;
  /** AAAA-MM-DD */
  publishedAt: string;
  /** AAAA-MM-DD */
  updatedAt: string;
  readingMinutes: number;
  /**
   * Post com `<meta name="robots" content="noindex">` é rascunho: abre pelo
   * endereço direto (para revisão), mas fica fora da lista, do sitemap e do
   * llms.txt.
   */
  draft: boolean;
};

// ---------------------------------------------------------------------------
// Leitura

function readPostHtml(slug: string): string {
  return fs.readFileSync(path.join(BLOG_DIR, slug, "index.html"), "utf8");
}

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        SLUG_PATTERN.test(entry.name) &&
        fs.existsSync(path.join(BLOG_DIR, entry.name, "index.html"))
    )
    .map((entry) => entry.name);
}

/** Todos os posts, rascunhos inclusive. Use para gerar as rotas. */
export function getAllPostSlugs(): string[] {
  return listSlugs();
}

/** Posts publicados, do mais novo para o mais antigo. */
export function getPublishedPosts(): BlogPost[] {
  return listSlugs()
    .map((slug) => parsePost(slug, readPostHtml(slug)))
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.title.localeCompare(b.title, "pt-BR")
    );
}

// ---------------------------------------------------------------------------
// Metadados do post

const ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function decodeEntities(value: string): string {
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (match, code: string) => {
      if (code[0] === "#") {
        const hex = code[1] === "x" || code[1] === "X";
        const n = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : match;
      }
      return ENTITIES[code.toLowerCase()] ?? match;
    }
  );
}

function parseAttributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const pattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const match of tag.matchAll(pattern)) {
    const name = match[1];
    if (name)
      attrs[name.toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? "");
  }
  return attrs;
}

/** Valor de `<meta name="x">` ou `<meta property="x">`. */
function readMeta(html: string, key: string): string | null {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if ((attrs.name ?? attrs.property)?.toLowerCase() === key) {
      const content = attrs.content?.trim();
      return content ? content : null;
    }
  }
  return null;
}

function readTitleTag(html: string): string | null {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return match?.[1] ? decodeEntities(match[1]).trim() : null;
}

/** "Estoque parado: ... | Kmillion" vira "Estoque parado: ..." */
function stripSiteName(title: string): string {
  return title.replace(/\s*[|·–—-]\s*Kmillion\s*$/i, "").trim();
}

function countReadingMinutes(html: string): number {
  const body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(html)?.[1] ?? html;
  const text = decodeEntities(
    body
      .replace(/<(script|style|svg|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
  const words = text.split(/\s+/).filter((word) => /\p{L}/u.test(word)).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toDate(value: string | null): string | null {
  if (!value) return null;
  const day = value.slice(0, 10);
  return DATE_PATTERN.test(day) ? day : null;
}

function parsePost(slug: string, html: string): BlogPost {
  const where = `public/blog/${slug}/index.html`;
  const postPath = `${BLOG_PATH}/${slug}`;

  const rawTitle = readTitleTag(html) ?? readMeta(html, "og:title");
  if (!rawTitle) throw new Error(`[blog] ${where}: falta o <title>.`);

  const description =
    readMeta(html, "description") ?? readMeta(html, "og:description");
  if (!description) {
    throw new Error(`[blog] ${where}: falta <meta name="description">.`);
  }

  const publishedAt = toDate(readMeta(html, "article:published_time"));
  if (!publishedAt) {
    // Sem data o post não sabe onde entrar na lista. Falhar o build é seguro:
    // a Vercel mantém no ar a versão anterior do site.
    throw new Error(
      `[blog] ${where}: falta <meta property="article:published_time" content="AAAA-MM-DD">.`
    );
  }

  const ogImage = readMeta(html, "og:image");
  const cover = ogImage ? resolveAssetUrl(postPath, ogImage) : null;

  return {
    slug,
    path: postPath,
    url: `${siteConfig.url}${postPath}`,
    title: stripSiteName(rawTitle),
    description,
    cover,
    coverAlt: ogImage ? findImageAlt(html, ogImage) : "",
    category: readMeta(html, "article:section"),
    publishedAt,
    updatedAt: toDate(readMeta(html, "article:modified_time")) ?? publishedAt,
    readingMinutes: countReadingMinutes(html),
    draft: /noindex/i.test(readMeta(html, "robots") ?? ""),
  };
}

/** Texto alternativo da <img> que usa a mesma imagem da capa. */
function findImageAlt(html: string, src: string): string {
  const file = src.split("/").pop();
  if (!file) return "";
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if (attrs.src?.split("/").pop() === file) return attrs.alt ?? "";
  }
  return "";
}

// ---------------------------------------------------------------------------
// HTML servido em /blog/<slug>

/**
 * Caminho relativo (img/foto.webp) é relativo à pasta do post. A agência
 * testa a página em /<slug>/, com barra no fim; aqui o endereço é
 * /blog/<slug>, sem barra, e o navegador resolveria "img/x" como
 * /blog/img/x. Por isso os caminhos viram absolutos.
 */
function isRelative(url: string): boolean {
  return url !== "" && !/^(?:[a-z][a-z0-9+.-]*:|\/|#|\?|\{)/i.test(url);
}

function resolveAssetUrl(postPath: string, url: string): string {
  return isRelative(url) ? `${postPath}/${url.replace(/^\.\//, "")}` : url;
}

function rewriteSrcset(postPath: string, value: string): string {
  return value
    .split(",")
    .map((candidate) => {
      const [url = "", ...descriptor] = candidate.trim().split(/\s+/);
      return [resolveAssetUrl(postPath, url), ...descriptor].join(" ");
    })
    .join(", ");
}

function rewriteCssUrls(postPath: string, css: string): string {
  return css.replace(
    /url\(\s*(['"]?)([^'")]+)\1\s*\)/g,
    (_match, quote: string, url: string) =>
      `url(${quote}${resolveAssetUrl(postPath, url.trim())}${quote})`
  );
}

function rewriteRelativeUrls(postPath: string, html: string): string {
  return html
    .replace(
      /(\s)(src|href|poster)=(["'])([^"']*)\3/gi,
      (_m, space: string, attr: string, quote: string, url: string) =>
        `${space}${attr}=${quote}${resolveAssetUrl(postPath, url)}${quote}`
    )
    .replace(
      /(\s)(srcset|imagesrcset)=(["'])([^"']*)\3/gi,
      (_m, space: string, attr: string, quote: string, value: string) =>
        `${space}${attr}=${quote}${rewriteSrcset(postPath, value)}${quote}`
    )
    .replace(
      /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
      (_m, open: string, css: string, close: string) =>
        `${open}${rewriteCssUrls(postPath, css)}${close}`
    )
    .replace(
      /(\sstyle=)(["'])([^"']*)\2/gi,
      (_m, attr: string, quote: string, css: string) =>
        `${attr}${quote}${rewriteCssUrls(postPath, css)}${quote}`
    );
}

/**
 * A página da agência traz um script que força a barra no fim da URL
 * (/estoque-parado/) para as imagens relativas carregarem. Aqui ele causaria
 * um laço: o Next tira a barra, o script põe de volta. Como os caminhos já
 * foram corrigidos acima, o script sai.
 */
function removeTrailingSlashScripts(html: string): string {
  return html.replace(
    /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi,
    (tag, code: string) => (/pathname\s*\+\s*['"]\/['"]/.test(code) ? "" : tag)
  );
}

function setHeadTag(html: string, pattern: RegExp, tag: string): string {
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace(/<\/head>/i, `${tag}\n</head>`);
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function blogPostingSchema(post: BlogPost): string {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${post.url}#article`,
      headline: post.title,
      description: post.description,
      url: post.url,
      mainEntityOfPage: post.url,
      inLanguage: "pt-BR",
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      ...(post.cover && { image: `${siteConfig.url}${post.cover}` }),
      ...(post.category && { articleSection: post.category }),
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Início", item: siteConfig.url },
        { name: "Blog", item: `${siteConfig.url}${BLOG_PATH}` },
        { name: post.title, item: post.url },
      ].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        ...item,
      })),
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
}

/**
 * HTML final do post: caminhos corrigidos, endereço oficial (canonical e
 * og:url) apontando para /blog/<slug> e dados estruturados de artigo.
 */
export function renderPostHtml(slug: string): string {
  const original = readPostHtml(slug);
  const post = parsePost(slug, original);

  let html = removeTrailingSlashScripts(original);
  html = rewriteRelativeUrls(post.path, html);

  const url = escapeAttr(post.url);
  html = setHeadTag(
    html,
    /<link\b[^>]*rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${url}">`
  );
  html = setHeadTag(
    html,
    /<meta\b[^>]*property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${url}">`
  );
  if (post.cover) {
    const image = escapeAttr(`${siteConfig.url}${post.cover}`);
    html = setHeadTag(
      html,
      /<meta\b[^>]*property=["']og:image["'][^>]*>/i,
      `<meta property="og:image" content="${image}">`
    );
  }

  return html.replace(/<\/head>/i, `${blogPostingSchema(post)}\n</head>`);
}

// ---------------------------------------------------------------------------
// Formatação

const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-16" vira "16 de novembro de 2026". */
export function formatPostDate(date: string): string {
  return DATE_FORMAT.format(new Date(`${date}T00:00:00Z`));
}
