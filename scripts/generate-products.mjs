import { writeFileSync } from "fs";

// Scraped from https://www.pinterest.com/veerababupalepu549/
const products = [
  // Men's Fashion & Amazon Deals (15)
  { title: "5 Simple Men's Fashion Tips to Elevate Your Style", category: "mens-fashion", link: "https://amzn.to/4g6fj7T", image: "https://i.pinimg.com/736x/48/ea/71/48ea71427f6ba8913b80102e0b4ee9e2.jpg", desc: "Discover smart casual outfit ideas, style essentials, and confidence-boosting looks for everyday wear, office outfits, and date nights.", price: null, trending: true },
  { title: "Men's Olive Green Casual Shirt Outfit", category: "mens-fashion", link: "https://amzn.to/43iA34U", image: "https://i.pinimg.com/736x/8b/4c/df/8b4cdf7103d0a90050c48464bd0b133f.jpg", desc: "Stylish olive green casual shirt perfect for everyday wear, office outfits, date nights, and weekend style.", price: null, trending: true },
  { title: "Classic Striped Shirt for Men | Slim Fit Smart Casual", category: "mens-fashion", link: "https://amzn.to/4dQUHiB", image: "https://i.pinimg.com/736x/32/19/a9/3219a999259bdb1812a85b8b1b6e0752.jpg", desc: "Classic striped shirt for men — perfect for office casual, date nights, and weekend outfits with grey jeans.", price: null },
  { title: "Men's Summer Casual Color Block Shirt", category: "mens-fashion", link: "https://amzn.to/4alLGM7", image: "https://i.pinimg.com/736x/fb/91/1b/fb911bdd8afb66ecf6c6a248982d0e74.jpg", desc: "Lightweight short-sleeve color block shirt for summer, beach vacations, and casual streetwear.", price: null },
  { title: "Men's Casual Co-Ord Set | Textured Overshirt", category: "mens-fashion", link: "https://amzn.to/4u98PIM", image: "https://i.pinimg.com/736x/32/19/47/321947e4e5dc421c53488c1c9bf286e5.jpg", desc: "Premium textured overshirt with matching relaxed-fit bottoms. Perfect for travel, weekend wear, and smart-casual occasions.", price: null, trending: true },
  { title: "Men's Black Shirt Jacket | Everyday Essential", category: "mens-fashion", link: "https://amzn.to/49Bn7L7", image: "https://i.pinimg.com/736x/23/9d/ff/239dffbe716114ec763c9821b018aad8.jpg", desc: "Versatile black shirt jacket that pairs effortlessly with jeans, chinos, and sneakers.", price: null },
  { title: "Tropical Hawaiian Shirt for Men | Summer Vacation", category: "mens-fashion", link: "https://amzn.to/4vgmRcC", image: "https://i.pinimg.com/736x/0c/a7/40/0ca7403e54b203ab8c07cff47a2a805d.jpg", desc: "Lightweight tropical Hawaiian shirt for beach vacations, cruises, and weekend adventures.", price: null, deal: true },
  { title: "Men's Fashion Hack | Look Expensive on a Budget", category: "mens-fashion", link: "https://amzn.to/4x3k5sZ", image: "https://i.pinimg.com/736x/9d/a2/e2/9da2e2390a96a8b35c0d7e970943ddf0.jpg", desc: "Trendy striped shirt look for casual outings, date nights, and smart-casual events.", price: null },
  { title: "Premium Men's Shirt Under ₹399", category: "mens-fashion", link: "https://amzn.to/3RzabPH", image: "https://i.pinimg.com/736x/96/f0/38/96f0383e005579f5fb88be043382752b.jpg", desc: "Soft, breathable premium men's shirt for casual outings, office wear, and vacations. Limited stock!", price: 399, deal: true },
  { title: "Premium Black Resort Collar Shirt | Minimalist Style", category: "mens-fashion", link: "https://amzn.to/3S8XXgG", image: "https://i.pinimg.com/736x/69/e0/45/69e045fff6d3008c3af9af7314bc5565.jpg", desc: "Clean minimalist black resort collar shirt for summer vacations, date nights, and smart-casual styling.", price: null },
  { title: "Tropical Print Shirt | Summer Fashion Under ₹413", category: "mens-fashion", link: "https://amzn.to/49vdLAt", image: "https://i.pinimg.com/736x/6c/dd/1b/6cdd1bbda6af81244014dbf88292cd22.jpg", desc: "Stylish tropical print shirt with premium breathable fabric. Perfect for beach vacations and parties.", price: 413, deal: true },
  { title: "Premium Navy Blue Polo T-Shirt Under ₹449", category: "mens-fashion", link: "https://amzn.to/4vjeRb3", image: "https://i.pinimg.com/736x/24/44/91/24449118cf4d6b87db5235b0f20f365c.jpg", desc: "Premium breathable polo with modern athletic fit. Perfect for casual, college, and travel looks.", price: 449, deal: true },
  { title: "Gradient Casual Shirt for Men Under ₹310", category: "mens-fashion", link: "https://amzn.to/4nN2QrC", image: "https://i.pinimg.com/736x/b3/6f/7b/b36f7b877c24412f164b9659b21861f6.jpg", desc: "Stylish ombre gradient shirt with soft breathable fabric for beach outings and everyday wear.", price: 310, deal: true },
  { title: "Men's Party Wear Shirt Under ₹449", category: "mens-fashion", link: "https://amzn.to/4dTzfIK", image: "https://i.pinimg.com/736x/84/5f/12/845f121e6563b593726ddef606fc89cf.jpg", desc: "Premium party wear shirt with luxury embroidery design. Perfect for weddings and date nights.", price: 449, deal: true },
  { title: "Printed Casual Shirt Under ₹378", category: "mens-fashion", link: "https://amzn.to/4v6P45w", image: "https://i.pinimg.com/736x/7c/6e/3b/7c6e3bbdcccf9f9d2daaf94c5f73fea3.jpg", desc: "Trending geometric print shirt for vacations, beach outings, and summer fashion.", price: 378, deal: true },

  // Women's Fashions (5)
  { title: "Traditional Lehenga for Women | Wedding & Party Wear", category: "womens-fashion", link: "https://amzn.to/4tzWqxf", image: "https://i.pinimg.com/736x/51/ea/0e/51ea0ee2cb6d2c32ce93bdde7fc8bced.jpg", desc: "Beautiful traditional lehenga with premium fabric and elegant detailing for weddings and festivals.", price: null, trending: true },
  { title: "Elegant Lehenga Dress for Women | Ethnic Party Wear", category: "womens-fashion", link: "https://amzn.to/43dHwSx", image: "https://i.pinimg.com/736x/b5/7c/39/b57c39340851d2df08d2ca5f9e9000d8.jpg", desc: "Rich traditional embroidery lehenga perfect for weddings, festivals, and receptions.", price: null },
  { title: "Affordable Purple Georgette Saree Under ₹350", category: "womens-fashion", link: "https://amzn.to/4uzxhnq", image: "https://i.pinimg.com/736x/ca/0e/5c/ca0e5cd1298b64b75f2429c407c54bb7.jpg", desc: "Premium georgette saree with lightweight comfort for parties, festivals, and daily elegance.", price: 350, deal: true },
  { title: "Purple Anarkali Dress Under ₹899", category: "womens-fashion", link: "https://amzn.to/4etamoZ", image: "https://i.pinimg.com/736x/e9/63/44/e96344b685b0bd8c9e51c48b3daba56c.jpg", desc: "Gorgeous Anarkali dress with embroidered detailing for festive occasions and parties.", price: 899, deal: true },
  { title: "Stylish Ethnic Kurta Set Under ₹800", category: "womens-fashion", link: "https://amzn.to/4tzWqxf", image: "https://i.pinimg.com/736x/5a/37/75/5a377563a0d12764e8b89c53e6dba886.jpg", desc: "Beautiful ethnic kurta set for daily wear, festivals, and office looks. Trending Amazon fashion deal.", price: 800, deal: true },

  // Shoes & Beauty (3)
  { title: "Premium Men's Sneakers Under ₹549", category: "amazon-finds", link: "https://amzn.to/4dtzZFp", image: "https://i.pinimg.com/736x/9f/c2/ae/9fc2ae47bb7c9276f15af3fd1b5cf608.jpg", desc: "Ultra lightweight sneakers with cushioned comfort and anti-slip sole for gym, travel, and daily wear.", price: 549, deal: true, trending: true },
  { title: "Floral Nail Art Stickers | DIY Flower Nail Designs", category: "beauty", link: "https://amzn.to/4uBn89K", image: "https://i.pinimg.com/736x/a6/30/c1/a630c10b50814400d8ac66c40c384266.jpg", desc: "50+ cute floral nail sticker designs. Easy peel & apply for gel, acrylic, and natural nails.", price: null },
  { title: "Starry Rhinestone Nail Design | Elegant Glitter Nails", category: "beauty", link: "https://amzn.to/4d3ZNI3", image: "https://i.pinimg.com/736x/ad/65/4a/ad654a1be4395c3f395632dd74a8efb4.jpg", desc: "Elegant nude almond nails with sparkling crystal rhinestone accents for parties and weddings.", price: null, trending: true },

  // Health & Fitness (3)
  { title: "Insulated Travel Mug | Cold 40hrs & Hot 8hrs", category: "health-fitness", link: "https://amzn.to/4uGQ6pj", image: "https://i.pinimg.com/736x/9c/9d/f6/9c9df6eec82244ca32e5879806cf51ed.jpg", desc: "Premium stainless steel insulated tumbler. Leak-resistant, BPA-free, fits most car cup holders.", price: null },
  { title: "Optimum Nutrition Whey Protein | ₹3779 Deal", category: "health-fitness", link: "https://amzn.to/4xhSLYj", image: "https://i.pinimg.com/736x/05/54/2a/05542a7d08ae01120c3d0bfe50f98409.jpg", desc: "24g protein per serving with 5.5g BCAAs. Supports muscle growth, recovery, and performance.", price: 3779, deal: true },
  { title: "Portable USB Blender Under ₹299", category: "kitchen-gadgets", link: "https://amzn.to/4a1T5QH", image: "https://i.pinimg.com/736x/bc/3e/4d/bc3e4d64bf7a0edc9f4e2ffd6d42f335.jpg", desc: "USB rechargeable portable blender for smoothies, shakes, and protein drinks on the go.", price: 299, deal: true, trending: true },
];

