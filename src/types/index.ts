export type CategorySlug =
  | "amazon-finds"
  | "mens-fashion"
  | "womens-fashion"
  | "home-decor"
  | "kitchen-gadgets"
  | "beauty"
  | "health-fitness"
  | "diy"
  | "travel"
  | "pets"
  | "technology";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description?: string;
  image?: string;
}

export interface PinImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface Pin {
  id: string;
  title: string;
  slug: string;
  seoTitle?: string;
  shortDescription: string;
  fullDescription: string;
  pinterestTitle?: string;
  pinterestDescription?: string;
  metaDescription?: string;
  seoKeywords?: string;
  hashtags?: string;
  affiliateLink: string;
  price?: number;
  originalPrice?: number;
  features: string[];
  pros: string[];
  cons: string[];
  status: "DRAFT" | "PUBLISHED";
  isTrending: boolean;
  isDeal: boolean;
  views: number;
  likes: number;
  saves: number;
  amazonClicks: number;
  pinterestClicks: number;
  category: Category;
  images: PinImage[];
  tags: { id: string; name: string; slug: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  status: "DRAFT" | "PUBLISHED";
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface AISEOResult {
  pinterestTitle: string;
  pinterestDescription: string;
  seoKeywords: string;
  metaDescription: string;
  hashtags: string;
}

export interface PinterestImportResult {
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  pinterestTitle: string;
  pinterestDescription: string;
}

export interface AnalyticsData {
  totalPins: number;
  totalClicks: number;
  pinterestClicks: number;
  amazonClicks: number;
  topCategories: { name: string; count: number }[];
}
