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
  return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

