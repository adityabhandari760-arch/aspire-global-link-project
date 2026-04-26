import Link from "next/link";
import { Blog } from "@/types";
import { BlogCard } from "@/components/blog/blog-card";
import { ArrowUpRight } from "lucide-react";

interface TrendingPostsProps {
  posts: Blog[];
}

export function TrendingPosts({ posts }: TrendingPostsProps) {
  if (!posts?.length) return null;

  return (
    <div className="p-2 mb-12">
      <div className="flex items-center justify-between mb-8 pb-4">
        <h3 className="font-bold text-xl md:text-2xl text-foreground/90 flex items-center gap-3">
          Trending
        </h3>
        <Link href="/blog?filter=trending" className="group text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          View All <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
      <div className="flex flex-col gap-6 w-full relative">
        <div className="absolute top-0 bottom-0 left-6 w-px bg-muted/50 hidden md:block z-0" />
        {posts.map((post) => (
          <div key={post.id} className="relative z-10 bg-background md:bg-transparent">
            <BlogCard blog={post} compact />
          </div>
        ))}
      </div>
    </div>
  );
}
