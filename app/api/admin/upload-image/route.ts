import { NextResponse } from "next/server";
import { uploadBlogImage } from "@/lib/github";
import { slugify } from "@/lib/slugify";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const { filename, dataUrl } = await request.json().catch(() => ({ filename: "", dataUrl: "" }));

  if (typeof dataUrl !== "string") {
    return NextResponse.json({ error: "No image data received." }, { status: 400 });
  }

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "Image data was not in the expected format." }, { status: 400 });
  }

  const [, mimeType, base64] = match;
  const ext = ALLOWED_TYPES[mimeType];
  if (!ext) {
    return NextResponse.json({ error: "Only PNG, JPEG, WEBP or GIF images are supported." }, { status: 400 });
  }

  const approxBytes = (base64.length * 3) / 4;
  if (approxBytes > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 8MB)." }, { status: 400 });
  }

  const baseName = slugify((filename || "image").replace(/\.[^.]+$/, "")) || "image";
  const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const finalFilename = `${baseName}-${unique}.${ext}`;

  try {
    const path = await uploadBlogImage(finalFilename, base64, `Upload blog image: ${finalFilename}`);
    return NextResponse.json({ ok: true, path });
  } catch (err) {
    return NextResponse.json({ error: `Could not upload to GitHub: ${(err as Error).message}` }, { status: 502 });
  }
}
