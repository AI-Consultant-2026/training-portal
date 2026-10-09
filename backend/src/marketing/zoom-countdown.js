/* Ambassador Hour countdown (temporary, 2026-10-09), used by welcome.html and
   ambassadors.html: each has a hidden #zoomCountdown band. Counts down to 2pm WAT on
   Sat 10 Oct 2026, shows "live now" during the session, and hides the band from 3pm WAT.
   External file because the CSP blocks inline JS. Delete with both bands after the session. */
(function () {
  var band = document.getElementById("zoomCountdown");
  if (!band) return;
  var START = Date.parse("2026-10-10T13:00:00Z"); // 2pm WAT
  var END = Date.parse("2026-10-10T14:00:00Z"); // 3pm WAT
  if (Date.now() >= END) return;

  var clock = document.getElementById("zcClock");
  var live = document.getElementById("zcLive");
  var parts = {
    d: document.getElementById("zcDays"),
    h: document.getElementById("zcHours"),
    m: document.getElementById("zcMins"),
    s: document.getElementById("zcSecs"),
  };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var timer;
  function tick() {
    var now = Date.now();
    if (now >= END) {
      band.hidden = true;
      window.clearInterval(timer);
      return;
    }
    if (now >= START) {
      clock.hidden = true;
      live.hidden = false;
      return;
    }
    var left = Math.floor((START - now) / 1000);
    parts.d.textContent = pad(Math.floor(left / 86400));
    parts.h.textContent = pad(Math.floor((left % 86400) / 3600));
    parts.m.textContent = pad(Math.floor((left % 3600) / 60));
    parts.s.textContent = pad(left % 60);
  }
  tick();
  band.hidden = false;
  timer = window.setInterval(tick, 1000);
})();
