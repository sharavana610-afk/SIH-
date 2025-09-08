// src/services/api.ts
// Frontend helper for calling your backend.
//
// Default behavior (no env): calls local Next.js API routes under /api/*
// To switch to a FastAPI server later, either set NEXT_PUBLIC_API_BASE / NEXT_PUBLIC_API_PREFIX
// in .env.local, or uncomment the example API_BASE / API_PREFIX lines below.

/* ---------- QUICK SWITCH (example) ----------
 // UNCOMMENT and edit when you want to call a FastAPI directly:
 // const API_BASE = "http://127.0.0.1:8000";
 // const API_PREFIX = ""; // or "/api" if your FastAPI uses /api/* paths
--------------------------------------------- */

const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
const RAW_API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX; // if undefined -> default to "/api"

function normalizePrefix(raw?: string) {
  if (!raw) return "";        // empty means no prefix
  if (!raw.startsWith("/")) raw = "/" + raw;
  return raw.replace(/\/$/, ""); // remove trailing slash
}

const API_BASE = RAW_API_BASE.replace(/\/$/, ""); // e.g. "http://127.0.0.1:8000" or ""
const API_PREFIX = normalizePrefix(RAW_API_PREFIX ?? "/api"); // default "/api" for Next routes

function buildUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  if (API_BASE) {
    // When using an external backend: BASE + PREFIX + path
    // Example results:
    //  - API_BASE=http://127.0.0.1:8000, API_PREFIX="" -> http://127.0.0.1:8000/profile
    //  - API_BASE=http://127.0.0.1:8000, API_PREFIX="/api" -> http://127.0.0.1:8000/api/profile
    return `${API_BASE}${API_PREFIX}${path}`;
  }
  // No external base -> use relative Next API routes: /api/profile (because default prefix is "/api")
  return `${API_PREFIX}${path}`;
}

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

/* ---------- Example endpoints your front-end will call.
   Make sure your server (Next.js API routes or FastAPI) provides these paths:

   GET  /api/profile
   GET  /api/modules
   GET  /api/rankings
   GET  /api/quiz/:moduleId
   POST /api/quiz/:moduleId/submit   (body: { answers: {...} })

   If your FastAPI uses different path names, either:
   - set NEXT_PUBLIC_API_PREFIX to the correct prefix, or
   - change the paths below to match your backend.
*/

export async function getProfile() {
  const res = await fetch(buildUrl("/profile"));
  return handleRes(res);
}

export async function getModules() {
  const res = await fetch(buildUrl("/modules"));
  return handleRes(res);
}

export async function getRankings() {
  const res = await fetch(buildUrl("/rankings"));
  return handleRes(res);
}

export async function getQuiz(moduleId: string) {
  const res = await fetch(buildUrl(`/quiz/${moduleId}`));
  return handleRes(res);
}

export async function submitQuizAnswers(moduleId: string, answers: Record<string, unknown>) {
  const res = await fetch(buildUrl(`/quiz/${moduleId}/submit`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  return handleRes(res);
}
