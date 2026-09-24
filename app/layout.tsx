import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import SecurityGuard from "@/app/components/SecurityGuard";

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
    default: "Maestro Films | Fashion Photography, Model Portfolio & Premium Campaigns – Bhopal, Indore, Mumbai, Delhi, Jaipur",
    template: "%s | Maestro Films",
  },
  description:
    "Maestro Films – Premium fashion photography, model portfolio shoots, editorial & lookbook photography, catalogue, commercial, product & campaign shoots in Bhopal, Indore, Mumbai, Delhi, Jaipur, Hoshangabad, Narmadapuram, Misrod, Mandideep, Sehore, Vidisha & Dewas. High-end beauty, jewellery, outdoor/indoor shoots, reels, influencer & social media content for models, agencies & luxury brands.",
  keywords: [
    // Core
    "fashion photography",
    "fashion photographer",
    "model portfolio photography",
    "modeling shoots",
    "editorial photography",
    "editorial shoots",
    "high fashion photography",
    "lookbook photography",
    "catalogue photography",
    "catalog shoots",
    "commercial fashion photography",
    "product photography with model",
    "product shoots",
    "campaign photography",
    "fashion campaign shoots",
    "beauty photography",
    "jewellery photography",
    "outdoor fashion shoots",
    "indoor studio shoots",
    "model photoshoot",
    "fashion model photography",
    // Social / Reels / Influencer
    "fashion reels creator",
    "reels maker for fashion",
    "influencer shoots",
    "reel marketing",
    "reels shoots",
    "Instagram product photography",
    "social media fashion content",
    "Meta ads fashion",
    "Google ads fashion",
    
    "fashion photography Bhopal",
    "fashion photographer Bhopal",
    "model photoshoot Bhopal",
    "fashion photography Indore",
    "model portfolio Indore",
    "fashion photography Mumbai",
    "fashion photographer Mumbai",
    "fashion photography Bombay",
    "fashion photography Delhi",
    "model photography Delhi",
    "fashion photography Jaipur",
    "fashion photographer Jaipur",
    "fashion photography Hoshangabad",
    "fashion photography Narmadapuram",
    "fashion photography Misrod Bhopal",
    "fashion photography Mandideep",
    "fashion photography Sehore",
    "fashion photography Vidisha",
    "fashion photography Dewas",
    "model shoots Bhopal Indore",
    "catalogue shoots Bhopal",
    "editorial shoots Indore",
    "lookbook photography Mumbai",
    "commercial shoots Delhi",
    "product marketing photography Jaipur",
    // Brand + related
    "Maestro Films",
    "Maestro Films Bhopal",
    "premium fashion production",
    "luxury brand photography India",
    "model agency photography",
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
    title: "Maestro Films | Fashion Photography & Premium Campaigns – Bhopal • Indore • Mumbai • Delhi • Jaipur",
    description:
      "High-end fashion, beauty, jewellery, model portfolio, editorial, lookbook, catalogue, commercial & campaign photography. Serving Bhopal, Indore, Mumbai, Delhi, Jaipur, Hoshangabad, Narmadapuram, Misrod, Mandideep, Sehore, Vidisha & Dewas. Full production + reels & social systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maestro Films – Fashion Photography & Model Portfolio Shoots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestro Films | Fashion Photography & Premium Campaigns",
    description:
      "Exclusively for the Fashion Industry. High-end editorial, lookbook, catalogue, commercial, product & campaign shoots + reels across Bhopal, Indore, Mumbai, Delhi, Jaipur & nearby cities.",
    images: ["/og-image.jpg"],
    creator: "@maestrofilms",
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
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Bhopal, Indore, Mumbai, Delhi, Jaipur",
    "geo.position": "23.2599;77.4126", // approximate Bhopal centre – update with exact studio coords if available
    "ICBM": "23.2599, 77.4126",
  },
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
    ><head>
      <meta name="google-site-verification" content="_-1gHTUFcWg_33_XZpZl4IfpUI7z6lcvD2H2U5x3xvQ" />
    </head>
      <body className="min-h-full flex flex-col bg-[#f5f1ed] text-[#1a1a1a]">
        <SecurityGuard />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}