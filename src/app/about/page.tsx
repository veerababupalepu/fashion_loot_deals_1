import { StaticPage } from "@/components/pages/StaticPage";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About Us",
  description: "Learn about PinDealsHub — your destination for curated Pinterest-inspired product picks and Amazon deals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage title="About Us">
      <p>
        <strong>PinDealsHub</strong> is a curated destination for discovering trending products,
        lifestyle ideas, and Amazon deals inspired by what&apos;s popular on Pinterest.
      </p>
      <h2>Our Mission</h2>
      <p>
        We help millions of Pinterest users discover products they&apos;ll love — from fashion and
        home decor to kitchen gadgets and tech accessories. Every product is hand-picked, honestly
        reviewed, and linked with affiliate transparency.
      </p>
      <h2>What We Do</h2>
      <ul>
        <li>Curate trending Amazon finds across 11 lifestyle categories</li>
        <li>Provide honest product reviews with pros, cons, and features</li>
        <li>Optimize every pin for Pinterest sharing and discovery</li>
        <li>Publish lifestyle guides and deal roundups on our blog</li>
      </ul>
      <h2>Affiliate Transparency</h2>
      <p>
        PinDealsHub participates in the Amazon Associates Program. We may earn commissions from
        qualifying purchases at no extra cost to you. See our{" "}
        <a href="/affiliate-disclosure" className="text-rose-600 hover:underline">
          Affiliate Disclosure
        </a>{" "}
        for details.
      </p>
    </StaticPage>
  );
}
