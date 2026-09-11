"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

import LandscapeFilm from "@/app/components/ContactForm";
import ReelsSection from "./reels";

import Navbar from "../components/Nav";

const PLAYBACK_ID = "yCqRdIERZFqOgcxh5gk00FtSrwWoDOGeJlXzyS7YsPVA";
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
        "/Copy of 9 copy.jpg",
        "/MF_08006.JPG",
        "/MF_08305.jpg",
        "/Copy of 20 copy.jpg",
        "/Copy of MF_08086.jpg",
        "/MF_08982.jpg",
        "/Copy of 13.jpg",
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
      <Navbar />
      <section className="relative flex items-end overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 py-0.5">
          <MuxPlayer
            playbackId={HERO_PLAYBACK_ID}
            streamType="on-demand"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_PLAYBACK_ID}
            metadata={{
              video_title: "Maestro Films — Studio Hero",
              video_id: "hero-studio",
            }}
            accentColor="#c9a86c"
            style={{
              "--controls": "none",
            }}
          />
        </div>
        <div
          className={`relative z-10  m-3 max-w-[1400px] mx-auto w-full px-5 sm:px-6 md:px-10 
      pb-12 sm:pb-16 md:pb-28 
      pt-[calc(72px+2.5rem)] sm:pt-[calc(72px+4rem)] md:pt-[calc(72px+5rem)]
      transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="h-px w-7 sm:w-10 bg-[#c9a86c]" />
            <p className="text-[0.62rem] sm:text-[0.7rem] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-gold font-medium">
              Cinematic Production House
            </p>  <span className="h-px w-7 sm:w-10 bg-[#c9a86c]" />
          </div>

          {/* Title */}
          <h1 className="font-display text-[2.65rem] leading-[0.92] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-4 sm:mb-6 max-w-4xl">
            Work &amp;{" "}
            <span className="italic text-gold">Studio</span>
          </h1>

          {/* Description */}
          <p className="max-w-md text-gold text-[0.92rem] sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5">
            4K resolution. Eco-conscious workflows. Landscape and portrait
            formats ready for web, print, social and cinema.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center justify-center gap-3 rounded-xl
          bg-[#c9a86c] text-white/70
          px-7 sm:px-8 py-3.5 sm:py-4 
          text-[0.78rem] sm:text-sm tracking-[0.18em] uppercase font-medium 
          transition-all duration-500 hover:bg-[#e0c48a]
          shadow-[0_4px_20px_rgba(201,168,108,0.25)]"
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
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════
          WHAT WE DELIVER
      ════════════════════════════════════════ */}
      <section className="relative text-gold py-10 sm:py-12 md:py-16 px-5 sm:px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          <div
            className={`transition-all duration-1000 delay-100  ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#c9a86c]" />
              <p className="text-[0.9rem] sm:text-[0.9rem] tracking-[0.28em] uppercase text-[#c9a86c]">
                What we deliver
              </p>  <span className="h-px w-8 bg-[#c9a86c]" />
            </div>

            <h2 className="font-display text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight mb-5 sm:mb-7 text-gold">
              High-resolution imagery built for fashion, product and brand
              storytelling
            </h2>

            <p className="text-gold leading-relaxed mb-4 sm:mb-5 text-[0.95rem] sm:text-[1.05rem]">
              Studio and location work captured in 4K with careful color science,
              lighting and wardrobe. Eco-optimized packages — full-resolution
              masters plus web and social variants.
            </p>
            <p className=" text-gold leading-relaxed text-[0.95rem] sm:text-[1.05rem]">
              Landscape (16:9) and portrait (3:4 / 9:16) so one shoot feeds
              website heroes, Instagram Reels, lookbooks and ads.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 ">
            {tech.map((t, i) => (
              <div
                key={t.label}
                className={`group relative bg-[#f8f4ee] rounded-lg p-4 sm:p-6 border border-black/[0.04] overflow-hidden transition-all duration-500 hover:border-[#c9a86c]/30 hover:shadow-[0_8px_30px_rgba(201,168,108,0.12)] ${mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="absolute inset-0 text-gold bg-gradient-to-br from-[#c9a86c]/0 to-[#c9a86c]/0 group-hover:from-[#c9a86c]/5 group-hover:to-transparent transition-all duration-500" />
                <p className="relative text-[0.6rem] sm:text-[0.65rem] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-gold mb-1.5 sm:mb-2">
                  {t.label}
                </p>
                <p className="relative font-display text-base sm:text-lg md:text-xl text-gold leading-snug">
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
      <section className="relative py-5 px-5 sm:px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10 items-center">
          {/* LEFT TEXT */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <p className="text-[0.65rem] sm:text-[0.7rem] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-gold mb-4 sm:mb-5 font-medium">
              Motion · Studio Films
            </p>

            <h2 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal text-gold leading-[1.08] mb-5 sm:mb-6">
              Studio films
              <br />
              <span className="italic text-gold">&amp; 4K cuts</span>
            </h2>

            <p className="text-gold leading-relaxed max-w-md mb-8 sm:mb-10 text-[0.95rem] sm:text-base md:text-[1.05rem]">
              Cinematic short-form films shot in 4K. Fashion motion, product cinema
              and brand narratives — crafted for web, social and screen.
            </p>

            <Link
              href="/reels"
              className="group inline-flex items-center gap-3 bg-[#c9a86c] text-white/70 px-7 sm:px-8 py-3.5 text-[0.8rem] sm:text-sm tracking-[0.16em] sm:tracking-[0.18em] uppercase font-medium rounded-sm transition-all duration-400 hover:bg-[#e0c48a] hover:shadow-[0_10px_35px_rgba(201,168,108,0.35)]"
            >
              View all reels
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>

          {/* RIGHT : Masonry shuffle collage - Secured Private Images */}
          <div className="lg:col-span-7 relative h-[420px] xs:h-[460px] sm:h-[520px] md:h-[600px] lg:h-[680px] mt-2 sm:mt-0">
            {[
              { src: imagekitCollage[0], top: "2%", left: "2%", w: "32%", rot: "-9deg", z: 10, delay: "0s" },
              { src: imagekitCollage[1], top: "0%", left: "28%", w: "30%", rot: "-2deg", z: 20, delay: "0.1s" },
              { src: imagekitCollage[2], top: "1%", left: "55%", w: "28%", rot: "9deg", z: 15 },
              { src: imagekitCollage[3], top: "32%", left: "8%", w: "34%", rot: "4deg", z: 25, delay: "0.3s" },
              { src: imagekitCollage[4], top: "28%", left: "42%", w: "31%", rot: "-7deg", z: 30, delay: "0.4s" },
              { src: imagekitCollage[5], top: "38%", left: "68%", w: "27%", rot: "6deg", z: 18, delay: "0.5s" },
              { src: imagekitCollage[6], top: "58%", left: "18%", w: "29%", rot: "-4deg", z: 30, delay: "0.6s" },
              { src: imagekitCollage[7], top: "62%", left: "48%", w: "30%", rot: "5deg", z: 30, delay: "0.7s" },
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

                <div className="absolute inset-0 z-10" />
              </div>
            ))}

            {/* Soft glow */}
            <div className="absolute inset-10 bg-gradient-to-br from-[#c9a86c]/15 via-transparent to-[#c9a86c]/8 rounded-full blur-3xl -z-10 scale-125 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA — Ready to book
      ════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MuxPlayer
            playbackId={PLAYBACK_ID}
            streamType="on-demand"
            autoPlay="muted"
            muted
            loop
            playsInline
            style={{
              "--controls": "none",
              "--media-object-fit": "cover",
              "--media-object-position": "center",
              width: "100%",
              height: "100%",
            }}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <p className="text-[0.65rem] sm:text-[0.7rem] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-gold mb-4 sm:mb-5">
            Next Steps
          </p>
          <h2 className="font-body text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gold mb-5 sm:mb-6 drop-shadow-lg leading-tight">
            Ready to book the studio?
          </h2>
          <p className="text-gold mb-10 sm:mb-12 max-w-md mx-auto text-[0.95rem] sm:text-base md:text-lg drop-shadow-md px-2">
            Fashion, product, editorial or commercial — tell us the brief.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-5">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#c9a86c] text-white/70 px-8 sm:px-10 py-3.5 sm:py-4 text-[0.8rem] sm:text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_40px_rgba(201,168,108,0.35)]"
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
              className="inline-flex items-center justify-center border border-white/30 text-gold px-8 sm:px-10 py-3.5 sm:py-4 text-[0.8rem] sm:text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-400"
            >
              Watch Reels
            </Link>
          </div>
        </div>
      </section>
      <ReelsSection />
    </>
  );
}