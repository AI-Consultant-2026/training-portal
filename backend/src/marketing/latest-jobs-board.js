// /latest-jobs-board: loads /latest-jobs.json (built by backend/scripts/build-latest-jobs.py)
// and renders a filterable table. External file because the CSP blocks inline scripts.
(function () {
  var COURSE_PAGES = {
    "Cyber Security Fundamentals": "/cyber-security-fundamentals-course",
    "Digital Marketing": "/digital-marketing-course",
    "GIS & Drone Mapping": "/gis-and-drone-mapping-course",
    "HSE Fundamentals": "/hse-fundamentals-course"
  };
  var DAY = 86400000;
  var jobs = [];
  var state = { q: "", sector: "", st: "", posted: "", course: "", sort: "newest" };

  var $ = function (id) { return document.getElementById(id); };
  var body = $("jobs-body");

  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  function parse(iso) {
    if (!iso) return null;
    var p = iso.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(d) {
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function ago(d) {
    var n = Math.round((today() - d) / DAY);
    if (n <= 0) return "Today";
    if (n === 1) return "Yesterday";
    return n + " days ago";
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function cell(tr, label, cls) {
    var td = el("td", cls);
    if (label) td.setAttribute("data-label", label);
    tr.appendChild(td);
    return td;
  }

  function matches(j) {
    if (state.sector && j.sector !== state.sector) return false;
    if (state.st && j.state !== state.st) return false;
    if (state.course && j.course !== state.course) return false;
    if (state.posted && (!j._posted || today() - j._posted > (+state.posted) * DAY)) return false;
    if (state.q) {
      var hay = (j.role + " " + j.company + " " + j.location + " " + j.requirements + " " + (j.course || "")).toLowerCase();
      var words = state.q.toLowerCase().split(/\s+/);
      for (var i = 0; i < words.length; i++) if (words[i] && hay.indexOf(words[i]) < 0) return false;
    }
    return true;
  }

  function render() {
    var list = jobs.filter(matches);
    if (state.sort === "closing") {
      list.sort(function (a, b) {
        return (a._deadline ? a._deadline.getTime() : Infinity) - (b._deadline ? b._deadline.getTime() : Infinity);
      });
    }
    body.textContent = "";
    if (!list.length) {
      var tr = el("tr");
      var td = el("td", "empty", "No jobs match these filters. Try clearing one.");
      td.colSpan = 9;
      tr.appendChild(td);
      body.appendChild(tr);
    }
    list.forEach(function (j) {
      var tr = el("tr");
      cell(tr, null, "cell-sector").appendChild(el("span", "tag " + (j.sector === "Oil & Gas" ? "oil" : "bank"), j.sector));

      var role = cell(tr, null, "cell-role");
      role.appendChild(el("span", "job-role", j.role));
      if (j._posted && today() - j._posted <= DAY) role.appendChild(el("span", "tag new", "New"));

      cell(tr, "Company").textContent = j.company;
      cell(tr, "Location").textContent = j.location;

      var posted = cell(tr, "Posted", "nowrap");
      if (j._posted) {
        posted.appendChild(document.createTextNode(fmt(j._posted)));
        posted.appendChild(el("br"));
        posted.appendChild(el("span", "muted", ago(j._posted)));
      } else posted.textContent = "–";

      var dl = cell(tr, "Deadline", "nowrap");
      if (j._deadline) {
        var left = Math.round((j._deadline - today()) / DAY);
        dl.appendChild(el("span", left <= 3 ? "closing" : "", fmt(j._deadline)));
        if (left <= 3) {
          dl.appendChild(el("br"));
          dl.appendChild(el("span", "closing", left <= 0 ? "Closes today" : "Closes in " + left + (left === 1 ? " day" : " days")));
        }
      } else dl.appendChild(el("span", "muted", "Not stated"));

      cell(tr, "Requirements", "job-reqs").textContent = j.requirements;

      var a = el("a", "apply", "View & apply");
      a.href = j.link;
      a.target = "_blank";
      a.rel = "noopener nofollow";
      cell(tr, null, "cell-apply").appendChild(a);

      var c = cell(tr, "Paleon course");
      if (j.course && COURSE_PAGES[j.course]) {
        var ca = el("a", "course-link", j.course);
        ca.href = COURSE_PAGES[j.course];
        c.appendChild(ca);
      } else c.appendChild(el("span", "muted", "–"));

      body.appendChild(tr);
    });
    var n = list.length;
    $("result-count").textContent = n + (n === 1 ? " job" : " jobs") + " shown";
    syncUrl();
  }

  function syncUrl() {
    var p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    if (state.sector) p.set("sector", state.sector === "Oil & Gas" ? "oil-gas" : "banking");
    if (state.st) p.set("state", state.st);
    if (state.posted) p.set("days", state.posted);
    if (state.course) p.set("course", state.course);
    if (state.sort !== "newest") p.set("sort", state.sort);
    var qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function readUrl() {
    var p = new URLSearchParams(location.search);
    state.q = p.get("q") || "";
    var s = p.get("sector");
    state.sector = s === "oil-gas" ? "Oil & Gas" : s === "banking" ? "Banking & Finance" : "";
    state.st = p.get("state") || "";
    state.posted = p.get("days") || "";
    state.course = p.get("course") || "";
    state.sort = p.get("sort") === "closing" ? "closing" : "newest";
  }

  function setControls() {
    $("f-q").value = state.q;
    $("f-state").value = state.st;
    $("f-posted").value = state.posted;
    $("f-course").value = state.course;
    $("f-sort").value = state.sort;
    document.querySelectorAll(".chip").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-sector") === state.sector));
    });
  }

  function bind() {
    $("f-q").addEventListener("input", function (e) { state.q = e.target.value.trim(); render(); });
    $("f-state").addEventListener("change", function (e) { state.st = e.target.value; render(); });
    $("f-posted").addEventListener("change", function (e) { state.posted = e.target.value; render(); });
    $("f-course").addEventListener("change", function (e) { state.course = e.target.value; render(); });
    $("f-sort").addEventListener("change", function (e) { state.sort = e.target.value; render(); });
    document.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        state.sector = b.getAttribute("data-sector");
        setControls();
        render();
      });
    });
    $("f-reset").addEventListener("click", function () {
      state = { q: "", sector: "", st: "", posted: "", course: "", sort: "newest" };
      setControls();
      render();
    });
  }

  fetch("/latest-jobs.json", { cache: "no-cache" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var t = today();
      jobs = (data.jobs || []).map(function (j) {
        j._posted = parse(j.posted);
        j._deadline = parse(j.deadline);
        return j;
      }).filter(function (j) { return !j._deadline || j._deadline >= t; });

      var oil = jobs.filter(function (j) { return j.sector === "Oil & Gas"; }).length;
      $("stat-total").textContent = jobs.length;
      $("stat-oil").textContent = oil;
      $("stat-bank").textContent = jobs.length - oil;
      $("stat-updated").textContent = data.updated ? fmt(parse(data.updated)) : "–";
      $("c-all").textContent = jobs.length;
      $("c-oil").textContent = oil;
      $("c-bank").textContent = jobs.length - oil;

      var counts = {};
      jobs.forEach(function (j) { counts[j.state] = (counts[j.state] || 0) + 1; });
      Object.keys(counts).sort(function (a, b) {
        if (a === "Various") return 1;
        if (b === "Various") return -1;
        return a.localeCompare(b);
      }).forEach(function (s) {
        var o = el("option", null, (s === "Various" ? "Various / multiple" : s) + " (" + counts[s] + ")");
        o.value = s;
        $("f-state").appendChild(o);
      });

      readUrl();
      setControls();
      bind();
      render();
    })
    .catch(function () {
      body.textContent = "";
      var tr = el("tr");
      var td = el("td", "empty", "Sorry, the jobs list didn't load. Please refresh the page.");
      td.colSpan = 9;
      tr.appendChild(td);
      body.appendChild(tr);
      $("result-count").textContent = "";
    });
})();
