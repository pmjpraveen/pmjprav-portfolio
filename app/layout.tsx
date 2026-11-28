import type { Metadata, Viewport } from "next";
import { Kalam } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "./lib/metadata";
import { SITE_URL } from "./lib/site";
import "./globals.css";

// Switzer is the only typeface on the site: headings, body, labels and
// buttons. Self-hosted from public/fonts and preloaded by next/font.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../public/fonts/switzer/Switzer-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
});

// Geist Pixel, Circle style (OFL), for the intro-call button only.
const geistPixel = localFont({
  variable: "--font-geist-pixel",
  display: "swap",
  src: [{ path: "../public/fonts/geist-pixel/GeistPixel-Circle.woff2", weight: "400", style: "normal" }],
});

// Kalam (OFL), a handwriting face for the case-study glance card's title and
// tags only. next/font downloads it at build time and serves it from this site.
const kalam = Kalam({
  variable: "--font-kalam",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "Praveenkumar", url: SITE_URL }],
  creator: "Praveenkumar",
  // Pages set their own share text (app/lib/metadata.ts); this is the fallback.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  // Two files, picked by the browser's colour scheme (the tab strip follows
  // the browser theme, not the site's own toggle): dark mark on light tabs,
  // light mark on dark tabs.
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
  },
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "#fcfcfb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} ${geistPixel.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        {modal}
      </body>
    </html>
  );
}
