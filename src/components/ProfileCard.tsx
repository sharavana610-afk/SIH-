"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/storage";
//src/components/ProfileCard.tsx
// ✅ Define a proper type for the profile
interface UserProfile {
  id: string;
  name: string;
  stage: "school" | "college" | "other";
  schoolLevel?: string;
  collegeCourse?: string | null;
  xp?: number;
}

// ✅ Centralized API service (future FastAPI integration)
async function fetchProfileData(userId: string): Promise<UserProfile | null> {
  try {
    // Example GET request (replace with FastAPI later)
    // const res = await fetch(`http://localhost:8000/api/profile/${userId}`);
    // if (!res.ok) throw new Error("Failed to fetch profile");
    // return await res.json();

    // Mock data until backend is ready
    return {
      id: userId,
      name: "Sharavana",
      stage: "school",
      schoolLevel: "primary",
      collegeCourse: null,
      xp: 250, // Experience Points
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

// ✅ Example POST request (for later use)
// async function createProfile(data: UserProfile) { ... }

// ✅ Example PUT request (for updating XP, Level, etc.)
// async function updateProfile(userId: string, updates: Partial<UserProfile>) { ... }

export default function ProfileCard() {
  const localUser = getUser() as UserProfile | null; // typecast local storage result
  const [profile, setProfile] = useState<UserProfile | null>(localUser);

  useEffect(() => {
    if (localUser?.id) {
      fetchProfileData(localUser.id).then((data) => {
        if (data) setProfile(data);
      });
    }
  }, [localUser?.id]);

  if (!profile) return <p>No user data found. Please sign up.</p>;

  return (
    <div className="rounded-2xl border bg-white/70 p-6 shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Profile</h2>

      <p>
        <span className="font-medium">Name:</span> {profile.name}
      </p>
      <p>
        <span className="font-medium">Stage:</span> {profile.stage}
      </p>

      {profile.stage === "school" && profile.schoolLevel && (
        <p>
          <span className="font-medium">Level:</span> {profile.schoolLevel}
        </p>
      )}

      {profile.stage === "college" && profile.collegeCourse && (
        <p>
          <span className="font-medium">Course:</span> {profile.collegeCourse}
        </p>
      )}

      {/* XP Progress Bar */}
      <div className="pt-3">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(profile.xp ?? 0) / 20}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{profile.xp ?? 0} XP</p>
      </div>
    </div>
  );
}
