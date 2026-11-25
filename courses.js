const $ = (s) => document.querySelector(s);
const WA = "923471601209";

/* ---- Courses (yahan se edit karein) ----
   cat: "school" ya "entry". rows: [label, value]. Timing/Fee asli maloomat se badlein. */
const COURSES = [
  {
    cat: "school",
    tag: "School",
    title: "Classes 6 to 8",
    text: "Strong foundations in core subjects through clear explanations and regular practice.",
    rows: [
      ["Level", "Class 6 to 8"],
      ["Timing", "Contact the academy"],
      ["Fee", "Contact the academy"],
    ],
  },
  {
    cat: "school",
    tag: "School",
    title: "Classes 9 and 10",
    text: "Structured teaching for students at the secondary level.",
    rows: [
      ["Level", "Class 9 and 10"],
      ["Timing", "Contact the academy"],
      ["Fee", "Contact the academy"],
    ],
  },
  {
    cat: "school",
    tag: "School",
    title: "Classes 11 and 12",
    text: "Concept-driven classes for intermediate students, with a path towards MDCAT and ECAT.",
    rows: [
      ["Level", "Class 11 and 12"],
      ["Timing", "Contact the academy"],
      ["Fee", "Contact the academy"],
    ],
  },
  {
    cat: "entry",
    tag: "Entry Test",
    title: "MDCAT Preparation",
    text: "Focused preparation for the medical college entry test.",
    rows: [
      ["Subjects", "Biology, Chemistry, Physics, English"],
      ["Timing", "Contact the academy"],
      ["Fee", "Contact the academy"],
    ],
  },
  {
    cat: "entry",
    tag: "Entry Test",
    title: "ECAT Preparation",
    text: "Focused preparation for the engineering university entry test.",
    rows: [
      ["Subjects", "Mathematics, Physics, Chemistry, English"],
      ["Timing", "Contact the academy"],
      ["Fee", "Contact the academy"],
    ],
  },
];

const wa = (t) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(`Assalam o Alaikum, I would like to know about ${t} at Haniya Academy.`)}`;

const io = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), io.unobserve(e.target)),
    ),
  { threshold: 0.1 },
);

function render(filter) {
  $("#courseList").innerHTML = COURSES.filter(
    (c) => filter === "all" || c.cat === filter,
  )
    .map(
      (c, i) => `
      <article class="card rv" style="--i:${i}">
        <span class="tag">${c.tag}</span>
        <h3>${c.title}</h3>
        <p>${c.text}</p>
        <dl class="rows">${c.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        <a class="btn gold" target="_blank" rel="noopener" href="${wa(c.title)}">Ask about this course</a>
      </article>`,
    )
    .join("");
  document.querySelectorAll("#courseList .rv").forEach((el) => io.observe(el));
}

$("#filters").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document
    .querySelectorAll("#filters button")
    .forEach((x) => x.classList.toggle("on", x === b));
  render(b.dataset.f);
};
render("all");

/* ---- Menu, header, progress bar ---- */
const burger = $("#burger"),
  menu = $("#menu");
burger.onclick = () => {
  const o = menu.classList.toggle("open");
  burger.classList.toggle("open", o);
  burger.setAttribute("aria-expanded", o);
};
addEventListener(
  "scroll",
  () => {
    $("#header").classList.toggle("solid", scrollY > 24);
    $("#progress").style.transform =
      `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`;
  },
  { passive: true },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
$("#year").textContent = new Date().getFullYear();
