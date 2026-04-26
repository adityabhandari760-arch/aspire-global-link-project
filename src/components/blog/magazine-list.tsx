"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types";
import { Eye } from "lucide-react";

interface MagazineListProps {
  initialMagazines: Blog[];
}

export function MagazineList({ initialMagazines }: MagazineListProps) {
  const [activeYear, setActiveYear] = React.useState<string>("all");

  // Last 7 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, i) => (currentYear - i).toString());

  const filteredMagazines = React.useMemo(() => {
    if (activeYear === "all") return initialMagazines;
    return initialMagazines.filter(mag => new Date(mag.date).getFullYear().toString() === activeYear);
  }, [initialMagazines, activeYear]);

  return (
    <div className="space-y-8">
      {/* Year Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
          <button
            onClick={() => setActiveYear("all")}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeYear === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeYear === year
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Magazine Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredMagazines.length > 0 ? (
          filteredMagazines.map((mag) => {
            const magYear = new Date(mag.date).getFullYear().toString();
            return (
              <Link href={`/blog/${mag.slug}`} key={mag.id} className="group flex flex-col gap-3">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md shadow-md border border-border/50 group-hover:shadow-xl transition-all duration-300">
                  <Image src={mag.coverImage || mag.postImage || "https://images.unsplash.com/photo-1542435503-91dce9c4e9c8?q=80&w=600&auto=format&fit=crop"} alt={mag.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {mag.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 font-medium">
                    <span>{magYear}</span>
                    <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> {mag.views || 0}</span>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-semibold mb-2">No magazines found</h3>
            <p className="text-muted-foreground">Try selecting a different year.</p>
          </div>
        )}
      </div>
    </div>
  );
}
