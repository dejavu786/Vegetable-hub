import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim();
  // Honeypot: a hidden field real visitors never fill in.
  const honeypot = String(body?.company ?? "");

  if (honeypot) {
    return NextResponse.json({ message: "Thanks for subscribing!" });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { message: "Sign-ups aren't connected yet. Please try again soon." },
      { status: 503 }
    );
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase!.from("subscribers").insert({ email });

  if (error && error.code !== "23505" /* unique_violation: already subscribed */) {
    console.error("Newsletter subscribe failed:", error.message);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "You're subscribed — welcome to Fresh Fields!" });
}
