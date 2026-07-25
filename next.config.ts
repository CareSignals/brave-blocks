import type { NextConfig } from "next";
import { resolve } from "node:path";

const requestedEdition = process.env.NEXT_PUBLIC_BRAVE_BLOCKS_EDITION?.trim().toUpperCase() || "REVIEW";
if (requestedEdition !== "REVIEW" && requestedEdition !== "CHILD") {
  throw new Error(`NEXT_PUBLIC_BRAVE_BLOCKS_EDITION must be REVIEW or CHILD, received "${requestedEdition}".`);
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/brave-blocks",
  assetPrefix: "/brave-blocks/",
  env: {
    NEXT_PUBLIC_BRAVE_BLOCKS_EDITION: requestedEdition,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    if (config.cache && typeof config.cache === "object") {
      config.cache = {
        ...config.cache,
        version: `${config.cache.version ?? "brave-blocks"}-${requestedEdition}`,
      };
    }
    config.resolve.alias["@edition-narration"] = resolve(
      process.cwd(),
      requestedEdition === "CHILD"
        ? "app/narration-index.child.json"
        : "app/narration-index.json",
    );
    config.resolve.alias["@edition-content"] = resolve(
      process.cwd(),
      requestedEdition === "CHILD"
        ? "app/edition-content.child.ts"
        : "app/edition-content.review.ts",
    );
    return config;
  },
};

export default nextConfig;
