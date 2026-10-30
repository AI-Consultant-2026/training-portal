#!/usr/bin/env python3
"""Build backend/src/marketing/gh-latest-jobs.json (the data behind /gh/latest-jobs-board).

Usage:  python3 backend/scripts/build-ghana-jobs.py

The newest Ghanaian vacancies in three sectors (2026-10-30), from the two biggest Ghanaian
job boards, since neither has enough fresh roles on its own:
  1. Jobberman Ghana (jobberman.com.gh), pages 1-2 of its industry pages. It shows when a
     job was posted only as "3 days ago" / "2 weeks ago", so those posting dates are
     approximate, and it doesn't publish deadlines.
  2. JobWeb Ghana (jobwebghana.com) category pages. Each listing is opened for its
     closing date and town.
Only roles posted in the last MAX_AGE_DAYS and not past their deadline are kept, and a
role listed on both sites appears once. The Paleon course column uses the same title
rules as the Nigerian and Kenyan boards. Needs curl. Takes a couple of minutes.
"""
import datetime
import html
import json
import os
import re
import subprocess
import time

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "marketing", "gh-latest-jobs.json")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
MINING = "Mining, Oil & Energy"
BANKING = "Banking & Finance"
ICT = "ICT & Telecoms"
JOBBERMAN = [("mining-energy-metals", MINING), ("energy-utilities", MINING),
             ("banking-finance-insurance", BANKING), ("it-telecoms", ICT), ("software-data", ICT)]
JOBWEB = [("oil-and-gas-jobs-in-ghana", MINING), ("mining-jobs-in-ghana", MINING),
          ("banking-jobs-in-ghana", BANKING), ("it-telecom-jobs-in-ghana", ICT)]
MAX_AGE_DAYS = 28
# Jobberman's location labels and the towns JobWeb names, mapped to their region.
REGION = {"accra & tema region": "Greater Accra", "kumasi & ashanti region": "Ashanti",
          "takoradi & western region": "Western", "tamale & northern region": "Northern",
          "accra": "Greater Accra", "tema": "Greater Accra", "kumasi": "Ashanti", "obuasi": "Ashanti",
          "takoradi": "Western", "tarkwa": "Western", "sekondi": "Western", "tamale": "Northern",
          "cape coast": "Central", "ho": "Volta", "koforidua": "Eastern", "sunyani": "Bono",
          "bolgatanga": "Upper East", "wa": "Upper West"}

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
                                    r"warehouse|inventory|facilit|structural|engineer|quality|metallurg|mine\b|mining|"
                                    r"tower|rigger|fibre|fiber", re.I), {MINING, ICT}),
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
        time.sleep(3 + 2 * i)
    return "", ""


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s or ""))).strip()


def excerpt(text, n=240):
    text = re.sub(r"\s*\.\.\.$", "", clean(text))
    if len(text) > n:
        text = text[:n]
    return text if text.endswith((".", "!", "?")) else text.rsplit(" ", 1)[0].rstrip(",;:") + "…"


def region_of(location):
    loc = location.strip().lower()
    if loc in REGION:
        return REGION[loc]
    if loc in ("outside ghana", "remote"):
        return location.strip().title()
    m = re.match(r"(?:jobs in )?([a-z ]+?)(?: region)?$", loc)
    if m and m.group(1) in REGION:
        return REGION[m.group(1)]
    if m and loc.endswith(" region"):
        return m.group(1).title()
    return "Various"


def ago_to_date(text, today):
    text = text.lower()
    if text == "today":
        return today
    if text == "yesterday":
        return today - datetime.timedelta(days=1)
    m = re.match(r"(\d+) (day|week|month)s? ago", text)
    if not m:
        return None
    n = int(m.group(1)) * {"day": 1, "week": 7, "month": 30}[m.group(2)]
    return today - datetime.timedelta(days=n)


