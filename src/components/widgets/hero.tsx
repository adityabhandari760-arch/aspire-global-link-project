"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Blog } from "@/types";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  featuredBlog?: Blog;
}

export function Hero({ featuredBlog }: HeroProps) {
  if (!featuredBlog) return null;

  return (
    <section className="relative w-full rounded-[2rem] bg-card overflow-hidden py-16 md:py-24 lg:py-32 xl:py-40 mb-16 lg:mb-24 isolate group flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full xl:w-1/2 xl:right-0 xl:-mr-12 -z-10 ml-auto">
        <Image
          src={featuredBlog.coverImage || featuredBlog.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"}
          alt={featuredBlog.title}
          fill
          className="object-cover opacity-20 xl:opacity-100 xl:-translate-x-12 opacity-mask-xl transition-transform duration-1000 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent z-10 hidden xl:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 xl:hidden" />
      </div>
      
      <div className="w-full relative z-10 px-6 sm:px-10 lg:px-16 container mx-auto">
        <div className="flex flex-col items-start gap-6 max-w-2xl xl:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="inline-block rounded-full bg-muted/80 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
                Featured • {featuredBlog.category}
              </span>
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-2"
          >
            {featuredBlog.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-relaxed max-w-xl"
          >
            {featuredBlog.excerpt}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="mt-6 flex items-center gap-4"
          >
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-primary px-8 text-sm md:text-base font-bold text-primary-foreground transition-all hover:bg-primary/95 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
