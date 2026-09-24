"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock3,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  location: string;
  readTime: string;
  date: string;
  image: string;
  number: string;
  featured?: boolean;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: "fashion-photography-bhopal",
    title:
      "Fashion Photography in Bhopal: The Modern Guide to Editorial & Model Portfolios",
    excerpt:
      "A refined guide to creating model portfolios, editorial imagery and fashion campaigns in Bhopal with considered styling, lighting and creative direction.",
    category: "Fashion",
    location: "Bhopal · India",
    readTime: "7 min",
    date: "September 2026",
    number: "01",
    featured: true,
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263186/HFashion/nmjhhqfhi9qjmsfkca5l.jpg",
    tags: [
      "Fashion Photography Bhopal",
      "Model Portfolio",
      "Editorial",
    ],
  },
  {
    slug: "how-to-build-model-portfolio",
    title:
      "The Art of the Model Portfolio: Creating Images With Presence",
    excerpt:
      "What separates an ordinary portfolio from an editorial portfolio? We explore expression, posing, styling, lighting and image selection.",
    category: "Model Portfolio",
    location: "India",
    readTime: "8 min",
    date: "September 2026",
    number: "02",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253471/Editorial/ir2tp2gwvdsqt7pedcpr.jpg",
    tags: [
      "Model Photography",
      "Portfolio Shoot",
      "Fashion Models",
    ],
  },
  {
    slug: "editorial-fashion-photography-guide",
    title:
      "Editorial Fashion Photography: Light, Silhouette & Story",
    excerpt:
      "A modern approach to fashion editorials — from sculpted light and movement to styling, composition and visual storytelling.",
    category: "Editorial",
    location: "India",
    readTime: "6 min",
    date: "September 2026",
    number: "03",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253463/Editorial/kfrynsh9asrvv7ssbstn.jpg",
    tags: [
      "Editorial Photography",
      "Fashion Editorial",
      "Creative Direction",
    ],
  },
  {
    slug: "lookbook-photography-for-fashion-brands",
    title:
      "The Contemporary Fashion Lookbook: From Collection to Campaign",
    excerpt:
      "How designers and fashion labels can create sophisticated lookbooks that translate naturally across e-commerce, campaigns and social media.",
    category: "Lookbook",
    location: "India",
    readTime: "6 min",
    date: "August 2026",
    number: "04",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253454/Editorial/cvtaafx4nueduk7yyxdd.jpg",
    tags: [
      "Lookbook",
      "Fashion Brands",
      "Collection Photography",
    ],
  },
  {
    slug: "catalogue-photography-fashion-ecommerce",
    title:
      "Catalogue Photography, Reimagined for Modern Fashion Commerce",
    excerpt:
      "A guide to creating clean, consistent and premium catalogue imagery for contemporary fashion and e-commerce brands.",
    category: "Catalogue",
    location: "India",
    readTime: "7 min",
    date: "August 2026",
    number: "05",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263186/HFashion/nxdz5cl9jctfbeapnyc2.jpg",
    tags: [
      "Catalogue Photography",
      "E-commerce",
      "Fashion Commerce",
    ],
  },
  {
    slug: "fashion-photography-indore",
    title:
      "Fashion Photography in Indore: Editorial Energy Meets Commercial Precision",
    excerpt:
      "A look at model portfolios, designer shoots, commercial campaigns and fashion content production in Indore.",
    category: "Locations",
    location: "Indore · India",
    readTime: "6 min",
    date: "August 2026",
    number: "06",
    image:
      "https://ik.imagekit.io/mfashion/editorial/maestrofilms-12.jpg?updatedAt=1789720929593&ik-s=c20113508936530e4a94c04ccb13ab47bc216acd",
    tags: [
      "Fashion Photography Indore",
      "Model Shoot Indore",
      "Fashion Photographer",
    ],
  },
  {
    slug: "fashion-photography-mumbai",
    title:
      "Fashion Photography in Mumbai: Building a Contemporary Visual Identity",
    excerpt:
      "From fashion editorials to commercial campaigns, discover how modern fashion imagery can be developed in Mumbai.",
    category: "Locations",
    location: "Mumbai · India",
    readTime: "6 min",
    date: "August 2026",
    number: "07",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253444/Editorial/bvp2pxhkzfiu9gf7fxbj.jpg",
    tags: [
      "Fashion Photography Mumbai",
      "Mumbai Fashion",
      "Editorial",
    ],
  },
  {
    slug: "fashion-photography-delhi-ncr",
    title:
      "Fashion Photography in Delhi NCR: Editorial Direction for Modern Brands",
    excerpt:
      "A practical guide to planning model portfolios, designer campaigns, lookbooks and fashion editorials in Delhi NCR.",
    category: "Locations",
    location: "Delhi NCR · India",
    readTime: "6 min",
    date: "July 2026",
    number: "08",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253451/Editorial/cr0lar6iif1igbopnxdr.jpg",
    tags: [
      "Fashion Photography Delhi",
      "Delhi NCR",
      "Fashion Editorial",
    ],
  },
  {
    slug: "fashion-photography-jaipur",
    title:
      "Fashion Photography in Jaipur: Architecture, Couture & Editorial Space",
    excerpt:
      "How Jaipur's architectural character can become part of sophisticated fashion campaigns, editorials and model portfolios.",
    category: "Locations",
    location: "Jaipur · India",
    readTime: "6 min",
    date: "July 2026",
    number: "09",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253471/Editorial/w5h9w0oikifkz9yoqils.jpg",
    tags: [
      "Fashion Photography Jaipur",
      "Jaipur Editorial",
      "Designer Campaign",
    ],
  },
  {
    slug: "fashion-reels-for-brands",
    title:
      "Fashion Reels: When Still Photography Becomes Motion",
    excerpt:
      "How modern fashion productions can combine still photography and cinematic short-form content into one visual campaign.",
    category: "Motion",
    location: "India",
    readTime: "5 min",
    date: "July 2026",
    number: "10",
    image:
      "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253700/Product/hux4epfgwfidjkkyuil4.jpg",
    tags: [
      "Fashion Reels",
      "Fashion Films",
      "Social Content",
    ],
  },
];

