"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

interface Reel {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  playbackId: string;
  // image is now generated from Mux
}

const originalReels: Reel[] = [
  {
    id: 1,
    title: "HERITAGE REEL",
    subtitle: "Fashion • Culture • 01:12",
    duration: "01:12",
    playbackId: "3hiPKKzq6IBY27RCaf2GQ1fCYGHTsIUAGGvinKeePsM",
  },
  {
    id: 2,
    title: "ECHOES OF SILK",
    subtitle: "Fashion Film • 01:45",
    duration: "01:45",
    playbackId: "6K6MDZ5PONKbfdHQ7deXPwE7KcqmUizPdARQMD200bXE",
  },
  {
    id: 3,
    title: "THREADS",
    subtitle: "Fashion Film • 01:08",
    duration: "01:08",
    playbackId: "AoxCMbUmrAu3QsGG00TKT00eX00g00fAozbE3muiJidBGN8",
  },
  {
    id: 4,
    title: "NOMAD SOULS",
    subtitle: "Documentary Reel • 02:03",
    duration: "02:03",
    playbackId: "kAmgd166Ny02AUB9Gad2SbDbjmPI4x00ZsaRkkRqy5uY4",
  },
  {
    id: 5,
    title: "VEIL & VERSE",
    subtitle: "Cultural Short • 01:31",
    duration: "01:31",
    playbackId: "euJroxRrxGH34bwSw5FXPK2PgthYoIBaOg1wM2OKllg",
  },
  {
    id: 6,
    title: "IN TRADITION",
    subtitle: "Fashion Still • 00:58",
    duration: "00:58",
    playbackId: "SwU4J7c8cBQ12FzaHkNqehQPY02WbfWCLGeMe5Acw00XU",
  },
   
];
  
