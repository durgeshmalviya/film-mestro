"use client";

import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";

const PLAYBACK_ID = "tA01vNfZ00uH6BIoDrIv006HXgAy0101NiRdaf8QeJHO01lG8";

export default function BookStudioCTA() {
  return (
    <section className="relative py-24 sm:py-28 md:py-36 px-5 sm:px-6 md:px-10 overflow-hidden mb-5 group">
      {/* Full-bleed video background */}
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
          className="absolute inset-0 w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[4s] ease-out"
        />
        {/* Premium multi-layer overlays */}
 
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
        {/* Subtle gold ambient glow */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_80%,rgba(201,168,108,0.18),transparent_55%)]" />
      </div>

      {/* Decorative thin gold lines */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/70 to-transparent" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#c9a86c]/70 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto text-center">
        {/* Eyebrow */}
        

        {/* Main heading */}
        <h2 className="font-serif text-[2.15rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] font-normal text-[#c9a86c] mb-6 sm:mb-7 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] leading-[1.15] tracking-tight">
          Ready to book
          <span className="block mt-1 sm:mt-2 text-[#c9a86c] italic">the studio?</span>
        </h2>

        {/* Subtext */}
        <p className="text-[#c9a86c] mb-12 sm:mb-14 max-w-lg mx-auto text-[0.95rem] sm:text-base md:text-lg leading-relaxed drop-shadow-md px-2">
          Fashion, product, editorial or commercial —{" "}
          <span className="text-[#F8F5F0]">tell us the brief.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-5">
          {/* Primary button */}
          <Link
            href="/#contact"
            className="group/btn relative inline-flex items-center justify-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-9 sm:px-11 py-4 sm:py-[1.15rem] text-[0.8rem] sm:text-sm tracking-[0.18em] sm:tracking-[0.22em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_50px_rgba(201,168,108,0.45)] hover:-translate-y-0.5"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
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
            href="/reels"
            className="group/secondary relative inline-flex items-center justify-center border border-white/25 text-white px-9 sm:px-11 py-4 sm:py-[1.15rem] text-[0.8rem] sm:text-sm tracking-[0.18em] sm:tracking-[0.22em] uppercase backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-[#c9a86c]/50 hover:text-gold transition-all duration-400"
          >
            Watch Reels 
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#c9a86c] group-hover/secondary:w-3/5 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}