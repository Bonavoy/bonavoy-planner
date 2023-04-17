/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['api.dicebear.com', 'banffnationalpark.com'], // banff one is temporary
  },
};

module.exports = nextConfig;
