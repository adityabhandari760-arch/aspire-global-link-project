"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Eye } from "lucide-react";
import { Blog } from "@/types";
import { useCustomTheme } from "@/components/layout/theme-config-provider";

interface BlogCardProps {
  blog: Blog;
  compact?: boolean;
}

export function BlogCard({ blog, compact = false }: BlogCardProps) {
  const { getClasses, getStyles } = useCustomTheme();

  if (!blog) return null;

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (compact) {
    return (
      <Link href={`/blog/${blog.slug}`} className="group flex gap-5 items-center p-3 rounded-2xl hover:bg-muted/40 transition-all duration-300">
        <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted/50">
          <Image
            src={blog.coverImage || blog.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-wider font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500 mb-1.5">{blog.category}</span>
          <h4 className="font-semibold text-sm md:text-base line-clamp-2 text-foreground/90 group-hover:text-primary transition-colors leading-snug">
            {blog.title}
          </h4>
          <span className="text-xs text-muted-foreground mt-2 flex items-center gap-3 opacity-80">
            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> {blog.views || 0}</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div 
      className={`group flex flex-col h-full overflow-hidden rounded-[1.5rem] bg-card hover:bg-muted/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:-translate-y-1 border border-transparent hover:border-border/40 ${getClasses('card')}`}
      style={getStyles('card')}
    >
      <Link href={`/blog/${blog.slug}`} className="relative aspect-[1.8/1] w-full overflow-hidden bg-muted/30">
        <Image
          src={blog.coverImage || blog.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-border/20">
          {blog.category}
        </div>
      </Link>
      <div className="flex flex-col flex-grow pt-6 pb-8 px-6 sm:px-8">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors mb-4 leading-[1.3] text-foreground/95">
            {blog.title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-[15px] sm:text-base text-muted-foreground/90 mb-8 flex-grow leading-relaxed">
          {blog.excerpt}
        </p>
        {/* <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted">
              <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground/90">{blog.author.name}</span>
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{formattedDate}</span>
            </div>
          </div>
        </div> */}
        <div className="flex items-center text-xs text-muted-foreground font-medium opacity-80">
          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {formattedDate}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> {blog.views || 0}</span>
        </div>
      </div>
    </div>
  );
}
