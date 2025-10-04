import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   allowedDevOrigins: [
    '10.141.153.217', // Your specific IP
    'localhost',      // Local development
    '127.0.0.1',      // Localhost IP
  ],
};

export default nextConfig;
