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
    domains: ['images.unsplash.com'], // Add any other domains you're loading images from
  },
  // Asset optimization options
  optimizeFonts: true,
  swcMinify: true,
  
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