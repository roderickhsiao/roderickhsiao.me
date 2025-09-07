import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
