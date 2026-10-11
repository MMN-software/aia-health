import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/aia-health",
  assetPrefix: "/aia-health",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;