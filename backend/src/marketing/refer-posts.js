/* Free lesson posts on /refer (2026-10-09). An ambassador types their PLN code and gets
   one ready-made post per course: a caption, and a picture with their code drawn on it
   (/s/<code>/lesson-<slug>/square.png). The link in each post is the share page
   /s/<code>/lesson-<slug>, whose preview image is that picture and whose button opens the
   course's free first lesson with the code attached.

   Websites can't attach a picture to a Facebook, LinkedIn or X post, so those buttons
   share the link (the platform shows the picture from it). Instagram and TikTok don't
   take links in posts, so for them the picture is downloaded and the caption copied:
   4:5 for an Instagram post (the feed crops anything taller), 9:16 for TikTok/Stories.

   Wording rules: the friend's airtime comes after their first confirmed course payment,
   never "off" a price; no job promises. External file because the CSP blocks inline JS. */
(function () {
  var section = document.getElementById("free-lesson-posts");
  if (!section) return;
  var form = document.getElementById("flForm");
  var input = document.getElementById("flCode");
  var msg = document.getElementById("flMsg");
  var grid = document.getElementById("flPosts");
  var reward = section.getAttribute("data-reward") || "₦3,000";
  var origin = window.location.origin;
  var STORE_KEY = "paleon.referCode";

  // {LINK} = share link, {LESSON} = plain free-lesson address (for Instagram/TikTok,
  // where links aren't clickable), {CODE}, {REWARD}.
  var POSTS = [
    {
      slug: "cyber-security-fundamentals",
      title: "Cyber Security Fundamentals",
      caption:
        "🔐 One careless click can cost a bank millions. The people who stop it are needed in banking, telecoms and oil & gas.\n\n" +
        "Want to see if cyber security is for you? Watch Lesson 1 of Cyber Security Fundamentals FREE on your phone. No payment, no card.\n\n" +
        "👉 {LINK}\n\n" +
        "Like it? Sign up with my code {CODE} and get {REWARD} airtime once your first course payment is confirmed.\n\n" +
        "#CyberSecurity #DigitalSkills #NYSC #Nigeria #PaleonTraining",
      short: "🔐 One careless click can cost a bank millions. Watch Lesson 1 of Cyber Security Fundamentals FREE, no card needed. Join with my code {CODE} for {REWARD} airtime after your first payment. #CyberSecurity {LINK}",
    },
    {
      slug: "gis-and-drone-mapping",
      title: "GIS and Drone Mapping",
      caption:
        "🛰️ Who maps the Niger Delta? Oil & gas, construction, agriculture and government all need people who can read the land from above.\n\n" +
        "Start GIS and Drone Mapping with a FREE first lesson: QGIS, drones and real maps, on your phone. No payment, no card.\n\n" +
        "👉 {LINK}\n\n" +
        "Like it? Sign up with my code {CODE} and get {REWARD} airtime once your first course payment is confirmed.\n\n" +
        "#GIS #DroneMapping #OilAndGas #Nigeria #PaleonTraining",
      short: "🛰️ Who maps the Niger Delta? Try Lesson 1 of GIS and Drone Mapping FREE, no card needed. Join with my code {CODE} for {REWARD} airtime after your first payment. #GIS {LINK}",
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      caption:
        "📈 Every business wants customers online. Very few know how to find them. That's the skill banks, telecoms and growing brands look for.\n\n" +
        "Watch Lesson 1 of Digital Marketing FREE on your phone and see how it works. No payment, no card.\n\n" +
        "👉 {LINK}\n\n" +
        "Like it? Sign up with my code {CODE} and get {REWARD} airtime once your first course payment is confirmed.\n\n" +
        "#DigitalMarketing #SocialMedia #NYSC #Nigeria #PaleonTraining",
      short: "📈 Every business wants customers online; few know how to find them. Watch Lesson 1 of Digital Marketing FREE. Join with my code {CODE} for {REWARD} airtime after your first payment. {LINK}",
    },
    {
      slug: "hse-fundamentals",
      title: "HSE Fundamentals",
      caption:
        "⛑️ On every oil & gas site, someone's job is to spot the hazard before anyone gets hurt. Could that be you?\n\n" +
        "Start HSE Fundamentals (Health, Safety and Environment) with a FREE first lesson on your phone. No payment, no card.\n\n" +
        "👉 {LINK}\n\n" +
        "Like it? Sign up with my code {CODE} and get {REWARD} airtime once your first course payment is confirmed.\n\n" +
        "#HSE #Safety #OilAndGas #Nigeria #PaleonTraining",
      short: "⛑️ Someone has to spot the hazard first. Try Lesson 1 of HSE Fundamentals FREE, no card needed. Join with my code {CODE} for {REWARD} airtime after your first payment. #HSE {LINK}",
    },
  ];

  function fill(template, code, link, lesson) {
    return template
      .split("{LINK}").join(link)
      .split("{LESSON}").join(lesson)
      .split("{CODE}").join(code)
      .split("{REWARD}").join(reward);
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var area = el("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) { /* the caption box is still there to copy by hand */ }
    document.body.removeChild(area);
  }

  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params); } catch (e) { /* analytics is optional */ }
  }

  function buildCard(post, code) {
    var base = origin + "/s/" + encodeURIComponent(code) + "/lesson-" + post.slug;
    var link = base;
    var lesson = origin.replace(/^https?:\/\//, "") + "/preview/" + post.slug;
    var caption = fill(post.caption, code, link, lesson);
    // Instagram and TikTok: links in captions aren't clickable, so point at the address.
    var igCaption = fill(post.caption, code, lesson, lesson);
    var short = fill(post.short, code, link, lesson);

    var card = el("article", { class: "fl-card" });
    card.appendChild(el("img", {
      src: base + "/square.png",
      alt: "Free lesson post for " + post.title + " with the code " + code,
      width: "1080",
      height: "1080",
      loading: "lazy",
    }));
    var body = el("div", { class: "fl-body" });
    body.appendChild(el("h3", {}, post.title));
    var area = el("textarea", { class: "fl-caption", readonly: "", "aria-label": "Post text for " + post.title });
    area.value = caption;
    body.appendChild(area);

    var done = el("p", { class: "fl-done", role: "status", "aria-live": "polite" });
    function said(text) {
      done.textContent = text;
      window.setTimeout(function () { if (done.textContent === text) done.textContent = ""; }, 6000);
    }

    var share = el("div", { class: "fl-share" });
    function linkButton(label, href, cls, onClick) {
      var a = el("a", { href: href, target: "_blank", rel: "noopener" }, label);
      if (cls) a.className = cls;
      a.addEventListener("click", function () {
        track("share", { method: label, content_type: "free_lesson_post", item_id: post.slug });
        if (onClick) onClick();
      });
      share.appendChild(a);
    }
    function actionButton(label, cls, onClick) {
      var b = el("button", { type: "button" }, label);
      if (cls) b.className = cls;
      b.addEventListener("click", function () {
        track("share", { method: label, content_type: "free_lesson_post", item_id: post.slug });
        onClick();
      });
      share.appendChild(b);
    }

    linkButton("WhatsApp", "https://wa.me/?text=" + encodeURIComponent(caption), "wa");
    linkButton("Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link), "", function () {
      copyText(caption);
      said("Post text copied. Paste it into your Facebook post.");
    });
    linkButton("LinkedIn", "https://www.linkedin.com/feed/?shareActive=true&text=" + encodeURIComponent(caption), "", function () {
      copyText(caption);
      said("Post text copied too, in case LinkedIn opens empty.");
    });
    linkButton("X", "https://x.com/intent/post?text=" + encodeURIComponent(short));
    // Instagram feed posts crop anything taller than 4:5, so it gets the 1080x1350 picture;
    // the tall 9:16 one is for TikTok, Stories and WhatsApp Status.
    actionButton("Instagram", "", function () {
      copyText(igCaption);
      downloadImage(base + "/portrait.png?download=1");
      said("Instagram picture saved and caption copied. Post the picture and paste the caption.");
    });
    actionButton("TikTok / Stories", "", function () {
      copyText(igCaption);
      downloadImage(base + "/status.png?download=1");
      said("Tall picture saved and caption copied. Post it and paste the caption.");
    });
    actionButton("Copy post", "copy", function () {
      copyText(caption);
      said("Copied. Paste it anywhere.");
    });
    body.appendChild(share);

    var downloads = el("p", { class: "fl-note" });
    downloads.appendChild(document.createTextNode("Save the picture: "));
    var sq = el("a", { href: base + "/square.png?download=1" }, "square (Facebook, LinkedIn, X)");
    var pt = el("a", { href: base + "/portrait.png?download=1" }, "Instagram post");
    var st = el("a", { href: base + "/status.png?download=1" }, "tall (Status, Stories, TikTok)");
    downloads.appendChild(sq);
    downloads.appendChild(document.createTextNode(" · "));
    downloads.appendChild(pt);
    downloads.appendChild(document.createTextNode(" · "));
    downloads.appendChild(st);
    body.appendChild(downloads);
    body.appendChild(done);
    card.appendChild(body);
    return card;
  }

  function downloadImage(href) {
    var a = el("a", { href: href, download: "" });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function show(code) {
    grid.innerHTML = "";
    POSTS.forEach(function (post) { grid.appendChild(buildCard(post, code)); });
    grid.hidden = false;
  }

  function setMsg(text, kind) {
    msg.textContent = text;
    msg.className = "fl-msg" + (kind ? " " + kind : "");
  }

  function check(raw, quiet) {
    var code = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!/^PLN[A-Z0-9]{4,12}$/.test(code)) {
      if (!quiet) setMsg("Codes start with PLN, like PLN4J6CRJ. Check yours on your referral page.", "err");
      return;
    }
    input.value = code;
    if (!quiet) setMsg("Checking your code…");
    fetch("/api/referrals/validate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(function (result) {
        if (!result.valid) {
          grid.hidden = true;
          setMsg("We couldn't find that code. Check it on your referral page.", "err");
          return;
        }
        try { localStorage.setItem(STORE_KEY, code); } catch (e) { /* not essential */ }
        setMsg(
          (result.referrerName ? "Hi " + result.referrerName.split(" ")[0] + "! " : "") +
            "Your 4 posts are ready below. Each picture and link carries " + code + ".",
          "ok",
        );
        show(code);
      })
      .catch(function () {
        setMsg("Couldn't check your code just now. Please try again in a minute.", "err");
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    check(input.value, false);
  });

  // /refer?code=PLN... (e.g. from /refer/me) or a code used here before fills itself in.
  var fromLink = new URLSearchParams(window.location.search).get("code");
  var remembered = null;
  try { remembered = localStorage.getItem(STORE_KEY); } catch (e) { /* not essential */ }
  if (fromLink || remembered) {
    input.value = fromLink || remembered;
    check(input.value, !fromLink);
  }
})();