function slugifyLocal(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

const categoryMap = {
  "mens-fashion": "1", "womens-fashion": "3", "amazon-finds": "1", "beauty": "6",
  "health-fitness": "7", "kitchen-gadgets": "5",
};

const pins = products.map((p, i) => {
  const slug = slugifyLocal(p.title).slice(0, 60);
  const catSlug = p.category;
  return `  {
    id: "${i + 1}",
    title: ${JSON.stringify(p.title)},
    slug: ${JSON.stringify(slug)},
    seoTitle: ${JSON.stringify(p.title + " | Fashion Loot Deals")},
    shortDescription: ${JSON.stringify(p.desc.slice(0, 120) + (p.desc.length > 120 ? "..." : ""))},
    fullDescription: ${JSON.stringify(p.desc + " Shop now on Amazon before this deal ends!")},
    pinterestTitle: ${JSON.stringify(p.title + " ✨")},
    pinterestDescription: ${JSON.stringify(p.desc + " #AmazonFinds #FashionLootDeals")},
    metaDescription: ${JSON.stringify(p.desc.slice(0, 155))},
    seoKeywords: ${JSON.stringify(p.title.toLowerCase() + ", amazon finds, fashion loot deals, " + catSlug.replace("-", " "))},
    hashtags: "#AmazonFinds #FashionLootDeals #${catSlug.replace(/-/g, "")}",
    affiliateLink: ${JSON.stringify(p.link)},
    price: ${p.price ?? "undefined"},
    originalPrice: undefined,
    features: [],
    pros: ["Great value for money", "Trending on Pinterest", "Fast Amazon delivery"],
    cons: ["Limited stock available"],
    status: "PUBLISHED",
    isTrending: ${!!p.trending},
    isDeal: ${!!p.deal},
    views: ${Math.floor(Math.random() * 15000) + 2000},
    likes: ${Math.floor(Math.random() * 800) + 100},
    saves: ${Math.floor(Math.random() * 2000) + 200},
    amazonClicks: ${Math.floor(Math.random() * 500) + 50},
    pinterestClicks: ${Math.floor(Math.random() * 1000) + 100},
    category: CATEGORIES.find((c) => c.slug === "${catSlug}")!,
    images: [{ id: "${i + 1}a", url: ${JSON.stringify(p.image)}, alt: ${JSON.stringify(p.title)}, sortOrder: 0 }],
    tags: [{ id: "t${i + 1}", name: "Amazon Finds", slug: "amazon-finds" }],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-06-07T10:00:00Z",
  }`;
});

const content = `import type { BlogPost, Pin } from "@/types";
import { CATEGORIES } from "./categories";

// Products imported from Pinterest: https://www.pinterest.com/veerababupalepu549/
export const MOCK_PINS: Pin[] = [
${pins.join(",\n")}
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Top Amazon Fashion Finds from Fashion Loot Deals",
    slug: "top-amazon-fashion-finds",
    excerpt: "Discover the best men's and women's fashion deals trending on Pinterest from Fashion Loot Deals.",
    content: "## Men's Fashion Deals\\n\\nFrom casual shirts to co-ord sets, these Amazon finds are going viral on Pinterest.\\n\\n## Women's Ethnic Wear\\n\\nStunning lehengas, sarees, and kurta sets at unbeatable prices.\\n\\n## Health & Kitchen\\n\\nPortable blenders, protein supplements, and more daily essentials.\\n\\n## Shop Now\\n\\nBrowse our curated collection and grab these deals before they're gone!",
    featuredImage: "https://i.pinimg.com/736x/48/ea/71/48ea71427f6ba8913b80102e0b4ee9e2.jpg",
    metaTitle: "Top Amazon Fashion Finds | Fashion Loot Deals",
    metaDescription: "Best Amazon fashion deals for men and women curated from Fashion Loot Deals Pinterest.",
    seoKeywords: "amazon fashion deals, fashion loot deals, pinterest finds",
    status: "PUBLISHED",
    views: 3200,
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-06-07T10:00:00Z",
  },
];
`;

writeFileSync("./src/lib/mock-data.ts", content);
console.log(`Generated ${products.length} products`);
