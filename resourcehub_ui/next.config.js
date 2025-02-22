/** @type {import('next').NextConfig} */
const nextConfig = {
  output: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove middleware configuration since it's not supported in static export
};

module.exports = nextConfig;