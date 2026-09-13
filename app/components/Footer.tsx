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
          description:
            "Fashion photographer based in Bhopal and Mumbai specializing in editorial and commercial photography.",
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
          "Modeling Shoots",
          "Product Photography",
          "Cinematic Video Production",
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
        className="bg-[#f5f1ed] text-[#3d3429] pt-5 md:pt-5 pb-8 px-5 md:px-10 lg:px-16 font-body selection:bg-[#c9a86c]/20 selection:text-[#3d3429]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-12 mb-20">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5"
            >
              <div
                itemProp="name"
                className="font-body text-5xl md:text-6xl text-[#a68b6a] mb-2 leading-none"
              >
                Maestro
              </div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-gold font-light mb-8">
                Fashion Photography & Films
              </p>

              <p
                itemProp="description"
                className="text-[15px] leading-[1.85] text-gold font-light max-w-sm mb-8"
              >
                High-end fashion photography and cinematic production based in{" "}
                <span itemProp="areaServed" className="text-[#3d3429]">
                  Bhopal
                </span>{" "}
                & <span className="text-[#3d3429]">Mumbai</span>.
                Editorial portfolios, brand campaigns, and commercial work crafted
                to elevate your image.
              </p>

              <div className="flex gap-3">
                {[
                  {
                    href: "https://www.instagram.com/maestrofilms.in/",
                    icon: FaInstagram,
                    label: "Instagram",
                  },
                  {
                    href: "https://www.facebook.com/profile.php?id=61577981519394",
                    icon: FaFacebook,
                    label: "Facebook",
                  },
                  {
                    href: "https://youtube.com/@maestrofilms-u8e",
                    icon: FaYoutube,
                    label: "YouTube",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-[#d9cfc3] flex items-center justify-center text-[#8a7a6a] hover:text-[#a68b6a] hover:border-[#a68b6a] hover:bg-[#f0eae2] transition-all duration-400 hover:scale-105"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Core Work – Fashion Photography Focused */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-3"
            >
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-medium mb-7">
                Core Work
              </p>
              <ul className="space-y-3.5 text-[14px] text-gold font-light">
                {[
                  { label: "Editorial", href: "/editorial" },
                  { label: "Lookbook", href: "/lookbook" },
                  { label: "Fashion Photography", href: "/fashion-photography" },
                  { label: "Beauty", href: "/beauty" },
                  { label: "Campaign", href: "/campaign" },
                  { label: "Product Shoot", href: "/product" },
                  { label: "Model Portfolio Development", href: "/contact" },
                  { label: "Luxury Brand Campaigns", href: "/campaign" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-[#a68b6a] transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Book a Session */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-4"
            >
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-medium mb-7">
                Book a Session
              </p>

              <div className="space-y-5 text-[14px] text-[#5c5346] font-light">
                <div className="flex items-start gap-3.5 group">
                  <Phone className="w-4 h-4 text-[#a68b6a] mt-0.5 group-hover:text-gold  transition-colors flex-shrink-0" strokeWidth={1.5} />
                  <div>

                    <a
                      href="tel:+917581800555"
                      className="block text-gold hover:text-gold transition-colors mt-0.5"
                    >
                      +91 75818 00555
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group">
                  <Mail className="w-4 h-4 text-[#a68b6a] mt-0.5 group-hover:text-[#8a6b4a] transition-colors flex-shrink-0" strokeWidth={1.5} />
                  <a
                    href="mailto:Officialmaestrofilm@gmail.com"
                    itemProp="email"
                    className="hover:text-[#a68b6a] text-gold transition-colors break-all"
                  >
                    Officialmaestrofilm@gmail.com
                  </a>
                </div>

                <div
                  className="flex items-start gap-3.5 group  text-gold"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-4 h-4 text-gold mt-0.5 group-hover:text-gold transition-colors flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-relaxed ">
                    <span itemProp="streetAddress">
                      35, Laxmi Parisar, Rohit Nagar
                    </span>
                    ,{" "}
                    <span itemProp="addressLocality">
                      Bawadiya Kalan, Gulmohar Colony
                    </span>
                    ,{" "}
                    <span itemProp="addressLocality">Bhopal</span>,{" "}
                    <span itemProp="addressRegion">MP</span>{" "}
                    <span itemProp="postalCode">462039</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 group text-gold">
                  <Clock className="w-4 h-4 text-gold mt-0.5 group-hover:text-gold transition-colors flex-shrink-0" strokeWidth={1.5} />
                  <span itemProp="openingHours" content="Mo-Su 06:00-23:30">
                    Mon – Sun · 6:00 AM – 11:30 PM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hidden AEO / GEO FAQ */}
          <div className="sr-only" aria-hidden="true">
            <h2>About Maestro Films</h2>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Who is the founder of Maestro Films?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Maestro Films was originally founded as Sharda Photo Studio in
                  1982 by Lt. Prem Solanki in Hoshangabad. After his passing in
                  2014, his son Mr. Kamad Solanki launched Maestro Films in 2024.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">What services does Maestro Films offer?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Maestro Films offers high fashion editorials, campaign and lookbook shoots, model portfolio development, celebrity portraits, luxury brand campaigns, runway and fashion film, beauty imagery, and e-commerce fashion photography in Bhopal and Mumbai.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Where is Maestro Films located?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Maestro Films is located at 35, Laxmi Parisar, Rohit Nagar,
                  Bawadiya Kalan, Gulmohar Colony, Bhopal, Madhya Pradesh 462039.
                  We also operate in Mumbai.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">
                How do I book a fashion photography session with Maestro Films?
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  You can book a fashion photography session by calling +91 75818
                  00555 or +91 75820 05558, or emailing
                  Officialmaestrofilm@gmail.com. Walk-ins are welcome Monday to
                  Sunday from 6 AM to 11:30 PM.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Who is Kamad Solanki?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">
                  Kamad Solanki is the Director of Maestro Films and a
                  professional fashion photographer based in Bhopal and Mumbai.
                  He is the son of founder Lt. Prem Solanki and leads the
                  studio's editorial and commercial photography work.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-[#e8dfd4] pt-8 flex flex-col md:flex-row justify-between items-center gap-5"
          >
            <p className="text-[11px] text-[#8a7a6a] font-light tracking-wider">
              © 2025–26 Maestro Films. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://www.freeprivacypolicy.com/live/ecdab47e-ea34-4264-b862-9c782c066a58"
                className="text-[11px] text-[#8a7a6a] hover:text-[#a68b6a] transition-colors duration-300 tracking-wider"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.freeprivacypolicy.com/live/ecdab47e-ea34-4264-b862-9c782c066a58"
                className="text-[11px] text-[#8a7a6a] hover:text-[#a68b6a] transition-colors duration-300 tracking-wider"
              >
                Terms & Conditions
              </a>
              <span className="text-[#d9cfc3]">·</span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#8a7a6a] font-light">
                Fashion Photography · Bhopal & Mumbai
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}