import type { Metadata } from "next";
import type { BlogPost, Pin } from "@/types";
import { SITE_NAME, SITE_URL } from "./constants";

interface SEOParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO({
  title,
  description,
  path = "",
  image,
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
}: SEOParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function generatePinJsonLd(pin: Pin) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pin.seoTitle || pin.title,
    description: pin.metaDescription || pin.shortDescription,
    image: pin.images.map((img) => img.url),
    url: `${SITE_URL}/pin/${pin.slug}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: pin.price
      ? {
          "@type": "Offer",
          price: pin.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: pin.affiliateLink,
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: pin.likes.toString(),
    },
  };
}

export function generateBlogJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
