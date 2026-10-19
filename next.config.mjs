import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
      },
      {
        protocol: 'https',
        hostname: 'dam.mediacorp.sg',
      },
      {
        protocol: 'https',
        hostname: 'media-cldnry.s-nbcnews.com',
      },
      {
        protocol: 'https',
        hostname: 'theminutefeed.com',
      },
      {
        protocol: 'https',
        hostname: 'usflashfeed.com',
      },
      {
        protocol: 'https',
        hostname: 'usflashnews.com',
      },
      {
        protocol: 'https',
        hostname: 'www.usflashnews.com',
      },
      {
        protocol: 'https',
        hostname: 'www.usflashfeed.com',
      },
      {
        protocol: 'https',
        hostname: 'www.theminutefeed.com',
      },
      {
        protocol: 'https',
        hostname: 'pulefeed.tech',
      },
      {
        protocol: 'https',
        hostname: 'www.pulefeed.tech',
      },
      {
        protocol: 'https',
        hostname: 'www.aljazeera.com',
      },
      {
        protocol: 'https',
        hostname: 'aljazeera.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/media/file/:path*',
        destination: '/media/:path*',
      },
    ]
  },
}

export default withPayload(nextConfig)
