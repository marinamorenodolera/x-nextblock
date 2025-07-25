import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PWA and Performance optimizations
  experimental: {
    ppr: false // Partial Prerendering disabled for PWA compatibility
  },
  
  // Image optimization
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'], // Twitter images
    formats: ['image/webp', 'image/avif']
  },
  
  // Service Worker support
  // Note: next-pwa v5 doesn't need special config, it auto-generates SW
  
  // Headers for PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
