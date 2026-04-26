import { blogs } from "@/lib/data";
import { BlogCard } from "@/components/blog/blog-card";
import { MagazineSlider } from "@/components/widgets/magazine-slider";
import { LatestNewsSlider } from "@/components/widgets/latest-news-slider";

export default async function Home() {
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Magazines
  const magazines = sortedBlogs.filter(b => b.type === 'magazine').slice(0, 10);

  // Top 10 Latest News
  const latestNews = sortedBlogs.filter(b => b.type === 'news').slice(0, 10);
  
  // Top 10 Latest Blogs
  const latestBlogs = sortedBlogs.filter(b => b.type === 'blog' || !b.type).slice(0, 10);

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      {/* 1. Magazine Cover Slider (Top Section) */}
      <MagazineSlider magazines={magazines} />

      {/* 2. Top 10 Latest News */}
      <LatestNewsSlider news={latestNews} title="Latest News" link="/news" />
      
      {/* 3. Top 10 Latest Blogs */}
      <LatestNewsSlider news={latestBlogs} title="Latest Blogs" link="/blog" />
    </div>
  );
}
