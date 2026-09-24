import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Photography - Maestro Films | Fashion Editorial Shoots",
  description:
    "Editorial Photography by Maestro Films. Cinematic fashion editorials, storytelling campaigns and magazine-style imagery for designers, models and brands in Bhopal, Indore, Mumbai, Delhi, Jaipur and nearby cities.",
  keywords: [
    "editorial photography",
    "fashion editorial",
    "editorial shoot",
    "fashion editorial photography",
    "editorial photography Bhopal",
    "fashion editorial Indore",
    "editorial shoot Mumbai",
    "magazine photography Delhi",
    "fashion storytelling Jaipur",
    "Maestro Films editorial",
    "editorial photographer near me",
  ],
  openGraph: {
    title: "Editorial Photography - Maestro Films",
    description:
      "Cinematic fashion editorials and storytelling imagery for designers and luxury brands across India.",
    url: "https://maestrofilms.co.in/editorial",
    siteName: "Maestro Films",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Photography - Maestro Films",
    description:
      "Cinematic fashion editorials and storytelling campaigns by Maestro Films.",
  },
  alternates: {
    canonical: "https://maestrofilms.co.in/editorial",
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

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}