// AI Workflow Productivity corporate pages (2026-11-02): every CTA preselects the enquiry
// form's intent and scrolls to it; the form posts to /api/leads/corporate. External file
// because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  // GA4 (2026-11-08): which country an employer picks on the homepage's "Choose your
  // country" selector and footer, and clicks to the director resources.
  document.addEventListener("click", function (e) {
    if (!window.ptTrack || !e.target.closest) return;
    var pick = e.target.closest(".ca-choose [data-pick-country], .footer-country[data-pick-country], .country-menu-item[data-pick-country]");
    if (pick) window.ptTrack("corporate_country_select", { country: pick.getAttribute("data-pick-country"), link_location: pick.classList.contains("footer-country") ? "footer" : pick.classList.contains("country-menu-item") ? "header_menu" : "homepage_selector" });
    var res = e.target.closest('a[href^="/ai-cyber-readiness-check"], a[href="/ai-use-policy-template"], a[href="/board-cyber-risk-briefing"]');
    if (res) window.ptTrack("director_resource_click", { resource: res.getAttribute("href").split("?")[0].slice(1), page_path: location.pathname });
  });
  var form = document.getElementById("caForm");
  if (!form) return;
  var submit = document.getElementById("caSubmit");
  var errorBox = document.getElementById("caError");
  var thanks = document.getElementById("caThanks");
  // Each programme's page sets its own button labels on the form (CyberSecure Workforce, 2026-11-02).
  var LABELS = {
    consultation: form.getAttribute("data-consultation-label") || "Book a Corporate Training Consultation",
    proposal: form.getAttribute("data-proposal-label") || "Request Corporate Training Proposal",
  };
  var programme = form.getAttribute("data-programme") || "ai-workflow";

  function setIntent(intent) {
    var radio = form.querySelector('input[name="intent"][value="' + intent + '"]');
    if (radio) radio.checked = true;
    submit.textContent = LABELS[intent] || LABELS.proposal;
  }
  setIntent("consultation");

  document.querySelectorAll("[data-intent]").forEach(function (el) {
    el.addEventListener("click", function () {
      setIntent(el.getAttribute("data-intent"));
      if (window.ptTrack) window.ptTrack("corporate_cta_click", { intent: el.getAttribute("data-intent"), programme: programme, country: form.getAttribute("data-country") });
    });
  });
  form.querySelectorAll('input[name="intent"]').forEach(function (r) {
    r.addEventListener("change", function () { setIntent(r.value); });
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    if (!form.checkValidity()) {
      var bad = form.querySelector(":invalid");
      if (bad && bad.name === "consent") showError("Please tick the box so we can reply to your enquiry.");
      else showError("Please fill in the required fields.");
      if (bad) bad.focus();
      return;
    }
    var fd = new FormData(form);
    var body = { consent: true, updates: fd.get("updates") === "on", page: location.pathname, programme: programme };
    ["name", "jobTitle", "organisation", "country", "email", "phone", "employees", "department", "requirement", "delivery", "message", "intent", "website"].forEach(function (k) {
      var v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") body[k] = v.trim();
    });
    submit.disabled = true;
    fetch("/api/leads/corporate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (res) {
        if (!res.ok) throw { userMessage: res.status === 429 ? "Too many attempts. Please try again in a few minutes." : "Please check your details and try again." };
        form.hidden = true;
        thanks.hidden = false;
        thanks.focus();
        if (window.ptTrack) window.ptTrack("generate_lead", { form: "corporate_" + programme.replace(/-/g, "_"), lead_type: "corporate", programme: programme, country: body.country, intent: body.intent, page_path: location.pathname });
      })
      .catch(function (err) {
        showError((err && err.userMessage) || "Something went wrong. Please email corporate@paleontraining.com.");
      })
      .then(function () { submit.disabled = false; });
  });
})();
