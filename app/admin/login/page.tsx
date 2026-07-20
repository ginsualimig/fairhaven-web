"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg p-8 shadow-xl">
        <div className="text-gold font-serif font-bold text-xl mb-1">Fairhaven</div>
        <h1 className="text-navy font-serif text-lg font-semibold mb-6">Blog Admin</h1>

        <label className="block text-sm font-medium text-navy mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-stone/30 px-4 py-2.5 mb-4 text-navy focus:outline-none focus:ring-2 focus:ring-teal/50"
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-md bg-teal text-white font-semibold py-2.5 hover:bg-teal/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
