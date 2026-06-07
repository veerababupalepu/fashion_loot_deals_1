"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PinCard } from "@/components/pins/PinCard";
import type { Pin } from "@/types";

export default function ProfilePage() {
  const [favorites, setFavorites] = useState<Pin[]>([]);
  const [name, setName] = useState("Guest User");

  useEffect(() => {
    const likedIds = Object.keys(localStorage)
      .filter((k) => k.startsWith("liked-"))
      .map((k) => k.replace("liked-", ""));

    if (likedIds.length > 0) {
      fetch(`/api/favorites?ids=${likedIds.join(",")}`)
        .then((r) => r.json())
        .then((data) => setFavorites(data.pins || []));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <GlassCard className="p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-neutral-500">Member since 2024</p>
          </div>
        </div>
      </GlassCard>

      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-rose-600" />
        <h2 className="text-xl font-bold">Favorite Pins</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <Heart className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
          <p>No favorites yet. Start liking pins to save them here!</p>
          <Link href="/" className="inline-block mt-4">
            <Button variant="outline">Browse Pins</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((pin, i) => (
            <PinCard key={pin.id} pin={pin} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
