/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Normally this tells next.js to use static export mode, which is not compatible with dynamic server features like auth() and middleware.ts
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
