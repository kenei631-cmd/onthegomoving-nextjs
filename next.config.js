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
  // Workaround for Next.js 15.3.x SWC minifier bug that causes
  // "Cannot read properties of undefined (reading 'env')" during static export.
  // See: https://github.com/vercel/next.js/issues/79088
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};
module.exports = nextConfig;
