"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

/* -------------------------------------------------------------------------- */
/*  Types & Data                                                              */
/* -------------------------------------------------------------------------- */

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
    title: "Fashion Photography in Bhopal: The Modern Guide to Editorial & Model Portfolios",
    excerpt: "A refined guide to creating model portfolios, editorial imagery and fashion campaigns in Bhopal with considered styling, lighting and creative direction.",
    category: "Fashion",
    location: "Bhopal · India",
    readTime: "7 min",
    date: "September 2026",
    number: "01",
    featured: true,
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263186/HFashion/nmjhhqfhi9qjmsfkca5l.jpg",
    tags: ["Fashion Photography Bhopal", "Model Portfolio", "Editorial"],
  },
  {
    slug: "how-to-build-model-portfolio",
    title: "The Art of the Model Portfolio: Creating Images With Presence",
    excerpt: "What separates an ordinary portfolio from an editorial portfolio? We explore expression, posing, styling, lighting and image selection.",
    category: "Model Portfolio",
    location: "India",
    readTime: "8 min",
    date: "September 2026",
    number: "02",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253471/Editorial/ir2tp2gwvdsqt7pedcpr.jpg",
    tags: ["Model Photography", "Portfolio Shoot", "Fashion Models"],
  },
  {
    slug: "editorial-fashion-photography-guide",
    title: "Editorial Fashion Photography: Light, Silhouette & Story",
    excerpt: "A modern approach to fashion editorials — from sculpted light and movement to styling, composition and visual storytelling.",
    category: "Editorial",
    location: "India",
    readTime: "6 min",
    date: "September 2026",
    number: "03",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253463/Editorial/kfrynsh9asrvv7ssbstn.jpg",
    tags: ["Editorial Photography", "Fashion Editorial", "Creative Direction"],
  },
  {
    slug: "lookbook-photography-for-fashion-brands",
    title: "The Contemporary Fashion Lookbook: From Collection to Campaign",
    excerpt: "How designers and fashion labels can create sophisticated lookbooks that translate naturally across e-commerce, campaigns and social media.",
    category: "Lookbook",
    location: "India",
    readTime: "6 min",
    date: "August 2026",
    number: "04",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253454/Editorial/cvtaafx4nueduk7yyxdd.jpg",
    tags: ["Lookbook", "Fashion Brands", "Collection Photography"],
  },
  {
    slug: "catalogue-photography-fashion-ecommerce",
    title: "Catalogue Photography, Reimagined for Modern Fashion Commerce",
    excerpt: "A guide to creating clean, consistent and premium catalogue imagery for contemporary fashion and e-commerce brands.",
    category: "Catalogue",
    location: "India",
    readTime: "7 min",
    date: "August 2026",
    number: "05",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790263186/HFashion/nxdz5cl9jctfbeapnyc2.jpg",
    tags: ["Catalogue Photography", "E-commerce", "Fashion Commerce"],
  },
  {
    slug: "fashion-photography-indore",
    title: "Fashion Photography in Indore: Editorial Energy Meets Commercial Precision",
    excerpt: "A look at model portfolios, designer shoots, commercial campaigns and fashion content production in Indore.",
    category: "Locations",
    location: "Indore · India",
    readTime: "6 min",
    date: "August 2026",
    number: "06",
    image: "https://ik.imagekit.io/mfashion/editorial/maestrofilms-12.jpg?updatedAt=1789720929593&ik-s=c20113508936530e4a94c04ccb13ab47bc216acd",
    tags: ["Fashion Photography Indore", "Model Shoot Indore", "Fashion Photographer"],
  },
  {
    slug: "fashion-photography-mumbai",
    title: "Fashion Photography in Mumbai: Building a Contemporary Visual Identity",
    excerpt: "From fashion editorials to commercial campaigns, discover how modern fashion imagery can be developed in Mumbai.",
    category: "Locations",
    location: "Mumbai · India",
    readTime: "6 min",
    date: "August 2026",
    number: "07",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253444/Editorial/bvp2pxhkzfiu9gf7fxbj.jpg",
    tags: ["Fashion Photography Mumbai", "Mumbai Fashion", "Editorial"],
  },
  {
    slug: "fashion-photography-delhi-ncr",
    title: "Fashion Photography in Delhi NCR: Editorial Direction for Modern Brands",
    excerpt: "A practical guide to planning model portfolios, designer campaigns, lookbooks and fashion editorials in Delhi NCR.",
    category: "Locations",
    location: "Delhi NCR · India",
    readTime: "6 min",
    date: "July 2026",
    number: "08",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253451/Editorial/cr0lar6iif1igbopnxdr.jpg",
    tags: ["Fashion Photography Delhi", "Delhi NCR", "Fashion Editorial"],
  },
  {
    slug: "fashion-photography-jaipur",
    title: "Fashion Photography in Jaipur: Architecture, Couture & Editorial Space",
    excerpt: "How Jaipur's architectural character can become part of sophisticated fashion campaigns, editorials and model portfolios.",
    category: "Locations",
    location: "Jaipur · India",
    readTime: "6 min",
    date: "July 2026",
    number: "09",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253471/Editorial/w5h9w0oikifkz9yoqils.jpg",
    tags: ["Fashion Photography Jaipur", "Jaipur Editorial", "Designer Campaign"],
  },
  {
    slug: "fashion-reels-for-brands",
    title: "Fashion Reels: When Still Photography Becomes Motion",
    excerpt: "How modern fashion productions can combine still photography and cinematic short-form content into one visual campaign.",
    category: "Motion",
    location: "India",
    readTime: "5 min",
    date: "July 2026",
    number: "10",
    image: "https://res.cloudinary.com/dpgnhczzz/image/upload/v1790253700/Product/hux4epfgwfidjkkyuil4.jpg",
    tags: ["Fashion Reels", "Fashion Films", "Social Content"],
  },
];