const categories = [
  "All",
  "Fashion",
  "Model Portfolio",
  "Editorial",
  "Lookbook",
  "Catalogue",
  "Locations",
  "Motion",
];

const faqs = [
  {
    question: "What is fashion editorial photography?",
    answer:
      "Fashion editorial photography uses styling, lighting, composition, posing and creative direction to communicate a visual story around fashion. It is commonly created for magazines, designer collections, campaigns, portfolios and brand storytelling.",
  },
  {
    question: "How should a model prepare for a professional portfolio shoot?",
    answer:
      "A model should prepare several complementary outfits, suitable footwear, clean grooming and a small selection of styling references. It is useful to discuss the intended portfolio direction, experience level and desired image types with the photographer before the shoot.",
  },
  {
    question: "What should be included in a fashion model portfolio?",
    answer:
      "A professional portfolio can include clean portraits, full-length images, fashion editorials, different expressions, varied styling and images demonstrating movement and versatility. The final selection should represent the model's current look and intended market.",
  },
  {
    question: "What is the difference between a lookbook and a fashion editorial?",
    answer:
      "A lookbook generally presents a collection in a consistent visual system so customers or buyers can understand the garments. An editorial places greater emphasis on concept, atmosphere, styling, storytelling and artistic direction.",
  },
  {
    question: "Does Maestro Films provide fashion photography in Bhopal?",
    answer:
      "Yes. Maestro Films provides fashion photography and production in Bhopal, including model portfolios, editorials, lookbooks, catalogue photography, commercial campaigns, beauty and jewellery photography, and fashion content.",
  },
  {
    question: "Which cities does Maestro Films serve?",
    answer:
      "Maestro Films serves Bhopal, Indore, Mumbai, Delhi NCR, Jaipur, Hoshangabad/Narmadapuram, Sehore, Vidisha and Dewas, with production available at selected locations across India.",
  },
];

