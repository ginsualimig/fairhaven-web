/**
 * Minimal AgentMail REST client for transactional notification emails
 * (Contact Us + Property Management Enquiry forms).
 *
 * Requires env vars:
 *  - AGENTMAIL_API_KEY
 *  - AGENTMAIL_INBOX      (sender inbox, e.g. "artiep@agentmail.to")
 *  - CONTACT_NOTIFY_EMAIL (where form notifications are delivered, e.g. petrus@fairhavenproperty.co.nz)
 */
export async function sendNotificationEmail({
  subject,
  text,
  html,
  replyTo,
}: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  const inbox = process.env.AGENTMAIL_INBOX;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !inbox || !to) {
    throw new Error(
      "Email notification is not configured (missing AGENTMAIL_API_KEY, AGENTMAIL_INBOX, or CONTACT_NOTIFY_EMAIL)."
    );
  }

  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [to],
        subject,
        text,
        html,
        reply_to: replyTo ? [replyTo] : undefined,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AgentMail send failed (${res.status}): ${body}`);
  }

  return res.json();
}
