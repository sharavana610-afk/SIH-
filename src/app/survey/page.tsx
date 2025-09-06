"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const questions = [
  {
    id: 1,
    text: "How do you prefer to learn about the environment?",
    options: ["Comics", "Games", "Quizzes", "Real-world Activities"],
  },
  {
    id: 2,
    text: "Which eco-topic excites you the most?",
    options: ["Climate Change", "Wildlife", "Waste Management", "Water Conservation"],
  },
  {
    id: 3,
    text: "Do you like learning in groups or individually?",
    options: ["Groups", "Individually", "Both"],
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In future: save survey answers to backend
    console.log("Survey Answers:", answers);
    router.push("/dashboard");
  };

  return (
    <main className="space-y-10">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl space-y-6 rounded-2xl border p-6 bg-white/70 shadow-sm"
      >
        <h2 className="text-2xl font-bold">Quick Survey</h2>
        <p className="text-slate-600">Help us personalize your GreenSpark experience 🌱</p>

        {questions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium">{q.text}</p>
            <div className="flex flex-wrap gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(q.id, opt)}
                  className={`rounded-xl border px-4 py-2 text-sm ${
                    answers[q.id] === opt
                      ? "border-emerald-600 bg-emerald-50"
                      : "hover:bg-emerald-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 text-white hover:bg-emerald-700"
        >
          Continue to Dashboard
        </button>
      </form>
    </main>
  );
}

