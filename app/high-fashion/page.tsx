"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
 

/* -------------------------------------------------------------------------- */
/*  Theme – Warm Beige Luxury                                                 */
/* -------------------------------------------------------------------------- */
const colors = {
  bg: "#f5f1ed",
  text: "#1a1a1a",
  muted: "#5a5a5a",
  accent: "#c9a86c",
  accentHover: "#e0c48a",
  border: "#e0d6c8",
  dark: "#0a0a0a",
  card: "#faf7f3",
} as const;

type LookbookImage = {
  path: string;
  alt: string;
  width: number;
  height: number;
};

/* -------------------------------------------------------------------------- */
/*  Cloudinary                                                                */
/* -------------------------------------------------------------------------- */
async function getSignedUrl(
  path: string,
  options?: { w?: number; h?: number; q?: string }
): Promise<string> {
  const params = new URLSearchParams({ path });
  if (options?.w) params.set("w", String(options.w));
  if (options?.h) params.set("h", String(options.h));
  if (options?.q) params.set("q", options.q);

  const res = await fetch(`/api/cloudinary?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to get signed URL");
  const data = await res.json();
  return data.url;
}

/* -------------------------------------------------------------------------- */
/*  Animations                                                                */
/* -------------------------------------------------------------------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 20 },
  },
};

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalImage: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25 } },
};

/* -------------------------------------------------------------------------- */
/*  Components                                                                */
/* -------------------------------------------------------------------------- */
function ImageSkeleton() {
  return (
    <div
      className="w-full animate-pulse rounded-sm"
      style={{ aspectRatio: "3/4", backgroundColor: "#e8e0d6" }}
    />
  );
}

function SecureImage({
  path,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quality = "auto:good",
  onClick,
}: {
  path: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: string;
  onClick?: () => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSignedUrl(path, { w: Math.min(width, 1400), q: quality })
      .then((url) => !cancelled && setSrc(url))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [path, width, quality]);

  if (error) {
    return (
      <div
        className="flex items-center justify-center text-sm rounded-sm"
        style={{ aspectRatio: "3/4", color: colors.muted, backgroundColor: "#ebe4db" }}
      >
        Unavailable
      </div>
    );
  }

  if (!src) return <ImageSkeleton />;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`w-full h-auto object-cover select-none ${className}`}
      draggable={false}
      onClick={onClick}
    />
  );
}

function GalleryModal({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: LookbookImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = images[index];
  const dragX = useMotionValue(0);
  const opacity = useTransform(dragX, [-180, 0, 180], [0.4, 1, 0.4]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(245, 241, 237, 0.97)" }}
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-20 p-2"
        style={{ color: colors.text }}
      >
        <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.3} />
      </button>

      <div
        className="absolute top-7 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] uppercase font-light z-20"
        style={{ color: colors.muted }}
      >
        {String(index + 1).padStart(2, "0")} — {String(images.length).padStart(2, "0")}
      </div>

      <button
        onClick={onPrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full"
        style={{ color: colors.text, backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={1.3} />
      </button>
      <button
        onClick={onNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full"
        style={{ color: colors.text, backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <ChevronRight className="w-6 h-6" strokeWidth={1.3} />
      </button>

      <motion.div
        className="relative w-full h-full flex items-center justify-center px-5 md:px-24"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -70) onNext();
          if (info.offset.x > 70) onPrev();
        }}
        style={{ x: dragX, opacity }}
      >
        <motion.div
          key={current.path}
          variants={modalImage}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative max-w-[90vw] max-h-[82vh]"
        >
          <SecureImage
            path={current.path}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="90vw"
            quality="auto:best"
            className="max-h-[82vh] w-auto h-auto object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Page – High Fashion Photography                                      */
/* -------------------------------------------------------------------------- */
export default function HighFashionPage() {
  const [images, setImages] = useState<LookbookImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const FOLDER = "HFashion";

  useEffect(() => {
    fetch(`/api/cloudinary/list?folder=${encodeURIComponent(FOLDER)}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openGallery = useCallback((i: number) => setActiveIndex(i), []);
  const closeGallery = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);
  const goNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % images.length
    );
  }, [images.length]);

  return (
    <>
      <main style={{ backgroundColor: colors.bg, color: colors.text }}>
        {/* ========== HERO ========== */}
        <section className="relative pt-10 md:pt-16 pb-6 md:pb-14 px-6 md:px-10 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              {/* Left Text */}
              <div className="lg:col-span-7">
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[0.95] mb-8"
                >
                  High Fashion
                  <br />
                  Photography
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-lg font-light max-w-lg leading-relaxed"
                  style={{ color: colors.muted }}
                >
                high fashion photography in India for designers, models, and luxury brands—defined by sculpted silhouettes, dramatic light, precise composition, and sophisticated direction.
                </motion.p>
              </div>

              {/* Right Accent - Random Image */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="lg:col-span-5 hidden lg:block"
              >
                {images.length > 0 ? (
                  (() => {
                    const randomImage = images[Math.floor(Math.random() * images.length)];
                    const randomIndex = images.findIndex((img) => img.path === randomImage.path);

                    return (
                      <div
                        className="relative w-full h-65 overflow-hidden rounded-sm cursor-pointer group"
                        onClick={() => openGallery(randomIndex)}
                      >
                        <SecureImage
                          path={randomImage.path}
                          alt={randomImage.alt || "High Fashion Photography – Maestro Films"}
                          width={randomImage.width}
                          height={randomImage.height}
                          priority
                          className="w-full h-[90px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "linear-gradient(to top, rgba(26,26,26,0.2) 0%, transparent 50%)",
                          }}
                        />
                      </div>
                    );
                  })()
                ) : (
                  <div
                    className="h-[420px] rounded-sm"
                    style={{ backgroundColor: "#e8dfd4" }}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== MASONRY GALLERY ========== */}
        <section className="px-5 md:px-8 lg:px-10 pb-24 md:pb-32">
          <div className="max-w-[1400px] mx-auto mb-12 md:mb-16"></div>

          {loading ? (
            <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <ImageSkeleton key={i} />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p className="text-center py-20 font-light" style={{ color: colors.muted }}>
              No images found in this collection.
            </p>
          ) : (
            <motion.div
              className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6 space-y-5 md:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {images.map((img, i) => (
                <motion.figure
                  key={img.path}
                  variants={itemVariants}
                  className="break-inside-avoid overflow-hidden rounded-sm cursor-pointer group"
                  onClick={() => openGallery(i)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="relative overflow-hidden h-95">
                    <SecureImage
                      path={img.path}
                      alt={img.alt || `High Fashion Photography ${i + 1} – Maestro Films`}
                      width={img.width}
                      height={img.height}
                      priority={i < 4}
                      className="transition-transform object-cover object-top duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top, rgba(26,26,26,0.15) 0%, transparent 40%)",
                      }}
                    />
                  </div>
                </motion.figure>
              ))}
            </motion.div>
          )}
        </section>

        {/* ========== BOTTOM CTA ========== */}
        <section className="px-6 md:px-10 pb-28 md:pb-36">
          <div
            className="max-w-[1100px] mx-auto text-center border-t pt-20"
            style={{ borderColor: colors.border }}
          >
            <p
              className="text-[11px] tracking-[0.35em] uppercase mb-6 font-light"
              style={{ color: colors.accent }}
            >
              Create Something Bold
            </p>
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">
              Ready for your next high fashion shoot?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500"
              style={{ backgroundColor: colors.accent, color: colors.dark }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.accent)}
            >
              Inquire Now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <GalleryModal
            images={images}
            index={activeIndex}
            onClose={closeGallery}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}