import type { Category, CategorySlug } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Amazon Finds", slug: "amazon-finds", description: "Best Amazon deals and hidden gems" },
  { id: "2", name: "Men's Fashion", slug: "mens-fashion", description: "Style inspiration for men" },
  { id: "3", name: "Women's Fashion", slug: "womens-fashion", description: "Trending women's style picks" },
  { id: "4", name: "Home Decor", slug: "home-decor", description: "Beautiful home styling ideas" },
  { id: "5", name: "Kitchen Gadgets", slug: "kitchen-gadgets", description: "Must-have kitchen tools" },
  { id: "6", name: "Beauty", slug: "beauty", description: "Beauty products worth trying" },
  { id: "7", name: "Health & Fitness", slug: "health-fitness", description: "Wellness and fitness essentials" },
  { id: "8", name: "DIY", slug: "diy", description: "Creative DIY project ideas" },
  { id: "9", name: "Travel", slug: "travel", description: "Travel gear and inspiration" },
  { id: "10", name: "Pets", slug: "pets", description: "Pet products pet parents love" },
  { id: "11", name: "Technology", slug: "technology", description: "Tech gadgets and accessories" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}