const serviceAreas = [
  "Bhopal",
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

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featured = blogPosts.find((post) => post.featured)!;

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return blogPosts.filter((post) => {
      const categoryMatch =
        activeCategory === "All" ||
        post.category === activeCategory;

      const searchMatch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.location.toLowerCase().includes(term) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(term)
        );

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const posts = filteredPosts.filter(
    (post) => post.slug !== featured.slug
  );

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
        "@type": "WebSite",
        "@id": "https://maestrofilms.co.in/#website",
        url: "https://maestrofilms.co.in",
        name: "Maestro Films",
        publisher: {
          "@id": "https://maestrofilms.co.in/#organization",
        },
        inLanguage: "en-IN",
      },

      {
        "@type": "Blog",
        "@id": "https://maestrofilms.co.in/blog/#blog",
        url: "https://maestrofilms.co.in/blog",
        name: "Maestro Films — Fashion Journal",
        description:
          "A fashion photography journal covering model portfolios, editorials, lookbooks, catalogues, campaigns, fashion films and photography locations across India.",
        publisher: {
          "@id": "https://maestrofilms.co.in/#organization",
        },
        inLanguage: "en-IN",
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url: `https://maestrofilms.co.in/blog/${post.slug}`,
          image: post.image,
          author: {
            "@type": "Organization",
            name: "Maestro Films",
          },
          publisher: {
            "@id": "https://maestrofilms.co.in/#organization",
          },
          articleSection: post.category,
          keywords: post.tags.join(", "),
        })),
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

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] text-[#302920]">

      {/* =========================================================
          SCHEMA
      ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* =========================================================
          HERO / PARISIAN EDITORIAL
      ========================================================= */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#f7f3ee]">

        {/* Soft champagne light */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-1/2 top-[-260px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[#dec59c]/20 blur-[140px]" />

          <div className="absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-[#d7b77e]/10 blur-[130px]" />

          <div className="absolute bottom-[-250px] left-[-180px] h-[550px] w-[550px] rounded-full bg-[#e3d4bf]/30 blur-[130px]" />

        </div>


        {/* Editorial frame */}

        <div className="pointer-events-none absolute inset-5 border border-[#d8cbbb]/70 md:inset-8 lg:inset-10" />


        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-10 py-32 md:px-16 lg:px-20">

          <div className="w-full">

            <div className="flex items-center gap-4">

              <span className="h-px w-12 bg-[#b58c4e]" />

              <p className="text-[9px] uppercase tracking-[0.55em] text-[#a47b3c]">
                Maison Maestro · Édition 01
              </p>

            </div>


            <div className="mt-10 max-w-5xl">

              <h1 className="font-serif text-[62px] font-light leading-[0.9] tracking-[-0.045em] text-[#302920] sm:text-[78px] md:text-[100px] lg:text-[125px]">

                The

                <span className="block pl-[8%] italic text-[#a47b3c]">
                  Fashion
                </span>

                <span className="block pl-[16%]">
                  Journal
                </span>

              </h1>

            </div>


            <div className="mt-12 max-w-xl pl-[8%]">

              <p className="text-sm font-light leading-8 text-[#665c53] md:text-base">

                A contemporary fashion journal by Maestro Films —
                exploring the art of{" "}
                <span className="font-medium text-[#40382f]">
                  model portfolios, editorial photography, couture-inspired
                  imagery, lookbooks, campaigns and fashion films
                </span>{" "}
                across India.

              </p>

            </div>


            <div className="mt-12 flex items-center gap-6 pl-[8%]">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a86c] text-[#a47b3c]">

                <ArrowDownRight
                  size={19}
                  strokeWidth={1.2}
                />

              </div>

              <span className="text-[9px] uppercase tracking-[0.32em] text-[#887a6c]">
                Discover the Journal
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          EDITORIAL INTRO
      ========================================================= */}

      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-6 py-16 md:px-12 md:py-20">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

          <div>

            <p className="text-[9px] uppercase tracking-[0.45em] text-[#a47b3c]">
              Paris · Mumbai · Bhopal
            </p>

            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
              Modern imagery.
              <span className="block italic text-[#a47b3c]">
                Timeless attitude.
              </span>
            </h2>

          </div>


          <p className="max-w-3xl text-sm font-light leading-8 text-[#655c53] md:text-base">

            The Maestro Films Journal explores the visual language behind
            contemporary fashion photography. From the clean precision of
            modern studio portraits to expressive editorial campaigns,
            our stories examine how light, styling, movement, location and
            creative direction shape a fashion image.

          </p>

        </div>

      </section>


      {/* =========================================================
          FEATURED STORY
      ========================================================= */}

      <section className="px-5 py-20 md:px-10 md:py-28 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-center gap-4">

            <span className="text-[9px] uppercase tracking-[0.45em] text-[#a47b3c]">
              Cover Story
            </span>

            <div className="h-px flex-1 bg-[#ddd1c2]" />

            <span className="font-serif text-sm italic text-[#9b8974]">
              01
            </span>

          </div>


          <article className="grid overflow-hidden border border-[#d9cdbf] bg-[#fbf8f4] lg:grid-cols-[1.3fr_0.7fr]">

            <Link
              href={`/blog/${featured.slug}`}
              className="group relative min-h-[550px] overflow-hidden"
            >

              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#201913]/60 via-transparent to-transparent" />


              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.32em] text-[#ecd39e]">
                    {featured.location}
                  </p>

                  <p className="mt-2 font-serif text-2xl italic text-[#fff8ed]">
                    Cover Story
                  </p>

                </div>


                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white">

                  <ArrowRight
                    size={17}
                    strokeWidth={1.2}
                  />

                </div>

              </div>

            </Link>


            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">

              <div className="flex items-center gap-4 text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]">

                <span>
                  {featured.category}
                </span>

                <span className="h-1 w-1 rounded-full bg-[#c9a86c]" />

                <span>
                  {featured.readTime}
                </span>

              </div>


              <h2 className="mt-6 font-serif text-3xl font-light leading-[1.1] text-[#302920] md:text-4xl">

                {featured.title}

              </h2>


              <p className="mt-6 text-[13px] font-light leading-7 text-[#6b6157] md:text-sm">

                {featured.excerpt}

              </p>


              <div className="mt-7 flex flex-wrap gap-2">

                {featured.tags.map((tag) => (

                  <span
                    key={tag}
                    className="rounded-full border border-[#ddd2c5] px-3 py-1.5 text-[7px] uppercase tracking-[0.13em] text-[#8d7e6f]"
                  >
                    {tag}
                  </span>

                ))}

              </div>


              <Link
                href={`/blog/${featured.slug}`}
                className="group mt-9 flex w-fit items-center gap-4 text-[9px] uppercase tracking-[0.32em] text-[#a47b3c]"
              >

                Read the Story

                <ArrowRight
                  size={16}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />

              </Link>

            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          SEARCH
      ========================================================= */}

      <section className="px-5 pb-12 md:px-10 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-7 border-b border-t border-[#ddd1c2] py-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-2 overflow-x-auto">

              {categories.map((category) => {

                const active = category === activeCategory;

                return (

                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[8px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      active
                        ? "border-[#b8955b] bg-[#c9a86c] text-[#fff9f0]"
                        : "border-[#d8ccbe] bg-[#faf7f3] text-[#786b5d] hover:border-[#c9a86c] hover:text-[#a47b3c]"
                    }`}
                  >
                    {category}
                  </button>

                );

              })}

            </div>


            <div className="relative w-full lg:w-[280px]">

              <Search
                size={15}
                strokeWidth={1.2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47b3c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the journal..."
                className="h-11 w-full rounded-full border border-[#d8ccbe] bg-[#faf7f3] pl-10 pr-5 text-xs font-light text-[#4b4239] outline-none placeholder:text-[#a09589] focus:border-[#c9a86c]"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          JOURNAL GRID
      ========================================================= */}

      <section className="px-5 pb-24 md:px-10 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-end justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-[0.42em] text-[#a47b3c]">
                The Archive
              </p>

              <h2 className="mt-3 font-serif text-3xl font-light text-[#302920] md:text-4xl">
                Stories from the studio
              </h2>

            </div>


            <span className="hidden font-serif text-sm italic text-[#9b8974] md:block">
              {posts.length} stories
            </span>

          </div>


          {posts.length > 0 ? (

            <div className="grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">

              {posts.map((post) => (

                <article
                  key={post.slug}
                  className="group"
                >

                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[4/5] overflow-hidden border border-[#ddd1c2] bg-[#eee7df]"
                  >

                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.045]"
                    />


                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/60 via-transparent to-transparent opacity-80" />


                    <span className="absolute left-5 top-5 font-serif text-sm italic text-[#f2dfb7]">
                      {post.number}
                    </span>


                    <span className="absolute bottom-5 left-5 text-[8px] uppercase tracking-[0.28em] text-[#f2dfb7]">
                      {post.location}
                    </span>

                  </Link>


                  <div className="pt-5">

                    <div className="flex items-center justify-between">

                      <span className="text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]">
                        {post.category}
                      </span>

                      <span className="flex items-center gap-1 text-[8px] uppercase tracking-[0.15em] text-[#9a8d80]">

                        <Clock3
                          size={10}
                          strokeWidth={1.2}
                        />

                        {post.readTime}

                      </span>

                    </div>


                    <h3 className="mt-4 font-serif text-[25px] font-light leading-[1.15] text-[#302920] transition-colors duration-300 group-hover:text-[#a47b3c]">

                      {post.title}

                    </h3>


                    <p className="mt-4 text-[12px] font-light leading-7 text-[#6d6258]">

                      {post.excerpt}

                    </p>


                    <div className="mt-5 flex flex-wrap gap-1.5">

                      {post.tags.slice(0, 2).map((tag) => (

                        <span
                          key={tag}
                          className="text-[7px] uppercase tracking-[0.12em] text-[#948577]"
                        >
                          #{tag.replace(/\s+/g, "")}
                        </span>

                      ))}

                    </div>


                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[#a47b3c]"
                    >

                      Explore

                      <ArrowRight
                        size={13}
                        strokeWidth={1.2}
                      />

                    </Link>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="border border-[#ddd1c2] bg-[#faf7f3] py-24 text-center">

              <p className="font-serif text-2xl font-light text-[#40382f]">
                Nothing found in the archive.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-full border border-[#c9a86c] px-6 py-3 text-[8px] uppercase tracking-[0.25em] text-[#a47b3c]"
              >
                Return to Journal
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =========================================================
          AEO SECTION
      ========================================================= */}

      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-24 md:px-10 lg:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles
                  size={14}
                  strokeWidth={1.2}
                  className="text-[#b58c4e]"
                />

                <span className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
                  The Answers
                </span>

              </div>


              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#302920]">

                Fashion,
                <span className="block italic text-[#a47b3c]">
                  explained.
                </span>

              </h2>


              <p className="mt-6 text-[12px] font-light leading-7 text-[#75695e]">

                Clear answers to the questions models, designers and fashion
                brands ask before creating professional imagery.

              </p>

            </div>


            <div className="space-y-3">

              {faqs.map((faq, index) => {

                const open = openFaq === index;

                return (

                  <div
                    key={faq.question}
                    className="border border-[#d7cabc] bg-[#faf7f3]"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(open ? null : index)
                      }
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7"
                    >

                      <span className="font-serif text-lg font-light text-[#40382f]">
                        {faq.question}
                      </span>

                      {open ? (
                        <ChevronUp
                          size={16}
                          strokeWidth={1.2}
                          className="shrink-0 text-[#a47b3c]"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          strokeWidth={1.2}
                          className="shrink-0 text-[#a47b3c]"
                        />
                      )}

                    </button>


                    {open && (

                      <div className="border-t border-[#e2d8cd] px-5 pb-6 pt-5 md:px-7">

                        <p className="text-[12px] font-light leading-7 text-[#6b6157] md:text-[13px]">

                          {faq.answer}

                        </p>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          GEO / INDIA LOCATIONS
      ========================================================= */}

      <section className="px-5 py-24 md:px-10 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden border border-[#d9cdbf] bg-[#faf7f3] px-7 py-16 md:px-12 lg:px-20">

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-[#d9c08f]/15 blur-[100px]" />


            <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

              <div>

                <p className="text-[8px] uppercase tracking-[0.45em] text-[#a47b3c]">
                  Locations · India
                </p>

                <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] text-[#302920] md:text-5xl">

                  From
                  <span className="italic text-[#a47b3c]">
                    {" "}Bhopal
                  </span>

                  <br />

                  to the
                  <span className="italic text-[#a47b3c]">
                    {" "}fashion capitals.
                  </span>

                </h2>

              </div>


              <div>

                <p className="text-sm font-light leading-8 text-[#665c53]">

                  Maestro Films is based in Bhopal and creates fashion
                  photography and production for models, designers, agencies,
                  luxury brands, e-commerce businesses and influencers across
                  selected locations in India.

                </p>


                <div className="mt-8 grid grid-cols-2 gap-y-4 border-t border-[#ded3c6] pt-7 sm:grid-cols-3">

                  {serviceAreas.map((city) => (

                    <div
                      key={city}
                      className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#786c60]"
                    >

                      <MapPin
                        size={11}
                        strokeWidth={1.2}
                        className="text-[#b58c4e]"
                      />

                      {city}

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden border-t border-[#ddd1c2] bg-[#e9dfd3] px-5 py-24 md:px-10 md:py-32 lg:px-12">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d2af6e]/15 blur-[120px]" />


        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-[8px] uppercase tracking-[0.48em] text-[#a47b3c]">
            Maestro Films
          </p>


          <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#302920] md:text-6xl">

            Your next
            <span className="block italic text-[#a47b3c]">
              visual story.
            </span>

          </h2>


          <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-8 text-[#6d6258]">

            Fashion photography, model portfolios, editorials, lookbooks,
            campaigns and fashion films — created with contemporary
            art direction and a refined visual language.

          </p>


          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <Link
              href="/portfolio"
              className="rounded-full border border-[#c9a86c] bg-[#c9a86c] px-7 py-3.5 text-[8px] uppercase tracking-[0.3em] text-[#fffaf3] transition hover:bg-[#b58c4e]"
            >
              View Portfolio
            </Link>


            <Link
              href="/contact"
              className="rounded-full border border-[#c9a86c] bg-[#faf7f3] px-7 py-3.5 text-[8px] uppercase tracking-[0.3em] text-[#a47b3c] transition hover:bg-[#f2e8dc]"
            >
              Start a Project
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          SEO / SEMANTIC FOOTER CONTENT
      ========================================================= */}

      <section className="bg-[#f7f3ee] px-5 py-12 md:px-10 lg:px-12">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[8px] uppercase tracking-[0.4em] text-[#a47b3c]">
            Maestro Films · Fashion Photography Journal
          </p>

          <p className="mt-5 text-[11px] font-light leading-7 text-[#887c70]">

            Explore fashion photography insights from Maestro Films covering
            model portfolio photography, fashion editorials, high-fashion
            imagery, lookbook photography, catalogue shoots, commercial
            campaigns, beauty and jewellery photography, fashion reels and
            visual production in Bhopal, Indore, Mumbai, Delhi NCR, Jaipur,
            Hoshangabad, Narmadapuram, Sehore, Vidisha and Dewas.

          </p>

        </div>

      </section>

    </main>
  );
}