const categories = ["All", "Fashion", "Model Portfolio", "Editorial", "Lookbook", "Catalogue", "Locations", "Motion"];

const faqs = [
  {
    question: "What is fashion editorial photography?",
    answer: "Fashion editorial photography uses styling, lighting, composition, posing and creative direction to communicate a visual story around fashion. It is commonly created for magazines, designer collections, campaigns, portfolios and brand storytelling.",
  },
  {
    question: "How should a model prepare for a professional portfolio shoot?",
    answer: "A model should prepare several complementary outfits, suitable footwear, clean grooming and a small selection of styling references. It is useful to discuss the intended portfolio direction, experience level and desired image types with the photographer before the shoot.",
  },
  {
    question: "What should be included in a fashion model portfolio?",
    answer: "A professional portfolio can include clean portraits, full-length images, fashion editorials, different expressions, varied styling and images demonstrating movement and versatility. The final selection should represent the model's current look and intended market.",
  },
  {
    question: "What is the difference between a lookbook and a fashion editorial?",
    answer: "A lookbook generally presents a collection in a consistent visual system so customers or buyers can understand the garments. An editorial places greater emphasis on concept, atmosphere, styling, storytelling and artistic direction.",
  },
  {
    question: "Does Maestro Films provide fashion photography in Bhopal?",
    answer: "Yes. Maestro Films provides fashion photography and production in Bhopal, including model portfolios, editorials, lookbooks, catalogue photography, commercial campaigns, beauty and jewellery photography, and fashion content.",
  },
  {
    question: "Which cities does Maestro Films serve?",
    answer: "Maestro Films serves Bhopal, Indore, Mumbai, Delhi NCR, Jaipur, Hoshangabad/Narmadapuram, Sehore, Vidisha and Dewas, with production available at selected locations across India.",
  },
];

const serviceAreas = [
  "Bhopal", "Indore", "Mumbai", "Delhi NCR", "Jaipur",
  "Hoshangabad", "Narmadapuram", "Sehore", "Vidisha", "Dewas",
];

