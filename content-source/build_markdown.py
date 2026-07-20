#!/usr/bin/env python3
import json, os, re

EXTRACTED = "/Users/petrusyen/.openclaw/workspace/fairhaven-web/content-source/extracted"

with open(os.path.join(EXTRACTED, "_raw_extract.json"), encoding="utf-8") as f:
    DATA = json.load(f)

NAV_FOOTER_NOTE = """- Skip to Content -> #page
- About Us -> /about-us
- Careers -> /careers
- Charity Initiatives -> /charity-initiatives
- News & Insights -> /news-insights
- Contact us -> https://www.fairhavenproperty.co.nz/contact-us
- (Footer) Contact Us -> https://www.fairhavenproperty.co.nz/contact-us
- (Footer) Privacy Policy -> https://www.fairhavenproperty.co.nz/privacy-policy
- (Footer) Copyright line: "© Fairhaven Property Group. All rights reserved."
"""

# Known HubSpot embedded forms discovered per-page (portalId is constant: 45420862)
HUBSPOT_FORMS = {
    "home": "640832ad-9260-4ba3-bbaa-6024819a52ee",
    "home-1": "640832ad-9260-4ba3-bbaa-6024819a52ee",
    "discretionary-fund": "640832ad-9260-4ba3-bbaa-6024819a52ee",
    "contact-us": "c3587671-a08a-4cbd-a8af-cbd4e79dec5f",
    "pm-enquiry": "a6c41811-e5b6-4950-8138-e84671b1e98a",
}

# mailto-based "apply" forms found on careers subpages
MAILTO_FORMS = {
    "careers_executive-assistant": "mailto:careers@fairhavenproperty.co.nz?subject=Application%3A%20Executive%20Assistant",
    "careers_financial-analyst": "mailto:careers@fairhavenproperty.co.nz?subject=Application%3A%20Financial%20Analyst",
    "careers_investor-relations-associate": "mailto:kate@loganhr.co.nz?subject=Application%3A%20Property%20Manager",
    "careers_investor-relations-manager": "mailto:careers@fairhavenproperty.co.nz?subject=Application",
    "careers_property-manager": "mailto:kate@loganhr.co.nz?subject=Application%3A%20Property%20Manager",
}

LEGAL_KEYWORDS = ["important disclaimer", "wholesale investor", "financial markets conduct act",
                  "financial markets authority", "privacy policy", "personal information"]

def get_legal_section(slug, r):
    body = r["body_text"]
    low = body.lower()

    if slug == "privacy-policy":
        return body  # entire page is legal text

    blocks = []

    if slug == "home":
        idx = body.find("#### Important Disclaimer")
        if idx == -1:
            idx = low.find("important disclaimer")
        end_marker = "The information above is subject to the laws and regulations of New Zealand."
        end_idx = body.find(end_marker)
        if idx != -1 and end_idx != -1:
            blocks.append(body[idx:end_idx + len(end_marker)])

    if slug == "discretionary-fund":
        start_marker = '*This opportunity is available exclusively to "Wholesale Investors"'
        idx = body.find(start_marker)
        end_marker = "It should not be the sole basis for any investment decision."
        end_idx = body.find(end_marker)
        if idx != -1 and end_idx != -1:
            blocks.append(body[idx:end_idx + len(end_marker)])

    if not blocks:
        return "None"
    return "\n\n---\n\n".join(blocks)

def get_forms_section(slug, r):
    lines = []
    if slug in HUBSPOT_FORMS:
        lines.append(
            f"- HubSpot embedded form (loaded client-side via `//js.hsforms.net/forms/embed/v2.js`; "
            f"field definitions are NOT present in the static HTML/curl output and are fetched at runtime "
            f"from HubSpot's servers).\n"
            f"  - `hbspt.forms.create({{ region: \"na1\", portalId: \"45420862\", formId: \"{HUBSPOT_FORMS[slug]}\" }})`\n"
            f"  - Submit behavior: handled entirely by HubSpot's embed script (AJAX submit to HubSpot, no native `<form action>` visible in source)."
        )
    if slug in MAILTO_FORMS:
        lines.append(
            f"- No HTML `<form>`; \"Apply\" is a `mailto:` link.\n"
            f"  - `href=\"{MAILTO_FORMS[slug]}\"`\n"
            f"  - Behavior: opens the user's email client addressed to the listed recipient with a pre-filled subject line; no in-page form fields, name/CV/cover-letter are submitted as free-form email attachments/body per the surrounding instructions text."
        )
    if not lines:
        return "None"
    return "\n".join(lines)

def get_images_section(r):
    imgs = r["images"]
    if not imgs:
        return "None"
    lines = []
    for src, alt in imgs:
        lines.append(f"- {src} | alt=\"{alt}\"")
    return "\n".join(lines)

PAGE_PURPOSE = {
    "home": "Primary homepage — investment pitch for wholesale investors, NZ real estate opportunities",
    "home-1": "Alternate/secondary homepage variant (\"Version 2\") — similar investment pitch, different layout/copy",
    "about-us": "Company overview — team/expertise positioning",
    "discretionary-fund": "Discretionary Fund Management product page — fund terms, targeted returns, sample assets, wholesale-investor disclaimer",
    "charity-initiatives": "Charity/community initiatives page",
    "contact-us": "General contact form (HubSpot embed)",
    "pm-enquiry": "Property management enquiry form (HubSpot embed) for tenants/property queries",
    "privacy-policy": "Full Privacy Policy legal text",
    "careers": "Careers landing page listing open roles",
    "careers_executive-assistant": "Job listing: Executive Assistant",
    "careers_financial-analyst": "Job listing: Financial Analyst",
    "careers_investor-relations-associate": "Job listing: Investor Relations Associate",
    "careers_investor-relations-manager": "Job listing: Investor Relations Manager",
    "careers_property-manager": "Job listing: Property Manager",
}

def build_md(slug):
    r = DATA[slug]
    url = r["url"]
    title = r["title"]
    desc = r["desc"] or "(none found)"
    body = r["body_text"]
    images_section = get_images_section(r)
    forms_section = get_forms_section(slug, r)
    legal_section = get_legal_section(slug, r)

    md = f"""# URL: {url}

## Meta Title:
{title}

## Meta Description:
{desc}

## Body Copy:
{body}

## Nav/Footer Items:
(Persistent header nav + footer links, identical across all crawled pages — listed once here)
{NAV_FOOTER_NOTE}

## Images:
{images_section}

## Forms:
{forms_section}

## Legal/Compliance Text:
{legal_section}
"""
    out_path = os.path.join(EXTRACTED, f"{slug}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(md)
    return out_path, len(body.split())

if __name__ == "__main__":
    summary = []
    for slug in DATA:
        path, wc = build_md(slug)
        print(f"Wrote {path} (body wc={wc})")
        summary.append((slug, wc))
