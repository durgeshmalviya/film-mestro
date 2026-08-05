import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.shutterstock.com',
      'yt3.ggpht.com',
      'i.ibb.co',
      'img.youtube.com',
      'img.freepik.com',
     
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
