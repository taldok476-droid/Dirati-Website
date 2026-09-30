import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1 npm run build` produces a self-contained static copy in `out/`
 * (used for previews that can be hosted anywhere, even under a sub-path).
 * A normal `npm run build` keeps Next.js image optimization.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      assetPrefix: ".",
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
