"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

import { ArrowBigRight, ArrowRightCircleIcon, ArrowUpRight, ArrowUpRightIcon } from "lucide-react";
// ============ IMAGEKIT RESOLVER (same as hero – free plan friendly) ============
const imageCache = new Map<string, string>();
const CACHE_TTL = 4 * 60 * 1000; // 4 minutes

async function getImageKitUrl(path: string): Promise<string> {
  // Already a full URL → return as-is
  if (path.startsWith('http')) return path;

  // 1. In-memory cache
  const cached = imageCache.get(path);
  if (cached) return cached;

  // 2. localStorage
  const storageKey = `ik_${path}`;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const { url, ts } = JSON.parse(stored);
      if (Date.now() - ts < CACHE_TTL) {
        imageCache.set(path, url);
        return url;
      }
    }
  } catch { }

  // 3. Fetch signed URL only once
  try {
    const res = await fetch(`/api/imagekit?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error('ImageKit failed');
    const { url } = await res.json();

    imageCache.set(path, url);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ url, ts: Date.now() }));
    } catch { }

    return url;
  } catch (err) {
    console.error('ImageKit resolve error:', path, err);
    return path;
  }
}
interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  href: string;
}
export default function FashionPortfolio() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ============ SLIDES DATA (paths only) ============
  const portfolioImage = useMemo(
    () => [
      {
        img: '/editorial/maestrofilms-11.jpg',
        title: 'Catalogues',
        href: '/catalog',
      },
      {
        img: '/editorial/MF_08006.JPG', // removed stray leading space
        title: 'Editorial & champaign',
        href: '/editorial-campaign',
      },
      {
        img: '/editorial/maestrofilms-20.JPG',
        title: 'High Fashion',
        href: '/high-fashion',
      },
      {
        img: '/editorial/maestrofilms-24.jpg',
        title: 'Product & Commercial',
        href: '/product-commercial',
      },



    ],
    []
  );

  const [resolvedItems, setResolvedItems] = useState(portfolioImage);

  // ============ RESOLVE ALL PATHS ONCE ============
  useEffect(() => {
    let cancelled = false;

    async function resolveAll() {
      const resolved = await Promise.all(
        portfolioImage.map(async (item) => {
          const img = await getImageKitUrl(item.img);
          return { ...item, img };
        })
      );

      if (!cancelled) {
        setResolvedItems(resolved);
        setImagesReady(true);
      }
    }

    resolveAll();

    return () => {
      cancelled = true;
    };
  }, [portfolioImage]);

  return (
    <>
      <section className="px-5 md:px-10 lg:px-12 bg-[#f5f1ed] select-none">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-10 max-w-3xl">
            <p className="text-[11px] md:text-sm font-medium text-center md:text-left tracking-[0.32em] px-2 uppercase text-gold mb-2">
              Selected Showcase
            </p>
            <h2 className="font-body text-4xl md:text-5xl lg:text-[3.4rem] text-center md:text-left font-light text-gold leading-[1.1] mb-2">
              The <span className="font-medium">Maestro</span> Shoots
            </h2>
            <p className="text-[15px] px-2 text-center md:text-left md:text-base text-gold leading-relaxed max-w-3xl font-base tracking-wide">
              Timeless fashion photography, Striking editorials, lookbooks & campaigns — crafted to captivate.
            </p>
          </div>

          {/* Grid */}
          <div className="columns-2 md:columns-4 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {resolvedItems.map((img) => (
              <Link

                href={img.href}
                className="break-inside-avoid relative group block overflow-hidden rounded-sm bg-[#f5f1ed]"
              >
                <img
                  src={img.img}
                  alt={img.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-auto object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

                {/* Centered link text + underline */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">


                  <div className="inline-flex flex-col items-center gap-1.5">
                    <span className="inline-flex items-center font-bold gap-1 text-white   text-[10px] sm:text-[11px] tracking-[0.22em] uppercase">
                      {img.title}

                    </span>

                    {/* Theme underline */}
                       <ArrowRightCircleIcon
                      className="w-8.5 h-6.5 text-white transition-transform  -mt-13 -rotate-45 duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-sm:animate-[arrowNudge_1.6s_ease-in-out_infinite]"
                      strokeWidth={1.75}
                    /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-[#f5f1ed] px-5 md:px-10 lg:px-16 pb-5 md:pb-4 pt-3 select-none">
          <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-[10px] sm:text-[13px] tracking-[0.35em] uppercase text-gold mb-3">
              Exclusively for the Fashion Industry
            </p>
            <p className="text-gold text-sm sm:text-[15px] tracking-[0.18em] max-w-xl mx-auto leading-relaxed font-medium uppercase">
              Fashion • Beauty • Jewellery
            </p>
            <p className="text-gold text-xs sm:text-sm mt-2 tracking-[0.15em] uppercase opacity-80">
              Nothing Else.
            </p>
            <p className="text-gold text-xs sm:text-sm mt-1 tracking-[0.12em]">
              Let’s create something exceptional together.
            </p>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes arrowNudge {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(2px, -2px);
          }
        }
      `}</style>
    </>
  );
}