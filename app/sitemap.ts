import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { POLICY_META } from "@/data/privacy-policy";
import { BLOG_PATH, getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const posts = getPublishedPosts();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/motor-promocional`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ims`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kashback`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ims/influencer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politicadeprivacidade`,
      lastModified: new Date(POLICY_META.updatedAt),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}${BLOG_PATH}`,
      lastModified: posts[0] ? new Date(posts[0].updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: post.url,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
