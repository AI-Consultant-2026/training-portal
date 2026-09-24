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
    "cyber-security-fundamentals-course", "gis-and-drone-mapping-course", "digital-marketing-course", "hse-fundamentals-course",
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
    "four-digital-skills-nigerian-graduates", "graduate-to-job-ready-nigeria",
    "paleon-training-six-course-digital-skills-curriculum",
    "paleon-training-employability-content-hub",
    "digital-skills-nigeria-career-intelligence-guide",
    "support", "terms", "privacy",
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
    "nysc-digital-skills-oil-and-gas-career", "practical-digital-skills-nigerian-graduates",
    "oil-and-gas-jobs-in-warri-delta-state",
    "how-to-get-a-bank-job-in-nigeria",
    "fintech-jobs-nigeria",
    "side-hustle-during-nysc",
    "return-from-nysc-jobless-what-to-do",
    "what-you-get-from-a-gis-and-drone-mapping-course",
    "hse-jobs-in-nigeria-oil-and-gas-companies",
    # Career Intelligence Hub -- Tier 2/3 supporting articles (73-article batch,
    # completing the 94-article content database alongside the 19 Tier 1 above;
    # 1 remaining row, /four-digital-skills-nigerian-graduates, already existed.
    "digital-skills-for-students-nigeria",
    "free-vs-paid-digital-skills-training-nigeria",
    "tech-skills-vs-degree-nigeria",
    "digital-literacy-vs-digital-skills-nigeria",
    "short-courses-in-nigeria-what-to-check",
    "certificate-courses-vs-digital-skills-nigeria",
    "online-courses-with-certificate-nigeria",
    "professional-certification-courses-nigeria",
    "how-to-get-a-remote-job-in-nigeria",
    "entry-level-jobs-in-nigeria-no-experience",
    "linkedin-profile-tips-nigerian-graduates",
    "interview-prep-for-digital-roles-nigeria",
    "how-to-get-a-job-in-nigeria-online",
    "unemployment-among-nigerian-graduates-context",
    "cv-mistakes-nigerian-graduates-make",
    "how-to-list-nysc-on-your-cv",
    "portfolio-vs-cv-nigeria",
    "skills-companies-are-looking-for-nigeria",
    "most-marketable-skills-in-nigeria",
    "employer-demand-digital-marketing-nigeria",
    "what-employers-like-shell-and-chevron-screen-for",
    "top-skills-employers-want-in-2026",
    "niger-delta-oil-and-gas-companies-jobs",
    "how-to-get-a-job-in-oil-and-gas-in-nigeria",
    "oil-and-gas-training-institute-in-nigeria",
    "oil-and-gas-companies-in-warri",
    "cyber-security-course-for-bankers",
    "digital-marketing-jobs-in-banks-nigeria",
    "digital-transformation-in-banking-nigeria",
    "banking-jobs-in-nigeria-2026",
    "it-jobs-in-nigerian-banks",
    "telecom-jobs-in-nigeria",
    "network-security-jobs-in-nigeria",
    "corporate-communication-jobs-in-nigeria",
    "digital-marketing-telecom-nigeria",
    "network-engineer-jobs-nigeria",
    "what-next-after-nysc",
    "how-to-make-money-during-nysc",
    "saed-vs-independent-digital-skills-training",
    "nysc-corpers-jobs-lagos-abuja",
    "nysc-cds-skill-acquisition",
    "corper-business-ideas",
    "free-skill-acquisition-for-corpers-comparison",
    "documenting-cds-projects-for-your-portfolio",
    "free-tools-to-host-your-portfolio-nigeria",
    "life-after-nysc-what-to-expect",
    "nysc-graduate-trainee-jobs-guide",
    "what-is-gis-course",
    "qgis-vs-arcgis-for-beginners-nigeria",
    "gis-analyst-jobs-in-nigeria",
    "is-gis-a-good-career",
    "geospatial-data-in-agriculture-and-infrastructure-nigeria",
    "gis-companies-in-nigeria",
    "drone-survey-cost-nigeria",
    "ncaa-drone-regulations-overview",
    "drone-technology-in-oil-and-gas-nigeria",
    "hse-officer-salary-in-nigeria",
    "is-nebosh-igc-worth-it",
    "how-much-is-hse-courses-in-nigeria",
    "online-hse-certification-in-nigeria",
    "safety-officer-vs-hse-officer-nigeria",
    "nebosh-igc-training-in-nigeria",
    "cyber-security-courses-in-nigeria-and-fees",
    "where-can-i-study-cyber-security-in-nigeria",
    "free-cyber-security-training-in-nigeria-comparison",
    "cyber-security-training-centres-in-nigeria",
    "what-is-a-soc-analyst",
    "network-security-basics-for-beginners-nigeria",
    "cloud-security-basics-for-beginners-nigeria",
    "solar-energy-training-in-nigeria",
    "renewable-energy-job-opportunities-guide",
    "gis-for-solar-site-assessment-nigeria",
    "renewable-energy-vs-oil-and-gas-career-comparison",
]

