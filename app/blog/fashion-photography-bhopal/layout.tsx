import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Fashion Photography in Bhopal | Fashion Photographer & Model Portfolio | Maestro Films",

  description:
    "Maestro Films provides premium fashion photography in Bhopal for models, designers, fashion brands and agencies. Model portfolios, editorial, lookbook, catalogue, commercial campaigns, beauty, jewellery and fashion reels.",

  keywords: [
    "fashion photography Bhopal",
    "fashion photographer Bhopal",
    "fashion photographer in Bhopal",
    "fashion photography in Bhopal",
    "model portfolio Bhopal",
    "model portfolio photographer Bhopal",
    "model photography Bhopal",
    "model photoshoot Bhopal",
    "fashion shoot Bhopal",
    "fashion photoshoot Bhopal",
    "editorial photography Bhopal",
    "editorial fashion photographer Bhopal",
    "lookbook photography Bhopal",
    "catalogue photography Bhopal",
    "commercial fashion photography Bhopal",
    "fashion campaign Bhopal",
    "beauty photography Bhopal",
    "jewellery photography Bhopal",
    "fashion reels Bhopal",
    "fashion photographer Misrod",
    "fashion photographer Mandideep",
    "fashion photography Misrod",
    "fashion photography Mandideep",
    "Maestro Films Bhopal",
  ],

  alternates: {
    canonical:
      "https://maestrofilms.co.in/blog/fashion-photography-bhopal",
  },

  openGraph: {
    type: "article",

    url:
      "https://maestrofilms.co.in/blog/fashion-photography-bhopal",

    siteName: "Maestro Films",

    locale: "en_IN",

    title:
      "Fashion Photography in Bhopal | Maestro Films",

    description:
      "Premium fashion photography in Bhopal for models, designers, brands and agencies — model portfolios, editorials, lookbooks, catalogues, campaigns and fashion reels.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "Maestro Films — Fashion Photography in Bhopal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Fashion Photography in Bhopal | Maestro Films",

    description:
      "Model portfolios, editorials, lookbooks, catalogues, campaigns and fashion reels in Bhopal.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function FashionPhotographyBhopalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}