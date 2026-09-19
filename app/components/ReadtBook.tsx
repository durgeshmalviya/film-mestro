"use client";

import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState, useRef } from "react";
const PLAYBACK_ID = "7z9suaRTJZA40001LNJU5LfB6K602xXXNSCFdivicNs1k8";
 
async function getSignedPlaybackToken(playbackId: string): Promise<string> {
  try {
    const res = await fetch("/api/mux-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playbackId }),
    });
 
    if (!res.ok) throw new Error("Failed to fetch token");
    const data = await res.json();
    return data.token;
  } catch (error) {
    console.error("Token fetch error:", error);
    return "";
  }
}
export default function BookStudioCTA() {
    const [heroToken, setHeroToken] = useState<string>("");
  const [ctaToken, setCtaToken] = useState<string>("");
useEffect(() => {
    async function loadTokens() {
      const hero = await getSignedPlaybackToken(PLAYBACK_ID);
      const cta = await getSignedPlaybackToken(PLAYBACK_ID);
      setHeroToken(hero);
      setCtaToken(cta);
    }
 
    loadTokens();
  }, []);
  return (
    <section className="relative py-28 sm:py-28 md:py-30 px-5 sm:px-6 md:px-10 overflow-hidden group">
      {/* Full-bleed video background - 4K preferred */}
      <div  className="absolute inset-0 w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[5s] ease-[cubic-bezier(0.16,1,0.3,1)]">
         {heroToken ? (
            <MuxPlayer
              playbackId={PLAYBACK_ID}
              streamType="on-demand"
              autoPlay
              muted
              loop
              playsInline
              poster={PLAYBACK_ID}
              metadata={{
                video_title: "Maestro Films — Studio Hero",
                video_id: "hero-studio",
              }}
              accentColor="#c9a86c"
              tokens={{ playback: heroToken }}
              style={{
                "--controls": "none"
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-900 animate-pulse" />
          )}
         
         </div>

      {/* Decorative thin gold lines */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/60 to-transparent" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/60 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#c9a86c]/80 mb-6 font-light">
          Studio Booking
        </p>

        {/* Main heading */}
        <h2 className="font-serif text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-normal text-[#f5f1ed] mb-6 sm:mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] leading-[1.1] tracking-tight">
          Ready to book
          <span className="block mt-2 text-[#c9a86c] italic font-light">
            the studio?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-[#e8e2d9]/90 mb-12 sm:mb-14 max-w-xl mx-auto text-[0.95rem] sm:text-base md:text-lg leading-relaxed font-light px-2">
          Fashion, product, editorial or commercial —{" "}
          <span className="text-[#f5f1ed]">tell us the brief.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-5">
          {/* Primary button */}
          <Link
            href="/#contact"
            className="group/btn relative inline-flex items-center justify-center gap-3 bg-[#c9a86c] text-transparent px-10 sm:px-12 py-4 sm:py-[1.2rem] text-[0.8rem] sm:text-sm tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_60px_rgba(201,168,108,0.4)] hover:-translate-y-0.5"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="relative z-10">Book a Shoot</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5"
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

          {/* Secondary button */}
          <Link
           href="/work-studio/#reels"
            className="group/secondary relative inline-flex items-center justify-center border border-white/20 text-white/90 px-10 sm:px-12 py-4 sm:py-[1.2rem] text-[0.8rem] sm:text-sm tracking-[0.2em] uppercase backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-[#c9a86c]/50 hover:text-[#c9a86c] transition-all duration-500"
          >
            Watch Reels
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#c9a86c] group-hover/secondary:w-3/5 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}