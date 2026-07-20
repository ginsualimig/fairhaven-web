import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/agentmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, propertyAddress, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      propertyAddress?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and a message." },
        { status: 400 }
      );
    }

    await sendNotificationEmail({
      subject: `Property Management enquiry from ${name} — Fairhaven website`,
      text: [
        "New enquiry submitted via the Property Management Enquiry form on fairhavenproperty.co.nz",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        propertyAddress ? `Property / listing: ${propertyAddress}` : null,
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
    console.error("PM enquiry form error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please email us directly instead." },
      { status: 500 }
    );
  }
}
