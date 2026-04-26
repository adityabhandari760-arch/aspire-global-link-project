import { blogs, categories } from "@/lib/data";
import { BlogList } from "@/components/blog/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Aspire Globallink",
  description: "Browse our latest articles, guides, and updates.",
};

export default async function BlogPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

  // Only blogs
  let initialBlogs = [...blogs]
    .filter(b => b.type === 'blog' || !b.type)
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
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground md:px-20">
            Discover the latest trends, deep dives, and expert opinions on gaming, entertainment, and technology.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList initialBlogs={initialBlogs} categories={categories} type="blog" />
      </div>
    </div>
  );
}
