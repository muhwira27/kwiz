/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:lang/thumbnails/:path*',
        destination: '/thumbnails/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
