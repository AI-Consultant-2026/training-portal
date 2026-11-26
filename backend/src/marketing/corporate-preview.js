// Free leadership preview sign-up (2026-11-13): posts to /api/leads/corporate-preview and
// opens the sample module straight away. External file because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var form = document.getElementById("pvForm");
  if (!form) return;
  var submit = document.getElementById("pvSubmit");
  var errorBox = document.getElementById("pvError");
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }
  var hc = window.PaleonHumanCheck ? window.PaleonHumanCheck.mount(form, submit) : null;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    if (!form.checkValidity()) {
      var bad = form.querySelector(":invalid");
      showError(bad && bad.name === "consent" ? "Please tick the box so we can send your preview." : "Please fill in the required fields.");
      if (bad) bad.focus();
      return;
    }
    var fd = new FormData(form);
    var body = { consent: true, updates: fd.get("updates") === "on", page: location.pathname };
    ["name", "email", "organisation", "country", "programme", "website"].forEach(function (k) {
      var v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") body[k] = v.trim();
    });
    if (hc) hc.addTo(body);
    submit.disabled = true;
    submit.textContent = "Opening your preview…";
    fetch("/api/leads/corporate-preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) {
        var hcMsg = !r.ok && hc ? hc.failed(r.status) : null;
        if (hcMsg) throw new Error(hcMsg);
        return r.json().then(function (j) { return { ok: r.ok, j: j }; });
      })
      .then(function (res) {
        if (!res.ok || !res.j.url) throw new Error((res.j && (res.j.message || (res.j.error && res.j.error.message))) || "Something went wrong. Please try again.");
        if (window.ptTrack) window.ptTrack("generate_lead", { lead_type: "corporate_preview", programme: body.programme, country: body.country });
        location.href = res.j.url;
      })
      .catch(function (err) {
        submit.disabled = false;
        submit.textContent = "Open the free preview";
        showError(err.message || "Something went wrong. Please try again.");
      });
  });
})();
