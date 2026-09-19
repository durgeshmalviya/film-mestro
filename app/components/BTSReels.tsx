"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

interface BTSItem {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  videoUrl: string;
  poster?: string;
}

const originalBTS: BTSItem[] = [
  {
    id: 1,
    title: "STUDIO LIGHTING",
    subtitle: "Behind the Scenes • Editorial",
    duration: "01:05",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825831/h9q617tldsdpfx1pa6r0.mp4",
  },
  {
    id: 2,
    title: "MODEL DIRECTION",
    subtitle: "On Set • Portfolio Session",
    duration: "00:52",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825817/gdplsufzda6xusfkzb4z.mp4",
  },
  {
    id: 3,
    title: "WARDROBE & STYLING",
    subtitle: "Fashion Shoot • Process",
    duration: "01:18",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825831/h9q617tldsdpfx1pa6r0.mp4",
  },
  {
    id: 4,
    title: "CAMPAIGN PREP",
    subtitle: "Brand Shoot • BTS",
    duration: "01:30",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825858/g0os0itvinkkubr0m391.mp4",
  },
  {
    id: 5,
    title: "NATURAL LIGHT",
    subtitle: "Location Shoot • Editorial",
    duration: "00:48",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825838/vpqsfvthdo4hoag6oenp.mp4",
  },
  {
    id: 6,
    title: "FINAL FRAME",
    subtitle: "Fashion Photography • Process",
    duration: "01:10",
    videoUrl:
      "https://res.cloudinary.com/dpgnhczzz/video/upload/v1789825832/djs4dyizrzxfwkzdryrl.mp4",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BTSSection() {
  const [items, setItems] = useState<BTSItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activePreview, setActivePreview] = useState(0); // sequential autoplay index
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const centerIconTimeout = useRef<NodeJS.Timeout | null>(null);
  const sequenceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setItems(shuffleArray(originalBTS));
    setIsVisible(true);
  }, []);

  // Sequential autoplay (one by one in loop)
  useEffect(() => {
    if (items.length === 0 || selectedIndex !== null || isHoveringGrid) return;

    const playNext = () => {
      setActivePreview((prev) => (prev + 1) % items.length);
    };

    // Play each video for ~4 seconds then move to next
    sequenceTimer.current = setInterval(playNext, 4000);

    return () => {
      if (sequenceTimer.current) clearInterval(sequenceTimer.current);
    };
  }, [items.length, selectedIndex, isHoveringGrid]);

  // Control which preview video is playing
  useEffect(() => {
    previewVideoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === activePreview && selectedIndex === null) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activePreview, selectedIndex]);

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

  // Sync mute + play state to modal video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, selectedIndex]);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  const changeItem = useCallback(
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
    const next = (selectedIndex + 1) % items.length;
    changeItem(next, "up");
  }, [selectedIndex, items.length, changeItem]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    const prev = (selectedIndex - 1 + items.length) % items.length;
    changeItem(prev, "down");
  }, [selectedIndex, items.length, changeItem]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }

    setShowCenterIcon(true);
    if (centerIconTimeout.current) clearTimeout(centerIconTimeout.current);
    centerIconTimeout.current = setTimeout(() => setShowCenterIcon(false), 800);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

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
    <section className="min-h-screen bg-[#F8F5F0] text-gold font-body selection:bg-[#D4C5A9]/40 selection:text-[#2C2A26]">
      <div className="px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-[1400px] mx-auto">
          <div
            className={`lg:col-span-4 order-1 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-4 font-light">
              Behind the Scenes
            </p>

            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-light tracking-tight text-gold leading-none mb-6">
              BTS
            </h2>

            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-10 bg-[#c9a86c]/50" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-gold">
                Fashion Photography
              </span>
            </div>

            <p className="text-gold text-[15px] leading-relaxed max-w-sm mb-6 font-base">
              A look inside our fashion shoots — from lighting direction and model
              coaching to wardrobe styling and final frame selection.
            </p>

            <p className="text-gold text-[15px] leading-relaxed max-w-sm mb-10 font-base">
              Built for models, agencies, and brands who value refined process and
              elevated results.
            </p>

            <a
              href="/#contact"
              className="inline-flex items-center gap-2.5 text-[12px] tracking-[0.2em] uppercase text-gold hover:opacity-70 transition-all duration-400 group border-b border-[#c9a86c]/40 pb-1 hover:border-[#c9a86c]"
            >
              Book Now
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* RIGHT - Grid */}
          <div
            className="lg:col-span-8 order-2"
            onMouseEnter={() => setIsHoveringGrid(true)}
            onMouseLeave={() => setIsHoveringGrid(false)}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
              {items.map((item, index) => {
                const isActive = activePreview === index && selectedIndex === null;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => setActivePreview(index)}
                    className={`
                      group relative overflow-hidden rounded-sm bg-[#EDE7DC]
                      aspect-[3/4] focus:outline-none
                      transition-all duration-700 ease-out
                      hover:shadow-[0_25px_50px_-12px_rgba(44,42,38,0.18)]
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                      ${isActive ? "ring-1 ring-[#c9a86c]/40" : ""}
                    `}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {/* Single video per card - only active one plays */}
                    <video
                      ref={(el) => {
                        previewVideoRefs.current[index] = el;
                      }}
                      src={item.videoUrl}
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? "auto" : "metadata"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                    {/* Play icon only when not active */}
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#c9a86c] shadow-[0_0_8px_rgba(201,168,108,0.8)]" />
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left pointer-events-none">
                      <h3 className="text-gold text-xs font-medium tracking-wider uppercase mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-gold/70 text-[11px] tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div><p className="flex gap-3 justify-center item-center py-5">See More From Maestro Films</p>
  
                <div className="flex gap-3 justify-center item-center">
                  
                  {[
                    {
                      href: "https://www.instagram.com/maestrofilms.in/",
                      icon: FaInstagram,
                      label: "Instagram",
                    },
                    {
                      href: "https://www.facebook.com/profile.php?id=61577981519394",
                      icon: FaFacebook,
                      label: "Facebook",
                    },
                    {
                      href: "https://youtube.com/@maestrofilms-u8e",
                      icon: FaYoutube,
                      label: "YouTube",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full border border-[#d9cfc3] flex items-center justify-center text-[#8a7a6a] hover:text-[#a68b6a] hover:border-[#a68b6a] hover:bg-[#f0eae2] transition-all duration-400 hover:scale-105"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
 
      </div>

      {/* ===== PREMIUM MODAL ===== */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

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
              <video
                ref={videoRef}
                key={selectedItem.videoUrl + selectedIndex}
                src={selectedItem.videoUrl}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: "1rem" }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

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

              <div className="absolute top-0 left-0 right-0 p-5 flex items-start justify-between pointer-events-none z-10">
                <div>
                  <p className="text-white text-[13px] font-medium tracking-wide drop-shadow-md">
                    {selectedItem.title}
                  </p>
                  <p className="text-white/60 text-[11px] mt-1 tracking-wide">
                    {selectedItem.subtitle}
                  </p>
                </div>
                <span className="text-white/40 text-[11px] tracking-widest mt-0.5">
                  {selectedIndex + 1} / {items.length}
                </span>
              </div>

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

              <div className="absolute bottom-0 left-0 right-0 p-5 pr-16 pointer-events-none z-10">
                <div className="h-[2px] w-full bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((selectedIndex + 1) / items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

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