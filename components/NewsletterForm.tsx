"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <p className={`text-sm ${isDark ? "text-teal" : "text-teal"} font-medium ${className}`}>
        Thanks — you&apos;re on the list. Keep an eye on your inbox for our next market update.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`} noValidate>
      <label htmlFor="newsletter-firstname" className="sr-only">
        First name
      </label>
      <input
        id="newsletter-firstname"
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={`flex-1 rounded-sm px-4 py-3 text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 ${
          isDark
            ? "bg-white/5 border-offwhite/20 text-offwhite placeholder:text-offwhite/40"
            : "bg-white border-stone/20 text-navy placeholder:text-stone/50"
        }`}
      />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 rounded-sm px-4 py-3 text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 ${
          isDark
            ? "bg-white/5 border-offwhite/20 text-offwhite placeholder:text-offwhite/40"
            : "bg-white border-stone/20 text-navy placeholder:text-stone/50"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal/90 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "Signing up…" : "Keep Me Updated"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 sm:absolute sm:mt-14" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
