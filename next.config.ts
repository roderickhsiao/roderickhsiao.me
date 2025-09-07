import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  poweredByHeader: false,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
