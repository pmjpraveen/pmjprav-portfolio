import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Preloader } from "./components/preloader/Preloader";
import "./globals.css";

// Geist Mono isn't present in public/fonts, so it's loaded via
// next/font/google (self-hosted at build time, no runtime request).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

// Switzer is self-hosted from public/fonts/switzer. Only Light/Regular/Medium
// (300/400/500) exist on disk — that also matches the type spec, which never
// calls for a heavier weight.
const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  src: [
    { path: "../public/fonts/switzer/Switzer-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Praveenkumar — Lead UX / Product Designer",
    template: "%s — Praveenkumar",
  },
  description: "Portfolio of Praveenkumar, a Lead UX / Product Designer.",
};

export const viewport: Viewport = {
  themeColor: "#fdfcfc",
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
      className={`${switzer.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Preloader>
          <Header />
          {children}
          <Footer />
        </Preloader>
        {modal}
      </body>
    </html>
  );
}
