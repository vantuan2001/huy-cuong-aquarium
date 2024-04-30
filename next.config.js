/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const withVideos = require("next-videos");

module.exports = withVideos();
module.exports = nextConfig;
