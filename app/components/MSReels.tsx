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

const productions = [
  {
    playbackId: 'SwU4J7c8cBQ12FzaHkNqehQPY02WbfWCLGeMe5Acw00XU',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
    color: 'from-[#5a6b7d] to-[#7a8b9d]',
    label: 'Commercial'
  },
  {
    playbackId: 'kAmgd166Ny02AUB9Gad2SbDbjmPI4x00ZsaRkkRqy5uY4',
    poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    color: 'from-[#c4785a] to-[#b86c48]',
    label: 'Documentary'
  },
  {
    playbackId: 'AoxCMbUmrAu3QsGG00TKT00eX00g00fAozbE3muiJidBGN8',
    poster: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
    color: 'from-[#3a2f2a] to-[#5a4a40]',
    label: 'Editorial'
  },
  {
    playbackId: '6K6MDZ5PONKbfdHQ7deXPwE7KcqmUizPdARQMD200bXE',
    poster: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
    color: 'from-[#6a5acd] to-[#483d8b]',
    label: 'Fashion Film'
  },
  {
    playbackId: 'piWuLih5GvDFoKRkvUzS9DXlhPc4E8y5z241hW8HtMk',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    color: 'from-[#2f4f4f] to-[#1a2f2f]',
    label: 'Brand Story'
  },
];

export default function MSReels() {
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [productionItems, setProductionItems] = useState(productions);

  function shuffleArray<T>(source: T[]): T[] {
    const arr = [...source];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    setProductionItems(shuffleArray(productions));
  }, []);

  const openModal = (playbackId: string) => {
    setModalVideo(playbackId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section
        id="productions"
        className="relative py-5 md:py-2 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-end items-start md:items-end mb-12 md:mb-16 gap-4">
            <div className="text-center md:text-right max-w-2xl ml-auto">
              <p className="text-[11px] md:text-xs font-medium tracking-[0.32em] uppercase text-[#a68b6a] mb-3">
                Cinematic Showcase
              </p>
              <h2 className="font-body text-4xl md:text-5xl lg:text-[3.25rem] font-light text-gold leading-[1.1] mb-4">
                The <span className="font-medium">Maestro</span> Reels
              </h2>
              <p className="text-[15px] md:text-base text-gold leading-relaxed font-light tracking-wide">
                Every frame tells a story. From commercial campaigns to documentary
                films, our productions capture the essence of emotion and authenticity.
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
              <MuxPlayer
                playbackId={modalVideo}
                autoPlay
                preload="auto"
                streamType="on-demand"
                preferPlayback="mse"
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />

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