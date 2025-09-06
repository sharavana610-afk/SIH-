"use client";

type ModuleCardProps = {
  title: string;
  desc: string;
  type: "comic" | "game" | "quiz";
};

export default function ModuleCard({ title, desc, type }: ModuleCardProps) {
  const color =
    type === "comic"
      ? "bg-pink-100 text-pink-700"
      : type === "game"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="rounded-2xl border bg-white/70 p-5 shadow-sm hover:shadow-md transition">
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${color}`}>
        {type.toUpperCase()}
      </span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}

