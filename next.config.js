/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment this line for static export (manual deployment)
//   output: 'export',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    // For static export, use unoptimized images
    // Uncomment this when using output: 'export'
    // unoptimized: true,
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  // experimental: {
  //   optimizeCss: true,
  // },
}

module.exports = nextConfig
