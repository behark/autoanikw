/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'], // Add any other domains you're loading images from
  },
  // Using default .next directory for Netlify compatibility
  distDir: '.next',
  // Ensure we generate a 404 page
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          destination: `/_404/:path*`,
        },
      ],
    }
  }
}

module.exports = nextConfig