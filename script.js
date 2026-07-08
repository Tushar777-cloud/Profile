/* =====================================================================
   Tushar Laha — Portfolio
   script.js (vanilla JS: theme, nav, reveal, typewriter, skills,
   timeline stagger, project tilt, particles, copy-to-clipboard)
   ===================================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. THEME TOGGLE + localStorage ---------- */
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  const stored = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else {
    // default to OS preference if available, else dark
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", osDark ? "dark" : "light");
  }

  toggle.addEventListener("click", function () {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- 2. NAVBAR scroll state + active link ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  window.addEventListener(
    "scroll",
    function () {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true }
  );

  /* active-section highlight via IntersectionObserver */
  const activeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle(
              "active",
              l.getAttribute("href") === "#" + id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => activeObserver.observe(s));

  /* ---------- 3. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-links");

  function closeMenu() {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    const open = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((l) => l.addEventListener("click", closeMenu));

  /* ---------- 4. SCROLL REVEAL (animate once) ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    // Toggle reveal on enter/leave so animation also plays when scrolling UP.
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 5. SKILL BARS + RINGS (animate on view) ---------- */
  function animateSkillBars(scope) {
    scope.querySelectorAll(".bar i").forEach(function (bar) {
      bar.style.width = bar.dataset.w + "%";
    });
    scope.querySelectorAll(".ring").forEach(function (ring) {
      const pct = parseInt(ring.dataset.percent, 10) || 0;
      // animate numeric counter
      const valEl = ring.querySelector(".ring-val");
      let cur = 0;
      const step = Math.max(1, Math.round(pct / 40));
      const tick = setInterval(function () {
        cur += step;
        if (cur >= pct) {
          cur = pct;
          clearInterval(tick);
        }
        ring.style.setProperty("--p", cur);
        if (valEl) valEl.textContent = cur;
      }, 24);
    });
  }

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    if (prefersReduced) {
      animateSkillBars(skillsSection); // set instantly via reduced-motion CSS
      skillsSection
        .querySelectorAll(".bar i")
        .forEach((b) => (b.style.transition = "none"));
    } else {
      const skillsObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateSkillBars(skillsSection);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      skillsObserver.observe(skillsSection);
    }
  }

  /* ---------- 6. TIMELINE STAGGER (sequential delay) ---------- */
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach(function (item, i) {
    item.style.transitionDelay = prefersReduced ? "0s" : i * 0.15 + "s";
  });

  /* ---------- 7. TYPEWRITER (hero role cycling) ---------- */
  const tw = document.getElementById("typewriter");
  if (tw) {
    const words = [
      "Full-Stack Developer",
      "Content Writer",
      "Freelancer",
      "BCA Student",
    ];
    let w = 0,
      c = 0,
      deleting = false;

    function typeLoop() {
      const word = words[w];
      tw.textContent = word.slice(0, c);
      if (!deleting && c < word.length) {
        c++;
        setTimeout(typeLoop, 90);
      } else if (!deleting && c === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(typeLoop, 45);
      } else {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(typeLoop, 350);
      }
    }
    if (prefersReduced) {
      tw.textContent = words[0];
    } else {
      typeLoop();
    }
  }

  /* ---------- 8. PROJECT CARD TILT (cursor follow) ---------- */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "translateY(-8px) rotateX(" +
          -y * 8 +
          "deg) rotateY(" +
          x * 8 +
          "deg) scale(1.02)";
        card.style.boxShadow = "0 18px 50px rgba(0,229,255,.25)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });
  }

  /* ---------- 9. CONTACT: click email/phone to copy ---------- */
  const copyHint = document.getElementById("copy-hint");
  function flashHint(msg) {
    if (!copyHint) return;
    copyHint.textContent = msg;
    clearTimeout(flashHint._t);
    flashHint._t = setTimeout(function () {
      copyHint.textContent = "";
    }, 2200);
  }

  document
    .querySelectorAll('.contact-card[href^="mailto:"], .contact-card[href^="tel:"]')
    .forEach(function (card) {
      card.addEventListener("click", function (e) {
        // allow default mailto/tel to fire, but also copy to clipboard
        const value = card
          .getAttribute("href")
          .replace(/^(mailto:|tel:)/, "")
          .replace(/[^\w@.+()-]/g, "");
        if (navigator.clipboard && value) {
          navigator.clipboard
            .writeText(value)
            .then(function () {
              flashHint("Copied: " + value);
            })
            .catch(function () {});
        }
      });
    });

  /* ---------- 10. DOWNLOAD RESUME (linked to Tushar_Resume.pdf) ---------- */
  const resumeBtn = document.getElementById("resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", function () {
      flashHint("Downloading resume…");
    });
  }

  /* ---------- 11. FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 12. HERO ENTRANCE (add .loaded) ---------- */
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });
  // fallback if load already fired
  if (document.readyState === "complete") {
    document.body.classList.add("loaded");
  }

  /* ---------- 13. PARTICLE / GRID BACKGROUND (hero canvas) ---------- */
  const canvas = document.getElementById("bg-canvas");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    // accent is read live each frame so particles adapt to light/dark theme
    function getAccent() {
      return (
        getComputedStyle(root).getPropertyValue("--accent").trim() ||
        "#00e5ff"
      );
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeParticles() {
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.6,
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const accent = getAccent();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        // link nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x,
            dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.12 * (1 - dist / 130);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      makeParticles();
      cancelAnimationFrame(raf);
      draw();
    }

    start();
    window.addEventListener("resize", function () {
      clearTimeout(start._t);
      start._t = setTimeout(start, 200);
    });

    // pause when tab hidden (perf)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
  }
})();
