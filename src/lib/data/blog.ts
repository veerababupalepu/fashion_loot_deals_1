import type { BlogPost } from "@/types";
import { BLOG_PER_PAGE } from "@/lib/constants";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

function mapPrismaPost(post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  metaTitle: string | null;
  metaDescription: string | null;
  seoKeywords: string | null;
  status: "DRAFT" | "PUBLISHED";
  views: number;
  createdAt: Date;
  updatedAt: Date;
}): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    metaTitle: post.metaTitle ?? undefined,
    metaDescription: post.metaDescription ?? undefined,
    seoKeywords: post.seoKeywords ?? undefined,
    status: post.status,
    views: post.views,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function getBlogPosts(page = 1, limit = BLOG_PER_PAGE) {
  if (!isDatabaseConfigured()) {
    const published = MOCK_BLOG_POSTS.filter((p) => p.status === "PUBLISHED");
    const start = (page - 1) * limit;
    const posts = published.slice(start, start + limit);
    return { posts, total: published.length, hasMore: start + limit < published.length };
  }

  const where = { status: "PUBLISHED" as const };
  const [raw, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts: raw.map(mapPrismaPost),
    total,
    hasMore: page * limit < total,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isDatabaseConfigured()) {
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug && p.status === "PUBLISHED") ?? null;
  }
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") return null;
  return mapPrismaPost(post);
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const { posts } = await getBlogPosts(1, limit + 1);
  return posts.filter((p) => p.id !== post.id).slice(0, limit);
}
