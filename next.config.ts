import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Already passing tsc --noEmit, so we can safely build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