def from_jobberman(today):
    out = []
    for slug, sector in JOBBERMAN:
        for page in (1, 2):
            url = f"https://www.jobberman.com.gh/jobs/{slug}" + ("?page=2" if page == 2 else "")
            _, body = curl(url)
            for card in body.split('data-cy="listing-cards-components"')[1:]:
                card = card[:7000]
                if "FEATURED" in card[:800]:
                    continue  # paid placements, shown on every industry page
                link = re.search(r'href="(https://www\.jobberman\.com\.gh/listings/[^"]+)"', card)
                title = re.search(r'data-cy="listing-title-link"[^>]*title="([^"]+)"', card)
                if not link or not title:
                    continue
                card = re.sub(r"<(script|style|svg)[^>]*>.*?</\1>", "", card, flags=re.S)
                bits = [b.strip() for b in html.unescape(re.sub(r"<[^>]+>", "|", card)).split("|") if b.strip()]
                when = next((b for b in bits if re.fullmatch(r"Today|Yesterday|\d+ (?:day|week|month)s? ago", b)), None)
                posted = ago_to_date(when, today) if when else None
                if not posted or (today - posted).days > MAX_AGE_DAYS:
                    continue
                try:
                    i = bits.index(html.unescape(title.group(1)).strip())
                    company, location = bits[i + 1], bits[i + 2]
                except (ValueError, IndexError):
                    continue
                # The card's summary is the first long piece of text after the posting date.
                after = bits[bits.index(when) + 1:]
                summary = next((b for b in after if len(b) > 40), "")
                if company in ("Jobberman Third Party", "Anonymous Employer"):
                    company = "Employer not named (via Jobberman)"
                out.append({"sector": sector, "role": clean(title.group(1)), "company": company,
                            "location": location.replace(" Region", "").replace(" & ", " / "),
                            "region": region_of(location), "posted": posted.isoformat(), "deadline": None,
                            "requirements": excerpt(summary) if summary else "", "link": link.group(1)})
            time.sleep(1)
    return out


DEADLINE = re.compile(r"(?:Deadline|Closing Date)\s*:?\s*(?:is\s*)?(?:\w+day,?\s*)?"
                      r"(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s*)?([A-Za-z]+),?\s*(\d{4})", re.I)


def from_jobweb(today):
    out = []
    for slug, sector in JOBWEB:
        _, body = curl(f"https://jobwebghana.com/job-category/{slug}/")
        for item in re.findall(r'<li class="(job[^"]*)">(.*?)</li>', body, re.S):
            cls, item = item
            if "expired" in cls:
                continue
            m = re.search(r'<a href="(https://jobwebghana\.com/jobs/[^"]+)">(.*?)</a>', item, re.S)
            date = re.search(r'class="year">\s*(\d{2}/[A-Za-z]{3}/\d{4})', item)
            if not m or not date:
                continue
            posted = datetime.datetime.strptime(date.group(1), "%d/%b/%Y").date()
            if (today - posted).days > MAX_AGE_DAYS:
                continue
            role, _, company = clean(m.group(2)).rpartition(" at ")
            if not role:
                continue
            code, page = curl(m.group(1))
            time.sleep(0.7)
            if code != "200":
                continue
            text = clean(re.sub(r"<(script|style)[^>]*>.*?</\1>", "", page, flags=re.S))
            deadline = None
            d = DEADLINE.search(text)
            if d:
                try:
                    deadline = datetime.datetime.strptime(" ".join(d.groups()), "%d %B %Y").date()
                except ValueError:
                    try:
                        deadline = datetime.datetime.strptime(" ".join(d.groups()), "%d %b %Y").date()
                    except ValueError:
                        deadline = None
            if deadline and deadline < today:
                continue
            town = re.search(r"State:\s*Jobs in ([A-Za-z ]+?)\s+Job type", text)
            location = town.group(1).strip() if town else "Ghana"
            lista = re.search(r'<div class="lista">(.*?)</div>', item, re.S)
            out.append({"sector": sector, "role": role.strip(), "company": company.strip(),
                        "location": location, "region": region_of(location), "posted": posted.isoformat(),
                        "deadline": deadline.isoformat() if deadline else None,
                        "requirements": excerpt(lista.group(1)) if lista else "", "link": m.group(1)})
        time.sleep(1)
    return out


def key(job):
    return re.sub(r"[^a-z0-9]", "", (job["role"] + job["company"]).lower())


def main():
    today = datetime.date.today()
    jobs, seen = [], set()
    # JobWeb first: when both sites list a role, keep the one with the exact date and deadline.
    for job in from_jobweb(today) + from_jobberman(today):
        if key(job) in seen:
            continue
        seen.add(key(job))
        job["course"] = course_for(job["role"], job["sector"])
        jobs.append(job)
    jobs.sort(key=lambda j: j["posted"] or "", reverse=True)
    keys = ["sector", "role", "company", "location", "region", "posted", "deadline", "requirements", "link", "course"]
    data = {"updated": today.isoformat(), "source": "Jobberman Ghana (jobberman.com.gh) and JobWeb Ghana (jobwebghana.com)",
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
