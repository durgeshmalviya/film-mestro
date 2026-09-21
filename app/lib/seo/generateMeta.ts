// lib/seo/generateMeta.ts
import { Metadata } from "next";

const siteUrl = "https://maestrofilms.co.in";
const siteName = "Maestro Films";
const defaultOgImage = "/og-image.jpg";

type GenerateMetaOptions = {
  title: string;
  description: string;
  path?: string;                    // e.g. "/locations/bhopal"
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  city?: string;                    // for local SEO
  type?: "website" | "article";
};

export function generateMeta({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = defaultOgImage,
  noIndex = false,
  city,
  type = "website",
}: GenerateMetaOptions): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonical = `${siteUrl}${path}`;
  const ogTitle = fullTitle.length > 60 ? title : fullTitle;

  // Auto-add city-specific keywords if city is provided
  const geoKeywords = city
    ? [
        `fashion photography ${city}`,
        `model portfolio ${city}`,
        `model photoshoot ${city}`,
        `editorial photography ${city}`,
        `lookbook photography ${city}`,
        `catalogue shoots ${city}`,
        `fashion photographer ${city}`,
      ]
    : [];

  const allKeywords = [
    ...keywords,
    ...geoKeywords,
    "fashion photography",
    "model portfolio",
    "editorial photography",
    "lookbook photography",
    "Maestro Films",
  ];

  return {
    title: {
      default: fullTitle,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: "en_IN",
      url: canonical,
      siteName,
      title: ogTitle,
      description,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
      creator: "@maestrofilms",
    },
    other: city
      ? {
          "geo.region": "IN",
          "geo.placename": city,
        }
      : undefined,
  };
}