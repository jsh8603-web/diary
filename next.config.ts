import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // Firebase Storage remote patterns - ready for when server-side image optimization is enabled
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  // Enable React strict mode for better development experience and catching potential issues
  reactStrictMode: true,
};

export default nextConfig;
