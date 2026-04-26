import { NextResponse } from "next/server";
import { blogs } from "@/lib/data";

export const dynamic = 'force-dynamic';

export async function GET() {
  const trendingBlogs = blogs.filter((blog) => blog.trending);
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json(trendingBlogs);
}
