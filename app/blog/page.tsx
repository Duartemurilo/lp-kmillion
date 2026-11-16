import { BlogIndexPage } from "@/components/blog/blog-index-page";
import { JsonLd } from "@/components/json-ld";
import { BLOG_PATH, getPublishedPosts } from "@/lib/blog";
import { createMetadata, siteConfig } from "@/lib/metadata";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  createBreadcrumbSchema,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const DESCRIPTION =
  "Artigos práticos sobre estoque, desconto, cashback e campanhas para redes de varejo físico, com exemplos e números para aplicar na sua operação.";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: DESCRIPTION,
  path: BLOG_PATH,
});

export default function BlogRoute(): ReactNode {
  const posts = getPublishedPosts();

  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${siteConfig.url}${BLOG_PATH}#blog`,
            name: "Blog Kmillion",
            description: DESCRIPTION,
            url: `${siteConfig.url}${BLOG_PATH}`,
            inLanguage: "pt-BR",
            publisher: { "@id": ORGANIZATION_ID },
            isPartOf: { "@id": WEBSITE_ID },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${post.url}#article`,
              headline: post.title,
              url: post.url,
              datePublished: post.publishedAt,
            })),
          },
          createBreadcrumbSchema([{ name: "Blog", path: BLOG_PATH }]),
        ]}
      />
      <BlogIndexPage posts={posts} />
    </>
  );
}
