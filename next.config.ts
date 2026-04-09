import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // REQUIRED for static export with next/image
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  } as any
};

export default nextConfig;
