import { NextResponse } from "next/server";
import { blogs } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const p = await params;
  const blog = blogs.find((b) => b.slug === p.slug);

  if (!blog) {
    return new NextResponse("Blog not found", { status: 404 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json(blog);
}
