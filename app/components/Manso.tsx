"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function FashionPortfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % portfolioImages.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + portfolioImages.length) % portfolioImages.length
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <>
      <section className="px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header - now aligned to the left */}
          <div className="flex flex-col md:flex-row justify-start items-start md:items-end mb-6 md:mb-8 gap-4 reveal">
            <div>
              <p className="text-[10px] md:text-xs font-body font-medium text-gray-500 tracking-[0.25em] uppercase mb-2">
             Selected Showcase
              </p>
              <h2 className="font-body text-3xl md:text-5xl font-light mb-3 text-[#2a2a2a]">
                <span className="font-semibold text-[#2a2a2a]">The Maestro Shoots</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-600 max-w-xl leading-relaxed font-body font-light">
             Powerful fashion photography that sells the story. We create striking editorials, lookbooks, and commercial campaigns designed to captivate audiences and drive brand results.   </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {portfolioImages.map((img, index) => (
              <figure
                key={img.id}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl bg-neutral-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <img
            src={portfolioImages[lightboxIndex].src}
            alt={portfolioImages[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[90vw] object-contain select-none rounded-sm"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white text-sm font-medium tracking-wide">
              {portfolioImages[lightboxIndex].title}
            </p>
            <p className="text-white/50 text-xs mt-1.5 tracking-wider">
              {lightboxIndex + 1} / {portfolioImages.length} · {portfolioImages[lightboxIndex].category}
            </p>
          </div>
        </div>
      )}
    </>
  );
}