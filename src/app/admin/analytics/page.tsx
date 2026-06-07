import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { getAnalytics } from "@/lib/data/analytics";

export default async function AnalyticsPage() {
  const data = await getAnalytics();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>
      <AnalyticsDashboard data={data} />
    </div>
  );
}
