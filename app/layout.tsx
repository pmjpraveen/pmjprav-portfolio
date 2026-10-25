import type { Metadata, Viewport } from "next";
import { Faculty_Glyphic, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "./components/layout/Footer";
import { Dock } from "./components/layout/Dock";
import { SectionBar } from "./components/layout/SectionBar";
import { ThemeToggle } from "./components/layout/ThemeToggle";
import { Preloader } from "./components/preloader/Preloader";
import { CustomCursor } from "./components/ui/CustomCursor";
import { LinkSound } from "./components/ui/LinkSound";
import { SITE_URL } from "./lib/site";
import "./globals.css";

// Runs before hydration so the page never flashes the wrong theme: the Enigma
// theme (data-theme="dark") unless the visitor has pulled the cord to daylight,
// which ThemeToggle stores. Written onto <html> synchronously, pre-paint.
const THEME_INIT_SCRIPT = `(function(){var t='dark';try{if(localStorage.getItem('site-theme')==='light'){t='light';}}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;

// Faculty Glyphic (display serif, headlines), Geist (body) and Geist Mono (labels),
// all open-source and self-hosted at build time via next/font: no runtime request.
const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty",
  subsets: ["latin"],
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Praveenkumar",
    title: "Praveenkumar — Product designer & design engineer",
    description:
      "Praveenkumar is a product designer and design engineer in Bengaluru. Case studies in developer tools and enterprise software, plus side projects and AI explorations, designed and built by Praveenkumar.",
  },
  twitter: { card: "summary_large_image" },
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
    default: "Praveenkumar — Product designer & design engineer",
    template: "%s — Praveenkumar",
  },
  description:
    "Praveenkumar is a product designer and design engineer in Bengaluru. Case studies in developer tools and enterprise software, plus side projects and AI explorations, designed and built by Praveenkumar.",
};

export const viewport: Viewport = {
  // The Enigma theme is the default; ThemeToggle updates this if the cord is pulled.
  themeColor: "#131313",
  colorScheme: "dark light",
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
      // Dark from the first byte of HTML, with no script needed. The script below only
      // switches to daylight for a visitor who has chosen it.
      data-theme="dark"
      suppressHydrationWarning
      className={`${facultyGlyphic.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        <LinkSound />
        <Preloader>
          <SectionBar />
          <ThemeToggle />
          {children}
          <Footer />
          {/* Room for the fixed dock, so it never covers the footer's last row. */}
          <div aria-hidden="true" className="h-14 bg-black pb-[env(safe-area-inset-bottom)]" />
          <Dock />
        </Preloader>
        {modal}
      </body>
    </html>
  );
}
