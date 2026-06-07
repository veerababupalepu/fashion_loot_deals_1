"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchBar } from "@/components/ui/SearchBar";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/amazon-finds", label: "Amazon Finds" },
  { href: "/womens-fashion", label: "Fashion" },
  { href: "/home-decor", label: "Home Decor" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white hidden sm:block">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <Link
              href="/favorites"
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:flex"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:flex"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 lg:hidden">
            <SearchBar size="sm" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 border-t border-neutral-100 dark:border-neutral-800" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-rose-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/favorites"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-rose-600"
          >
            Favorites
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-rose-600"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
