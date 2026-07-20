const GITHUB_API = "https://api.github.com";

function config() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/name"
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN / GITHUB_REPO are not configured.");
  }
  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "fairhaven-web-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function listInsightSlugs(): Promise<string[]> {
  const { token, repo, branch } = config();
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/content/insights?ref=${branch}`, {
    headers: headers(token),
    cache: "no-store",
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list failed: ${res.status} ${await res.text()}`);
  const data: Array<{ name: string; type: string }> = await res.json();
  return data.filter((f) => f.type === "file" && f.name.endsWith(".md")).map((f) => f.name.replace(/\.md$/, ""));
}

export async function createInsightFile(slug: string, content: string, commitMessage: string): Promise<void> {
  const { token, repo, branch } = config();
  const path = `content/insights/${slug}.md`;
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content, "utf-8").toString("base64"),
      branch,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub commit failed: ${res.status} ${await res.text()}`);
  }
}
