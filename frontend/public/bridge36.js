(function () {
  var states = [
    { name: "Sokoto", zone: "North West", col: 1, row: 0, active: 345, trade: "Renewable Energy Digital Systems" },
    { name: "Kebbi", zone: "North West", col: 0, row: 1, active: 215, trade: "Renewable Energy Digital Systems" },
    { name: "Zamfara", zone: "North West", col: 2, row: 1, active: 225, trade: "Renewable Energy Digital Systems" },
    { name: "Katsina", zone: "North West", col: 3, row: 0, active: 505, trade: "Renewable Energy Digital Systems" },
    { name: "Jigawa", zone: "North West", col: 5, row: 0, active: 235, trade: "Renewable Energy Digital Systems" },
    { name: "Kano", zone: "North West", col: 4, row: 1, active: 1180, trade: "Cyber Security Fundamentals" },
    { name: "Kaduna", zone: "North West", col: 3, row: 2, active: 730, trade: "Cyber Security Fundamentals" },

    { name: "Yobe", zone: "North East", col: 7, row: 0, active: 205, trade: "Renewable Energy Digital Systems" },
    { name: "Borno", zone: "North East", col: 9, row: 1, active: 470, trade: "Renewable Energy Digital Systems" },
    { name: "Bauchi", zone: "North East", col: 6, row: 2, active: 405, trade: "Renewable Energy Digital Systems" },
    { name: "Gombe", zone: "North East", col: 8, row: 2, active: 275, trade: "Renewable Energy Digital Systems" },
    { name: "Adamawa", zone: "North East", col: 9, row: 3, active: 295, trade: "GIS and Drone Mapping for agriculture" },
    { name: "Taraba", zone: "North East", col: 8, row: 4, active: 260, trade: "GIS and Drone Mapping for agriculture" },

    { name: "Niger", zone: "North Central", col: 2, row: 3, active: 335, trade: "GIS and Drone Mapping for agriculture" },
    { name: "Kwara", zone: "North Central", col: 1, row: 4, active: 365, trade: "GIS and Drone Mapping for agriculture" },
    { name: "Kogi", zone: "North Central", col: 3, row: 4, active: 245, trade: "GIS and Drone Mapping for agriculture" },
    { name: "FCT", zone: "North Central", col: 4, row: 3, active: 905, trade: "Cyber Security Fundamentals" },
    { name: "Plateau", zone: "North Central", col: 5, row: 2, active: 430, trade: "GIS and Drone Mapping for agriculture" },
    { name: "Nasarawa", zone: "North Central", col: 5, row: 4, active: 250, trade: "GIS and Drone Mapping for agriculture" },
    { name: "Benue", zone: "North Central", col: 4, row: 4, active: 355, trade: "GIS and Drone Mapping for agriculture" },

    { name: "Oyo", zone: "South West", col: 1, row: 6, active: 760, trade: "Cyber Security Fundamentals" },
    { name: "Osun", zone: "South West", col: 2, row: 6, active: 390, trade: "Social Media Management & Content" },
    { name: "Ekiti", zone: "South West", col: 3, row: 6, active: 330, trade: "Social Media Management & Content" },
    { name: "Ogun", zone: "South West", col: 1, row: 7, active: 640, trade: "Social Media Management & Content" },
    { name: "Lagos", zone: "South West", col: 0, row: 8, active: 1420, trade: "Cyber Security Fundamentals" },
    { name: "Ondo", zone: "South West", col: 2, row: 8, active: 380, trade: "Social Media Management & Content" },

    { name: "Enugu", zone: "South East", col: 4, row: 6, active: 545, trade: "Cyber Security Fundamentals" },
    { name: "Ebonyi", zone: "South East", col: 5, row: 6, active: 300, trade: "Social Media Management & Content" },
    { name: "Anambra", zone: "South East", col: 4, row: 7, active: 615, trade: "Cyber Security Fundamentals" },
    { name: "Imo", zone: "South East", col: 4, row: 8, active: 520, trade: "Social Media Management & Content" },
    { name: "Abia", zone: "South East", col: 5, row: 7, active: 320, trade: "Social Media Management & Content" },

    { name: "Edo", zone: "South South", col: 2, row: 10, active: 590, trade: "Digital Marketing" },
    { name: "Delta", zone: "South South", col: 3, row: 10, active: 690, trade: "Digital Marketing" },
    { name: "Bayelsa", zone: "South South", col: 3, row: 11, active: 290, trade: "Digital Marketing" },
    { name: "Rivers", zone: "South South", col: 4, row: 10, active: 940, trade: "Cyber Security Fundamentals" },
    { name: "Akwa Ibom", zone: "South South", col: 5, row: 10, active: 460, trade: "Digital Marketing" },
    { name: "Cross River", zone: "South South", col: 6, row: 10, active: 415, trade: "Digital Marketing" }
  ];

  var total = states.reduce(function (sum, s) { return sum + s.active; }, 0);
  document.getElementById("liveTotal").textContent = total.toLocaleString("en-US");

  var top3 = states.slice().sort(function (a, b) { return b.active - a.active; }).slice(0, 3).map(function (s) { return s.name; });

  function hexToRgb(hex) {
    var v = hex.replace("#", "");
    return [parseInt(v.substring(0, 2), 16), parseInt(v.substring(2, 4), 16), parseInt(v.substring(4, 6), 16)];
  }
  function rgbToHex(rgb) {
    return "#" + rgb.map(function (c) {
      return Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0");
    }).join("");
  }
  function mix(hexA, hexB, t) {
    var a = hexToRgb(hexA), b = hexToRgb(hexB);
    return rgbToHex([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
  }
  function luminance(hex) {
    var rgb = hexToRgb(hex);
    return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
  }

  var DARK_TEXT = "#19160D";
  var LIGHT_TEXT = "#FBF6E8";

  var mapLo = getComputedStyle(document.documentElement).getPropertyValue("--map-lo").trim();
  var mapHi = getComputedStyle(document.documentElement).getPropertyValue("--map-hi").trim();
  var min = Math.min.apply(null, states.map(function (s) { return s.active; }));
  var max = Math.max.apply(null, states.map(function (s) { return s.active; }));
  document.getElementById("legendMin").textContent = min.toLocaleString("en-US");
  document.getElementById("legendMax").textContent = max.toLocaleString("en-US");

  var size = 46;
  function hexPixel(col, row) {
    var x = col * size * 1.5;
    var y = row * size * Math.sqrt(3) + (col % 2 === 1 ? (size * Math.sqrt(3)) / 2 : 0);
    return [x, y];
  }
  function hexPoints(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 6; i++) {
      var ang = (Math.PI / 180) * (60 * i);
      pts.push((cx + r * Math.cos(ang)).toFixed(2) + "," + (cy + r * Math.sin(ang)).toFixed(2));
    }
    return pts.join(" ");
  }

  var svgNS = "http://www.w3.org/2000/svg";

  var svg = document.getElementById("mapSvg");
  var pad = size * 1.6;

  var xs = [], ys = [];
  states.forEach(function (s) {
    var p = hexPixel(s.col, s.row);
    s._x = p[0]; s._y = p[1];
    xs.push(p[0]); ys.push(p[1]);
  });
  var minX = Math.min.apply(null, xs) - pad, maxX = Math.max.apply(null, xs) + pad;
  var minY = Math.min.apply(null, ys) - pad, maxY = Math.max.apply(null, ys) + pad;
  svg.setAttribute("viewBox", minX + " " + minY + " " + (maxX - minX) + " " + (maxY - minY));

  var zoneCentroids = {};
  states.forEach(function (s) {
    if (!zoneCentroids[s.zone]) zoneCentroids[s.zone] = { x: 0, y: 0, n: 0, minY: Infinity };
    var z = zoneCentroids[s.zone];
    z.x += s._x; z.y += s._y; z.n += 1;
    if (s._y < z.minY) z.minY = s._y;
  });
  Object.keys(zoneCentroids).forEach(function (name) {
    var z = zoneCentroids[name];
    var g = document.createElementNS(svgNS, "text");
    g.setAttribute("x", z.x / z.n);
    g.setAttribute("y", z.minY - size * 1.1);
    g.setAttribute("class", "zone-label");
    g.setAttribute("text-anchor", "middle");
    g.textContent = name;
    svg.appendChild(g);
  });

  var tooltip = document.getElementById("tooltip");
  var pinned = false;

  function showTooltip(s, evt) {
    tooltip.innerHTML =
      '<div class="t-name">' + s.name + '</div>' +
      '<div class="t-zone">' + s.zone + '</div>' +
      '<div class="t-row"><span>Active learners</span><b>' + s.active.toLocaleString("en-US") + '</b></div>' +
      '<div class="t-trade">' + s.trade + '</div>';
    tooltip.classList.add("show");
    positionTooltip(evt);
  }
  function positionTooltip(evt) {
    var x = evt.clientX, y = evt.clientY;
    var vw = window.innerWidth, vh = window.innerHeight;
    var left = Math.min(x + 16, vw - 260);
    var top = Math.min(y + 16, vh - 140);
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }
  function hideTooltip() {
    if (pinned) return;
    tooltip.classList.remove("show");
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  states.forEach(function (s, i) {
    var t = (s.active - min) / (max - min || 1);
    var fill = mix(mapLo, mapHi, t);
    var textColor = luminance(fill) > 150 ? DARK_TEXT : LIGHT_TEXT;

    var poly = document.createElementNS(svgNS, "polygon");
    poly.setAttribute("points", hexPoints(s._x, s._y, size * 0.94));
    poly.setAttribute("fill", fill);
    poly.setAttribute("class", "hex" + (top3.indexOf(s.name) > -1 ? " hex-top3" : ""));
    poly.setAttribute("tabindex", "0");
    poly.setAttribute("role", "img");
    poly.setAttribute("aria-label", s.name + ", " + s.zone + ", " + s.active + " active learners, focus course " + s.trade);

    if (!reduceMotion) {
      poly.style.opacity = "0";
      poly.style.transition = "opacity 0.4s ease " + (i * 14) + "ms, transform 0.15s ease, filter 0.15s ease";
    }

    poly.addEventListener("mouseenter", function (e) { showTooltip(s, e); });
    poly.addEventListener("mousemove", function (e) { if (!pinned) positionTooltip(e); });
    poly.addEventListener("mouseleave", hideTooltip);
    poly.addEventListener("focus", function (e) {
      var r = poly.getBoundingClientRect();
      showTooltip(s, { clientX: r.left + r.width / 2, clientY: r.top });
    });
    poly.addEventListener("blur", hideTooltip);
    poly.addEventListener("click", function (e) {
      pinned = !pinned;
      if (pinned) showTooltip(s, e); else hideTooltip();
    });

    svg.appendChild(poly);

    var label = document.createElementNS(svgNS, "text");
    label.setAttribute("class", "hex-label");
    label.setAttribute("fill", textColor);
    var words = s.name.split(" ");
    if (words.length === 1) {
      label.setAttribute("x", s._x);
      label.setAttribute("y", s._y + 3);
      label.textContent = words[0];
    } else {
      words.forEach(function (w, wi) {
        var tspan = document.createElementNS(svgNS, "tspan");
        tspan.setAttribute("x", s._x);
        tspan.setAttribute("y", s._y + (wi === 0 ? -1.5 : 8.5));
        tspan.textContent = w;
        label.appendChild(tspan);
      });
    }
    if (!reduceMotion) {
      label.style.opacity = "0";
      label.style.transition = "opacity 0.4s ease " + (i * 14 + 100) + "ms";
    }
    svg.appendChild(label);
  });

  if (!reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          svg.querySelectorAll("polygon, text.hex-label").forEach(function (el) { el.style.opacity = "1"; });
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(svg);
  }

  document.addEventListener("scroll", function () {
    if (pinned) { pinned = false; hideTooltip(); }
  }, { passive: true });

  /* ---- count-up stats ---- */
  var counters = document.querySelectorAll(".stat b[data-count]");
  var counted = new WeakSet();
  function animateCount(el) {
    if (counted.has(el)) return;
    counted.add(el);
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.textContent.indexOf("₦") === 0 ? "₦" : "";
    if (reduceMotion) {
      el.textContent = prefix + target.toLocaleString("en-US") + suffix;
      return;
    }
    var start = performance.now();
    var dur = 1100;
    function frame(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var statsIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) animateCount(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) {
    if (el.parentElement.querySelector(".stat-label") && el.closest(".stat")) {
      var raw = el.textContent;
      if (raw.indexOf("₦") === 0) el.textContent = "₦0";
    }
    statsIo.observe(el);
  });
})();
