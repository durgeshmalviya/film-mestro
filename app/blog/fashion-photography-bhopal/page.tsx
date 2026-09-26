"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const faqs = [
  {
    question: "Who is a fashion photographer in Bhopal?",
    answer:
      "A fashion photographer in Bhopal creates professional fashion imagery for models, designers, brands, agencies, e-commerce businesses and influencers. Projects can include model portfolios, editorial photography, lookbooks, catalogues, commercial campaigns, beauty photography and fashion reels.",
  },
  {
    question: "Does Maestro Films provide fashion photography in Bhopal?",
    answer:
      "Yes. Maestro Films provides fashion photography and production in Bhopal, including model portfolio shoots, editorial photography, lookbooks, catalogue photography, commercial campaigns, beauty and jewellery photography, product photography with models and fashion content.",
  },
  {
    question: "Where can a fashion photoshoot be done in Bhopal?",
    answer:
      "Fashion shoots in Bhopal can be produced in professional studios, indoor locations, architectural spaces, hotels, outdoor locations or other selected locations depending on the creative direction, styling and requirements of the project.",
  },
  {
    question: "What is included in a professional model portfolio shoot?",
    answer:
      "A model portfolio shoot can include portraits, full-length photographs, fashion looks, different expressions, posing variations and editorial-style images. The final selection depends on the model's intended market, experience and portfolio requirements.",
  },
  {
    question: "Can fashion photography and reels be produced together?",
    answer:
      "Yes. Still photography and short-form video can be planned as one production. This allows a fashion brand, model or designer to create photographs alongside reels, behind-the-scenes content and other social media assets.",
  },
  {
    question: "Does Maestro Films work with designers and fashion brands?",
    answer:
      "Yes. Maestro Films works on fashion photography and production for designers, fashion brands, models, modelling agencies, e-commerce businesses and influencers.",
  },
  {
    question: "Does Maestro Films travel outside Bhopal?",
    answer:
      "Yes. Maestro Films serves selected locations across India, including Indore, Mumbai, Delhi NCR, Jaipur, Hoshangabad/Narmadapuram, Sehore, Vidisha and Dewas, subject to project requirements.",
  },
];

const services = [
  "Fashion Photography",
  "Model Portfolio",
  "Editorial Photography",
  "Lookbook Photography",
  "Catalogue Photography",
  "Commercial Campaigns",
  "Beauty Photography",
  "Jewellery Photography",
  "Product Photography",
  "Fashion Reels",
  "Influencer Shoots",
  "Fashion Films",
];

const locations = [
  "Bhopal",
  "Misrod",
  "Mandideep",
  "Indore",
  "Mumbai",
  "Delhi NCR",
  "Jaipur",
  "Hoshangabad",
  "Narmadapuram",
  "Sehore",
  "Vidisha",
  "Dewas",
];

