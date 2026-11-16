/* =========================================================
   Pressy_Tech portfolio: editable data first, behaviour below
   ========================================================= */

/* ---- 1. EDIT YOUR SKILL PERCENTAGES HERE ---- */
const SKILLS = {
  "Web Development": [
    ["HTML", 95],
    ["CSS", 90],
    ["JavaScript", 80],
    ["Responsive Web Design", 90],
    ["Frontend Development", 85],
  ],
  "Graphics Design": [
    ["Adobe Photoshop", 85],
    ["Canva", 95],
    ["Social Media Design", 90],
    ["Branding & Visual Design", 80],
  ],
};

/* ---- 2. EDIT YOUR PROJECTS HERE ----
   category: "Websites" | "Graphics Design" | "Landing Pages" | "Automation"
   image: path inside assets/projects/ (a placeholder icon shows until the file exists) */
const PROJECTS = [
  {
    title: "HypothesisLab",
    category: "Websites",
    desc: "a full-stack statistical analysis and hypothesis testing web application.",
    image: "projects/project-1.jpeg",
    link: "https://hypothesislab-4.onrender.com/",
  },
  {
    title: "Veloura Skin",
    category: "Websites",
    desc: "A sleek and responsive frontend web application.",
    image: "projects/project-2.jpeg",
    link: "https://presido-art.github.io/velora/",
  },
  {
    title: "Bookadoc",
    category: "Websites",
    desc: "a digital healthcare scheduling platform.",
    image: "projects/project-3.jpeg",
    link: "https://presido-art.github.io/bookadoc/",
  },
  {
    title: "Abike Allure",
    category: "Graphics Design",
    desc: "An elegant product advert flyer for Abike Allure.",
    image: "projects/project-4.png",
    link: "https://drive.google.com/file/d/11LHhb050s7KUScl6KYpoqoJFp2z2VliE/view?usp=drive_link",
  },
  {
    title: "Veloura",
    category: "Graphics Design",
    desc: "A sleek promotional graphic for Veloura",
    image: "projects/project-5.png",
    link: "https://drive.google.com/file/d/1ohqvGTozpN1hiXJSIJspBblG6MQVrK9e/view?usp=drive_link",
  },
  {
    title: "Savvy Siters",
    category: "Graphics Design",
    desc: "A modern community event invitation flyer for Savvy Sisters.",
    image: "projects/project-6.png",
    link: "https://drive.google.com/file/d/1lM8f7rZs7y5DicDvPoGAEAt6ZQiY7b8G/view?usp=drive_link",
  },
  {
    title: "AuroraTour",
    category: "Websites",
    desc: "An interactive travel booking web application for discovering destinations.",
    image: "projects/project-7.jpeg",
    link: "https://presido-art.github.io/AuroraTour/",
  },
  {
    title: "Abike Allure",
    category: "Graphics",
    desc: "Crafting a modern, cohesive aesthetic for an effortless beauty and lifestyle brand.",
    image: "projects/project-8.png",
    link: "https://drive.google.com/file/d/1tNYS_AFzVslnVJuPnPn0fA1qVBG8sivB/view?usp=drive_link",
  },
];

/* ---- 3. CONTACT FORM BACKEND ----
   FormSubmit emails form submissions to this address. The recipient must
   confirm the activation email sent after the first submission. */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/pressy.tech1@gmail.com";

/* ========================= Behaviour ========================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (t) =>
  String(t).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

/* Footer year */
$("#year").textContent = new Date().getFullYear();

/* Navbar: solid on scroll, back-to-top button */
const nav = $("#nav"),
  topBtn = $("#top");
function onScroll() {
  nav.classList.toggle("solid", scrollY > 30);
  topBtn.classList.toggle("show", scrollY > 500);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
topBtn.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);

/* Mobile menu */
const burger = $("#burger"),
  menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
}
burger.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open")),
);
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
addEventListener("resize", () => {
  if (innerWidth > 760) setMenu(false);
});

/* Active link while scrolling */
const links = $$(".menu a");
const secObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting)
        links.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + en.target.id,
          ),
        );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
$$("main section[id]").forEach((s) => secObserver.observe(s));

/* Rotating hero text */
(function typed() {
  const words = [
    "Web Developer",
    "Frontend Developer",
    "Graphics Designer",
    "Creative Digital Professional",
  ];
  const el = $("#typed");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }
  let w = 0,
    c = 0,
    del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    let wait = del ? 40 : 85;
    if (!del && c === word.length) {
      del = true;
      wait = 1400;
    } else if (del && c === 0) {
      del = false;
      w = (w + 1) % words.length;
      wait = 350;
    } else c += del ? -1 : 1;
    setTimeout(tick, wait);
  })();
})();

