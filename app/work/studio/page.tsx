"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import ReelCard from "@/app/components/ReelCard";
import LandscapeFilm from "@/app/components/ContactForm";

const categories = [
  {
    title: "Fashion Photography",
    desc: "Editorial, lookbooks and campaign stills for print and digital.",
    aspect: "portrait" as const,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Product Shoots",
    desc: "High-resolution product photography for e-commerce and social.",
    aspect: "landscape" as const,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Editorial Series",
    desc: "Story-driven fashion narratives for magazines and brands.",
    aspect: "portrait" as const,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Commercial Films",
    desc: "4K cinematic brand films and short-form commercials.",
    aspect: "landscape" as const,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Modeling Portfolios",
    desc: "Portfolio development — studio + location.",
    aspect: "portrait" as const,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Brand Campaigns",
    desc: "End-to-end visual systems for fashion and lifestyle brands.",
    aspect: "landscape" as const,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
  },
];

const studioFilms = [
  {
    title: "Studio Session",
    tag: "4K Film",
    duration: "0:32",
    poster:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=90",
    video: "/videos/studio-session.mp4",
  },
  {
    title: "Editorial Motion",
    tag: "Fashion Film",
    duration: "0:28",
    poster:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=90",
    video: "/videos/editorial-motion.mp4",
  },
  {
    title: "Product Cinema",
    tag: "Commercial",
    duration: "0:18",
    poster:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=90",
    video: "/videos/product-cinema.mp4",
  },
  {
    title: "Campaign Cut",
    tag: "Brand Film",
    duration: "0:40",
    poster:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=90",
    video: "/videos/campaign-cut.mp4",
  },
];

const tech = [
  { label: "Resolution", value: "4K / 8K capture" },
  { label: "Formats", value: "Landscape + Portrait" },
  { label: "Delivery", value: "Eco-optimized files" },
  { label: "Color", value: "Cinema-grade grading" },
];

