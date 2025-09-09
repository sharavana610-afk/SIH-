"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";
import { getUser } from "@/lib/storage";

export default function CollegeDashboard() {
  const user = getUser();

  return (
    <main className="space-y-10">
      <Navbar />
      <h1 className="text-3xl font-bold">College Dashboard</h1>
      <p className="text-slate-600">Welcome {user?.name} ({user?.collegeCourse})</p>

      <div className="grid md:grid-cols-3 gap-6">
        <ProfileCard />
        <BadgeCard />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            type="comic"
            title="Climate 2050"
            desc="Explore future climate scenarios."
          />
          <ModuleCard
            type="game"
            title="Survival Earth"
            desc="Balance economy and environment as a policymaker."
          />
          <ModuleCard
            type="quiz"
            title="Energy Simulation"
            desc="Test your decisions on renewable vs non-renewable energy."
          />
        </div>
      </section>
    </main>
  );
}
