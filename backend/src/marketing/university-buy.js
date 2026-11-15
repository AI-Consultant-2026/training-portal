// "Buy places for your students" on /<country>/universities (2026-11-15). Shows the price
// as the buyer types (the server works it out again; this is only a preview), then posts
// to /api/corporate/university-orders and goes to Flutterwave's checkout, or shows the
// invoice-request thank-you. External file because the site's CSP blocks inline scripts.
(function () {
  "use strict";
  var form = document.getElementById("uniBuy");
  if (!form) return;
  var data;
  try { data = JSON.parse(form.getAttribute("data-prices")); } catch (e) { return; }
  var el = function (id) { return document.getElementById(id); };
  var inputs = Array.prototype.slice.call(form.querySelectorAll(".uni-seats"));
  var invoice = el("uni-invoice"), totalBox = el("uniTotal"), submit = el("uniSubmit"), errorBox = el("uniError"), thanks = el("uniThanks");

  function money(n) { return data.symbol + (data.spaced ? " " : "") + Number(n).toLocaleString("en-GB"); }
  function percentFor(n) {
    var p = 0;
    data.tiers.forEach(function (t) { if (n >= t[0]) p = t[1]; });
    return p;
  }
  function quote() {
    var lines = [];
    inputs.forEach(function (input) {
      var n = Math.floor(Number(input.value));
      if (!(n > 0)) return;
      var slug = input.getAttribute("data-course");
      var list = data.prices[slug];
      var off = percentFor(n);
      var unit = Math.round(list * (1 - off / 100));
      var label = form.querySelector('label[for="' + input.id + '"]');
      lines.push({ slug: slug, title: label ? label.firstChild.textContent.trim() : slug, seats: n, unit: unit, off: off, total: unit * n });
    });
    return lines;
  }

  function update() {
    var lines = quote();
    totalBox.innerHTML = "";
    submit.textContent = invoice.checked ? "Request an invoice" : "Continue to secure payment";
    if (!lines.length) return;
    var list = document.createElement("ul");
    list.className = "uni-lines";
    var total = 0, seats = 0;
    lines.forEach(function (l) {
      total += l.total; seats += l.seats;
      var li = document.createElement("li");
      li.textContent = l.title + ": " + l.seats + " × " + money(l.unit) + (l.off ? " (" + l.off + "% off)" : "") + " = " + money(l.total);
      list.appendChild(li);
    });
    totalBox.appendChild(list);
    var line = document.createElement("p");
    line.className = "cp-total-line";
    line.textContent = seats + (seats === 1 ? " place" : " places") + ", total ";
    var strong = document.createElement("strong");
    strong.textContent = money(total);
    line.appendChild(strong);
    totalBox.appendChild(line);
  }
  inputs.concat([invoice]).forEach(function (x) { x.addEventListener("input", update); x.addEventListener("change", update); });
  update();

  function showError(msg) { errorBox.textContent = msg; errorBox.hidden = false; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    var lines = quote();
    if (!lines.length) {
      showError("Enter the number of students for at least one course.");
      if (inputs[0]) inputs[0].focus();
      return;
    }
    if (!form.checkValidity()) {
      var bad = form.querySelector(":invalid");
      showError(bad && bad.name === "consent" ? "Please tick the box to agree to the terms." : "Please fill in the required fields.");
      if (bad) bad.focus();
      return;
    }
    var fd = new FormData(form);
    var body = {
      consent: true,
      country: data.country,
      payByInvoice: invoice.checked,
      items: lines.map(function (l) { return { courseSlug: l.slug, seats: l.seats }; }),
    };
    ["organisation", "contactName", "contactEmail", "phone", "website"].forEach(function (k) {
      var v = fd.get(k);
      if (typeof v === "string" && v.trim() !== "") body[k] = v.trim();
    });
    submit.disabled = true;
    fetch("/api/corporate/university-orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
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
        var value = lines.reduce(function (s, l) { return s + l.total; }, 0);
        if (window.ptTrack) window.ptTrack("begin_checkout", { form: "university_order", country: data.country, seats: lines.reduce(function (s, l) { return s + l.seats; }, 0), kind: json.kind, value: value });
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
