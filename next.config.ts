import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Notion uploaded images
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },

      // Cloudflare R2
      {
        protocol: "https",
        hostname: "pub-b289a32534284964b865f90fc9d138d6.r2.dev",
        pathname: "/**",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // Images from your own domain
      {
        protocol: "https",
        hostname: "amarbiradar.me",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;