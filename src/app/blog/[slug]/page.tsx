import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog";
import { generateSEO, generateBlogJsonLd } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return generateSEO({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${slug}`,
    image: post.featuredImage,
    type: "article",
    publishedTime: post.createdAt,
    modifiedTime: post.updatedAt,
    keywords: post.seoKeywords,
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  let headingIndex = 0;

  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      const id = `heading-${headingIndex++}`;
      return (
        <h2 key={i} id={id} className="text-2xl font-bold mt-8 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      const id = `heading-${headingIndex++}`;
      return (
        <h3 key={i} id={id} className="text-xl font-semibold mt-6 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);
  const jsonLd = generateBlogJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-6" />

        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <time className="text-sm text-neutral-400">
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{post.title}</h1>
            <p className="text-lg text-neutral-500 mb-8">{post.excerpt}</p>

            <div className="prose dark:prose-invert max-w-none">
              {renderContent(post.content)}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 text-center">
              <h3 className="text-xl font-bold mb-2">Shop the Best Deals</h3>
              <p className="text-neutral-500 mb-4">Browse our curated Amazon finds and save big.</p>
              <Link href="/amazon-finds">
                <Button>
                  <ExternalLink className="w-4 h-4" />
                  Shop Amazon Finds
                </Button>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
