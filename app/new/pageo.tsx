'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, ChevronRight, ChevronLeft, Play, Film } from 'lucide-react';

export default function MaestroFilms() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const slides = [
    {
      left: 'https://i.ibb.co/rKjZyrPC/qwe.jpg',
      right: 'https://i.ibb.co/jkTxyFs7/image.jpg',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Cinematic Excellence from Bhopal',
    },
    {
      left: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop',
      right: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Stories That Move You',
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [currentSlide, isTransitioning]
  );

  const goToNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

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
    <div className="bg-[#f5f1ed] text-[#2a2a2a] min-h-screen font-sans overflow-x-hidden selection:bg-[#8b7355] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Poppins:wght@200;300;400;500;600;700&display=swap');

        .font-script { font-family: 'Allura', cursive; }
        .font-body { font-family: 'Poppins', sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        .hero-image-anim { animation: fadeInScale 1.2s ease-out forwards; }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
        }

        .image-zoom { overflow: hidden; }
        .image-zoom img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .image-zoom:hover img { transform: scale(1.06); }

        .carousel-progress {
          animation: progress 6s linear forwards;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* ============ HERO CAROUSEL ============ */}
      <section className="relative w-full h-screen overflow-hidden bg-[#2a2420]">
        {/* HEADER */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-500 ${
            scrolled ? 'bg-[#f5f1ed]/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent'
          }`}
        >
          <div
            className={`text-sm md:text-base font-body font-light tracking-[0.25em] uppercase transition-colors duration-300 ${
              scrolled ? 'text-[#2a2a2a]' : 'text-white'
            }`}
          >
            Maestro Films
          </div>
          <button
            className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? 'bg-[#2a2a2a]' : 'bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}
            />
            <span
              className={`w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? 'bg-[#2a2a2a]' : 'bg-white'
              } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`w-full h-[1.5px] transition-all duration-300 ${
                scrolled ? 'bg-[#2a2a2a]' : 'bg-white'
              } ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-[#1a1410] z-40 flex items-center justify-center transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <nav className="text-center space-y-6">
            {['Portfolio', 'About', 'Productions', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-3xl md:text-5xl font-body font-light text-white hover:text-[#c4a882] transition-colors duration-300 tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
          >
            {/* LEFT IMAGE - Desktop */}
            <div className="absolute left-0 top-0 w-full md:w-1/2 h-full hidden md:block overflow-hidden">
              <img
                src={slide.left}
                alt="Maestro Films"
                className="w-full h-full object-cover hero-image-anim"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* RIGHT IMAGE - Full mobile / Half desktop */}
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full overflow-hidden">
              <img
                src={slide.right}
                alt="Maestro Films"
                className="w-full h-full object-cover hero-image-anim"
                style={{ animationDelay: '0.15s' }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CENTER CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-black/20 via-transparent to-black/30">
              <div
                className={`text-center text-white px-4 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <h1 className="font-script text-6xl md:text-8xl mb-0 leading-none drop-shadow-2xl animate-float">
                  {slide.title}
                </h1>
                <p className="font-body font-bold text-2xl md:text-4xl tracking-[0.15em] mb-3 drop-shadow-lg uppercase">
                  {slide.subtitle}
                </p>
                <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase drop-shadow-md opacity-90 font-body">
                  {slide.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* CAROUSEL ARROWS */}
        <button
          onClick={goToPrev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* DOTS + PROGRESS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="flex gap-2.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                }`}
              >
                {index === currentSlide && <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />}
              </button>
            ))}
          </div>
          <div className="w-20 md:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div key={currentSlide} className="h-full bg-white/70 rounded-full carousel-progress" />
          </div>
        </div>

        {/* SIDE BUTTONS - Desktop */}
        <div className="absolute bottom-1/2 left-5 md:left-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/20 text-white text-[11px] font-body font-light tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
            portfolio
          </button>
        </div>
        <div className="absolute bottom-1/2 right-5 md:right-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/20 text-white text-[11px] font-body font-light tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
            contact us
          </button>
        </div>

        {/* MOBILE BOTTOM BUTTONS */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3 md:hidden z-20 px-6">
          <button className="flex-1 py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] font-body font-light tracking-wider uppercase border border-white/20">
            portfolio
          </button>
          <button className="flex-1 py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] font-body font-light tracking-wider uppercase border border-white/20">
            contact us
          </button>
        </div>
      </section>

      {/* ============ RECENT PRODUCTIONS ============ */}
      

      {/* ============ ABOUT US ============ */}
      <section id="about" className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            {/* Left - Text */}
            <div className="reveal">
              <h2 className="font-body text-4xl md:text-6xl font-light text-[#2a2a2a] leading-none mb-1">
                ABOUT
              </h2>
              <h3 className="font-script text-4xl md:text-6xl text-[#2a2a2a] mb-6 md:mb-8 -mt-1 ml-1">
                Us
              </h3>
              <div className="space-y-3 max-w-md">
                <p className="text-gray-600 leading-relaxed font-body font-light text-sm md:text-[15px]">
                  <span className="font-script text-2xl text-[#8b7355] mr-1">M</span>
                  aestro Films is an independent film production house focused on commercial and editorial work.
                </p>
                <p className="text-gray-600 leading-relaxed font-body font-light text-sm md:text-[15px]">
                  We collaborate with brands, stylists, and visionaries to craft visual narratives that are emotionally driven and timeless.
                </p>
              </div>
            </div>

            {/* Right - Image Grid */}
            <div className="grid grid-cols-2 gap-2.5 md:gap-3 reveal reveal-delay-1">
              {[
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop',
                'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=500&fit=crop',
                'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=500&fit=crop',
                'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=500&fit=crop',
              ].map((img, i) => (
                <div key={i} className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift image-zoom group">
                  <img src={img} alt="Production" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {i % 2 === 0 ? (
                      <Play className="w-5 h-5 text-white opacity-0 group-hover:opacity-60 transition-all duration-500" />
                    ) : (
                      <Film className="w-5 h-5 text-white opacity-0 group-hover:opacity-60 transition-all duration-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-12 md:py-16 px-4 md:px-6 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-stretch">
            {/* Left - Image */}
            <div className="relative reveal order-2 md:order-1">
              <div className="relative h-72 md:h-full min-h-[420px] rounded-sm overflow-hidden shadow-2xl image-zoom group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop"
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                  <h2 className="font-body text-3xl md:text-5xl font-light text-white leading-none mb-1">
                    Let's
                  </h2>
                  <h2 className="font-body text-4xl md:text-7xl font-bold text-white tracking-tight">
                    TALK
                  </h2>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="order-1 md:order-2 flex items-center reveal reveal-delay-1">
              <form onSubmit={handleFormSubmit} className="w-full space-y-6 md:space-y-8">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="full name"
                    required
                    className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="email"
                    required
                    className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="phone"
                    className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="message"
                  rows={3}
                  required
                  className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 resize-none font-body font-light text-sm tracking-wide"
                />

                <button
                  type="submit"
                  className="mt-2 px-8 py-3 bg-[#2a2a2a] text-white font-body font-medium hover:bg-[#1a1a1a] transition-all duration-300 rounded-sm text-xs tracking-wider uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#1a1410] text-white py-10 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex gap-6 text-xs font-body font-light tracking-wider">
              <a href="#" className="hover:text-[#c4a882] transition-colors duration-300">portfolio</a>
              <a href="#" className="hover:text-[#c4a882] transition-colors duration-300">blog</a>
            </div>

            <div className="flex gap-5">
              {[
                {
                  name: 'Twitter',
                  path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1.5 9-5.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
                },
                {
                  name: 'Instagram',
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                },
                {
                  name: 'Facebook',
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="hover:text-[#c4a882] transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-[11px] text-gray-500 font-body font-light tracking-wider">
              &copy; 2024 Maestro Films. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}