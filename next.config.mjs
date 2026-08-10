/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
