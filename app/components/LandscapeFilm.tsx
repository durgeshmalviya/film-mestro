"use client";

import { useRef, useState } from "react";

type Props = {
  title?: string;
  tag?: string;
  poster: string;
  video: string;
};

export default function LandscapeFilm({
  title = "Brand Campaign Film",
  tag = "Featured · 4K Landscape",
  poster,
  video,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = async () => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <div
      className="group relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#0f0f0f] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft gold outer glow */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#c9a86c]/40 via-transparent to-[#c9a86c]/15 transition-opacity duration-700 pointer-events-none ${
          hovered || playing ? "opacity-100" : "opacity-0"
        } blur-sm`}
      />

      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a3d] to-[#0a0a0a]" />

      {/* Poster */}
      {!playing && (
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
        />
      )}

      {/* Video */}
      <video
        ref={ref}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a86c]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Play / Pause button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <span
          className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border transition-all duration-400 ${
            playing
              ? "border-white/30 bg-black/50 opacity-0 group-hover:opacity-100 scale-95"
              : "border-white/60 bg-black/40 opacity-100 group-hover:scale-110 group-hover:border-[#c9a86c] group-hover:bg-black/55 group-hover:shadow-[0_0_30px_rgba(201,168,108,0.35)]"
          }`}
        >
          {/* Subtle ring */}
          <span className="absolute inset-0 rounded-full border border-[#c9a86c]/20 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {playing ? (
            <span className="flex gap-1.5">
              <span className="w-1.5 h-5 bg-white rounded-sm" />
              <span className="w-1.5 h-5 bg-white rounded-sm" />
            </span>
          ) : (
            <span
              className="ml-1.5 w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}
            />
          )}
        </span>
      </button>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10 pointer-events-none">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-[#c9a86c] mb-1.5">
              {tag}
            </p>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight">
              {title}
            </h3>
          </div>

          {/* Live indicator when playing */}
          {playing && (
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a86c] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a86c]" />
              </span>
              <span className="text-[0.65rem] tracking-wider uppercase text-white/70">
                Playing
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}