"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";
import { getUser } from "@/lib/storage";

export default function PrimaryDashboard() {
  const user = getUser();

  return (
    <main className="space-y-10">
      <Navbar />
      <h1 className="text-3xl font-bold">Primary School Dashboard</h1>
      <p className="text-slate-600">Hello {user?.name}! 🌱</p>

      <div className="grid md:grid-cols-3 gap-6">
        <ProfileCard />
        <BadgeCard />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            type="comic"
            title="Super Tree Saves the Day"
            desc="Learn how trees help keep air clean."
          />
          <ModuleCard
            type="game"
            title="Waste Sorting Game"
            desc="Drag & drop waste into the right bins!"
          />
        </div>
      </section>
    </main>
  );
}
