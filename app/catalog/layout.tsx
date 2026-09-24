import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog Photography - Maestro Films | Fashion Lookbooks & Catalogues",
  description:
    "Premium Catalog Photography by Maestro Films. Elegant fashion lookbooks, seasonal collections and brand catalogues for designers across Bhopal, Indore, Mumbai, Delhi & Jaipur.",
  keywords: [
    "catalog photography",
    "catalogue photography",
    "fashion catalog",
    "lookbook photography",
    "fashion photography Bhopal",
    "catalog shoot Indore",
    "fashion catalogue Mumbai",
    "Maestro Films",
  ],
  openGraph: {
    title: "Catalog Photography - Maestro Films",
    description: "Elegant fashion catalogs and lookbooks crafted with precision.",
    url: "https://maestrofilms.co.in/catalog",
    siteName: "Maestro Films",
    type: "website",
  },
  alternates: {
    canonical: "https://maestrofilms.co.in/catalog",
  },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}