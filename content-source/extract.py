#!/usr/bin/env python3
import sys, os, re, json
from bs4 import BeautifulSoup, NavigableString, Comment

RAW_DIR = "/Users/petrusyen/.openclaw/workspace/fairhaven-web/content-source/raw"
OUT_DIR = "/Users/petrusyen/.openclaw/workspace/fairhaven-web/content-source/extracted"

BASE = "https://www.fairhavenproperty.co.nz"

def get_title(soup):
    t = soup.find("title")
    return t.get_text(strip=True) if t else ""

def get_meta_desc(soup):
    m = soup.find("meta", attrs={"name": "description"})
    if m and m.get("content"):
        return m["content"].strip()
    m = soup.find("meta", attrs={"property": "og:description"})
    if m and m.get("content"):
        return m["content"].strip()
    return ""

def find_main_content(soup):
    # Squarespace main content usually under div#page or main tag or div.Main-content
    candidates = []
    main = soup.find("main")
    if main:
        candidates.append(main)
    page = soup.find(id="page")
    if page:
        candidates.append(page)
    content = soup.find(attrs={"id": re.compile("sections", re.I)})
    if content:
        candidates.append(content)
    # fallback to body
    body = soup.find("body")
    if body:
        candidates.append(body)
    return candidates[0] if candidates else soup

HEADING_TAGS = {"h1":"#","h2":"##","h3":"###","h4":"####","h5":"#####","h6":"######"}

def is_hidden(tag):
    style = tag.get("style", "") if tag.has_attr("style") else ""
    if "display:none" in style.replace(" ", "") or "visibility:hidden" in style.replace(" ", ""):
        return True
    cls = " ".join(tag.get("class", []))
    if "sqs-hidden" in cls or "visually-hidden" in cls:
        return True
    return False

def extract_body_text(root):
    lines = []
    seen_texts = set()

    for el in root.find_all(True):
        if el.name in ("script", "style", "noscript", "template", "svg", "path", "iframe"):
            continue
        if isinstance(el, Comment):
            continue
        if el.name in HEADING_TAGS:
            txt = el.get_text(" ", strip=True)
            if txt:
                lines.append(f"\n{HEADING_TAGS[el.name]} {txt}\n")
        elif el.name == "p":
            if el.find_parent("li"):
                continue
            txt = el.get_text(" ", strip=True)
            if txt:
                lines.append(txt + "\n")
        elif el.name == "li":
            txt = el.get_text(" ", strip=True)
            if txt:
                lines.append(f"- {txt}")
        elif el.name in ("br",):
            pass
    return lines

def extract_all_text_fallback(root):
    # get all text nodes in order, collapse whitespace, dedupe consecutive
    texts = []
    for el in root.descendants:
        if isinstance(el, NavigableString):
            if el.parent and el.parent.name in ("script","style","noscript","template"):
                continue
            txt = str(el).strip()
            if txt:
                texts.append(txt)
    return texts

def extract_images(soup):
    imgs = []
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src") or ""
        alt = img.get("alt") or ""
        if src:
            imgs.append((src, alt))
    return imgs

def extract_forms(soup):
    forms = []
    for form in soup.find_all("form"):
        action = form.get("action", "")
        method = form.get("method", "")
        fields = []
        for inp in form.find_all(["input", "textarea", "select"]):
            name = inp.get("name") or inp.get("id") or ""
            typ = inp.get("type", inp.name)
            placeholder = inp.get("placeholder", "")
            fields.append((name, typ, placeholder))
        forms.append((action, method, fields))
    return forms

def find_legal_blocks(soup):
    """Search whole document for legal/compliance/disclaimer language."""
    full_text = soup.get_text("\n", strip=True)
    keywords = ["Important Disclaimer", "wholesale investor", "Financial Markets Conduct Act",
                "FMA", "Privacy Policy", "Personal Information", "disclaimer"]
    blocks = []
    lower = full_text.lower()
    for kw in ["important disclaimer", "wholesale investor"]:
        idx = lower.find(kw)
        if idx != -1:
            blocks.append((kw, idx))
    return full_text, blocks

def slug_from_filename(fn):
    return fn[:-5]  # strip .html

def process_file(fn):
    path = os.path.join(RAW_DIR, fn)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")
    slug = slug_from_filename(fn)
    if slug == "home":
        url = BASE + "/home"
    else:
        url = BASE + "/" + slug.replace("_", "/")

    title = get_title(soup)
    desc = get_meta_desc(soup)

    root = find_main_content(soup)
    body_lines = extract_body_text(root)
    body_text = "\n".join(body_lines).strip()
    if not body_text or len(body_text) < 50:
        # fallback
        texts = extract_all_text_fallback(root)
        body_text = "\n".join(texts)

    images = extract_images(soup)
    forms = extract_forms(soup)
    full_text, legal_hits = find_legal_blocks(soup)

    out = {
        "slug": slug,
        "url": url,
        "title": title,
        "desc": desc,
        "body_text": body_text,
        "images": images,
        "forms": forms,
        "full_text": full_text,
        "legal_hits": legal_hits,
        "word_count": len(body_text.split()),
    }
    return out

TARGET_SLUGS = [
    "home", "home-1", "about-us", "discretionary-fund", "charity-initiatives",
    "contact-us", "pm-enquiry", "privacy-policy", "careers",
    "careers_executive-assistant", "careers_financial-analyst",
    "careers_investor-relations-associate", "careers_investor-relations-manager",
    "careers_property-manager",
]

if __name__ == "__main__":
    results = {}
    for slug in TARGET_SLUGS:
        fn = slug + ".html"
        if os.path.exists(os.path.join(RAW_DIR, fn)):
            print(f"Processing {fn}...")
            r = process_file(fn)
            results[r["slug"]] = r
        else:
            print(f"MISSING: {fn}")
    # dump raw extracted data as json for further processing
    with open(os.path.join(OUT_DIR, "_raw_extract.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print("Done. Wrote _raw_extract.json")
