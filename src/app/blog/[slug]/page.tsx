import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/lib/data";
import { Calendar, ChevronLeft, User, Eye } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { PdfFlipbookWrapper } from "@/components/widgets/pdf-flipbook-wrapper";
import { ViewTracker } from "@/components/widgets/view-tracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const p = await props.params;
  const blog = blogs.find(b => b.slug === p.slug);

  if (!blog) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Aspire Globallink`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || blog.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || blog.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"],
    },
  };
}

// Generate static params to statically build all blogs
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetail(props: Props) {
  const p = await props.params;
  const blog = blogs.find(b => b.slug === p.slug);

  if (!blog) {
    notFound();
  }

  // Fetch related content based on type
  const blogType = blog.type || 'blog';
  const allRelated = blogs.filter(b => {
    const bType = b.type || 'blog';
    if (blogType === 'magazine') return bType === 'magazine';
    return bType === blogType && b.category.toLowerCase() === blog.category.toLowerCase();
  });
  const relatedBlogs = allRelated.filter(b => b.id !== blog.id).slice(0, 3);

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-background pb-20">
      <ViewTracker id={blog.id} />
      {/* Hero Header */}
      <header className="relative w-full h-[50vh] min-h-[400px] bg-background">
        {/* <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 max-w-4xl">
            <Link
              href={blogType === 'magazine' ? '/magazine' : blogType === 'news' ? '/news' : '/blog'}
              className="inline-flex items-center text-primary hover:underline mb-6 font-medium"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to {blogType === 'magazine' ? 'magazines' : blogType === 'news' ? 'news' : 'blogs'}
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border border-primary/20">
                {blog.category}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <Eye className="h-4 w-4" />
                <span>{blog.views || 0}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {blog.title}
            </h1>

            {/* <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Written by</span>
                <span className="font-semibold">{blog.author.name}</span>
              </div>
            </div> */}
          </div>
        </div>
      </header>
      {blog.pdfUrl ? (
        <div className="mt-16 w-full flex flex-col items-center border-t pt-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Interactive Magazine View</h2>
          <div className="w-full overflow-hidden flex justify-center bg-muted/20 p-4 rounded-xl border border-border">
            <PdfFlipbookWrapper fileUrl={blog.pdfUrl} />
          </div>
        </div>
      ) : (
        <div className="mt-12 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-md border border-border/50 relative aspect-video">
          <Image
            src={blog.postImage ?? ""}
            alt="Main Post Image"
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      )}
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 max-w-4xl">
        <div
          className="prose prose-lg dark:prose-invert prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />





        <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
          <span className="font-semibold mr-2 flex items-center">Tags:</span>
          {blog.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog?search=${tag.toLowerCase()}`}
              className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground text-sm rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
            {blogType === 'magazine' ? 'Related Magazines' : blogType === 'news' ? 'Related News' : 'Related Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map(related => {
              if (blogType === 'magazine') {
                const magYear = new Date(related.date).getFullYear().toString();
                return (
                  <Link href={`/blog/${related.slug}`} key={related.id} className="group flex flex-col gap-3">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md shadow-md border border-border/50 group-hover:shadow-xl transition-all duration-300">
                      <Image src={related.coverImage || related.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">{magYear}</p>
                    </div>
                  </Link>
                );
              }
              return <BlogCard key={related.id} blog={related} />
            })}
          </div>
        </section>
      )}
    </article>
  );
}
