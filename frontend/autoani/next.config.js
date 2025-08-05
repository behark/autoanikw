/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'], // Add any other domains you're loading images from
  },
  distDir: 'out'
}

module.exports = nextConfig