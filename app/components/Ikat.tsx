'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-80 md:opacity-0 md:group-hover:opacity-80 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <p className="block scale-[0.9] bg-[#c9a86c]  rounded-sm text-#8a7a5c p-1 border leading-none tracking-tight text-sm w-max">
        Maestro Films
      </p>
    </div>
  );
}

export default function EditorialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editorialItems = useMemo(
    () => [
      {
        img: 'https://ik.imagekit.io/maestrofilms/Copy%20of%209%20copy.jpg?updatedAt=1788075353055&ik-s=7fdbab837cc3e8ac00d5e8d92738b56e6ea79fbd',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Shadow Play',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/Copy%20of%2019.jpg?updatedAt=1788075350100&ik-s=b85a972771eddb158663211697f33750416081ee',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Golden Hour',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/Img11.jpg?updatedAt=null&ik-s=d52d27f75a50a2639217c14ca96a734b28135758',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Warm Tones',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/Img13.jpg?updatedAt=null&ik-s=f5bfa7966d98e5afaa541033540911076dc58217',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Urban Edge',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/MF_08305.jpg?updatedAt=1788075346400&ik-s=1bb90076870539d1f89d2b132df30f2aea0f5516',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Soft Light',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08663.jpg?updatedAt=1788075353076&ik-s=91f300d463c2f86b0a849a8183d871dd89eea2fe',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Warm Tones',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/MF_08942.jpg?updatedAt=1788072997752&ik-s=073b8f8911744a355fafd7ff35c4b7af71bc830d',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Urban Edge',
      },
      {
        img: 'https://ik.imagekit.io/maestrofilms/DSC09946-Enhanced-NR_2.jpg?updatedAt=null&ik-s=398c8c6fb5a2bc541b3b50d4fe8b99666238a825',
        color: 'from-[#c9a86c] to-[#a68b6a]',
        title: 'Soft Light',
      },
    ],
    []
  );

  return (
    <section id="editorials" className="py-5 md:py-10 px-4 md:px-6 bg-[#f5f1ed] ">
      <div className="max-w-7xl mx-auto" >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 reveal">
          <div className="text-center text-gold " >
            <p className="text-[10px] md:text-sm font-body font-medium   mx-2 tracking-[0.25em] uppercase mb-2">
              A Curated Glimpse Into Our
            </p>
            <p className="text-[10px] md:text-xs font-body font-medium  mx-2 tracking-[0.25em]">
              Recent Collaborations |{' '}
              <span className="text-[10px] md:text-sm font-body font-script mx-2 tracking-[0.25em]">
                Studio Portrait Series
              </span>{' '}
              |{' '}
              <span className="text-[10px] md:text-xs font-body font-medium  mx-2 tracking-[0.25em]">
                Ikat Collection
              </span>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-end gap-3 w-full md:w-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-9 h-9 rounded-full border border-[#c9a86c] flex items-center  justify-center hover:bg-white hover:border-[#c9a86c] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} className='text-[#c9a86c]' />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-9 h-9 rounded-full border border-[#c9a86c]  flex items-center justify-center hover:bg-white  hover:border-[#c9a86c] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight size={16} className='text-[#c9a86c]' />
            </button>
          </div>
        </div>

        {/* Swiper - only render after client mount */}
        <div className="reveal min-h-[400px] md:min-h-[520px]">
          {mounted ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              speed={900}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} !size-2 !rounded-full !bg-[#c9a86c]/40 !opacity-100 transition-all duration-300 hover:!bg-[#c9a86c]/70 [&.swiper-pagination-bullet-active]:!bg-gradient-to-r [&.swiper-pagination-bullet-active]:from-[#e0c48a] [&.swiper-pagination-bullet-active]:to-[#a68b6a] [&.swiper-pagination-bullet-active]:scale-125"></span>`,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="editorial-swiper !pb-12"
            >
              {editorialItems.map((item, i) => (
                <SwiperSlide key={item.title + i}>
                  <div className="group relative h-[400px] md:h-[520px] rounded-sm overflow-hidden cursor-pointer shadow-lg hover-lift">
                    <img
                      src={item.img}
                      alt={`Editorial: ${item.title}`}
                      className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t opacity-20 group-hover:opacity-10 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <CornerMark />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-body font-semibold mb-1">
                        Editorial
                      </p>
                      <h3 className="text-gold text-lg  font-body font-bold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Simple placeholder while mounting (prevents layout shift)
            <div className="h-[400px] md:h-[520px] bg-neutral-200/50 rounded-sm animate-pulse" />
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-[#f5f1ed] mt-10 md:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <div className="reveal">
            <h2 className="font-body text-2xl md:text-4xl font-light text-gold leading-tight mb-4">
              Latest <span className="font-semibold">stories</span> &{' '}
              <span className="font-semibold">collaboration</span>
            </h2>
            <p className="text-lg md:text-lg text-gold leading-relaxed font-body font-light max-w-lg mb-5">
              Each editorial begins as a whisper—an idea, a glance, a mood waiting to
              be revealed. Through our images, we chase the fleeting, the honest, and
              the elegantly imperfect.
            </p>
            <Link href="#reels" className="px-6 py-2.5 border border-[#c9a86c] text-gold font-body font-light text-[11px] hover:scale-1.0 tracking-[0.15em] uppercase hover:bg-[#c9a86c] hover:text-[#c9a86c] hover:border-[#c9a86c] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl hover:shadow-xl">
              learn more
            </Link>
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
  );
}