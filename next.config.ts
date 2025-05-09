import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  output: "standalone", 
  serverRuntimeConfig: {
    port: 3001, 
  },
};

export default nextConfig;
