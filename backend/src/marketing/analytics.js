/* Paleon Training -- Google Analytics 4 with Consent Mode v2, the Meta Pixel, and a small
   consent banner. app.ts serves this at /analytics.js with the IDs filled in from the
   GA4_MEASUREMENT_ID and META_PIXEL_ID env vars (either may be empty); while neither is set
   it serves a no-op stub instead, so nothing loads and no banner shows. Loaded on every
   public marketing page and in the React app (frontend/index.html). External file because
   the CSP blocks inline JS.

   Consent: analytics cookies are only set after the visitor clicks Accept. Until then
   (or after Decline) GA runs in consent mode with analytics_storage denied -- no cookies,
   only anonymous cookieless pings. Google advertising signals are always denied. The Meta
   Pixel (2026-09-26, for measuring Facebook/Instagram ads) is stricter: it isn't loaded at
   all until Accept. One Accept/Decline covers both; the choices are kept in localStorage
   and can be changed from the privacy policy page. A visitor who accepted GA before the
   Pixel existed is asked once more, since they never agreed to Meta. */
(function () {
  "use strict";

  var ID = "__GA4_MEASUREMENT_ID__";
  var PIXEL = "__META_PIXEL_ID__";
  var KEY = "pt_analytics_consent"; // "granted" | "denied"
  var ADS_KEY = "pt_ads_consent"; // "granted" | "denied" -- the Meta Pixel
  // Paleon's own WhatsApp number: clicks on these links are chats. Other wa.me links
  // (e.g. "share on WhatsApp" on the student referral page) are shares, not chats.
  var CHAT_LINK = 'a[href*="wa.me/447508823495"]';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  function readChoice(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function saveChoice(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Private mode etc.: the banner will simply ask again next visit.
    }
  }

  var choice = readChoice(KEY);
  var adsChoice = readChoice(ADS_KEY);

  if (ID) {
    gtag("consent", "default", {
      analytics_storage: choice === "granted" ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    gtag("js", new Date());
    // SPA route changes are picked up by GA4 enhanced measurement ("page changes based on
    // browser history events", on by default), so no manual page_view calls are needed.
    gtag("config", ID);

    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
    document.head.appendChild(tag);
  }

  /* ---------------- Meta Pixel (only after Accept) ---------------- */

  // Our own event names -> Meta standard events. Anything not listed isn't sent to Meta.
  var META_EVENTS = {
    generate_lead: "Lead",
    sign_up: "CompleteRegistration",
    bank_transfer_submitted: "AddPaymentInfo",
    whatsapp_chat_click: "Contact",
  };
  var pixelLoaded = false;
  var lastPixelPath = null;

  function pixelPageView() {
    if (!pixelLoaded || location.pathname === lastPixelPath) return;
    lastPixelPath = location.pathname;
    window.fbq("track", "PageView");
  }

  function loadPixel() {
    if (!PIXEL || pixelLoaded) return;
    pixelLoaded = true;
    // Meta's standard base code, unminified: queue calls until fbevents.js arrives.
    var fbq = function () {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", PIXEL);
    pixelPageView();
    // The React app changes pages with pushState/popstate; count those as page views too.
    var push = history.pushState;
    history.pushState = function () {
      var result = push.apply(this, arguments);
      pixelPageView();
      return result;
    };
    window.addEventListener("popstate", pixelPageView);
  }

  if (PIXEL && adsChoice === "granted") loadPixel();

  window.ptTrack = function (name, params) {
    if (ID) gtag("event", name, params || {});
    if (pixelLoaded && META_EVENTS[name]) window.fbq("track", META_EVENTS[name]);
  };

  document.addEventListener(
    "click",
    function (e) {
      var target = e.target;
      if (!target || !target.closest) return;
      var chat = target.closest(CHAT_LINK);
      if (chat) {
        window.ptTrack("whatsapp_chat_click", {
          link_location: chat.classList.contains("wa-float") ? "floating_button" : "page_button",
          page_path: location.pathname,
        });
      }
      if (target.closest("[data-pt-cookie-settings]")) {
        e.preventDefault();
        showBanner();
      }
    },
    true,
  );

  /* ---------------- consent banner ---------------- */

  var STYLE =
    "#pt-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:950;max-width:640px;margin:0 auto;" +
    "background:#10151F;color:#F7F4EC;border:1px solid rgba(247,244,236,.22);border-radius:8px;box-shadow:0 10px 30px rgba(16,21,31,.35);" +
    "padding:16px 18px;font:15px/1.5 'Source Sans 3',system-ui,-apple-system,sans-serif;display:flex;" +
    "flex-wrap:wrap;align-items:center;gap:12px 16px}" +
    "#pt-consent p{margin:0;flex:1 1 300px}" +
    "#pt-consent a{color:#F2A65A}" +
    "#pt-consent .pt-c-actions{display:flex;gap:10px;flex-wrap:wrap}" +
    "#pt-consent button{font-family:inherit;font-weight:600;font-size:14px;line-height:1;border-radius:4px;padding:11px 18px;cursor:pointer;" +
    "border:1.5px solid rgba(247,244,236,.45);background:transparent;color:#F7F4EC;min-height:44px}" +
    "#pt-consent button.pt-c-accept{background:#E8863C;border-color:#E8863C;color:#10151F}" +
    "#pt-consent button:focus-visible{outline:2px solid #F2A65A;outline-offset:2px}" +
    "@media (max-width:640px){body.pt-consent-open .wa-float,body.pt-consent-open .pt-search-trigger{visibility:hidden}}" +
    "@media print{#pt-consent{display:none}}";

  var banner = null;

  function hideBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
    document.body.classList.remove("pt-consent-open");
  }

  function decide(value) {
    saveChoice(KEY, value);
    if (PIXEL) saveChoice(ADS_KEY, value);
    if (ID) gtag("consent", "update", { analytics_storage: value });
    if (PIXEL) {
      if (value === "granted") loadPixel();
      else if (pixelLoaded) window.fbq("consent", "revoke");
    }
    hideBanner();
  }

  function showBanner() {
    if (banner || !document.body) return;
    if (!document.getElementById("pt-consent-style")) {
      var style = document.createElement("style");
      style.id = "pt-consent-style";
      style.textContent = STYLE;
      document.head.appendChild(style);
    }
    banner = document.createElement("div");
    banner.id = "pt-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent");
    var what = ID && PIXEL
      ? "Google Analytics and Meta Pixel cookies to understand how our site is used and how well our adverts work"
      : PIXEL
        ? "Meta Pixel cookies to understand how well our adverts work"
        : "Google Analytics cookies to understand how our site is used and to improve it";
    banner.innerHTML =
      "<p>We use " + what + ". " +
      'They’re only set if you accept. <a href="/privacy#cookies">Privacy policy</a></p>' +
      '<div class="pt-c-actions"><button type="button" class="pt-c-decline">Decline</button>' +
      '<button type="button" class="pt-c-accept">Accept</button></div>';
    banner.querySelector(".pt-c-accept").addEventListener("click", function () {
      decide("granted");
    });
    banner.querySelector(".pt-c-decline").addEventListener("click", function () {
      decide("denied");
    });
    document.body.appendChild(banner);
    document.body.classList.add("pt-consent-open");
  }

  // The privacy page carries a hidden [data-pt-cookie-settings-slot] paragraph; reveal it
  // with a "Change cookie settings" button only when analytics is actually running.
  function addSettingsButtons() {
    var slots = document.querySelectorAll("[data-pt-cookie-settings-slot]");
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].querySelector("[data-pt-cookie-settings]")) continue;
      slots[i].hidden = false;
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-pt-cookie-settings", "");
      b.className = "pt-cookie-settings";
      b.textContent = "Change cookie settings";
      slots[i].appendChild(b);
    }
  }

  function onReady() {
    addSettingsButtons();
    if ((ID && !choice) || (PIXEL && !adsChoice)) showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();

  window.ptConsent = { open: showBanner };
})();
