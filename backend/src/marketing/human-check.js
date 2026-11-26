// Human check for the public forms (2026-11-26): a small sum ("What is seven + 4?") fetched
// from /api/human-check and checked on the server. Each form script calls
//   var hc = window.PaleonHumanCheck && PaleonHumanCheck.mount(form, submitButton);
// then hc.addTo(body) before posting and hc.failed(status) after any failed post (an answer
// is accepted once, so a failed post always needs a new question). External file because
// the site's CSP blocks inline scripts. Loaded once per page even if included twice.
(function () {
  "use strict";
  if (window.PaleonHumanCheck) return;

  var STATUS = 428;
  var MESSAGE = "The answer to the human check wasn’t right (or the question expired). Please answer the new question.";
  var count = 0;

  var css =
    ".pt-hc{margin:0 0 14px;text-align:left}" +
    ".pt-hc-label{display:block}" +
    ".pt-hc-q{font-weight:700;white-space:nowrap}" +
    ".pt-hc-row{display:flex;gap:8px;align-items:stretch}" +
    ".pt-hc-row input{flex:1 1 auto;min-width:0;width:auto!important;margin:0!important}" +
    ".pt-hc-new{flex:0 0 auto;font:inherit;font-size:.85em;font-weight:600;color:inherit;background:transparent;border:1px solid currentColor;border-radius:6px;padding:6px 12px;min-height:44px;cursor:pointer;opacity:.8}" +
    ".pt-hc-new:hover{opacity:1}" +
    ".pt-hc-err{margin:6px 0 0;font-size:.9em;color:#c0392b}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function classOf(form, selector) {
    var el = form.querySelector(selector);
    return el ? el.className : "";
  }

  function mount(form, submitEl) {
    if (!form) return null;
    if (form.__ptHc) return form.__ptHc;
    var id = "pt-hc-" + ++count;
    var wrap = document.createElement("div");
    wrap.className = "pt-hc";

    var label = document.createElement("label");
    label.htmlFor = id;
    label.className = (classOf(form, "label") + " pt-hc-label").trim();
    label.appendChild(document.createTextNode("Quick human check: "));
    var q = document.createElement("span");
    q.className = "pt-hc-q";
    q.textContent = "loading…";
    label.appendChild(q);

    var row = document.createElement("div");
    row.className = "pt-hc-row";
    var input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.name = "humanAnswer";
    input.required = true;
    input.maxLength = 20;
    input.autocomplete = "off";
    input.setAttribute("inputmode", "numeric");
    input.className = classOf(form, 'input[type="email"], input[type="text"], input[type="tel"]');
    var again = document.createElement("button");
    again.type = "button";
    again.className = "pt-hc-new";
    again.textContent = "New question";
    row.appendChild(input);
    row.appendChild(again);

    var err = document.createElement("p");
    err.className = "pt-hc-err";
    err.setAttribute("role", "alert");
    err.hidden = true;

    wrap.appendChild(label);
    wrap.appendChild(row);
    wrap.appendChild(err);

    // Directly above the submit button (or above the block the button sits in).
    var anchor = submitEl || form.querySelector('[type="submit"]');
    while (anchor && anchor.parentNode !== form && anchor.parentNode && form.contains(anchor.parentNode) && anchor.parentNode.children.length === 1) anchor = anchor.parentNode;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(wrap, anchor);
    else form.appendChild(wrap);

    var token = "";
    function load() {
      token = "";
      input.value = "";
      q.textContent = "loading…";
      return fetch("/api/human-check", { headers: { Accept: "application/json" }, cache: "no-store" })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || !d.question || !d.token) throw new Error();
          q.textContent = d.question;
          token = d.token;
        })
        .catch(function () { q.textContent = "couldn’t load. Tap “New question”."; });
    }
    again.addEventListener("click", function () {
      err.hidden = true;
      load().then(function () { input.focus(); });
    });
    input.addEventListener("input", function () { err.hidden = true; input.removeAttribute("aria-invalid"); });
    load();

    var hc = {
      input: input,
      message: MESSAGE,
      /** True (and shows a note) when the answer box is empty. */
      missing: function () {
        if (input.value.trim() !== "" && token) return false;
        err.textContent = token ? "Please answer the human check." : "The human check didn’t load. Tap “New question”.";
        err.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return true;
      },
      addTo: function (body) {
        body.humanToken = token;
        body.humanAnswer = input.value.trim();
        return body;
      },
      /** Call after any failed post. Returns the human-check message when that was the reason. */
      failed: function (status) {
        load();
        if (status === STATUS) {
          err.textContent = MESSAGE;
          err.hidden = false;
          input.setAttribute("aria-invalid", "true");
          input.focus();
          return MESSAGE;
        }
        return null;
      },
    };
    form.__ptHc = hc;
    return hc;
  }

  window.PaleonHumanCheck = { mount: mount, STATUS: STATUS, MESSAGE: MESSAGE };
})();
