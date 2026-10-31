#!/usr/bin/env python3
"""Build backend/src/marketing/ke-latest-jobs.json (the data behind /ke/latest-jobs-board).

Usage:  python3 backend/scripts/build-kenya-jobs.py

The newest Kenyan vacancies from MyJobMag Kenya (myjobmag.co.ke), pages 1-2 of its
oil & gas, banking & financial services and ICT & telecoms industry pages (2026-10-30).
Each listing is opened to check it's still live and to read its deadline, county and
posting date from the page's JobPosting data. Closed, removed and stale listings
(older than MAX_AGE_DAYS with no deadline) are dropped. The Paleon course column uses
the same title rules as the Nigerian boards (build-niya-proposal-jobs.py).
Needs curl (MyJobMag answers Python's urllib with 403). Takes a few minutes.
"""
import datetime
import html
import json
import os
import re
import subprocess
import time

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "marketing", "ke-latest-jobs.json")
SITE = "https://www.myjobmag.co.ke"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
INDUSTRIES = [("oil-and-gas", "Energy, Oil & Gas"), ("banking-financial-services", "Banking & Finance"),
              ("ict-telecommunications", "ICT & Telecoms")]
PAGES = 2
MAX_AGE_DAYS = 21
# Towns and Nairobi neighbourhoods MyJobMag uses, mapped to their county.
TOWN_COUNTY = {"westlands": "Nairobi", "upper hill": "Nairobi", "kilimani": "Nairobi", "karen": "Nairobi",
               "industrial area": "Nairobi", "eldoret": "Uasin Gishu", "thika": "Kiambu", "ruiru": "Kiambu",
               "malindi": "Kilifi", "nanyuki": "Laikipia", "naivasha": "Nakuru", "kitale": "Trans Nzoia",
               "kakamega": "Kakamega", "athi river": "Machakos", "syokimau": "Machakos", "nyeri": "Nyeri",
               "chuka": "Tharaka-Nithi", "kitengela": "Kajiado", "ngong": "Kajiado", "ahero": "Kisumu",
               "lodwar": "Turkana", "kericho": "Kericho", "embu": "Embu", "meru": "Meru"}

SKIP = re.compile(r"security (guard|officer|personnel|supervisor)|driver|accountant|account officer|"
                  r"\bhr\b|human resource|counsel|lawyer|legal|auditor|cashier|teller|chef|cook|nanny", re.I)
RULES = [
    ("GIS & Drone Mapping", re.compile(r"\bgis\b|geophysic|geolog|geomatic|geospatial|survey|mapping|drone|"
                                       r"cartograph|remote sensing", re.I), None),
    ("AI & Machine Learning Fundamentals", re.compile(r"\bai\b|artificial intelligence|machine learning|\bml\b|"
                                                      r"data (analyst|scien|engineer)|analytics|business intelligence|"
                                                      r"\bnlp\b|computer vision|prompt engineer", re.I), None),
    ("Cyber Security Fundamentals", re.compile(r"cyber|information security|security (analyst|engineer|operations)|"
                                               r"\bsoc\b|fraud|\baml\b|anti-money|network|\bit\b|\bict\b|infrastructure|"
                                               r"systems? (admin|engineer|analyst|support)|software|developer|devops|cloud|"
                                               r"database|data (analyst|engineer|scien)|tech support|it support|"
                                               r"penetration|identity|access management", re.I), None),
    ("Digital Marketing", re.compile(r"marketing|marketer|brand|social media|content|communications|digital|sales|"
                                     r"business development|public relations|\bpr\b|customer acquisition|growth|"
                                     r"e-?commerce|graphic|copywrit|media", re.I), None),
    ("HSE Fundamentals", re.compile(r"\bhse\b|qhse|hsse|sshe|safety|health|environment", re.I), None),
    ("HSE Fundamentals", re.compile(r"technician|operator|maintenance|mechanical|electrical|instrument|drilling|"
                                    r"production|pipeline|field|site|plant|\brig\b|offshore|process|logistics|"
                                    r"warehouse|inventory|facilit|structural|engineer|quality|"
                                    r"tower|rigger|fibre|fiber", re.I), {"Energy, Oil & Gas", "ICT & Telecoms"}),
]


def course_for(title, sector):
    if SKIP.search(title):
        return None
    for course, rx, only in RULES:
        if (not only or sector in only) and rx.search(title):
            return course
    return None


def curl(url, tries=4):
    for i in range(tries):
        r = subprocess.run(["curl", "-sL", "-m", "40", "-A", UA, "-w", "\n%{http_code}", url],
                           capture_output=True, text=True, errors="replace")
        body, _, code = r.stdout.rpartition("\n")
        if code in ("200", "404", "410"):
            return code, body
        time.sleep(3 + 2 * i)  # MyJobMag throws 502/520/522 now and then
    return "", ""


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def short(text, n=240):
    text = clean(text)
    return text if len(text) <= n else text[:n].rsplit(" ", 1)[0].rstrip(",;:.") + "…"


