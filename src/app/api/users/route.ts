import { NextResponse } from "next/server";

const users: { email: string; name: string; password: string }[] = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (email) {
    const exists = users.some((u) => u.email === email);
    return NextResponse.json({ exists });
  }

  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = users.some((u) => u.email === email);
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  users.push({ name, email, password });
  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}
