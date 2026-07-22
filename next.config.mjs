/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.batyspestcontrol.com' }],
        destination: 'https://batyspestcontrol.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
