#!/usr/bin/env python3
"""Build backend/src/marketing/niya-proposal-jobs.json (the data behind /Niya-proposal-Job-board).

Usage:  python3 backend/scripts/build-niya-proposal-jobs.py [path/to/vacancies.xlsx]

Every open vacancy in Nigeria that sits in a Paleon course field (Cyber Security, HSE,
GIS & Drone Mapping, Digital Marketing), from two sources:
  1. the newest "Nigeria Job Vacancies <date>.xlsx" on the Desktop (all sectors), and
  2. page 1 of MyJobMag's oil & gas, banking and ICT/telecoms industry pages (fresh today).
A role is kept when the sheet's "Paleon course" column is set or its title matches the
course rules below (the same rules as ~/Desktop/Paleon Daily Jobs Email/build.py).

Apply links go straight to the employer, never to the MyJobMag posting: MyJobMag's
/apply-now/<id> redirect is resolved to the employer's careers page, or the employer's
CV email address is used. Listings that have closed or been removed are dropped.
Needs curl (MyJobMag answers Python's urllib with 403).
"""
import datetime
import glob
import html
import json
import os
import re
import subprocess
import sys
import time

import openpyxl

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "marketing", "niya-proposal-jobs.json")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
SHEET_SECTORS = {"Oil & Gas": "Oil & Gas", "Banking": "Banking & Finance", "Telecoms": "Telecoms & ICT"}
MYJOBMAG = [("oil-and-gas", "Oil & Gas"), ("banking-financial-services", "Banking & Finance"),
            ("ict-telecommunications", "Telecoms & ICT")]
MAX_AGE_DAYS = 21  # listings with no deadline are dropped once this old
TOWN_STATE = {"yaba": "Lagos", "amuwo odofin": "Lagos", "ikeja": "Lagos", "lekki": "Lagos", "ikoyi": "Lagos",
              "victoria island": "Lagos", "festac town": "Lagos", "port harcourt": "Rivers", "warri": "Delta",
              "benin": "Edo", "ibadan": "Oyo", "uyo": "Akwa Ibom", "calabar": "Cross River"}

SKIP = re.compile(r"security (guard|officer|personnel|supervisor)|driver|accountant|account officer|"
                  r"\bhr\b|human resource|counsel|lawyer|legal|auditor|cashier|teller|chef|cook|nanny", re.I)
RULES = [
    ("GIS & Drone Mapping", re.compile(r"\bgis\b|geophysic|geolog|geomatic|geospatial|survey|mapping|drone|"
                                       r"cartograph|remote sensing", re.I), None),
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
                                    r"warehouse|inventory|facilit|structural|riser|mooring|engineer|quality|"
                                    r"tower|rigger|fibre|fiber", re.I), {"Oil & Gas", "Telecoms & ICT"}),
]


def course_for(title, sector):
    if SKIP.search(title):
        return None
    for course, rx, only in RULES:
        if (not only or sector in only) and rx.search(title):
            return course
    return None


def curl(url, follow=True, tries=4):
    for i in range(tries):
        args = ["curl", "-s", "-m", "40", "-A", UA, "-w", "\n%{http_code} %{redirect_url}", url]
        if follow:
            args.insert(1, "-L")
        r = subprocess.run(args, capture_output=True, text=True, errors="replace")
        body, _, tail = r.stdout.rpartition("\n")
        code, _, redirect = tail.partition(" ")
        if code in ("200", "301", "302", "404", "410"):
            return code, body, redirect
        time.sleep(3 + 2 * i)  # MyJobMag throws 502/520/522 now and then
    return "", "", ""


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def state_of(location):
    first = re.split(r"\s*\+\s*\d|,", location)[0].strip()
    if first.lower() in ("various", "nigeria", "all", "", "nigeria (various)"):
        return "Various"
    return TOWN_STATE.get(first.lower(), first)


def iso(value):
    if isinstance(value, datetime.datetime):
        return value.date().isoformat()
    if isinstance(value, datetime.date):
        return value.isoformat()
    try:
        return datetime.datetime.strptime(str(value).strip(), "%d %b %Y").date().isoformat()
    except (TypeError, ValueError):
        return None


def newest_sheet():
    files = [f for f in glob.glob(os.path.expanduser("~/Desktop/Nigeria Job Vacancies *.xlsx"))
             if re.search(r"\d{4}-\d\d-\d\d\.xlsx$", f)]
    return max(files) if files else None


def from_sheet(path):
    ws = openpyxl.load_workbook(path, read_only=True)["Vacancies"]
    out = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        sector, role, company, location, posted, deadline, reqs, link = row[:8]
        if sector not in SHEET_SECTORS or not role or not link:
            continue
        label = SHEET_SECTORS[sector]
        course = (row[10] if len(row) > 10 else None) or course_for(str(role), label)
        if not course:
            continue
        reqs = str(reqs or "").strip()
        out.append({"sector": label, "role": str(role).strip(), "company": str(company or "").strip(),
                    "location": str(location or "Nigeria").strip(), "posted": iso(posted),
                    "deadline": iso(deadline), "requirements": "" if reqs == "See listing" else reqs,
                    "link": str(link).strip(), "course": course})
    return out


