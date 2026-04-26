import { Blog, Category } from "@/types";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Browser should use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`; // Local default
};

export async function getBlogs(category?: string, search?: string): Promise<Blog[]> {
  const url = new URL(`${getBaseUrl()}/api/blogs`);
  if (category && category !== "all") url.searchParams.set("category", category);
  if (search) url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`${getBaseUrl()}/api/blogs/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch blog");
  }
  return res.json();
}

export async function getTrendingBlogs(): Promise<Blog[]> {
  const res = await fetch(`${getBaseUrl()}/api/trending`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch trending blogs");
  return res.json();
}

export async function getCategoriesAndTags(): Promise<{ categories: Category[], popularTags: string[] }> {
  const res = await fetch(`${getBaseUrl()}/api/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
