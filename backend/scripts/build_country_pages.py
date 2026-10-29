"""Build the country landing pages. Run: python3 backend/scripts/build_country_pages.py

Builds (/ghana, /kenya, /south-africa) and their og images.

Each page reuses hse-fundamentals-course.html's <style> block, search overlay and footer
verbatim, so they read as part of the same site; only the head metadata and body are new.
The pages share backend/src/marketing/country-page.js (localStorage flag + lead form).
"""
import json
import os
import urllib.parse

from PIL import Image, ImageDraw, ImageFont

M = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "marketing")
src = open(os.path.join(M, "hse-fundamentals-course.html"), encoding="utf-8").read().split("\n")

style = "\n".join(src[160 : src.index("</style>")])  # <style> and its rules, without the closing tag
body_start = src.index("<body>")
search_overlay = "\n".join(src[body_start + 1 : src.index('<div class="band">')])
footer = "\n".join(src[932:1003])

COURSES = [
    # slug, title, days, lessons, price, one-liner
    ("cyber-security-fundamentals", "Cyber Security Fundamentals", 18, 36, "200,000",
     "Protect systems and data: threats, networks, security operations and incident response."),
    ("gis-and-drone-mapping", "GIS &amp; Drone Mapping", 9, 18, "200,000",
     "Maps, drones and location data for energy, mining, land and infrastructure work."),
    ("digital-marketing", "Digital Marketing", 8, 16, "150,000",
     "Grow a business online: content, social media, search, ads and analytics."),
    ("hse-fundamentals", "HSE Fundamentals", 8, 16, "100,000",
     "Health, safety and environment for oil &amp; gas and industrial sites."),
]
# Same course names the /welcome form sends, so lead follow-up emails match.
LEAD_TITLES = {"gis-and-drone-mapping": "GIS and Drone Mapping"}

FLAGS = {
    "GH": """<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#006B3F"/><rect width="30" height="13.33" fill="#FCD116"/><rect width="30" height="6.67" fill="#CE1126"/><path d="M15 7.2l.95 2.9h3.05l-2.47 1.8.95 2.9L15 13l-2.48 1.8.95-2.9-2.47-1.8h3.05z" fill="#000"/></svg>""",
    "KE": """<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#006600"/><rect width="30" height="13.6" fill="#fff"/><rect width="30" height="12.6" fill="#BB0000"/><rect width="30" height="7.4" fill="#fff"/><rect width="30" height="6.4" fill="#000"/><path d="M11 4l8 12M19 4l-8 12" stroke="#fff" stroke-width=".8"/><ellipse cx="15" cy="10" rx="2.6" ry="5.6" fill="#BB0000" stroke="#000" stroke-width=".9"/><ellipse cx="15" cy="10" rx=".7" ry="2.6" fill="#fff"/></svg>""",
    "ZA": """<svg class="flag" viewBox="0 0 600 400" aria-hidden="true"><rect width="600" height="200" fill="#E03C31"/><rect y="200" width="600" height="200" fill="#001489"/><path d="M0 0L200 133H600V267H200L0 400Z" fill="#fff"/><path d="M0 50L178 167H600V233H178L0 350Z" fill="#007749"/><path d="M0 83L175 200 0 317Z" fill="#FFB612"/><path d="M0 117L125 200 0 283Z" fill="#000"/></svg>""",
}

