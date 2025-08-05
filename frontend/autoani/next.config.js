/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // For static export
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'], // Add any other domains you're loading images from
  },
  // Remove rewrites for static export since they aren't compatible
  // with static export and the output: 'export' option
  // Remove the target: 'serverless' as it's deprecated
}

module.exports = nextConfig