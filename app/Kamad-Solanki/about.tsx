'use client';

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-5 md:py-10 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <div>
            <p className="text-[11px] md:text-xs font-medium md:text-left text-center tracking-[0.32em] uppercase text-[#a68b6a] mb-4">
              Who We Are
            </p>

            <h2 className="font-body md:text-left text-center text-4xl md:text-5xl lg:text-[3.4rem] font-light text-gold leading-[1.05] mb-2">
              About Us
            </h2>
            <h3 className="font-body text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#a68b6a] mb-8">
              
            </h3>

            <div className="space-y-5 max-w-md  md:text-left text-center">
              <p className="text-[15px] md:text-base text-gold  leading-relaxed font-light">
                <span className="font-medium  ">Maestro Films</span> is
                an independent film production house focused on commercial and
                editorial work.
              </p>
              <p className="text-[15px] md:text-base  md:text-left text-center text-gold leading-relaxed font-light">
                We collaborate with brands, stylists, and visionaries to craft visual
                narratives that are emotionally driven and timeless.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Large top image */}
              <div className="col-span-2 relative h-48 md:h-64 overflow-hidden rounded-sm group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/onepic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <CornerMark />
              </div>

              {/* Bottom left */}
              <div className="relative h-40 md:h-52 overflow-hidden rounded-sm group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/twpic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Bottom right */}
              <div className="relative h-40 md:h-52 overflow-hidden rounded-sm group">
                <img
                  src="https://6a8930a197833836f65581d4.imgix.net/sandbox/thrpic.jpeg"
                  alt="Maestro Films production work"
                  className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <span className="font-serif text-white/90 text-sm tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        Maestro Films
      </span>
    </div>
  );
}