// /ghana (2026-10-29). External file because the site CSP blocks inline scripts.
(function () {
  // Tells the register page to open on Ghana even if the visitor's IP says otherwise.
  try {
    window.localStorage.setItem("paleon_country", "GH");
  } catch (e) {
    // Storage blocked: the register links carry ?country=GH anyway.
  }

  var form = document.getElementById("ghana-lead-form");
  var msg = document.getElementById("ghana-lead-msg");
  if (!form || !msg) return;

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
    var payload = { name: name, email: email, course: course, university: form.university.value, country: "GH" };
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
        if (window.ptTrack) window.ptTrack("generate_lead", { course: course, country: "GH", form: "ghana" });
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
