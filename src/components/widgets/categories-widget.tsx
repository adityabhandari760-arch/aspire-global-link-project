import Link from "next/link";
import { Category } from "@/types";

interface CategoriesWidgetProps {
  categories: Category[];
  tags: string[];
}

export function CategoriesWidget({ categories, tags }: CategoriesWidgetProps) {
  return (
    <div className="flex flex-col gap-10 p-2">
      <div>
        <h3 className="font-bold text-xl md:text-2xl text-foreground/90 mb-6">Explore Topics</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/blog?category=${category.slug}`}
                className="flex items-center justify-between group py-2.5 px-4 rounded-xl hover:bg-muted/40 transition-all duration-300"
              >
                <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {category.name}
                </span>
                <span className="bg-muted text-muted-foreground text-xs py-1 px-2.5 rounded-full font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-xl md:text-2xl text-foreground/90 mb-6">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?search=${tag.toLowerCase()}`}
              className="inline-flex items-center rounded-full bg-muted/40 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground hover:-translate-y-0.5"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
