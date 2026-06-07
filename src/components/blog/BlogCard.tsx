import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-5">
        <time className="text-xs text-neutral-400">
          {format(new Date(post.createdAt), "MMMM d, yyyy")}
        </time>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mt-1 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 line-clamp-3">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-3 text-sm font-medium text-rose-600 hover:text-rose-700"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
