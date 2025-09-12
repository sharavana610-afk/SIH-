"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/storage";
import { Award, Star, Trophy, Medal } from "lucide-react";

// src/components/BadgeCard.tsx

// ✅ Define a proper type for badges
interface Badge {
  id: string;
  title: string;
  date?: string; // optional, can be added later by backend
}

// ✅ Centralized API service (future FastAPI integration)
async function fetchBadges(/* userId: string */): Promise<Badge[]> {
  try {
    // 🚀 Example GET request (replace with FastAPI later)
    // const res = await fetch(`http://localhost:8000/api/users/${userId}/badges`);
    // if (!res.ok) throw new Error("Failed to fetch badges");
    // return await res.json();

    // 🔹 Mock data until backend is ready
    return [
      { id: "1", title: "Eco Champion", date: "2025-09-01" },
      { id: "2", title: "Quiz Master", date: "2025-09-05" },
      { id: "3", title: "Tree Friend", date: "2025-09-03" },
      { id: "4", title: "Super Recycler", date: "2025-09-07" },
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

// Badge icon variants for visual appeal
const getBadgeIcon = (index: number) => {
  const icons = [Trophy, Medal, Star, Award];
  const IconComponent = icons[index % icons.length];
  return IconComponent;
};

// Badge color variants using brand colors
const getBadgeColors = (index: number) => {
  const colorVariants = [
    "bg-emerald-100 text-emerald-800 border-emerald-200",
    "bg-cyan-100 text-cyan-800 border-cyan-200", 
    "bg-slate-100 text-slate-800 border-slate-200",
    "bg-emerald-50 text-emerald-600 border-emerald-100"
  ];
  return colorVariants[index % colorVariants.length];
};

export default function BadgeCard() {
  const localUser = getUser() as { id?: string; badges?: string[] } | null;

  // Convert local storage badges (string[]) into Badge[] temporarily
  const initialBadges: Badge[] =
    localUser?.badges?.map((b, idx) => ({ id: String(idx), title: b })) ?? [];

  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  // 🔹 On mount, fetch badges from backend (if user has an id)
  useEffect(() => {
    if (localUser?.id) {
      fetchBadges(/* localUser.id */).then(setBadges);
    }
  }, [localUser?.id]);

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 space-y-6">
      {/* Header with playful styling */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-emerald-100">
          <Trophy className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            My Achievements
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {badges.length} badge{badges.length !== 1 ? 's' : ''} earned
          </p>
        </div>
      </div>

      {badges.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Award className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600 text-lg font-medium mb-2">
            No badges yet!
          </p>
          <p className="text-slate-500 text-sm">
            Complete activities to earn your first achievement
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge, index) => {
            const IconComponent = getBadgeIcon(index);
            const colors = getBadgeColors(index);
            const isHovered = hoveredBadge === badge.id;
            
            return (
              <div
                key={badge.id}
                className={`
                  relative rounded-2xl border-2 p-4 cursor-pointer
                  transition-all duration-300 transform
                  ${colors}
                  ${isHovered 
                    ? 'scale-105 shadow-lg -translate-y-1' 
                    : 'hover:scale-102 hover:shadow-md'
                  }
                `}
                onMouseEnter={() => setHoveredBadge(badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                {/* Sparkle effect on hover */}
                {isHovered && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2 rounded-xl transition-all duration-300
                    ${isHovered ? 'bg-white/50 scale-110' : 'bg-white/30'}
                  `}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">
                      {badge.title}
                    </h3>
                    {badge.date && (
                      <p className="text-xs opacity-75 mt-1">
                        Earned {new Date(badge.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress indicator or special effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-b-2xl overflow-hidden">
                  <div 
                    className="h-full bg-white/50 transition-all duration-500 ease-out"
                    style={{ 
                      width: isHovered ? '100%' : '0%' 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Motivational footer for kids */}
      {badges.length > 0 && (
        <div className="text-center pt-4 border-t border-slate-200">
        </div>
      )}
    </div>
  );
}