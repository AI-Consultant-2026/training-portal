// /zoom-attendees attendance form. External file because the site CSP blocks inline JS.
(function () {
  var form = document.getElementById("attendee-form");
  if (!form) return;
  var errorBox = document.getElementById("form-error");
  var button = document.getElementById("submit");
  var done = document.getElementById("done");
  var doneMsg = document.getElementById("done-msg");

  function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.add("show");
    errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function formatDate(iso) {
    var p = iso.split("-");
    return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : iso;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorBox.classList.remove("show");

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var dateAttended = form.dateAttended.value;
    var statusInput = form.querySelector('input[name="status"]:checked');
    var phone = form.phone.value.trim();

    if (name.length < 2) return showError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Please enter a valid email address.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateAttended)) return showError("Please choose the date you attended.");
    if (phone && !/^[0-9+()\s-]{7,20}$/.test(phone)) return showError("Please check your WhatsApp number, or leave it blank.");

    var payload = {
      name: name,
      email: email,
      dateAttended: dateAttended,
      wantsUpdates: form.wantsUpdates.checked,
      website: form.website.value,
    };
    if (statusInput) payload.status = statusInput.value;
    if (phone) payload.phone = phone;

    button.disabled = true;
    button.textContent = "Saving…";

    fetch("/api/zoom-attendees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          if (!res.ok) throw new Error(res.status === 429 ? "rate" : "bad");
          return body;
        });
      })
      .then(function (body) {
        doneMsg.textContent = (body.alreadyRegistered
          ? "You were already on the register for "
          : "Thanks for attending on ") + formatDate(dateAttended) + ". Watch your inbox for the slides and recording.";
        form.style.display = "none";
        done.classList.add("show");
        done.scrollIntoView({ behavior: "smooth", block: "center" });
        // Never the attendee's name, email or phone.
        if (window.ptTrack) window.ptTrack("generate_lead", { form: "zoom_attendance", status: payload.status || "" });
      })
      .catch(function (err) {
        button.disabled = false;
        button.textContent = "Record my attendance";
        showError(err && err.message === "rate"
          ? "Too many sign-ins from this network just now. Please try again in a few minutes."
          : "Sorry, we couldn't save that. Please check your details and try again, or message us on WhatsApp on +234 707 714 9989.");
      });
  });
})();
