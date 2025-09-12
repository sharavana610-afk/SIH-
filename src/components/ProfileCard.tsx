"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/storage";
import { User, GraduationCap, BookOpen, Star, Trophy, Zap } from "lucide-react";

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

  if (!profile) {
    return (
      <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-600 font-medium text-lg">No user data found</p>
        <p className="text-slate-500 text-sm mt-2">Please sign up to get started</p>
      </div>
    );
  }

  // Calculate level based on XP (every 100 XP = 1 level)
  const currentLevel = Math.floor((profile.xp ?? 0) / 100) + 1;
  const xpInCurrentLevel = (profile.xp ?? 0) % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;
  const progressPercentage = (xpInCurrentLevel / 100) * 100;

  // Get appropriate icon based on stage
  const getStageIcon = () => {
    switch (profile.stage) {
      case "school":
        return <BookOpen className="w-5 h-5" />;
      case "college":
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  // Get stage display text
  const getStageText = () => {
    if (profile.stage === "school" && profile.schoolLevel) {
      return profile.schoolLevel.charAt(0).toUpperCase() + profile.schoolLevel.slice(1) + " School";
    }
    if (profile.stage === "college" && profile.collegeCourse) {
      return profile.collegeCourse;
    }
    return profile.stage.charAt(0).toUpperCase() + profile.stage.slice(1);
  };

  return (
    <div className="group relative">
      {/* Main Card */}
      <div className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-cyan-50/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-5">
        
        {/* Header with Avatar and Name */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Avatar Circle */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            {/* Level Badge */}
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-xs font-bold text-yellow-900">{currentLevel}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Hello, {profile.name}!</h2>
            <div className="flex items-center space-x-2 text-emerald-700">
              {getStageIcon()}
              <span className="font-medium">{getStageText()}</span>
            </div>
          </div>
        </div>

        {/* XP Section */}
        <div className="bg-white/60 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-700">Level {currentLevel}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">{profile.xp ?? 0}</p>
              <p className="text-xs text-slate-500 -mt-1">XP Points</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress Text */}
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="text-slate-600 font-medium">{xpInCurrentLevel}/100 XP</span>
              <span className="text-emerald-600 font-medium">{xpToNextLevel} XP to level up!</span>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex items-center justify-center space-x-3">
          <div className="group/badge hover:scale-110 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="group/badge hover:scale-110 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="group/badge hover:scale-110 transition-transform duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Encouraging Message */}
        <div className="text-center">
          <p className="text-slate-600 font-medium">Keep learning and growing!</p>
          <p className="text-xs text-slate-500 mt-1">You&apos;re doing amazing work</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-80 group-hover:animate-bounce"></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-60 group-hover:animate-pulse"></div>
    </div>
  );
}