import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/data/blog";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Blog — Lifestyle Tips, Deals & Product Guides",
  description: "Read our latest blog posts on fashion, home decor, Amazon finds, and lifestyle tips.",
  path: "/blog",
});

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog</h1>
      <p className="text-neutral-500 text-lg mb-10 max-w-2xl">
        Lifestyle tips, product guides, and deal roundups curated for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
