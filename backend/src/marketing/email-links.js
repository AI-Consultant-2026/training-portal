/* Paleon Training -- "how do you want to send this email?" chooser for every mailto: link
   on the public marketing pages. A bare mailto: does nothing on a computer with no mail
   app set up (e.g. Chrome set as the mail handler with no webmail registered), which is
   common among visitors who use Gmail in the browser. So instead of following the link,
   a click opens a small dialog: open the same message in Gmail, Outlook or Yahoo Mail,
   use the device's email app (the original mailto:), or copy the address. The subject
   and body in the link are carried into every option. Works for links added later by
   page scripts too (e.g. "Email your CV" on the job boards), because it listens on the
   document. External file because the CSP blocks inline JS; the styles are injected
   from here (style-src allows inline styles) so pages only need the one <script> tag. */
(function () {
  "use strict";

  var STYLE =
    ".pt-mail-overlay{position:fixed;inset:0;z-index:2147483000;background:rgba(16,21,31,.55);display:flex;align-items:center;justify-content:center;padding:20px}" +
    ".pt-mail-box{background:var(--paper,#F7F4EC);color:var(--ink,#10151F);border-radius:14px;width:100%;max-width:400px;padding:22px 22px 18px;box-shadow:0 18px 50px rgba(16,21,31,.35);font-size:15px;line-height:1.45}" +
    ".pt-mail-box h2{margin:0 0 4px;font-size:19px;line-height:1.25}" +
    ".pt-mail-to{margin:0 0 14px;font-size:14px;opacity:.8;word-break:break-all}" +
    ".pt-mail-list{display:grid;gap:8px}" +
    ".pt-mail-opt{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid rgba(16,21,31,.18);background:#fff;color:inherit;font:inherit;font-weight:600;text-decoration:none;cursor:pointer;text-align:left}" +
    ".pt-mail-opt:hover,.pt-mail-opt:focus-visible{border-color:var(--signal,#C96A26);outline:none;box-shadow:0 0 0 2px rgba(201,106,38,.25)}" +
    ".pt-mail-opt span{font-weight:400;font-size:13px;opacity:.7}" +
    ".pt-mail-close{margin-top:12px;background:none;border:0;color:inherit;opacity:.75;font:inherit;font-size:14px;cursor:pointer;padding:6px 0}" +
    ".pt-mail-close:hover{opacity:1;text-decoration:underline}";

  function parse(href) {
    var rest = href.slice(7); // after "mailto:"
    var q = rest.indexOf("?");
    var to = decodeURIComponent(q < 0 ? rest : rest.slice(0, q));
    var params = {};
    if (q >= 0) {
      rest
        .slice(q + 1)
        .split("&")
        .forEach(function (kv) {
          var i = kv.indexOf("=");
          if (i < 0) return;
          var k = kv.slice(0, i).toLowerCase();
          try {
            params[k] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, "%20"));
          } catch (e) {
            params[k] = kv.slice(i + 1);
          }
        });
    }
    return { to: to, subject: params.subject || "", body: params.body || "", cc: params.cc || "" };
  }

  function enc(s) {
    return encodeURIComponent(s);
  }

  function options(m, href) {
    var gmail =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + enc(m.to) +
      (m.cc ? "&cc=" + enc(m.cc) : "") + "&su=" + enc(m.subject) + "&body=" + enc(m.body);
    var outlook =
      "https://outlook.live.com/mail/0/deeplink/compose?to=" + enc(m.to) +
      (m.cc ? "&cc=" + enc(m.cc) : "") + "&subject=" + enc(m.subject) + "&body=" + enc(m.body);
    var yahoo =
      "https://compose.mail.yahoo.com/?to=" + enc(m.to) +
      (m.cc ? "&cc=" + enc(m.cc) : "") + "&subject=" + enc(m.subject) + "&body=" + enc(m.body);
    return [
      { label: "Gmail", note: "opens in a new tab", href: gmail },
      { label: "Outlook / Hotmail", note: "opens in a new tab", href: outlook },
      { label: "Yahoo Mail", note: "opens in a new tab", href: yahoo },
      { label: "My email app", note: "Mail, Outlook app, phone", href: href, app: true },
    ];
  }

  var lastFocus = null;

  function close(overlay) {
    overlay.remove();
    document.removeEventListener("keydown", onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  var current = null;
  function onKey(e) {
    if (!current) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close(current);
      current = null;
    } else if (e.key === "Tab") {
      // keep focus inside the dialog
      var f = current.querySelectorAll("a,button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function open(link) {
    var href = link.getAttribute("href");
    var m = parse(href);
    if (!m.to) return false;
    if (!document.getElementById("pt-mail-style")) {
      var st = el("style");
      st.id = "pt-mail-style";
      st.textContent = STYLE;
      document.head.appendChild(st);
    }
    lastFocus = link;
    var overlay = el("div", "pt-mail-overlay");
    var box = el("div", "pt-mail-box");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "pt-mail-title");
    var h = el("h2", null, "Send this email with…");
    h.id = "pt-mail-title";
    box.appendChild(h);
    box.appendChild(el("p", "pt-mail-to", "To: " + m.to));
    var list = el("div", "pt-mail-list");
    options(m, href).forEach(function (o) {
      var a = el("a", "pt-mail-opt");
      a.href = o.href;
      if (!o.app) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.appendChild(document.createTextNode(o.label));
      a.appendChild(el("span", null, o.note));
      a.addEventListener("click", function () {
        a.dataset.ptMailHandled = "1";
        setTimeout(function () {
          if (current) {
            close(current);
            current = null;
          }
        }, 50);
      });
      list.appendChild(a);
    });
    var copy = el("button", "pt-mail-opt");
    copy.type = "button";
    copy.appendChild(document.createTextNode("Copy email address"));
    var note = el("span", null, m.to);
    copy.appendChild(note);
    copy.addEventListener("click", function () {
      var done = function () {
        note.textContent = "Copied ✓";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(m.to).then(done, function () {
          note.textContent = m.to;
        });
      } else {
        var t = el("textarea");
        t.value = m.to;
        document.body.appendChild(t);
        t.select();
        try {
          document.execCommand("copy");
          done();
        } catch (e) {}
        t.remove();
      }
    });
    list.appendChild(copy);
    box.appendChild(list);
    var x = el("button", "pt-mail-close", "Cancel");
    x.type = "button";
    x.addEventListener("click", function () {
      close(overlay);
      current = null;
    });
    box.appendChild(x);
    overlay.appendChild(box);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        close(overlay);
        current = null;
      }
    });
    document.body.appendChild(overlay);
    current = overlay;
    document.addEventListener("keydown", onKey, true);
    list.firstChild.focus();
    return true;
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || a.dataset.ptMailHandled || a.closest(".pt-mail-box")) return;
    if (open(a)) e.preventDefault();
  });
})();