def from_myjobmag(today):
    out = []
    for slug, label in MYJOBMAG:
        code, page, _ = curl(f"https://www.myjobmag.com/jobs-by-industry/{slug}")
        for m in re.finditer(r'<li class="mag-b">\s*<h2><a href="(/job/[^"]+)">(.*?)</a></h2>(.*?)id="job-date">([^<]+)',
                             page, re.S):
            link, title, between, date_txt = m.groups()
            role, _, company = clean(title).rpartition(" at ")
            if not role:
                continue
            course = course_for(role, label)
            if not course:
                continue
            try:
                posted = datetime.datetime.strptime(f"{clean(date_txt)} {today.year}", "%d %B %Y").date()
            except ValueError:
                posted = None
            desc = re.search(r'class="job-desc">(.*?)</li>', between, re.S)
            out.append({"sector": label, "role": role.strip(), "company": company.strip(), "location": "",
                        "posted": posted.isoformat() if posted else None, "deadline": None,
                        "requirements": clean(desc.group(1))[:240] if desc else "",
                        "link": "https://www.myjobmag.com" + link, "course": course})
    return out


def enrich(job, today):
    """Check a MyJobMag listing is still live; fill deadline, location and the direct apply route."""
    job["apply_url"] = job["apply_email"] = job["apply_subject"] = ""
    if "myjobmag.com" in job["link"] and "myjobmag.com/job/" not in job["link"]:
        return False  # a MyJobMag search/title page, not one employer's listing
    if "myjobmag.com/job/" not in job["link"]:
        job["apply_url"] = job["link"]
        return True
    code, page, _ = curl(job["link"])
    if code != "200" or "Method of Application" not in page:
        return False  # removed or expired
    m = re.search(r'"validThrough"\s*:\s*"([^"]+)"', page)
    if m and not job.get("deadline"):
        job["deadline"] = m.group(1)[:10]
    if not job.get("location"):
        locs = [re.sub(r"\s+", " ", l).strip(" ,") for l in re.findall(r'"addressLocality"\s*:\s*"([^"]+)"', page)]
        locs = [l for l in dict.fromkeys(locs) if l and l.lower() not in ("all", "nigeria")]
        job["location"] = ", ".join(locs)[:60] or "Nigeria (various)"
    sec = page[page.find("Method of Application"):][:4000]
    if "apply-sec" in sec:
        sec = sec[:sec.find("apply-sec")]
    am = re.search(r'href="(/apply-now/\d+)"', sec)
    if am:
        _, _, redirect = curl("https://www.myjobmag.com" + am.group(1), follow=False)
        if redirect and "myjobmag.com" not in redirect:
            job["apply_url"] = re.sub(r"([?&])utm_source=MyJobMag&?", r"\1", redirect).rstrip("?&")
    if not job["apply_url"]:
        ext = [u for u in re.findall(r'href="(https?://[^"]+)"', sec) if "myjobmag" not in u]
        job["apply_url"] = ext[0] if ext else ""
    if not job["apply_url"]:
        text = html.unescape(re.sub(r"<[^>]+>", " ", sec)).replace("\\", "")
        emails = re.findall(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+", text)
        if not emails:
            return False  # no way to apply direct to the employer
        job["apply_email"] = emails[0].rstrip(".")
        sm = re.search(r'subject(?: line)?\s*[:\-]?\s*["“]\s*([^"”\n]{3,80})', text, re.I)
        job["apply_subject"] = sm.group(1).strip() if sm else job["role"]
    if not job["requirements"]:
        body = re.search(r'class="job-details"(.*?)Method of Application', page, re.S)
        job["requirements"] = clean(body.group(1))[:240] if body else ""
    return True


def main():
    today = datetime.date.today()
    src = sys.argv[1] if len(sys.argv) > 1 else newest_sheet()
    candidates = (from_sheet(src) if src else []) + from_myjobmag(today)
    jobs, seen = [], set()
    for j in candidates:
        if j["link"] in seen:
            continue
        seen.add(j["link"])
        if j["deadline"] and j["deadline"] < today.isoformat():
            continue
        if not j["deadline"] and j["posted"] and (today - datetime.date.fromisoformat(j["posted"])).days > MAX_AGE_DAYS:
            continue
        if not enrich(j, today):
            continue
        if j["deadline"] and j["deadline"] < today.isoformat():
            continue
        j["location"] = re.sub(r"\s+,", ",", j["location"])
        j["state"] = state_of(j["location"])
        j["requirements"] = j["requirements"] or "See the employer's page for full requirements."
        del j["link"]  # the page links the employer only, never the job-board posting
        jobs.append(j)
        print(f"  {j['sector']:<18} {j['course']:<28} {j['role'][:50]} | {j['company'][:30]}", flush=True)
    jobs.sort(key=lambda j: (j["posted"] or "", j["deadline"] or "9999"), reverse=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"updated": today.isoformat(), "jobs": jobs}, f, ensure_ascii=False, indent=1)
    print(f"{len(jobs)} jobs -> {os.path.relpath(OUT)}")


if __name__ == "__main__":
    main()