export default function WorkStudioPage() {
  const [mounted, setMounted] = useState(false);

 
 const HERO_PLAYBACK_ID = "tA01vNfZ00uH6BIoDrIv006HXgAy0101NiRdaf8QeJHO01lG8";

 
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
       
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
            <MuxPlayer
    playbackId={HERO_PLAYBACK_ID}
    streamType="on-demand"
    autoPlay
    muted
    loop
    playsInline
    poster="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=85"
    metadata={{
      video_title: "Maestro Films — Studio Hero",
      video_id: "hero-studio",
    }}
    accentColor="#c9a86c"
  />

         
        </div>

        <div
          className={`relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-20 md:pb-28 pt-[calc(72px+5rem)] transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#c9a86c]" />
            <p className="text-[0.7rem] tracking-[0.32em] uppercase text-[#c9a86c] font-medium">
              Cinematic Production House
            </p>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] mb-6 max-w-4xl">
            Work &amp;{" "}
            <span className="italic text-[#c9a86c]">Studio</span>
          </h1>

          <p className="max-w-xl text-white/70 text-base md:text-lg leading-relaxed mb-10">
            4K resolution. Eco-conscious workflows. Landscape and portrait
            formats ready for web, print, social and cinema.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-8 py-4 text-sm tracking-[0.18em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e0c48a]"
            >
              <span className="relative z-10">Book a Shoot</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              href="/reels"
              className="inline-flex items-center gap-2 border border-white/25 text-white/90 px-8 py-4 text-sm tracking-[0.18em] uppercase backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-400"
            >
              Watch Reels
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════
          WHAT WE DELIVER
      ════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div
            className={`transition-all duration-1000 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#c9a86c]" />
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-[#c9a86c]">
                What we deliver
              </p>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight mb-7 text-[#1a1a1a]">
              High-resolution imagery built for fashion, product and brand
              storytelling
            </h2>

            <p className="text-[#555] leading-relaxed mb-5 text-[1.05rem]">
              Studio and location work captured in 4K with careful color science,
              lighting andwardrobe. Eco-optimized packages — full-resolution
              masters plus web and social variants.
            </p>
            <p className="text-[#555] leading-relaxed text-[1.05rem]">
              Landscape (16:9) and portrait (3:4 / 9:16) so one shoot feeds
              website heroes, Instagram Reels, lookbooks and ads.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tech.map((t, i) => (
              <div
                key={t.label}
                className={`group relative bg-[#f8f4ee] rounded-lg p-6 border border-black/[0.04] overflow-hidden transition-all duration-500 hover:border-[#c9a86c]/30 hover:shadow-[0_8px_30px_rgba(201,168,108,0.12)] ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a86c]/0 to-[#c9a86c]/0 group-hover:from-[#c9a86c]/5 group-hover:to-transparent transition-all duration-500" />
                <p className="relative text-[0.65rem] tracking-[0.2em] uppercase text-[#999] mb-2">
                  {t.label}
                </p>
                <p className="relative font-display text-lg md:text-xl text-[#1a1a1a]">
                  {t.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* ════════════════════════════════════════
          STUDIO FILMS — Luxury Motion Grid
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#c9a86c]" />
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-[#c9a86c]">
                Motion
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-[#1a1a1a]">
              Studio films &amp; 4K cuts
            </h2>
            <p className="text-[#666] mt-3 max-w-md text-sm leading-relaxed">
              Click play to preview. Replace the files in{" "}
              <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded">
                /public/videos/
              </code>{" "}
              with your own 4K masters.
            </p>
          </div>

          <Link
            href="/reels"
            className="group text-sm tracking-[0.18em] uppercase text-[#666] hover:text-[#1a1a1a] transition-colors flex items-center gap-2"
          >
            View all reels
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {studioFilms.map((f, i) => (
            <div
              key={f.title}
              className="group relative"
              style={{
                animation: mounted
                  ? `fadeUp 0.7s ease-out ${i * 0.1}s both`
                  : "none",
              }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#c9a86c]/20 via-transparent to-[#c9a86c]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              <div className="relative rounded-2xl overflow-hidden bg-[#111] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(201,168,108,0.25)]">
                <ReelCard {...f} />
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* ════════════════════════════════════════
          CAPABILITIES — Premium Card Grid
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="h-px w-8 bg-[#c9a86c]" />
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-[#c9a86c]">
              Capabilities
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-[#1a1a1a]">
            Studio &amp; on-location work
          </h2>
          <p className="mt-4 text-[#666] max-w-xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            Six specialized offerings — from editorial fashion to full brand
            campaigns — all captured in 4K with cinema-grade color and
            multi-format delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {categories.map((c, i) => (
            <article
              key={c.title}
              className={`group relative ${
                c.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
              }`}
              style={{
                animation: mounted
                  ? `fadeUp 0.75s ease-out ${0.15 + i * 0.08}s both`
                  : "none",
              }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#c9a86c]/30 via-transparent to-[#c9a86c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

              <div className="relative h-full rounded-2xl overflow-hidden bg-[#0f0f0f] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.35)] transition-all duration-600 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_-15px_rgba(201,168,108,0.28)]">
                <img
                  src={c.image}
                  alt={`${c.title} — Maestro Films`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-[#c9a86c]/0 group-hover:bg-[#c9a86c]/[0.07] transition-colors duration-700" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="font-display text-xl md:text-2xl mb-2 leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed max-w-[90%] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                      {c.desc}
                    </p>
                  </div>
                  <div className="mt-5 h-[1.5px] w-10 bg-[#c9a86c]/70 group-hover:w-16 transition-all duration-500" />
                </div>

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 animate-[wobble_4s_ease-in-out_infinite]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEO / GEO
      ════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="relative bg-[#f8f4ee] rounded-2xl p-8 md:p-14 border border-black/[0.04] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#c9a86c]/10 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#c9a86c]" />
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-[#c9a86c]">
                Local &amp; Search Visibility
              </p>
            </div>

            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.1rem] font-normal mb-5 text-[#1a1a1a] max-w-2xl">
              Fashion photography SEO &amp; GEO for Bhopal and Mumbai
            </h2>

            <p className="text-[#555] leading-relaxed max-w-3xl mb-8 text-[1.05rem]">
              Alt-text ready frames, schema-friendly pages, and location signals
              so work ranks for “fashion photographer Bhopal”, “product shoot
              Mumbai” and editorial searches.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#444]">
              {[
                "Local business schema + geo meta",
                "Image SEO (alt, filenames, dimensions)",
                "Fast, eco-optimized delivery for Core Web Vitals",
                "Social-first crops for Reels / Stories / Feed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a86c] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1225_0%,#0a0a0a_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a86c]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto text-center">
          <p className="text-[0.7rem] tracking-[0.32em] uppercase text-[#c9a86c] mb-5">
            Next Steps
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6">
            Ready to book the studio?
          </h2>
          <p className="text-white/55 mb-12 max-w-md mx-auto text-base md:text-lg">
            Fashion, product, editorial or commercial — tell us the brief.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_40px_rgba(201,168,108,0.35)]"
            >
              Book a Shoot
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              href="/reels"
              className="inline-flex items-center border border-white/20 text-white/90 px-10 py-4 text-sm tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-white/8 hover:border-white/40 transition-all duration-400"
            >
              Watch Reels
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}