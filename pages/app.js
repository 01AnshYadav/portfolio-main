/* ══════════════════════════════════════════════════════════
   ctOS // ANSH YADAV PORTFOLIO
   Shared script. Every page links this file.
   Each block checks whether its element exists first,
   so the same file is safe on every page.
   ══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── EDIT HERE ────────────────────────────────────────────
     avatar   : path to your photo, eg "marcus.jpg". Empty shows IMG_NULL.
     hub      : the page the execute button and back links point at.
     discord  : the handle the copy button writes to the clipboard.
     ──────────────────────────────────────────────────────── */
  var CONFIG = {
    avatar: "",
    hub: "/",
    discord: "anshshare"
  };

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad = function (n) { return String(n).padStart(2, "0"); };

  /* ── clock and uptime ─────────────────────────────────── */
  var clock = $("#clock");
  var uptime = $("#uptime");
  var t0 = Date.now();

  function ticker() {
    if (clock) clock.textContent = new Date().toTimeString().slice(0, 8);
    if (uptime) {
      var s = Math.floor((Date.now() - t0) / 1000);
      uptime.textContent = pad(Math.floor(s / 60)) + ":" + pad(s % 60);
    }
  }
  if (clock || uptime) { ticker(); setInterval(ticker, 1000); }

  /* ── mark the current rail item ───────────────────────── */
  var page = document.body.getAttribute("data-page");
  if (page) {
    $$(".rail a").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("on");
    });
  }

  /* ── point every hub link at CONFIG.hub & handle modal return ── */
  $$("[data-hub]").forEach(function (a) {
    a.setAttribute("href", CONFIG.hub);
    a.addEventListener("click", function (e) {
      if (window.self !== window.top) {
        e.preventDefault();
        window.parent.postMessage({ type: 'DEDSEC_CLOSE_MODAL' }, '*');
      }
    });
  });

  /* ── ESC key closes modal if inside iframe ───────────── */
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && window.self !== window.top) {
      window.parent.postMessage({ type: 'DEDSEC_CLOSE_MODAL' }, '*');
    }
  });

  /* ── avatar slot ──────────────────────────────────────── */
  var slot = $("#avatar");
  if (slot && CONFIG.avatar) {
    var img = new Image();
    img.src = CONFIG.avatar;
    img.alt = "Ansh Yadav";
    img.onload = function () {
      var n = slot.querySelector(".null");
      if (n) n.remove();
      slot.prepend(img);
    };
  }

  /* ── page flicker on load, content pages only ─────────── */
  var shell = $(".shell");
  if (shell && !reduced && !$("#boot")) shell.classList.add("flick");

  /* ── discord copy ─────────────────────────────────────── */
  var dc = $("#dc");
  if (dc) {
    dc.addEventListener("click", function () {
      var go = $("#dcGo");
      var done = function (msg) {
        go.textContent = msg;
        setTimeout(function () { go.textContent = "Copy handle >"; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONFIG.discord)
          .then(function () { done("[ COPIED ]"); })
          .catch(function () { done("[ HANDLE IS " + CONFIG.discord + " ]"); });
      } else {
        done("[ HANDLE IS " + CONFIG.discord + " ]");
      }
    });
  }

  /* ── boot sequence, index.html only ───────────────────── */
  var boot = $("#boot");
  if (boot) {
    var BOOT = [
      "&gt; ctOS relay handshake",
      "&gt; loading node profile <span>ANSH_YADAV</span>",
      "&gt; mounting /root",
      "&gt; integrity check [SYS_OK]"
    ];
    var log = $("#bootlog");
    var bar = $("#bootbar");

    if (reduced) {
      boot.classList.add("off");
    } else {
      var i = 0;
      (function line() {
        if (i < BOOT.length) {
          var d = document.createElement("div");
          d.innerHTML = BOOT[i];
          log.appendChild(d);
          i++;
          setTimeout(line, 170);
        }
      })();

      var dur = 900, s0 = performance.now();
      requestAnimationFrame(function run(now) {
        var p = Math.min(1, (now - s0) / dur);
        bar.style.width = (p * 100) + "%";
        if (p < 1) requestAnimationFrame(run);
        else setTimeout(function () { boot.classList.add("off"); }, 160);
      });
    }
  }

  /* ── execute, runs the breach then opens the hub ──────── */
  var exec = $("#exec");
  if (exec) {
    var LINES = [
      "&gt; spoofing credentials",
      "&gt; bypassing firewall 0x4F2A",
      "&gt; injecting payload",
      "&gt; decrypting node_02",
      "&gt; rerouting traffic"
    ];
    var running = false;

    var breach = function () {
      if (running) return;
      running = true;
      exec.disabled = true;

      var ov = $("#breach");
      var blog = $("#breachlog");
      var bfill = $("#breachbar");
      var bpct = $("#breachpct");
      ov.classList.remove("off");
      blog.innerHTML = "";

      var n = 0;
      (function step() {
        if (n < LINES.length) {
          var d = document.createElement("div");
          d.innerHTML = LINES[n];
          blog.appendChild(d);
          n++;
          setTimeout(step, reduced ? 40 : 230);
        }
      })();

      var dur2 = reduced ? 220 : 1500, st = performance.now();
      requestAnimationFrame(function run(now) {
        var p = Math.min(1, (now - st) / dur2);
        bfill.style.width = (p * 100) + "%";
        bpct.textContent = "[ " + pad(Math.round(p * 100)) + "% ] ACCESS";
        if (p < 1) {
          requestAnimationFrame(run);
        } else {
          bpct.textContent = "[ ACCESS GRANTED ]";
          setTimeout(function () {
            if (window.self !== window.top) {
              window.parent.postMessage({ type: 'DEDSEC_CLOSE_MODAL' }, '*');
            } else {
              window.location.href = CONFIG.hub;
            }
          }, 450);
        }
      });
    };

    exec.addEventListener("click", breach);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.metaKey && !e.ctrlKey) breach();
    });
  }
})();
