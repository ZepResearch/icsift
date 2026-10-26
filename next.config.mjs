/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'conference.pockethost.io',
      'zep-research.pockethost.io',
    ],
    // Keep optimised images for 30 days instead of re-encoding them on every visit.
    minimumCacheTTL: 2592000,
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        // Match all routes except static files and images, which must stay cacheable for the gallery to load fast.
        source: '/((?!_next/static|_next/image|gallery/|assets/|co-org/|templates/|favicon.ico|preview.jpg).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
