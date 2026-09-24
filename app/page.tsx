"use client";

import { useEffect, useState } from "react";
import SlidesMF from "./components/Slides";
import FashionPortfolio from "./components/FashionShoots";
import EditorialsSection from "./components/Ikat";
import AboutUs from "./Kamad-Solanki/about";
import dynamic from "next/dynamic";
import BookStudioCTA from "./components/ReadtBook";
import ContactForm from "./components/ContactForm";
 

const MSReels = dynamic(() => import("./components/MSReels"), {
  ssr: false,
});

function Spinner({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5f1ed]">
      {/* Soft gold ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,168,108,0.12),transparent_55%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="text-center">
          <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a86c] mb-3 font-light">
            Visual Storytelling
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.28em] uppercase text-[#1a1a1a]">
            Maestro
            <span className="font-medium text-[#a68b6a]">Films</span>
          </h1>
        </div>

        {/* Advanced spinner */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
          {/* Outer soft ring */}
          <div className="absolute inset-0 rounded-full border border-[#e0d6c8]" />

          {/* Spinning gold arc */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c9a86c] border-r-[#c9a86c]/40 animate-spin"
            style={{ animationDuration: "1.1s" }}
          />

          {/* Counter-spin inner arc */}
          <div
            className="absolute inset-[6px] rounded-full border border-transparent border-b-[#a68b6a] border-l-[#a68b6a]/50 animate-spin"
            style={{ animationDuration: "1.6s", animationDirection: "reverse" }}
          />

          {/* Center pulse dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a86c] animate-pulse" />
          </div>
        </div>

        {/* Thin progress line */}
        <div className="w-28 sm:w-32 h-px bg-[#e0d6c8] overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#c9a86c] to-[#a68b6a] rounded-full origin-left"
            style={{
              animation: "loaderProgress 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
        </div>
      </div>

      {/* Keyframes (scoped via style tag for reliability) */}
      <style jsx>{`
        @keyframes loaderProgress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.animate-loader-progress {
  animation: loaderProgress 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: left center;
}
      `}</style>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  return (
    <>
      {loading && <Spinner onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <SlidesMF
          scrolled={scrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          tabHidden={tabHidden}
        />

        <MSReels />
        <FashionPortfolio />
        <BookStudioCTA />
        <AboutUs />
        <ContactForm />
      </div>
    </>
  );
}