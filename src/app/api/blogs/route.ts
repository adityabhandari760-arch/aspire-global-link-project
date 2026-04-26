import { NextResponse } from "next/server";
import { blogs } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const typeStr = searchParams.get("type"); // e.g., "blog", "news", "magazine"
  
  let filteredBlogs = [...blogs];

  if (typeStr) {
    if (typeStr === 'blog') {
      filteredBlogs = filteredBlogs.filter(b => b.type === 'blog' || !b.type);
    } else {
      filteredBlogs = filteredBlogs.filter(b => b.type === typeStr);
    }
  }

  if (category && category !== "all") {
    filteredBlogs = filteredBlogs.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort by date descending (newest first)
  filteredBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(filteredBlogs);
}
