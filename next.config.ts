import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
