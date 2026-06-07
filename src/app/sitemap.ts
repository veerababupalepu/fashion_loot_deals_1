import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/constants";
import { MOCK_PINS, MOCK_BLOG_POSTS } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/affiliate-disclosure",
    "/cookie-policy",
    "/terms",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const pinPages = MOCK_PINS.map((pin) => ({
    url: `${SITE_URL}/pin/${pin.slug}`,
    lastModified: new Date(pin.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages = MOCK_BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...pinPages, ...blogPages];
}