def excerpt(text):
    text = short(text)
    return text if text.endswith(("…", ".", "!", "?")) else text.rsplit(" ", 1)[0].rstrip(",;:") + "…"


def county_of(location):
    first = re.split(r"\s*\+\s*\d|,", location)[0].strip()
    if first.lower() in ("", "kenya", "all", "various", "kenya (various)", "remote"):
        return "Various"
    return TOWN_COUNTY.get(first.lower(), first)


def listings():
    seen, out = set(), []
    for slug, sector in INDUSTRIES:
        for page in range(1, PAGES + 1):
            url = f"{SITE}/jobs-by-industry/{slug}" + (f"/{page}" if page > 1 else "")
            _, body = curl(url)
            for item in re.findall(r'<li class="job-list-li">(.*?)(?=<li class="job-list-li">|</ul>\s*</div>\s*</div>)',
                                   body, re.S):
                m = re.search(r'<h2><a href="(/job/[^"]+)">(.*?)</a></h2>', item, re.S)
                if not m or m.group(1) in seen:
                    continue
                seen.add(m.group(1))
                role, _, company = clean(m.group(2)).rpartition(" at ")
                if not role:
                    continue
                desc = re.search(r'<li class="job-desc">(.*?)</li>', item, re.S)
                when = re.search(r'id="job-date">\s*(\d{1,2} [A-Z][a-z]+)', item)
                out.append({"sector": sector, "role": role.strip(), "company": company.strip(),
                            # MyJobMag cuts its summaries off mid-word, so mark them as cut.
                            "requirements": excerpt(desc.group(1)) if desc else "",
                            "link": SITE + m.group(1), "listed": when.group(1) if when else None})
            time.sleep(1)
    return out


def listed_date(text, today):
    """The list page's "30 October" (no year) as a date in the past year."""
    if not text:
        return None
    try:
        d = datetime.datetime.strptime(f"{text} {today.year}", "%d %B %Y").date()
    except ValueError:
        return None
    return (d.replace(year=d.year - 1) if d > today else d).isoformat()


def enrich(job, today):
    """Open the listing: still live? Fill posted date, deadline and location from its JobPosting data."""
    code, page = curl(job["link"])
    if code != "200" or "Method of Application" not in page:
        return False  # removed or closed
    posted = re.search(r'"datePosted"\s*:\s*"(\d{4}-\d\d-\d\d)', page)
    deadline = re.search(r'"validThrough"\s*:\s*"(\d{4}-\d\d-\d\d)', page)
    job["posted"] = posted.group(1) if posted else listed_date(job.get("listed"), today)
    job["deadline"] = deadline.group(1) if deadline else None
    if not job["posted"] and not job["deadline"]:
        return False  # no way to tell whether it's still open
    if job["deadline"] and job["deadline"] < today.isoformat():
        return False
    if not job["deadline"] and job["posted"]:
        age = (today - datetime.date.fromisoformat(job["posted"])).days
        if age > MAX_AGE_DAYS:
            return False
    locs = [re.sub(r"\s+", " ", l).strip(" ,") for l in re.findall(r'"addressLocality"\s*:\s*"([^"]+)"', page)]
    locs = [l for l in dict.fromkeys(locs) if l and l.lower() not in ("all", "kenya")]
    job["location"] = ", ".join(locs)[:60] or "Kenya (various)"
    job["county"] = county_of(job["location"])
    if not job["requirements"]:
        body = re.search(r'class="job-details"(.*?)Method of Application', page, re.S)
        job["requirements"] = short(body.group(1)) if body else ""
    job["course"] = course_for(job["role"], job["sector"])
    return True


def main():
    today = datetime.date.today()
    found = listings()
    print(f"{len(found)} listings found; checking each one…")
    jobs = []
    for i, job in enumerate(found, 1):
        if enrich(job, today):
            jobs.append(job)
        if i % 20 == 0:
            print(f"  {i}/{len(found)} checked, {len(jobs)} kept")
        time.sleep(0.7)
    jobs.sort(key=lambda j: j.get("posted") or "", reverse=True)
    keys = ["sector", "role", "company", "location", "county", "posted", "deadline", "requirements", "link", "course"]
    data = {"updated": today.isoformat(), "source": "MyJobMag Kenya (myjobmag.co.ke)",
            "jobs": [{k: j.get(k) for k in keys} for j in jobs]}
    with open(OUT, "w") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
        f.write("\n")
    by = {}
    for j in jobs:
        by[j["sector"]] = by.get(j["sector"], 0) + 1
    print(f"{len(jobs)} jobs written to {os.path.normpath(OUT)}: {by}")


if __name__ == "__main__":
    main()
