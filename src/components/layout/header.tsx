"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCustomTheme } from "@/components/layout/theme-config-provider";

export function Header() {
  const { getClasses, getStyles } = useCustomTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "border-b bg-background/80 backdrop-blur-md shadow-sm"
        : "bg-background"
        } ${getClasses('header')}`}
      style={getStyles('header')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/aspire-globallink-logo.svg" 
                alt="Aspire Globallink Logo"
                width={240}
                height={48}
                className="h-12 w-auto dark:invert-[0.1]"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/magazine"
                className="transition-colors hover:text-primary text-foreground/80"
              >
                Magazine
              </Link>
              <Link
                href="/news"
                className="transition-colors hover:text-primary text-foreground/80"
              >
                News
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-primary text-foreground/80"
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-primary text-foreground/80"
              >
                About
              </Link>


            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link
                href="/magazine"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                Magazine
              </Link>
              <Link
                href="/news"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                News
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                Blogs
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
