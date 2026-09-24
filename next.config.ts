import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 cacheComponents: true,          // enables 'use cache' + better PPR-style behavior
  partialPrefetching: true,
  allowedDevOrigins: ["192.168.29.129"],
experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react', 'date-fns', /* your icon/utils libs */],
    // turbopack options if needed
  },
  images: {
    remotePatterns: [
    
      {
        protocol: "https",
        hostname: "bitbucket.org",
      },
       
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      }, 
    ],
  },
};

export default nextConfig;