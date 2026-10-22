#!/usr/bin/env python3
"""Build backend/src/marketing/latest-jobs.json (the data behind /latest-jobs-board)
from the newest "Nigeria Job Vacancies <date>.xlsx" on the Desktop.

Usage:  python3 backend/scripts/build-latest-jobs.py [path/to/vacancies.xlsx]

Only Oil & Gas and Banking rows are published. The "Found on" and "Contact email"
columns are deliberately left out of the JSON. Rows whose deadline has already
passed are dropped here as well as hidden by the page script.
"""
import datetime
import glob
import json
import os
import re
import sys

import openpyxl

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "marketing", "latest-jobs.json")
SECTORS = {"Oil & Gas": "Oil & Gas", "Banking": "Banking & Finance"}
# Towns/LGAs that listings use instead of the state name, for the page's state filter.
TOWN_STATE = {"yaba": "Lagos", "amuwo odofin": "Lagos", "ikeja": "Lagos", "lekki": "Lagos",
              "victoria island": "Lagos", "port harcourt": "Rivers", "warri": "Delta",
              "benin": "Edo", "ibadan": "Oyo", "uyo": "Akwa Ibom", "calabar": "Cross River"}


def state_of(location):
    first = re.split(r"\s*\+\s*\d|,", location)[0].strip()
    if first.lower() in ("various", "nigeria", ""):
        return "Various"
    return TOWN_STATE.get(first.lower(), first)


def newest_sheet():
    files = glob.glob(os.path.expanduser("~/Desktop/Nigeria Job Vacancies *.xlsx"))
    files = [f for f in files if re.search(r"\d{4}-\d\d-\d\d\.xlsx$", f)]
    if not files:
        sys.exit("No 'Nigeria Job Vacancies YYYY-MM-DD.xlsx' on the Desktop")
    return max(files)


def iso(value):
    if isinstance(value, datetime.datetime):
        return value.date().isoformat()
    if isinstance(value, datetime.date):
        return value.isoformat()
    try:
        return datetime.datetime.strptime(str(value).strip(), "%d %b %Y").date().isoformat()
    except (TypeError, ValueError):
        return None


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else newest_sheet()
    ws = openpyxl.load_workbook(src, read_only=True)["Vacancies"]
    today = datetime.date.today().isoformat()
    jobs, seen = [], set()
    for row in ws.iter_rows(min_row=2, values_only=True):
        sector, role, company, location, posted, deadline, reqs, link = row[:8]
        course = row[10] if len(row) > 10 else None
        if sector not in SECTORS or not role or not link or link in seen:
            continue
        seen.add(link)
        deadline = iso(deadline)
        if deadline and deadline < today:
            continue
        jobs.append({
            "sector": SECTORS[sector],
            "role": str(role).strip(),
            "company": str(company or "").strip(),
            "location": str(location or "Nigeria").strip(),
            "state": state_of(str(location or "")),
            "posted": iso(posted),
            "deadline": deadline,
            "requirements": str(reqs or "See listing").strip(),
            "link": str(link).strip(),
            "course": course or None,
        })
    jobs.sort(key=lambda j: (j["posted"] or "", j["deadline"] or "9999"), reverse=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"updated": today, "source": os.path.basename(src), "jobs": jobs}, f,
                  ensure_ascii=False, indent=1)
    print(f"{len(jobs)} jobs from {os.path.basename(src)} -> {os.path.relpath(OUT)}")


if __name__ == "__main__":
    main()
