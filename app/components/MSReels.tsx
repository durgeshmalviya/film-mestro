"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Pause,
  Play,
  ChevronUp,
  Share2,
  Heart,
} from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

interface Production {
  playbackId: string;
  color: string;
  label: string;
}

const productions: Production[] = [
  {
    playbackId: "7z9suaRTJZA40001LNJU5LfB6K602xXXNSCFdivicNs1k8",
    color: "from-[#5a6b7d] to-[#7a8b9d]",
    label: "Commercial",
  },
  {
    playbackId: "yI77xWfZmVNs5Hein5Yf9farU1ugL001BIa1TEPRkNqU",
    color: "from-[#c4785a] to-[#b86c48]",
    label: "Documentary",
  },
  {
    playbackId: "BemUPIKGSob01qcQmJAT1qeCwlYQpJ7OZI3cdhswBREs",
    color: "from-[#3a2f2a] to-[#5a4a40]",
    label: "Editorial",
  },
  {
    playbackId: "e00bhikXWulFN00jsq432y4RrSIAjqm00Z6ZfjArY5PDGE",
    color: "from-[#6a5acd] to-[#483d8b]",
    label: "Fashion Film",
  },
  {
    playbackId: "DxGwybWNmDx9cpvHkLtxRc75DRSJ9spDONjgj01jPwnM",
    color: "from-[#2f4f4f] to-[#1a2f2f]",
    label: "Brand Story",
  },
];

