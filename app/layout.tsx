import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import SecurityGuard from "@/app/components/SecurityGuard"; // ← create this file (code below)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://maestrofilms.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maestro Films | Fashion Photography & Premium Campaigns",
    template: "%s | Maestro Films",
  },
  description:
    "Maestro Films – Exclusively for the Fashion Industry. High-end fashion photography, beauty & jewellery shoots, social media systems, Meta & Google ads, and full production for models, agencies and luxury brands.",
  keywords: [
    "fashion photography",
    "editorial photography",
    "fashion films",
    "model portfolio",
    "beauty photography",
    "jewellery photography",
    "premium ads",
    "Meta ads fashion",
    "Google ads fashion",
    "Maestro Films",
    "fashion production",
    "lookbook photography",
  ],
  authors: [{ name: "Maestro Films", url: siteUrl }],
  creator: "Maestro Films",
  publisher: "Maestro Films",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Maestro Films",
    title: "Maestro Films | Fashion Photography & Premium Campaigns",
    description:
      "Exclusively for the Fashion Industry. High-end editorial shoots, social systems, Meta & Google ads, and full production for models, agencies and luxury brands.",
    images: [
      {
        url: "/og-image.jpg", // ← put a good OG image in /public
        width: 1200,
        height: 630,
        alt: "Maestro Films – Fashion Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestro Films | Fashion Photography & Premium Campaigns",
    description:
      "Exclusively for the Fashion Industry. High-end fashion, beauty & jewellery photography and premium campaigns.",
    images: ["/og-image.jpg"],
    creator: "@maestrofilms", // update if you have a real handle
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Fashion Photography",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f1ed] text-[#1a1a1a]">
        {/* Security layer – disables right-click, DevTools shortcuts, image saving */}
        <SecurityGuard/>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}