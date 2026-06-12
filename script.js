/* ── GRAIN ── */
(function () {
  const c = document.getElementById("grain");
  const x = c.getContext("2d");
  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  function draw() {
    const w = c.width,
      h = c.height;
    const img = x.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 10;
    }
    x.putImageData(img, 0, 0);
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  resize();
  draw();
})();

/* ── LOADER ── */
(function () {
  const loader = document.getElementById("loader");
  const num = document.getElementById("loader-num");
  const fill = document.getElementById("loader-bar-fill");
  let n = 0;
  const t = setInterval(() => {
    n += (Math.random() * 7 + 2) | 0;
    if (n >= 100) {
      n = 100;
      num.textContent = n;
      fill.style.width = "100%";
      clearInterval(t);
      setTimeout(() => {
        loader.classList.add("out");
        setTimeout(() => (loader.style.display = "none"), 1100);
      }, 400);
      return;
    }
    num.textContent = n;
    fill.style.width = n + "%";
  }, 35);
})();

/* ── CURSOR ── */
(function () {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });
  (function raf() {
    rx += (mx - rx) * 0.09;
    ry += (my - ry) * 0.09;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll("a,button,.service-card,.p-item").forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });
})();

/* ── NAVBAR ── */
(function () {
  const nav = document.getElementById("nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
})();

/* ── HERO PARALLAX ── */
(function () {
  const name = document.getElementById("heroName");
  const content = document.getElementById("heroContent");
  let ticking = false;
  let lx = 0,
    ly = 0;
  document.addEventListener("mousemove", (e) => {
    lx = e.clientX;
    ly = e.clientY;
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (lx / window.innerWidth - 0.5) * 24;
        const y = (ly / window.innerHeight - 0.5) * 12;
        name.style.transform = `translate(${x}px,${y}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
})();

/* ── STAT COUNTERS ── */
(function () {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || "+";
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) {
            cur = target;
            clearInterval(t);
            el.textContent = target + suffix;
          } else el.textContent = Math.floor(cur);
        }, 16);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll("[data-target]").forEach((el) => obs.observe(el));
})();

/* ── PORTFOLIO FILTER ── */
(function () {
  const btns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".p-item");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((item) => {
        item.classList.toggle(
          "hidden",
          f !== "all" && item.dataset.category !== f,
        );
      });
    });
  });
})();

/* ── CHART ── */
(function () {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        document.querySelectorAll(".bar").forEach((b) => {
          b.style.height = b.dataset.h + "%";
        });
        obs.disconnect();
      });
    },
    { threshold: 0.3 },
  );
  const chart = document.getElementById("chartBars");
  if (chart) obs.observe(chart);
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ── FORM SUBMIT ── */
document.querySelector(".btn-submit").addEventListener("click", function () {
  this.textContent = "Message Sent ✓";
  this.style.opacity = "0.6";
  setTimeout(() => {
    this.textContent = "Send Message →";
    this.style.opacity = "";
  }, 3000);
});
