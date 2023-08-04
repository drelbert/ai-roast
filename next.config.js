/** @type {import('next').NextConfig} */
const nextConfig = {
  // or deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