function getMuxThumbnail(playbackId: string) {
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=800&height=1200&fit_mode=smartcrop&time=1`;
}

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

function shuffleArray<T>(source: T[]): T[] {
  const arr = [...source];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MSReels() {
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [modalToken, setModalToken] = useState("");
  const [productionItems, setProductionItems] = useState<Production[]>([]);
  const [tokenMap, setTokenMap] = useState<Record<string, string>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const playerRef = useRef<any>(null);
  const swipeHintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const shuffled = shuffleArray(productions);
    setProductionItems(shuffled);

    const loadTokens = async () => {
      const results = await Promise.all(
        shuffled.map(async (prod) => {
          const token = await getSignedPlaybackToken(prod.playbackId);
          return { id: prod.playbackId, token };
        })
      );
      const tokens: Record<string, string> = {};
      results.forEach(({ id, token }) => {
        tokens[id] = token;
      });
      setTokenMap(tokens);
    };

    loadTokens();
  }, []);

  const openModal = async (playbackId: string) => {
    let token = tokenMap[playbackId];
    if (!token) token = await getSignedPlaybackToken(playbackId);
    setModalToken(token);
    setModalVideo(playbackId);
    setIsPlaying(true);
    setIsMuted(false);
    setShowSwipeHint(true);
    document.body.style.overflow = "hidden";

    // Hide swipe hint after 3 seconds
    if (swipeHintTimeoutRef.current) {
      clearTimeout(swipeHintTimeoutRef.current);
    }
    swipeHintTimeoutRef.current = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
  };

  const closeModal = () => {
    setModalVideo(null);
    setModalToken("");
    setShowSwipeHint(false);
    document.body.style.overflow = "auto";
    if (swipeHintTimeoutRef.current) {
      clearTimeout(swipeHintTimeoutRef.current);
    }
  };

  const goNext = () => {
    if (!modalVideo) return;
    const currentIndex = productionItems.findIndex(
      (p) => p.playbackId === modalVideo
    );
    const nextIndex = (currentIndex + 1) % productionItems.length;
    openModal(productionItems[nextIndex].playbackId);
  };

  const goPrev = () => {
    if (!modalVideo) return;
    const currentIndex = productionItems.findIndex(
      (p) => p.playbackId === modalVideo
    );
    const prevIndex =
      (currentIndex - 1 + productionItems.length) % productionItems.length;
    openModal(productionItems[prevIndex].playbackId);
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <section
        id="productions"
        className="relative py-2 md:py-5 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
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
                Every frame captures elegance in motion. From editorial films to
                brand campaigns.
              </p>
            </div>
          </div>

          {/* Swiper */}
          <div className="relative">
            {/* Desktop Navigation Buttons */}
            <div className="swiper-custom-prev-prod absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-11 h-11 rounded-full border border-[#c9a86c]/40 bg-[#f5f1ed]/90 backdrop-blur-sm items-center justify-center hover:border-[#c9a86c] hover:bg-[#f5f1ed] transition-all duration-400 cursor-pointer group">
              <ChevronLeft
                size={18}
                className="text-[#a68b6a] group-hover:text-[#1a1a1a] transition-colors"
                strokeWidth={1.5}
              />
            </div>
            <div className="swiper-custom-next-prod absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-11 h-11 rounded-full border border-[#c9a86c]/40 bg-[#f5f1ed]/90 backdrop-blur-sm items-center justify-center hover:border-[#c9a86c] hover:bg-[#f5f1ed] transition-all duration-400 cursor-pointer group">
              <ChevronRight
                size={18}
                className="text-[#a68b6a] group-hover:text-[#1a1a1a] transition-colors"
                strokeWidth={1.5}
              />
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
                prevEl: ".swiper-custom-prev-prod",
                nextEl: ".swiper-custom-next-prod",
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
                    <div className="relative w-full h-full overflow-hidden bg-[#1a1a1a]">
                      {tokenMap[item.playbackId] ? (
                        <MuxPlayer
                          playbackId={item.playbackId}
                           
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
                            "--controls": "none",
                            "--media-object-fit": "cover",
                            "--media-object-position": "top center",
                          }}
                        />
                      ) : (
                        <img
                          src={getMuxThumbnail(item.playbackId)}
                          alt={item.label}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none`}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 pointer-events-none">
                      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase font-light mb-1.5">
                        Production
                      </p>
                      <h3 className="text-white text-lg md:text-xl font-light tracking-wide">
                        {item.label}
                      </h3>
                    </div>

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

      {/* ========== INSTAGRAM REELS MODAL ========== */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <motion.div
              className="relative w-full h-full max-w-[430px] mx-auto flex flex-col"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.y > 140) closeModal();
              }}
            >
            <motion.div
                className="absolute inset-0 p-3"
                drag={isDesktop ? false : "x"}
                dragConstraints={isDesktop ? {} : { left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (!isDesktop) {
                    if (info.offset.x < -90) goNext();
                    if (info.offset.x > 90) goPrev();
                  }
                }}
              >
                {modalToken ? (
                  <MuxPlayer
                    ref={playerRef}
                    playbackId={modalVideo}
                    autoPlay
                    muted={isMuted}
                    volume={1}
                    playsInline
                    loop
                    preload="auto"
                    streamType="on-demand"
                    preferPlayback="mse"
                    tokens={{ playback: modalToken }}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      "--controls": "none",
                      "--media-object-fit": "cover",
                      "--media-object-position": "center",
                    } }
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>

              {/* Desktop Navigation Arrows */}
              {isDesktop && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft size={20} className="text-white" strokeWidth={2} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight size={20} className="text-white" strokeWidth={2} />
                  </button>
                </>
              )}

              {/* Top gradient */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all duration-300"
              >
                <X size={20} className="text-white" strokeWidth={1.8} />
              </button>

              {/* Right side controls (Instagram style) */}
              <div className="absolute right-4 bottom-32 z-30 flex flex-col items-center gap-6">
               

                {/* Play / Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-white" fill="white" />
                  ) : (
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  )}
                </motion.button>

                {/* Sound */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" />
                  ) : (
                    <Volume2 size={20} className="text-white" />
                  )}
                </motion.button>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <p className="text-white/60 text-[11px] tracking-[0.25em] uppercase mb-1">
                  Maestro Reels
                </p>
                <p className="text-white text-lg font-light">
                  {productionItems.find((p) => p.playbackId === modalVideo)
                    ?.label || "Production"}
                </p>
              </div>

              {/* Mobile Swipe Indicator */}
              {!isDesktop && (
                <AnimatePresence>
                  {showSwipeHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
                    >
                      <div className="flex gap-3">
                        <motion.div
                          animate={{ x: -8 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <ChevronLeft
                            size={24}
                            className="text-white/40"
                            strokeWidth={1.5}
                          />
                        </motion.div>
                        <motion.div
                          animate={{ x: 8 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <ChevronRight
                            size={24}
                            className="text-white/40"
                            strokeWidth={1.5}
                          />
                        </motion.div>
                      </div>
                      <p className="text-white/40 text-xs tracking-wider">
                        Swipe to navigate
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Mobile Swipe Up Indicator */}
              {!isDesktop && (
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
                >
                  <p className="text-white/40 text-xs tracking-wider">
                    Swipe up to close
                  </p>
                  <ChevronUp size={16} className="text-white/40" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}