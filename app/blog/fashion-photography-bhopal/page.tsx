"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

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
      "@id":
        "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#webpage",
      url: "https://maestrofilms.co.in/blog/fashion-photography-bhopal",
      name:
        "Fashion Photography in Bhopal | Model Portfolios & Editorials",
      description:
        "A complete guide to fashion photography in Bhopal covering model portfolios, editorials, lookbooks, catalogues, campaigns and fashion reels.",
      isPartOf: {
        "@id": "https://maestrofilms.co.in/#website",
      },
      about: {
        "@id": "https://maestrofilms.co.in/#organization",
      },
      inLanguage: "en-IN",
    },

    {
      "@type": "Article",
      "@id":
        "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#article",
      headline:
        "Fashion Photography in Bhopal: The Modern Guide to Editorial & Model Portfolios",
      description:
        "Discover fashion photography in Bhopal for model portfolios, editorials, lookbooks, catalogues, commercial campaigns and fashion content.",
      image:
        "https://i.ibb.co/FbPpM5Gw/Untitled-design-100.jpg",
      author: {
        "@type": "Organization",
        name: "Maestro Films",
      },
      publisher: {
        "@id": "https://maestrofilms.co.in/#organization",
      },
      mainEntityOfPage: {
        "@id":
          "https://maestrofilms.co.in/blog/fashion-photography-bhopal/#webpage",
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://maestrofilms.co.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Journal",
          item: "https://maestrofilms.co.in/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Fashion Photography in Bhopal",
          item:
            "https://maestrofilms.co.in/blog/fashion-photography-bhopal",
        },
      ],
    },

    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function FashionPhotographyBhopalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] text-[#302920]">

      {/* =========================================================
          JSON-LD
      ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36 lg:px-12">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-[-300px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[#ddc39a]/20 blur-[140px]" />

          <div className="absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-[#c9a86c]/10 blur-[130px]" />

          <div className="absolute bottom-[-200px] left-[-160px] h-[450px] w-[450px] rounded-full bg-[#e1d1bc]/30 blur-[120px]" />

        </div>


        <div className="relative mx-auto max-w-7xl">

          {/* Breadcrumb */}

          <div className="mb-10 flex items-center gap-3">

            <Link
              href="/blog"
              className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#8a7b6c] transition-colors hover:text-[#a47b3c]"
            >

              <ArrowLeft
                size={13}
                strokeWidth={1.2}
              />

              Journal

            </Link>

            <span className="text-[#c9a86c]">/</span>

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#a47b3c]">
              Bhopal
            </span>

          </div>


          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            {/* Text */}

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-[#c9a86c]" />

                <span className="text-[8px] uppercase tracking-[0.45em] text-[#a47b3c]">
                  Maestro Films · Bhopal
                </span>

              </div>


              <h1 className="mt-7 font-serif text-5xl font-light leading-[0.94] tracking-[-0.04em] text-[#302920] md:text-6xl lg:text-7xl">

                Fashion
                <span className="block italic text-[#a47b3c]">
                  Photography
                </span>

                <span className="block">
                  in Bhopal
                </span>

              </h1>


              <div className="mt-8 h-px w-14 bg-[#c9a86c]" />


              <p className="mt-8 max-w-xl text-sm font-light leading-8 text-[#665c53] md:text-base">

                Contemporary fashion photography for{" "}
                <strong className="font-medium text-[#40382f]">
                  models, designers, fashion brands, modelling agencies and
                  creators
                </strong>{" "}
                in Bhopal — from refined model portfolios and editorials to
                lookbooks, catalogue photography and commercial campaigns.

              </p>


              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">

                <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#827568]">

                  <MapPin
                    size={12}
                    strokeWidth={1.2}
                    className="text-[#b58c4e]"
                  />

                  Bhopal · Madhya Pradesh

                </span>


                <span className="h-1 w-1 rounded-full bg-[#c9a86c]" />


                <span className="text-[8px] uppercase tracking-[0.2em] text-[#827568]">
                  Editorial · Commercial · Portfolio
                </span>

              </div>

            </div>


            {/* Hero Image */}

            <div className="relative">

              <div className="absolute -inset-3 border border-[#d9cdbf]" />

              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded2]">

                <Image
                  src="https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263211/HFashion/lrieiz4tc84f7jtzuacw.jpg"
                  alt="Fashion photography and model portfolio photography in Bhopal by Maestro Films"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/45 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <p className="text-[8px] uppercase tracking-[0.35em] text-[#eed8a7]">
                    Fashion Editorial
                  </p>

                  <p className="mt-2 font-serif text-2xl italic text-white">
                    Bhopal, India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          QUICK ANSWER
      ========================================================= */}

      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-14 md:px-10 lg:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-[0.35fr_1.65fr] lg:items-center">

            <div>

              <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
                Quick Answer
              </p>

              <h2 className="mt-3 font-serif text-3xl font-light text-[#302920]">
                Fashion Photographer in Bhopal
              </h2>

            </div>


            <p className="text-sm font-light leading-8 text-[#665c53] md:text-base">

              Maestro Films is a fashion photography and production studio
              serving Bhopal and selected locations across India. Our work
              includes{" "}
              <strong className="font-medium text-[#40382f]">
                model portfolios, editorial fashion photography, lookbooks,
                catalogue photography, commercial campaigns, beauty,
                jewellery, product photography and fashion reels
              </strong>
              .

            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          MAIN ARTICLE
      ========================================================= */}

      <article className="px-5 py-20 md:px-10 md:py-28 lg:px-12">

        <div className="mx-auto max-w-4xl">

          <div className="mb-12 flex items-center gap-4">

            <span className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              Bhopal Fashion Guide
            </span>

            <div className="h-px flex-1 bg-[#ddd1c2]" />

            <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-[#918477]">

              <Clock3
                size={11}
                strokeWidth={1.2}
              />

              7 min read

            </span>

          </div>


          {/* Introduction */}

          <section>

            <h2 className="font-serif text-4xl font-light leading-tight text-[#302920] md:text-5xl">
              A new language for
              <span className="italic text-[#a47b3c]">
                {" "}fashion imagery
              </span>
            </h2>


            <p className="mt-7 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Fashion photography has moved beyond simply documenting
              clothing. Modern fashion imagery combines{" "}
              <strong className="font-medium text-[#40382f]">
                lighting, styling, expression, composition, movement and
                creative direction
              </strong>{" "}
              to create a recognizable visual identity.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              In Bhopal, a fashion production can be developed around the
              requirements of a model, designer, brand, agency or campaign.
              The production may take place in a studio, indoor location,
              architectural setting or selected outdoor environment.

            </p>

          </section>


          {/* Model Portfolio */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              01 · Model Portfolio
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Model portfolio photography in Bhopal
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              A model portfolio should communicate more than appearance. It
              should show how a model works in front of the camera through
              expression, posture, movement, styling and different visual
              directions.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Depending on the model's goals, a portfolio shoot can combine
              clean portraits, full-length images, fashion looks, beauty
              photographs and more editorial frames.

            </p>


            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

              {[
                "Portraits",
                "Full Length",
                "Editorial",
                "Beauty",
              ].map((item) => (

                <div
                  key={item}
                  className="border border-[#ddd1c2] bg-[#faf7f3] px-4 py-5 text-center"
                >

                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#806f5e]">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </section>


          {/* Editorial */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              02 · Editorial
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Editorial fashion photography
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Editorial photography gives a fashion story greater creative
              freedom. Instead of simply presenting garments, the production
              can establish a mood through styling, location, lighting,
              colour, posing and composition.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              A contemporary editorial approach can range from clean studio
              imagery to dramatic location work, depending on the collection,
              publication, campaign concept or creative brief.

            </p>

          </section>


          {/* Lookbook */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              03 · Lookbook
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Lookbook photography for designers
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              A lookbook translates a fashion collection into a cohesive
              visual presentation. Consistency in lighting, framing, styling
              and colour helps the collection feel unified across a website,
              social channels and campaign materials.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              For Bhopal-based designers and brands, a lookbook can be
              produced in a controlled studio environment or around a
              location selected to complement the collection.

            </p>

          </section>


          {/* Catalogue */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              04 · Catalogue
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Catalogue photography for fashion commerce
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Catalogue photography focuses on presenting products clearly
              while maintaining a consistent visual standard. For fashion
              e-commerce, model-led catalogue imagery can show fit, silhouette,
              styling and garment details.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Professional lighting, repeatable framing and organized
              production are especially useful when photographing larger
              collections.

            </p>

          </section>


          {/* Commercial */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              05 · Campaign
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Commercial fashion campaigns
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Campaign photography is developed around a specific creative
              concept and brand objective. It can include models, products,
              fashion styling, beauty, locations, motion content and multiple
              image formats.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              A campaign production can also be structured to generate still
              photographs and short-form video during the same shoot, giving
              brands a broader set of assets for digital marketing.

            </p>

          </section>


          {/* Fashion Reels */}

          <section className="mt-20 border-t border-[#ddd1c2] pt-12">

            <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              06 · Motion
            </p>


            <h2 className="mt-4 font-serif text-3xl font-light text-[#302920] md:text-4xl">
              Fashion reels & short-form content
            </h2>


            <p className="mt-6 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Fashion audiences increasingly experience brands through short
              video. Reels can show garment movement, styling transitions,
              model expression, behind-the-scenes moments and campaign
              concepts in motion.

            </p>


            <p className="mt-5 text-sm font-light leading-8 text-[#665c53] md:text-base">

              Planning stills and motion together can help a single production
              generate photographs, reels and social-media assets.

            </p>

          </section>

        </div>

      </article>


      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-20 md:px-10 md:py-24 lg:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

            <div>

              <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
                Studio Services
              </p>

              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#302920]">

                One production.
                <span className="block italic text-[#a47b3c]">
                  Multiple possibilities.
                </span>

              </h2>

            </div>


            <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-l border-[#d3c5b5] pl-7 md:grid-cols-3">

              {services.map((service) => (

                <div
                  key={service}
                  className="text-[10px] leading-5 text-[#6e6257]"
                >
                  {service}
                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          BHOPAL / GEO
      ========================================================= */}

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="relative overflow-hidden border border-[#d9cdbf] bg-[#faf7f3] px-7 py-14 md:px-12 lg:px-16">

            <div className="pointer-events-none absolute right-[-120px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#d5b87d]/15 blur-[110px]" />


            <div className="relative">

              <div className="flex items-center gap-3">

                <MapPin
                  size={15}
                  strokeWidth={1.2}
                  className="text-[#b58c4e]"
                />

                <span className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
                  Bhopal · Madhya Pradesh
                </span>

              </div>


              <h2 className="mt-6 max-w-4xl font-serif text-4xl font-light leading-tight text-[#302920] md:text-5xl">

                Fashion photography
                <span className="italic text-[#a47b3c]">
                  {" "}around Bhopal.
                </span>

              </h2>


              <p className="mt-7 max-w-3xl text-sm font-light leading-8 text-[#665c53] md:text-base">

                Maestro Films works with clients in Bhopal and surrounding
                areas for fashion photography, model portfolios, designer
                shoots, commercial campaigns and digital fashion content.

              </p>


              <div className="mt-9 grid grid-cols-2 gap-y-4 border-t border-[#ded3c6] pt-7 sm:grid-cols-3 md:grid-cols-4">

                {locations.map((location) => (

                  <span
                    key={location}
                    className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-[#796d61]"
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

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="mb-9 flex items-center gap-4">

            <span className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
              Continue Reading
            </span>

            <div className="h-px flex-1 bg-[#ddd1c2]" />

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <Link
              href="/blog/how-to-build-model-portfolio"
              className="group border border-[#ddd1c2] bg-[#faf7f3] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(76,60,40,0.08)]"
            >

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#a47b3c]">
                Model Portfolio
              </span>

              <h3 className="mt-4 font-serif text-2xl font-light leading-tight text-[#302920]">
                How to Build a Professional Model Portfolio
              </h3>

              <span className="mt-6 inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]">
                Read
                <ArrowRight
                  size={13}
                  strokeWidth={1.2}
                />
              </span>

            </Link>


            <Link
              href="/blog/editorial-fashion-photography-guide"
              className="group border border-[#ddd1c2] bg-[#faf7f3] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(76,60,40,0.08)]"
            >

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#a47b3c]">
                Editorial
              </span>

              <h3 className="mt-4 font-serif text-2xl font-light leading-tight text-[#302920]">
                Editorial Fashion Photography: Light & Story
              </h3>

              <span className="mt-6 inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]">
                Read
                <ArrowRight
                  size={13}
                  strokeWidth={1.2}
                />
              </span>

            </Link>


            <Link
              href="/blog/fashion-photography-indore"
              className="group border border-[#ddd1c2] bg-[#faf7f3] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(76,60,40,0.08)]"
            >

              <span className="text-[8px] uppercase tracking-[0.3em] text-[#a47b3c]">
                Nearby
              </span>

              <h3 className="mt-4 font-serif text-2xl font-light leading-tight text-[#302920]">
                Fashion Photography in Indore
              </h3>

              <span className="mt-6 inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]">
                Read
                <ArrowRight
                  size={13}
                  strokeWidth={1.2}
                />
              </span>

            </Link>

          </div>

        </div>

      </section>

 


      {/* =========================================================
          SEMANTIC FOOTER COPY
      ========================================================= */}

      <section className="bg-[#f7f3ee] px-5 py-12 md:px-10 lg:px-12">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
            Maestro Films · Fashion Photography Bhopal
          </p>

          <p className="mt-5 text-[11px] font-light leading-7 text-[#887c70]">

            Maestro Films provides fashion photography in Bhopal for models,
            designers, modelling agencies, luxury brands, e-commerce
            businesses and influencers. Services include model portfolio
            photography, editorial fashion photography, lookbook photography,
            catalogue photography, commercial campaigns, beauty photography,
            jewellery photography, product photography with models and fashion
            reels. Production can be arranged in Bhopal, Misrod, Mandideep and
            selected locations across Madhya Pradesh and India.

          </p>

        </div>

      </section>

    </main>
  );
}