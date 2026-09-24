import { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Fashion Photography - Maestro Films | Editorial & Runway Style",
  description:
    "High Fashion Photography by Maestro Films. Bold editorial, couture and runway-inspired imagery for designers, models and luxury brands across Bhopal, Indore, Mumbai, Delhi and Jaipur.",
  keywords: [
    "high fashion photography",
    "editorial fashion photography",
    "couture photography",
    "runway photography",
    "high fashion shoot Bhopal",
    "fashion photography Indore",
    "luxury fashion photography Mumbai",
    "editorial photography Delhi",
    "Maestro Films high fashion",
  ],
  openGraph: {
    title: "High Fashion Photography - Maestro Films",
    description:
      "Bold editorial and high fashion imagery crafted for designers and luxury brands.",
    url: "https://maestrofilms.co.in/high-fashion",
    siteName: "Maestro Films",
    type: "website",
  },
  alternates: {
    canonical: "https://maestrofilms.co.in/high-fashion",
  },
};

export default function HighFashionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}