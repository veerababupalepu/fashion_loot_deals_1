import Link from "next/link";
import { Plus, Pin } from "lucide-react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { Button } from "@/components/ui/Button";
import { getAnalytics } from "@/lib/data/analytics";
import { MOCK_PINS } from "@/lib/mock-data";

export default async function AdminDashboard() {
  const analytics = await getAnalytics();
  const recentPins = MOCK_PINS.slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-neutral-500">Welcome to PinDealsHub admin panel</p>
        </div>
        <Link href="/admin/pins/new">
          <Button>
            <Plus className="w-4 h-4" />
            Add New Pin
          </Button>
        </Link>
      </div>

      <AnalyticsDashboard data={analytics} />

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Pins</h2>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {recentPins.map((pin) => (
                <tr key={pin.id} className="border-t border-neutral-100 dark:border-neutral-800">
                  <td className="px-4 py-3">
                    <Link href={`/admin/pins/${pin.id}/edit`} className="hover:text-rose-600 font-medium">
                      {pin.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{pin.category.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      pin.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {pin.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{pin.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
