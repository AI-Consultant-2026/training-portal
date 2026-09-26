/* /ambassadors page (2026-09-26): copy buttons for the message templates, and a
   "present" mode that shows one section per screen for welcome calls on Zoom. Start it
   with the "Present this page" button or by opening /ambassadors?present. Arrow keys,
   Page Up/Down, Space and the on-screen buttons move between slides; Esc exits. External
   file because the CSP blocks inline JS. */
(function () {
  "use strict";

  /* ---------------- copy buttons ---------------- */

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        fallbackCopy(text, done);
      });
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
    } catch (e) {
      // Nothing more to try; the text is still visible to select by hand.
    }
    document.body.removeChild(area);
  }

  var copyButtons = document.querySelectorAll("[data-copy]");
  for (var i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener("click", function (e) {
      var button = e.currentTarget;
      var source = document.getElementById(button.getAttribute("data-copy"));
      if (!source) return;
      copyText(source.textContent, function () {
        button.textContent = "Copied!";
        setTimeout(function () {
          button.textContent = "Copy";
        }, 2000);
      });
    });
  }

  /* ---------------- present mode ---------------- */

  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-slide]"));
  var bar = document.querySelector(".present-bar");
  var counter = bar && bar.querySelector(".present-count");
  var current = 0;
  var presenting = false;

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    for (var j = 0; j < slides.length; j++) slides[j].classList.toggle("is-current", j === current);
    if (counter) counter.textContent = current + 1 + " / " + slides.length;
    window.scrollTo(0, 0);
  }

  function start(index) {
    if (!slides.length || !bar) return;
    presenting = true;
    document.body.classList.add("presenting");
    bar.hidden = false;
    show(index || 0);
  }

  function stop() {
    var slide = slides[current];
    presenting = false;
    document.body.classList.remove("presenting");
    for (var j = 0; j < slides.length; j++) slides[j].classList.remove("is-current");
    if (bar) bar.hidden = true;
    if (slide) slide.scrollIntoView();
  }

  var startButtons = document.querySelectorAll("[data-present-start]");
  for (var k = 0; k < startButtons.length; k++) {
    startButtons[k].addEventListener("click", function () {
      start(0);
    });
  }
  if (bar) {
    bar.querySelector("[data-present-prev]").addEventListener("click", function () {
      show(current - 1);
    });
    bar.querySelector("[data-present-next]").addEventListener("click", function () {
      show(current + 1);
    });
    bar.querySelector("[data-present-exit]").addEventListener("click", stop);
  }

  document.addEventListener("keydown", function (e) {
    if (!presenting || e.altKey || e.ctrlKey || e.metaKey) return;
    var key = e.key;
    if (key === "ArrowRight" || key === "ArrowDown" || key === "PageDown" || key === " ") {
      e.preventDefault();
      show(current + 1);
    } else if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp") {
      e.preventDefault();
      show(current - 1);
    } else if (key === "Home") {
      e.preventDefault();
      show(0);
    } else if (key === "End") {
      e.preventDefault();
      show(slides.length - 1);
    } else if (key === "Escape") {
      stop();
    }
  });

  if (/(?:^|[?&])present(?:=|&|$)/.test(location.search)) start(0);
})();
