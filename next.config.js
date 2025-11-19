/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  generateBuildId: async () => {
    return 'chilli-drinks-build'
  }
}

module.exports = nextConfig