/* -------------------------------------------------------------------------- */
/*  Animation Variants                                                        */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featured = blogPosts.find((post) => post.featured)!;

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return blogPosts.filter((post) => {
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;
      const searchMatch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.location.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const posts = filteredPosts.filter((post) => post.slug !== featured.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://maestrofilms.co.in/#organization",
        name: "Maestro Films",
        url: "https://maestrofilms.co.in",
        description: "Premium fashion photography and production studio serving the fashion industry across India.",
      },
      {
        "@type": "WebSite",
        "@id": "https://maestrofilms.co.in/#website",
        url: "https://maestrofilms.co.in",
        name: "Maestro Films",
        publisher: { "@id": "https://maestrofilms.co.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "Blog",
        "@id": "https://maestrofilms.co.in/blog/#blog",
        url: "https://maestrofilms.co.in/blog",
        name: "Maestro Films — Fashion Journal",
        description: "A fashion photography journal covering model portfolios, editorials, lookbooks, catalogues, campaigns, fashion films and photography locations across India.",
        publisher: { "@id": "https://maestrofilms.co.in/#organization" },
        inLanguage: "en-IN",
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url: `https://maestrofilms.co.in/blog/${post.slug}`,
          image: post.image,
          author: { "@type": "Organization", name: "Maestro Films" },
          publisher: { "@id": "https://maestrofilms.co.in/#organization" },
          articleSection: post.category,
          keywords: post.tags.join(", "),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://maestrofilms.co.in" },
          { "@type": "ListItem", position: 2, name: "Journal", item: "https://maestrofilms.co.in/blog" },
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
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Soft ambient light */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-200px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#dec59c]/15 blur-[120px]" />
          <div className="absolute right-[-120px] top-[20%] h-[400px] w-[400px] rounded-full bg-[#d7b77e]/10 blur-[100px]" />
        </div>

        {/* Subtle frame */}
        <div className="pointer-events-none absolute inset-4 border border-[#d8cbbb]/50 md:inset-6 lg:inset-8" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24 md:px-12 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full"
          >
            <motion.div  className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#b58c4e]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#a47b3c]">
                Maison Maestro · Édition 01
              </p>
            </motion.div>

            <motion.h1
              
              className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[0.92] tracking-tight text-[#302920] sm:text-6xl md:text-7xl lg:text-[6.5rem]"
            >
              The
              <span className="block italic text-[#a47b3c]">Fashion</span>
              <span className="block">Journal</span>
            </motion.h1>

            <motion.p
               
              className="mt-8 max-w-lg text-sm font-light leading-7 text-[#665c53] md:text-base md:leading-8"
            >
              A contemporary fashion journal by Maestro Films — exploring the art of{" "}
              <span className="font-medium text-[#40382f]">
                model portfolios, editorial photography, lookbooks, campaigns and fashion films
              </span>{" "}
              across India.
            </motion.p>

            <motion.div  className="mt-10 flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a86c] text-[#a47b3c] transition-colors hover:bg-[#c9a86c] hover:text-white">
                <ArrowDownRight size={18} strokeWidth={1.3} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#887a6c]">
                Discover the Journal
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          INTRO STRIP
      ========================================================= */}
      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a47b3c]">
              Paris · Mumbai · Bhopal
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light leading-snug text-[#302920] md:text-3xl">
              Modern imagery.
              <span className="block italic text-[#a47b3c]">Timeless attitude.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-light leading-7 text-[#655c53] md:text-[15px] md:leading-8">
            The Maestro Films Journal explores the visual language behind contemporary fashion photography.
            From clean studio portraits to expressive editorial campaigns, we examine how light, styling,
            movement and creative direction shape a fashion image.
          </p>
        </div>
      </section>

      {/* =========================================================
          FEATURED STORY
      ========================================================= */}
      <section className="px-5 py-16 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#a47b3c]">Cover Story</span>
            <div className="h-px flex-1 bg-[#ddd1c2]" />
            <span className="font-serif text-sm italic text-[#9b8974]">01</span>
          </div>

          <article className="grid overflow-hidden border border-[#d9cdbf] bg-[#fbf8f4] lg:grid-cols-[1.25fr_0.75fr]">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative min-h-[420px] overflow-hidden md:min-h-[520px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201913]/55 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#ecd39e]">
                    {featured.location}
                  </p>
                  <p className="mt-1 font-serif text-xl italic text-[#fff8ed]">Cover Story</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition group-hover:bg-white/10">
                  <ArrowRight size={16} strokeWidth={1.3} />
                </div>
              </div>
            </Link>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-[#a47b3c]">
                <span>{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-[#c9a86c]" />
                <span>{featured.readTime}</span>
              </div>

              <h2 className="mt-5 font-serif text-2xl font-light leading-snug text-[#302920] md:text-3xl lg:text-[2rem]">
                {featured.title}
              </h2>

              <p className="mt-5 text-[13px] font-light leading-7 text-[#6b6157]">
                {featured.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#ddd2c5] px-3 py-1 text-[8px] uppercase tracking-[0.12em] text-[#8d7e6f]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${featured.slug}`}
                className="group mt-8 flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#a47b3c]"
              >
                Read the Story
                <ArrowRight
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          FILTERS + SEARCH
      ========================================================= */}
      <section className="px-5 pb-10 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-t border-[#ddd1c2] py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((category) => {
                const active = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${
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

            <div className="relative w-full lg:w-[260px]">
              <Search
                size={14}
                strokeWidth={1.3}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47b3c]"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the journal..."
                className="h-10 w-full rounded-full border border-[#d8ccbe] bg-[#faf7f3] pl-10 pr-4 text-xs font-light text-[#4b4239] outline-none placeholder:text-[#a09589] focus:border-[#c9a86c]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNAL GRID
      ========================================================= */}
      <section className="px-5 pb-20 md:px-10 md:pb-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#a47b3c]">The Archive</p>
              <h2 className="mt-2 font-serif text-2xl font-light text-[#302920] md:text-3xl">
                Stories from the studio
              </h2>
            </div>
            <span className="hidden font-serif text-sm italic text-[#9b8974] md:block">
              {posts.length} stories
            </span>
          </div>

          {posts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[4/5] overflow-hidden border border-[#ddd1c2] bg-[#eee7df]"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-900 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/50 via-transparent to-transparent opacity-70" />
                    <span className="absolute left-4 top-4 font-serif text-sm italic text-[#f2dfb7]">
                      {post.number}
                    </span>
                    <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.24em] text-[#f2dfb7]">
                      {post.location}
                    </span>
                  </Link>

                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#a47b3c]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-[#9a8d80]">
                        <Clock3 size={10} strokeWidth={1.3} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-xl font-light leading-snug text-[#302920] transition-colors duration-300 group-hover:text-[#a47b3c] md:text-[1.35rem]">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-[12px] font-light leading-6 text-[#6d6258] line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.26em] text-[#a47b3c]"
                    >
                      Explore
                      <ArrowRight size={12} strokeWidth={1.3} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="border border-[#ddd1c2] bg-[#faf7f3] py-20 text-center">
              <p className="font-serif text-xl font-light text-[#40382f]">
                Nothing found in the archive.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-full border border-[#c9a86c] px-5 py-2.5 text-[9px] uppercase tracking-[0.22em] text-[#a47b3c]"
              >
                Return to Journal
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          AEO – FAQ
      ========================================================= */}
      <section className="border-y border-[#ddd1c2] bg-[#eee6dc] px-5 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={13} strokeWidth={1.3} className="text-[#b58c4e]" />
                <span className="text-[9px] uppercase tracking-[0.36em] text-[#a47b3c]">
                  The Answers
                </span>
              </div>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
                Fashion,
                <span className="block italic text-[#a47b3c]">explained.</span>
              </h2>
              <p className="mt-5 text-[13px] font-light leading-7 text-[#75695e]">
                Clear answers to the questions models, designers and fashion brands ask before creating professional imagery.
              </p>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question} className="border border-[#d7cabc] bg-[#faf7f3]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
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
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#e2d8cd] px-5 pb-5 pt-4 md:px-6">
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
        </div>
      </section>

      {/* =========================================================
          GEO – LOCATIONS
      ========================================================= */}
      <section className="px-5 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden border border-[#d9cdbf] bg-[#faf7f3] px-6 py-12 md:px-10 lg:px-14">
            <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[280px] w-[280px] rounded-full bg-[#d9c08f]/12 blur-[80px]" />

            <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-[#a47b3c]">
                  Locations · India
                </p>
                <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#302920] md:text-4xl">
                  From
                  <span className="italic text-[#a47b3c]"> Bhopal</span>
                  <br />
                  to the
                  <span className="italic text-[#a47b3c]"> fashion capitals.</span>
                </h2>
              </div>

              <div>
                <p className="text-sm font-light leading-7 text-[#665c53]">
                  Maestro Films is based in Bhopal and creates fashion photography and production
                  for models, designers, agencies, luxury brands and e-commerce businesses across
                  selected locations in India.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-y-3 border-t border-[#ded3c6] pt-6 sm:grid-cols-3">
                  {serviceAreas.map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#786c60]"
                    >
                      <MapPin size={11} strokeWidth={1.3} className="text-[#b58c4e]" />
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
      <section className="relative overflow-hidden border-t border-[#ddd1c2] bg-[#e9dfd3] px-5 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d2af6e]/12 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#a47b3c]">
            Maestro Films
          </p>

          <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-[#302920] md:text-5xl">
            Your next
            <span className="block italic text-[#a47b3c]">visual story.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-[#6d6258]">
            Fashion photography, model portfolios, editorials, lookbooks, campaigns and fashion films —
            created with contemporary art direction and a refined visual language.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/portfolio"
              className="rounded-full border border-[#c9a86c] bg-[#c9a86c] px-6 py-3 text-[9px] uppercase tracking-[0.26em] text-[#fffaf3] transition hover:bg-[#b58c4e]"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#c9a86c] bg-[#faf7f3] px-6 py-3 text-[9px] uppercase tracking-[0.26em] text-[#a47b3c] transition hover:bg-[#f2e8dc]"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEO FOOTER
      ========================================================= */}
      <section className="bg-[#f7f3ee] px-5 py-10 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[9px] uppercase tracking-[0.36em] text-[#a47b3c]">
            Maestro Films · Fashion Photography Journal
          </p>
          <p className="mt-4 text-[11px] font-light leading-6 text-[#887c70]">
            Explore fashion photography insights from Maestro Films covering model portfolio photography,
            fashion editorials, high-fashion imagery, lookbook photography, catalogue shoots, commercial
            campaigns, beauty and jewellery photography, fashion reels and visual production in Bhopal,
            Indore, Mumbai, Delhi NCR, Jaipur, Hoshangabad, Narmadapuram, Sehore, Vidisha and Dewas.
          </p>
        </div>
      </section>
    </main>
  );
}