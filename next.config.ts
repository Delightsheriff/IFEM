import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: { viewTransition: true },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [75, 88, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com https://*.sanity.io https://*.sanity.studio wss://*.sanity.io wss://*.sanity.studio",
              "frame-src 'self' https://*.google.com https://*.openstreetmap.org https://*.mapbox.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|svg|ico|webp|avif|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/guides", destination: "/news", permanent: true },
      {
        source: "/guides/:slug",
        destination: "/news-and-events/articles/:slug",
        permanent: true,
      },
      { source: "/news-and-events", destination: "/events", permanent: true },
    ];
  },
};

export default nextConfig;
