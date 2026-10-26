import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the root so Turbopack never picks up a parent folder's lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    // The paths on the church's current site, so saved links still land somewhere.
    return [
      { source: "/welcome", destination: "/", permanent: true },
      { source: "/what-to-expect", destination: "/visit", permanent: true },
      { source: "/pastor", destination: "/about#pastor", permanent: true },
      { source: "/history", destination: "/about#history", permanent: true },
      { source: "/beliefs", destination: "/about/beliefs", permanent: true },
      { source: "/gallery", destination: "/about/rebuild", permanent: true },
      { source: "/give-online", destination: "/give", permanent: true },
      { source: "/service-times", destination: "/visit", permanent: true },
    ];
  },
};

export default nextConfig;