COUNTRIES = [
    dict(
        code="GH", slug="ghana", name="Ghana", people="Ghanaian", currency="cedis",
        flag_bands=["#CE1126", "#FCD116", "#006B3F"],
        subhead=("Practical online courses in Cyber Security, GIS &amp; Drone Mapping, Digital Marketing and HSE, for "
                 "graduates, final year students and national service personnel aiming for careers in oil &amp; gas, "
                 "banking, telecoms and mining. Learn from anywhere in Ghana, at your own pace."),
        why=("Ghana&rsquo;s banks, telecoms networks, oil and gas operators and mines all run on digital systems now. "
             "They need people who can keep those systems secure, map and survey sites with GIS and drones, market "
             "services online, and keep work sites safe. Those are the four skills Paleon teaches."),
        card_note="Some Ghanaian cards need international online payments switched on in your banking app first.",
        local_pay="Mobile money isn&rsquo;t available yet.",
        local_pay_faq="Mobile money isn't available yet.",
        region="West Africa",
        phone="e.g. +233 24 123 4567",
    ),
    dict(
        code="KE", slug="kenya", name="Kenya", people="Kenyan", currency="shillings",
        flag_bands=["#000000", "#BB0000", "#006600"],
        subhead=("Practical online courses in Cyber Security, GIS &amp; Drone Mapping, Digital Marketing and HSE, for "
                 "graduates and final year students aiming for careers in banking, telecoms, energy and industry. "
                 "Learn from anywhere in Kenya, at your own pace."),
        why=("Kenya&rsquo;s banks, mobile money and telecoms networks, energy projects and fast-growing tech sector "
             "all run on digital systems now. They need people who can keep those systems secure, map and survey "
             "sites with GIS and drones, market services online, and keep work sites safe. Those are the four skills "
             "Paleon teaches."),
        card_note="Some Kenyan cards need international online payments switched on in your banking app first.",
        local_pay="M-Pesa isn&rsquo;t available yet.",
        local_pay_faq="M-Pesa isn't available yet.",
        region="Africa",
        phone="e.g. +254 712 345 678",
    ),
    dict(
        code="ZA", slug="south-africa", name="South Africa", people="South African", currency="rand",
        flag_bands=["#E03C31", "#FFB612", "#007749", "#001489"],
        subhead=("Practical online courses in Cyber Security, GIS &amp; Drone Mapping, Digital Marketing and HSE, for "
                 "graduates and final year students aiming for careers in banking, telecoms, mining and energy. "
                 "Learn from anywhere in South Africa, at your own pace."),
        why=("South Africa&rsquo;s banks, telecoms networks, mines and energy companies all run on digital systems "
             "now. They need people who can keep those systems secure, map and survey sites with GIS and drones, "
             "market services online, and keep work sites safe. Those are the four skills Paleon teaches."),
        card_note="Some South African cards need international online payments switched on in your banking app first.",
        local_pay="Instant EFT and other local payment methods aren&rsquo;t available yet.",
        local_pay_faq="Instant EFT and other local payment methods aren't available yet.",
        region="Africa",
        phone="e.g. +27 82 123 4567",
    ),
]

EXTRA_CSS = """
  /* country landing pages only */
  .eyebrow .flag { width: 30px; height: 20px; border-radius: 3px; vertical-align: -5px; margin-right: 8px; box-shadow: 0 0 0 1px rgba(255,255,255,.35); }
  .course-cards { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-top: 20px; }
  .course-card { background: var(--white); border: 1px solid var(--line-light); border-radius: 10px; padding: 20px; display: flex; flex-direction: column; }
  .course-card h3 { margin: 0 0 6px; font-family: var(--font-display); font-size: 21px; }
  .course-card h3 a { color: var(--ink); text-decoration: none; }
  .course-card h3 a:hover { text-decoration: underline; }
  .course-card .meta { font-size: 14px; color: var(--charcoal-soft); margin: 0 0 10px; }
  .course-card p { margin: 0 0 14px; }
  .course-card .links { margin-top: auto; display: flex; flex-wrap: wrap; gap: 8px 16px; font-weight: 600; font-size: 15px; }
  .course-card .links a { color: var(--signal-deep); }
  .pay-steps { margin: 16px 0 0; padding-left: 22px; }
  .pay-steps li { margin-bottom: 10px; }
  .lead-form { background: var(--white); border: 1px solid var(--line-light); border-radius: 10px; padding: 24px; display: grid; gap: 14px; max-width: 560px; }
  .lead-form label { display: grid; gap: 6px; font-weight: 600; font-size: 15px; }
  .lead-form input, .lead-form select { font: inherit; font-weight: 400; padding: 10px 12px; border: 1px solid var(--line-light); border-radius: 6px; background: var(--paper); width: 100%; }
  .lead-form button { font: inherit; font-weight: 700; padding: 13px 18px; border: 0; border-radius: 6px; background: var(--signal); color: var(--ink); cursor: pointer; }
  .lead-form button:hover { background: var(--signal-2); }
  .lead-form button[disabled] { opacity: .6; cursor: wait; }
  .form-msg { margin: 0; font-size: 15px; }
  .form-msg.ok { color: #1D6B3A; font-weight: 600; }
  .form-msg.err { color: #A3321B; }
  .faq details { border-top: 1px solid var(--line-light); padding: 14px 0; }
  .faq details:last-child { border-bottom: 1px solid var(--line-light); }
  .faq summary { font-weight: 700; cursor: pointer; }
  .faq details p { margin: 10px 0 0; }
</style>"""


