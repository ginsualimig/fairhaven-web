#!/usr/bin/env python3
import json, re, os
from bs4 import BeautifulSoup

RAW = "/Users/petrusyen/.openclaw/workspace/fairhaven-web/content-source/raw"
OUT = "/Users/petrusyen/.openclaw/workspace/fairhaven-web/content-source/extracted"

URLS = [
"https://www.fairhavenproperty.co.nz/news-insights",
"https://www.fairhavenproperty.co.nz/news-insights/while-you-were-waiting",
"https://www.fairhavenproperty.co.nz/news-insights/ai-spillover-real-estate-behind-the-intelligence-booma",
"https://www.fairhavenproperty.co.nz/news-insights/are-we-in-an-ai-bubble",
"https://www.fairhavenproperty.co.nz/news-insights/august-2025-really-losing-kiwis",
"https://www.fairhavenproperty.co.nz/news-insights/chinavsjapan",
"https://www.fairhavenproperty.co.nz/news-insights/dunedin-real-estate-market-insights-unveiling-opportunities-for-investors",
"https://www.fairhavenproperty.co.nz/news-insights/from-oil-to-tokenisation-how-conflict-is-reshaping-control-over-money",
"https://www.fairhavenproperty.co.nz/news-insights/is-the-debt-based-system-breaking",
"https://www.fairhavenproperty.co.nz/news-insights/july-2025-why-is-everyone-buying-gold",
"https://www.fairhavenproperty.co.nz/news-insights/june-2025-trumps-one-big-beautiful-bill-catalyst-or-chaos-for-global-investors",
"https://www.fairhavenproperty.co.nz/news-insights/may-2025-outlook-and-aip-visa-enhancements",
"https://www.fairhavenproperty.co.nz/news-insights/new-money",
"https://www.fairhavenproperty.co.nz/news-insights/post-pandemic-office-trends-a-shift-toward-flexibility-and-emerging-opportunities",
"https://www.fairhavenproperty.co.nz/news-insights/sept-2025-nz-golden-visa",
"https://www.fairhavenproperty.co.nz/news-insights/tankers-heavycrude-power",
"https://www.fairhavenproperty.co.nz/news-insights/the-cost-of-waiting",
"https://www.fairhavenproperty.co.nz/news-insights/the-great-urban-migration-why-smaller-cities-beckon",
"https://www.fairhavenproperty.co.nz/news-insights/unveiling-property-investment-choices-in-new-zealand-self-management-vs-property-funds",
]

def slug_for(url):
    return url.replace("https://www.fairhavenproperty.co.nz/", "").replace("/", "_")

def get_meta(soup, **attrs):
    tag = soup.find("meta", attrs=attrs)
    return tag.get("content").strip() if tag and tag.get("content") else None

def get_jsonld_article(soup):
    for s in soup.find_all("script", type="application/ld+json"):
        if not s.string:
            continue
        try:
            data = json.loads(s.string)
        except Exception:
            continue
        if isinstance(data, dict) and data.get("@type") in ("Article", "BlogPosting", "NewsArticle"):
            return data
        if isinstance(data, dict) and "datePublished" in data:
            return data
    return None

def image_alt_fallback(src):
    """Derive a readable alt/caption from the filename when Squarespace left alt empty."""
    from urllib.parse import unquote
    name = unquote(src.rsplit("/", 1)[-1])
    name = re.sub(r"\.(jpe?g|png|webp|gif)$", "", name, flags=re.I)
    name = name.replace("+", " ").replace("_", " ").strip()
    return name

def html_block_to_md(el):
    """Convert a bs4 element (heading/paragraph/list/image/etc) to a markdown-ish line."""
    name = el.name
    if name == "img":
        src = el.get("data-src") or el.get("src") or ""
        if src.startswith("//"):
            src = "https:" + src
        if not src:
            return None
        alt = (el.get("alt") or "").strip() or image_alt_fallback(src)
        return f"![{alt}]({src})"
    text = el.get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return None
    if name in ("h1",):
        return f"# {text}"
    if name in ("h2",):
        return f"## {text}"
    if name in ("h3",):
        return f"### {text}"
    if name in ("h4",):
        return f"#### {text}"
    if name in ("h5", "h6"):
        return f"##### {text}"
    if name == "li":
        return f"- {text}"
    if name == "blockquote":
        return f"> {text}"
    return text

