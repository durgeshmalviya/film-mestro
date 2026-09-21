export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://maestrofilms.co.in/#organization",
        name: "Maestro Films",
        url: "https://maestrofilms.co.in",
        logo: {
          "@type": "ImageObject",
          url: "https://maestrofilms.co.in/icon-512.png",
        },
        sameAs: [
          "https://www.instagram.com/maestrofilms", // update
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://maestrofilms.co.in/#localbusiness",
        name: "Maestro Films",
        image: "https://maestrofilms.co.in/og-image.jpg",
        url: "https://maestrofilms.co.in",
        telephone: "+91-XXXXXXXXXX",
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
          "Bhopal", "Indore", "Mumbai", "Delhi", "Jaipur",
          "Hoshangabad", "Narmadapuram", "Misrod", "Mandideep",
          "Sehore", "Vidisha", "Dewas"
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
      },
      {
        "@type": "WebSite",
        "@id": "https://maestrofilms.co.in/#website",
        url: "https://maestrofilms.co.in",
        name: "Maestro Films",
        publisher: { "@id": "https://maestrofilms.co.in/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://maestrofilms.co.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}