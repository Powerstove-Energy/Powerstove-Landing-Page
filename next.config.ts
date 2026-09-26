import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Links that exist in the Navbar/Footer but have no route yet.
      { source: "/buy", destination: "/products", permanent: false },
      { source: "/faqs", destination: "/contact-us", permanent: false },
      { source: "/contact", destination: "/contact-us", permanent: false },
    ];
  },
};

export default nextConfig;