# url -> explicit category label; anything not listed falls through to
# category_for()'s keyword rules below.
CATEGORY = {
    "welcome": "Home", "executive-training": "Corporate", "trainingportalprocess": "How it works",
    "corporate-training-nigeria": "Corporate", "banking-telecom-training-nigeria": "Corporate",
    "university-partners": "Partnerships",
    "support": "Support", "terms": "Legal", "privacy": "Legal",
    "cyber-security-fundamentals-course": "Courses", "gis-and-drone-mapping-course": "Courses",
    "digital-marketing-course": "Courses", "hse-fundamentals-course": "Courses",
    "paleon-training-six-course-digital-skills-curriculum": "Courses",
    "paleon-training-employability-content-hub": "Guides",
    "digital-skills-nigeria-career-intelligence-guide": "Guides",
    "best-skill-for-corps-members": "NYSC & Graduates",
    "fintech-jobs-nigeria": "Banking",
    "how-to-get-a-bank-job-in-nigeria": "Banking",
    "cyber-security-course-for-bankers": "Banking",
    "digital-marketing-jobs-in-banks-nigeria": "Banking",
    "it-jobs-in-nigerian-banks": "Banking",
    "network-security-jobs-in-nigeria": "Telecom",
    "corporate-communication-jobs-in-nigeria": "Telecom",
    "network-engineer-jobs-nigeria": "Telecom",
    "saed-vs-independent-digital-skills-training": "NYSC & Graduates",
    "corper-business-ideas": "NYSC & Graduates",
    "free-skill-acquisition-for-corpers-comparison": "NYSC & Graduates",
    "documenting-cds-projects-for-your-portfolio": "NYSC & Graduates",
    "free-tools-to-host-your-portfolio-nigeria": "NYSC & Graduates",
    "what-is-gis-course": "Oil & Gas",
    "qgis-vs-arcgis-for-beginners-nigeria": "Oil & Gas",
    "gis-analyst-jobs-in-nigeria": "Oil & Gas",
    "is-gis-a-good-career": "Oil & Gas",
    "geospatial-data-in-agriculture-and-infrastructure-nigeria": "Oil & Gas",
    "gis-companies-in-nigeria": "Oil & Gas",
    "drone-survey-cost-nigeria": "Oil & Gas",
    "ncaa-drone-regulations-overview": "Oil & Gas",
    "cyber-security-courses-in-nigeria-and-fees": "Oil & Gas",
    "where-can-i-study-cyber-security-in-nigeria": "Oil & Gas",
    "free-cyber-security-training-in-nigeria-comparison": "Oil & Gas",
    "cyber-security-training-centres-in-nigeria": "Oil & Gas",
    "what-is-a-soc-analyst": "Oil & Gas",
    "network-security-basics-for-beginners-nigeria": "Oil & Gas",
    "cloud-security-basics-for-beginners-nigeria": "Oil & Gas",
    "solar-energy-training-in-nigeria": "Oil & Gas",
    "gis-for-solar-site-assessment-nigeria": "Oil & Gas",
    "is-nebosh-igc-worth-it": "HSE",
    "nebosh-igc-training-in-nigeria": "HSE",
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
