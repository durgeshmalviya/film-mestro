'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FashionPortfolio from '../components/FashionShoots';
import { useState, useEffect, useCallback } from 'react';
import { Menu, ChevronRight, ChevronLeft, Play, Film, CornerRightUp, X } from 'lucide-react';
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

export default function ProductShoots() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // ============ MODAL HANDLERS ============
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
      {/* ============ RECENT PRODUCTIONS - VIDEO SWIPER ============ */}
      <section id="productions" className="text-center py-5 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-end items-center md:items-end mb-6 md:mb-8 gap-4 reveal">
            <div className="text-right">
              <p className="text-[10px] md:text-xs font-body font-medium text-gray-500 tracking-[0.25em] uppercase mb-2">
                Cinematic Showcase
              </p>
              <h2 className="font-body text-3xl md:text-5xl font-light mb-3 text-[#2a2a2a]">
                <span className="font-semibold text-[#2a2a2a]">The Maestro reels</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-600 max-w-xl leading-relaxed font-body font-light ml-auto">
                Every frame tells a story. From commercial campaigns to documentary films, our productions capture the essence of emotion and authenticity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="swiper-custom-prev-prod w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-sm">
                <ChevronLeft size={16} />
              </div>
              <div className="swiper-custom-next-prod w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-sm">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
          <div className="reveal">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              speed={900}
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: '.swiper-custom-prev-prod', nextEl: '.swiper-custom-next-prod' }}
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
              className="productions-swiper !pb-12"
            >
              {productionItems.map((item, i) => (
                <SwiperSlide key={item.label + i}>
                  <div
                    className="group relative h-[400px] md:h-[520px] rounded-md overflow-hidden cursor-pointer shadow-lg hover-lift video-smooth"
                    onClick={() => openModal(item.playbackId)}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-md bg-black">
                      <MuxPlayer
                        playbackId={item.playbackId}
                        poster={item.poster}
                        autoPlay
                        muted
                        loop
                        preload="metadata"
               
                        className="  inset-10  object-top "
                      
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-10 group-hover:opacity-10 transition-opacity duration-600 pointer-events-none`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                    <CornerRightUp />

                    {/* Bottom Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none">
                      <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-body font-light mb-1">Production</p>
                      <h3 className="text-white text-lg md:text-xl font-body font-light">{item.label}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ============ FULL-SCREEN VIDEO MODAL ============ */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <MuxPlayer
                playbackId={modalVideo}
                autoPlay
              
                preload="auto"
              
                className="absolute inset-0 w-full h-full"
                 
              />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/30"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}