// "Buy learner places online" on the corporate programme pages (2026-11-12). Shows the
// price as the buyer types (the server works it out again; this is only a preview), then
// posts to /api/corporate/orders and goes to Flutterwave's checkout, or shows the
// invoice-request thank-you. External file because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var form = document.getElementById("cpBuy");
  if (!form) return;
  var data;
  try { data = JSON.parse(form.getAttribute("data-prices")); } catch (e) { return; }
  var el = function (id) { return document.getElementById(id); };
  var programme = el("cp-programme"), seats = el("cp-seats"), region = el("cp-region");
  var countryRow = el("cp-country-row"), country = el("cp-country");
  var invoice = el("cp-invoice"), invoiceRow = el("cp-invoice-row");
  var totalBox = el("cpTotal"), submit = el("cpSubmit"), errorBox = el("cpError"), thanks = el("cpThanks");
  var SYMBOL = { NG: "₦", GH: "GH₵", KE: "KSh ", ZA: "R", INTL: "£" };
  var PROGRAMMES = ["cybersecure", "ai-workflow", "accelerator"];

  // Arriving from the hub's "Other countries" column: ?region=INTL.
  var asked = new URLSearchParams(location.search).get("region");
  if (asked && region.querySelector('option[value="' + asked + '"]')) region.value = asked;

  function money(r, n) { return SYMBOL[r] + Number(n).toLocaleString("en-GB"); }
  function discount(n) {
    var d = 0;
    data.tiers.forEach(function (t) { if (n >= t[0]) d = t[1]; });
    return d;
  }
  function quote() {
    var r = region.value, p = programme.value, n = Math.floor(Number(seats.value));
    if (!(n >= 1)) return null;
    var list, unit;
    if (p === "all-three") {
      list = PROGRAMMES.reduce(function (s, k) { return s + data.prices[k][r]; }, 0);
      var step = r === "INTL" ? 1 : 10;
      unit = Math.floor((list * (1 - Math.max(data.bundle, discount(n)))) / step + 1e-9) * step;
    } else {
      list = data.prices[p][r];
      unit = Math.round(list * (1 - discount(n)));
    }
    return { r: r, n: n, list: list, unit: unit, total: unit * n, off: Math.round((1 - unit / list) * 100), invoiceOnly: n >= data.invoiceFrom };
  }

  function update() {
    countryRow.hidden = region.value !== "INTL";
    country.required = region.value === "INTL";
    var q = quote();
    if (!q) { totalBox.textContent = ""; return; }
    totalBox.innerHTML = "";
    var line = document.createElement("p");
    line.className = "cp-total-line";
    line.textContent = q.n + (q.n === 1 ? " learner" : " learners") + " × " + money(q.r, q.unit) + (q.off ? " (" + q.off + "% off)" : "") + " = ";
    var strong = document.createElement("strong");
    strong.textContent = money(q.r, q.total);
    line.appendChild(strong);
    totalBox.appendChild(line);
    var note = document.createElement("p");
    note.className = "cp-total-note";
    note.textContent = q.invoiceOnly ? "Orders of " + data.invoiceFrom + " or more learners are invoiced: we will email the invoice within one working day." : "Plus VAT where applicable.";
    totalBox.appendChild(note);
    invoiceRow.hidden = q.invoiceOnly;
    submit.textContent = q.invoiceOnly || invoice.checked ? "Request an invoice" : "Continue to secure payment";
  }
  [programme, seats, region, invoice].forEach(function (x) { x.addEventListener("input", update); x.addEventListener("change", update); });
  update();

  function showError(msg) { errorBox.textContent = msg; errorBox.hidden = false; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    if (!form.checkValidity()) {
      var bad = form.querySelector(":invalid");
      showError(bad && bad.name === "consent" ? "Please tick the box to agree to the terms." : "Please fill in the required fields.");
      if (bad) bad.focus();
      return;
    }
    var q = quote();
    var fd = new FormData(form);
    var body = { consent: true, seats: q ? q.n : 0, payByInvoice: invoice.checked };
    ["programme", "region", "buyerCountry", "organisation", "contactName", "contactEmail", "phone", "website"].forEach(function (k) {
      var v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") body[k] = v.trim();
    });
    submit.disabled = true;
    fetch("/api/corporate/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (json) {
          if (!res.ok) {
            var msg = res.status === 429 ? "Too many attempts. Please try again later." : (json.error && (json.error.message || json.error)) || json.message || "Please check your details and try again.";
            throw { userMessage: typeof msg === "string" && msg !== "Validation failed" ? msg : "Please check your details and try again." };
          }
          return json;
        });
      })
      .then(function (json) {
        if (window.ptTrack) window.ptTrack("begin_checkout", { form: "corporate_order", programme: body.programme, region: body.region, seats: body.seats, kind: json.kind, value: q ? q.total : 0 });
        if (json.kind === "checkout" && json.paymentLink) {
          window.location.href = json.paymentLink;
          return;
        }
        form.hidden = true;
        thanks.hidden = false;
        thanks.focus();
      })
      .catch(function (err) {
        showError((err && err.userMessage) || "Something went wrong. Please email corporate@paleontraining.com.");
      })
      .then(function () { submit.disabled = false; });
  });
})();