def build_page(c):
    url = f"https://paleontraining.com/{c['slug']}"
    og = f"https://paleontraining.com/images/og/{c['slug']}.jpg"
    reg = f"/register?country={c['code']}"
    wa = "https://wa.me/2347077149989?text=" + urllib.parse.quote(
        f"Hello Paleon Training, I'm in {c['name']} and I'd like to find out more about your courses.")
    title = f"Online Digital Skills Courses in {c['name']} | Paleon Training"
    desc = (f"Online courses for {c['people']} graduates in Cyber Security, GIS & Drone Mapping, Digital Marketing "
            "and HSE. Self-paced, lifetime access, capstone project. Try a free lesson.")
    og_title = f"Digital skills courses for {c['people']} graduates | Paleon Training"
    faq = [
        (f"Can I take Paleon courses from {c['name']}?",
         f"Yes. Every course is online and self-paced, so you can learn from anywhere in {c['name']} on a phone or laptop."),
        (f"How do I pay from {c['name']}?",
         "Course prices are in Naira and you pay by Visa or Mastercard on Paystack's secure page. Your bank converts "
         f"the amount to {c['currency']} at its own rate. Make sure your card is enabled for international online "
         f"payments. {c['local_pay_faq']}"),
        ("Can I try a course before paying?",
         "Yes. The first lesson of every course is free to read and watch, with no account and no payment."),
        (f"Is the content written for {c['name']}?",
         f"The skills are the same across {c['region']}, but many worked examples come from Nigerian industry, and "
         "HSE Fundamentals covers Nigerian regulations alongside international standards."),
        ("Do I get a certificate?",
         "Yes. You get a certificate of completion when you finish the course and its capstone project."),
        ("Does the course guarantee a job?",
         "No. The course builds practical skills and a project you can show employers. Hiring decisions are made by employers."),
    ]
    esc = lambda s: s.replace("&", "&amp;")
    faq_ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq],
    }, indent=2, ensure_ascii=False)

    head = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Paleon Training">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Paleon Training, now open in {c['name']}: online courses in Cyber Security, GIS and Drone Mapping, Digital Marketing and HSE.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og_title}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og}">
