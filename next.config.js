/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: "enabled",
  },
};

module.exports = nextConfig;
