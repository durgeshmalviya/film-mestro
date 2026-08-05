"use client"
 
import Head from "next/head";
 
import MaestroFilmsComplete from "./new/page";

export default function Home() {

  return (
    <>
      <Head>
        <title>Maestro Films | Film Production, Wedding Photography & Videography in India</title>
        <meta
          name="description"
          content="Maestro Films offers premium film production, wedding photography, and videography services in Bhopal, Indore, Mumbai, and across India. Specializing in weddings, ads, documentaries, music videos, and cinematic storytelling."
        />
        <meta
          name="keywords"
          content="Maestro Films, Film Production India, Wedding Photography India, Cinematic Videography, Advertisement Films, Corporate Video Production, Product Shoot Services, Music Video Production, Documentary Filmmakers, Drone Videography"
        />

        {/* Open Graph / Social Media Tags */}
        <meta property="og:title" content="Maestro Films | Film Production & Wedding Videography in India" />
        <meta
          property="og:description"
          content="Premium film production and photography services by Maestro Films. We specialize in weddings, ads, documentaries, music videos, and more across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maestrofilms.in" />
        <meta property="og:image" content="https://maestrofilms.in/mflog.png" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maestro Films | Film Production & Wedding Videography in India" />
        <meta
          name="twitter:description"
          content="Offering high-quality wedding, advertisement, and cinematic film services across India."
        />
        <meta name="twitter:image" content="https://maestrofilms.in/mflog.png" />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Maestro Films",
      "alternateName": "Sharda Photo Studio",
      "url": "https://maestrofilms.in",
      "logo": "https://maestrofilms.in/mflog.png",
      "description": "Premium film production and photography company in India, founded by Lt. Prem Solanki in 1982 as Sharda Photo Studio and relaunched in 2024 by Mr. Kamad Solanki as Maestro Films.",
      "telephone": ["+91-75818-00555", "+91-75820-05558"],
      "email": "Officialmaestrofilm@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "35, Laxmi Parisar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462039",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "06:00",
        "closes": "23:30"
      }],
      "areaServed": [
        { "@type": "City", "name": "Bhopal" },
        { "@type": "City", "name": "Indore" },
        { "@type": "City", "name": "Narmadapuram" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Pune" },
        { "@type": "City", "name": "Bangalore" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Kolkata" }
      ],
      "sameAs": [
        "https://www.instagram.com/maestrofilms.in/",
        "https://www.facebook.com/profile.php?id=61577981519394",
        "https://www.youtube.com/@maestrofilms-u8e"
      ]
    }
    `}
        </script>
      </Head> 
     <MaestroFilmsComplete/>
 
    </>
  );
}

