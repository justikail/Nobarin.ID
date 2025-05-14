/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "cdn.myanimelist.net",
      },
      {
        hostname: "icdn.store",
      },
    ],
  },
};

export default nextConfig;
