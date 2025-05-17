import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://content.airhex.com/content/logos/**')],
  },
}

export default nextConfig
