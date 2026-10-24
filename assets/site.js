(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var hamb = document.querySelector(".hamb");
  var drawer = document.getElementById("mobdrawer");
  var overlay = document.querySelector(".mob-overlay");
  var closeBtn = document.querySelector(".mob-close");

  function setMenu(open) {
    if (!drawer) { return; }
    root.classList.toggle("mob-open", open);
    root.style.overflow = open ? "hidden" : "";
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (hamb) { hamb.setAttribute("aria-expanded", open ? "true" : "false"); }
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open && hamb && document.activeElement && drawer.contains(document.activeElement)) { hamb.focus(); }
  }

  if (hamb) { hamb.addEventListener("click", function () { setMenu(!root.classList.contains("mob-open")); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setMenu(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setMenu(false); }); }
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { setMenu(false); }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("mob-open")) { setMenu(false); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && root.classList.contains("mob-open")) { setMenu(false); }
  });

  var qs = document.querySelectorAll(".faq-q");
  for (var i = 0; i < qs.length; i++) {
    (function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) { return; }
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    })(qs[i]);
  }
  window.addEventListener("resize", function () {
    var openBtns = document.querySelectorAll('.faq-q[aria-expanded="true"]');
    for (var j = 0; j < openBtns.length; j++) {
      var p = document.getElementById(openBtns[j].getAttribute("aria-controls"));
      if (p) { p.style.maxHeight = p.scrollHeight + "px"; }
    }
  });
})();
