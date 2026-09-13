"use client";

import Link from "next/link";

interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  href: string;
}

const portfolioImages: PortfolioImage[] = [
  {
    id: 1,
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%209%20copy.jpg?updatedAt=1788075353055&ik-s=7fdbab837cc3e8ac00d5e8d92738b56e6ea79fbd",
    alt: "High-fashion editorial photography – Shadow Play",
    title: "Shadow Play",
    category: "Editorial",
    href: "/portfolio/editorial",
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%2019.jpg?updatedAt=1788075350100&ik-s=b85a972771eddb158663211697f33750416081ee",
    alt: "Golden hour fashion lookbook photography",
    title: "Golden Hour",
    category: "Lookbook",
    href: "/portfolio/lookbook",
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/maestrofilms/MF_08305.jpg?updatedAt=1788075346400&ik-s=1bb90076870539d1f89d2b132df30f2aea0f5516",
    alt: "Soft light beauty and fashion photography",
    title: "Soft Light",
    category: "Beauty",
    href: "/portfolio/beauty",
  },
  {
    id: 4,
    src: "https://ik.imagekit.io/maestrofilms/MF_08942.jpg?updatedAt=1788072997752&ik-s=073b8f8911744a355fafd7ff35c4b7af71bc830d",
    alt: "Urban edge commercial fashion campaign photography",
    title: "Urban Edge",
    category: "Campaign",
    href: "/portfolio/campaign",
  },
];

export default function FashionPortfolio() {
  return (
    <>
      <section className="px-5 md:px-10 lg:px-12 bg-[#f5f1ed] select-none">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 md:mb-10 max-w-3xl">
            <p className="text-[13px] md:text-sm font-medium text-center md:text-left tracking-[0.32em] px-2 uppercase text-gold mb-2">
              Selected Showcase
            </p>
            <h2 className="font-body text-4xl md:text-5xl lg:text-[3.4rem] text-center md:text-left font-light text-gold leading-[1.1] mb-2">
              The <span className="font-medium">Maestro</span> Shoots
            </h2>
            <p className="text-[15px] px-2 text-center md:text-left md:text-base text-gold leading-relaxed max-w-xl font-base tracking-wide">
              Powerful fashion photography that sells the story. Striking
              editorials, lookbooks, and commercial campaigns crafted to
              captivate and convert.
            </p>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {portfolioImages.map((img) => (
              <Link
                key={img.id}
                href={img.href}
                className="break-inside-avoid relative group block overflow-hidden rounded-sm bg-[#f5f1ed]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-auto object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <p className="text-white text-[13px] font-medium tracking-[0.08em]">
                    {img.title}
                  </p>
                  <p className="text-[#c9a86c] text-[10px] mt-1.5 tracking-[0.22em] uppercase">
                    {img.category} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#f5f1ed] px-5 md:px-10 lg:px-16 pb-10 md:pb-12 pt-3 select-none">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="w-10 h-px bg-[#c9a86c]/50 mx-auto mb-6" />
          <p className="text-[10px] sm:text-[13px] tracking-[0.35em] uppercase text-gold mb-4">
            Next Steps
          </p>
          <p className="text-gold text-sm sm:text-[15px] tracking-wide max-w-xl mx-auto leading-relaxed font-medium">
            “Maestro is focused to coordinate with truthfulness, passion, & a
            commitment to Excellence”
          </p>
          <p className="text-gold text-xs sm:text-sm mt-4 tracking-[0.12em]">
            Let’s create something exceptional together
          </p>
        </div>
      </div>
    </>
  );
}