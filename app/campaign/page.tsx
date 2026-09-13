"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const images = [
  {
    src: "https://ik.imagekit.io/maestrofilms/MF_08942.jpg?updatedAt=1788072997752&ik-s=073b8f8911744a355fafd7ff35c4b7af71bc830d",
    alt: "Fashion campaign photography – Urban Edge",
  },
  {
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%209%20copy.jpg?updatedAt=1788075353055&ik-s=7fdbab837cc3e8ac00d5e8d92738b56e6ea79fbd",
    alt: "Campaign editorial frame",
  },
  {
    src: "https://ik.imagekit.io/maestrofilms/Copy%20of%2019.jpg?updatedAt=1788075350100&ik-s=b85a972771eddb158663211697f33750416081ee",
    alt: "Campaign lookbook style",
  },
  {
    src: "https://ik.imagekit.io/maestrofilms/MF_08305.jpg?updatedAt=1788075346400&ik-s=1bb90076870539d1f89d2b132df30f2aea0f5516",
    alt: "Campaign beauty still",
  },
];

export default function CampaignPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f1ed] text-[#1a1a1a]">
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-5 md:px-10">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              Fashion Photography
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-5">
              Campaign
            </h1>
            <p className="text-[#5a5a5a] text-base md:text-lg font-light max-w-2xl leading-relaxed">
              Commercial fashion campaigns built to perform — strong concepts,
              polished execution, ready for print, social, and paid media.
            </p>
          </div>
        </section>

        <section className="px-5 md:px-10 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {images.map((img, i) => (
              <figure
                key={i}
                className="break-inside-avoid overflow-hidden rounded-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="px-5 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto text-center border-t border-[#e0d6c8] pt-14">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4">
              Next step
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] mb-8">
              Start a campaign
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#c9a86c] text-[#0a0a0a] px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#e0c48a] transition-all duration-500"
            >
              Inquire
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}