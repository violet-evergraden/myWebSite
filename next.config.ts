import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // Cloudflare Pages compatibility
  output: 'standalone',
};

export default nextConfig;
