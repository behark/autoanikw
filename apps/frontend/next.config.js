/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  i18n,
  // Static export disabled for development to allow i18n to work
  // output: 'export',
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com', // Add Cloudinary domain for image uploads
      'cloudinary.com'
    ],
  },
  // Asset optimization options
  optimizeFonts: true,
  swcMinify: true,
  
  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  
  // Improve CSS processing
  webpack: (config) => {
    // Improve CSS loading
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use) && rule.use.find((use) => use && use.loader && use.loader.includes('css-loader')));
    
    if (rules) {
      rules.forEach((rule) => {
        rule.use.forEach((use) => {
          if (use && use.loader && use.loader.includes('css-loader')) {
            use.options = {
              ...use.options,
              importLoaders: 1,
            };
          }
        });
      });
    }
    
    return config;
  },
}

module.exports = nextConfig