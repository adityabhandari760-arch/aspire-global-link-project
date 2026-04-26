import Link from "next/link";
import Image from "next/image";
import { Globe, Users, Award, Handshake, Link as LinkIcon, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aspire Globallink",
  description: "Learn about Aspire GlobalLink and our mission to connect businesses and inspire growth.",
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <p className="text-primary font-semibold tracking-wider uppercase mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-foreground leading-tight">
            Every Success Story <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Begins With a Dream</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A vision, and the relentless pursuit of excellence. <strong>Aspire GlobalLink</strong> was born from the idea of celebrating these stories—unveiling the journeys of companies that have conquered challenges and leaders who have redefined possibilities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden ">
            <Image
              src="/aspire_about_section_hero.svg"
              alt="Aspire GlobalLink team collaborating"
              fill
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">More Than Just a Magazine</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Aspire GlobalLink is not just a magazine; it is a platform where inspiration meets opportunity. Through carefully curated stories of leading businesses and visionary entrepreneurs, we bring to light their achievements, challenges, and the lessons they’ve learned along the way.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These narratives are more than just tales—they are blueprints for aspiring businesses and individuals, guiding them to turn their dreams into reality.
              </p>
            </div>

            <div className="pt-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Beyond Storytelling</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                But Aspire GlobalLink doesn’t stop at storytelling. We are committed to action, connecting businesses with the right suppliers and service providers who exemplify quality and innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars / Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-card rounded-[1.5rem] p-8 md:p-10 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(255,255,255,0.02)] border border-transparent hover:border-border/50">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl mb-6 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <LinkIcon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Bridging Connections</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">Connecting businesses with quality suppliers and service providers.</p>
          </div>
          <div className="bg-card rounded-[1.5rem] p-8 md:p-10 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(255,255,255,0.02)] border border-transparent hover:border-border/50">
            <div className="bg-primary/10 text-primary p-4 rounded-2xl mb-6 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Empowering Growth</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">Helping businesses thrive in a competitive global marketplace.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { stat: "3+", label: "Success Stories", icon: Award },
              { stat: "50+", label: "Countries Reached", icon: Globe },
              { stat: "10K+", label: "Business Connections", icon: Users },
              { stat: "100%", label: "Commitment", icon: Handshake },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-card/50 rounded-3xl border border-border/50 backdrop-blur-sm transition-transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">{item.stat}</div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-16 text-center border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Join Our Journey</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              At Aspire GlobalLink, every page is a step closer to inspiration, collaboration, and success. Join us as we continue to shine a spotlight on excellence and pave the way for a brighter, more connected future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Get Featured
              </Link>
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-background border border-input px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
