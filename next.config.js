/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 显式指定构建目录，确保 Vercel 识别
  distDir: '.next',
};

module.exports = nextConfig;