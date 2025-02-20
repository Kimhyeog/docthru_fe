/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/challenges",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
