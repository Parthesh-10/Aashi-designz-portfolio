import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [80, 85, 88, 90],
  },
  async rewrites() {
    return [
      {
        source: '/service/ui-ux',
        destination: '/service/uiuxdesign',
      },
    ];
  },
};

export default nextConfig;