def extract_body_markdown(content_div):
    """Walk block-level children (including inline content images) in document
    order and render markdown lines, so charts/graphics stay positioned where
    the author placed them relative to the surrounding paragraphs."""
    lines = []
    seen_text_nodes = set()

    block_tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "img"]

    for el in content_div.find_all(block_tags):
        if el.find_parent(["script", "style"]):
            continue
        # skip if an ancestor (below content_div) is itself a block tag whose
        # text already contains this element's text (avoids li>p duplication)
        parent = el.find_parent(block_tags)
        if parent is not None and parent is not content_div:
            continue
        md = html_block_to_md(el)
        if md is None:
            continue
        key = id(el)
        if key in seen_text_nodes:
            continue
        seen_text_nodes.add(key)
        lines.append(md)

    # dedupe consecutive identical lines (Squarespace sometimes doubles empty p)
    deduped = []
    for l in lines:
        if deduped and deduped[-1] == l:
            continue
        deduped.append(l)
    return "\n\n".join(deduped)

def extract_images(content_div, base_url):
    imgs = []
    for img in content_div.find_all("img"):
        src = img.get("data-src") or img.get("src") or ""
        alt = img.get("alt") or ""
        if src.startswith("//"):
            src = "https:" + src
        imgs.append((src, alt))
    return imgs

def extract_forms(soup):
    forms = []
    for f in soup.find_all("form"):
        fields = []
        for inp in f.find_all(["input", "textarea", "select"]):
            fields.append({
                "tag": inp.name,
                "type": inp.get("type"),
                "name": inp.get("name"),
                "placeholder": inp.get("placeholder"),
                "aria-label": inp.get("aria-label"),
                "id": inp.get("id"),
            })
        labels = [lbl.get_text(" ", strip=True) for lbl in f.find_all("label")]
        buttons = [b.get_text(" ", strip=True) for b in f.find_all(["button"])]
        forms.append({
            "id": f.get("id"),
            "class": f.get("class"),
            "action": f.get("action"),
            "fields": fields,
            "labels": labels,
            "buttons": buttons,
        })
    return forms

report = []

