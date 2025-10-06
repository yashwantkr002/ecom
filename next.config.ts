import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   allowedDevOrigins: [
    '10.141.153.217', // Your specific IP
    'localhost',      // Local development
    '127.0.0.1',      // Localhost IP
  ],
  eslint: {
    // ✅ This allows production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
