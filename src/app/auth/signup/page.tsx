"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import EducationStagePicker, { EducationStage, SchoolLevel } from "../../../components/EducationStagePicker";
import { saveUser } from "../../../lib/storage";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<EducationStage | undefined>();
  const [level, setLevel] = useState<SchoolLevel | undefined>();
  const [course, setCourse] = useState<string | undefined>();

  const handleStage = (s: EducationStage, l?: SchoolLevel, c?: string) => {
    setStage(s);
    setLevel(l);
    setCourse(c);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !stage) return alert("Fill all required fields");

    saveUser({
      name,
      email,
      stage,
      schoolLevel: level,
      collegeCourse: course,
      xp: 1200,
      badges: ["Eco Beginner", "Tree Planter"],
    });

    router.push("/survey");
  };

  return (
    <main className="space-y-10">
      <Navbar />
      <form
        onSubmit={submit}
        className="mx-auto max-w-xl space-y-5 rounded-2xl border p-6 bg-white/70 shadow-sm"
      >
        <h2 className="text-2xl font-bold">Create your account</h2>
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <label className="text-sm font-medium">Education Stage</label>
          <EducationStagePicker onChange={handleStage} />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 text-white hover:bg-emerald-700"
        >
          Continue to Survey
        </button>
      </form>
    </main>
  );
}

