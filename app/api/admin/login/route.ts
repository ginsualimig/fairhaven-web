import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  if (typeof password !== "string" || password !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
