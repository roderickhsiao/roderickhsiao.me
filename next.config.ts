import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  // cacheComponents: true,
  experimental: {
    viewTransition: true,
    inlineCss: true,
  },
  poweredByHeader: false,
  images: {
    formats: ['image/webp', 'image/avif'],
    // Optimize image caching and reduce Fast Origin Transfer
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year in seconds
    dangerouslyAllowSVG: true,
    qualities: [75, 85, 95],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimize ISR performance
  output: 'standalone',
  // Reduce the number of prerendered pages
  generateBuildId: async () => {
    // Use a stable build ID to reduce cache invalidation
    return 'stable-build-id'
  },
  // Enable compression
  compress: true,
};

export default withNextIntl(nextConfig);
