"use client";
import { useEffect, useState } from "react";

//src/components/ModuleCard.tsx

// ✅ Define the structure of a learning module
interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: "comic" | "game" | "quiz";
  enrolled: boolean;
  progress: number; // 0 - 100
}

export default function LearningModulesComponent() {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(false);

  // ========================
  // ✅ Fetch all learning modules (GET)
  // ========================
  const fetchModules = async () => {
    setLoading(true);
    try {
      // 🔗 Replace with your FastAPI endpoint later
      // const res = await fetch("http://localhost:8000/api/modules");
      // const data = await res.json();
      // setModules(data);

      // 🔧 Placeholder data for now
      setModules([
        {
          id: "1",
          title: "Eco Explorers Comic",
          description: "Learn about Earth through a fun comic story.",
          type: "comic",
          enrolled: false,
          progress: 0,
        },
        {
          id: "2",
          title: "Recycling Challenge",
          description: "Interactive game about recycling waste correctly.",
          type: "game",
          enrolled: true,
          progress: 40,
        },
      ]);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // ✅ Enroll in a module (POST)
  // ========================
  const enrollModule = async (moduleId: string) => {
    try {
      // 🔗 Replace with FastAPI POST request
      // await fetch(`http://localhost:8000/api/modules/${moduleId}/enroll`, { method: "POST" });

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, enrolled: true, progress: 0 } : m
        )
      );
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // ========================
  // ✅ Update progress (PUT)
  // ========================
  const updateProgress = async (moduleId: string, newProgress: number) => {
    try {
      // 🔗 Replace with FastAPI PUT request
      // await fetch(`http://localhost:8000/api/modules/${moduleId}/progress`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ progress: newProgress }),
      // });

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, progress: newProgress } : m
        )
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📚 Learning Modules</h2>

      {loading && <p className="text-gray-500">Loading modules...</p>}

      {!loading && modules.length === 0 && (
        <p className="text-gray-500">No modules available right now.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-2xl p-4 shadow hover:scale-[1.01] transition-transform"
          >
            <h3 className="font-semibold text-lg">{module.title}</h3>
            <p className="text-sm text-gray-500">{module.description}</p>

            {/* ✅ Enroll button if not enrolled */}
            {!module.enrolled ? (
              <button
                onClick={() => enrollModule(module.id)}
                className="mt-3 px-3 py-1 rounded bg-emerald-600 text-white"
              >
                Enroll Now
              </button>
            ) : (
              <div className="mt-3">
                {/* ✅ Show progress if enrolled */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-emerald-600 h-3 rounded-full"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Progress: {module.progress}%
                </p>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() =>
                      updateProgress(module.id, Math.min(module.progress + 10, 100))
                    }
                    className="flex-1 rounded px-3 py-1 bg-emerald-500 text-white"
                  >
                    +10% Progress
                  </button>
                  <button className="flex-1 rounded px-3 py-1 bg-emerald-700 text-white">
                    Start {module.type === "comic" ? "Reading" : "Playing"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
