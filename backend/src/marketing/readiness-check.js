// The AI & Cyber Readiness Check (2026-11-08, views/directorResources.ts): scores the ten
// answers in the browser for an instant result, then "Email me my scorecard" posts the
// answers to /api/leads/readiness, which scores them again on the server. External file
// because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var quiz = document.getElementById("rcQuiz");
  var dataEl = document.getElementById("rcData");
  if (!quiz || !dataEl) return;
  var data = JSON.parse(dataEl.textContent);
  var result = document.getElementById("rcResult");
  var answers = null;
  var band = null;

  function track(name, params) {
    if (window.ptTrack) window.ptTrack(name, params);
  }

  function pct(list) {
    var total = list.reduce(function (s, a) { return s + a; }, 0);
    return Math.round((total / (list.length * 2)) * 100);
  }

  function bandFor(score) {
    return score <= 40 ? "early" : score <= 70 ? "developing" : "strong";
  }

  function el(tag, text) {
    var node = document.createElement(tag);
    node.textContent = text;
    return node;
  }

  quiz.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = document.getElementById("rcQuizError");
    var picked = data.questions.map(function (q) {
      var input = quiz.querySelector('input[name="' + q.id + '"]:checked');
      return input ? Number(input.value) : null;
    });
    var missing = picked.indexOf(null);
    if (missing !== -1) {
      err.textContent = "Please answer all ten questions (question " + (missing + 1) + " is unanswered).";
      err.hidden = false;
      var first = quiz.querySelector('input[name="' + data.questions[missing].id + '"]');
      if (first) first.focus();
      return;
    }
    err.hidden = true;
    answers = picked;
    var cyber = pct(answers.filter(function (a, i) { return data.questions[i].area === "cyber"; }));
    var ai = pct(answers.filter(function (a, i) { return data.questions[i].area === "ai"; }));
    var score = pct(answers);
    band = bandFor(score);

    document.getElementById("rcScore").textContent = score + "%";
    document.getElementById("rcBand").textContent = data.bands[band].label;
    document.getElementById("rcSummary").textContent = data.bands[band].summary;
    document.getElementById("rcCyber").textContent = cyber + "%";
    document.getElementById("rcAi").textContent = ai + "%";
    document.getElementById("rcCyberBar").style.width = cyber + "%";
    document.getElementById("rcAiBar").style.width = ai + "%";

    var gaps = document.getElementById("rcGaps");
    gaps.textContent = "";
    data.questions
      .map(function (q, i) { return { q: q.q, a: answers[i] }; })
      .filter(function (g) { return g.a < 2; })
      .sort(function (x, y) { return x.a - y.a; })
      .slice(0, 5)
      .forEach(function (g) { gaps.appendChild(el("li", g.q)); });
    if (!gaps.children.length) gaps.appendChild(el("li", "No major gaps: keep your training and policies up to date."));

    var order = cyber <= ai ? ["cybersecure-workforce", "ai-workflow"] : ["ai-workflow", "cybersecure-workforce"];
    if (cyber > 70 && ai > 70) order.unshift("ai-cyber-accelerator");
    // A tailored recommendation (2026-11-13): why the first programme, then what each costs.
    var reason = document.getElementById("rcReason");
    reason.textContent =
      order[0] === "ai-cyber-accelerator"
        ? "Your scores are strong in both areas, so the next step is developing the specialists who will lead secure AI adoption."
        : order[0] === "cybersecure-workforce"
          ? "Cybersecurity (" + cyber + "%) is your weaker area, so start there: most incidents begin with a person, and this is the fastest gap to close."
          : "AI use (" + ai + "%) is your weaker area, so start there: clear rules and practical training turn ad-hoc AI use into safe, measurable time savings.";
    var suggest = document.getElementById("rcSuggest");
    suggest.textContent = "";
    order.forEach(function (key, i) {
      var p = data.programmes[key];
      var li = document.createElement("li");
      var a = el("a", (i === 0 ? "Start with " : "Then ") + p.name + " →");
      a.href = p.url;
      li.appendChild(a);
      li.appendChild(el("span", p.price));
      var b = el("a", "Brochure (PDF)");
      b.href = p.brochure;
      b.className = "rc-brochure";
      li.appendChild(b);
      suggest.appendChild(li);
    });
    // A rough cost for closing the priority gaps, using the first recommendation (2026-11-13).
    var first = data.programmes[order[0]];
    document.getElementById("rcCost").textContent =
      "Rough cost to close your priority gaps: about " + first.example + " for " + data.exampleStaff +
      " staff on " + first.name + ", self-paced (10% volume discount included), or " + first.pilot +
      " for a " + data.pilotStaff + "-learner pilot first. All training is online and in-house, self-paced. Your scorecard email includes the full breakdown.";

    quiz.hidden = true;
    result.hidden = false;
    result.focus();
    window.scrollTo({ top: result.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
    track("readiness_check_complete", { score_band: band, score: score });
  });

  var form = document.getElementById("rcEmail");
  var submit = document.getElementById("rcSubmit");
  var errorBox = document.getElementById("rcError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    if (!form.checkValidity()) {
      var bad = form.querySelector(":invalid");
      errorBox.textContent = bad && bad.name === "consent" ? "Please tick the box so we can email your scorecard." : "Please fill in the required fields.";
      errorBox.hidden = false;
      if (bad) bad.focus();
      return;
    }
    var fd = new FormData(form);
    var body = { consent: true, updates: fd.get("updates") === "on", proposal: fd.get("proposal") === "on", answers: answers, page: location.pathname };
    ["name", "jobTitle", "organisation", "country", "email", "employees", "website"].forEach(function (k) {
      var v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") body[k] = v.trim();
    });
    submit.disabled = true;
    fetch("/api/leads/readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (!res.ok) throw { userMessage: res.status === 429 ? "Too many attempts. Please try again in a few minutes." : "Please check your details and try again." };
        form.hidden = true;
        var thanks = document.getElementById("rcThanks");
        thanks.hidden = false;
        thanks.focus();
        track("generate_lead", { form: "readiness_check", lead_type: "corporate", country: body.country, score_band: band, wants_proposal: body.proposal });
      })
      .catch(function (err) {
        errorBox.textContent = (err && err.userMessage) || "Something went wrong. Please email corporate@paleontraining.com.";
        errorBox.hidden = false;
      })
      .then(function () { submit.disabled = false; });
  });
})();
