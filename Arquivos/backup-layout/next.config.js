/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'lnqmzpjlhvbvhfmvuqzj.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  // Forçar todas as páginas como server-side
  experimental: {
    isrMemoryCacheSize: 0,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'portal-maria-helena.vercel.app']
    }
  },
  // Desabilitar coleta de build traces
  generateBuildId: () => 'build',
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = nextConfig
