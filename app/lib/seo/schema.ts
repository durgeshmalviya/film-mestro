// lib/seo/schema.ts
const SITE_URL = "https://maestrofilms.co.in";
const SITE_NAME = "Maestro Films";
const LOGO = `${SITE_URL}/icon-512.png`;
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// ---------- Global Schemas ----------
export function getOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
    },
    sameAs: [
      // Add your real social profiles
      "https://www.instagram.com/maestrofilms",
      // "https://www.facebook.com/maestrofilms",
      // "https://www.linkedin.com/company/maestrofilms",
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    telephone: "+91-XXXXXXXXXX", // ← replace with real number
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.2599,
      longitude: 77.4126,
    },
    areaServed: [
      { "@type": "City", name: "Bhopal" },
      { "@type": "City", name: "Indore" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Jaipur" },
      { "@type": "City", name: "Hoshangabad" },
      { "@type": "City", name: "Narmadapuram" },
      { "@type": "City", name: "Sehore" },
      { "@type": "City", name: "Vidisha" },
      { "@type": "City", name: "Dewas" },
      { "@type": "Place", name: "Misrod Bhopal" },
      { "@type": "Place", name: "Mandideep Bhopal" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fashion Photography Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fashion Photography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Model Portfolio Photography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Editorial & Lookbook Photography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Catalogue & Commercial Shoots" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fashion Reels & Influencer Content" } },
      ],
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------- Page-specific Schemas ----------
export function getServiceSchema({
  name,
  description,
  url,
  image = DEFAULT_IMAGE,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IN",
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ---------- Helper to combine everything ----------
export function createJsonLdGraph(schemas: Record<string, any>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}