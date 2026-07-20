import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/agentmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and a message." },
        { status: 400 }
      );
    }

    await sendNotificationEmail({
      subject: `New enquiry from ${name} — Fairhaven website`,
      text: [
        "New enquiry submitted via the Contact Us form on fairhavenproperty.co.nz",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please email us directly instead." },
      { status: 500 }
    );
  }
}
