import { NextResponse } from "next/server";

// B1G1's counter endpoint has no CORS headers, so we proxy it server-side.
// Cached for an hour — this number moves slowly and doesn't need to be
// fetched fresh on every page load.
export async function GET() {
  try {
    const res = await fetch("https://businessesforgood.com/ImpactCounter.php", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    const data = await res.json();
    const totalImpact = Number(data?.[0]?.totalImpact);
    if (!Number.isFinite(totalImpact)) throw new Error("Unexpected response shape");
    return NextResponse.json({ totalImpact });
  } catch {
    return NextResponse.json({ totalImpact: null }, { status: 200 });
  }
}
