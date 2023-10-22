/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        pathname: "/**",
        port: "",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