for url in URLS:
    slug = slug_for(url)
    raw_path = os.path.join(RAW, f"{slug}.html")
    out_path = os.path.join(OUT, f"{slug}.md")
    entry = {"url": url, "slug": slug}

    if not os.path.exists(raw_path):
        entry["status"] = "MISSING_RAW_FILE"
        report.append(entry)
        continue

    with open(raw_path, encoding="utf-8") as f:
        html = f.read()

    if len(html) < 2000:
        entry["status"] = "SUSPICIOUSLY_SMALL"

    soup = BeautifulSoup(html, "lxml")

    title = get_meta(soup, property="og:title")
    if not title and soup.title:
        title = soup.title.string
    if title:
        title = re.sub(r"\s*—\s*Fairhaven Property Group\s*$", "", title).strip()

    meta_desc = get_meta(soup, name="description") or get_meta(soup, property="og:description")

    jsonld = get_jsonld_article(soup)
    pub_date = jsonld.get("datePublished") if jsonld else None
    author = jsonld.get("author") if jsonld else None

    md_lines = []
    md_lines.append(f"# URL: {url}")
    md_lines.append("")
    md_lines.append(f"## Meta Title: {title or '(none found)'}")
    md_lines.append("")
    md_lines.append(f"## Meta Description: {meta_desc or '(none found)'}")
    md_lines.append("")
    if author:
        md_lines.append(f"## Author: {author}")
        md_lines.append("")
    md_lines.append(f"## Published Date: {pub_date or '(not determinable)'}")
    md_lines.append("")

    forms = extract_forms(soup)

    if slug == "news-insights":
        # Index page: list every teaser
        hentries = soup.find_all("article", class_="hentry")
        md_lines.append("## Body Copy: (Index page — article teaser list)")
        md_lines.append("")
        word_count = 0
        img_count = 0
        for i, a in enumerate(hentries, 1):
            h1 = a.find(class_="blog-title")
            link = h1.find("a", href=True) if h1 else None
            title_txt = h1.get_text(" ", strip=True) if h1 else "(no title)"
            href = link.get("href") if link else None
            date_el = a.find("time", class_="blog-date")
            date_txt = date_el.get_text(strip=True) if date_el else "(no date)"
            author_el = a.find(class_="blog-author")
            author_txt = author_el.get_text(strip=True) if author_el else "(no author)"
            excerpt_wrap = a.find(class_="blog-excerpt-wrapper")
            excerpt_txt = excerpt_wrap.get_text(" ", strip=True) if excerpt_wrap else ""
            img_el = a.find("img")
            img_src = None
            img_alt = None
            if img_el:
                img_src = img_el.get("data-src") or img_el.get("src")
                img_alt = img_el.get("alt")
                img_count += 1
            md_lines.append(f"### {i}. {title_txt}")
            md_lines.append(f"- Link: {href}")
            md_lines.append(f"- Author: {author_txt}")
            md_lines.append(f"- Date: {date_txt}")
            md_lines.append(f"- Excerpt: {excerpt_txt or '(empty — no excerpt text set on this teaser)'}")
            if img_src:
                md_lines.append(f"- Teaser image: {img_src} (alt: \"{img_alt or ''}\")")
            md_lines.append("")
            word_count += len(title_txt.split()) + len(excerpt_txt.split())

        md_lines.append(f"## Images: {img_count} teaser images listed above (one per article card)")
        md_lines.append("")
        md_lines.append("## Forms:")
        if forms:
            for f in forms:
                md_lines.append(f"- Form id={f['id']} class={f['class']} action={f['action']}")
                for fld in f["fields"]:
                    md_lines.append(f"  - field: tag={fld['tag']} type={fld['type']} name={fld['name']} placeholder={fld['placeholder']} aria-label={fld['aria-label']} id={fld['id']}")
                if f["labels"]:
                    md_lines.append(f"  - labels: {f['labels']}")
                if f["buttons"]:
                    md_lines.append(f"  - buttons: {f['buttons']}")
        else:
            md_lines.append("- No <form> elements found in the static HTML of this page (no newsletter/signup form present, no footer subscribe block detected either).")
        md_lines.append("")

        entry["title"] = "News & Insights (index)"
        entry["word_count"] = word_count
        entry["image_count"] = img_count
        entry["has_images"] = img_count > 0
        entry["num_articles_listed"] = len(hentries)
        entry["forms_found"] = len(forms)

    else:
        content_divs = soup.find_all(class_=lambda c: c and "blog-item-content" in c and "e-content" in c)
        if not content_divs:
            content_divs = soup.find_all(class_=lambda c: c and "blog-item-content" in c)
        content_div = content_divs[0] if content_divs else None

        if content_div is None:
            body_md = ""
            images = []
            entry["status"] = entry.get("status", "") + " NO_CONTENT_DIV_FOUND"
        else:
            body_md = extract_body_markdown(content_div)
            images = extract_images(content_div, url)

        md_lines.append("## Body Copy:")
        md_lines.append("")
        md_lines.append(body_md if body_md else "(NO BODY CONTENT EXTRACTED — investigate raw HTML)")
        md_lines.append("")
        md_lines.append(f"## Images: ({len(images)} found)")
        for src, alt in images:
            md_lines.append(f"- {src} | alt: \"{alt}\"")
        if not images:
            md_lines.append("- (none found in article body)")
        md_lines.append("")
        md_lines.append("## Forms:")
        if forms:
            for f in forms:
                md_lines.append(f"- Form id={f['id']} class={f['class']} action={f['action']}")
                for fld in f["fields"]:
                    md_lines.append(f"  - field: tag={fld['tag']} type={fld['type']} name={fld['name']} placeholder={fld['placeholder']} aria-label={fld['aria-label']} id={fld['id']}")
        else:
            md_lines.append("- No <form> elements found on this page.")
        md_lines.append("")

        word_count = len(body_md.split()) if body_md else 0
        entry["title"] = title
        entry["word_count"] = word_count
        entry["image_count"] = len(images)
        entry["has_images"] = len(images) > 0
        entry["forms_found"] = len(forms)
        if word_count < 80:
            entry["status"] = (entry.get("status", "") + " THIN_CONTENT").strip()

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))

    entry.setdefault("status", "OK")
    report.append(entry)

print(json.dumps(report, indent=2, ensure_ascii=False))
