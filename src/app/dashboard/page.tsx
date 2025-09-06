"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";

export default function DashboardPage() {
  return (
    <main className="space-y-10">
      <Navbar />

      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <ProfileCard />
        <BadgeCard />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Learning Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            type="comic"
            title="Super Tree Saves the Day"
            desc="A comic about how trees clean the air."
          />
          <ModuleCard
            type="game"
            title="Eco Run"
            desc="Collect water drops, avoid plastic waste!"
          />
          <ModuleCard
            type="quiz"
            title="Climate Change Basics"
            desc="Test your knowledge with fun questions."
          />
        </div>
      </section>
    </main>
  );
}

