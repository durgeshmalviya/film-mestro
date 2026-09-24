import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Photography - Maestro Films | Fashion & E-commerce Product Shoots",
  description:
    "Product Photography by Maestro Films. Clean, commercial and lifestyle product shoots for fashion brands, e-commerce and catalogues across Bhopal, Indore, Mumbai, Delhi, Jaipur and nearby cities.",
  keywords: [
    "product photography",
    "fashion product photography",
    "e-commerce product shoot",
    "catalogue product photography",
    "product photography Bhopal",
    "product shoot Indore",
    "e-commerce photography Mumbai",
    "product photography Delhi",
    "fashion product shoot Jaipur",
    "Maestro Films product photography",
    "product photographer near me",
  ],
  openGraph: {
    title: "Product Photography - Maestro Films",
    description:
      "Clean commercial and lifestyle product photography for fashion brands and e-commerce.",
    url: "https://maestrofilms.co.in/product",
    siteName: "Maestro Films",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Photography - Maestro Films",
    description:
      "Commercial and lifestyle product photography for fashion and e-commerce brands.",
  },
  alternates: {
    canonical: "https://maestrofilms.co.in/product",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}