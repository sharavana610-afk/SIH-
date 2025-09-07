import { NextResponse } from "next/server";

// -----------------------------
// Future FastAPI integration
// -----------------------------
// const API_BASE = "http://127.0.0.1:8000"; // replace with backend URL

// -----------------------------
// Temporary Local Storage (Mock DB)
// -----------------------------
const users: { email: string; name: string; password: string }[] = [];

// -----------------------------
// GET Handler
// -----------------------------
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  // -------- Local Mock Version --------
  if (email) {
    const exists = users.some((u) => u.email === email);
    return NextResponse.json({ exists });
  }
  return NextResponse.json({ users });

  // -------- Future FastAPI Version --------
  /*
  const res = await fetch(
    email ? `${API_BASE}/users?email=${email}` : `${API_BASE}/users`
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
  */
}

// -----------------------------
// POST Handler
// -----------------------------
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  // -------- Local Mock Version --------
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = users.some((u) => u.email === email);
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  users.push({ name, email, password });
  return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  // -------- Future FastAPI Version --------
  /*
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
  */
}
