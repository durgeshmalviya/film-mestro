'use client'

import { motion } from "framer-motion";

const brands = [
  { logo: "https://i.ibb.co/dwTb4sCt/Illyas.jpg", name: "LLYSAS’S" },
  { logo: "https://i.ibb.co/67RfHSnN/Untitled-300-x-300-px-e1740134537181.jpg", name: "" },
  { logo: "https://i.ibb.co/6RymwLKy/Ecoholics-horiz-white.png", name: "" },
  { logo: "https://i.ibb.co/C3dvmzQ8/Eventra-logo-1-01-removebg-preview.png", name: "" },
  { logo: "https://i.ibb.co/nMTJKKjx/hpcllogo.jpg", name: "" },
];
export default function AboutUs() {
  return (
    <section id="about" className="md:py-5 px-4 md:px-6 bg-[#f5f1ed]  ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          
          {/* Text Side */}
          <div className="reveal text-center md:text-left px-10">
            <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-light text-[#a68b6a] leading-none mb-1">
              ABOUT
            </h2>
            <h3 className="font-body text-3xl md:text-4xl text-[#a68b6a] mb-3 -mt-1">
              Us
            </h3>

            <p className="text-[11px] tracking-[0.28em] uppercase text-[#a68b6a] mb-4 opacity-90">
              Exclusively for the Fashion Industry
            </p>

            <div className="space-y-3 max-w-md mx-auto md:mx-0">
              <p className="text-[#a68b6a] leading-relaxed font-light text-sm md:text-[15px]">
                <span className="font-semibold text-xl mr-1">M</span>
                aestro Films is an independent production house dedicated to fashion, beauty, and jewellery.
              </p>
              <p className="text-[#a68b6a] leading-relaxed font-light text-sm md:text-[15px]">
                We partner with brands and visionaries to create timeless visual stories that feel both intimate and powerful.
              </p>
            </div>

            <p className="mt-5 text-[12px] tracking-[0.22em] uppercase text-[#a68b6a] opacity-80">
              Fashion • Beauty • Jewellery
            </p>
          </div>

          {/* Images Side */}
          <div className="reveal">
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
              <div className="col-span-2 relative h-40 md:h-56 overflow-hidden rounded-sm shadow-md hover-lift group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/onepic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                <CornerMark />
              </div>

              <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/twpic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
              </div>

              <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/thrpic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="relative w-full overflow-hidden py-3 bg-[#c9a86c] rounded-b-xl">
        <p className="md:text-left text-[#f5f1ed] text-center font-medium tracking-[0.29em] px-5 text-gold uppercase mb-1 "> our clients</p>
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {/* Repeat list for infinite scroll */}
        {[...brands, ...brands].map((item, i) => (
          <div key={i} className="flex items-center gap-3 min-w-max">
            <img
              src={item.logo}
              alt={item.name || "Brand logo"}
              className="h-12 w-auto object-contain"
            />
            {item.name && (
              <span className="text-white text-lg font-semibold whitespace-nowrap">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
    </section>
  )
}

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500">
      <span className="font-serif text-white text-sm md:text-base drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        Maestro Films
      </span>
    </div>
  )
}