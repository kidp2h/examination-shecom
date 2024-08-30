/** @type {import('next').NextConfig} */
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
        port: '',
      },
    ],
  },
};

export default nextConfig;
