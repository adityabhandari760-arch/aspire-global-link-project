'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function MagazineSlider({ magazines }: { magazines: Blog[] }) {
  if (!magazines || magazines.length === 0) return null;

  return (
    <div className="w-full py-12 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tabular-nums text-foreground mb-4">Latest Editions</h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Explore our curated top magazines securely published directly to our platform.
          </p>
        </div>

        <div className="w-full h-[500px] overflow-hidden relative">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1536: { slidesPerView: 5.5 },
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper w-full max-w-[1400px] pb-14 pt-10"
          >
            {magazines.map((mag) => (
              <SwiperSlide key={mag.id} className="max-w-[260px] h-auto group">
                <Link href={`/blog/${mag.slug}`} className="block w-full h-full flex flex-col items-center outline-none">
                  <div className="relative w-full aspect-[1/1.4] rounded-r-xl rounded-l-md overflow-hidden bg-muted shadow-[10px_10px_20px_rgba(0,0,0,0.15)] dark:shadow-[10px_10px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[15px_15px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300">
                    {/* Spine Effect */}
                    <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute top-0 bottom-0 left-[1px] w-[2px] bg-white/20 z-20 pointer-events-none"></div>
                    
                    {/* Page Edges underneath the right side to simulate thickness */}
                    <div className="absolute top-[2px] bottom-[2px] right-0 w-1 bg-gradient-to-l from-gray-300 dark:from-gray-700 to-transparent z-20 pointer-events-none rounded-r-xl"></div>

                    <Image
                      src={mag.coverImage || mag.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"}
                      alt={mag.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                      priority
                    />
                  </div>
                  
                  <div className="mt-5 text-center px-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/80 mb-2 block">
                      {mag.category}
                    </span>
                    <h3 className="font-serif text-sm md:text-base font-bold leading-snug text-foreground/90 group-hover:text-primary transition-colors line-clamp-2">
                      {mag.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
