'use client';

import { useState } from 'react';
import { Menu, X, Play, Film, ChevronRight } from 'lucide-react';
import Image from 'next/image';
 
export default function MaestroFilmsComplete() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-[#f5f1ed] text-[#2a2a2a] min-h-screen font-sans overflow-x-hidden">
      {/* ============ HERO SECTION ============ */}
      <section className="relative w-full h-screen overflow-hidden bg-[#8b7355]">
        {/* HEADER */}
        <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center">
          <div className="text-white text-2xl font-light  tracking-widest">MAESTRO FILMS</div>
          <button
            className="w-8 h-6 flex flex-col justify-between cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-full h-0.5 bg-white transition-all"></div>
            <div className="w-full h-0.5 bg-white transition-all"></div>
            <div className="w-full h-0.5 bg-white transition-all"></div>
          </button>
        </div>

        {/* LEFT SECTION - Image */}
     <div className="absolute left-0 top-0 w-1/2 h-full hidden md:flex overflow-hidden">
             <img
            src="https://i.ibb.co/rKjZyrPC/qwe.jpg"
            alt="Maestro Films"
            
           
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* RIGHT SECTION - Image */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block overflow-hidden">
             <img
            src="https://i.ibb.co/jkTxyFs7/image.jpg"
            alt="Maestro Films"
            
           
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* CENTER OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-black/0 via-black/0 to-black/10">
          <div className="text-center text-white px-4">
            <h1 className="text-8xl md:text-9xl font-thin italic mb-2 font-serif tracking-tight drop-shadow-lg">
              Maestro
            </h1>
            <h2 className="text-4xl md:text-5xl font-light mb-3 drop-shadow-lg">Films</h2>
            <p className="text-base md:text-lg font-light tracking-wide drop-shadow-md">
              Cinematic Excellence from Bhopal
            </p>
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="absolute bottom-1/2 left-4 md:left-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-3 bg-black/40 hover:bg-black/60 text-white text-sm font-light backdrop-blur-sm rounded-full transition">
            portfolio
          </button>
        </div>

        <div className="absolute bottom-1/2 right-4 md:right-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-3 bg-black/40 hover:bg-black/60 text-white text-sm font-light backdrop-blur-sm rounded-full transition">
            contact us
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </section>

      {/* ============ RECENT PRODUCTIONS SECTION ============ */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="text-xs md:text-sm font-medium text-gray-600 mb-2">CINEMATIC SHOWCASE</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Latest <span className="font-semibold">films & productions</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
              Every frame tells a story. From commercial campaigns to documentary films, our productions capture the essence of emotion and authenticity. We blend technical precision with artistic vision to create content that resonates across all platforms and audiences.
            </p>
            <button className="mt-6 md:mt-8 px-6 py-2 border border-gray-400 text-gray-700 font-light hover:border-gray-700 transition flex items-center gap-2 text-sm">
              <Play size={16} /> learn more
            </button>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-[#5a6b7d] to-[#7a8b9d] h-56 md:h-80 rounded-sm overflow-hidden hover:shadow-lg transition flex items-center justify-center group cursor-pointer">
              <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition" />
            </div>
            <div className="bg-gradient-to-br from-[#e07856] to-[#d96c48] h-56 md:h-80 rounded-sm overflow-hidden hover:shadow-lg transition flex items-center justify-center group cursor-pointer">
              <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition" />
            </div>
            <div className="bg-gradient-to-br from-[#3a2f2a] to-[#5a4a40] h-56 md:h-80 rounded-sm overflow-hidden hover:shadow-lg transition flex items-center justify-center group cursor-pointer">
              <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 transition" />
            </div>
          </div>

          {/* Carousel indicator */}
          <div className="flex justify-end mt-4 gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ ABOUT US SECTION ============ */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-5xl md:text-6xl font-light mb-2">
                ABOUT<br />
                <span className="font-light italic">Us</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mt-8">
                Maestro Films is an independent film production house focused on commercial and editorial work.
              </p>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mt-4">
                We collaborate with brands, stylists, and visionaries to craft visual narratives that are emotionally driven and timeless.
              </p>
            </div>

            {/* Right Column - Image Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-[#8a9aaa] to-[#7a8a9a] h-40 md:h-48 rounded-sm flex items-center justify-center">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white opacity-40" />
              </div>
              <div className="bg-gradient-to-br from-[#2a2420] to-[#4a3a30] h-40 md:h-48 rounded-sm flex items-center justify-center">
                <Film className="w-6 h-6 md:w-8 md:h-8 text-white opacity-40" />
              </div>
              <div className="bg-gradient-to-br from-[#6a7a8a] to-[#5a6a7a] h-40 md:h-48 rounded-sm flex items-center justify-center">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white opacity-40" />
              </div>
              <div className="bg-gradient-to-br from-[#1a1410] to-[#3a2a20] h-40 md:h-48 rounded-sm flex items-center justify-center">
                <Film className="w-6 h-6 md:w-8 md:h-8 text-white opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column - Text & Image */}
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-[#8b7355] to-[#a68471] h-64 md:h-96 rounded-sm mb-4 md:mb-6 flex items-center justify-center relative overflow-hidden">
                <Film className="w-24 h-24 md:w-32 md:h-32 text-white opacity-20 absolute" />
                <h2 className="text-5xl md:text-6xl font-light text-white absolute bottom-6 left-6 z-10">
                  Let's<br />
                  <span className="font-bold text-6xl md:text-7xl">TALK</span>
                </h2>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="order-1 md:order-2">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="full name"
                    className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="email"
                    className="bg-transparent border-b border-gray-400 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition text-sm md:text-base"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="phone"
                    className="bg-transparent border-b border-gray-400 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition text-sm md:text-base"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition resize-none text-sm md:text-base"
                ></textarea>

                <button
                  type="submit"
                  className="mt-6 md:mt-8 px-8 py-3 bg-gray-800 text-white font-medium hover:bg-gray-900 transition rounded-sm text-sm md:text-base"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-black text-white py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex gap-6 text-sm">
              <button className="font-light hover:text-gray-300 transition">portfolio</button>
              <button className="font-light hover:text-gray-300 transition">blog</button>
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition" title="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1.5 9-5.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300 transition" title="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8" fill="none" stroke="currentColor" strokeWidth="2"></path>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300 transition" title="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-xs md:text-sm text-gray-400">
            <p>&copy; 2024 Maestro Films. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}