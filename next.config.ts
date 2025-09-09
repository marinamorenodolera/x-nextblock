import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages static export
  output: 'export',
  trailingSlash: true,
  basePath: '/x-nextblock',
  assetPrefix: '/x-nextblock/',
  
  // PWA and Performance optimizations
  experimental: {
    ppr: false // Partial Prerendering disabled for PWA compatibility
  },
  
  // Image optimization - disabled for static export
  images: {
    unoptimized: true
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
