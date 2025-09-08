/** @type {import('next').NextConfig} */

const nextConfig = {
  // Image Optimization 설정
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/codecamp-file-storage/**',
      },
    ],
  },
};

export default nextConfig;

// http://storage.googleapis.com/codecamp-file-storage/2024/1/10/IMG_9472.jpeg
