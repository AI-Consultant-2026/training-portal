// Country landing pages (/ghana, /kenya, /south-africa; 2026-10-29). External file
// because the site CSP blocks inline scripts. The page's lead form carries its country
// code in data-country.
(function () {
  var form = document.getElementById("country-lead-form");
  var msg = document.getElementById("country-lead-msg");
  var country = form && form.getAttribute("data-country");
  if (!country) return;

  // Tells the register page to open on this country even if the visitor's IP says otherwise.
  try {
    window.localStorage.setItem("paleon_country", country);
  } catch (e) {
    // Storage blocked: the register links carry ?country= anyway.
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    msg.className = "form-msg";
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var course = form.course.value;
    if (!name || !email || !course || !form.email.checkValidity()) {
      msg.className = "form-msg err";
      msg.textContent = "Please enter your name, a valid email and a course.";
      return;
    }
    var payload = { name: name, email: email, course: course, university: form.university.value, country: country };
    if (phone) payload.phone = phone;
    var button = form.querySelector("button");
    button.disabled = true;
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("request failed");
        if (window.ptTrack) window.ptTrack("generate_lead", { course: course, country: country, form: "country_page" });
        form.reset();
        msg.className = "form-msg ok";
        msg.textContent = "Thank you. We'll email you the course details shortly.";
      })
      .catch(function () {
        msg.className = "form-msg err";
        msg.textContent = "Something went wrong. Please check your phone number format, or message us on WhatsApp.";
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
