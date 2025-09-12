"use client";

// src/app/dashboard/school/primary/page.tsx

import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import LearningModulesComponent from "@/components/LearningModule";
import { getUser } from "@/lib/storage";
import { Sparkles, Star, BookOpen } from "lucide-react";
// future backend helpers
// import { getProfile, getRankings, getModules } from "@/services/api";

export default function PrimaryDashboard() {
  const localUser = getUser();
  // placeholder profile data

  /* -------------------- FUTURE (FastAPI integration) --------------------
  useEffect(() => {
    async function fetchData() {
      try {
        // get profile from backend
        const p = await getProfile();
        setProfile(p);

        // get learning modules
        const m = await getModules();
        setModules(m);

        // badges/achievements may be part of profile or a separate call
        // setBadges(p.badges || []);

      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    }
    fetchData();
  }, []);
  ----------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-100">
      <Navbar />
      
      {/* Hero Section with Playful Welcome */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header with Animated Elements */}
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg border border-emerald-100 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-4 right-6 text-emerald-300 opacity-50">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-6 text-cyan-300 opacity-40">
              <Star className="w-6 h-6 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute top-1/2 right-16 text-emerald-200 opacity-30">
              <BookOpen className="w-10 h-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  My Learning Adventure
                </h1>
              </div>
              <p className="text-xl text-slate-600 font-medium">
                Welcome back, <span className="text-emerald-600 font-bold">{localUser?.name || "Amazing Student"}</span>! 
                Ready to learn something new today?
              </p>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Profile Card - Enhanced */}
            <div className="lg:col-span-1 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <ProfileCard />
            </div>

            {/* Badges Card - Enhanced */}
            <div className="lg:col-span-2 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <BadgeCard />
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-emerald-600">5</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">Lessons Today</h3>
              <p className="text-sm text-slate-500">Keep up the great work!</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-100 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-cyan-600">12</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">Stars Earned</h3>
              <p className="text-sm text-slate-500">You&apos;re doing amazing!</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">New Badges</h3>
              <p className="text-sm text-slate-500">Collect them all!</p>
            </div>
          </div>

          {/* Learning Modules Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700">My Learning Modules</h2>
            </div>
            <LearningModulesComponent />
          </div>
        </div>
      </div>
    </main>
  );
}