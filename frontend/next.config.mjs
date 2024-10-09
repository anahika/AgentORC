/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*", // Matches any API requests
        destination: "http://127.0.0.1:5000/", // Proxies to your backend
      },
    ];
  },
};

export default nextConfig;
