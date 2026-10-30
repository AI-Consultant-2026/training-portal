/* Country homepages (/, /ng, /za, /ke, /gh) and coming-soon ambassador pages, 2026-10-30.
   Rendered by backend/src/views/countryHome.ts. External file because the site CSP blocks
   inline scripts. Handles: the header menu and country menu, remembering the visitor's
   chosen country (cookie, read by the server on their next visit to /), the "Looks like
   you're in ..." banner, the country waitlist, and the free Career Match. */
(function () {
  "use strict";

  var COOKIE = "paleon_country";

  // Remembers the country for a year. The register page reads the same key from
  // localStorage, so it opens on this country too.
  function rememberCountry(code) {
    document.cookie = COOKIE + "=" + code + "; Max-Age=31536000; Path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
    try {
      window.localStorage.setItem(COOKIE, code);
    } catch (e) {
      // Storage blocked: the cookie is enough.
    }
  }

  // Any country link (header menu, hero cards, footer, banner) is a deliberate choice.
  document.addEventListener("click", function (event) {
    var picker = event.target.closest && event.target.closest("[data-pick-country]");
    if (picker) rememberCountry(picker.getAttribute("data-pick-country"));
  });

  var banner = document.getElementById("geoBanner");
  var stay = banner && banner.querySelector("[data-stay-country]");
  if (stay) {
    stay.addEventListener("click", function () {
      rememberCountry(stay.getAttribute("data-stay-country"));
      banner.hidden = true;
    });
  }

  // Disclosure menus: the mobile nav and the country menu. Escape or a click outside closes.
  function disclosure(button, panel, openClass) {
    if (!button || !panel) return;
    function setOpen(open) {
      button.setAttribute("aria-expanded", String(open));
      if (openClass) panel.classList.toggle(openClass, open);
      else panel.hidden = !open;
    }
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("click", function (event) {
      if (button.getAttribute("aria-expanded") === "true" && !panel.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }
  disclosure(document.getElementById("navToggle"), document.getElementById("navLinks"), "is-open");
  disclosure(document.getElementById("countryBtn"), document.getElementById("countryMenu"), null);

  // Waitlist ("Courses in Kenya are launching soon").
  document.querySelectorAll("[data-waitlist-form]").forEach(function (form) {
    var input = form.querySelector("input[name=whatsapp]");
    var msg = form.querySelector(".waitlist-msg");
    var consent = form.querySelector("input[name=consent]");
    var button = form.querySelector("button");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var whatsapp = input.value.trim();
      msg.classList.remove("is-error");
      if (!/^\+?[0-9()\s-]{7,20}$/.test(whatsapp)) {
        msg.classList.add("is-error");
        msg.textContent = "Please enter your WhatsApp number, including the country code.";
        input.focus();
        return;
      }
      if (consent && !consent.checked) {
        msg.classList.add("is-error");
        msg.textContent = "Please tick the box to agree to WhatsApp messages.";
        consent.focus();
        return;
      }
      button.disabled = true;
      fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: form.getAttribute("data-country"), whatsapp: whatsapp, consent: true }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("request failed");
          form.closest(".waitlist").classList.add("is-done");
          msg.textContent = "You’re on the waitlist. We’ll message you on WhatsApp when courses open.";
          if (window.ptTrack) window.ptTrack("join_waitlist", { country: form.getAttribute("data-country") });
        })
        .catch(function () {
          msg.classList.add("is-error");
          msg.textContent = "Something went wrong. Please check the number and try again.";
        })
        .then(function () {
          button.disabled = false;
        });
    });
  });

  // Free Career Match: matches the visitor to a course from the kind of work they want,
  // or failing that the industry they're aiming for, shows the result straight away and
  // saves them as a lead with the page's country.
  var dataEl = document.getElementById("ptHomeData");
  var form = document.getElementById("registerForm");
  if (!dataEl || !form) return;
  var data = JSON.parse(dataEl.textContent);
  var result = document.getElementById("matchResult");
  var errorBox = document.getElementById("formError");
  var submitBtn = document.getElementById("registerSubmit");
  var submitLabel = submitBtn.textContent;

  function matchCourse(sector, interest) {
    return data.byInterest[interest] || data.bySector[sector] || "cyber-security-fundamentals";
  }

  function showMatch(slug) {
    var course = data.courses[slug];
    document.getElementById("matchTitle").textContent = course.title;
    document.getElementById("matchWhy").textContent = course.why;
    document.getElementById("matchMeta").textContent = course.meta;
    document.getElementById("matchPreview").href = course.preview;
    document.getElementById("matchCourse").href = course.page;
    var enrol = document.getElementById("matchEnrol");
    if (enrol) enrol.href = course.enrol;
    form.hidden = true;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    errorBox.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Finding your match…";

    var slug = matchCourse(form.regSector.value, form.regInterest.value);
    // phone is optional: leave the key out when blank, since the API rejects "".
    var phone = form.regPhone.value.trim();
    var payload = {
      name: form.regName.value.trim(),
      email: form.regEmail.value.trim(),
      course: data.courses[slug].title,
      university: form.regUniversity.value,
      source: form.regSource.value,
      sector: form.regSector.value,
      interest: form.regInterest.value,
      country: data.country,
    };
    if (phone) payload.phone = phone;
    // Ghana, Kenya and South Africa only; checkValidity above makes sure it's ticked.
    if (form.regConsent) payload.consent = form.regConsent.checked;

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("request failed");
        // GA4 conversion (a no-op until analytics is on). Coarse fields only, never contact details.
        if (window.ptTrack) {
          window.ptTrack("generate_lead", { course: payload.course, source: payload.source, sector: payload.sector, country: data.country, form: "career_match" });
        }
        showMatch(slug);
      })
      .catch(function () {
        errorBox.hidden = false;
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });
})();
