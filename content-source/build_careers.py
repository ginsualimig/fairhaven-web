#!/usr/bin/env python3
import re
import os
import json

SRC_DIR = "extracted"
OUT_DIR = "../content/careers"
os.makedirs(OUT_DIR, exist_ok=True)

# slug -> (title, location, applyEmail)
ROLES = [
    ("investor-relations-manager", "Investor Relations Manager", "Hybrid - Dunedin, Otago, New Zealand / Remote", "careers@fairhavenproperty.co.nz"),
    ("investor-relations-associate", "Investor Relations Associate", "Hybrid - Kuala Lumpur, Malaysia / Remote", "careers@fairhavenproperty.co.nz"),
    ("financial-analyst", "Financial Analyst", "Hybrid - Kuala Lumpur, Malaysia / Remote", "careers@fairhavenproperty.co.nz"),
    ("executive-assistant", "Executive Assistant", "Hybrid - Dunedin, Otago, New Zealand / Remote", "careers@fairhavenproperty.co.nz"),
    ("property-manager", "Property Manager", "Hybrid - Dunedin, Otago, New Zealand / Remote", "kate@loganhr.co.nz"),
]

END_MARKER = "We thank you for your understanding and patience throughout the selection process."

count = 0
for slug, title, location, email in ROLES:
    src_path = os.path.join(SRC_DIR, f"careers_{slug}.md")
    text = open(src_path, encoding="utf-8").read()
    m = re.search(r"## Body Copy:\s*(.*?)\n## Nav/Footer Items:", text, re.S)
    if not m:
        print(f"NO BODY for {slug}")
        continue
    body = m.group(1)
    # Trim trailing "related roles" teaser headings after the end marker
    idx = body.find(END_MARKER)
    if idx != -1:
        body = body[: idx + len(END_MARKER)]
    body = body.strip()
    fm = (
        "---\n"
        f"slug: {json.dumps(slug)}\n"
        f"title: {json.dumps(title)}\n"
        f"location: {json.dumps(location)}\n"
        f"applyEmail: {json.dumps(email)}\n"
        "---\n\n"
    )
    with open(os.path.join(OUT_DIR, f"{slug}.md"), "w", encoding="utf-8") as f:
        f.write(fm + body + "\n")
    count += 1

print(f"Wrote {count} career content files to {OUT_DIR}")
