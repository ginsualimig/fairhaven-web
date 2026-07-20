import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName } = body as { email?: string; firstName?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !serverPrefix || !audienceId) {
      console.error("Mailchimp is not configured (missing API key, server prefix, or audience ID).");
      return NextResponse.json(
        { error: "Newsletter signup is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

    const res = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: firstName ? { FNAME: firstName } : undefined,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.error("Mailchimp subscribe failed:", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't complete your signup. Please try again or email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
