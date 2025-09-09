"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";
import { getUser } from "@/lib/storage";

export default function HigherDashboard() {
  const user = getUser();

  return (
    <main className="space-y-10">
      <Navbar />
      <h1 className="text-3xl font-bold">Higher Secondary Dashboard</h1>
      <p className="text-slate-600">Ready to dive deeper, {user?.name}? 🔬</p>

      <div className="grid md:grid-cols-3 gap-6">
        <ProfileCard />
        <BadgeCard />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            type="comic"
            title="The Last Forest"
            desc="Explore biodiversity and human impact."
          />
          <ModuleCard
            type="game"
            title="Climate Crisis Simulator"
            desc="Make decisions as a policymaker in 2050."
          />
          <ModuleCard
            type="quiz"
            title="Energy Choices Quiz"
            desc="Test your knowledge on renewable energy."
          />
        </div>
      </section>
    </main>
  );
}
