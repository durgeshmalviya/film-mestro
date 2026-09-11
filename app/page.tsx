"use client";

import { useEffect, useState } from "react";
import SlidesMF from "./components/Slides";
import FashionPortfolio from "./components/Manso";
import EditorialsSection from "./components/Ikat";
import AboutUs from "./about/about";
import dynamic from "next/dynamic";
import BookStudioCTA from "./components/ReadtBook";
import LandscapeFilm from "./components/ContactForm";
import ContactForm from "./components/ContactForm";


const MSReels = dynamic(() => import("./components/MSReels"), {
  ssr: false,
});
function Spinner({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700">
      <div className="flex flex-col items-center gap-6">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.35em] uppercase text-white">
            Maestro<span className="font-medium">Films</span>
          </h1>
          <p className="mt-2 text-[10px] sm:text-xs tracking-[0.4em] text-neutral-500 uppercase">
            Visual Storytelling
          </p>
        </div>

        {/* Elegant Spinner */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
          <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" />
        </div>
      </div>
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

      {/* Main content fades in after spinner */}
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

        <EditorialsSection />
        <MSReels />
        <FashionPortfolio />
        <BookStudioCTA />
        
        <AboutUs />
     <ContactForm/>
         
      </div>
    </>
  );
}