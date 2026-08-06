'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Menu, X, Mail, MapPin } from 'lucide-react';
import type { Variants } from 'framer-motion';

const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-[#f5f1ed] font-body selection:bg-[#8b7355] selection:text-white"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Poppins:wght@200;300;400;500;600&display=swap');
        .font-script { font-family: 'Allura', cursive; }
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* ============ HEADER ============ */}
      <motion.nav variants={fadeUp} className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 bg-[#f5f1ed]/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#2a2a2a] hover:text-[#8b7355] transition-colors duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light tracking-wider uppercase">Back</span>
          </Link>

          <button className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`w-full h-[1.5px] bg-[#2a2a2a] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-[1.5px] bg-[#2a2a2a] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-full h-[1.5px] bg-[#2a2a2a] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#1a1410] z-40 flex items-center justify-center">
            <nav className="text-center space-y-8">
              {['Home', 'Portfolio', 'About', 'Contact'].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-3xl md:text-5xl font-light text-white hover:text-[#c4a882] transition-colors duration-300 tracking-wide">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ HERO ============ */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Left: Name & Title */}
          <div className="md:col-span-5 md:sticky md:top-32">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium mb-4">
              Fashion Photographer
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-body text-5xl md:text-7xl lg:text-8xl font-light text-[#2a2a2a] leading-[0.95] mb-2">
              Kamad
            </motion.h1>
            <motion.h2 variants={fadeUp} className="font-script text-6xl md:text-8xl lg:text-9xl text-[#8b7355] -mt-2 md:-mt-4 ml-1 md:ml-2">
              Solanki
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-10 space-y-1">
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-light tracking-wider uppercase">Bhopal <span className="text-gray-300 mx-2">|</span> Mumbai</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs font-light tracking-wider">Officialmaestrofilm@gmail.com</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Link href="#contact" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-light text-[#2a2a2a] border-b border-gray-400 pb-1 hover:border-[#8b7355] hover:text-[#8b7355] transition-all duration-300">
                Get in Touch <span className="text-lg leading-none">&rarr;</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Bio Text */}
          <div className="md:col-span-7 space-y-8 md:space-y-10">
            <motion.p variants={fadeUp} className="text-gray-600 leading-[1.9] font-light text-sm md:text-[15px]">
              <span className="font-script text-3xl text-[#8b7355] mr-2">T</span>
              hank you for visiting my portfolio. I&apos;m <span className="text-[#2a2a2a] font-normal">Kamad Solanki</span>, a Fashion Photographer based in <span className="text-[#2a2a2a] font-normal">Bhopal</span> and <span className="text-[#2a2a2a] font-normal">Mumbai</span>, dedicated to creating imagery that is elegant, expressive, and timeless. My work is built on a simple belief—great fashion photography goes beyond showcasing clothing; it captures confidence, character, and the story behind every individual.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 leading-[1.9] font-light text-sm md:text-[15px]">
              Every project begins with understanding the vision, personality, and purpose behind the shoot. Whether working with models, designers, brands, or emerging talent, I focus on creating photographs that feel natural, refined, and visually distinctive. From editorial portraits and lookbooks to campaign imagery and personal portfolios, each frame is crafted with intention and attention to detail.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 leading-[1.9] font-light text-sm md:text-[15px]">
              My approach combines creative direction with a calm, collaborative working style. I believe the best photographs are created when people feel comfortable, confident, and free to express themselves. This allows every image to feel genuine rather than staged, resulting in work that is both visually striking and emotionally connected.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 leading-[1.9] font-light text-sm md:text-[15px]">
              For me, photography is not simply about taking pictures—it&apos;s about preserving moments of style, emotion, and individuality in a way that remains meaningful long after the shutter is released. I continually seek to create images that are clean, sophisticated, and true to the people and stories they represent.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-600 leading-[1.9] font-light text-sm md:text-[15px]">
              This portfolio is a reflection of my journey, my passion for fashion, and my commitment to creating work with honesty, creativity, and excellence. Thank you for taking the time to explore my work. I hope these photographs inspire you as much as creating them has inspired me.
            </motion.p>

            {/* Signature */}
            <motion.div variants={fadeUp} className="pt-6 border-t border-gray-300/50">
              <p className="font-script text-3xl text-[#8b7355] mb-1">Kamad Solanki</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-medium">Fashion Photographer</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ IMAGE STRIP ============ */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            {[
              'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img9.jpg',
              'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img14.jpg',
              'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img11.jpg',
              'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/croma%20shoot/Artboard%205.jpg',

            ].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative h-full md:h-80 overflow-hidden rounded-sm group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
              >
                <img src={img} alt="Fashion" className="w-full h-110 object-cover transition-transform duration-700 scale-95 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TAGLINE ============ */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-[#f5f1ed] text-center">
        <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
          <p className="font-script text-3xl md:text-5xl text-[#8b7355] leading-relaxed mb-6">
            Capturing Style. Creating Stories. Inspiring Confidence.
          </p>
          <div className="w-12 h-[1px] bg-[#8b7355]/40 mx-auto" />
        </motion.div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-10 md:py-14 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium mb-3">Availability</p>
              <h3 className="font-body text-3xl md:text-5xl font-light mb-1">Let&apos;s</h3>
              <h3 className="font-script text-4xl md:text-6xl text-[#2a2a2a] mb-6 md:mb-8 -mt-2 ml-1">Create</h3>
              <p className="text-gray-600 leading-[1.8] font-light text-sm md:text-[15px] max-w-md mb-8">
                Available for Editorials, Campaigns, Brand Collaborations & Portfolio Sessions across Bhopal and Mumbai.
              </p>

              <div className="space-y-3">
                <p className="text-sm text-[#2a2a2a] font-light">+91 75818 00555</p>
                <p className="text-sm text-[#2a2a2a] font-light">+91 75820 05558</p>
                <p className="text-sm text-[#2a2a2a] font-light">Officialmaestrofilm@gmail.com</p>
              </div>

              <div className="flex gap-4 mt-8">
                <a href="https://www.instagram.com/maestrofilms.in/" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-[#2a2a2a] text-white text-[11px] tracking-wider uppercase font-light rounded-sm hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg">
                  Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61577981519394" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-gray-400 text-gray-700 text-[11px] tracking-wider uppercase font-light rounded-sm hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300">
                  Facebook
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative h-72 md:h-96 rounded-sm overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop" alt="Studio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-light mb-1">Maestro Films</p>
                <p className="text-white text-lg md:text-xl font-light">Croma Shoot Studio</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#1a1410] text-white py-8 md:py-10 px-6 md:px-10 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 font-light tracking-wider">
            &copy; 2025 Maestro Films. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-600 font-light">
            Croma Shoot — Fashion Photography
          </p>
        </div>
      </footer>
    </motion.div>
  );
}