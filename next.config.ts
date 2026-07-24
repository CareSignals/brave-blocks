import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/brave-blocks",
  assetPrefix: "/brave-blocks/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
