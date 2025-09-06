"use client";
import { getUser } from "@/lib/storage";

export default function BadgeCard() {
  const user = getUser();
  const badges = user?.badges ?? [];

  return (
    <div className="rounded-2xl border bg-white/70 p-6 shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Achievements</h2>
      {badges.length === 0 ? (
        <p>No badges yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-medium"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