/* -------------------------------------------------------------------------- */
/*  Animation Variants                                                        */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* -------------------------------------------------------------------------- */
/*  Schema                                                                    */
/* -------------------------------------------------------------------------- */

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://maestrofilms.co.in/#organization",
      name: "Maestro Films",
      url: "https://maestrofilms.co.in",
      description:
        "Premium fashion photography and production studio serving the fashion industry across India.",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://maestrofilms.co.in/#localbusiness",
      name: "Maestro Films",
      url: "https://maestrofilms.co.in",
      image: "https://maestrofilms.co.in/og-image.jpg",
      description:
        "Premium fashion photography and production studio in Bhopal specializing in model portfolios, editorials, lookbooks, catalogues, commercial campaigns and fashion content.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhopal",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      areaServed: locations.map((location) => ({
        "@type": "Place",
        name: location,
      })),
      serviceType: services,
    },
    {
      "@type": "WebPage",
      "@id": "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#webpage",
      url: "https://maestrofilms.co.in/blog/fashion-photography-bhopal",
      name: "Fashion Photography in Bhopal | Model Portfolios & Editorials",
      description:
        "A complete guide to fashion photography in Bhopal covering model portfolios, editorials, lookbooks, catalogues, campaigns and fashion reels.",
      isPartOf: { "@id": "https://maestrofilms.co.in/#website" },
      about: { "@id": "https://maestrofilms.co.in/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": "Article",
      "@id": "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#article",
      headline:
        "Fashion Photography in Bhopal: The Modern Guide to Editorial & Model Portfolios",
      description:
        "Discover fashion photography in Bhopal for model portfolios, editorials, lookbooks, catalogues, commercial campaigns and fashion content.",
      image:
        "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263211/HFashion/lrieiz4tc84f7jtzuacw.jpg",
      author: { "@type": "Organization", name: "Maestro Films" },
      publisher: { "@id": "https://maestrofilms.co.in/#organization" },
      mainEntityOfPage: {
        "@id": "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#webpage",
      },
      articleSection: "Fashion Photography",
      keywords: [
        "fashion photography Bhopal",
        "fashion photographer Bhopal",
        "model portfolio Bhopal",
        "model photography Bhopal",
        "editorial photography Bhopal",
        "fashion shoot Bhopal",
        "fashion photographer Misrod",
        "fashion photographer Mandideep",
      ].join(", "),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://maestrofilms.co.in" },
        { "@type": "ListItem", position: 2, name: "Journal", item: "https://maestrofilms.co.in/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Fashion Photography in Bhopal",
          item: "https://maestrofilms.co.in/blog/fashion-photography-bhopal",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default function FashionPhotographyBhopalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] text-[#302920]">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-32 lg:px-12">
        {/* Ambient light */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-220px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#ddc39a]/18 blur-[120px]" />
          <div className="absolute right-[-120px] top-[20%] h-[380px] w-[380px] rounded-full bg-[#c9a86c]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8a7b6c] transition-colors hover:text-[#a47b3c]"
            >
              <ArrowLeft size={13} strokeWidth={1.3} />
              Journal
            </Link>
            <span className="text-[#c9a86c]">/</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#a47b3c]">
              Bhopal
            </span>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#c9a86c]" />
                <span className="text-[10px] uppercase tracking-[0.38em] text-[#a47b3c]">
                  Maestro Films · Bhopal
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 font-serif text-4xl font-light leading-[0.95] tracking-tight text-[#302920] sm:text-5xl md:text-6xl lg:text-[3.75rem]"
              >
                Fashion
                <span className="block italic text-[#a47b3c]">Photography</span>
                <span className="block">in Bhopal</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mt-6 h-px w-12 bg-[#c9a86c]" />

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-lg text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8"
              >
                Contemporary fashion photography for{" "}
                <strong className="font-medium text-[#40382f]">
                  models, designers, fashion brands, modelling agencies and creators
                </strong>{" "}
                in Bhopal — from refined model portfolios and editorials to lookbooks,
                catalogue photography and commercial campaigns.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#827568]">
                  <MapPin size={12} strokeWidth={1.3} className="text-[#b58c4e]" />
                  Bhopal · Madhya Pradesh
                </span>
                <span className="h-1 w-1 rounded-full bg-[#c9a86c]" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#827568]">
                  Editorial · Commercial · Portfolio
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-2.5 border border-[#d9cdbf]" />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded2]">
                <Image
                  src="https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263211/HFashion/lrieiz4tc84f7jtzuacw.jpg"
                  alt="Fashion photography and model portfolio photography in Bhopal by Maestro Films"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#eed8a7]">
                    Fashion Editorial
                  </p>
                  <p className="mt-1 font-serif text-xl italic text-white">
                    Bhopal, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK ANSWER (AEO)
      ========================================================= */}
      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.4fr_1.6fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
                Quick Answer
              </p>
              <h2 className="mt-2 font-serif text-2xl font-light text-[#302920] md:text-3xl">
                Fashion Photographer in Bhopal
              </h2>
            </div>
            <p className="text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Maestro Films is a fashion photography and production studio serving Bhopal
              and selected locations across India. Our work includes{" "}
              <strong className="font-medium text-[#40382f]">
                model portfolios, editorial fashion photography, lookbooks, catalogue
                photography, commercial campaigns, beauty, jewellery, product photography
                and fashion reels
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN ARTICLE
      ========================================================= */}
      <article className="px-5 py-16 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              Bhopal Fashion Guide
            </span>
            <div className="h-px flex-1 bg-[#ddd1c2]" />
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#918477]">
              <Clock3 size={11} strokeWidth={1.3} />
              7 min read
            </span>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
              A new language for
              <span className="italic text-[#a47b3c]"> fashion imagery</span>
            </h2>

            <p className="mt-6 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Fashion photography has moved beyond simply documenting clothing. Modern
              fashion imagery combines{" "}
              <strong className="font-medium text-[#40382f]">
                lighting, styling, expression, composition, movement and creative direction
              </strong>{" "}
              to create a recognizable visual identity.
            </p>

            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              In Bhopal, a fashion production can be developed around the requirements of a
              model, designer, brand, agency or campaign. The production may take place in a
              studio, indoor location, architectural setting or selected outdoor environment.
            </p>
          </section>

          {/* 01 · Model Portfolio */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              01 · Model Portfolio
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Model portfolio photography in Bhopal
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              A model portfolio should communicate more than appearance. It should show how a
              model works in front of the camera through expression, posture, movement,
              styling and different visual directions.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Depending on the model&apos;s goals, a portfolio shoot can combine clean
              portraits, full-length images, fashion looks, beauty photographs and more
              editorial frames.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {["Portraits", "Full Length", "Editorial", "Beauty"].map((item) => (
                <div
                  key={item}
                  className="border border-[#ddd1c2] bg-[#faf7f3] px-3 py-4 text-center"
                >
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#806f5e]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 02 · Editorial */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              02 · Editorial
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Editorial fashion photography
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Editorial photography gives a fashion story greater creative freedom. Instead
              of simply presenting garments, the production can establish a mood through
              styling, location, lighting, colour, posing and composition.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              A contemporary editorial approach can range from clean studio imagery to
              dramatic location work, depending on the collection, publication, campaign
              concept or creative brief.
            </p>
          </section>

          {/* 03 · Lookbook */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              03 · Lookbook
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Lookbook photography for designers
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              A lookbook translates a fashion collection into a cohesive visual presentation.
              Consistency in lighting, framing, styling and colour helps the collection feel
              unified across a website, social channels and campaign materials.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              For Bhopal-based designers and brands, a lookbook can be produced in a
              controlled studio environment or around a location selected to complement the
              collection.
            </p>
          </section>

          {/* 04 · Catalogue */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              04 · Catalogue
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Catalogue photography for fashion commerce
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Catalogue photography focuses on presenting products clearly while maintaining
              a consistent visual standard. For fashion e-commerce, model-led catalogue
              imagery can show fit, silhouette, styling and garment details.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Professional lighting, repeatable framing and organized production are
              especially useful when photographing larger collections.
            </p>
          </section>

          {/* 05 · Campaign */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              05 · Campaign
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Commercial fashion campaigns
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Campaign photography is developed around a specific creative concept and brand
              objective. It can include models, products, fashion styling, beauty, locations,
              motion content and multiple image formats.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              A campaign production can also be structured to generate still photographs and
              short-form video during the same shoot, giving brands a broader set of assets
              for digital marketing.
            </p>
          </section>

          {/* 06 · Motion */}
          <section className="mt-16 border-t border-[#ddd1c2] pt-10">
            <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              06 · Motion
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light text-[#302920] md:text-3xl">
              Fashion reels & short-form content
            </h2>
            <p className="mt-5 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8]">
              Fashion audiences increasingly experience brands through short video. Reels can
              show garment movement, styling transitions, model expression, behind-the-scenes
              moments and campaign concepts in motion.
            </p>
            <p className="mt-4 text-sm font-light leading-7 text-[#665c53] md:text-[15px] md:leading-8">
              Planning stills and motion together can help a single production generate
              photographs, reels and social-media assets.
            </p>
          </section>
        </div>
      </article>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
                Studio Services
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
                One production.
                <span className="block italic text-[#a47b3c]">Multiple possibilities.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-l border-[#d3c5b5] pl-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service} className="text-[11px] leading-5 text-[#6e6257]">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ (AEO)
      ========================================================= */}
      <section className="px-5 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles size={13} strokeWidth={1.3} className="text-[#b58c4e]" />
            <span className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              Frequently Asked
            </span>
          </div>

          <h2 className="font-serif text-3xl font-light text-[#302920] md:text-4xl">
            Questions about
            <span className="italic text-[#a47b3c]"> fashion photography in Bhopal</span>
          </h2>

          <div className="mt-8 space-y-2.5">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.question} className="border border-[#d7cabc] bg-[#faf7f3]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-serif text-base font-light text-[#40382f] md:text-lg">
                      {faq.question}
                    </span>
                    {open ? (
                      <ChevronUp size={15} strokeWidth={1.3} className="shrink-0 text-[#a47b3c]" />
                    ) : (
                      <ChevronDown size={15} strokeWidth={1.3} className="shrink-0 text-[#a47b3c]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#e2d8cd] px-5 pb-5 pt-4">
                          <p className="text-[13px] font-light leading-7 text-[#6b6157]">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          GEO – LOCATIONS
      ========================================================= */}
      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden border border-[#d9cdbf] bg-[#faf7f3] px-6 py-12 md:px-10 lg:px-14">
            <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#d5b87d]/12 blur-[90px]" />

            <div className="relative">
              <div className="flex items-center gap-2.5">
                <MapPin size={14} strokeWidth={1.3} className="text-[#b58c4e]" />
                <span className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
                  Bhopal · Madhya Pradesh
                </span>
              </div>

              <h2 className="mt-5 max-w-3xl font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
                Fashion photography
                <span className="italic text-[#a47b3c]"> around Bhopal.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-[#665c53]">
                Maestro Films works with clients in Bhopal and surrounding areas for fashion
                photography, model portfolios, designer shoots, commercial campaigns and
                digital fashion content.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-y-3 border-t border-[#ded3c6] pt-6 sm:grid-cols-3 md:grid-cols-4">
                {locations.map((location) => (
                  <span
                    key={location}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#796d61]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c9a86c]" />
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RELATED JOURNAL
      ========================================================= */}
      <section className="border-t border-[#ddd1c2] px-5 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.36em] text-[#a47b3c]">
              Continue Reading
            </span>
            <div className="h-px flex-1 bg-[#ddd1c2]" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/blog/how-to-build-model-portfolio",
                category: "Model Portfolio",
                title: "How to Build a Professional Model Portfolio",
              },
              {
                href: "/blog/editorial-fashion-photography-guide",
                category: "Editorial",
                title: "Editorial Fashion Photography: Light & Story",
              },
              {
                href: "/blog/fashion-photography-indore",
                category: "Nearby",
                title: "Fashion Photography in Indore",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-[#ddd1c2] bg-[#faf7f3] p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(76,60,40,0.07)]"
              >
                <span className="text-[9px] uppercase tracking-[0.26em] text-[#a47b3c]">
                  {item.category}
                </span>
                <h3 className="mt-3 font-serif text-xl font-light leading-snug text-[#302920]">
                  {item.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#a47b3c]">
                  Read
                  <ArrowRight size={12} strokeWidth={1.3} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SEO FOOTER
      ========================================================= */}
      <section className="bg-[#f7f3ee] px-5 py-10 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[9px] uppercase tracking-[0.36em] text-[#a47b3c]">
            Maestro Films · Fashion Photography Bhopal
          </p>
          <p className="mt-4 text-[11px] font-light leading-6 text-[#887c70]">
            Maestro Films provides fashion photography in Bhopal for models, designers,
            modelling agencies, luxury brands, e-commerce businesses and influencers.
            Services include model portfolio photography, editorial fashion photography,
            lookbook photography, catalogue photography, commercial campaigns, beauty
            photography, jewellery photography, product photography with models and fashion
            reels. Production can be arranged in Bhopal, Misrod, Mandideep and selected
            locations across Madhya Pradesh and India.
          </p>
        </div>
      </section>
    </main>
  );
}