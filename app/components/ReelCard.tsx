"use client";

import { useRef, useState } from "react";

type Props = {
  title: string;
  tag: string;
  duration: string;
  poster: string;
  video: string;
};

export default function ReelCard({ title, tag, duration, poster, video }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggle = async () => {
    const v = videoRef.current;
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
    <article className="group relative aspect-[9/16] md:aspect-[9/14] overflow-hidden rounded-lg bg-[#1a1a1a] shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a3d] via-[#1a1510] to-[#0f0f0f]" />

      {!playing && (
        <img
          src={
            imgError
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              : poster
          }
          alt={`${title} — Maestro Films reel`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="eager"
        />
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <span
          className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
            playing
              ? "border-white/40 bg-black/40 opacity-0 group-hover:opacity-100"
              : "border-white/70 bg-black/50 opacity-100 group-hover:scale-110 group-hover:border-[#c9a86c] group-hover:bg-black/60"
          }`}
        >
          {playing ? (
            <span className="flex gap-1">
              <span className="w-1 h-4 bg-white rounded-sm" />
              <span className="w-1 h-4 bg-white rounded-sm" />
            </span>
          ) : (
            <span
              className="ml-1 w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
            />
          )}
        </span>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10 pointer-events-none">
        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-white/80 mb-0.5">
          {tag} · {duration}
        </p>
        <h3 className="font-display text-base md:text-lg leading-tight">{title}</h3>
      </div>
    </article>
  );
}