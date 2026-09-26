import { MetadataRoute } from "next";

const siteUrl = "https://maestrofilms.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    "",
    "/Kamad-Solanki",
    "/service",
    "/work-studio",
    "/fashion-photography",
    "/social-media-marketing",
    "/editorial-lookbook",
    "/catalogue-commercial",
    "/blog",
    "/catalog",
    "/editorial-campaign",
    "/high-fashion",
    "/product-commercial",
    "/fashion-photography-bhopal",
    "/contact",
    "/faq",
    "/locations/bhopal",
    "/locations/indore",
    "/locations/mumbai",
    "/locations/delhi",
    "/locations/jaipur",
    "/locations/hoshangabad-narmadapuram",
    "/locations/sehore-vidisha-dewas",
    "/privacy-policy",
    "/terms",
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path.startsWith("/locations") ? 0.9 : 0.8,
  }));
}