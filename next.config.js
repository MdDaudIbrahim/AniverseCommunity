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
    ],
    formats: ['image/avif', 'image/webp'],
    // For static export, use unoptimized images
    // Uncomment this when using output: 'export'
    // unoptimized: true,
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
}

module.exports = nextConfig
