import { NextResponse } from "next/server";
import { categories, popularTags } from "@/lib/data";

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({
    categories,
    popularTags
  });
}
