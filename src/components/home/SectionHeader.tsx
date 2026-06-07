import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export function SectionHeader({ title, subtitle, href, linkText = "View All" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6 px-4 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
        >
          {linkText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
