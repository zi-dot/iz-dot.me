/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  experimental: {
    swcTraceProfiling: true,
    swcMinify: true,
  },
};

module.exports = nextConfig;
