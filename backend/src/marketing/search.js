/* Paleon Training -- site search widget behaviour. Pairs with search-widget.css
   and the HTML injected near the top of <body> on every public marketing page.
   Fetches /search-index.json (built from the same 32 pages listed in sitemap.xml
   plus /terms and /privacy) lazily on first open, then filters client-side. */
(function () {
  "use strict";

  var POPULAR_URLS = [
    "/digital-skills-training-nigeria",
    "/oil-and-gas-careers-nigeria",
    "/corporate-training-nigeria",
    "/graduate-to-job-ready-nigeria",
    "/university-partners",
  ];

  var trigger = document.getElementById("pt-search-trigger");
  var overlay = document.getElementById("pt-search-overlay");
  var input = document.getElementById("pt-search-input");
  var results = document.getElementById("pt-search-results");
  var closeBtn = document.getElementById("pt-search-close");

  if (!trigger || !overlay || !input || !results) return;

  var index = null;
  var indexPromise = null;
  var activeIndex = -1;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch("/search-index.json")
        .then(function (r) { return r.json(); })
        .then(function (data) { index = data; return data; })
        .catch(function () { index = []; return index; });
    }
    return indexPromise;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderList(items, sectionLabel) {
    if (!items.length) {
      results.innerHTML = '<p class="pt-search-empty">No pages match that search. Try a different word.</p>';
      return;
    }
    var html = "";
    if (sectionLabel) html += '<p class="pt-search-section-label">' + sectionLabel + "</p>";
    items.forEach(function (item, i) {
      html +=
        '<a class="pt-search-result" href="' + item.url + '" data-idx="' + i + '">' +
        '<span class="pt-search-result-cat">' + escapeHtml(item.category) + "</span>" +
        '<p class="pt-search-result-title">' + escapeHtml(item.title) + "</p>" +
        '<p class="pt-search-result-desc">' + escapeHtml(item.description) + "</p>" +
        "</a>";
    });
    results.innerHTML = html;
    activeIndex = -1;
  }

  function renderPopular() {
    var popular = POPULAR_URLS
      .map(function (u) { return index.filter(function (e) { return e.url === u; })[0]; })
      .filter(Boolean);
    renderList(popular, "Popular pages");
  }

  function score(entry, q) {
    var title = entry.title.toLowerCase();
    var desc = entry.description.toLowerCase();
    var cat = entry.category.toLowerCase();
    var s = 0;
    if (title.indexOf(q) === 0) s += 6;
    else if (title.indexOf(q) !== -1) s += 4;
    if (cat.indexOf(q) !== -1) s += 2;
    if (desc.indexOf(q) !== -1) s += 1;
    return s;
  }

  function runSearch(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      if (index) renderPopular();
      return;
    }
    var scored = index
      .map(function (entry) { return { entry: entry, s: score(entry, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8)
      .map(function (x) { return x.entry; });
    renderList(scored, null);
  }

  function openSearch() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    loadIndex().then(function () { runSearch(input.value); });
    setTimeout(function () { input.focus(); }, 0);
  }

  function closeSearch() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    trigger.focus();
  }

  function moveActive(delta) {
    var items = results.querySelectorAll(".pt-search-result");
    if (!items.length) return;
    activeIndex = (activeIndex + delta + items.length) % items.length;
    items.forEach(function (el, i) { el.classList.toggle("is-active", i === activeIndex); });
    items[activeIndex].scrollIntoView({ block: "nearest" });
  }

  trigger.addEventListener("click", openSearch);
  closeBtn.addEventListener("click", closeSearch);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeSearch();
  });
  input.addEventListener("input", function () { runSearch(input.value); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
    else if (e.key === "Enter") {
      var active = results.querySelector(".pt-search-result.is-active") || results.querySelector(".pt-search-result");
      if (active) { window.location.href = active.getAttribute("href"); }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) { closeSearch(); return; }
    if (e.key === "/" && overlay.hidden) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      openSearch();
    }
  });
})();
