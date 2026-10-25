// Vercel injects the production hostname at build time, so the real domain is
// never hard-coded here. Set NEXT_PUBLIC_SITE_URL to override (e.g. a custom domain).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const EMAIL = "pmjprav@gmail.com";
