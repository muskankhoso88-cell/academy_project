const $ = (s) => document.querySelector(s);
const WA = "923471601209";

/* ---- Content (yahan se text edit karein) ---- */
const WHY = [
  [
    "Focused Preparation",
    "A dedicated track for MDCAT and ECAT alongside school classes.",
  ],
  [
    "Led by Experience",
    "Guided by Prof. Ghullam Hussain Jalbani, owner of the academy.",
  ],
  [
    "Clear Concepts",
    "Teaching that builds understanding first, then speed and accuracy.",
  ],
  ["Easy to Reach", "Station Road, Sakrand, inside City Foundation School."],
];
const COURSES = [
  ["Classes 6 to 12", "School classes from Class 6 up to Class 12."],
  ["MDCAT Preparation", "Preparation for the medical college entry test."],
  [
    "ECAT Preparation",
    "Preparation for the engineering university entry test.",
  ],
];
/* Faculty: [naam, subject, asli ho to true] */
const FACULTY = [
  ["Prof. Ghullam Hussain Jalbani", "Owner, Haniya Academy", true],
  ["Faculty Name", "Subject (edit in script.js)"],
  ["Faculty Name", "Subject (edit in script.js)"],
];
/* Gallery: photo lagane ke liye dusri jagah path likhein, e.g. ['Classroom', 'assets/class.jpg'] */
const GALLERY = [
  ["Academy Building", ""],
  ["Classroom", ""],
  ["Study Session", ""],
  ["Test Day", ""],
  ["Events", ""],
  ["Our Students", ""],
];
/* Achievers: placeholders ko asli students aur results se badlein */
const ACHIEVERS = [
  ["Student Name", "Achievement / result (edit in script.js)"],
  ["Student Name", "Achievement / result (edit in script.js)"],
  ["Student Name", "Achievement / result (edit in script.js)"],
];

/* ---- Render ---- */
const card = (id, list, html, cls) =>
  ($(id).innerHTML = list
    .map(
      (x, i) =>
        `<div class="card rv ${cls(x)}" style="--i:${i}">${html(x, i)}</div>`,
    )
    .join(""));
const numbered = (x, i) =>
  `<span class="num">0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p>`;
card("#whyGrid", WHY, numbered, () => "");
card("#courseGrid", COURSES, numbered, () => "");
card(
  "#facGrid",
  FACULTY,
  (x) => `<div class="ava">${x[0][0]}</div><h3>${x[0]}</h3><p>${x[1]}</p>`,
  (x) => "fac" + (x[2] ? "" : " ph"),
);
card(
  "#achGrid",
  ACHIEVERS,
  (x) => `<div class="ava">&#9733;</div><h3>${x[0]}</h3><p>${x[1]}</p>`,
  () => "fac ph",
);
$("#galGrid").innerHTML = GALLERY.map(
  ([t, src], i) =>
    `<div class="tile rv" style="--i:${i}">${src ? `<img src="${src}" alt="${t}" loading="lazy">` : "Photo placeholder"}<b>${t}</b></div>`,
).join("");

/* ---- Menu, header, progress bar ---- */
const burger = $("#burger"),
  menu = $("#menu");
burger.onclick = () => {
  const o = menu.classList.toggle("open");
  burger.classList.toggle("open", o);
  burger.setAttribute("aria-expanded", o);
};
menu.querySelectorAll("a").forEach(
  (a) =>
    (a.onclick = () => {
      menu.classList.remove("open");
      burger.classList.remove("open");
    }),
);
addEventListener(
  "scroll",
  () => {
    $("#header").classList.toggle("solid", scrollY > 24);
    $("#progress").style.transform =
      `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`;
  },
  { passive: true },
);

/* ---- Scroll reveal + active link ---- */
const io = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), io.unobserve(e.target)),
    ),
  { threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
const links = [...menu.querySelectorAll("a")];
const so = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        links.forEach((l) =>
          l.classList.toggle("on", l.hash === "#" + e.target.id),
        ),
    ),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("main section").forEach((s) => so.observe(s));

/* ---- Counters + rotating words ---- */
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-count]").forEach((el) => {
  const to = +el.dataset.count;
  if (still) return (el.textContent = to);
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return;
    o.disconnect();
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 1500, 1);
      el.textContent = Math.round(to * (1 - (1 - p) ** 3));
      p < 1 && requestAnimationFrame(tick);
    })(t0);
  }).observe(el);
});
const words = ["Classes 6 to 12", "MDCAT Preparation", "ECAT Preparation"],
  w = $("#words");
let wi = 0;
!still &&
  setInterval(() => {
    w.classList.add("out");
    setTimeout(() => {
      w.textContent = words[(wi = (wi + 1) % words.length)];
      w.classList.remove("out");
    }, 350);
  }, 2600);

/* ---- Contact form (frontend-only: check karta hai, phir WhatsApp kholta hai) ---- */
$("#form").onsubmit = (e) => {
  e.preventDefault();
  const f = e.target,
    v = (n) => f[n].value.trim();
  const digits = v("phone").replace(/\D/g, "").length;
  const errs = {
    name: v("name").length < 2 && "Please enter your name.",
    phone: (digits < 10 || digits > 13) && "Enter a valid phone number.",
    msg: v("msg").length < 10 && "Message must be at least 10 characters.",
  };
  ["name", "phone", "msg"].forEach((n) => {
    f[n].classList.toggle("bad", !!errs[n]);
    f[n].nextElementSibling.textContent = errs[n] || "";
  });
  if (Object.values(errs).some(Boolean)) return;
  open(
    `https://wa.me/${WA}?text=${encodeURIComponent(`Assalam o Alaikum, I am ${v("name")}. ${v("msg")} (Phone: ${v("phone")})`)}`,
    "_blank",
  );
  f.reset();
};
$("#year").textContent = new Date().getFullYear();
