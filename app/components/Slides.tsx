'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from './Nav';
import { motion } from "framer-motion";
// ============ IMAGE OPTIMIZATION HELPER ============
const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (url.includes('imagekit.io')) {
    return `${url}${url.includes('?') ? '&' : '?'}tr=w-${width || 1200},q-80,f-auto`;
  }
  if (url.includes('ibb.co') || url.includes('bitbucket.org')) {
    return url;
  }
  return url;
};

// ============ CORNER MARK ============
function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <span className="font-serif text-white text-lg md:text-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        Maestro films
      </span>
    </div>
  );
}

// ============ GRAIN TEXTURE ============
const GRAIN_BG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

// ============ PROPS ============
interface HeroCarouselProps {
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  tabHidden?: boolean;
}

// ============ MAIN COMPONENT ============
export default function
  SlidesMF({
    scrolled,
    isMenuOpen,
    setIsMenuOpen,
    tabHidden = false,
  }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ============ SLIDES DATA ============
  const slides = useMemo(
    () => [
      {
        left: '/DSC01977.JPG',
        right:
          'https://ik.imagekit.io/maestrofilms/Copy%20of%2021.jpg?updatedAt=1788959643512&ik-s=601e918ebb91c0dda6b5ae6ccfb3e4a8b9cc3af3',
        title: 'Maestro',
        subtitle: 'Films',
        tagline: 'Cinematic Excellence from Bhopal',
      },
      {
        left: 'https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08663.jpg?updatedAt=1788964901448&ik-s=b4b2420620f4594ffbe1fde367ab7e3c9c07ef2e',
        right: '/DSC01975.JPG',
        title: 'Maestro',
        subtitle: 'Films',
        tagline: 'Cinematic Excellence from Bhopal',
      },
      {
        left: '/DSC02021.JPG',
        right:
          'https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08636.jpg?updatedAt=1788964501158&ik-s=e2e4f0ef28d3d151556e53df9baa6fbfb47da99b',
        title: 'Maestro',
        subtitle: 'Films',
        tagline: 'Cinematic Excellence from Bhopal',
      },
      {
        left: 'https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08085.jpg?updatedAt=1788964893077&ik-s=6a92168901d976245af050b32aeb93128bec7387',
        right:
          'https://ik.imagekit.io/maestrofilms/MF_07917%20AA.jpg?updatedAt=1788964894343&ik-s=606657fc1ccaa37524ce9c9d250389b7faf28560',
        title: 'Maestro',
        subtitle: 'Films',
        tagline: 'Stories That Moves You',
      },
      {
        left: 'https://ik.imagekit.io/maestrofilms/Img10.jpg?updatedAt=null&ik-s=94b8f37b0bde6b7710bdb840c64738f3674dbcbc',
        right:
          'https://ik.imagekit.io/maestrofilms/Img12.jpg?updatedAt=null&ik-s=a9a87f0f3af6af6cc6cc963bade463bf92e69281',
        title: 'Maestro',
        subtitle: 'Films',
        tagline: 'Stories That Moves You',
      },
    ],
    []
  );

  // ============ PRELOAD IMAGES ============
  useEffect(() => {
    const preloadCriticalImages = () => {
      [slides[0].left, slides[0].right].forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });

      setTimeout(() => {
        slides.slice(1, 3).forEach((slide) => {
          [slide.left, slide.right].forEach((src) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
          });
        });
      }, 500);
    };

    preloadCriticalImages();
  }, [slides]);

  // ============ AUTOPLAY ============
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, slides.length]);

  // ============ NAVIGATION HANDLERS ============
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 900);
    },
    [currentSlide, isTransitioning]
  );

  const goToNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // ============ RENDER ============
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#2a2420]">
      <Navbar />

      {/* Grain Overlay */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_BG}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ============ SLIDES ============ */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`capture-guard ${tabHidden ? 'is-hidden' : ''} absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${index === currentSlide
            ? 'opacity-100 z-10 scale-100'
            : 'opacity-0 z-0 scale-[1.04]'
            }`}
        >
          {/* Left Image */}
          <div className="absolute left-0 top-0 w-full md:w-1/2 h-full hidden md:block overflow-hidden group">
            <img
              src={slide.left}
              alt="Maestro Films portfolio"
              className="protected-image w-full h-full object-cover object-top aspect-square hero-image-anim"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-black/30" />
            <CornerMark />
          </div>

          {/* Center Divider */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 hidden md:flex flex-col items-center h-full pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-[#C9A86C]/80 to-transparent" />
          </div>

          {/* Right Image */}
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full overflow-hidden group">
            <img
              src={slide.right}
              alt="Maestro Films portfolio"
              className="protected-image w-full h-full object-cover object-top aspect-square hero-image-anim"
              style={{ animationDelay: '0.12s' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="absolute inset-0 bg-black/20" />
            <CornerMark />
          </div>

          {/* ============ TEXT OVERLAY ============ */}
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-black/20 via-transparent to-black/30">
            <div
              className={`text-center px-4 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${index === currentSlide
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
                }`}
            >
              {/* Title */}
              <h1
                className="relative font-body text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight text-transparent bg-clip-text animate-float select-none"
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
                    'eclipseSweep 6.5s ease-in-out infinite, floatSmooth 8s ease-in-out infinite',
                  filter: 'drop-shadow(0 4px 18px rgba(201,168,108,0.45))',
                  transform: 'translateZ(0)',
                }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                className="font-body font-bold text-2xl md:text-4xl lg:text-5xl tracking-[0.18em] mb-2 uppercase leading-none text-transparent bg-clip-text select-none"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      100deg,
                      #2a2118 0%,
                      #C9A86C 22%,
                      #F5F1ED 40%,
                      #E8D5A8 55%,
                      #C9A86C 72%,
                      #2a2118 100%
                    )
                  `,
                  backgroundSize: '220% 100%',
                  animation:
                    'eclipseSmooth 11s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite reverse',
                  filter: 'drop-shadow(0 3px 12px rgba(201,168,108,0.3))',
                  transform: 'translateZ(0)',
                }}
              >
                {slide.subtitle}
              </p>

              {/* Tagline */}
              <p
                className="text-xs md:text-sm font-medium tracking-[0.28em] uppercase text-transparent bg-clip-text opacity-90 select-none"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      90deg,
                      #8a7a5c 0%,
                      #E8D5A8 35%,
                      #F5F1ED 50%,
                      #E8D5A8 65%,
                      #8a7a5c 100%
                    )
                  `,
                  backgroundSize: '180% 100%',
                  animation: 'eeclipseSmooth 13s linear infinite',
                  transform: 'translateZ(0)',
                }}
              >
                {slide.tagline}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* ============ NAVIGATION ARROWS ============ */}
      <button
        onClick={goToPrev}
        className="absolute left-3 md:hidden top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-[#c9a86c]/40 bg-black/40 text-[#c9a86c] transition hover:border-[#c9a86c] hover:text-[#e0c48a]"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 md:hidden top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-[#c9a86c]/40 bg-black/40 text-[#c9a86c] transition hover:border-[#c9a86c] hover:text-[#e0c48a]"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* ============ DOTS + PROGRESS ============ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative size-2 md:size-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-gradient-to-r from-[#e0c48a] to-[#a68b6a] scale-125'
                : 'bg-[#c9a86c]/40 hover:bg-[#c9a86c]/70'
                }`}
            >
              {index === currentSlide && (
                <span className="absolute inset-0 rounded-full bg-[#c9a86c]/40 animate-ping" />
              )}
            </button>
          ))}
        </div>

        <div className="w-20 md:w-28 h-[2px] bg-[#c9a86c]/20 rounded-full overflow-hidden">
          <div
            key={currentSlide}
            className="h-full bg-gradient-to-r from-[#e0c48a] to-[#a68b6a] rounded-full carousel-progress"
          />
        </div>
      </div>
      <motion.div initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 4, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-1/2 left-0 md:-left-5 z-20 transform translate-y-1/2 hidden md:block">
        <button className="px-6 py-2.5 bg-black/40 h-14 hover:bg-black/60 backdrop-blur-sm rounded-br-full rounded-tr-full border border-[#c9a86c] text-[#a68b6a] text-[13px] font-body font-bold tracking-[0.2em] uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
          <a href="/about">portfolio</a>
        </button>
      </motion.div>

      <motion.div initial={{ x: 80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.7, delay: 4, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-1/2 right-5 md:-right-5 z-20 transform translate-y-1/2 hidden md:block">
        <button className="px-6 py-2.5 bg-black/40 h-14 hover:bg-black/60 backdrop-blur-sm rounded-bl-full rounded-tl-full border border-[#c9a86c] text-[#a68b6a] text-[13px] font-body font-bold tracking-[0.2em] uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
          <a href="/contact">contact us</a>
        </button>
      </motion.div>

      {/* ============ MOBILE BUTTONS ============ */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3 md:hidden z-20 px-6">
        <button className="flex-1  py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-gold text-[10px] font-body font-light tracking-wider uppercase border border-[#c9a86c]  ">
          portfolio
        </button>
        <button className="flex-1 py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-gold text-[10px] font-body font-light tracking-wider uppercase border border-[#c9a86c]">
          contact us
        </button>
      </div>
    </section>
  );
}