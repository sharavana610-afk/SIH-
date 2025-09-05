import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <main className="space-y-10">
      <Navbar />
      <section className="grid md:grid-cols-2 gap-8 items-center mt-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Learn Green, Play Bold —{" "}
            <span className="text-emerald-600">GreenSpark</span>
          </h1>
          <p className="mt-4 text-slate-700">
            Gamified environmental learning with comics, games, quizzes &
            real-world activities.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="/auth/signup"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
            >
              Get Started
            </a>
            <a
              href="/auth/signin"
              className="rounded-xl border px-5 py-3 hover:bg-emerald-50"
            >
              I already have an account
            </a>
          </div>
        </div>
        <div className="rounded-3xl border bg-white/70 p-6 text-sm text-slate-600">
          <ul className="space-y-3">
            <li>✔️ Age-tailored tracks: Primary, Secondary, Higher Secondary</li>
            <li>✔️ Comics + Simulation games + Quizzes</li>
            <li>✔️ Eco-Points, Badges, and Leaderboards</li>
            <li>✔️ Community for sharing eco-actions</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
