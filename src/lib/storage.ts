// src/lib/storage.ts

// 🔹 Define missing types
export type EducationStage = "school" | "college" | "other";
export type SchoolLevel = "primary" | "secondary" | "higher";

export type UserProfile = {
  name: string;
  email: string;
  stage: EducationStage;
  schoolLevel?: SchoolLevel;
  collegeCourse?: string;
  xp?: number;
  badges?: string[];
};

const KEY = "greenspark:user";

export function saveUser(profile: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
