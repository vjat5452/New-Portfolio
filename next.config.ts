import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.149", "192.168.1.247", "localhost", "127.0.0.1"],
  images: { remotePatterns: [] },
};

export default nextConfig;
