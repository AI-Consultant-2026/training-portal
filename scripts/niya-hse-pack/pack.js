/* Turns a copy of the taster's index.html into the Route B content pack:
   every unit shown in order, practice questions printed with answers marked,
   a build box per lesson, and the final quiz as a quiz sheet.
   window.PACK = { QUESTIONS, SCN } is written by build-niya-hse-taster-pack.sh
   from taster.js, so the pack always matches the live course. */
(function () {
  var Q = window.PACK.QUESTIONS;
  var SCN = window.PACK.SCN;
  var LETTERS = ["A", "B", "C", "D", "E", "F", "G"];
  var PATHWAY = "https://paleontraining.com/hse-fundamentals-course?utm_source=niya&utm_medium=rocket&utm_campaign=niya-hse-taster";

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function optList(items) {
    var ul = el("ul", { "class": "opts" });
    items.forEach(function (it, i) {
      var li = el("li", it.ok ? { "class": "correct" } : {}, '<span class="letter">' + LETTERS[i] + "</span>" + esc(it.text));
      ul.appendChild(li);
    });
    return ul;
  }

  ["#preview-banner", "header.top", "footer.pager", "#completion-note", "#quiz-result"].forEach(function (s) {
    var n = document.querySelector(s); if (n) n.remove();
  });

  var main = document.getElementById("main");
  var units = Array.prototype.slice.call(document.querySelectorAll("section.unit"));

  // ---------- Cover + how to build ----------
  var cover = el("section", { "class": "cover" },
    '<div class="brand"><span class="brand-mark">P</span><span><strong>Paleon Training Limited</strong><br><span class="note">Content pack for the Nigerian Youth Academy (NiYA)</span></span></div>' +
    '<p class="eyebrow">Taster course · content pack for your course builder</p>' +
    "<h1>Introduction to HSE for Oil &amp; Gas</h1>" +
    '<p class="sub">Everything needed to build the course in learn.niya.gov.ng\'s own course builder: 8 lessons, diagrams, practice questions with answers, and the 15-question final quiz.</p>' +
    '<ul class="contents">' +
    "<li><strong>Part 1. How to build the course</strong>: course settings, lesson list and quiz settings.</li>" +
    "<li><strong>Part 2. The 8 lessons</strong>: paste-ready text, one lesson per section, with the diagram files named in place.</li>" +
    "<li><strong>Part 3. Final quiz sheet</strong>: 15 questions, correct answers marked, explanations, and an answer key.</li>" +
    "</ul>" +
    '<p class="footer-line">Paleon Training Limited · No.5 Beji Court, Off NNPC Junior Staff Club 10, Warri, Delta State<br>corporate@paleontraining.com · <span style="white-space:nowrap">+234 707 714 9215</span><br>Content reviewed October 2026. Provided to NiYA free of charge for use on learn.niya.gov.ng.</p>');

  var rows = units.map(function (u, i) {
    var t = u.getAttribute("data-title"), m = u.getAttribute("data-minutes");
    var imgs = Array.prototype.map.call(u.querySelectorAll("figure img"), function (im) {
      return im.getAttribute("src").split("/").pop().replace(".svg", ".png");
    });
    var type = i === 6 ? "Quiz (see Part 3)" : "Text lesson";
    return "<tr><td>" + (i + 1) + "</td><td>" + esc(t) + "</td><td>" + type + "</td><td>" + m + " min</td><td>" + (imgs.join(", ") || "none") + "</td></tr>";
  }).join("");

  var howto = el("section", { "class": "part" },
    '<p class="eyebrow">Part 1</p><h1>How to build the course</h1>' +
    "<p>This pack is for building the taster with your platform's own tools (Rocket LMS course builder) when the SCORM package can't be uploaded. Your platform then marks the quiz, keeps the scores and issues the certificate. Menu names below are general; they can differ slightly between Rocket LMS versions.</p>" +
    "<h2>1. Create the course</h2>" +
    "<ul>" +
    "<li><strong>Type:</strong> Course (not webinar). <strong>Price:</strong> Free.</li>" +
    "<li><strong>Title:</strong> Introduction to HSE for Oil &amp; Gas</li>" +
    "<li><strong>Category:</strong> your Health and Safety (or Professional Skills) category.</li>" +
    "<li><strong>Duration:</strong> about 2 hours (120 minutes).</li>" +
    "<li><strong>Short description:</strong> A free introduction to Health, Safety and Environment in Nigerian oil and gas: hazards, risk, the regulators, and how to control risk on site. 8 short units, a practice scenario and a 15-question final quiz. No background in engineering or safety needed.</li>" +
    "<li><strong>Thumbnail:</strong> hse-three-parts.png works well, or your own NiYA course image.</li>" +
    "</ul>" +
    "<h2>2. Add one chapter and the lessons</h2>" +
    "<p>Create one chapter called <em>Introduction to HSE for Oil &amp; Gas</em>, then add the items below in this order. Paste each lesson's text from Part 2. Where Part 2 shows an image file name, upload that file from the pack's <strong>images</strong> folder at that point in the lesson.</p>" +
    '<table><thead><tr><th>#</th><th>Title</th><th>Item type</th><th>Time</th><th>Images</th></tr></thead><tbody>' + rows + "</tbody></table>" +
    "<p><strong>Practice questions inside lessons</strong> (\"Quick check\" and the Unit 6 scenario) don't count towards the score. Paste them as text with the answers underneath, as printed in Part 2, or, if you prefer, add each set as a short ungraded quiz.</p>" +
    "<h2>3. Add the final quiz (lesson 7)</h2>" +
    "<ul>" +
    "<li><strong>Title:</strong> Final quiz: Introduction to HSE for Oil &amp; Gas</li>" +
    "<li><strong>Questions:</strong> the 15 in Part 3, each multiple choice with one correct answer.</li>" +
    "<li><strong>Grades:</strong> give each question a grade of 1 (total 15).</li>" +
    "<li><strong>Pass mark:</strong> 11 (that is 70%). If your version asks for a percentage, enter 70.</li>" +
    "<li><strong>Attempts:</strong> unlimited (leave empty), so learners can review and retake it.</li>" +
    "<li><strong>Time limit:</strong> none, or 30 minutes if a limit is required.</li>" +
    "<li><strong>Certificate:</strong> on, using NiYA's existing certificate template, so a learner who passes receives it. Suggested line on the certificate, if agreed: \"Content provided by Paleon Training Limited\".</li>" +
    "<li><strong>Status:</strong> active.</li>" +
    "</ul>" +
    "<h2>4. Check it before publishing</h2>" +
    "<ol>" +
    "<li>Enrol a test student account and open the course: check every lesson shows its text and diagrams, on a phone as well as a laptop.</li>" +
    "<li>Take the quiz and get fewer than 11 right: it should show as failed, with no certificate.</li>" +
    "<li>Retake it and get 11 or more right: it should show as passed and the certificate should be issued.</li>" +
    "<li>Check that the test student's score appears in your quiz results or reports.</li>" +
    "</ol>" +
    "<h2>5. Small wording changes for the course builder</h2>" +
    "<ul>" +
    "<li>Lesson 1 says \"Your place is saved as you go\": keep it if your platform remembers progress (Rocket LMS marks lessons as completed); otherwise remove that sentence.</li>" +
    "<li>Lesson 8's button becomes a plain link: <a href=\"" + PATHWAY + "\">" + esc(PATHWAY) + "</a> (this version of the link tells us the visit came from NiYA's course builder).</li>" +
    "</ul>" +
    '<p class="footer-line">Questions about building the course: corporate@paleontraining.com. Our team can join a call with your course administrator for the first build.</p>');

  main.insertBefore(howto, main.firstChild);
  main.insertBefore(cover, main.firstChild);

  var p2 = el("p", { "class": "eyebrow", style: "break-before: page;" }, "Part 2");
  var p2h = el("h1", {}, "The 8 lessons");
  var p2i = el("p", {}, "Each lesson starts on a new page. The box at the top says how to add it; everything below the box is the lesson text to paste.");
  var p2wrap = el("section", { "class": "part" }); p2wrap.appendChild(p2); p2wrap.appendChild(p2h); p2wrap.appendChild(p2i);
  p2.style.breakBefore = "auto";
  main.insertBefore(p2wrap, units[0]);
  units[0].style.breakBefore = "auto"; // follows the Part 2 heading on the same page

  // ---------- Each lesson ----------
  units.forEach(function (u, i) {
    var t = u.getAttribute("data-title");
    var imgs = Array.prototype.map.call(u.querySelectorAll("figure img"), function (im) {
      return im.getAttribute("src").split("/").pop().replace(".svg", ".png");
    });
    var box = el("div", { "class": "build" },
      "<p><b>Lesson " + (i + 1) + " of 8 · " + (i === 6 ? "Quiz" : "Text lesson") + "</b></p>" +
      "<p><strong>Title in the course builder:</strong> " + (i + 1) + ". " + esc(t) + "</p>" +
      (i === 6 ? "<p>Build this as the course quiz using Part 3. Paste the short introduction below as the quiz description.</p>"
               : "<p><strong>Images to upload:</strong> " + (imgs.length ? imgs.join(", ") + " (from the images folder, where marked below)" : "none") + "</p>"));
    u.insertBefore(box, u.firstChild);

    Array.prototype.forEach.call(u.querySelectorAll("figure"), function (f) {
      var im = f.querySelector("img");
      var cap = f.querySelector("figcaption") || f.appendChild(el("figcaption"));
      cap.innerHTML += ' <span class="file-tag">' + im.getAttribute("src").split("/").pop().replace(".svg", ".png") + "</span>";
    });
  });

  // Quick checks: show options with the correct one marked, plus the explanation.
  Array.prototype.forEach.call(document.querySelectorAll("[data-check]"), function (c) {
    var h = c.querySelector("h3");
    if (h) h.textContent = "Quick check (practice, not scored)";
    Array.prototype.forEach.call(c.querySelectorAll(".q"), function (q) {
      var ans = q.getAttribute("data-answer");
      var labels = Array.prototype.slice.call(q.querySelectorAll("label"));
      var items = labels.map(function (l) {
        var inp = l.querySelector("input");
        return { text: l.textContent.trim(), ok: inp.value === ans };
      });
      var fb = q.querySelector(".fb");
      var why = fb.getAttribute("data-right");
      labels.forEach(function (l) { l.remove(); });
      fb.remove();
      q.appendChild(optList(items));
      q.appendChild(el("p", { "class": "why" }, "<b>Answer:</b> " + LETTERS[items.findIndex(function (x) { return x.ok; })] + ". " + esc(why)));
    });
  });

  // Practice scenario steps.
  Array.prototype.forEach.call(document.querySelectorAll(".scn-step"), function (s, i) {
    var labels = Array.prototype.slice.call(s.querySelectorAll("label"));
    var multi = labels[0].querySelector("input").type === "checkbox";
    var items = labels.map(function (l) {
      return { text: l.textContent.trim(), ok: l.querySelector("input").getAttribute("data-correct") === "1" };
    });
    labels.forEach(function (l) { l.remove(); });
    Array.prototype.forEach.call(s.querySelectorAll("button, .fb"), function (n) { n.remove(); });
    s.appendChild(optList(items));
    var right = items.map(function (x, k) { return x.ok ? LETTERS[k] : null; }).filter(Boolean).join(", ");
    s.appendChild(el("p", { "class": "why" }, "<b>Answer" + (multi ? "s" : "") + ":</b> " + right + ". " + esc(SCN[i + 1].right)));
  });

  // Unit 7: the quiz itself lives in Part 3.
  var form = document.getElementById("quiz");
  if (form) form.replaceWith(el("div", { "class": "callout" }, "<p><strong>Course builder:</strong> the 15 questions, answers and settings are in Part 3, Final quiz sheet.</p>"));

  // Unit 8: the button becomes a visible link.
  var pl = document.getElementById("pathway-link");
  if (pl) {
    var p = el("p", {}, '<strong>See the full HSE Fundamentals course:</strong> <a href="' + PATHWAY + '">' + esc(PATHWAY) + "</a>");
    pl.closest("p").replaceWith(p);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".note"), function (n) {
    if (/opens paleontraining\.com in a new tab/.test(n.textContent)) n.textContent = "The first lesson of the full course is free to try.";
  });

  // ---------- Part 3: quiz sheet ----------
  var part3 = el("section", { "class": "part" },
    '<p class="eyebrow">Part 3</p><h1>Final quiz sheet</h1>' +
    "<p>15 multiple-choice questions, one correct answer each (marked ✓). Pass mark <strong>11 out of 15 (70%)</strong>. Turn on your platform's option to shuffle answers if it has one. The explanation under each question can go in the question's explanation or feedback field, so learners see why after submitting.</p>");
  var qs = el("div", { "class": "qs" });
  var key = [];
  Q.forEach(function (item, qi) {
    // Correct answer is first in taster.js; rotate so it lands in A, B or C.
    var n = item.a.length, shift = qi % n;
    var items = item.a.map(function (text, ai) { return { text: text, ok: ai === 0 }; });
    items = items.slice(n - shift).concat(items.slice(0, n - shift));
    var correct = LETTERS[items.findIndex(function (x) { return x.ok; })];
    key.push([qi + 1, correct, item.a[0]]);
    var q = el("div", { "class": "q" }, "<p>" + (qi + 1) + ". " + esc(item.q) + "</p>");
    q.appendChild(optList(items));
    q.appendChild(el("p", { "class": "why" }, "<b>Answer:</b> " + correct + ". " + esc(item.why)));
    qs.appendChild(q);
  });
  part3.appendChild(qs);
  part3.appendChild(el("h2", { style: "break-before: page;" }, "Answer key at a glance"));
  part3.appendChild(el("table", { "class": "key" },
    "<thead><tr><th>Q</th><th>Answer</th><th>Correct option</th></tr></thead><tbody>" +
    key.map(function (k) { return "<tr><td>" + k[0] + "</td><td>" + k[1] + "</td><td>" + esc(k[2]) + "</td></tr>"; }).join("") +
    "</tbody>"));
  part3.appendChild(el("p", { "class": "footer-line" }, "Introduction to HSE for Oil &amp; Gas · Paleon Training Limited · corporate@paleontraining.com · Keep this answer key for course administrators only; don't publish it to learners."));
  main.appendChild(part3);

  document.title = "Introduction to HSE for Oil & Gas - content pack for NiYA";
  document.body.setAttribute("data-pack-ready", "1");
})();
