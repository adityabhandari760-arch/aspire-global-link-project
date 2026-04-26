'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/types';
import { ChevronRight, Calendar } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface Props {
  news: Blog[];
  title?: string;
  link?: string;
}

export function LatestNewsSlider({ news, title = "Editor's Picks", link = "/blog" }: Props) {
  if (!news || news.length === 0) return null;

  return (
    <section className="py-12 bg-background border-y border-border/50 shadow-sm">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold font-serif">{title}</h2>
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <Link href={link} className="text-sm font-medium text-primary flex items-center hover:underline">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          freeMode={true}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 30 },
            1280: { slidesPerView: 4.2, spaceBetween: 30 }
          }}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          modules={[Navigation, Autoplay, FreeMode]}
          className="w-full relative px-2 py-4"
        >
          {news.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <Link href={`/blog/${item.slug}`} className="flex flex-col h-full group">
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-4 shadow-sm border border-border/50">
                  <Image
                    src={item.coverImage || item.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-background/80 backdrop-blur text-foreground text-xs font-semibold px-2 py-1 rounded-sm shadow-sm ring-1 ring-border">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center text-xs text-muted-foreground mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