<script type="application/ld+json">
{faq_ld}
</script>
{style}{EXTRA_CSS}
<link rel="stylesheet" href="/search-widget.css">
<link rel="stylesheet" href="/whatsapp-float.css">
</head>"""

    cards = "\n".join(
        f"""      <article class="course-card">
        <h3><a href="/{slug}-course">{t}</a></h3>
        <p class="meta">{days} days &middot; {lessons} lessons &middot; &#8358;{price}</p>
        <p>{blurb}</p>
        <div class="links">
          <a href="/preview/{slug}">Try a free lesson</a>
          <a href="{reg}&amp;course={slug}">Start for &#8358;20,000</a>
        </div>
      </article>"""
        for slug, t, days, lessons, price, blurb in COURSES
    )
    course_options = "\n".join(
        f'            <option value="{LEAD_TITLES.get(slug, t)}">{t}</option>' for slug, t, *_ in COURSES)
    faq_html = "\n".join(f"      <details><summary>{q}</summary><p>{a}</p></details>" for q, a in faq)
    wa_attr = wa.replace("&", "&amp;")

    body = f"""<body>
{search_overlay}
<div class="band">
  <div class="wrap masthead">
    <a class="wordmark" href="/"><span class="dot"></span>Paleon Training</a>
    <p class="eyebrow">{FLAGS[c['code']]}Now open in {c['name']}</p>
    <h1 class="title" style="max-width: 20ch;">Digital skills for {c['people']} graduates</h1>
    <p class="subhead">{c['subhead']}</p>
    <div class="stat-strip">
      <div class="stat"><div class="stat-value">4</div><div class="stat-label">job-focused courses</div></div>
      <div class="stat"><div class="stat-value">8&ndash;18</div><div class="stat-label">days of curriculum</div></div>
      <div class="stat"><div class="stat-value">Free</div><div class="stat-label">first lesson, no account needed</div></div>
      <div class="stat"><div class="stat-value">&#8358;20,000</div><div class="stat-label">to start any course, paid by card</div></div>
    </div>
    <div class="cta-row">
      <a class="btn btn-signal" href="{reg}">Create your free account</a>
      <a class="btn btn-preview" href="#courses">Try a free lesson</a>
      <a class="btn btn-whatsapp" href="{wa_attr}" target="_blank" rel="noopener" aria-label="Chat with Paleon on WhatsApp (opens WhatsApp)"><span aria-hidden="true">&#128172;</span> Chat with Paleon on WhatsApp</a>
    </div>
    <ul class="trust-row" aria-label="Paying safely"><li><span aria-hidden="true">&#128274;</span> Secure card payment by Paystack</li><li><span aria-hidden="true">&#8617;&#65039;</span> <a href="/terms#refunds">7-day refund</a> if you haven&rsquo;t started Day 2</li><li><span aria-hidden="true">&#9854;&#65039;</span> Self-paced, with lifetime access</li></ul>
    <p class="price-note">Already have an account? <a href="/login" style="color:var(--signal-2);">Log in</a>.</p>
  </div>
</div>

<div class="wrap">

  <section>
    <div class="measure">
      <p class="section-label">Why Paleon</p>
      <h2 class="section-title">A degree gets you to the door. Skills get you through it.</h2>
      <div class="answer">
        <p class="answer-label">In short</p>
        <p>Paleon Training teaches the practical digital skills employers ask about at interview. Each course is online and self-paced, with written lessons, illustrations and videos, and ends with a <strong>capstone project</strong> you can show an employer. You get a <strong>certificate of completion</strong> when you finish.</p>
      </div>
      <p>{c['why']}</p>
    </div>
  </section>

  <section id="courses">
    <p class="section-label">Courses</p>
    <h2 class="section-title">Choose a course</h2>
    <p>Every course has a free first lesson you can open right now, with no account and no payment.</p>
    <div class="course-cards">
{cards}
    </div>
  </section>

  <section id="paying-from-{c['slug']}">
    <div class="measure">
      <p class="section-label">Paying</p>
      <h2 class="section-title">How paying works from {c['name']}</h2>
      <ol class="pay-steps">
        <li><strong>Start with &#8358;20,000.</strong> It unlocks Days 1 and 2 of any course. Pay the balance whenever you&rsquo;re ready, with no extra fees.</li>
        <li><strong>Prices are in Naira.</strong> You pay by Visa or Mastercard on Paystack&rsquo;s secure page, and your bank converts the amount to {c['currency']} at its own rate.</li>
        <li><strong>Check your card works online abroad.</strong> {c['card_note']}</li>
        <li><strong>{c['local_pay']}</strong> If your card is declined, <a href="{wa_attr}" target="_blank" rel="noopener">message us on WhatsApp</a> and we&rsquo;ll help.</li>
      </ol>
    </div>
  </section>

  <section id="register-interest">
    <p class="section-label">Not ready yet?</p>
    <h2 class="section-title">Get course details by email</h2>
    <p>Leave your details and we&rsquo;ll send you the course outline and how to start.</p>
    <form class="lead-form" id="country-lead-form" data-country="{c['code']}" novalidate>
      <label>Full name<input name="name" autocomplete="name" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>WhatsApp number (optional)<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="{c['phone']}"></label>
      <label>Course
        <select name="course" required>
          <option value="">Choose a course&hellip;</option>
{course_options}
        </select>
      </label>
      <label>You are a&hellip;
        <select name="university">
          <option value="Graduate">Graduate</option>
          <option value="Current Student">Current Student</option>
          <option value="Non-Graduate">Non-Graduate</option>
        </select>
      </label>
      <button type="submit">Send me the details</button>
      <p class="form-msg" id="country-lead-msg" role="status" aria-live="polite"></p>
    </form>
  </section>

  <section class="faq">
    <p class="section-label">Questions</p>
    <h2 class="section-title">Frequently asked questions</h2>
    <div class="measure">
{faq_html}
    </div>
  </section>