/* Scroll reveal */
const revObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        revObserver.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 },
);
const observeReveals = () =>
  $$(".reveal:not(.in)").forEach((el) => revObserver.observe(el));
observeReveals();

/* Skills: build circular rings */
(function skills() {
  const R = 52,
    C = 2 * Math.PI * R;
  $("#skills-root").innerHTML = Object.entries(SKILLS)
    .map(
      ([group, items]) => `
    <div class="skill-group">
      <h3 class="reveal">${esc(group)}</h3>
      <div class="rings">${items
        .map(
          ([name, pct]) => `
        <div class="ring-item">
          <div class="ring" role="img" aria-label="${esc(name)}: ${pct} percent">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle class="track" cx="60" cy="60" r="${R}"/>
              <circle class="bar" cx="60" cy="60" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-pct="${pct}"/>
            </svg>
            <div class="pct"><span><b class="num">0</b><small>%</small></span></div>
          </div>
          <span>${esc(name)}</span>
        </div>`,
        )
        .join("")}
      </div>
    </div>`,
    )
    .join("");

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fill = (item, delay) =>
    setTimeout(
      () => {
        const bar = $(".bar", item),
          num = $(".num", item),
          pct = +bar.dataset.pct;
        bar.style.strokeDashoffset = C * (1 - pct / 100);
        if (reduce) {
          num.textContent = pct;
          return;
        }
        const t0 = performance.now();
        (function count(t) {
          const p = Math.min((t - t0) / 1600, 1);
          num.textContent = Math.round(pct * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(count);
        })(t0);
      },
      reduce ? 0 : delay,
    );

  /* Animate when each group enters the viewport, staggered per ring */
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        $$(".ring-item", en.target).forEach((item, i) => fill(item, i * 150));
        obs.unobserve(en.target);
      });
    },
    { threshold: 0.25 },
  );
  $$(".rings").forEach((g) => obs.observe(g));
})();

/* Portfolio: render + filter */
(function portfolio() {
  const cats = ["All Projects", "Websites", "Graphics Design",];
  const icons = {
    Websites: "fa-globe",
    "Graphics Design": "fa-palette",
    Automation: "fa-robot",
  };
  const grid = $("#projects"),
    bar = $("#filters");
  bar.innerHTML = cats
    .map(
      (c, i) =>
        `<button type="button" data-cat="${c}" class="${i ? "" : "on"}" aria-pressed="${!i}">${c}</button>`,
    )
    .join("");
  function render(cat) {
    const list =
      cat === "All Projects"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === cat);
    grid.innerHTML = list
      .map(
        (p, i) => `
      <article class="project" style="animation-delay:${i * 60}ms">
        <div class="ph"><i class="fa-solid ${icons[p.category] || "fa-image"}"></i></div>
        <img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" onerror="this.remove()">
        <div class="info">
          <span class="cat">${esc(p.category)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.desc)}</p>
          <a class="btn primary" href="${esc(p.link)}" target="_blank" rel="noopener">View Project</a>
        </div>
      </article>`,
      )
      .join("");
  }
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("button", bar).forEach((x) => {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", x === b);
    });
    render(b.dataset.cat);
  });
  render("All Projects");
})();

/* Contact form: validation + real submission */
(function form() {
  const f = $("#form"),
    status = $("#status"),
    btn = $("#send");
  const rules = {
    name: (v) => v.trim().length >= 2 || "Enter your full name.",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ||
      "Enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Enter a subject (3+ characters).",
    message: (v) =>
      v.trim().length >= 10 || "Write a message of at least 10 characters.",
  };
  function check(field) {
    const res = rules[field.name](field.value);
    field.classList.toggle("bad", res !== true);
    field.setAttribute("aria-invalid", res !== true);
    field.parentElement.querySelector(".err").textContent =
      res === true ? "" : res;
    return res === true;
  }
  $$("input,textarea", f).forEach((el) =>
    el.addEventListener("blur", () => check(el)),
  );
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "";
    status.textContent = "";
    const fields = $$("input,textarea", f);
    const valid = fields.map(check).every(Boolean);
    if (!valid) {
      fields.find((x) => x.classList.contains("bad")).focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      status.className = "fail";
      status.textContent =
        "Message not sent: the form has no backend yet. Set FORM_ENDPOINT in script.js.";
      return;
    }
    btn.disabled = true;
    btn.textContent = "Sending...";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(f))),
      });
      if (!res.ok) throw new Error("Server returned " + res.status);
      const result = await res.json();
      if (result.success !== true && result.success !== "true")
        throw new Error(result.message || "Email service rejected the message");
      status.className = "ok";
      status.textContent = "Message sent. I will reply soon.";
      f.reset();
    } catch (err) {
      status.className = "fail";
      status.textContent = `Message not sent: ${
        err instanceof Error ? err.message : "The email service could not be reached."
      }`;
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
})();
