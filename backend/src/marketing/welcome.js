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

    // Register form: posts silently to the training-portal API (same origin as this page)
    var form = document.getElementById("registerForm");
    var success = document.getElementById("formSuccess");
    var errorBox = document.getElementById("formError");
    var submitBtn = document.getElementById("registerSubmit");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        errorBox.classList.remove("show");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";

        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.regName.value.trim(),
            email: form.regEmail.value.trim(),
            course: form.regCourse.value,
            university: form.regUniversity.value,
            source: form.regSource.value,
          }),
        })
          .then(function (res) {
            if (!res.ok) throw new Error("request failed");
            submitBtn.textContent = "Sent";
            success.classList.add("show");
            form.querySelectorAll(".form-input, .form-select, button[type=submit]").forEach(function (el) {
              el.disabled = true;
            });
          })
          .catch(function () {
            errorBox.classList.add("show");
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
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
