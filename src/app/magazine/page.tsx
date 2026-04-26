import { blogs } from "@/lib/data";
import { MagazineList } from "@/components/blog/magazine-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magazine | Aspire Globallink",
  description: "Browse our latest digital magazines and publications.",
};

export default function MagazinePage() {
  const initialMagazines = [...blogs]
    .filter(b => b.type === 'magazine')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-muted/30 pb-20 min-h-screen">
      <div className="bg-background border-b pt-12 pb-16 px-4 mb-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Our <span className="text-primary">Magazine</span> Collection
          </h1>
          <p className="text-lg text-muted-foreground md:px-20">
            Dive into our premium, deep-dive publications featuring industry insights and trends.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MagazineList initialMagazines={initialMagazines} />
      </div>
    </div>
  );
}
