/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  output: "export",
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Enable source maps for better debugging experience
    if (!isServer) {
      config.devtool = "eval-source-map";
    }

    // Add any other webpack configurations you need

    return config;
  },
};

module.exports = nextConfig;
