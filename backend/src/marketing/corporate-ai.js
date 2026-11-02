// AI Workflow Productivity corporate pages (2026-11-02): every CTA preselects the enquiry
// form's intent and scrolls to it; the form posts to /api/leads/corporate. External file
// because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var form = document.getElementById("caForm");
  if (!form) return;
  var submit = document.getElementById("caSubmit");
  var errorBox = document.getElementById("caError");
  var thanks = document.getElementById("caThanks");
  // Each programme's page sets its own button labels on the form (CyberSecure Workforce, 2026-11-02).
  var LABELS = {
    consultation: form.getAttribute("data-consultation-label") || "Book a Corporate AI Training Consultation",
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
        if (window.ptTrack) window.ptTrack("generate_lead", { form: programme === "cybersecure-workforce" ? "corporate_cybersecure_workforce" : "corporate_ai_workflow", country: body.country, intent: body.intent });
      })
      .catch(function (err) {
        showError((err && err.userMessage) || "Something went wrong. Please email corporate@paleontraining.com.");
      })
      .then(function () { submit.disabled = false; });
  });
})();
