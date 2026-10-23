/* Introduction to HSE for Oil & Gas: taster course runtime.
   One file, no dependencies. Inside an LMS it talks to the SCORM 1.2 API
   (progress, bookmark, quiz score, passed status); on its own, as the preview on
   paleontraining.com, it keeps progress in localStorage instead. Kept as an
   external file because the site's CSP blocks inline scripts. */
(function () {
  "use strict";

  var PASS_MARK = 70;
  var STORE_KEY = "paleon-niya-hse-taster-v1";

  // ---------- SCORM 1.2 ----------
  function findApi(win) {
    var tries = 0;
    while (win && tries < 10) {
      if (win.API) return win.API;
      if (!win.parent || win.parent === win) break;
      win = win.parent;
      tries++;
    }
    return null;
  }
  var api = null;
  try {
    api = findApi(window) || (window.opener ? findApi(window.opener) : null);
  } catch (e) {
    api = null; // cross-origin parent: treat as standalone
  }
  var lmsOn = false;
  if (api) {
    try { lmsOn = String(api.LMSInitialize("")) === "true"; } catch (e) { lmsOn = false; }
  }
  function lmsGet(k) { try { return lmsOn ? String(api.LMSGetValue(k) || "") : ""; } catch (e) { return ""; } }
  function lmsSet(k, v) { try { if (lmsOn) api.LMSSetValue(k, String(v)); } catch (e) { /* ignore */ } }
  function lmsCommit() { try { if (lmsOn) api.LMSCommit(""); } catch (e) { /* ignore */ } }

  var startTime = Date.now();
  function sessionTime() {
    var s = Math.round((Date.now() - startTime) / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    function p(n, w) { n = String(n); while (n.length < w) n = "0" + n; return n; }
    return p(h, 4) + ":" + p(m, 2) + ":" + p(sec, 2);
  }
  var finished = false;
  function finish() {
    if (!lmsOn || finished) return;
    finished = true;
    lmsSet("cmi.core.session_time", sessionTime());
    lmsSet("cmi.core.exit", state.passed ? "" : "suspend");
    lmsCommit();
    try { api.LMSFinish(""); } catch (e) { /* ignore */ }
  }
  window.addEventListener("pagehide", finish);
  window.addEventListener("beforeunload", finish);

  // ---------- State ----------
  var state = { u: 0, done: [], best: 0, passed: false };
  function loadState() {
    var raw = lmsOn ? lmsGet("cmi.suspend_data") : "";
    if (!lmsOn) { try { raw = window.localStorage.getItem(STORE_KEY) || ""; } catch (e) { raw = ""; } }
    if (raw) {
      try {
        var s = JSON.parse(raw);
        if (s && typeof s === "object") {
          state.u = typeof s.u === "number" ? s.u : 0;
          state.done = Array.isArray(s.done) ? s.done : [];
          state.best = typeof s.best === "number" ? s.best : 0;
          state.passed = !!s.passed;
        }
      } catch (e) { /* start fresh */ }
    }
    if (lmsOn) {
      var status = lmsGet("cmi.core.lesson_status");
      if (status === "passed") state.passed = true;
      if (!status || status === "not attempted") lmsSet("cmi.core.lesson_status", "incomplete");
      lmsSet("cmi.core.score.min", 0);
      lmsSet("cmi.core.score.max", 100);
    }
  }
  function saveState() {
    var raw = JSON.stringify(state);
    if (lmsOn) {
      lmsSet("cmi.suspend_data", raw);
      lmsSet("cmi.core.lesson_location", String(state.u));
      lmsCommit();
    } else {
      try { window.localStorage.setItem(STORE_KEY, raw); } catch (e) { /* private mode: no saving */ }
    }
  }

  // ---------- Units and navigation ----------
  var units = Array.prototype.slice.call(document.querySelectorAll(".unit"));
  var QUIZ_UNIT = units.length - 2;
  var list = document.getElementById("unit-list");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var navButtons = [];

  units.forEach(function (sec, i) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = (i + 1) + ". " + sec.getAttribute("data-title");
    b.addEventListener("click", function () { go(i); });
    li.appendChild(b);
    list.appendChild(li);
    navButtons.push(b);
  });

  function markDone(i) {
    if (i === QUIZ_UNIT && !state.passed) return; // the quiz only counts once passed
    if (state.done.indexOf(i) === -1) state.done.push(i);
  }
  function render() {
    units.forEach(function (sec, i) { sec.classList.toggle("active", i === state.u); });
    navButtons.forEach(function (b, i) {
      if (i === state.u) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      b.classList.toggle("done", state.done.indexOf(i) !== -1);
    });
    var pct = Math.round((state.done.length / units.length) * 100);
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-label").textContent = "Unit " + (state.u + 1) + " of " + units.length;
    prevBtn.disabled = state.u === 0;
    nextBtn.textContent = state.u === units.length - 1 ? "Finish" : "Next";
    nextBtn.disabled = state.u === units.length - 1 && state.done.length === units.length;
    var cur = navButtons[state.u];
    if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: "nearest", inline: "center" }); } catch (e) { /* old browsers */ } }
    renderCompletion();
  }
  function go(i) {
    if (i < 0 || i >= units.length) return;
    markDone(state.u);
    state.u = i;
    if (i !== QUIZ_UNIT) markDone(i);
    saveState();
    render();
    window.scrollTo(0, 0);
    var h = units[i].querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  prevBtn.addEventListener("click", function () { go(state.u - 1); });
  nextBtn.addEventListener("click", function () {
    if (state.u === units.length - 1) { markDone(state.u); saveState(); render(); return; }
    go(state.u + 1);
  });

  function renderCompletion() {
    var el = document.getElementById("completion-note");
    el.hidden = false;
    el.className = state.passed ? "completion" : "completion todo";
    el.textContent = state.passed
      ? "You passed the final quiz (best score " + state.best + "%). You have completed Introduction to HSE for Oil & Gas."
      : "To complete this course, pass the final quiz in Unit 7 with 70% or more.";
  }

  // ---------- Quick checks (unscored) ----------
  Array.prototype.forEach.call(document.querySelectorAll("[data-check] .q"), function (q) {
    var fb = q.querySelector(".fb");
    q.addEventListener("change", function (ev) {
      var right = ev.target.value === q.getAttribute("data-answer");
      fb.textContent = fb.getAttribute(right ? "data-right" : "data-wrong");
      fb.className = "fb " + (right ? "right" : "wrong");
    });
  });

  // ---------- Practice scenario (unscored) ----------
  var SCN_FEEDBACK = {
    1: {
      right: "Well spotted. An \"empty\" tank can still hold flammable vapour and poor air, and the heat, the sludge and the oily surfaces all add risk. Pressure to finish quickly is a hazard too: it's how steps get skipped.",
      wrong: "Look again. There are five real hazards here: vapour, the air inside the tank, heat, manual handling and slips. An \"empty\" tank is not hazard-free, and pressure to finish quickly is a hazard because it's how steps get skipped."
    },
    2: { right: "Correct. A products depot stores fuel after it leaves the wellhead, so it's downstream: NMDPRA.", wrong: "Not quite. A products depot stores fuel after it leaves the wellhead, so it's downstream, which is NMDPRA's area." },
    3: { right: "Correct. Ventilating the tank deals with the hazard itself (an engineering control); testing the air and using a permit to work are administrative controls. Respirators may still be needed, but only as the last line of defence.", wrong: "Not the best choice. Respirators are PPE and a sign is a weak administrative control. Start higher up the hierarchy: ventilate the tank, test the air, and control entry with a permit to work." },
    4: { right: "Correct. Anyone can use Stop Work Authority. Treat the alarm as real until the air is re-tested and the cause is found; switching it off or carrying on could be fatal.", wrong: "No. A gas alarm must be treated as real. Anyone can use Stop Work Authority: get everyone out and re-test before anyone goes back in." }
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-scn-check]"), function (btn) {
    btn.addEventListener("click", function () {
      var n = btn.getAttribute("data-scn-check");
      var step = btn.closest(".scn-step");
      var inputs = Array.prototype.slice.call(step.querySelectorAll("input"));
      var ok;
      if (inputs[0].type === "checkbox") {
        ok = inputs.every(function (inp) { return inp.checked === (inp.getAttribute("data-correct") === "1"); });
      } else {
        var chosen = inputs.filter(function (inp) { return inp.checked; })[0];
        if (!chosen) { var f0 = step.querySelector("[data-scn-fb]"); f0.textContent = "Choose an answer first."; f0.className = "fb wrong"; return; }
        ok = chosen.getAttribute("data-correct") === "1";
      }
      var fb = step.querySelector("[data-scn-fb]");
      fb.textContent = SCN_FEEDBACK[n][ok ? "right" : "wrong"];
      fb.className = "fb " + (ok ? "right" : "wrong");
    });
  });

  // ---------- Final quiz ----------
  // First answer in each list is the correct one; options are shuffled on screen.
  var QUESTIONS = [
    { q: "What does HSE stand for?", a: ["Health, Safety and Environment", "Hazard, Safety and Emergency", "Health, Security and Equipment"], why: "HSE stands for Health, Safety and Environment." },
    { q: "Which best describes a hazard?", a: ["Anything with the potential to cause harm", "An event that has already caused an injury", "A piece of safety equipment"], why: "A hazard is anything with the potential to cause harm, even if it hasn't hurt anyone yet." },
    { q: "Risk is best described as:", a: ["How likely harm is, combined with how severe it would be", "Another word for hazard", "The cost of an incident to the company"], why: "Risk combines likelihood and severity." },
    { q: "A near-miss is:", a: ["An unplanned event where nobody was hurt, but the conditions for harm were there", "A minor injury that only needed first aid", "An incident report that was filed late"], why: "A near-miss caused no harm but could have. Report it: it shows how the next real incident could happen." },
    { q: "Which regulator oversees HSE at a refinery or a fuel depot?", a: ["NMDPRA", "NUPRC", "NESREA"], why: "Refineries and depots are midstream and downstream, after the wellhead: NMDPRA." },
    { q: "Which regulator oversees drilling and production?", a: ["NUPRC", "NMDPRA", "NOSDRA"], why: "Exploration, drilling and production are upstream: NUPRC." },
    { q: "Which agency is responsible for detecting and responding to oil spills?", a: ["NOSDRA", "NUPRC", "NESREA"], why: "NOSDRA, the National Oil Spill Detection and Response Agency, established in 2006." },
    { q: "Which law created NUPRC and NMDPRA?", a: ["The Petroleum Industry Act 2021", "The NESREA Act 2007", "The NOSDRA Act 2006"], why: "Both regulators were created by the Petroleum Industry Act 2021." },
    { q: "Why can't workers rely on smell to detect hydrogen sulphide (H₂S)?", a: ["At high concentrations it deadens the sense of smell", "It only smells when mixed with water", "It has a pleasant smell that people ignore"], why: "At dangerous concentrations H₂S deadens your sense of smell, so gas detectors are used instead." },
    { q: "A corroded pipe leaking gas is mainly which type of hazard?", a: ["Process safety", "Psychosocial", "Ergonomic"], why: "Loss of containment from pipes, valves or vessels is a process safety hazard." },
    { q: "On Nigerian sites, heat stress is made worse by:", a: ["The tropical climate combined with flame-resistant coveralls and heavy work", "Working in air-conditioned control rooms", "Wearing ear defenders"], why: "The climate plus coveralls and physical work make heat stress a daily risk." },
    { q: "Which control is the most effective?", a: ["Eliminating the hazard", "Personal protective equipment (PPE)", "A warning sign"], why: "Elimination is at the top of the hierarchy of controls: if the hazard is gone, nobody can be harmed by it." },
    { q: "Where does PPE sit in the hierarchy of controls?", a: ["Last: it handles whatever risk remains after other controls", "First: it should always be the starting point", "It isn't part of the hierarchy"], why: "PPE is the last line of defence, after elimination, substitution, engineering and administrative controls." },
    { q: "A Job Safety Analysis (JSA) is:", a: ["A risk assessment for one specific task, done before the task starts", "An annual audit of the whole company", "A report written after an accident"], why: "A JSA applies HIRA thinking to one task: break it into steps and agree hazards and controls before starting." },
    { q: "Who has Stop Work Authority on a well-run site?", a: ["Every worker, including contractors, without needing permission first", "Only the site manager", "Only HSE officers"], why: "Every worker can stop a task that looks unsafe, without asking first." }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var quizForm = document.getElementById("quiz");
  var quizResult = document.getElementById("quiz-result");

  function buildQuiz() {
    quizForm.innerHTML = "";
    quizResult.hidden = true;
    QUESTIONS.forEach(function (item, qi) {
      var fs = document.createElement("fieldset");
      fs.className = "qq";
      var lg = document.createElement("legend");
      lg.textContent = (qi + 1) + ". " + item.q;
      fs.appendChild(lg);
      shuffle(item.a.map(function (text, ai) { return { text: text, ok: ai === 0 }; })).forEach(function (opt) {
        var lab = document.createElement("label");
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "fq" + qi;
        inp.value = opt.ok ? "1" : "0";
        lab.appendChild(inp);
        lab.appendChild(document.createTextNode(" " + opt.text));
        fs.appendChild(lab);
      });
      var fb = document.createElement("p");
      fb.className = "fb";
      fs.appendChild(fb);
      quizForm.appendChild(fs);
    });
    var submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn primary";
    submit.textContent = "Submit my answers";
    quizForm.appendChild(submit);
  }

  quizForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var sets = Array.prototype.slice.call(quizForm.querySelectorAll("fieldset"));
    var unanswered = sets.filter(function (fs) { return !fs.querySelector("input:checked"); }).length;
    if (unanswered > 0) {
      quizResult.hidden = false;
      quizResult.className = "quiz-result fail";
      quizResult.textContent = "Please answer all 15 questions. " + unanswered + (unanswered === 1 ? " question is" : " questions are") + " still blank.";
      quizResult.scrollIntoView({ block: "center" });
      return;
    }
    var correct = 0;
    sets.forEach(function (fs, qi) {
      var chosen = fs.querySelector("input:checked");
      var ok = chosen.value === "1";
      if (ok) correct++;
      fs.classList.add(ok ? "right" : "wrong");
      Array.prototype.forEach.call(fs.querySelectorAll("input"), function (inp) { inp.disabled = true; });
      var fb = fs.querySelector(".fb");
      fb.textContent = (ok ? "Correct. " : "Not quite. ") + QUESTIONS[qi].why;
      fb.className = "fb " + (ok ? "right" : "wrong");
    });
    quizForm.querySelector("button[type=submit]").remove();
    var pct = Math.round((correct / QUESTIONS.length) * 100);
    var passed = pct >= PASS_MARK;
    if (pct > state.best) state.best = pct;
    if (passed) state.passed = true;

    lmsSet("cmi.core.score.raw", state.best);
    lmsSet("cmi.core.lesson_status", state.passed ? "passed" : "incomplete");
    if (passed) markDone(QUIZ_UNIT);
    saveState();
    render();

    quizResult.hidden = false;
    quizResult.className = "quiz-result " + (passed ? "pass" : "fail");
    quizResult.innerHTML = "";
    var p = document.createElement("p");
    p.style.margin = "0";
    p.textContent = passed
      ? "You scored " + correct + " out of 15 (" + pct + "%). You passed. Check the explanations above, then go on to Unit 8."
      : "You scored " + correct + " out of 15 (" + pct + "%). You need 11 to pass. Read the explanations above, review the units, then try again.";
    quizResult.appendChild(p);
    var again = document.createElement("button");
    again.type = "button";
    again.className = "btn secondary";
    again.textContent = "Retake the quiz";
    again.addEventListener("click", function () { buildQuiz(); window.scrollTo(0, 0); });
    quizResult.appendChild(again);
    if (passed) {
      var on = document.createElement("button");
      on.type = "button";
      on.className = "btn primary";
      on.textContent = "Go to Unit 8";
      on.addEventListener("click", function () { go(QUIZ_UNIT + 1); });
      quizResult.appendChild(on);
    }
    quizResult.scrollIntoView({ block: "center" });
  });

  // ---------- Start ----------
  if (!lmsOn) document.getElementById("preview-banner").hidden = false;
  loadState();
  if (lmsOn) {
    var loc = parseInt(lmsGet("cmi.core.lesson_location"), 10);
    if (!isNaN(loc)) state.u = loc;
  }
  if (state.u < 0 || state.u >= units.length) state.u = 0;
  if (state.u !== QUIZ_UNIT) markDone(state.u);
  buildQuiz();
  saveState();
  render();
})();
