"""Turns the pack's rendered HTML (Chrome --dump-dom after pack.js) into
pandoc-friendly HTML for the Word version: PNG diagrams, answer letters and
"correct" marks as real text, boxes as quotes, and page-break markers."""
import re, sys

src, dst, imgdir = sys.argv[1], sys.argv[2], sys.argv[3]
h = open(src, encoding="utf-8").read()
h = re.sub(r"<script\b.*?</script>", "", h, flags=re.S)
h = re.sub(r'<link rel="stylesheet"[^>]*>', "", h)

h = re.sub(r'<span class="brand-mark">P</span>', "", h)
# The answer key starts on its own page.
h = h.replace('<h2 style="break-before: page;">', '<div class="pagebreak"></div><h2>')

# Diagrams: PNG copies, full width.
h = re.sub(r'<img src="images/([\w-]+)\.svg"', lambda m: '<img width="100%%" src="%s/%s.png"' % (imgdir, m.group(1)), h)
h = re.sub(r'<span class="file-tag">([^<]+)</span>', r"[image file: \1]", h)

# Options: the letter becomes text; the correct one is bold and marked.
h = re.sub(r'<li class="correct"><span class="letter">(\w)</span>(.*?)</li>',
           r"<li><strong>\1. \2  ✓ correct</strong></li>", h, flags=re.S)
h = re.sub(r'<li><span class="letter">(\w)</span>', r"<li>\1. ", h)

# Boxes read as indented quotes in Word.
for cls in ("build", "callout", "think", "scenario"):
    h = re.sub(r'<div class="%s"( [^>]*)?>(.*?)</div>' % cls, r"<blockquote>\2</blockquote>", h, flags=re.S)

# Every lesson and part starts on a new page, as in the PDF.
first = [True]
def brk(m):
    if 'style="break-before: auto;"' in m.group(0) and first[0]:
        first[0] = False
        return m.group(0)
    return '<div class="pagebreak"></div>' + m.group(0)
h = re.sub(r'<section class="(unit|part)"[^>]*>', brk, h)
open(dst, "w", encoding="utf-8").write(h)
