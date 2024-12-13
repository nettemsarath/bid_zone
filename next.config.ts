import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'debkngddbucqramqpexr.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
