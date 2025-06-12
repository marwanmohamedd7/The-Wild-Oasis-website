/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uvgwetavenpawrmscsdx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
      // Add Google profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      // Add other Google image hostnames that might be used
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
