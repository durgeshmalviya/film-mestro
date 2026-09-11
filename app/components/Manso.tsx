"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const portfolioImages: PortfolioImage[] = [
  {
    id: 1,
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%209%20copy.jpg?updatedAt=1788075353055&ik-s=7fdbab837cc3e8ac00d5e8d92738b56e6ea79fbd",
    alt: "High-fashion editorial photography – Shadow Play",
    title: "Shadow Play",
    category: "Editorial",
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%2019.jpg?updatedAt=1788075350100&ik-s=b85a972771eddb158663211697f33750416081ee",
    alt: "Golden hour fashion lookbook photography",
    title: "Golden Hour",
    category: "Lookbook",
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/maestrofilms/MF_08305.jpg?updatedAt=1788075346400&ik-s=1bb90076870539d1f89d2b132df30f2aea0f5516",
    alt: "Soft light beauty and fashion photography",
    title: "Soft Light",
    category: "Beauty",
  },
  {
    id: 4,
    src: "https://ik.imagekit.io/maestrofilms/MF_07917%20AA.jpg?updatedAt=1788075356666&ik-s=4d2d00c63c693ee4d6778072785385e67a000d49",
    alt: "Warm tones fashion editorial photography",
    title: "Warm Tones",
    category: "Editorial",
  },
  {
    id: 5,
    src: "https://ik.imagekit.io/maestrofilms/MF_08942.jpg?updatedAt=1788072997752&ik-s=073b8f8911744a355fafd7ff35c4b7af71bc830d",
    alt: "Urban edge commercial fashion campaign photography",
    title: "Urban Edge",
    category: "Campaign",
  },
];

// Prevent common save / open actions
const protectEvent = (e: React.SyntheticEvent | Event) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export default function FashionPortfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uiVisible, setUiVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setUiVisible(true);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setUiVisible(true);
  };

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % portfolioImages.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + portfolioImages.length) % portfolioImages.length
    );
  }, [lightboxIndex]);

  // Auto-hide UI
  const showUI = useCallback(() => {
    setUiVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 2500);
  }, []);

  // Keyboard + body lock + extra protection while lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      // Block common save / print shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P")
      ) {
        e.preventDefault();
        return;
      }
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      showUI();
    };

    const preventContext = (e: Event) => e.preventDefault();

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    document.addEventListener("contextmenu", preventContext);
    showUI();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("contextmenu", preventContext);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [lightboxIndex, goNext, goPrev, showUI]);

  return (
    <>
      {/* Gallery */}
      <section
        className="px-4 md:px-8 bg-[#f5f1ed] p-4 pb-3 select-none"
        onContextMenu={protectEvent}
      >
        <div className="max-w-7xl mx-auto text-gold">
          <div className="flex flex-col md:flex-row justify-start items-start md:items-end mb-6 md:mb-8 gap-4">
            <div>
              <p className="text-[10px] md:text-xs font-body font-medium tracking-[0.25em] uppercase mb-2  ">
                Selected Showcase
              </p>
              <h2 className="font-body text-3xl md:text-5xl font-light mb-1  ">
                <span className="font-semibold">The Maestro Shoots</span>
              </h2>
              <p className="text-lg md:text-[17px] max-w-2xl tracking-tight leading-relaxed font-body font-light  ">
                Powerful fashion photography that sells the story. We create
                striking editorials, lookbooks, and commercial campaigns designed
                to captivate audiences and drive brand results.
              </p>
            </div>
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {portfolioImages.map((img, index) => (
              <figure
                key={img.id}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl bg-[#f5f1ed] select-none"
                onClick={() => openLightbox(index)}
                onContextMenu={protectEvent}
                onDragStart={protectEvent}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={protectEvent}
                  onDragStart={protectEvent}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 pointer-events-none select-none"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                  }}
                />

                {/* Invisible overlay that catches clicks & blocks direct image interaction */}
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={protectEvent}
                  onDragStart={protectEvent}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                  <p className="text-white text-sm font-medium tracking-wide">
                    {img.title}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5 tracking-wider uppercase">
                    {img.category}
                  </p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROTECTED LIGHTBOX ========== */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#f5f1ed] select-none"
          role="dialog"
          aria-modal="true"
          onMouseMove={showUI}
          onTouchStart={showUI}
          onContextMenu={protectEvent}
        >
          {/* Top bar */}
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 shrink-0 transition-all duration-500 ease-out ${
              uiVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-[#1a1a1a] text-sm sm:text-base font-medium tracking-wide">
                {portfolioImages[lightboxIndex].title}
              </p>
              <p className="text-[#a68b6a] text-xs tracking-wider uppercase mt-0.5">
                {portfolioImages[lightboxIndex].category} · {lightboxIndex + 1} of{" "}
                {portfolioImages.length}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-[#c9a86c]/15 text-[#a68b6a] hover:bg-[#c9a86c]/25 hover:text-[#1a1a1a] transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
            </button>
          </div>

          {/* Image area */}
          <div className="relative flex-1 flex items-center justify-center px-3 sm:px-8 md:px-16 min-h-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
                showUI();
              }}
              className={`absolute left-2 sm:left-4 md:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-[#c9a86c] text-[#f5f1ed] shadow-lg hover:bg-[#a68b6a] active:scale-95 transition-all duration-500 ${
                uiVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </button>

            {/* Protected image container */}
            <div
              className="relative w-full h-full flex items-center justify-center select-none"
              onContextMenu={protectEvent}
              onDragStart={protectEvent}
            >
              <img
                key={lightboxIndex}
                src={portfolioImages[lightboxIndex].src}
                alt={portfolioImages[lightboxIndex].alt}
                draggable={false}
                onContextMenu={protectEvent}
                onDragStart={protectEvent}
                className="max-h-full max-w-full object-contain select-none rounded-lg shadow-2xl pointer-events-none"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                }}
              />
              {/* Overlay that blocks direct interaction with the image */}
              <div
                className="absolute inset-0 z-10"
                onContextMenu={protectEvent}
                onDragStart={protectEvent}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
                showUI();
              }}
              className={`absolute right-2 sm:right-4 md:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-[#c9a86c] text-[#f5f1ed] shadow-lg hover:bg-[#a68b6a] active:scale-95 transition-all duration-500 ${
                uiVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 pointer-events-none"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </button>
          </div>

          {/* Thumbnails */}
          <div
            className={`shrink-0 px-4 sm:px-6 py-4 sm:py-5 overflow-x-auto transition-all duration-500 ease-out ${
              uiVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
            }`}
          >
            <div className="flex gap-2 sm:gap-3 justify-center min-w-max mx-auto">
              {portfolioImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setLightboxIndex(index);
                    showUI();
                  }}
                  onContextMenu={protectEvent}
                  className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 select-none ${
                    index === lightboxIndex
                      ? "ring-2 ring-[#c9a86c] ring-offset-2 ring-offset-[#f5f1ed] scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    style={{
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      WebkitTouchCallout: "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom quote */}
      <div className="bg-[#f5f1ed] px-4 md:px-8 pb-2 pt-1 select-none">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[0.65rem] sm:text-[0.8rem] tracking-[0.28em] uppercase text-[#c9a86c]">
            Next Steps
          </p>
          <p className="text-[#a68b6a] text-sm sm:text-base tracking-wide max-w-2xl mx-auto leading-relaxed">
            “Maestro is focused to coordinate with truthfulness, passion, & a
            commitment to Excellence”
            <br />
            <span className="  mt-1 inline-block">
              Let’s create something amazing together
            </span>
          </p>
        </div>
      </div>
    </>
  );
}