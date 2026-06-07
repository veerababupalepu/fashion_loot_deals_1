import { StaticPage } from "@/components/pages/StaticPage";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Affiliate Disclosure",
  description: "PinDealsHub affiliate disclosure — we earn from qualifying Amazon purchases at no extra cost to you.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <StaticPage title="Affiliate Disclosure">
      <p>
        <strong>PinDealsHub</strong> is a participant in the Amazon Services LLC Associates Program,
        an affiliate advertising program designed to provide a means for sites to earn advertising
        fees by advertising and linking to Amazon.com.
      </p>
      <h2>What This Means</h2>
      <p>
        When you click on an Amazon link on our site and make a purchase, we may earn a small
        commission at <strong>no additional cost to you</strong>. This helps us keep PinDealsHub
        free and continue curating great product picks.
      </p>
      <h2>Our Commitment</h2>
      <ul>
        <li>We only recommend products we genuinely believe are worth your consideration</li>
        <li>Affiliate relationships do not influence our honest reviews</li>
        <li>We clearly disclose affiliate links on all product pages</li>
        <li>Prices and availability are subject to change on Amazon</li>
      </ul>
      <h2>Other Affiliate Programs</h2>
      <p>We may also participate in other affiliate programs. Any such relationships will be disclosed on relevant pages.</p>
    </StaticPage>
  );
}
