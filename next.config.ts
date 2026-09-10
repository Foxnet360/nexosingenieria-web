import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy URL redirects
      {
        source: '/servicios',
        destination: '/soluciones',
        permanent: true,
      },
      {
        source: '/servicios/:path*',
        destination: '/soluciones/:path*',
        permanent: true,
      },
      // Common misspellings
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/soluciones',
        permanent: true,
      },
      // Old blog URLs
      {
        source: '/articulos/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // WWW to non-WWW
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.nexosingenieria.com',
          },
        ],
        destination: 'https://nexosingenieria.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
