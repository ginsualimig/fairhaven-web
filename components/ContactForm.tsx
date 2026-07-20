"use client";

import { useState, FormEvent } from "react";

interface FieldConfig {
  endpoint: string;
  extraField?: { name: string; label: string; placeholder: string };
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
}

export default function ContactForm({
  endpoint,
  extraField,
  messageLabel = "How can we help?",
  messagePlaceholder = "Tell us a little about what you're looking for…",
  submitLabel = "Send Message",
}: FieldConfig) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", extra: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const payload: Record<string, string> = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };
      if (extraField) payload[extraField.name] = values.extra;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setValues({ name: "", email: "", phone: "", extra: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again, or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-teal/30 bg-teal/5 p-8 text-center">
        <p className="text-navy font-serif text-xl mb-2">Message sent.</p>
        <p className="text-stone text-sm">
          Thanks for reaching out — a member of the Fairhaven team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={values.name}
            onChange={update("name")}
            className="w-full rounded-sm border border-stone/25 px-4 py-3 text-sm text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
            className="w-full rounded-sm border border-stone/25 px-4 py-3 text-sm text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone <span className="text-stone/60 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
            className="w-full rounded-sm border border-stone/25 px-4 py-3 text-sm text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
          />
        </div>
        {extraField && (
          <div>
            <label htmlFor="extra" className="block text-sm font-medium text-navy mb-1.5">
              {extraField.label}
            </label>
            <input
              id="extra"
              type="text"
              placeholder={extraField.placeholder}
              value={values.extra}
              onChange={update("extra")}
              className="w-full rounded-sm border border-stone/25 px-4 py-3 text-sm text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
          {messageLabel}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={update("message")}
          className="w-full rounded-sm border border-stone/25 px-4 py-3 text-sm text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-sm bg-teal px-8 py-3.5 text-sm font-semibold text-white hover:bg-teal/90 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
