import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['ws'],
  images: {
    // Local /uploads images need no entry; this allows admin-pasted external
    // image URLs (any HTTPS host) to be optimized by next/image.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
