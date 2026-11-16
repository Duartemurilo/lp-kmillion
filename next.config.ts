import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        // O arquivo do post fica em public/blog/<slug>/index.html e também
        // abriria por esse endereço, cru (sem os ajustes de lib/blog.ts).
        // Um endereço só para cada post.
        source: "/blog/:slug/index.html",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
