"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { BlogCard } from "./blog-card";
import { Blog, Category } from "@/types";
import { useDebounce } from "@/lib/hooks"; // We'll create this

interface BlogListProps {
  initialBlogs: Blog[];
  categories: Category[];
  type?: 'blog' | 'news';
}

export function BlogList({ initialBlogs, categories, type }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const [blogs, setBlogs] = React.useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFilteredBlogs = async () => {
      setLoading(true);
      try {
        const url = new URL("/api/blogs", window.location.origin);
        if (type) url.searchParams.set("type", type);
        if (activeCategory !== "all") url.searchParams.set("category", activeCategory);
        if (debouncedSearch) url.searchParams.set("search", debouncedSearch);

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Failed to filter blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredBlogs();

    // Update URL without reload
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (debouncedSearch) params.set("search", debouncedSearch);

    const basePath = type === 'news' ? '/news' : '/blog';
    const newUrl = params.toString() ? `${basePath}?${params.toString()}` : basePath;
    router.replace(newUrl, { scroll: false });

  }, [debouncedSearch, activeCategory, router, type]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            All Posts
          </button>
          {categories.map((cat, index) => (
            <button
              key={cat?.id || `cat-${index}`}
              onClick={() => setActiveCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border-transparent focus:bg-background focus:border-primary rounded-full text-sm transition-colors outline-none ring-1 ring-transparent focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="bg-muted aspect-video rounded-lg w-full"></div>
                <div className="bg-muted h-6 w-3/4 rounded"></div>
                <div className="bg-muted h-4 w-full rounded"></div>
                <div className="bg-muted h-4 w-5/6 rounded"></div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog?.id || `blog-${index}`} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
