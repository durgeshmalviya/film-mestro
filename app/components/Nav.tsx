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
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? "bg-[#f8f5f0]/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent"
          }`}
      >
        <Link
          href="/"
          className={`focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[#c9a86c]
focus-visible:ring-offset-4
 text-sm md:text-base font-medium tracking-[0.25em] uppercase transition-colors duration-500 ${scrolled || isMenuOpen
              ? "text-[#c9a86c]"
              : " text-[#C49F5E]"
            }`}
        >
          <span className="block h-0 overflow-visible px-3"><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1043 811"
            width="110"
            height="22"
            fill="currentColor"
            role="img"
            aria-label="MF Log Premium Logo"
            className="   "
            style={{ display: 'block', scale: '1.9', }}
          >
            <title>MF Log Premium Logo</title>
            <desc>Premium MF logo optimized for navbar height and light/dark modes</desc>

            <path d="M42 47v36h72V11H42zm147 0v36h73V11h-73zm148 0v36h72V11h-72zm147 0v36h73V11h-73zm148 0v36h72V11h-72zm147 0v36h73V11h-73zm148 0v36h72V11h-72zM209 337v171h77v-96.9c0-53.4.3-97.2.8-97.4.4-.3 15.7 25.6 34.1 57.4 18.4 31.9 33.7 58.2 34.1 58.4.3.2 15.5-25.3 33.6-56.7s33.4-57.8 34.1-58.7c1-1.3 1.2 19.1 1.3 96.1V508h77V166h-76.8l-34.3 59.5c-20 34.7-34.7 59.1-35.2 58.6s-16-27.1-34.6-59.2l-33.6-58.4-38.8-.3-38.7-.2zm382 0v171h78V371h141v-68H669v-69h166v-68H591zM42 607v36h72v-72H42zm147 0v36h73v-72h-73zm148 0v36h72v-72h-72zm147 0v36h73v-72h-73zm148 0v36h72v-72h-72zm147 0v36h73v-72h-73zm148 0v36h72v-72h-72z" />
          </svg>
            {/*<p className="block scale-[0.9]  border leading-none tracking-tight animate-float select-none -ml-3 mt-0.5 text-xs w-max">
              Maestro Films
            </p>*/}
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 relative "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
              ? "bg-[#c9a86c] rotate-45 translate-y-[9px]"
              : scrolled
                ? "bg-[#a68b6a]"
                : "bg-[#c9a86c]"
              }`}
          />
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
              ? "opacity-0"
              : scrolled
                ? "bg-[#a68b6a] opacity-100"
                : "bg-[#c9a86c] opacity-100"
              }`}
          />
          <span
            className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
              ? "bg-[#c9a86c] -rotate-45 -translate-y-[9px]"
              : scrolled
                ? "bg-[#a68b6a]"
                : "bg-[#c9a86c]"
              }`}
          />
        </button>
      </div>


      <div
        className={`fixed inset-0 bg-[#f5f1ed] z-40 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
          ? "opacity-100 visible "
          : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <nav className="text-center space-y-7 md:space-y-8">
          {[
            { label: "Portfolio", href: "/work-studio" },
            { label: "About", href: "/about" },
            { label: "Reels", href: "/reels" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-3xl md:text-5xl font-light text-[#c9a86c] hover:text-gray-400 transition-colors duration-400 tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}