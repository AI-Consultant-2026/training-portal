#!/usr/bin/env python3
"""Regenerates search-index.json from the marketing pages' own <title> and
<meta name="description"> tags. Run this from backend/src/marketing/ after
adding a page to sitemap.xml, or after editing an existing page's title or
description, then commit the updated search-index.json alongside your change.

    python3 build-search-index.py
"""
import re
import json
import os

MARKETING_DIR = os.path.dirname(os.path.abspath(__file__))

# Kept in sync with sitemap.xml by hand (not parsed from it), plus /terms and
# /privacy, which are public utility pages left out of the sitemap on purpose.
URLS = [
    "welcome", "executive-training", "trainingportalprocess",
    "oil-and-gas-careers-nigeria", "corporate-training-nigeria",
    "banking-telecom-training-nigeria", "digital-skills-jobs-nigeria",
    "hse-training-nigeria", "university-partners",
    "digital-skills-training-nigeria", "degree-but-no-job-nigeria",
    "nysc-digital-skills", "best-courses-after-nysc",
    "courses-for-nysc-corps-members", "nysc-portfolio-building",
    "nysc-to-employment-roadmap", "how-to-build-a-graduate-cv-nigeria",
    "digital-skills-employers-want-nigeria",
    "digital-skills-for-oil-and-gas-nigeria",
    "digital-skills-for-banking-nigeria",
    "digital-skills-for-telecommunications-nigeria",
    "gis-careers-nigeria", "drone-mapping-careers-nigeria",
    "cybersecurity-oil-and-gas-nigeria", "renewable-energy-careers-nigeria",
    "oil-gas-banking-telecoms-digital-skills",
    "six-digital-skills-nigerian-graduates", "graduate-to-job-ready-nigeria",
    "paleon-training-six-course-digital-skills-curriculum",
    "paleon-training-employability-content-hub",
    "terms", "privacy",
    # Career Intelligence Hub -- Tier 1 supporting articles (19-article batch,
    # 2 of which -- digital-skills-jobs-nigeria, degree-but-no-job-nigeria --
    # already existed above; these 17 are the new ones).
    "high-income-skills-without-a-degree-nigeria",
    "lucrative-digital-skills-to-learn-in-nigeria",
    "what-to-do-after-nysc",
    "best-skill-for-corps-members",
    "cv-with-no-work-experience-nigeria",
    "high-demand-tech-skills-nigeria",
    "high-paying-skills-to-learn-in-nigeria",
    "warri-oil-and-gas-jobs",
    "oil-and-gas-entry-level-jobs-nigeria",
    "gis-mapping-oil-and-gas-nigeria",
    "oil-and-gas-jobs-in-warri-delta-state",
    "how-to-get-a-bank-job-in-nigeria",
    "fintech-jobs-nigeria",
    "side-hustle-during-nysc",
    "return-from-nysc-jobless-what-to-do",
    "what-you-get-from-a-gis-and-drone-mapping-course",
    "hse-jobs-in-nigeria-oil-and-gas-companies",
]

# url -> explicit category label; anything not listed falls through to
# category_for()'s keyword rules below.
CATEGORY = {
    "welcome": "Home", "executive-training": "Corporate", "trainingportalprocess": "How it works",
    "corporate-training-nigeria": "Corporate", "banking-telecom-training-nigeria": "Corporate",
    "university-partners": "Partnerships",
    "terms": "Legal", "privacy": "Legal",
    "paleon-training-six-course-digital-skills-curriculum": "Courses",
    "paleon-training-employability-content-hub": "Guides",
    "best-skill-for-corps-members": "NYSC & Graduates",
    "fintech-jobs-nigeria": "Banking",
    "how-to-get-a-bank-job-in-nigeria": "Banking",
}


def category_for(url):
    if url in CATEGORY:
        return CATEGORY[url]
    if "nysc" in url:
        return "NYSC & Graduates"
    if any(k in url for k in ["oil-and-gas", "oil-gas", "gis-careers", "drone-mapping",
                                "cybersecurity-oil", "renewable-energy", "digital-skills-for-oil"]):
        return "Oil & Gas"
    if "banking" in url:
        return "Banking"
    if "telecom" in url:
        return "Telecom"
    if "hse" in url:
        return "HSE"
    return "Career guides"


def unescape(s):
    return (s.replace("&amp;", "&").replace("&mdash;", "—")
             .replace("&rsquo;", "’").replace("&quot;", '"'))


def main():
    entries = []
    for url in URLS:
        fname = os.path.join(MARKETING_DIR, f"{url}.html")
        with open(fname, encoding="utf-8") as f:
            content = f.read()

        title_m = re.search(r"<title>(.*?)</title>", content, re.DOTALL)
        title = title_m.group(1).strip() if title_m else url
        title = re.sub(r"\s*\|\s*Paleon Training[^|]*$", "", title)

        desc_m = re.search(r'<meta name="description" content="(.*?)">', content, re.DOTALL)
        desc = desc_m.group(1).strip() if desc_m else ""

        entries.append({
            "title": unescape(title),
            "description": unescape(desc),
            "url": f"/{url}",
            "category": category_for(url),
        })

    out_path = os.path.join(MARKETING_DIR, "search-index.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(entries)} entries to {out_path}")


if __name__ == "__main__":
    main()
