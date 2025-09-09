"use client";


// src/app/dashboard/school/primary/page.tsx

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";
import { getUser } from "@/lib/storage";
// future backend helpers
// import { getProfile, getRankings, getModules } from "@/services/api";

export default function PrimaryDashboard() {
  const localUser = getUser();

  // ✅ State placeholders (replace later with API data)
  const [profile, setProfile] = useState<any>({
    name: localUser?.name || "Student",
    class: "3",
    points: 120,
    completedModules: 2,
    avatarUrl: "/avatar.png",
  });

  const [badges, setBadges] = useState<any[]>([
    { id: 1, title: "Eco Starter", date: "2024-01-01" },
    { id: 2, title: "Tree Saver", date: "2024-03-01" },
  ]);

  const [modules, setModules] = useState<any[]>([
    { id: "1", type: "comic", title: "Super Tree Saves the Day", desc: "Learn how trees keep air clean." },
    { id: "2", type: "game", title: "Waste Sorting Game", desc: "Drag & drop waste into the right bins!" },
  ]);

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
    <main className="space-y-10">
      <Navbar />

      <h1 className="text-3xl font-bold">Primary School Dashboard</h1>
      <p className="text-slate-600">Hello {profile?.name}! 🌱</p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Pass profile data into ProfileCard */}
        <ProfileCard profile={profile} />

        {/* Badges list */}
        <BadgeCard badges={badges} />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleCard key={m.id} type={m.type} title={m.title} desc={m.desc} />
          ))}
        </div>
      </section>
    </main>
  );
}