// Generate Mux thumbnail URL
const getMuxThumbnail = (playbackId: string, time = 1) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}&width=600`;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ReelsSection() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Player state (modal)
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  const playerRef = useRef<any>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const centerIconTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setReels(shuffleArray(originalReels));
    setIsVisible(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
      setIsMuted(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const selectedReel = selectedIndex !== null ? reels[selectedIndex] : null;

  const changeReel = useCallback(
    (newIndex: number, dir: "up" | "down") => {
      if (isAnimating || selectedIndex === null) return;
      setIsAnimating(true);
      setDirection(dir);
      setIsPlaying(true);
      setShowCenterIcon(false);
      setTimeout(() => {
        setSelectedIndex(newIndex);
        setDirection(null);
        setIsAnimating(false);
      }, 320);
    },
    [isAnimating, selectedIndex]
  );

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    const next = (selectedIndex + 1) % reels.length;
    changeReel(next, "up");
  }, [selectedIndex, reels.length, changeReel]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    const prev = (selectedIndex - 1 + reels.length) % reels.length;
    changeReel(prev, "down");
  }, [selectedIndex, reels.length, changeReel]);

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }

    setShowCenterIcon(true);
    if (centerIconTimeout.current) clearTimeout(centerIconTimeout.current);
    centerIconTimeout.current = setTimeout(() => {
      setShowCenterIcon(false);
    }, 800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "m") toggleMute({ stopPropagation: () => {} } as any);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev, isPlaying]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const time = Date.now() - touchStartTime.current;
    const velocity = Math.abs(diff) / time;

    if (Math.abs(diff) > 60 || velocity > 0.4) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartY.current = null;
  };

  return (
    <section className="min-h-screen bg-[#F8F5F0] text-[#2C2A26] font-sans selection:bg-[#D4C5A9]/selection:text-[#2C2A26]">
      {/* Main Content */}
      <div className="px-8 lg:px-16 py-10 lg:py-15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT - Grid */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
              {reels.map((reel, index) => {
                const isHovered = hoveredIndex === index;
                const thumbnail = getMuxThumbnail(reel.playbackId);

                return (
                  <button
                    key={reel.id}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`
                      group relative overflow-hidden rounded-sm bg-[#EDE7DC]
                      aspect-[3/4] focus:outline-none
                      transition-all duration-700 ease-out
                      hover:shadow-[0_25px_50px_-12px_rgba(44,42,38,0.18)]
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                    `}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {/* Thumbnail (always visible) */}
                    <img
                      src={thumbnail}
                      alt={reel.title}
                      className={`absolute inset-0 w-full h-110 object-cover transition-opacity duration-500 ${
                        isHovered ? "opacity-0" : "opacity-100"
                      }`}
                    />

                    {/* Hover Video Preview (Mux) */}
                    {isHovered && (
                      <div className="absolute inset-0">
                        <MuxPlayer
                          playbackId={reel.playbackId}
                          streamType="on-demand"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Play icon (only when not hovering) */}
                    {!isHovered && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left pointer-events-none">
                      <h3 className="text-white text-xs font-medium tracking-wider uppercase mb-0.5">
                        {reel.title}
                      </h3>
                      <p className="text-white/70 text-[11px] tracking-wide">
                        {reel.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT - Text */}
          <div
            className={`lg:col-span-4 order-1 lg:order-2 transition-all duration-1000 ease-out mt-10 lg:mt-0 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-6xl  lg:mt-30 lg:text-7xl xl:text-8xl font-serif font-light tracking-tight text-[#2C2A26] leading-none">
        REELS
            </h1>
            <div className="mt-3 mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-[#C4B5A0]" />
              <span className="text-sm tracking-[0.3em] uppercase text-[#8A8378]">
            
              </span>
              <div className="h-px w-12 bg-[#C4B5A0]" />
            </div>
            <p className="text-[#5C574F] text-base leading-relaxed max-w-sm mb-10">
              A selection of reels and stills from our fashion and cultural storytelling projects.
            </p>
            <a
              href="https://www.instagram.com/maestrofilms.co.in/"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-[#2C2A26] hover:gap-3 transition-all duration-300 group"
            >
              VIEW ALL WORK
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ===== PREMIUM MUX REELS MODAL ===== */}
      {selectedReel && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-2xl" />

          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-105 backdrop-blur-md"
          >
            <X className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>

          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 backdrop-blur-md"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative w-full max-w-[380px] sm:max-w-[400px] aspect-[9/16] mx-4 z-30"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`
                relative w-full h-full overflow-hidden rounded-2xl
                shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)]
                transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${direction === "up" ? "-translate-y-6 opacity-0" : ""}
                ${direction === "down" ? "translate-y-6 opacity-0" : ""}
                ${!direction ? "translate-y-0 opacity-100" : ""}
              `}
            >
              <MuxPlayer
                ref={playerRef}
                key={selectedReel.playbackId + selectedIndex}
                playbackId={selectedReel.playbackId}
                poster={getMuxThumbnail(selectedReel.playbackId)}
                streamType="on-demand"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "1rem",
                }}
                primaryColor="#ffffff"
                secondaryColor="#000000"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

              {/* Center Play/Pause */}
              <div
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                onClick={togglePlay}
              >
                <div
                  className={`
                    w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                    flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${showCenterIcon || !isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  `}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white fill-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  )}
                </div>
              </div>

              {/* Top meta */}
              <div className="absolute top-0 left-0 right-0 p-5 flex items-start justify-between pointer-events-none z-10">
                <div>
                  <p className="text-white text-[13px] font-medium tracking-wide drop-shadow-md">
                    {selectedReel.title}
                  </p>
                  <p className="text-white/60 text-[11px] mt-1 tracking-wide">
                    {selectedReel.subtitle}
                  </p>
                </div>
                <span className="text-white/40 text-[11px] tracking-widest mt-0.5">
                  {selectedIndex + 1} / {reels.length}
                </span>
              </div>

              {/* Mute button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-5 right-5 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Progress */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pr-16 pointer-events-none z-10">
                <div className="h-[2px] w-full bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((selectedIndex + 1) / reels.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Edge swipe zones */}
              <div
                className="absolute top-0 left-0 w-1/4 h-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              />
              <div
                className="absolute top-0 right-0 w-1/4 h-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}