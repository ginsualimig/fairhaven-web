#!/usr/bin/env python3
"""
Transform crawled extracted/*.md files for News & Insights articles into
content/insights/<slug>.md with YAML frontmatter, for use by the Next.js build.
"""
import re
import os
import json

SRC_DIR = "extracted"
OUT_DIR = "../content/insights"
os.makedirs(OUT_DIR, exist_ok=True)

# slug -> (title, meta_title, meta_description, author, iso_date, image, image_alt)
POSTS = [
    ("while-you-were-waiting", "While You Were Waiting: The Recovery Window Is Already Open, and What It Costs to Stay on the Sidelines", "Daarshan Kunasegaran", "2026-06-17", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1781610899748-9TW7MPQXIHRUIU35J556/unsplash-image-LDmOZz087vg.jpg"),
    ("new-money", "The New Architecture of Money: How Digital Identity, Programmable Currency, and the Infrastructure Arms Race Are Reshaping Capital in 2026", "Daarshan Kunasegaran", "2026-05-20", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1779029934204-FU0FAD90C9Y3O9MEWF9I/unsplash-image-yXNOqgvbTEc.jpg"),
    ("the-cost-of-waiting", "The Cost of Waiting: Capital Positioning in a Gradual Recovery", "Daarshan Kunasegaran", "2026-04-15", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1776227900665-06SNIPSANUWH5BT96C3V/unsplash-image-09g9LB4sajE.jpg"),
    ("from-oil-to-tokenisation-how-conflict-is-reshaping-control-over-money", "From Oil to Tokenisation: How Conflict Is Reshaping Control Over Money", "Daarshan Kunasegaran", "2026-03-13", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1773288316980-A98ZNKTTHQ1WYOJM6KMB/unsplash-image-g6DmKxFoQfE.jpg"),
    ("is-the-debt-based-system-breaking", "Gold, Bitcoin, Property & The Debt-Based Paradox: What Survives When Leverage Gets Tested", "Daarshan Kunasegaran", "2026-02-17", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1771229476351-MRFJJS755TK9TZI3F76M/unsplash-image-4yPFKV9y5EI.jpg"),
    ("tankers-heavycrude-power", "From Tech Wars to Tankers: How Power Is Being Tested Through Systems, Supply Chains, and Enforcement in 2026", "Daarshan Kunasegaran", "2026-01-15", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1768283383215-6ARP5FTXQXB05J8772GJ/unsplash-image-U9_pRASawlc.jpg"),
    ("chinavsjapan", "China vs Japan: The Rivalry Reshaping Global Capital, Currencies, and Real Assets", "Daarshan Kunasegaran", "2025-12-19", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1766219356495-WWWZRYZT025B6LXK4QNS/unsplash-image-rkRAsi0R8to.jpg"),
    ("are-we-in-an-ai-bubble", "Are We in an AI Bubble? What Overcrowded Tech Trades and Falling Rates Mean for Real-Asset Investors", "Daarshan Kunasegaran", "2025-11-18", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1763268067539-FVM0R0BVMI5SD60C57CO/unsplash-image-HvkmgKaw1R4.jpg"),
    ("ai-spillover-real-estate-behind-the-intelligence-booma", "AI Spillover: Real-Estate Behind the Intelligence Boom", "Daarshan Kunasegaran", "2025-10-16", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1760496406315-GJVCNXOEJ7J19YNDJ1LT/unsplash-image-DkfnGxoy5NI.jpg"),
    ("sept-2025-nz-golden-visa", "New Zealand's Golden Visa: Capital Migration as a Hedge", "Daarshan Kunasegaran", "2025-09-20", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1758052560207-N4TTDINEVYVRCEH0W6OS/unsplash-image-z1Lgo_jDbfw.jpg"),
    ("august-2025-really-losing-kiwis", "Is New Zealand Really Losing Kiwis? Migration Myths, Macro Shifts, and the Investment Signals Beneath the Surface", "Daarshan Kunasegaran", "2025-08-16", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1755231458434-J24161QQEBA6025AZUAI/unsplash-image-hCdMjrL5C0Y.jpg"),
    ("july-2025-why-is-everyone-buying-gold", "Why Is Everyone Buying Gold? Capital Preservation in a Fractured World", "Daarshan Kunasegaran", "2025-07-15", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1751937393181-YL7P5HHFV7GSAQ9J6O22/unsplash-image-qUAelo5y0lg.jpg"),
    ("june-2025-trumps-one-big-beautiful-bill-catalyst-or-chaos-for-global-investors", "Trump's “One Big Beautiful Bill” — Catalyst or Chaos for Global Investors?", "Daarshan Kunasegaran", "2025-06-17", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1750077419342-HXF1UE9S3XIQBCI9821E/unsplash-image-QEDXqtje6fw.jpg"),
    ("may-2025-outlook-and-aip-visa-enhancements", "May 2025 Outlook and AIP Visa Enhancements", "Daarshan Kunasegaran", "2025-05-15", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1747108620511-0XFRR8047NLC2IHE276S/unsplash-image-QO0fh0FenLU.jpg"),
    ("post-pandemic-office-trends-a-shift-toward-flexibility-and-emerging-opportunities", "Post-Pandemic Office Trends: A Shift Toward Flexibility and Emerging Opportunities", "Marcel Choo", "2024-10-11", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/90c71e30-c31a-4cbd-b126-59e2e238b2fd/istockphoto-469299490-2048x2048.jpg"),
    ("the-great-urban-migration-why-smaller-cities-beckon", "The Great Urban Migration: Why Smaller Cities Beckon", "Petrus Yen", "2023-06-28", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1687948966567-8NE459DIC3EPKPQCISDB/image-asset.jpeg"),
    ("unveiling-property-investment-choices-in-new-zealand-self-management-vs-property-funds", "Unveiling Property Investment Choices in New Zealand: Self-Management vs. Property Funds", "Petrus Yen", "2023-06-28", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1687870448090-GZIBV36S1I0PHZ8QT58F/image-asset.jpeg"),
    ("dunedin-real-estate-market-insights-unveiling-opportunities-for-investors", "Dunedin Real Estate Market Insights: Unveiling Opportunities for Investors", "Petrus Yen", "2023-06-17", "https://images.squarespace-cdn.com/content/v1/648907a5eeda1944bf418848/1687870521108-7I6RUUR8XPSE49TS1AJ3/image-asset.jpeg"),
]

def extract_section(text, name, next_names):
    # Handles both "## Name:\n\ncontent" and "## Name: content" styles
    pattern = rf"## {re.escape(name)}:\s*(.*?)(?=\n##\s*(?:{'|'.join(next_names)})\s*:|\Z)"
    m = re.search(pattern, text, re.S)
    return m.group(1).strip() if m else ""

count = 0
for slug, title, author, date, image in POSTS:
    src_path = os.path.join(SRC_DIR, f"news-insights_{slug}.md")
    if not os.path.exists(src_path):
        print(f"MISSING SOURCE: {src_path}")
        continue
    text = open(src_path, encoding="utf-8").read()
    meta_desc = extract_section(text, "Meta Description", ["Author", "Published Date", "Body Copy"])
    body = extract_section(text, "Body Copy", ["Images", "Nav/Footer Items"])
    # strip leading blank line sometimes left by extraction
    body = body.strip()
    if not body:
        print(f"EMPTY BODY for {slug}")
    fm = (
        "---\n"
        f"slug: {json.dumps(slug)}\n"
        f"title: {json.dumps(title)}\n"
        f"metaDescription: {json.dumps(meta_desc)}\n"
        f"author: {json.dumps(author)}\n"
        f"date: {json.dumps(date)}\n"
        f"image: {json.dumps(image)}\n"
        "---\n\n"
    )
    out_path = os.path.join(OUT_DIR, f"{slug}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(fm + body + "\n")
    count += 1

print(f"Wrote {count} article content files to {OUT_DIR}")
