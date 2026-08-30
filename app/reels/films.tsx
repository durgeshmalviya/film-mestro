"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

interface Film {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  playbackId: string;
}

const films: Film[] = [
  {
    id: 1,
    title: "Heritage",
    category: "Fashion Film",
    year: "2024",
    description:
      "A meditative study of craft, lineage and the quiet power of tradition reimagined for the modern eye.",
    playbackId: "3hiPKKzq6IBY27RCaf2GQ1fCYGHTsIUAGGvinKeePsM",
  },
  {
    id: 2,
    title: "Echoes of Silk",
    category: "Editorial",
    year: "2024",
    description:
      "Light, movement and texture collide in this intimate portrait of fabric as living architecture.",
    playbackId: "euJroxRrxGH34bwSw5FXPK2PgthYoIBaOg1wM2OKllg",
  },
  {
    id: 3,
    title: "Nomad Souls",
    category: "Documentary",
    year: "2023",
    description:
      "An evocative journey through landscapes and identities, capturing the poetry of movement and belonging.",
    playbackId: "enYpD4G02WKFTWPt96KBrOf8gviBwfSLO8XPke77BFsM",
  },
   
  
];

const getMuxThumbnail = (playbackId: string, time = 1) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}&width=1600`;

export default function FilmCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const film = films[current];

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 900);
    },
    [isAnimating, current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % films.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + films.length) % films.length);
  }, [current, goTo]);

  // Auto-swipe
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(next, 6500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1100px] overflow-hidden bg-[#F7F4EF] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Cinematic film carousel"
      role="region"
    >
      {/* ===== BACKGROUND / VIDEO STAGE ===== */}
      <div className="absolute inset-0">
        {films.map((item, index) => {
          const isActive = index === current;

          return (
            <div
              key={item.id}
              className={`
                absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-[1.04] z-0 pointer-events-none"}
              `}
              aria-hidden={!isActive}
            >
              {/* Poster / fallback */}
              <img
                src={getMuxThumbnail(item.playbackId)}
                alt={`${item.title} – ${item.category} ${item.year}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Auto-playing muted loop */}
              {isActive && (
                <div className="absolute inset-0">
                  <MuxPlayer
                    key={item.playbackId}
                    playbackId={item.playbackId}
                    streamType="on-demand"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF]/95 via-[#F7F4EF]/40 to-transparent lg:from-[#F7F4EF]/80 lg:via-[#F7F4EF]/20 lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>
          );
        })}
      </div>

      {/* ===== LEFT CONTENT ===== */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[720px]">
        {/* Small label */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="h-px w-7 bg-[#C9B8A4]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#8A8378] font-medium">
            Cinematic Production House
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-serif font-light tracking-tight text-[#2C2A26] leading-[0.88] mb-1">
          <span className="block text-[clamp(2.75rem,8vw,5.8rem)]">
            Work &
          </span>
          <span className="block text-[clamp(2.75rem,8vw,5.8rem)] text-[#B8A99A]">
            Studio
          </span>
        </h1>

        {/* Dynamic film info */}
        <div
          key={film.id}
          className="mt-8 sm:mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <p className="text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-[#8A8378] mb-2.5">
            {film.category} · {film.year}
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2C2A26] mb-3 sm:mb-4">
            {film.title}
          </h2>

          <p className="text-[#5C574F] text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-8 sm:mb-10">
            {film.description}
          </p>

          <button
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#2C2A26] hover:bg-[#1a1917] text-white text-[13px] tracking-wide transition-all duration-300 rounded-sm"
            aria-label={`Watch film: ${film.title}`}
          >
            <Play className="w-4 h-4 fill-white transition-transform duration-300 group-hover:scale-110" />
            Watch Film
          </button>
        </div>
      </div>

      {/* ===== NAVIGATION ARROWS ===== */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Previous film"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Next film"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* ===== BOTTOM PROGRESS + COUNTER ===== */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 lg:left-16 xl:left-24 z-30 flex items-center gap-5">
        {/* Progress bars */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Film slides">
          {films.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to film ${index + 1}`}
              className={`
                h-[2px] rounded-full transition-all duration-500
                ${index === current
                  ? "w-9 bg-[#2C2A26]"
                  : "w-3.5 bg-[#C9B8A4]/70 hover:bg-[#8A8378]"}
              `}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-[12px] sm:text-[13px] tracking-[0.18em] text-[#8A8378] tabular-nums">
          <span className="text-[#2C2A26] font-medium">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mx-1.5 opacity-40">/</span>
          {String(films.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}