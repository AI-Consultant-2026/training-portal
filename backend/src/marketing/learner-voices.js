/* Learner voices (2026-09-25): fills any <section data-learner-voices> with approved,
   consented learner feedback from /api/testimonials. The section stays hidden until
   there is at least one -- nothing is shown rather than placeholder or invented quotes.
   Optional data-course="<slug>" limits it to one course. Text only (textContent). */
(function () {
  "use strict";
  var sections = document.querySelectorAll("[data-learner-voices]");
  if (!sections.length || !window.fetch) return;
  sections.forEach(function (section) {
    var course = section.getAttribute("data-course");
    var url = "/api/testimonials" + (course ? "?course=" + encodeURIComponent(course) : "");
    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        var items = (data && data.testimonials) || [];
        if (!items.length) return;
        var list = section.querySelector("[data-learner-voices-list]");
        items.slice(0, 6).forEach(function (t) {
          var card = document.createElement("figure");
          card.className = "voice-card";
          var stars = document.createElement("div");
          stars.className = "voice-stars";
          stars.setAttribute("aria-label", t.rating + " out of 5");
          stars.textContent = "★★★★★".slice(0, t.rating) + "☆☆☆☆☆".slice(0, 5 - t.rating);
          var quote = document.createElement("blockquote");
          quote.textContent = "“" + t.comment + "”";
          var who = document.createElement("figcaption");
          who.textContent = t.name + " · " + t.courseTitle;
          card.appendChild(stars);
          card.appendChild(quote);
          card.appendChild(who);
          list.appendChild(card);
        });
        section.hidden = false;
      })
      .catch(function () {});
  });
})();
