'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

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
  } catch {}

  // 3. Fetch signed URL only once
  try {
    const res = await fetch(`/api/imagekit?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error('ImageKit failed');
    const { url } = await res.json();

    imageCache.set(path, url);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ url, ts: Date.now() }));
    } catch {}

    return url;
  } catch (err) {
    console.error('ImageKit resolve error:', path, err);
    return path;
  }
}

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-70 md:opacity-0 md:group-hover:opacity-90 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <span className="inline-block px-2 py-1 bg-[#c9a86c]/90 text-[#2a2420] text-[10px] tracking-[0.08em] font-medium leading-none rounded-sm">
        Maestro Films
      </span>
    </div>
  );
}

export default function EditorialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ============ SLIDES DATA (paths only) ============
  const editorialItems = useMemo(
    () => [
      {
        img: '/editorial/maestrofilms-6.jpg',
        title: 'Shadow Play',
      },
      {
        img: '/editorial/ maestrofilms-30.JPG',
        title: 'Golden Hour',
      },
      {
        img: '/editorial/maestrofilms-20.JPG',
        title: 'Warm Tones',
      },
      {
        img: '/editorial/maestrofilms-24.jpg',
        title: 'Urban Edge',
      },
      {
        img: '/editorial/maestrofilms-5.jpg',
        title: 'Soft Light',
      },
      {
        img: '/editorial/MF_08006.JPG',
        title: 'Warm Tones',
      },
      {
        img: '/editorial/ maestrofilms-29.JPG',
        title: 'Urban Edge',
      },
      {
        img: '/editorial/maestrofilms-12.jpg',
        title: 'Soft Light',
      },
    ],
    []
  );

  const [resolvedItems, setResolvedItems] = useState(editorialItems);

  // ============ RESOLVE ALL PATHS ONCE ============
  useEffect(() => {
    let cancelled = false;

    async function resolveAll() {
      const resolved = await Promise.all(
        editorialItems.map(async (item) => {
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
  }, [editorialItems]);

  return (
    <section
      id="editorials"
      className="py-5 md:py-10 px-5 md:px-10 lg:px-10 bg-[#f5f1ed]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-[13px] md:text-sm font-medium tracking-[0.32em] uppercase text-gold mb-3">
              A Curated Glimpse Into Our
            </p>
            <p className="text-[14px] md:text-sm text-gold tracking-[0.2em] font-light">
              | Recent Collaborations |
              <span className="text-gold"> Studio Portrait Series |</span>
              <span className="text-gold px-2"> Ikat Collection</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-[#c9a86c]/40 flex items-center justify-center hover:border-[#c9a86c] hover:bg-[#c9a86c]/5 transition-all duration-400 cursor-pointer group"
              aria-label="Previous slide"
            >
              <ChevronLeft
                size={16}
                className="text-[#c4785a] group-hover:text-text-gold transition-colors"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-[#c9a86c]/40 flex items-center justify-center hover:border-[#c9a86c] hover:bg-[#c9a86c]/5 transition-all duration-400 cursor-pointer group"
              aria-label="Next slide"
            >
              <ChevronRight
                size={16}
                className="text-[#c4785a] group-hover:text-gold transition-colors"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="min-h-[420px] md:min-h-[540px]">
          {mounted && imagesReady ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination]}
              spaceBetween={18}
              slidesPerView={1}
              loop={true}
              speed={1000}
              autoplay={{
                delay: 3600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} !w-2 !h-2 !rounded-full !bg-[#c9a86c]/35 !opacity-100 transition-all duration-400 [&.swiper-pagination-bullet-active]:!bg-[#c9a86c] [&.swiper-pagination-bullet-active]:!scale-125"></span>`,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="editorial-swiper !pb-14"
            >
              {resolvedItems.map((item, i) => (
                <SwiperSlide key={item.title + i}>
                  <div className="group relative h-[420px] md:h-[540px] overflow-hidden cursor-pointer rounded-sm">
                    <img
                      src={item.img}
                      alt={`Editorial: ${item.title}`}
                      className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      loading="lazy"
                      decoding="async"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                    <CornerMark />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
                      <p className="text-white/55 text-[10px] tracking-[0.28em] uppercase font-light mb-1.5">
                        Editorial
                      </p>
                      <h3 className="text-white text-lg md:text-xl font-light tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-[420px] md:h-[540px] bg-[#e8e2d9]/60 rounded-sm animate-pulse" />
          )}
        </div>      
      </div>
    </section>
  );
}