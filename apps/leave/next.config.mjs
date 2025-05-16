/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["database"],
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig 