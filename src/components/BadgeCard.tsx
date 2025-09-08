"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/storage";

// src/components/BadgeCard.tsx

// ✅ Define a proper type for badges
interface Badge {
  id: string;
  title: string;
  date?: string; // optional, can be added later by backend
}

// ✅ Centralized API service (future FastAPI integration)
async function fetchBadges(userId: string): Promise<Badge[]> {
  try {
    // 🚀 Example GET request (replace with FastAPI later)
    // const res = await fetch(`http://localhost:8000/api/users/${userId}/badges`);
    // if (!res.ok) throw new Error("Failed to fetch badges");
    // return await res.json();

    // 🔹 Mock data until backend is ready
    return [
      { id: "1", title: "Eco Champion", date: "2025-09-01" },
      { id: "2", title: "Quiz Master", date: "2025-09-05" },
    ];
  } catch (error) {
    console.error("Error fetching badges:", error);
    return [];
  }
}

// ✅ Example POST request (for later use)
// async function addBadge(userId: string, badge: Badge) { ... }

// ✅ Example PUT request (for updating badge info)
// async function updateBadge(userId: string, badgeId: string, updates: Partial<Badge>) { ... }

export default function BadgeCard() {
  const localUser = getUser() as { id?: string; badges?: string[] } | null;

  // Convert local storage badges (string[]) into Badge[] temporarily
  const initialBadges: Badge[] =
    localUser?.badges?.map((b, idx) => ({ id: String(idx), title: b })) ?? [];

  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  // 🔹 On mount, fetch badges from backend (if user has an id)
  useEffect(() => {
    if (localUser?.id) {
      fetchBadges(localUser.id).then(setBadges);
    }
  }, [localUser?.id]);

  return (
    <div className="rounded-2xl border bg-white/70 p-6 shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Achievements</h2>

      {badges.length === 0 ? (
        <p className="text-gray-500">No badges yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className="rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-medium shadow-sm"
            >
              {b.title}
              {b.date && (
                <span className="ml-2 text-xs text-gray-500">({b.date})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
