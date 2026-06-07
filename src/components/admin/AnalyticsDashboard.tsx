import { BarChart3, Eye, MousePointer, Pin, ShoppingBag } from "lucide-react";
import type { AnalyticsData } from "@/types";
import { formatNumber } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const stats = [
    { label: "Total Pins", value: data.totalPins, icon: Pin, color: "text-rose-600" },
    { label: "Total Clicks", value: data.totalClicks, icon: MousePointer, color: "text-blue-600" },
    { label: "Pinterest Clicks", value: data.pinterestClicks, icon: Eye, color: "text-red-600" },
    { label: "Amazon Clicks", value: data.amazonClicks, icon: ShoppingBag, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <BarChart3 className="w-4 h-4 text-neutral-300" />
            </div>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {formatNumber(stat.value)}
            </p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="font-semibold text-lg mb-4">Top Categories</h3>
        {data.topCategories.length === 0 ? (
          <p className="text-neutral-500 text-sm">No data yet.</p>
        ) : (
          <div className="space-y-3">
            {data.topCategories.map((cat) => {
              const max = data.topCategories[0]?.count || 1;
              const pct = (cat.count / max) * 100;
              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-neutral-500">{cat.count} pins</span>
                  </div>
                  <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
