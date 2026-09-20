"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What fashion photography services does Maestro Films offer in Bhopal and Mumbai?",
    answer:
      "Maestro Films provides high-end fashion photography including editorial shoots, lookbooks, beauty imagery, commercial campaigns, model portfolio development, product shoots, and fashion films. We work with models, designers, agencies, and luxury brands across Bhopal, Mumbai, and pan-India locations.",
  },
  {
    question: "Do you shoot fashion editorials and lookbooks for brands?",
    answer:
      "Yes. We specialize in fashion editorials and collection lookbooks with precise lighting, intentional direction, and delivery ready for print, digital, and campaign use. Our editorial work is designed for magazines, brand stories, and portfolio-level presentation.",
  },
  {
    question: "Can Maestro Films handle commercial fashion campaigns and ads?",
    answer:
      "Absolutely. We create campaign stills and motion for fashion and lifestyle brands, including assets for Meta (Facebook & Instagram) ads, Google campaigns, social content, and premium brand films — still looking editorial, built to perform.",
  },
  {
    question: "Do you offer studio and on-location fashion shoots?",
    answer:
      "Yes. We offer full studio production as well as on-location and travel shoots across India. From controlled studio lighting to outdoor and destination fashion photography, we plan, direct, and deliver end to end.",
  },
  {
    question: "Where is Maestro Films based and which cities do you cover?",
    answer:
      "Maestro Films is rooted in fashion and commercial production with strong presence in Bhopal (Central India) and Mumbai (Western India), and we regularly execute pan-India location shoots for brands, talent, and campaigns.",
  },
  {
    question: "How do I book a fashion photography session or campaign?",
    answer:
      "Share your brief via our contact form — project type, dates, location preference, and creative direction. We respond within 24 hours with availability, process, and next steps for editorial, lookbook, beauty, campaign, or social content shoots.",
  },
  {
    question: "Do you provide social media content and Reels for fashion brands?",
    answer:
      "Yes. Alongside photography, we create fashion-first social systems including Instagram content, Reels, and campaign creatives so your visuals stay consistent across organic posts and paid media.",
  },
  {
    question: "What makes Maestro Films different from other fashion photographers?",
    answer:
      "We combine editorial precision with commercial clarity — refined lighting, strong direction, and delivery suited for portfolios, lookbooks, campaigns, and ads. With decades of production experience and a fashion-first approach, every frame is built to hold attention and convert.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD for SEO / AEO (FAQ schema)
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

  return (
    <section className="  bg-[#f5f1ed] px-5 md:px-10 lg:px-12 py-5 md:py-8 ">
      {/* Schema for Google / AI answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[900px] mx-auto ">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14 ">
          <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-3 font-light">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-gold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gold text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
            Fashion photography, campaigns, studio & location shoots across
            Bhopal, Mumbai, and India.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 ">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="cursor-pointer border border-[#e0d6c8] bg-[#f0ebe4] rounded-sm overflow-hidden transition-colors duration-300 hover:border-[#c9a86c]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-start cursor-pointer justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] md:text-[15px] font-medium text-gold leading-snug pr-2">
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
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-[13px] md:text-[14px] text-gold font-light leading-relaxed border-t border-[#e0d6c8]/80 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

   
        
      </div>
    </section>
  );
}