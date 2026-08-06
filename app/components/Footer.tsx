'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
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
        description: "Premier fashion photography and cinematic film production house in Bhopal and Mumbai. Specializing in editorial shoots, portfolio development, brand campaigns, and commercial filmmaking since 1982.",
        url: "https://maestrofilms.in",
        telephone: ["+91-75818-00555", "+91-75820-05558"],
        email: "Officialmaestrofilm@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "35, Laxmi Parisar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony",
          addressLocality: "Bhopal",
          addressRegion: "Madhya Pradesh",
          postalCode: "462039",
          addressCountry: "IN"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "23.1864396",
          longitude: "77.4364127"
        },
        founder: {
          "@type": "Person",
          name: "Kamad Solanki",
          jobTitle: "Director & Fashion Photographer",
          description: "Fashion photographer based in Bhopal and Mumbai specializing in editorial and commercial photography."
        },
        foundingDate: "1982",
        areaServed: [
          { "@type": "City", name: "Bhopal" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "State", name: "Madhya Pradesh" }
        ],
        serviceType: [
          "Fashion Photography",
          "Editorial Photography",
          "Portfolio Shoots",
          "Brand Campaigns",
          "Commercial Filmmaking",
          "Modeling Shoots",
          "Product Photography",
          "Cinematic Video Production"
        ],
        openingHours: "Mo-Su 06:00-23:30",
        priceRange: "$$"
      },
      {
        "@type": "Organization",
        name: "Maestro Films",
        sameAs: [
          "https://www.instagram.com/maestrofilms.in/",
          "https://www.facebook.com/profile.php?id=61577981519394",
          "https://youtube.com/@maestrofilms-u8e"
        ]
      }
    ]
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
        className="bg-[#0a0807] text-white pt-24 pb-8 px-6 md:px-10 font-body selection:bg-[#c4a882] selection:text-black"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Lead Gen CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:mb-24 p-8 md:p-12 rounded-sm bg-gradient-to-br from-[#1a1410] to-[#0f0c0a] border border-[#c4a882]/10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c4a882] font-medium mb-3">
                  AI-Optimized Visual Studio
                </p>
                <h3 className="text-3xl md:text-5xl font-light leading-[1.1]">
                  Ready for visuals that{' '}
                  <span className="font-script text-[#c4a882] text-4xl md:text-6xl">rank</span>{' '}
                  and convert?
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="tel:+917581800555"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#c4a882] text-[#0a0807] text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-white transition-all duration-300 shadow-lg"
                >
                  Book a Shoot
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="mailto:Officialmaestrofilm@gmail.com"
                  className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 text-gray-300 text-xs tracking-[0.2em] uppercase font-light rounded-sm hover:border-[#c4a882] hover:text-[#c4a882] transition-all duration-300"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 mb-20">
            
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-5"
            >
              <div itemProp="name" className="font-script text-5xl md:text-6xl text-[#c4a882] mb-1 leading-none">
                Maestro
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-light mb-8">
                Films & Photography
              </p>
              
              <p itemProp="description" className="text-sm leading-[1.9] text-gray-500 font-light max-w-sm mb-8">
                Fashion photography and cinematic production house serving 
                <span itemProp="areaServed" className="text-gray-300"> Bhopal </span> 
                and <span className="text-gray-300">Mumbai</span>. Editorial portfolios, 
                brand campaigns, and commercial filmmaking since 1982.
              </p>

              <div className="flex gap-3">
                {[
                  { href: 'https://www.instagram.com/maestrofilms.in/', icon: FaInstagram, label: 'Instagram' },
                  { href: 'https://www.facebook.com/profile.php?id=61577981519394', icon: FaFacebook, label: 'Facebook' },
                  { href: 'https://youtube.com/@maestrofilms-u8e', icon: FaYoutube, label: 'YouTube' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-[#c4a882] hover:border-[#c4a882] transition-all duration-300 hover:scale-110"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Services - Entity Optimization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-3"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-600 font-medium mb-6">
                Services
              </p>
              <ul className="space-y-3 text-sm text-gray-500 font-light">
                {[
                  'Fashion Photography',
                  'Editorial Shoots',
                  'Portfolio Development',
                  'Brand Campaigns',
                  'Commercial Filmmaking',
                  'Product Photography',
                  'Modeling Shoots'
                ].map((svc) => (
                  <li key={svc} className="hover:text-[#c4a882] transition-colors duration-300 cursor-default">
                    {svc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact - NAP Schema */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-4"
            >
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-600 font-medium mb-6">
                Contact
              </p>
              
              <div className="space-y-4 text-sm text-gray-500 font-light">
                <div className="flex items-start gap-3 group">
                  <Phone className="w-4 h-4 text-gray-600 mt-0.5 group-hover:text-[#c4a882] transition-colors flex-shrink-0" />
                  <div>
                    <a href="tel:+917581800555" itemProp="telephone" className="block hover:text-[#c4a882] transition-colors">
                      +91 75818 00555
                    </a>
                    <a href="tel:+917582005558" className="block hover:text-[#c4a882] transition-colors">
                      +91 75820 05558
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <Mail className="w-4 h-4 text-gray-600 mt-0.5 group-hover:text-[#c4a882] transition-colors flex-shrink-0" />
                  <a href="mailto:Officialmaestrofilm@gmail.com" itemProp="email" className="hover:text-[#c4a882] transition-colors break-all">
                    Officialmaestrofilm@gmail.com
                  </a>
                </div>

                <div 
                  className="flex items-start gap-3 group" 
                  itemProp="address" 
                  itemScope 
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5 group-hover:text-[#c4a882] transition-colors flex-shrink-0" />
                  <div>
                    <span itemProp="streetAddress">35, Laxmi Parisar, Rohit Nagar</span>,<br />
                    <span itemProp="addressLocality">Bawadiya Kalan, Gulmohar Colony</span>,<br />
                    <span itemProp="addressLocality">Bhopal</span>, <span itemProp="addressRegion">MP</span>{' '}
                    <span itemProp="postalCode">462039</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <Clock className="w-4 h-4 text-gray-600 mt-0.5 group-hover:text-[#c4a882] transition-colors flex-shrink-0" />
                  <span itemProp="openingHours" content="Mo-Su 06:00-23:30">
                    Mon – Sun : 6 AM – 11:30 PM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AEO / GEO FAQ - Machine Readable for AI Search */}
          <div className="sr-only" aria-hidden="true">
            <h2>About Maestro Films</h2>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Who is the founder of Maestro Films?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">Maestro Films was originally founded as Sharda Photo Studio in 1982 by Lt. Prem Solanki in Hoshangabad. After his passing in 2014, his son Mr. Kamad Solanki launched Maestro Films in 2024.</p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">What services does Maestro Films offer?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">Maestro Films offers fashion photography, editorial shoots, portfolio development, brand campaigns, commercial filmmaking, product photography, and modeling shoots in Bhopal and Mumbai.</p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Where is Maestro Films located?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">Maestro Films is located at 35, Laxmi Parisar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony, Bhopal, Madhya Pradesh 462039. We also operate in Mumbai.</p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">How do I book a fashion photography session with Maestro Films?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">You can book a fashion photography session by calling +91 75818 00555 or +91 75820 05558, or emailing Officialmaestrofilm@gmail.com. Walk-ins are welcome Monday to Sunday from 6 AM to 11:30 PM.</p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">Who is Kamad Solanki?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">Kamad Solanki is the Director of Maestro Films and a professional fashion photographer based in Bhopal and Mumbai. He is the son of founder Lt. Prem Solanki and leads the studio's editorial and commercial photography work.</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-gray-800/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-[11px] text-gray-700 font-light tracking-wider">
              &copy; 2025 Maestro Films. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://www.freeprivacypolicy.com/live/ecdab47e-ea34-4264-b862-9c782c066a58"
                className="text-[11px] text-gray-700 hover:text-[#c4a882] transition-colors duration-300 tracking-wider"
              >
                Privacy Policy
              </a>
              <span className="text-gray-800">|</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-gray-700 font-light">
                Croma Shoot
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}