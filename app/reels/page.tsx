"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

import LandscapeFilm from "@/app/components/LandscapeFilm";
 
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

const [imagekitCollage, setImagekitCollage] = useState<string[]>([]);
  const HERO_PLAYBACK_ID = "tA01vNfZ00uH6BIoDrIv006HXgAy0101NiRdaf8QeJHO01lG8";

useEffect(() => {
  async function loadSecureImages() {
    const paths = [
      "/MF_08942.jpg",
      "/MF_08117.JPG",
      "/DSC01975.JPG", 
      "/MF_08305.jpg", 
    ];

    try {
      const urls = await Promise.all(
        paths.map(async (path) => {
          const res = await fetch(
            `/api/imagekit?path=${encodeURIComponent(path)}`
          );
          const data = await res.json();
          return data.url || "";
        })
      );
      setImagekitCollage(urls);
    } catch (err) {
      console.error("Failed to load secure images", err);
    }
  }

  loadSecureImages();
}, []);
  useEffect(() => {
    setMounted(true);
  }, []);

  const motionRef = useRef<HTMLDivElement>(null);
  const [motionInView, setMotionInView] = useState(false);

  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMotionInView(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMotionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
            style={{
              "--controls": "none",   // hides all player controls
            }}
          />


        </div>

        <div
          className={`relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-20 md:pb-28 pt-[calc(72px+5rem)] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
            className={`transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                className={`group relative bg-[#f8f4ee] rounded-lg p-6 border border-black/[0.04] overflow-hidden transition-all duration-500 hover:border-[#c9a86c]/30 hover:shadow-[0_8px_30px_rgba(201,168,108,0.12)] ${mounted
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
    STUDIO FILMS — Spiral Spread (ImageKit)
════════════════════════════════════════ */}
      <section className="relative -mt-10 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT TEXT */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <p className="text-[0.7rem] tracking-[0.32em] uppercase text-[#c9a86c] mb-5 font-medium">
              Motion · Studio Films
            </p>

            <h2 className="font-display text-4xl sm:text-5xl md:text-[3.2rem] font-normal text-[#1a1a1a] leading-[1.08] mb-6">
              Studio films
              <br />
              <span className="italic text-[#c9a86c]">&amp; 4K cuts</span>
            </h2>

            <p className="text-[#555] leading-relaxed max-w-md mb-10 text-base md:text-[1.05rem]">
              Cinematic short-form films shot in 4K. Fashion motion, product cinema
              and brand narratives — crafted for web, social and screen.
            </p>

            <Link
              href="/reels"
              className="group inline-flex items-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-8 py-3.5 text-sm tracking-[0.18em] uppercase font-medium rounded-sm transition-all duration-400 hover:bg-[#e0c48a] hover:shadow-[0_10px_35px_rgba(201,168,108,0.35)]"
            >
              View all reels
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {/* RIGHT : Masonry shuffle collage */}
          {/* RIGHT : Masonry shuffle collage - Secured Private Images */}
<div className="lg:col-span-7 relative h-[480px] sm:h-[560px] md:h-[640px] lg:h-[680px]">
  {[
    { src: imagekitCollage[0], top: "2%", left: "2%", w: "32%", rot: "-9deg", z: 10, delay: "0s" },
    { src: imagekitCollage[1], top: "0%", left: "28%", w: "30%", rot: "-2deg", z: 20, delay: "0.1s" },
    { src: imagekitCollage[2], top: "1%", left: "55%", w: "28%", rot: "9deg",  z:15 },
    { src: imagekitCollage[3], top: "32%", left: "8%", w: "34%", rot: "4deg", z: 25, delay: "0.3s" },
    { src: imagekitCollage[0], top: "28%", left: "42%", w: "31%", rot: "-7deg", z: 30, delay: "0.4s" },
    { src: imagekitCollage[1], top: "38%", left: "68%", w: "27%", rot: "6deg", z: 18, delay: "0.5s" },
    { src: imagekitCollage[2], top: "58%", left: "18%", w: "29%", rot: "-4deg", z: 22, delay: "0.6s" },
    { src: imagekitCollage[3], top: "62%", left: "48%", w: "30%", rot: "5deg", z: 28, delay: "0.7s" },
  ].map((item, i) => (
    <div
      key={i}
      className="absolute aspect-[3/4] rounded-[2px] overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] border-[3px] border-white group masonry-card"
      style={{
        top: item.top,
        left: item.left,
        width: item.w,
        zIndex: item.z,
        transform: `rotate(${item.rot})`,
        animationDelay: item.delay,
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={`Studio film ${i + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
          loading="lazy"
          draggable={false}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTouchCallout: "none",
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}

      {/* Invisible overlay to make right-click / drag harder */}
      <div className="absolute inset-0 z-10" />
    </div>
  ))}

  {/* Soft glow */}
  <div className="absolute inset-10 bg-gradient-to-br from-[#c9a86c]/15 via-transparent to-[#c9a86c]/8 rounded-full blur-3xl -z-10 scale-125 pointer-events-none" />
</div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED LANDSCAPE FILM
      ════════════════════════════════════════ */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pb-10">
        <LandscapeFilm
          title="Brand Campaign Film"
          tag="Featured · 4K Landscape"
          poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90"
          video="/videos/brand-campaign.mp4"
        />
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
              className={`group relative ${c.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
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
      <section className="   px-6 md:px-10 max-w-[1400px] mx-auto">
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