/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Ensure these packages are transpiled correctly
  transpilePackages: ['lucide-react', 'framer-motion'],
  // Static export requires unoptimized images
  images: {
    unoptimized: true,
  },
  // Trailing slash for SEO consistency
  trailingSlash: true,
};
module.exports = nextConfig;
