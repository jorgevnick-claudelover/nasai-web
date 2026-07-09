/* ===================================================
   NASAI · main.js
   =================================================== */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Language toggle (ES / EN) ---------- */
  var STORE_KEY = "nasai-lang";
  var langToggle = document.getElementById("langToggle");
  var i18nEls = document.querySelectorAll("[data-es]");

  function getLang() {
    try { return localStorage.getItem(STORE_KEY) || "es"; }
    catch (e) { return "es"; }
  }
  function saveLang(l) {
    try { localStorage.setItem(STORE_KEY, l); } catch (e) {}
  }

  function applyLang(lang) {
    i18nEls.forEach(function (el) {
      var val = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-es");
      if (val === null) return;
      if (el.tagName === "META") { el.setAttribute("content", val); }
      else { el.textContent = val; }
    });
    document.documentElement.setAttribute("lang", lang);
    if (langToggle) langToggle.classList.toggle("en", lang === "en");
    updateStatus(lang);
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = getLang() === "en" ? "es" : "en";
      saveLang(next);
      applyLang(next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");
  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeNav(); closeLightbox(); }
  });

  /* ---------- Opening hours: today + open/closed ---------- */
  // Minutes from midnight [open, close]; null = closed. Keyed by getDay() (0=Sun).
  var schedule = {
    1: [540, 1170],   // Lun 9:00–19:30
    2: null,          // Mar cerrado
    3: [540, 1230],   // Mié 9:00–20:30
    4: [540, 1230],   // Jue 9:00–20:30
    5: [540, 1260],   // Vie 9:00–21:00
    6: [540, 1260],   // Sáb 9:00–21:00
    0: [570, 1260]    // Dom 9:30–21:00
  };

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  // Highlight today's row
  var now = new Date();
  var today = now.getDay();
  var rows = document.querySelectorAll("#hoursTable tr");
  rows.forEach(function (r) {
    if (parseInt(r.getAttribute("data-day"), 10) === today) r.classList.add("today");
  });

  var statusEl = document.getElementById("openStatus");
  function updateStatus(lang) {
    if (!statusEl) return;
    var d = new Date();
    var mins = d.getHours() * 60 + d.getMinutes();
    var range = schedule[d.getDay()];
    var open = range && mins >= range[0] && mins < range[1];
    var es, en;
    if (open) {
      es = "Abierto ahora · cierra a las " + fmt(range[1]);
      en = "Open now · closes at " + fmt(range[1]);
    } else {
      es = "Cerrado ahora";
      en = "Closed now";
    }
    statusEl.setAttribute("data-es", es);
    statusEl.setAttribute("data-en", en);
    statusEl.textContent = lang === "en" ? en : es;
    statusEl.classList.toggle("open", !!open);
    statusEl.classList.toggle("closed", !open);
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lbImg.src = src; lbImg.alt = alt || "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("show")) return;
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.src = "";
  }
  document.querySelectorAll(".gal-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      openLightbox(btn.getAttribute("data-full"), img ? img.alt : "");
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .hl-card, .bowl-card, .build-col, .menu-block.half, .gal-item, .hours-col, .find-card, .hero-copy, .hero-visual"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { obs.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Init language ---------- */
  applyLang(getLang());
})();
