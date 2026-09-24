"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What fashion photography services does Maestro Films offer in Bhopal, Indore, Mumbai, and Delhi?",
    answer:
      "Maestro Films provides premium high-end fashion photography services including model portfolio photography, editorial photography, lookbook photography, catalogue photography, beauty photography, jewellery photography, commercial fashion campaigns, product photography with models, fashion reels, and influencer content shoots. We specialize in studio shoots, outdoor fashion photography, and on-location production across Bhopal, Indore, Mumbai, Delhi, Jaipur, Hoshangabad, Narmadapuram, Misrod, Mandideep, Sehore, Vidisha, and Dewas. Our fashion photography services cater to models, modelling agencies, designers, luxury brands, e-commerce sellers, and influencers.",
  },
  {
    question: "Do you offer fashion editorial photography and lookbook shoots in Bhopal and Mumbai?",
    answer:
      "Yes, we specialize in fashion editorial photography and professional lookbook photography with precise lighting, intentional art direction, and editorial-grade delivery ready for print, digital campaigns, and brand storytelling. Our editorial fashion shoots are designed for luxury brands, fashion magazines, designer portfolios, and high-end brand presentations. We serve Bhopal, Indore, Mumbai, and pan-India locations.",
  },
  {
    question: "Can Maestro Films create commercial fashion campaigns and social media content (Reels, Instagram)?",
    answer:
      "Absolutely. We create high-performance commercial fashion campaigns including stills and motion content for Meta (Facebook & Instagram) ads, Google shopping campaigns, Instagram Reels, TikTok, and premium brand films. Our fashion photography for social media and paid ads maintains editorial aesthetic while optimized for conversion. We design fashion-first social systems and influencer content shoots to keep your brand visuals consistent across organic posts and paid media.",
  },
  {
    question: "Do you provide model portfolio photography and modelling shoots?",
    answer:
      "Yes. Our model portfolio photography service includes professional model portfolio shoots, test shoots, headshots, and full-body portfolio development for aspiring and professional models. We work with individual models, modelling agencies, and talent management to create portfolio-grade fashion photography suitable for agencies, casting directors, and brand collaborations.",
  },
  {
    question: "What is your service area? Do you cover Bhopal, Indore, Mumbai, Delhi, and other Indian cities?",
    answer:
      "Maestro Films is based in Bhopal (Central India) with strong presence in Indore and Mumbai (Western India). We provide fashion photography services across our primary service areas: Bhopal, Indore, Misrod, Mandideep, Sehore, Vidisha, Dewas, Hoshangabad, Narmadapuram, Mumbai, Delhi NCR, and Jaipur. We regularly execute pan-India location shoots, destination fashion photography, and travel production for luxury brands and major campaigns.",
  },
  {
    question: "Do you shoot catalogue photography and product photography with models?",
    answer:
      "Yes. We specialize in professional catalogue photography and product photography with models for e-commerce brands, fashion labels, and luxury retailers. Our catalogue shoots include styled product photography, lifestyle product imagery, and commercial product shoots ready for e-commerce platforms, lookbooks, and marketing campaigns.",
  },
  {
    question: "Can you do beauty photography and jewellery photography?",
    answer:
      "Yes. We offer specialized beauty photography including close-up beauty imagery, makeup artistry showcases, and professional beauty retouching. Our jewellery photography service captures fine jewellery, luxury pieces, and ornament collections with precision lighting and detailed product styling suitable for catalogues, e-commerce, and brand campaigns.",
  },
  {
    question: "Do you offer studio photography and outdoor/location fashion shoots?",
    answer:
      "Yes. We provide both controlled studio fashion photography with professional studio lighting and outdoor fashion photography at scenic locations. Our on-location shoots include destination fashion photography, beach shoots, urban fashion photography, and travel production across India. We handle full production planning, art direction, and delivery for both studio and location-based fashion shoots.",
  },
  {
    question: "How do I book a fashion photography session with Maestro Films?",
    answer:
      "Contact us via our website contact form with your project brief including: service type (model portfolio, editorial, lookbook, catalogue, commercial, campaign, reels, etc.), preferred dates, location preference, and creative direction. We respond within 24 hours with availability, detailed process, pricing, and next steps. You can also reach us via WhatsApp for quick inquiries.",
  },
  {
    question: "Do you create Instagram Reels, influencer content, and social media systems for fashion brands?",
    answer:
      "Yes. Beyond photography, we create complete fashion-first social media systems including Instagram content, Reels, influencer shoots, and campaign creatives designed for consistent brand presence across organic posts and paid media. Our reels maker and influencer photography services help fashion brands and creators maintain editorial quality while optimized for social engagement and conversion.",
  },
  {
    question: "What makes Maestro Films different from other fashion photographers in India?",
    answer:
      "Maestro Films combines editorial-grade precision with commercial performance clarity. We deliver refined lighting, strong creative direction, and production-ready assets suited for fashion portfolios, luxury brand lookbooks, e-commerce campaigns, and high-performing social ads. Our fashion-first approach and extensive production experience ensure every frame is built to hold attention, convert, and represent your brand at the highest level.",
  },
  {
    question: "Do you work with modelling agencies, designers, and luxury brands?",
    answer:
      "Yes. We specialize in fashion photography exclusively for the fashion industry. We work with modelling agencies for portfolio shoots, independent models for test shoots, fashion designers for collection photography, luxury brands for campaign production, e-commerce sellers for product photography, and influencers for content creation. Our expertise serves the entire fashion ecosystem.",
  },
  {
    question: "Can Maestro Films handle large-scale fashion campaigns and multi-day shoots?",
    answer:
      "Absolutely. We execute comprehensive fashion campaign production including multi-day shoots, location scouting, full art direction, styling coordination, and post-production delivery. Our experience with luxury brands, designer collections, and major campaigns ensures seamless execution, whether studio-based or location shoots across multiple Indian cities.",
  },
  {
    question: "What is your turnaround time for fashion photography delivery?",
    answer:
      "Turnaround times depend on project scope. Typical timelines: model portfolio shoots (edited gallery within 5-7 days), editorial/lookbook shoots (proofed selects within 7-10 days), campaign production (full delivery within 2-3 weeks including retouching and color grading). We discuss timelines during booking and can accommodate rush delivery when needed.",
  },
  {
    question: "Do you provide fashion photography retouching and post-production?",
    answer:
      "Yes. All our fashion photography includes professional post-production including color grading, skin retouching, background work, and final image optimization suited for print, digital, social media, and campaign deployment. Our retouching maintains editorial quality while delivering polished, brand-ready imagery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Enhanced JSON-LD Schema for SEO / AEO (FAQ schema with rich markup)
  const faqSchema = {
    "@context": "https://schema.org",
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

  // LocalBusiness schema for geo-targeting
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://maestrofilms.co.in",
    name: "Maestro Films",
    image: "https://maestrofilms.co.in/og-image.jpg",
    description:
      "Premium fashion photography studio exclusively serving the fashion industry. High-end editorial, lookbook, catalogue, commercial, campaign, model portfolio, beauty, jewellery, product photography & fashion reels across Bhopal, Indore, Mumbai, Delhi, Jaipur.",
    url: "https://maestrofilms.co.in",
    telephone: "[contact-number]",
    email: "[contact-email]",
    priceRange: "$$",
    serviceType: [
      "Fashion Photography",
      "Model Portfolio Photography",
      "Editorial Photography",
      "Lookbook Photography",
      "Catalogue Photography",
      "Commercial Fashion Photography",
      "Product Photography",
      "Beauty Photography",
      "Jewellery Photography",
      "Campaign Photography",
      "Social Media Content Creation",
      "Instagram Reels",
      "Influencer Photography",
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Bhopal",
        "@id": "https://en.wikipedia.org/wiki/Bhopal",
      },
      {
        "@type": "City",
        name: "Indore",
        "@id": "https://en.wikipedia.org/wiki/Indore",
      },
      {
        "@type": "City",
        name: "Mumbai",
        "@id": "https://en.wikipedia.org/wiki/Mumbai",
      },
      {
        "@type": "City",
        name: "Delhi",
        "@id": "https://en.wikipedia.org/wiki/Delhi",
      },
      {
        "@type": "City",
        name: "Jaipur",
        "@id": "https://en.wikipedia.org/wiki/Jaipur",
      },
      {
        "@type": "Region",
        name: "Madhya Pradesh",
      },
      {
        "@type": "Region",
        name: "India",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhopal",
      addressRegion: "MP",
      addressCountry: "IN",
    },
    sameAs: [
      "https://instagram.com/maestrofilms",
      "https://facebook.com/maestrofilms",
      "https://linkedin.com/company/maestrofilms",
    ],
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maestro Films",
    url: "https://maestrofilms.co.in",
    logo: "https://maestrofilms.co.in/logo.png",
    description:
      "Premium fashion photography and production studio exclusively serving the fashion industry in India.",
    foundingDate: "[founding-year]",
    sameAs: [
      "https://instagram.com/maestrofilms",
      "https://facebook.com/maestrofilms",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "[phone-number]",
      email: "[email]",
      areaServed: "IN",
      availableLanguageId: ["en", "hi"],
    },
  };

  return (
    <section className="bg-[#f5f1ed] px-5 md:px-10 lg:px-12 py-5 md:py-8">
      {/* FAQ Schema for Google / Claude / Answer Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* LocalBusiness Schema for Geo-Targeting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-3 font-light">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-gold mb-4">
            Fashion Photography Questions & Answers
          </h2>
          <p className="text-gold text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Premium high-end fashion photography, model portfolio shoots, editorial & lookbook photography, catalogue, commercial, campaign, beauty, jewellery, product & social media content across Bhopal, Indore, Mumbai, Delhi, Jaipur, Hoshangabad, Narmadapuram, Misrod, Mandideep, Sehore, Vidisha & Dewas.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="cursor-pointer border border-[#e0d6c8] bg-[#f0ebe4] rounded-sm overflow-hidden transition-colors duration-300 hover:border-[#c9a86c]/40"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-start cursor-pointer justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[14px] md:text-[15px] font-medium text-gold leading-snug pr-2"
                    itemProp="name"
                  >
                    {faq.question}
                  </span>
                  <span className="shrink-0 mt-0.5 text-gold">
                    {isOpen ? (
                      <Minus className="w-4 h-4" strokeWidth={1.75} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={1.75} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <p
                        className="px-5 md:px-6 pb-5 md:pb-6 text-[13px] md:text-[14px] text-gold font-light leading-relaxed border-t border-[#e0d6c8]/80 pt-4"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA for booking */}
        <div className="mt-12 text-center">
          <p className="text-gold text-sm md:text-base font-light mb-4">
            Have more questions about our fashion photography services?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border border-[#c9a86c] text-gold text-sm font-light hover:bg-[#c9a86c] hover:text-white transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}