import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async headers() {
    return [
      {
        // The PDF carries a personal phone number: keep it out of search results.
        source: "/resume.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
