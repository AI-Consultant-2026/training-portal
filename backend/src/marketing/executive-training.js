(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector("header nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
})();
