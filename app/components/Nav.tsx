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
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md shadow-md py-4"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-white transition-colors duration-500"
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
            className={`w-full h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`w-full h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-full h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-40 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="text-center space-y-6">
          {[
            { label: "Home", href: "/" },
            { label: "Work & Studio", href: "/work-studio" },
            { label: "Reels", href: "/reels" },
            { label: "About", href: "/#about" },
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