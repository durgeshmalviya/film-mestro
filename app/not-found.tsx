"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Home } from "lucide-react";

const colors = {
  bg: "#f5f1ed",
  text: "#1a1a1a",
  muted: "#5a5a5a",
  accent: "#c9a86c",
  accentHover: "#e0c48a",
  border: "#e0d6c8",
  dark: "#0a0a0a",
} as const;

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <div className="max-w-2xl w-full text-center">
        {/* Large 404 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light"
          style={{ color: colors.accent }}
        >
          Maestro Films
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-7xl sm:text-8xl md:text-9xl font-light tracking-tight mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-light mb-5"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg font-light max-w-md mx-auto mb-12 leading-relaxed"
          style={{ color: colors.muted }}
        >
          The page you’re looking for doesn’t exist or has been moved.  
          Explore our fashion photography work instead.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500"
            style={{ backgroundColor: colors.accent, color: colors.dark }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.accentHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.accent)
            }
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500 border"
            style={{
              borderColor: colors.accent,
              color: colors.text,
            }}
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 pt-10 border-t"
          style={{ borderColor: colors.accent }}
        >
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6 font-light"
            style={{ color: colors.accent }}
          >
            Explore
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-light">
            <Link href="/catalog" className="hover:opacity-60 transition-opacity">
              Catalog
            </Link>
            <Link href="/high-fashion" className="hover:opacity-60 transition-opacity">
              High Fashion
            </Link>
            <Link href="/editorial" className="hover:opacity-60 transition-opacity">
              Editorial
            </Link>
            <Link href="/product" className="hover:opacity-60 transition-opacity">
              Product
            </Link>
            <Link href="/contact" className="hover:opacity-60 transition-opacity">
              Contact
            </Link>
          </div>
        </motion.div>

        {/* GEO line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-[12px] font-light"
          style={{ color: colors.accent }}
        >
          Fashion Photography in Bhopal, Indore, Mumbai, Delhi & Jaipur
        </motion.p>
      </div>
    </main>
  );
}