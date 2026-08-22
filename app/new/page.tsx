'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/Footer';
export default function MaestroFilms() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const modalRef = useRef<HTMLVideoElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });


  
  const slides = [
    {      left: 'https://i.ibb.co/rKjZyrPC/qwe.jpg',
    
      right: 'https://i.ibb.co/4RRd3Nsz/DSC09933-Enhanced-NR-1.jpg',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Cinematic Excellence from Bhopal',
    },
    {
      left: 'https://i.ibb.co/DHm0Xs8v/Img10.jpg',
      right: 'https://i.ibb.co/jkTxyFs7/image.jpg',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Stories That Move You',
    },
    {
  left: ' https://i.ibb.co/HDF4dS09/front-page-1.jpg',
      right: 'https://i.ibb.co/jkTxyFs7/image.jpg',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Cinematic Excellence from Bhopal',
    },
    {
      left: 'https://i.ibb.co/DHm0Xs8v/Img10.jpg',
      right: ' https://i.ibb.co/PZNnnv4K/Img12.jpg',
      title: 'Maestro',
      subtitle: 'Films',
      tagline: 'Stories That Move You',
    },
  ];

  const editorials = [
    { img: 'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img9.jpg', color: 'from-gray-700 to-gray-900', title: 'Shadow Play' },
    { img: 'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img14.jpg', color: 'from-orange-400 to-orange-600', title: 'Golden Hour' },
    { img: 'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img11.jpg', color: 'from-amber-800 to-amber-950', title: 'Warm Tones' },
    { img: 'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/candid%20shoot/Img13.jpg', color: 'from-stone-600 to-stone-800', title: 'Urban Edge' },
    { img: 'https://bitbucket.org/maestrofilms/filmmaestro/raw/4352d232517887dfe8153d0061ab218247e18648/src/assets/banner/DSC09946-Enhanced-NR_2.jpg', color: 'from-rose-400 to-rose-600', title: 'Soft Light' },
  ];

  const productions = [
    {
      video: 'https://cdn.shopify.com/videos/c/vp/e68802ff07de49bc8530817c9024559f/e68802ff07de49bc8530817c9024559f.HD-720p-4.5Mbps-65541684.mp4',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      color: 'from-[#5a6b7d] to-[#7a8b9d]',
      label: 'Commercial'
    },
    {
      video: 'https://cdn.shopify.com/videos/c/vp/491124af4d484e99856115135ee6d8bc/491124af4d484e99856115135ee6d8bc.HD-720p-4.5Mbps-65541651.mp4',
      poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
      color: 'from-[#c4785a] to-[#b86c48]',
      label: 'Documentary'
    },
    {
      video: 'https://cdn.shopify.com/videos/c/vp/38bae7542a8c4b709f84710601cdb688/38bae7542a8c4b709f84710601cdb688.HD-720p-4.5Mbps-60882849.mp4',
      poster: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
      color: 'from-[#3a2f2a] to-[#5a4a40]',
      label: 'Editorial'
    },
    {
      video: 'https://cdn.shopify.com/videos/c/vp/37bc52c41fc34c3fb54b0b340f4586f1/37bc52c41fc34c3fb54b0b340f4586f1.HD-720p-4.5Mbps-60882845.mp4',
      poster: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
      color: 'from-[#6a5acd] to-[#483d8b]',
      label: 'Fashion Film'
    },
    {
      video: 'https://cdn.shopify.com/videos/c/vp/c5510158662d4ffb8668edf38daf7eb0/c5510158662d4ffb8668edf38daf7eb0.HD-720p-4.5Mbps-65541694.mp4',
      poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
      color: 'from-[#2f4f4f] to-[#1a2f2f]',
      label: 'Brand Story'
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
    const interval = setInterval(() => { goToNext(); }, 6000);
    return () => clearInterval(interval);
  }, [slides.length,isTransitioning]);

  useEffect(() => {
    if (modalVideo && modalRef.current) {
      modalRef.current.play();
    }
  }, [modalVideo]);

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

  const openModal = (videoUrl: string) => {
    setModalVideo(videoUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalVideo(null);
    document.body.style.overflow = 'auto';
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
        .carousel-progress {
          animation: progress 6s linear forwards;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .editorial-swiper .swiper-pagination-bullet,
        .productions-swiper .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .editorial-swiper .swiper-pagination-bullet-active,
        .productions-swiper .swiper-pagination-bullet-active {
          background: #2a2a2a;
          opacity: 1;
          transform: scale(1.2);
        }
        .editorial-swiper .swiper-button-next,
        .editorial-swiper .swiper-button-prev,
        .productions-swiper .swiper-button-next,
        .productions-swiper .swiper-button-prev {
          color: #2a2a2a;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .editorial-swiper .swiper-button-next:hover,
        .editorial-swiper .swiper-button-prev:hover,
        .productions-swiper .swiper-button-next:hover,
        .productions-swiper .swiper-button-prev:hover {
          background: #2a2a2a;
          color: white;
          transform: scale(1.1);
        }
        .editorial-swiper .swiper-button-next::after,
        .editorial-swiper .swiper-button-prev::after,
        .productions-swiper .swiper-button-next::after,
        .productions-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>

      {/* ============ VIDEO MODAL ============ */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <div
            className="w-full max-w-6xl aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalRef}
              src={modalVideo}
              className="w-full h-full object-contain rounded-sm"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}

      {/* ============ HERO CAROUSEL ============ */}
      <section className="relative w-full h-screen overflow-hidden bg-[#2a2420]">
        <div className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-[#f5f1ed]/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent'}`}>
          <div className={`text-sm md:text-base font-body font-light tracking-[0.25em] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2a2a2a]' : 'text-white'}`}>
            Maestro Films
          </div>
          <button className="w-7 h-5 flex flex-col justify-between cursor-pointer z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`w-full h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-[#2a2a2a]' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-[#2a2a2a]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-full h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-[#2a2a2a]' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </button>
        </div>

        <div className={`fixed inset-0 bg-[#1a1410] z-40 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <nav className="text-center space-y-6">
            {['Portfolio', 'About', 'Productions', 'Contact'].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-3xl md:text-5xl font-body font-light text-white hover:text-[#c4a882] transition-colors duration-300 tracking-wide">
                {item}
              </a>
            ))}
          </nav>
        </div>

        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'}`}>
            <div className="absolute left-0 top-0 w-full md:w-1/2 h-full hidden md:block overflow-hidden">
              <img src={slide.left} alt="Maestro Films" className="w-full h-full object-cover hero-image-anim" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full overflow-hidden">
              <img src={slide.right} alt="Maestro Films" className="w-full h-full object-cover hero-image-anim" style={{ animationDelay: '0.15s' }} />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-black/20 via-transparent to-black/30">
              <div className={`text-center text-white px-4 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <h1 className="font-script text-6xl md:text-8xl mb-0 leading-none drop-shadow-2xl animate-float">{slide.title}</h1>
                <p className="font-body font-bold text-2xl md:text-4xl tracking-[0.15em] mb-3 drop-shadow-lg uppercase">{slide.subtitle}</p>
                <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase drop-shadow-md opacity-90 font-body">{slide.tagline}</p>
              </div>
            </div>
          </div>
        ))}

        <button onClick={goToPrev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group shadow-lg">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button onClick={goToNext} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group shadow-lg">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="flex gap-2.5">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}>
                {index === currentSlide && <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />}
              </button>
            ))}
          </div>
          <div className="w-20 md:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div key={currentSlide} className="h-full bg-white/70 rounded-full carousel-progress" />
          </div>
        </div>

        <div className="absolute bottom-1/2 left-5 md:left-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/20 text-white text-[11px] font-body font-light tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
          <a href='/about' >portfolio</a></button>
        </div>
        <div className="absolute bottom-1/2 right-5 md:right-8 z-20 transform translate-y-1/2 hidden md:block">
          <button className="px-6 py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/20 text-white text-[11px] font-body font-light tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:tracking-[0.25em]">
            <a href='#contact' >contact us</a></button>
        </div>

        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3 md:hidden z-20 px-6">
          <button className="flex-1 py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] font-body font-light tracking-wider uppercase border border-white/20">portfolio</button>
          <button className="flex-1 py-2.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-[10px] font-body font-light tracking-wider uppercase border border-white/20">contact us</button>
        </div>
      </section>

      {/* ============ RECENT EDITORIALS - SWIPER ============ */}
      <section id="editorials" className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 reveal">
            <div>
              <p className="text-[10px] md:text-xs font-body font-medium text-gray-500 tracking-[0.25em] uppercase mb-2">A Curated Glimpse Into Our</p>
              <h2 className="font-body text-3xl md:text-5xl font-light text-[#2a2a2a] leading-tight">Recent <span className="font-normal">Editorials</span></h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="swiper-custom-prev-editorial w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300 cursor-pointer shadow-sm">
                <ChevronLeft size={16} />
              </div>
              <div className="swiper-custom-next-editorial w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300 cursor-pointer shadow-sm">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

          <div className="reveal">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: '.swiper-custom-prev-editorial', nextEl: '.swiper-custom-next-editorial' }}
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
              className="editorial-swiper !pb-12"
            >
              {editorials.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="group relative h-[400px] md:h-[520px] rounded-sm overflow-hidden cursor-pointer shadow-lg hover-lift">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-106" />
                    <div className={`absolute inset-0 bg-gradient-to-t   opacity-20 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-body font-light mb-1">Editorial</p>
                      <h3 className="text-white text-xl font-body font-light">{item.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ============ LATEST STORIES ============ */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f1ed]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="reveal">
              <p className="text-[10px] md:text-xs font-body font-medium text-gray-500 tracking-[0.25em] uppercase mb-3">A Curated Glimpse Into Our</p>
              <h2 className="font-body text-2xl md:text-4xl font-light text-[#2a2a2a] leading-tight mb-4">Latest <span className="font-semibold">stories</span> & <span className="font-semibold">collaboration</span></h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-body font-light max-w-lg">
                Each editorial begins as a whisper—an idea, a glance, a mood waiting to be revealed. Through our images, we chase the fleeting, the honest, and the elegantly imperfect.
              </p>
              <button className="mt-6 px-6 py-2.5 border border-gray-400 text-gray-700 font-body font-light text-[11px] tracking-[0.15em] uppercase hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300 shadow-sm hover:shadow-md">learn more</button>
            </div>
            <div className="hidden md:flex justify-end reveal">
              <div className="w-28 h-28 border border-[#8b7355]/30 rounded-full flex items-center justify-center animate-float">
                <div className="w-20 h-20 border border-[#8b7355]/50 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#8b7355] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RECENT PRODUCTIONS - VIDEO SWIPER ============ */}
      <section id="productions" className="py-10 md:py-14 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 reveal">
            <div>
              <p className="text-[10px] md:text-xs font-body font-medium text-gray-500 tracking-[0.25em] uppercase mb-2">Cinematic Showcase</p>
              <h2 className="font-body text-3xl md:text-5xl font-light mb-3 text-[#2a2a2a]">Latest <span className="font-semibold">films & productions</span></h2>
              <p className="text-xs md:text-sm text-gray-600 max-w-xl leading-relaxed font-body font-light">
                Every frame tells a story. From commercial campaigns to documentary films, our productions capture the essence of emotion and authenticity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="swiper-custom-prev-prod w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300 cursor-pointer shadow-sm">
                <ChevronLeft size={16} />
              </div>
              <div className="swiper-custom-next-prod w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white hover:border-[#2a2a2a] transition-all duration-300 cursor-pointer shadow-sm">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

          <div className="reveal">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: '.swiper-custom-prev-prod', nextEl: '.swiper-custom-next-prod' }}
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
              className="productions-swiper !pb-12"
            >
              {productions.map((item, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="group relative h-[400px] md:h-[520px] rounded-md overflow-hidden cursor-pointer shadow-lg hover-lift"
                    onClick={() => openModal(item.video)}
                  >
                    <div className="relative w-full aspect-[9/16] overflow-hidden rounded-md">
                      <video
                        src={item.video}
                        poster={item.poster}
                        className="absolute inset-0 w-full h-full p-1 object-cover"
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-10 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none">
                      <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-body font-light mb-1">Production</p>
                      <h3 className="text-white text-lg md:text-xl font-body font-light">{item.label}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

        {/* ============ ABOUT US ============ */}
       {/* ============ ABOUT US ============ */}
<section id="about" className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f1ed]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
      {/* Text Content */}
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
            aestro Films is an independent film production house focused on
            commercial and editorial work.
          </p>
          <p className="text-gray-600 leading-relaxed font-body font-light text-sm md:text-[15px]">
            We collaborate with brands, stylists, and visionaries to craft visual
            narratives that are emotionally driven and timeless.
          </p>
        </div>
      </div>

      {/* Collage Image Grid */}
      <div className="reveal">
        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
          {/* Top full-width image */}
          <div className="col-span-2 relative h-40 md:h-60 overflow-hidden rounded-sm shadow-md hover-lift group">
            <img
              src="https://6a8930a197833836f65581d4.imgix.net/sandbox/onepic.jpeg"
              alt="Production"
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Bottom left */}
          <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
            <img
              src="https://6a8930a197833836f65581d4.imgix.net/sandbox/twpic.jpeg"
              alt="Production"
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Bottom right */}
          <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
            <img
              src="https://6a8930a197833836f65581d4.imgix.net/sandbox/thrpic.jpeg"
              alt="Production"
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

 
    
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-10 md:py-14 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-stretch">
            <div className="relative reveal order-2 md:order-1">
              <div className="relative h-72 md:h-full min-h-[420px] rounded-sm overflow-hidden shadow-2xl group">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop" alt="Contact" className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-106" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                  <h2 className="font-body text-3xl md:text-5xl font-light text-white leading-none mb-1">Let's</h2>
                  <h2 className="font-body text-4xl md:text-7xl font-bold text-white tracking-tight">TALK</h2>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex items-center reveal">
              <form onSubmit={handleFormSubmit} className="w-full space-y-6 md:space-y-8">
                <div>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} placeholder="full name" required className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="email" required className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="phone" className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 font-body font-light text-sm tracking-wide" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="message" rows={3} required className="w-full bg-transparent border-b border-gray-400 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-300 resize-none font-body font-light text-sm tracking-wide" />
                <button type="submit" className="mt-2 px-8 py-3 bg-[#2a2a2a] text-white font-body font-medium hover:bg-[#1a1a1a] transition-all duration-300 rounded-sm text-xs tracking-wider uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
