"use client";
import { getUser } from "@/lib/storage";

export default function ProfileCard() {
  const user = getUser();

  if (!user) return <p>No user data found. Please sign up.</p>;

  return (
    <div className="rounded-2xl border bg-white/70 p-6 shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Profile</h2>
      <p><span className="font-medium">Name:</span> {user.name}</p>
      <p><span className="font-medium">Stage:</span> {user.stage}</p>
      {user.stage === "school" && user.schoolLevel && (
        <p><span className="font-medium">Level:</span> {user.schoolLevel}</p>
      )}
      {user.stage === "college" && user.collegeCourse && (
        <p><span className="font-medium">Course:</span> {user.collegeCourse}</p>
      )}
      <div className="pt-3">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-emerald-600 h-3 rounded-full"
            style={{ width: `${(user.xp ?? 0) / 20}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{user.xp ?? 0} XP</p>
      </div>
    </div>
  );
}

