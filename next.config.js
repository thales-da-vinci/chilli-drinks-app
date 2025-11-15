/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  generateBuildId: async () => {
    return 'chilli-drinks-build'
  }
}

module.exports = nextConfig