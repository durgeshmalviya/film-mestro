'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://maestrofilms.in/#business",
        name: "Maestro Films",
        alternateName: "Croma Shoot",
        description:
          "Premier fashion photography and cinematic film production house in Bhopal and Mumbai. Specializing in editorial shoots, portfolio development, brand campaigns, and commercial filmmaking since 1982.",
        url: "https://maestrofilms.in",
        telephone: ["+91-75818-00555", "+91-75820-05558"],
        email: "Officialmaestrofilm@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "35, Laxmi Parisar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony",
          addressLocality: "Bhopal",
          addressRegion: "Madhya Pradesh",
          postalCode: "462039",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "23.1864396",
          longitude: "77.4364127",
        },
        founder: {
          "@type": "Person",
          name: "Kamad Solanki",
          jobTitle: "Director & Fashion Photographer",
        },
        foundingDate: "1982",
        areaServed: [
          { "@type": "City", name: "Bhopal" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "State", name: "Madhya Pradesh" },
        ],
        serviceType: [
          "Fashion Photography",
          "Editorial Photography",
          "Portfolio Shoots",
          "Brand Campaigns",
          "Commercial Filmmaking",
          "Product Photography",
        ],
        openingHours: "Mo-Su 06:00-23:30",
        priceRange: "$$",
      },
      {
        "@type": "Organization",
        name: "Maestro Films",
        sameAs: [
          "https://www.instagram.com/maestrofilms.in/",
          "https://www.facebook.com/profile.php?id=61577981519394",
          "https://youtube.com/@maestrofilms-u8e",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <footer
        itemScope
        itemType="https://schema.org/LocalBusiness"
        className="bg-[#f5f1ed] text-[#3d3429] pt-5 md:pt-5 pb-4 px-5 md:px-10 lg:px-16 font-body"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 mb-14">

            {/* Brand */}
            <div className="md:col-span-4 text-center md:text-left">
              <div itemProp="name" className="font-body text-4xl md:text-5xl text-[#a68b6a] mb-2 leading-none">
                Maestro
              </div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-light mb-6">
                EXCLUSIVELY FOR THE FASHION INDUSTRY
              </p>

              <p itemProp="description" className="text-[14px] leading-relaxed text-gold font-light max-w-sm mb-6">
                High-end fashion photography and cinematic production based in{" "}
                <span itemProp="areaServed">Bhopal</span> & Mumbai.

              </p><p className=" mb-2 text-[12px] tracking-[0.22em] uppercase text-[#a68b6a] opacity-80">
                Fashion • Beauty • Jewellery
              </p>

              <div className="flex gap-3 justify-center md:justify-start">
                {[
                  { href: "https://www.instagram.com/maestrofilms.in/", icon: FaInstagram, label: "Instagram" },
                  { href: "https://www.facebook.com/profile.php?id=61577981519394", icon: FaFacebook, label: "Facebook" },
                  { href: "https://youtube.com/@maestrofilms-u8e", icon: FaYoutube, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-[#d9cfc3] flex items-center justify-center text-[#8a7a6a] hover:text-[#a68b6a] hover:border-[#a68b6a] transition-all duration-300"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Portfolio Links */}
            <div className="md:col-span-3">
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-medium mb-6">
                Portfolio
              </p>
              <ul className="space-y-3 text-[14px] text-gold font-light">
                <li>
                  <Link href="/catalog" className="hover:text-[#a68b6a] transition-colors duration-300">
                    Catalogues
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-campaign" className="hover:text-[#a68b6a] transition-colors duration-300">
                    Editorial & Campaign
                  </Link>
                </li>
                <li>
                  <Link href="/high-fashion" className="hover:text-[#a68b6a] transition-colors duration-300">
                    High Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/product-commercial" className="hover:text-[#a68b6a] transition-colors duration-300">
                    Product & Commercial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-medium mb-6">
                Explore
              </p>
              <ul className="space-y-3 text-[14px] text-gold font-light">
                <li>
                  <Link href="/#about" className="hover:text-[#a68b6a] transition-colors duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-[#a68b6a] transition-colors duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#a68b6a] transition-colors duration-300">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-medium mb-6">
                Contact
              </p>

              <div className="space-y-4 text-[14px] text-gold font-light">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#a68b6a] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <a href="tel:+917581800555" className="hover:text-[#a68b6a] transition-colors">
                    +91 75818 00555
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#a68b6a] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <a
                    href="mailto:Officialmaestrofilm@gmail.com"
                    itemProp="email"
                    className="hover:text-[#a68b6a] transition-colors break-all"
                  >
                    Officialmaestrofilm@gmail.com
                  </a>
                </div>

                <div
                  className="flex items-start gap-3"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-4 h-4 text-[#a68b6a] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-relaxed text-[13px]">
                    <span itemProp="streetAddress">35, Laxmi Parisar, Rohit Nagar</span>,{" "}
                    <span itemProp="addressLocality">Bhopal</span>,{" "}
                    <span itemProp="addressRegion">MP</span>{" "}
                    <span itemProp="postalCode">462039</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#a68b6a] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span itemProp="openingHours" content="Mo-Su 06:00-23:30">
                    Mon – Sun · 6:00 AM – 11:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden AEO FAQ for search engines */}
          <div className="sr-only" aria-hidden="true">
            <h2>Frequently Asked Questions – Maestro Films</h2>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Who is the founder of Maestro Films?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Maestro Films was founded as Sharda Photo Studio in 1982 by Lt. Prem Solanki.
                  His son Kamad Solanki launched Maestro Films in 2024.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">What services does Maestro Films offer?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Fashion photography, editorial shoots, lookbooks, brand campaigns,
                  product photography, and commercial films in Bhopal and Mumbai.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Where is Maestro Films located?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  35, Laxmi Parisar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony,
                  Bhopal, Madhya Pradesh 462039. Also operates in Mumbai.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#e8dfd4] pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-[#8a7a6a] font-light tracking-wider">
              © 2025–26 Maestro Films. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/privacy-policy"
                className="text-[11px] text-[#8a7a6a] hover:text-[#a68b6a] transition-colors tracking-wider"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[11px] text-[#8a7a6a] hover:text-[#a68b6a] transition-colors tracking-wider"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/faq"
                className="text-[11px] text-[#8a7a6a] hover:text-[#a68b6a] transition-colors tracking-wider"
              >
                FAQ
              </Link>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#8a7a6a] font-light">
                Fashion Photography · Bhopal & Mumbai
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}