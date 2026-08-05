"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import logo from "@/assets/mflog.png";

interface MediaItem {
  type: "image" | "video" | "youtube";
  src: StaticImageData | string;
}

interface GalleryWithModalProps {
  imageUrls: (StaticImageData | string)[][];
  imageVariants: Record<string, any>;
  modalOpacity?: number;
}

const GalleryWithModal: React.FC<GalleryWithModalProps> = ({
  imageUrls,
  imageVariants,
  modalOpacity = 0.95,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 🔄 Flatten + detect media type
  const flatMedia: MediaItem[] = imageUrls.flat().map((item) => {
    if (typeof item === "string") {
      if (item.endsWith(".mp4") || item.endsWith(".webm")) {
        return { type: "video", src: item };
      }
      if (item.includes("youtube.com") || item.includes("youtu.be")) {
        return { type: "youtube", src: item };
      }
    }
    return { type: "image", src: item };
  });

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeModal = () => setModalOpen(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flatMedia.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flatMedia.length) % flatMedia.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // ⌨️ Keyboard shortcuts
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  // 🖱️ Scroll zoom for images
  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      let newZoom = prev + (e.deltaY < 0 ? 0.2 : -0.2);
      return Math.min(Math.max(newZoom, 1), 4);
    });
  };

  const handleDoubleClick = () => {
    setZoom((prev) => (prev > 1 ? 1 : 2));
    setOffset({ x: 0, y: 0 });
  };

  // 🚫 Prevent background scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <>
{/* Masonry Grid */}
<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] md:p-10 select-none">
  {flatMedia.map((media, i) => (
    <motion.div
      key={i}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={imageVariants}
      onClick={() => openModal(i)}
      className="mb-6 break-inside-avoid cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-[1.03] group-hover:-rotate-1">
        {/* Images */}
        {media.type === "image" && (
          <Image
            src={media.src as StaticImageData}
            alt={`Gallery ${i + 1}`}
            className="w-full h-auto rounded-2xl object-cover select-none pointer-events-none"
            placeholder="blur"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        {/* Local Videos */}
        {media.type === "video" && (
          <video
            src={media.src as string}
            className="w-full h-auto rounded-2xl"
            muted
            playsInline
            autoPlay
            loop
          />
        )}

        {/* YouTube Embeds */}
        {media.type === "youtube" && (
          <iframe
            src={media.src as string}
            className="w-full h-[220px] md:h-[280px] rounded-2xl"
            allow="autoplay; encrypted-media"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Watermark */}
        <Image
          src={logo}
          alt="Watermark"
          width={50}
          height={50}
          className="absolute bottom-3 right-3 opacity-80 select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  ))}
</div>


      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: `rgba(0,0,0,${modalOpacity})` }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 text-white z-40">
              <span className="text-sm">
                {currentIndex + 1} / {flatMedia.length}
              </span>
              <button
                onClick={closeModal}
                className="p-2 bg-white text-black rounded-full shadow hover:scale-110 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Main Media */}
            <div
              className="flex-1 flex justify-center items-center overflow-hidden relative"
              onWheel={
                flatMedia[currentIndex].type === "image"
                  ? handleWheelZoom
                  : undefined
              }
              onDoubleClick={
                flatMedia[currentIndex].type === "image"
                  ? handleDoubleClick
                  : undefined
              }
            >
              <button
                onClick={goToPrev}
                className="absolute left-2 sm:left-6 text-white text-3xl z-30 hover:scale-110 transition"
              >
                <FaChevronLeft />
              </button>

              {/* Image */}
              {flatMedia[currentIndex].type === "image" && (
                <motion.img
                  key={currentIndex}
                  src={
                    typeof flatMedia[currentIndex].src === "string"
                      ? (flatMedia[currentIndex].src as string)
                      : (flatMedia[currentIndex].src as StaticImageData).src
                  }
                  alt={`Modal ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  animate={{ scale: zoom, x: offset.x, y: offset.y }}
                  drag={zoom > 1}
                  dragConstraints={{
                    left: -500,
                    right: 500,
                    top: -300,
                    bottom: 300,
                  }}
                  dragElastic={0.3}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onDrag={(e, info) => {
                    if (zoom > 1)
                      setOffset({ x: info.offset.x, y: info.offset.y });
                  }}
                />
              )}

              {/* Local Video */}
              {flatMedia[currentIndex].type === "video" && (
                <video
                  key={currentIndex}
                  src={flatMedia[currentIndex].src as string}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] max-w-full rounded-xl bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              )}

              {/* YouTube */}
              {flatMedia[currentIndex].type === "youtube" && (
                <iframe
                  key={currentIndex}
                  src={flatMedia[currentIndex].src as string}
                  className="w-full h-full max-h-[80vh] rounded-xl"
                  allow="autoplay; encrypted-media"
                />
              )}

              {/* Watermark */}
              <Image
                src={logo}
                alt="Watermark"
                width={80}
                height={80}
                className="absolute bottom-5 right-5 opacity-100 select-none pointer-events-none"
                draggable={false}
              />

              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-6 text-white text-3xl z-30 hover:scale-110 transition"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 p-3 bg-black/70">
              {flatMedia.map((thumb, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    idx === currentIndex
                      ? "ring-2 ring-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {thumb.type === "image" && (
                    <Image
                      src={thumb.src as StaticImageData}
                      alt={`Thumb ${idx + 1}`}
                      width={70}
                      height={70}
                      className="object-cover"
                    />
                  )}
                  {thumb.type === "video" && (
                    <video
                      src={thumb.src as string}
                      className="w-[70px] h-[70px] object-cover"
                      muted
                      playsInline
                    />
                  )}
                  {thumb.type === "youtube" && (
                    <iframe
                      src={thumb.src as string}
                      className="w-[70px] h-[70px] object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryWithModal;



{/*"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import logo from '@/assets/mflog.png'
interface GalleryWithModalProps {
  imageUrls: StaticImageData[][];
  imageVariants: Record<string, any>;
  modalOpacity?: number;
}

const GalleryWithModal: React.FC<GalleryWithModalProps> = ({
  imageUrls,
  imageVariants,
  modalOpacity = 0.95,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const flatImages = imageUrls.flat();

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeModal = () => setModalOpen(false);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % flatImages.length);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + flatImages.length) % flatImages.length
    );
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "ArrowLeft") goToPreviousImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  // Scroll zoom
  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      let newZoom = prev + (e.deltaY < 0 ? 0.2 : -0.2);
      return Math.min(Math.max(newZoom, 1), 4);
    });
  };

 
  const handleDoubleClick = () => {
    setZoom((prev) => (prev > 1 ? 1 : 2));
    setOffset({ x: 0, y: 0 });
  };
 
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";  
    };
  }, [modalOpen]);


  return (
    <>
       <div className="columns-1 sm:columns-2 md:columns-3 gap-3 [column-fill:_balance] md:p-8 select-none">
        {flatImages.map((img, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            onClick={() => openModal(i)}
            className="mb-3 break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-lg relative"
          >
            <Image
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-auto rounded-xl hover:scale-[1.02] transition select-none pointer-events-none"
              placeholder="blur"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <Image
              src={logo}
              alt="Watermark"
              width={50}
              height={50}
              className="absolute bottom-2 right-2 opacity-70 select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        ))}
      </div> 
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: `rgba(0,0,0,${modalOpacity})` }}
          > 
            <div className="flex justify-between items-center p-4 text-white z-40">
              <span className="text-sm">
                {currentImageIndex + 1} / {flatImages.length}
              </span>
              <button
                onClick={closeModal}
                className="p-2 bg-white text-black rounded-full shadow hover:scale-110 transition"
              >
                <FaTimes />
              </button>
            </div> 
            <div
              className="flex-1 flex justify-center items-center overflow-hidden relative"
              onWheel={handleWheelZoom}
              onDoubleClick={handleDoubleClick}
            >
              <button
                onClick={goToPreviousImage}
                className="absolute left-2 sm:left-6 text-white text-3xl z-30 hover:scale-110 transition"
              >
                <FaChevronLeft />
              </button>
              <motion.img
                key={currentImageIndex}
                src={flatImages[currentImageIndex].src}
                alt={`Modal ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                animate={{ scale: zoom, x: offset.x, y: offset.y }}
                drag={zoom > 1}
                dragConstraints={{
                  left: -500,
                  right: 500,
                  top: -300,
                  bottom: 300,
                }}
                dragElastic={0.3}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onDrag={(e, info) => {
                  if (zoom > 1)
                    setOffset({ x: info.offset.x, y: info.offset.y });
                }}
              /> 
              <Image
                src={logo}
                alt="Watermark"
                width={80}
                height={80}
                className="absolute bottom-5 right-130 opacity-100 select-none pointer-events-none"
                draggable={false}
              />

              <button
                onClick={goToNextImage}
                className="absolute right-2 sm:right-6 text-white text-3xl z-30 hover:scale-110 transition"
              >
                <FaChevronRight />
              </button>
            </div> 
            <div className="flex overflow-x-auto gap-2 p-3 bg-black/70">
              {flatImages.map((thumb, idx) => (
                <Image
                  key={idx}
                  src={thumb}
                  alt={`Thumb ${idx + 1}`}
                  width={70}
                  height={70}
                  className={`cursor-pointer rounded-md object-cover ${
                    idx === currentImageIndex
                      ? "ring-2 ring-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryWithModal;
*/}