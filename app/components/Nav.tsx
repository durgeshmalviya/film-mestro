"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On-scroll background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-14 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? "bg-[#f5f1ed]/92 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(201,168,108,0.08)]"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a86c]/60 focus-visible:ring-offset-2 transition-colors duration-500 ${scrolled || isMenuOpen ? "text-[#a68b6a]" : "text-[#c9a86c]"
              }`}
          >
            <p
              className="text-[11px] md:text-sm font-semibold tracking-[0.29em] uppercase text-transparent bg-clip-text opacity-90 select-none"
              style={{
                backgroundImage: `
                      linear-gradient(
                        105deg,
                        #3a2f1f 0%,
                        #C9A86C 18%,
                        #F5F1ED 32%,
                        #E8D5A8 48%,
                        #C9A86C 62%,
                        #F5F1ED 78%,
                        #3a2f1f 100%
                      )
                    `,
                backgroundSize: '250% 100%',
                animation:
                  'eclipseSweep 7s ease-in-out infinite, floatSmooth 9s ease-in-out infinite',
                filter: 'drop-shadow(0 4px 20px rgba(201,168,108,0.4))',
                transform: 'translateZ(0)',
              }}
            >
              Maestro Films
            </p>
          </Link>

          {/* Hamburger */}
          <button
            className="w-8 h-5 flex flex-col justify-between cursor-pointer z-50 relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${isMenuOpen
                ? "bg-[#a68b6a] rotate-45 translate-y-[9px]"
                : scrolled
                  ? "bg-[#a68b6a]"
                  : "bg-[#c9a86c]"
                }`}
            />
            <span
              className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
                ? "opacity-0 scale-x-0"
                : scrolled
                  ? "bg-[#a68b6a] opacity-100"
                  : "bg-[#c9a86c] opacity-100"
                }`}
            />
            <span
              className={`w-full h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${isMenuOpen
                ? "bg-[#a68b6a] -rotate-45 -translate-y-[9px]"
                : scrolled
                  ? "bg-[#a68b6a]"
                  : "bg-[#c9a86c]"
                }`}
            />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════
          FULLSCREEN MENU
      ════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 bg-[#f5f1ed] z-40 flex items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Subtle decorative line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#c9a86c]/20 to-transparent pointer-events-none" />

        <nav className="text-center space-y-8 md:space-y-10 relative z-10">
          {[

            { label: "Studio & Work", href: "/work-studio" },
            { label: "Campaigns", href: "/social-media-marketing" },
            { label: "Production", href: "/service" },
            { label: "Contact", href: "/contact" },
            { label: "About", href: "/Kamad-Solanki" },
            { label: "Blog", href: "/blog" },

          ].map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="group block text-3xl md:text-5xl lg:text-6xl font-light text-[#a68b6a] hover:text-[#1a1a1a] transition-all duration-500 tracking-wide"
              style={{
                transitionDelay: isMenuOpen ? `${index * 60}ms` : "0ms",
              }}
            >
              <span className="relative inline-block">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a86c] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom subtle text */}
        <div className="absolute bottom-10 left-0 right-0 text-left px-10">
          <p className="text-[15px] tracking-[0.3em] uppercase text-[#c9a86c]/60 font-light">
            Fashion Photography · Bhopal & Mumbai
          </p>
        </div>
      </div>
    </>
  );
}
