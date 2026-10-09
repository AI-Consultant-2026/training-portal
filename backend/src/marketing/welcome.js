  (function () {
    // Mobile nav toggle
    var toggle = document.getElementById("navToggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.style.display === "flex";
        links.style.display = open ? "none" : "flex";
        links.style.cssText += open
          ? ""
          : "display:flex;flex-direction:column;position:absolute;top:100%;left:clamp(20px, 4vw, 48px);right:clamp(20px, 4vw, 48px);background:var(--paper);border-bottom:1px solid var(--line-light);padding:16px 20px;gap:14px;border:1px solid var(--line-light);border-top:none;";
        toggle.setAttribute("aria-expanded", String(!open));
      });
    }

    // Scroll reveal
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");
    if (!reduced && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    // Free Career Match (2026-09-25): matches the visitor to a course from the industry
    // they're aiming for and the kind of work they're drawn to, shows the result straight
    // away, and saves them as a lead (course = the matched course) via the training-portal
    // API, same origin as this page. Replaced the "50 free training places" form.
    var COURSES = {
      "cyber-security-fundamentals": {
        title: "Cyber Security Fundamentals",
        meta: "18 days \u00b7 36 lessons \u00b7 \u20a6200,000 \u00b7 self-paced",
        why: "Cybersecurity sits behind every bank, telecoms network and oil & gas operation. This course has dedicated Oil & Gas, Banking and Telecommunications pathways, so you learn to identify threats, assess risk and protect systems in the industry you\u2019re aiming for.",
      },
      "gis-and-drone-mapping": {
        title: "GIS and Drone Mapping",
        meta: "9 days \u00b7 18 lessons \u00b7 \u20a6200,000 \u00b7 self-paced",
        why: "Maps, drones and satellite data are used to plan pipelines, telecoms masts, branches and infrastructure. You\u2019ll learn GIS, drone mapping and photogrammetry, and Day 9 covers how they\u2019re applied across oil & gas, banking, telecoms and more.",
      },
      "digital-marketing": {
        title: "Digital Marketing",
        meta: "8 days \u00b7 16 lessons \u00b7 \u20a6150,000 \u00b7 self-paced",
        why: "Banks, telecoms companies and every business that sells online need people who can attract and convert customers. You\u2019ll learn SEO, paid search, content, email marketing and analytics \u2014 and how to measure what works.",
      },
      "hse-fundamentals": {
        title: "HSE Fundamentals",
        meta: "8 days \u00b7 16 lessons \u00b7 \u20a6100,000 \u00b7 self-paced",
        why: "Health, Safety and Environment is central to oil & gas and industrial work. You\u2019ll learn to identify hazards, assess risk, control workplace exposure and respond effectively when things go wrong.",
      },
    };
    var BY_INTEREST = {
      "Protecting systems and data": "cyber-security-fundamentals",
      "Maps, drones and location data": "gis-and-drone-mapping",
      "Marketing, content and online growth": "digital-marketing",
      "Health, safety and site operations": "hse-fundamentals",
    };
    // "Not sure" about the work: go by industry. Cyber Security is the default because it
    // is the one course with a dedicated pathway for each of the three industries.
    var BY_SECTOR = {
      "Oil & Gas": "hse-fundamentals",
      Banking: "cyber-security-fundamentals",
      Telecoms: "cyber-security-fundamentals",
    };
    function matchCourse(sector, interest) {
      return BY_INTEREST[interest] || BY_SECTOR[sector] || "cyber-security-fundamentals";
    }

    var form = document.getElementById("registerForm");
    var result = document.getElementById("matchResult");
    var errorBox = document.getElementById("formError");
    var submitBtn = document.getElementById("registerSubmit");
    // Remember the button's own label so a failed send restores it, whatever it says.
    var submitLabel = submitBtn ? submitBtn.textContent : "";

    function showMatch(slug) {
      var course = COURSES[slug];
      document.getElementById("matchTitle").textContent = course.title;
      document.getElementById("matchWhy").textContent = course.why;
      document.getElementById("matchMeta").textContent = course.meta;
      document.getElementById("matchPreview").href = "/preview/" + slug;
      document.getElementById("matchCourse").href = "/" + slug + "-course";
      document.getElementById("matchEnrol").href = "/register?course=" + slug;
      form.hidden = true;
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        errorBox.classList.remove("show");
        submitBtn.disabled = true;
        submitBtn.textContent = "Finding your match\u2026";

        var slug = matchCourse(form.regSector.value, form.regInterest.value);
        // phone is optional -- omit the key entirely when blank rather than sending "",
        // since the backend's regex validator rejects an empty string as malformed
        // rather than treating it the same as "not provided".
        var phone = form.regPhone.value.trim();
        var payload = {
          name: form.regName.value.trim(),
          email: form.regEmail.value.trim(),
          course: COURSES[slug].title,
          university: form.regUniversity.value,
          source: form.regSource.value,
          sector: form.regSector.value,
          interest: form.regInterest.value,
        };
        if (phone) payload.phone = phone;

        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (!res.ok) throw new Error("request failed");
            // GA4 conversion (a no-op until analytics is switched on). Coarse fields only,
            // never the visitor's name, email or phone.
            if (window.ptTrack) {
              window.ptTrack("generate_lead", { course: payload.course, source: payload.source, sector: payload.sector, form: "career_match" });
            }
            showMatch(slug);
          })
          .catch(function () {
            errorBox.classList.add("show");
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          });
      });
    }

    // Hero canvas: drifting survey grid + slow signal pulses
    var canvas = document.getElementById("heroCanvas");
    if (canvas) {
      var ctx = canvas.getContext("2d");
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = 0, h = 0;
      var pulses = [];

      function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (pulses.length === 0) {
          for (var i = 0; i < 5; i++) {
            pulses.push({
              x: Math.random() * w,
              y: Math.random() * h * 0.85,
              delay: Math.random() * 4000,
              period: 3600 + Math.random() * 2400,
            });
          }
        }
      }

      var gridSize = 46;
      var offset = 0;

      function draw(t) {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(122,140,178,0.10)";
        ctx.lineWidth = 1;

        var ox = reduced ? 0 : (offset % gridSize);
        for (var x = -gridSize + ox; x < w + gridSize; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (var y = -gridSize + ox; y < h + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        pulses.forEach(function (p) {
          var local = (t + p.delay) % p.period;
          var progress = local / p.period;
          if (progress > 0.55) return;
          var eased = progress / 0.55;
          var radius = eased * 54;
          var alpha = (1 - eased) * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232,134,60," + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(242,166,90,0.7)";
          ctx.fill();
        });

        if (!reduced) offset += 0.12;
        requestAnimationFrame(draw);
      }

      window.addEventListener("resize", resize);
      resize();
      requestAnimationFrame(draw);
    }
  })();
