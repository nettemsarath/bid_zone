import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.SUPABASE_STORAGE_URL || '').hostname,
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
