"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import type { Pin } from "@/types";
import { MOCK_PINS } from "@/lib/mock-data";

export default function AdminPinsPage() {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    fetch("/api/admin/pins")
      .then((r) => r.json())
      .then((data) => setPins(data.pins || MOCK_PINS))
      .catch(() => setPins(MOCK_PINS));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pin?")) return;
    try {
      await fetch(`/api/admin/pins/${id}`, { method: "DELETE" });
      setPins((prev) => prev.filter((p) => p.id !== id));
      toast.success("Pin deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">All Pins</h1>
        <Link href="/admin/pins/new">
          <Button><Plus className="w-4 h-4" /> Add Pin</Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((pin) => (
              <tr key={pin.id} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="px-4 py-3 font-medium">{pin.title}</td>
                <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{pin.category.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    pin.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                  }`}>{pin.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/pins/${pin.id}/edit`} className="p-1.5 rounded-lg hover:bg-neutral-100">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(pin.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
