"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';

interface Production {
  playbackId: string;
  poster: string;
  color: string;
  label: string;
  token?: string;
}

const productions = [
  {
    playbackId: '7z9suaRTJZA40001LNJU5LfB6K602xXXNSCFdivicNs1k8',
    poster: '',
    color: 'from-[#5a6b7d] to-[#7a8b9d]',
    label: 'Commercial'
  },
  {
    playbackId: 'yI77xWfZmVNs5Hein5Yf9farU1ugL001BIa1TEPRkNqU',
    poster: ' ',
    color: 'from-[#c4785a] to-[#b86c48]',
    label: 'Documentary'
  },
  {
    playbackId: 'BemUPIKGSob01qcQmJAT1qeCwlYQpJ7OZI3cdhswBREs',
    poster: ' ',
    color: 'from-[#3a2f2a] to-[#5a4a40]',
    label: 'Editorial'
  },
  {
    playbackId: 'e00bhikXWulFN00jsq432y4RrSIAjqm00Z6ZfjArY5PDGE',
    poster: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
    color: 'from-[#6a5acd] to-[#483d8b]',
    label: 'Fashion Film'
  },
  {
    playbackId: 'DxGwybWNmDx9cpvHkLtxRc75DRSJ9spDONjgj01jPwnM',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    color: 'from-[#2f4f4f] to-[#1a2f2f]',
    label: 'Brand Story'
  },
];

async function getSignedPlaybackToken(playbackId: string): Promise<string> {
  try {
    const res = await fetch("/api/mux-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playbackId }),
    });

    if (!res.ok) throw new Error("Failed to fetch token");
    const data = await res.json();
    return data.token;
  } catch (error) {
    console.error("Token fetch error:", error);
    return "";
  }
}

export default function MSReels() {
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [modalToken, setModalToken] = useState<string>("");
  const [productionItems, setProductionItems] = useState<Production[]>([]);
  const [tokenMap, setTokenMap] = useState<Record<string, string>>({});

  function shuffleArray<T>(source: T[]): T[] {
    const arr = [...source];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle productions and load tokens on mount
  useEffect(() => {
    const shuffled = shuffleArray(productions);
    setProductionItems(shuffled);

    // Pre-load tokens for all videos
    const loadTokens = async () => {
      const tokens: Record<string, string> = {};
      for (const prod of shuffled) {
        const token = await getSignedPlaybackToken(prod.playbackId);
        tokens[prod.playbackId] = token;
      }
      setTokenMap(tokens);
    };

    loadTokens();
  }, []);

  const openModal = async (playbackId: string) => {
    // Use pre-loaded token or fetch if not available
    let token = tokenMap[playbackId];
    if (!token) {
      token = await getSignedPlaybackToken(playbackId);
    }
    setModalToken(token);
    setModalVideo(playbackId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalVideo(null);
    setModalToken("");
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section
        id="productions"
        className="relative py-2 md:py-1 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-end items-start md:items-end mb-12 md:mb-16 gap-4">
            <div className="text-center md:text-right max-w-xl ml-auto">
              <p className="text-[11px] md:text-xs font-medium tracking-[0.32em] uppercase text-[#a68b6a] mb-3">
                Fashion in Motion
              </p>

              <h2 className="font-body text-4xl md:text-4xl lg:text-[3.25rem] font-light text-gold leading-[1.1] mb-3">
                The <span className="font-medium">Maestro</span> Reels
              </h2>

              <p className="text-[15px] md:text-base text-gold leading-relaxed font-light tracking-wide">
                Every frame captures elegance in motion. From editorial films to brand campaigns,

              </p>
            </div>
          </div>

          {/* Swiper */}
          <div className="relative">
            {/* Custom Navigation */}
            <div className="swiper-custom-prev-prod absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-11 h-11 rounded-full border border-[#c9a86c]/40 bg-[#f5f1ed]/90 backdrop-blur-sm items-center justify-center hover:border-[#c9a86c] hover:bg-[#f5f1ed] transition-all duration-400 cursor-pointer group">
              <ChevronLeft size={18} className="text-[#a68b6a] group-hover:text-[#1a1a1a] transition-colors" strokeWidth={1.5} />
            </div>
            <div className="swiper-custom-next-prod absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-11 h-11 rounded-full border border-[#c9a86c]/40 bg-[#f5f1ed]/90 backdrop-blur-sm items-center justify-center hover:border-[#c9a86c] hover:bg-[#f5f1ed] transition-all duration-400 cursor-pointer group">
              <ChevronRight size={18} className="text-[#a68b6a] group-hover:text-[#1a1a1a] transition-colors" strokeWidth={1.5} />
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={18}
              slidesPerView={1}
              loop={true}
              speed={1100}
              autoplay={{
                delay: 3800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} !w-2 !h-2 !rounded-full !bg-[#c9a86c]/35 !opacity-100 transition-all duration-400 [&.swiper-pagination-bullet-active]:!bg-[#c9a86c] [&.swiper-pagination-bullet-active]:!scale-125"></span>`,
              }}
              navigation={{
                prevEl: '.swiper-custom-prev-prod',
                nextEl: '.swiper-custom-next-prod',
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 22 },
              }}
              className="productions-swiper !pb-14"
            >
              {productionItems.map((item, i) => (
                <SwiperSlide key={item.label + i}>
                  <div
                    className="group relative h-[420px] md:h-[540px] overflow-hidden cursor-pointer rounded-sm"
                    onClick={() => openModal(item.playbackId)}
                  >
                    {/* Video */}
                    <div className="relative w-full h-full overflow-hidden bg-black">
                      {tokenMap[item.playbackId] ? (
                        <MuxPlayer
                          playbackId={item.playbackId}
                          poster={`https://image.mux.com/${item.playbackId}/thumbnail.jpg?width=800&height=1200&fit_mode=smartcrop`}
                          autoPlay="muted"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          streamType="on-demand"
                          preferPlayback="mse"
                          maxResolution="720p"
                          tokens={{ playback: tokenMap[item.playbackId] }}
                          className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          style={{
                            '--controls': 'none',
                            '--media-object-fit': 'cover',
                            '--media-object-position': 'top center',
                            transform: 'translateZ(0)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse" />
                      )}
                    </div>

                    {/* Subtle gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none`} />

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 pointer-events-none">
                      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase font-light mb-1.5">
                        Production
                      </p>
                      <h3 className="text-white text-lg md:text-xl font-light tracking-wide">
                        {item.label}
                      </h3>
                    </div>

                    {/* Subtle play indicator on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-14 h-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ========== CINEMATIC MODAL ========== */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#0a0908]/97 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl aspect-video bg-black overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {modalToken ? (
                <MuxPlayer
                  playbackId={modalVideo}
                  autoPlay
                  preload="auto"
                  streamType="on-demand"
                  preferPlayback="mse"
                  tokens={{ playback: modalToken }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-900 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-all duration-300"
              >
                <X size={18} className="text-white" strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}