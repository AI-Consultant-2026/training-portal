// Interactive walkthrough for /ambassador-walkthrough (2026-10-02). Without JS the page shows
// every step one after another; with it, one step at a time with Back/Next, part buttons,
// arrow keys, a progress bar, #step-N deep links and Airtime/Data switches. Loaded from a
// file because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");

  var section = document.getElementById("walkthrough");
  var steps = Array.prototype.slice.call(document.querySelectorAll(".wt-step"));
  if (!section || !steps.length) return;
  section.classList.add("js-wt");

  var prev = document.getElementById("wt-prev");
  var next = document.getElementById("wt-next");
  var count = document.getElementById("wt-count");
  var bar = document.getElementById("wt-progress-bar");
  var keys = document.getElementById("wt-keys");
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chap"));
  var current = 0;

  if (keys && window.matchMedia && window.matchMedia("(hover: hover)").matches) keys.hidden = false;

  function track(name, params) {
    if (typeof window.ptTrack === "function") window.ptTrack(name, params);
  }

  function show(index, opts) {
    opts = opts || {};
    current = Math.max(0, Math.min(steps.length - 1, index));
    var activeChapter = steps[current].getAttribute("data-chapter");
    steps.forEach(function (step, i) {
      var on = i === current;
      step.classList.toggle("is-active", on);
      step.setAttribute("aria-hidden", on ? "false" : "true");
    });
    chapters.forEach(function (btn) {
      var ch = btn.getAttribute("data-chapter");
      btn.setAttribute("aria-current", ch === activeChapter ? "true" : "false");
      btn.classList.toggle("done", Number(ch) < Number(activeChapter));
    });
    prev.disabled = current === 0;
    next.textContent = current === steps.length - 1 ? "Get your code →" : "Next →";
    count.textContent = "Step " + (current + 1) + " of " + steps.length;
    bar.style.width = ((current + 1) / steps.length) * 100 + "%";
    if (opts.updateHash !== false && window.history && history.replaceState) {
      history.replaceState(null, "", "#step-" + (current + 1));
    }
    if (opts.scroll) {
      var top = section.getBoundingClientRect().top + window.pageYOffset - 12;
      if (window.pageYOffset > top || opts.force) window.scrollTo({ top: top, behavior: "smooth" });
    }
    if (opts.focus) {
      var heading = steps[current].querySelector("h3");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
    track("ambassador_walkthrough_step", { step: current + 1 });
  }

  prev.addEventListener("click", function () {
    show(current - 1, { scroll: true, focus: true });
  });
  next.addEventListener("click", function () {
    if (current === steps.length - 1) {
      track("ambassador_walkthrough_finish", {});
      window.location.href = "/refer/me";
      return;
    }
    show(current + 1, { scroll: true, focus: true });
  });
  chapters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ch = btn.getAttribute("data-chapter");
      for (var i = 0; i < steps.length; i++) {
        if (steps[i].getAttribute("data-chapter") === ch) return show(i, { scroll: true, focus: true });
      }
    });
  });

  // Arrow keys move through steps, unless the visitor is typing or using the search box.
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var overlay = document.getElementById("pt-search-overlay");
    if (overlay && !overlay.hidden) return;
    var rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    if (e.key === "ArrowRight") { e.preventDefault(); if (current < steps.length - 1) show(current + 1, { focus: true }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1, { focus: true }); }
  });

  // Airtime / Data switches: the same choice is mirrored across every switch on the page,
  // so picking Data once shows the data version of each step.
  var segButtons = Array.prototype.slice.call(document.querySelectorAll(".seg-btn"));
  function choose(key) {
    segButtons.forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-key") === key ? "true" : "false");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-seg-pane], [data-seg-visual]"), function (el) {
      el.hidden = el.getAttribute("data-key") !== key;
    });
  }
  segButtons.forEach(function (b) {
    b.addEventListener("click", function () {
      choose(b.getAttribute("data-key"));
      track("ambassador_walkthrough_reward_type", { type: b.getAttribute("data-key") });
    });
  });

  function fromHash() {
    var m = /^#step-(\d+)$/.exec(window.location.hash || "");
    return m ? Number(m[1]) - 1 : null;
  }
  var start = fromHash();
  show(start === null ? 0 : start, { updateHash: start !== null });
  // A #step-N link: the browser's own jump lands on the step itself, which hides the progress
  // bar and part buttons above it, so line the whole walkthrough up instead once it's settled.
  if (start !== null) {
    window.addEventListener("load", function () {
      setTimeout(function () { show(current, { scroll: true, force: true, updateHash: false }); }, 0);
    });
  }
  window.addEventListener("hashchange", function () {
    var i = fromHash();
    if (i !== null && i !== current) show(i, { scroll: true, force: true, updateHash: false });
  });
})();
