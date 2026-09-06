"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On-scroll background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-[#f8f5f0]/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className={`text-sm md:text-base font-medium tracking-[0.25em] uppercase transition-colors duration-500 ${
            scrolled || isMenuOpen
              ? "text-[#3d3429]"
              : "text-white"
          }`}
        >
          Maestro Films
        </Link>

        {/* Hamburger */}
        <button
          className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen
                ? "bg-white rotate-45 translate-y-[9px]"
                : scrolled
                ? "bg-[#3d3429]"
                : "bg-white"
            }`}
          />
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen
                ? "opacity-0"
                : scrolled
                ? "bg-[#3d3429] opacity-100"
                : "bg-white opacity-100"
            }`}
          />
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen
                ? "bg-white -rotate-45 -translate-y-[9px]"
                : scrolled
                ? "bg-[#3d3429]"
                : "bg-white"
            }`}
          />
        </button>
      </div>

      {/* Full-screen menu overlay – matches your dark menu screenshot */}
      <div
        className={`fixed inset-0 bg-[#0f0d0c] z-40 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="text-center space-y-7 md:space-y-8">
          {[
            { label: "Portfolio", href: "/work-studio" },
            { label: "About", href: "/about" },
            { label: "Reels", href: "/reels" },
            { label: "Contact", href: "/#contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-5xl font-light text-white hover:text-[#c9a86c] transition-colors duration-400 tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}