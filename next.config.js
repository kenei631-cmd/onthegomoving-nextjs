/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure these packages are transpiled correctly for SSR
  transpilePackages: ['lucide-react', 'framer-motion'],
  // Allow images from CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.manus.space',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  // Trailing slash for SEO consistency
  trailingSlash: true,
};
module.exports = nextConfig;
