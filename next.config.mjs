/** @type {import('next').NextConfig} */
const nextConfig = {
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
