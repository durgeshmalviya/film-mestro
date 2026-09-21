import { MetadataRoute } from "next";

const siteUrl = "https://maestrofilms.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/fashion-photography",
    "/model-portfolio",
    "/editorial-lookbook",
    "/catalogue-commercial",
    "/reels-influencer",
    "/contact",
    "/locations/bhopal",
    "/locations/indore",
    "/locations/mumbai",
    "/locations/delhi",
    "/locations/jaipur",
    "/locations/hoshangabad-narmadapuram",
    "/locations/sehore-vidisha-dewas",
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path.startsWith("/locations") ? 0.9 : 0.8,
  }));
}