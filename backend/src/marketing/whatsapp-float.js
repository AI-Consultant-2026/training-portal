/* Paleon Training -- floating "Chat with Paleon on WhatsApp" button. Pairs with
   whatsapp-float.css; loaded on every public marketing page. Creates the button, then
   keeps it hidden while an in-page WhatsApp CTA (.btn-whatsapp, e.g. the homepage
   hero) or any <form> is on screen, so it never doubles up a visible CTA or sits
   over form fields / submit buttons. External file because the CSP blocks inline JS. */
(function () {
  "use strict";

  // +44 750 882 3495 -- the number the site footers label "WhatsApp/Call".
  var HREF =
    "https://wa.me/447508823495?text=" +
    encodeURIComponent(
      "Hello Paleon Training, I would like to find out more about your training programmes.",
    );
  var ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>';

  var btn = document.createElement("a");
  btn.className = "wa-float";
  btn.href = HREF;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.setAttribute("aria-label", "Chat with Paleon on WhatsApp (opens WhatsApp)");
  btn.title = "Chat with Paleon on WhatsApp";
  btn.innerHTML = ICON;
  document.body.appendChild(btn);

  // Also step aside once the reader reaches the very bottom, where the footer's
  // left-aligned copyright / Terms / Privacy line would otherwise sit under it.
  var onScreen = new Set();
  var atBottom = false;
  var update = function () {
    btn.classList.toggle("is-visible", onScreen.size === 0 && !atBottom);
  };
  var checkBottom = function () {
    var end = document.documentElement.scrollHeight - 96;
    var next = window.scrollY + window.innerHeight >= end;
    if (next !== atBottom) {
      atBottom = next;
      update();
    }
  };
  window.addEventListener("scroll", checkBottom, { passive: true });
  window.addEventListener("resize", checkBottom);

  var blockers = document.querySelectorAll(".btn-whatsapp, form");
  if (!("IntersectionObserver" in window)) {
    checkBottom();
    update();
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) onScreen.add(entry.target);
      else onScreen.delete(entry.target);
    });
    update();
  });
  blockers.forEach(function (el) {
    io.observe(el);
  });
  checkBottom();
  // With blockers, the observer's first callback (always fired on observe) reveals
  // the button -- calling update() now would flash it on over a visible hero CTA.
  if (!blockers.length) update();
})();
