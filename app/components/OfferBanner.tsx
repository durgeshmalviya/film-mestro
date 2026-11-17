"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function NewYearOfferBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-black border-b border-[#c9a86c]/25 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 py-2.5 text-sm relative">
          
          {/* Center Content */}
          <Link
            href="/advanced-work"
            className="flex items-center justify-center gap-3 group"
          >
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#c9a86c]/15 text-[#c9a86c] text-[10px] font-medium tracking-[0.15em] uppercase">
              New Year Offer
            </span>

            <p className="text-zinc-300 group-hover:text-white transition-colors">
              <span className="text-[#c9a86c] font-medium">High-Fashion Calendar 2027</span>
              <span className="hidden md:inline text-zinc-400">
                {" "}— Packages from ₹30k - Wall Calendar (25 Copies)
              </span>
            </p>
          </Link>

          {/* Close Button - Absolute Right */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 p-1.5 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}