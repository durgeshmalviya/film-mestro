import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maestro Film�s ",
  description: " ",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  
  return (
    <html lang="en">
      <head>
        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
 {/* Google Ads Global Tag */}
       
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        < Analytics/>
      </body>
    </html>
  );
}