</div>

<div class="band footer-band">
  <div class="wrap">
    <p>Ready to start? <a href="{reg}">Create your free account</a> or <a href="#courses">try a free lesson</a>.</p>
    <div class="signoff">
      <span>Paleon Training &mdash; Digital Skills for the Long Run</span>
      <span>{c['name']}</span>
    </div>
  </div>
</div>
{footer}

<script src="/country-page.js" defer></script>
<script src="/search.js" defer></script>
<script src="/whatsapp-float.js" defer></script>
<script src="/email-links.js" defer></script>
<script src="/analytics.js" defer></script>
</body>
</html>
"""
    open(os.path.join(M, f"{c['slug']}.html"), "w", encoding="utf-8").write(head + "\n" + body)


def build_og(c):
    W, H = 1200, 630
    sup = "/System/Library/Fonts/Supplemental/"
    f = lambda n, s: ImageFont.truetype(sup + n, s)
    img = Image.new("RGB", (W, H), "#10151F")
    d = ImageDraw.Draw(img)
    bands = c["flag_bands"]
    step = H / len(bands)
    for i, col in enumerate(bands):
        d.rectangle([0, round(i * step), 36, round((i + 1) * step)], fill=col)
    d.text((90, 70), "PALEON TRAINING", font=f("Georgia Bold.ttf", 34), fill="#F2A65A")
    d.text((90, 130), f"Now open in {c['name']}", font=f("Arial Bold.ttf", 30), fill="#A9B0C2")
    head = f"{c['people']} graduates"
    hf = f("Georgia Bold.ttf", 74)
    while d.textlength(head, font=hf) > W - 150:
        hf = f("Georgia Bold.ttf", hf.size - 2)
    d.text((90, 200), "Digital skills for", font=hf, fill="#F7F4EC")
    d.text((90, 200 + hf.size + 16), head, font=hf, fill="#F7F4EC")
    d.text((90, 410), "Cyber Security  ·  GIS & Drone Mapping", font=f("Arial Bold.ttf", 34), fill="#F7F4EC")
    d.text((90, 458), "Digital Marketing  ·  HSE", font=f("Arial Bold.ttf", 34), fill="#F7F4EC")
    d.rounded_rectangle([90, 530, 560, 590], radius=30, fill="#E8863C")
    d.text((118, 542), "Try a free lesson online", font=f("Arial Bold.ttf", 30), fill="#10151F")
    url = f"paleontraining.com/{c['slug']}"
    uf = f("Arial Bold.ttf", 26)
    d.text((W - 40 - d.textlength(url, font=uf), 550), url, font=uf, fill="#A9B0C2")
    img.save(os.path.join(M, "images", "og", f"{c['slug']}.jpg"), quality=88)


for c in COUNTRIES:
    build_page(c)
    build_og(c)
print("ok")
