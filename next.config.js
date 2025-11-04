/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: __dirname
    }
  },
  output: 'standalone',
  trailingSlash: false,
  generateBuildId: async () => {
    return 'chilli-drinks-build'
  }
}

module.exports = nextConfig