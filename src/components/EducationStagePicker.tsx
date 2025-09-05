"use client";
import { useState } from "react";

export type EducationStage = "school" | "college";
export type SchoolLevel = "primary" | "secondary" | "higher";

export default function EducationStagePicker({
  onChange,
}: {
  onChange: (stage: EducationStage, level?: SchoolLevel, course?: string) => void;
}) {
  const [stage, setStage] = useState<EducationStage | "">("");
  const [level, setLevel] = useState<SchoolLevel | "">("");
  const [course, setCourse] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          type="button"
          className={`flex-1 rounded-xl border p-3 ${stage === "school" ? "border-emerald-600 bg-emerald-50" : ""}`}
          onClick={() => {
            setStage("school");
            setLevel("");
            onChange("school");
          }}
        >
          School
        </button>
        <button
          type="button"
          className={`flex-1 rounded-xl border p-3 ${stage === "college" ? "border-emerald-600 bg-emerald-50" : ""}`}
          onClick={() => {
            setStage("college");
            setLevel("");
            onChange("college");
          }}
        >
          College
        </button>
      </div>

      {stage === "school" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["primary", "secondary", "higher"] as SchoolLevel[]).map((opt) => (
            <button
              key={opt}
              type="button"
              className={`rounded-xl border p-3 capitalize ${level === opt ? "border-emerald-600 bg-emerald-50" : ""}`}
              onClick={() => {
                setLevel(opt);
                onChange("school", opt);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {stage === "college" && (
        <input
          placeholder="Course/Branch (e.g., BSc Biology)"
          className="w-full rounded-xl border p-3"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            onChange("college", undefined, e.target.value);
          }}
        />
      )}
    </div>
  );
}
