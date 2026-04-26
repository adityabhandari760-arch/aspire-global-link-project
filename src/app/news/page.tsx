import { blogs, categories } from "@/lib/data";
import { BlogList } from "@/components/blog/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News | Aspire Globallink",
  description: "Browse our latest news updates.",
};

export default async function NewsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

  let initialBlogs = [...blogs]
    .filter(b => b.type === 'news')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (category && category !== "all") {
    initialBlogs = initialBlogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const searchLower = search.toLowerCase();
    initialBlogs = initialBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return (
    <div className="bg-muted/30 pb-20">
      <div className="bg-background border-b pt-12 pb-16 px-4 mb-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Latest <span className="text-primary">News</span>
          </h1>
          <p className="text-lg text-muted-foreground md:px-20">
            Stay updated with the most recent developments and announcements.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList initialBlogs={initialBlogs} categories={categories} type="news" />
      </div>
    </div>
  );
}
